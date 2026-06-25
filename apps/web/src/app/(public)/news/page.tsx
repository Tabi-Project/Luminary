import "@/app/styles/news.css";
import { fetchArticlesFromSantry } from "@/utils/sanity";
import NewsSpotlight from "@/components/news/sections/news-spotlight";
import ArticlesSection from "@/components/news/sections/articles-section";
import { type Article } from "@/types/news.types";
import { endpoints } from "@/data/endpoints";

export default async function News() {
  let articles: Article[] = [];
  try {
    articles = await fetchArticlesFromSantry();
  } catch (error) {
    console.error("Error fetching articles:", error);
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
