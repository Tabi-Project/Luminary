import "@/app/styles/news.css";
import NewsSpotlight from "@/components/articles/sections/news-spotlight";
import ArticlesSection from "@/components/articles/sections/articles-section";
import { type Article } from "@/types/articles.types";
import { endpoints } from "@/data/endpoints";
import { fetchArticlesFromSantry } from "@/actions/sanity";

export default async function News() {
  const articles: Article[] | null = await fetchArticlesFromSantry();

  if (articles === null) {
    throw new Error("Failed to load articles from Sanity");
  } else if (articles.length === 0) {
    return (
      <main className="news-page">
        <section className="news-container">
          <p>No articles available at the moment. Please check back later.</p>
        </section>
      </main>
    );
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
