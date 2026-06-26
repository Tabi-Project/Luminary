import { type Article } from "@/types/articles.types";
import { buildArticleUrl } from "@/utils/article";
import { escapeHtml } from "@/utils/string";
import { formatDate } from "@/utils/date";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ArticleCard({
  article,
  articleDetailPage,
}: {
  article: Article;
  articleDetailPage: string;
}) {
  return (
    <article className="story-card">
      <Link
        className="story-card__link"
        href={buildArticleUrl(article?.slug, articleDetailPage)}
      >
        <div className="story-card__media">
          <Image
            className="story-card__image"
            src={escapeHtml(article?.imageUrl || "")}
            alt=""
            loading="lazy"
            decoding="async"
            width={300}
            height={168}
          />
          <span className="story-card__tag">{escapeHtml(article?.field)}</span>
        </div>
        <div className="story-card__body">
          <div className="story-card__meta">
            <span>{escapeHtml(article?.source || article?.author)}</span>
            <span>{escapeHtml(formatDate(article?.date))}</span>
          </div>
          <h3 className="story-card__title">{escapeHtml(article?.title)}</h3>
          <p className="story-card__summary">{escapeHtml(article?.summary)}</p>
          <div className="story-card__footer">
            <span>{escapeHtml(article?.readTime?.toString() || "")}</span>
            <ArrowUpRight
              className="story-card__footer-arrow"
              aria-hidden="true"
            />
          </div>
        </div>
      </Link>
    </article>
  );
}
