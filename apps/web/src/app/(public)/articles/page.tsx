import "@/app/styles/news.css";
import NewsSpotlight from "@/components/articles/sections/news-spotlight";
import ArticlesSection from "@/components/articles/sections/articles-section";
import { type Article } from "@/types/articles.types";
import { endpoints } from "@/data/endpoints";
import { sanityQuery } from "@/actions/sanity";

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

export default async function News() {
  const articles: Article[] = await fetchArticlesFromSantry();

  if (!articles || articles.length === 0) {
    console.error("Error fetching articles from Sanity");
  }

  const featuredArticle = articles.find((a) => a.featured) || articles[0];
  const browseableArticles = articles.filter(
    (a) => a.id !== featuredArticle?.id,
  );

  return (
    <>
      <main className="news-page">
        <section className="news-container">
          <NewsSpotlight
            featuredArticle={featuredArticle}
            articleDetailPage={endpoints.articles.get}
          />
        </section>

        <ArticlesSection
          browseableArticles={browseableArticles}
          articleDetailPage={endpoints.articles.get}
        />
      </main>
    </>
  );
}
