"use server";
import { axiosGet, axiosPost } from "@/utils/api";
import { QUERY_URL, MUTATE_URL, ASSET_URL } from "@/data/sanity";
import type { Article } from "@/types/articles.types";

export async function sanityQuery(
  groqQuery: string,
  params: Record<string, any> = {},
) {
  const url = new URL(QUERY_URL);
  url.searchParams.set("query", groqQuery);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(`$${key}`, JSON.stringify(value));
  }
  const data = await axiosGet<{ result: unknown }>(url.toString(), {});
  return data.result as Article[];
}

export async function sanityMutate(mutations: any[]) {
  const data = await axiosPost(
    MUTATE_URL,
    { mutations },
    {
      config: {
        headers: {
          Authorization: `Bearer ${process.env.SANITY_WRITE_TOKEN}`,
        },
      },
    },
  );
  return data;
}

export async function sanityUploadImage(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided");

  const data = await axiosPost<{ document: { _id: string } }>(ASSET_URL, file, {
    config: {
      headers: {
        "Content-Type": file.type,
        Authorization: `Bearer ${process.env.SANITY_WRITE_TOKEN}`,
      },
    },
  });
  return data.document._id;
}

export async function submitArticleAction(
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  const { generateSlug, estimateReadTime } = await import("@/utils/sanity");

  const title = formData.get("headline") as string;
  const slug = generateSlug(title);
  const categoryId = formData.get("category") as string;
  const regionVal = formData.get("region") as string;
  const sourceName = formData.get("source_name") as string;
  const sourceType = formData.get("source_type") as string;
  const sourceTypeVal =
    sourceType === "External Link" ? "external" : "original";
  const externalUrl = formData.get("external_url") as string;
  const summary = formData.get("summary") as string;
  const bodyHtml = formData.get("content") as string;
  const publicationDate = formData.get("publication_date") as string;

  let coverImageRef: string | null = null;
  const coverFile = formData.get("file") as File | null;
  if (coverFile && coverFile.size > 0 && coverFile.name !== "undefined") {
    const fileFormData = new FormData();
    fileFormData.append("file", coverFile);
    coverImageRef = await sanityUploadImage(fileFormData);
  }

  await sanityMutate([
    {
      create: {
        _type: "article",
        title,
        slug: { _type: "slug", current: slug },
        field: categoryId,
        region: regionVal,
        source: sourceTypeVal === "external" ? sourceName : "Luminary",
        author: sourceName,
        sourceType: sourceTypeVal,
        externalUrl: externalUrl || null,
        excerpt: summary || null,
        body: bodyHtml || null,
        coverImage: coverImageRef
          ? {
              _type: "image",
              asset: { _type: "reference", _ref: coverImageRef },
            }
          : null,
        publicationDate: publicationDate || null,
        readTime: bodyHtml ? estimateReadTime(bodyHtml) : null,
        status: "pending_review",
        submittedByUser: true,
        submittedAt: new Date().toISOString(),
      },
    },
  ]);

  return { success: true };
}
