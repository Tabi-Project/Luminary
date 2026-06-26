import "@/app/styles/news.css";
import NewsSpotlight from "@/components/articles/sections/news-spotlight";
import ArticlesSection from "@/components/articles/sections/articles-section";
import { type Article } from "@/types/articles.types";
import { endpoints } from "@/data/endpoints";
import { fetchArticlesFromSantry } from "@/actions/sanity";

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
