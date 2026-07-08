import { type Article } from "@/types/articles.type";
import { escapeHtml } from "@/utils/string";
import { formatDate } from "@/utils/date";

export default function RoundupItem({
  article,
  index,
}: {
  article: Article;
  index: number;
}) {
  return (
    <li className="roundup-item">
      <span className="roundup-item__index">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <p className="roundup-item__title">{escapeHtml(article.title)}</p>
        <p className="roundup-item__meta">
          {escapeHtml(article.source || article.author)} ·
          {escapeHtml(formatDate(article.date))}
        </p>
      </div>
    </li>
  );
}
