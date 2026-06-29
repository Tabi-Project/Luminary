import { client } from "@/utils/sanity";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Lightbulb, Newspaper } from "lucide-react";
import { urlFor } from "@/utils/sanity";
import { formatDate } from "@/utils/date";
import { Button } from "@/components/common/button";
import { POST_QUERY } from "@/data/sanity";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug });

  const article = post;
  const formattedDate = article?.publishedAt
    ? formatDate(article.publishedAt)
    : "";

  if (!post) {
    return (
      <main className="min-h-screen w-full  px-5 md:px-8 pb-16 pt-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-4">
          <Link href="/news" className="underline">
            Back to News
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <article className="lg:col-span-2  rounded-xl overflow-hidden">
              <div className="px-6 pb-2">
                <h1 className="text-2xl md:text-3xl font-extrabold text-text-main leading-snug tracking-tight">
                  Article not found
                </h1>
              </div>
            </article>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full  px-5 md:px-8 pb-16 pt-4">
      <div className="max-w-5xl mx-auto flex flex-col gap-4">
        <Link href="/news" className="underline">
          Back to News
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <article className="lg:col-span-2 bg-white rounded-xl border border-slate-100 overflow-hidden">
            <div className="flex flex-row gap-2 px-6 py-3 pt-10 text-xs text-muted">
              <span className="rounded-lg bg-slate-100 text-slate-600 px-2.5 py-0.5">
                {article.region}
              </span>
              <span className="rounded-lg bg-slate-100 text-slate-600 px-2.5 py-0.5">
                {article.field}
              </span>
            </div>

            <div className="px-6 pb-2">
              <h1 className="text-2xl md:text-3xl font-extrabold text-text-main leading-snug tracking-tight">
                {article.title}
              </h1>
            </div>

            {article.excerpt && (
              <div className="px-6 pb-4">
                <p className="text-sm text-muted leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            )}

            <div className="border-t border-slate-100 mx-6" />

            <div className="flex items-center gap-2 px-6 py-3 text-xs text-muted">
              <span className="font-medium text-slate-600">
                {article.author || article.source || "Luminary"}
              </span>
              <span>·</span>
              <span>{formattedDate}</span>
              <span>·</span>
              <span>{article.readTime} min read</span>
            </div>

            <div className="relative mx-6 mb-6 rounded-lg overflow-hidden aspect-video bg-slate-100">
              <Image
                src={urlFor(article.coverImage)
                  .width(600)
                  .height(400)
                  .format("webp")
                  .url()}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 640px"
                className="object-cover"
              />
            </div>

            <div className="px-6 pb-8">
              {article.body ? (
                <div
                  className="text-sm text-slate-700 leading-7 space-y-4
                      [&>p]:mb-4
                      [&>h3]:text-base [&>h3]:font-bold [&>h3]:text-text-main [&>h3]:mt-7 [&>h3]:mb-2
                      [&>blockquote]:border-l-4 [&>blockquote]:border-slate-300 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-slate-500 [&>blockquote]:my-5
                      [&>p>strong]:font-semibold"
                  dangerouslySetInnerHTML={{ __html: article.body }}
                />
              ) : (
                <p className="text-sm text-muted italic">
                  No article content provided.
                </p>
              )}

              {article.sourceType === "external" && article.externalUrl && (
                <div className="mt-8">
                  <Link
                    href={article.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-main flex items-center gap-2 text-sm font-light hover:underline  transition-colors duration-200"
                  >
                    Read full story on {article.source || "external site"}
                    <ExternalLink size={14} />
                  </Link>
                </div>
              )}
            </div>
          </article>

          <aside className="lg:col-span-1 flex flex-col gap-5">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-slate-400">
                  <Newspaper />
                </span>
                <h2 className="text-sm font-bold text-text-main">
                  Related Articles
                </h2>
              </div>

              <div>
                <p className="text-sm text-muted italic">
                  No Related Articles Yet
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex flex-col items-center text-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                <Lightbulb size={18} className="text-slate-500" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-text-main mb-1">
                  Have a News Tip?
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  Know a story about a woman making an impact that we should
                  cover? Submit it for our editors to review.
                </p>
              </div>
              <Link href="/submit-story">
                <Button
                  className="items-center gap-2 text-sm font-semibold text-white bg-text-main hover:bg-text-main/90 px-5 py-2.5 rounded-lg transition-colors duration-200"
                  text="Submit a story"
                />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
