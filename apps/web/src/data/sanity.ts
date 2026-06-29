import { defineQuery } from "next-sanity";

export const QUERY_URL = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v${process.env.NEXT_PUBLIC_SANITY_API_VERSION}/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;
export const MUTATE_URL = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v${process.env.NEXT_PUBLIC_SANITY_API_VERSION}/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;
export const ASSET_URL = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v${process.env.NEXT_PUBLIC_SANITY_API_VERSION}/assets/images/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;

export const POST_QUERY = defineQuery(
  `*[_type == "article" && slug.current == $slug][0]`,
);

export const QUERY = `
      *[_type == "article" && status == "published"]
      | order(publicationDate desc) {
        "id": _id,
        title,
        "slug": slug.current,
        author,
        source,
        "summary": excerpt,
        field,
        region,
        readTime,
        "imageUrl": coverImage.asset->url,
        featured,
        "date": publicationDate,
        externalUrl,
        sourceType
      }
    `;
