import "@/app/styles/news.css";
import { fetchArticlesFromSantry } from "@/utils/news";
import NewsSpotlight from "@/components/news/sections/news-spotlight";
import ArticlesSection from "@/components/news/sections/articles-section";
import { type Article } from "@/types/news.types";

export default async function News() {
  //   const [rendered, setRendered] = useState(false);
  let articles: Article[] = [];
  try {
    articles = await fetchArticlesFromSantry();
  } catch (error) {
    console.error("Error fetching articles:", error);
  }

  const articleDetailPage = "./article";

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
            articleDetailPage={articleDetailPage}
          />
        </section>

        <ArticlesSection
          browseableArticles={browseableArticles}
          articleDetailPage={articleDetailPage}
        />
      </main>
    </>
  );
}
