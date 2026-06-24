import { type Article } from "../types";
import ArticleCard from "./article-card";

const MAX_GRID_ITEMS = 4;

export default function ArticleList({
  articles,
  articleDetailPage,
}: {
  articles: Article[];
  articleDetailPage: string;
}) {
  return (
    <>
      <div className="news-results__main">
        <div className="news-results__header">
          <div>
            <p className="news-results__eyebrow">Latest Stories</p>
            <h2>Featured reporting from across the Luminary network</h2>
          </div>
          <p id="resultsSummary" className="news-results__summary"></p>
        </div>

        <div id="newsGrid" className="news-grid" aria-live="polite">
          {articles.length === 0 ? (
            <p className="news-empty__copy">
              Unable to load articles right now. Please try again later.
            </p>
          ) : (
            articles
              .slice(0, MAX_GRID_ITEMS)
              .map((article) => (
                <ArticleCard
                  article={article}
                  articleDetailPage={articleDetailPage}
                  key={article.id}
                />
              ))
          )}
        </div>

        <section id="emptyState" className="news-empty" hidden>
          <p className="news-empty__title">
            No articles match those filters yet.
          </p>
          <p className="news-empty__copy">
            Try broadening the field, region, or time range to see more stories.
          </p>
          <button
            id="clearFiltersButton"
            className="news-empty__action"
            type="button"
          >
            Clear filters
          </button>
        </section>
      </div>
    </>
  );
}
