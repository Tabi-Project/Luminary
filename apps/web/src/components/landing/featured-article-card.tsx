import Link from "next/link";
import { cn } from "@/utils/cn";
import { capitalizeFirstLetter } from "@/utils/string";

interface FeaturedArticleCardProps {
  title: string;
  tags: string[];
  author: string;
  slug: string;
  className?: string;
}

export function FeaturedArticleCard({
  title,
  tags,
  author,
  slug,
  className,
}: FeaturedArticleCardProps) {
  return (
    <Link href={`/articles/${slug}`} className="block">
      <div
        className={cn(
          "w-full h-fit sm:h-62.5 flex flex-col gap-3 justify-between p-6 bg-muted-blue rounded-xl hover:opacity-90 transition-opacity",
          className,
        )}
      >
        <h2 className="text-2xl font-bold line-clamp-4">{title}</h2>
        <div>
          <div className="flex overflow-hidden gap-2 mb-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-light-gray text-text-main rounded-md px-2 py-1 text-sm font-semibold truncate"
              >
                {capitalizeFirstLetter(tag)}
              </span>
            ))}
          </div>
          <p className="text-muted font-light truncate">{author}</p>
        </div>
      </div>
    </Link>
  );
}
