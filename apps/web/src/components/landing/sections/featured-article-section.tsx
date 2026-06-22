import { Button } from "@/components/common/button";
import { FeaturedArticleCard } from "../featured-article-card";

export function FeaturedArticleSection() {
  const articles = [
    {
      title: "Women in African Finance Today",
      tags: ["Technology", "Africa"],
      author: "Luminary",
    },
    {
      title:
        "An Assessment of Geo-Political Representation of Women in the 2023 Elections in Nigeria: The Role of the Media",
      tags: ["Leadership", "Africa"],
      author: "Author Name",
    },
    {
      title:
        "Northwood Space Secures $100M Series B and $50M Space Force Contract",
      tags: ["Technology", "Africa"],
      author: "Luminary",
    },
  ];

  return (
    <section className="w-full">
      <div className="w-full flex items-center justify-between">
        <span className="text-4xl font-bold">Featured Stories</span>
        <Button text="View all stories" />
      </div>
      <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {articles.map((article, idx) => (
          <FeaturedArticleCard
            {...article}
            key={idx}
            className={idx === 2 ? "col-span-2 lg:col-span-1" : ""}
          />
        ))}
      </div>
    </section>
  );
}
