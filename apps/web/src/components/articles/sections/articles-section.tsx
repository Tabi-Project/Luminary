"use client";
import FilterToolbar from "./filter-toolbar";
import Aside from "./sidebar";
import ArticleList from "./article-list";
import { type Article, State } from "@/types/news.types";
import { getFilteredArticles } from "@/utils/article";
import { useState } from "react";

export default function ArticlesSection({
  browseableArticles,
  articleDetailPage,
}: {
  browseableArticles: Article[];
  articleDetailPage: string;
}) {
  const [state, setState] = useState<State>({
    field: "all",
    region: "all",
    time: "all",
  });
  const filteredArticles = getFilteredArticles(browseableArticles, state);

  return (
    <>
      <section className="news-toolbar-band">
        <div className="news-container">
          <FilterToolbar
            state={state}
            setState={setState}
            articles={filteredArticles}
          />
        </div>
      </section>

      <section className="news-results">
        <ArticleList
          articles={filteredArticles}
          articleDetailPage={articleDetailPage}
          setState={setState}
        />
        <Aside articles={filteredArticles} />
      </section>
    </>
  );
}
