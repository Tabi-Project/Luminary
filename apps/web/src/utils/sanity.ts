import { createClient } from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url';
import { defineQuery } from "next-sanity";

export const client = createClient({
  projectId: '4czzyaxl',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: "2025-01-01",
  useCdn: false,
  token: process.env.SANITY_READ_TOKEN ?? 'skZvvZwECsQCN3UdUFHTmxWs1sgKDNkLJ3NQkEeMVSxmJA9wFhqbtKBCX2ZMVesLEyCudNAr97wkWEeTMYgjZMZvybi0KE3W5wMTdQk5sFIcKuSJzf8bwyrLbcP6RfGLb156v8y4FuhJhR2nYC34ZjygCbeJsnL9KvwLpVnZEXw94AyCDEDI',
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);

export function generateSlug(text: string) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')        
    .replace(/[^\w\-]+/g, '')    
    .replace(/\-\-+/g, '-')      
    .replace(/^-+/, '')          
    .replace(/-+$/, '');         
}

export function estimateReadTime(text: string) {
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);
  return readTime;
}

export const POST_QUERY = defineQuery(
  `*[_type == "article" && slug.current == $slug][0]`
);