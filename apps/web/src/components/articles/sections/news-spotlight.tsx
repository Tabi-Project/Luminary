import { buildArticleUrl } from "@/utils/article";
import { formatDate } from "@/utils/date";
import { type Article } from "@/types/articles.type";
import Link from "next/link";
import Image from "next/image";
import { escapeHtml } from "@/utils/string";

export default function NewsSpotlight({
  featuredArticle,
  articleDetailPage,
}: {
  featuredArticle: Article;
  articleDetailPage: string;
}) {
  return (
    <>
      <article
        className="news-spotlight"
        aria-labelledby="featuredArticleTitle"
      >
        <div className="spotlight-copy">
          <p className="spotlight-eyebrow">Daily Spotlight</p>
          <h1 id="featuredArticleTitle" className="spotlight-title">
            {featuredArticle?.title}
          </h1>
          <p id="featuredArticleSummary" className="spotlight-summary">
            {featuredArticle?.summary}
          </p>
          <div id="featuredArticleMeta" className="spotlight-meta">
            {[
              featuredArticle?.author,
              featuredArticle?.source,
              formatDate(featuredArticle?.date),
            ]
              .filter(Boolean)
              .map((item) => (
                <span key={item}>{escapeHtml(item)}</span>
              ))}
          </div>

          <Link
            id="featuredArticleLink"
            className="spotlight-link"
            href={
              featuredArticle?.slug
                ? buildArticleUrl(featuredArticle?.slug, articleDetailPage)
                : "#"
            }
            aria-disabled={!featuredArticle?.slug}
          >
            Read Full Article
          </Link>
        </div>

        <div className="spotlight-media" aria-hidden="true">
          <div className="spotlight-media__frame">
            <Image
              id="featuredArticleImage"
              className="spotlight-media__image"
              src={featuredArticle?.imageUrl || "/placeholder.png"}
              alt={featuredArticle?.title || "Featured article image"}
              width={1280}
              height={915}
            />
            <span id="featuredArticleField" className="spotlight-media__chip">
              {featuredArticle?.field}
            </span>
          </div>
        </div>
      </article>
    </>
  );
}
