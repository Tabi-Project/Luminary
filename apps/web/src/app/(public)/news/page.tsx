import "@/app/styles/news.css";
import { fetchArticlesFromSantry, getFilteredArticles } from "./utils";
import NewsSpotlight from "./components/news-spotlight";
import ArticlesSection from "./components/articles-section";
import { type Article } from "./types";

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
      <main className="bg-(--color-bg-300) news-page">
        <section className="news-container">
          <NewsSpotlight
            featuredArticle={featuredArticle}
            articleDetailPage={articleDetailPage}
          />
        </section>

        <ArticlesSection browseableArticles={browseableArticles} />
      </main>
    </>
  );
}
