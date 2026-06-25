import { sanityQuery } from "@/actions/sanity";
import type { Article } from "@/types/news.types";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { defineQuery } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: string) => builder.image(source);

export function generateSlug(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function estimateReadTime(text: string) {
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);
  return readTime;
}

export async function fetchArticlesFromSantry(): Promise<Article[]> {
  let articles: Article[] = [];

  try {
    const query = `
      *[_type == "article" && status == "published"]
      | order(publicationDate desc) {
        "id": _id,
        title,
        "slug": slug.current,
        author,
        source,
        "summary": excerpt,
        field,
        region,
        readTime,
        "imageUrl": coverImage.asset->url,
        featured,
        "date": publicationDate,
        externalUrl,
        sourceType
      }
    `;
    articles = await sanityQuery(query);
  } catch (err) {
    console.error("Failed to load articles:", err);
    throw new Error("Failed to load articles");
  }

  return articles;
}
export const POST_QUERY = defineQuery(
  `*[_type == "article" && slug.current == $slug][0]`,
);
