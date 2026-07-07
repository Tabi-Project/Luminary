import { Button } from "@/components/common/button";
import Link from "next/link";
import { FeaturedArticleCard } from "../featured-article-card";
import { Article } from "@/types/articles.type";
import { fetchArticlesFromSantry } from "@/actions/sanity";

export async function FeaturedArticleSection() {
  const articles: Article[] | null = await fetchArticlesFromSantry();

  return (
    <section className="w-full">
      <div className="w-full flex items-center justify-between">
        <span className="text-2xl sm:text-4xl font-bold shrink-0">
          Featured Stories
        </span>
        <Link href="/articles">
          <Button text="View all stories" variant="ghost" />
        </Link>
      </div>
      {!articles ? (
        <ErrorState />
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {articles.slice(0, 3).map((article, idx) => (
            <FeaturedArticleCard
              key={idx}
              title={article.title}
              author={article.author}
              tags={[article.field, article.source]}
              className={idx === 2 ? "sm:col-span-2 lg:col-span-1" : ""}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function ErrorState() {
  return (
    <div className="w-full h-62.5 border border-red-400 bg-red-100 rounded-2xl flex flex-col items-center justify-center mt-4">
      <span className="text-3xl font-bold text-red-600">
        Failed to load articles
      </span>
      <span className="text-sm font-medium text-red-600">
        Please try again later
      </span>
    </div>
  );
}
