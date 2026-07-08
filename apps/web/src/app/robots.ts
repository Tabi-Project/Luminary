import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/", "/_error", "/api/", "/admin"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl?.replace(/^https?:\/\//, ""),
  };
}
