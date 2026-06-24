"use client";
import FilterToolbar from "./filter-toolbar";
import Aside from "./sidebar";
import ArticleList from "./article-list";
import { type Article } from "../types";
import { getFilteredArticles } from "../utils";

export default function ArticlesSection({
  browseableArticles,
  articleDetailPage,
}: {
  browseableArticles: Article[];
  articleDetailPage: string;
}) {
  const state = { field: "all", region: "all", time: "all" };
  const filteredArticles = getFilteredArticles(browseableArticles, state);

  return (
    <>
      <section className="news-toolbar-band">
        <div className="news-container">
          <FilterToolbar />
        </div>
      </section>

      <section className="news-results">
        <ArticleList
          articles={filteredArticles}
          articleDetailPage={articleDetailPage}
        />
        <Aside />
      </section>
    </>
  );
}
