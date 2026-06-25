import { sanityQuery } from "@/app/(public)/news/sanity";
import type { Article } from "@/types/news.types";

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
