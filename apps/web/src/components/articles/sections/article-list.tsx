import { type Article, State } from "@/types/articles.types";
import ArticleCard from "../article-card";
import EmptyState from "../empty-state";
import { MAX_GRID_ITEMS } from "@/data/articles";

export default function ArticleList({
  articles,
  articleDetailPage,
  setState,
}: {
  articles: Article[];
  articleDetailPage: string;
  setState: (state: State) => void;
}) {
  return (
    <>
      <div className="news-results__main">
        <div className="news-results__header">
          <div>
            <p className="news-results__eyebrow">Latest Stories</p>
            <h2>Featured reporting from across the Luminary network</h2>
          </div>
          <p id="resultsSummary" className="news-results__summary">
            {articles.length === 0
              ? "No stories matched your current filters."
              : null}
            <br />
            {articles.length > MAX_GRID_ITEMS
              ? `Showing ${MAX_GRID_ITEMS} of ${articles.length} stories.`
              : `${articles.length} currently visible.`}
          </p>
        </div>

        <div
          id="newsGrid"
          className={articles.length ? "news-grid" : ""}
          aria-live="polite"
        >
          {articles.length === 0 ? (
            <EmptyState setState={setState} />
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
      </div>
    </>
  );
}
