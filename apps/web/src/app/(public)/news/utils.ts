import { Article } from "./types";
import { sanityQuery } from "./sanity";
import { endpoints } from "@/data/endpoints";

const getDaysAgo = (value: number) => {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((Date.now() - new Date(value).getTime()) / msPerDay);
};

export const matchesTimeRange = (articleDate: number, range: string) => {
  if (range === "all") return true;
  const age = getDaysAgo(articleDate);
  if (range === "last-7") return age <= 7;
  if (range === "last-30") return age <= 30;
  if (range === "last-90") return age <= 90;
  if (range === "this-year")
    return new Date(articleDate).getFullYear() === new Date().getFullYear();
  return true;
};

export const getFilteredArticles = (
  browseableArticles: Article[],
  state: { field: string; region: string; time: string },
) =>
  browseableArticles
    .filter((article) => {
      const matchesField =
        state.field === "all" || article.field === state.field;
      const matchesRegion =
        state.region === "all" || article.region === state.region;
      const matchesTime = matchesTimeRange(article.date, state.time);
      return matchesField && matchesRegion && matchesTime;
    })
    .sort((l, r) => new Date(r.date).getTime() - new Date(l.date).getTime());

export const formatDate = (value: number) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

export const escapeHtml = (value: string) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export const buildArticleUrl = (slug: string, articleDetailPageUrl: string) =>
  `${articleDetailPageUrl}?slug=${encodeURIComponent(String(slug).trim())}`;

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

export const getCategoryLabel = (
  category:
    | string
    | {
        title: string;
        label: string;
        category: string;
        name: string;
        slug: string;
        field: string;
        value: string;
      },
) => {
  if (typeof category === "string") return category.trim();
  const label = [
    category?.name,
    category?.title,
    category?.label,
    category?.field,
    category?.value,
    category?.slug,
  ].find((v) => typeof v === "string" && v.trim());
  return label ? label.trim() : "";
};

export const fetchCategories = async (
  browseableArticles: { field: string }[],
) => {
  const endpoint = endpoints.categories.get;
  try {
    const res = await fetch(endpoint, {
      headers: { Accept: "application/json" },
    });
    const result = await res.json().catch(() => ({}));
    if (!res.ok || !result.success) throw new Error();
    const categories = Array.isArray(result.data) ? result.data : [];
    return categories;
  } catch {
    // Fallback: populate from article data
    const fields = [
      ...new Set(browseableArticles.map((a) => a.field).filter(Boolean)),
    ].sort();
    return fields;
  }
};
