import { createClient } from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url';
import { defineQuery } from "next-sanity";

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET;
const READ_TOKEN = process.env.SANITY_WRITE_TOKEN;
const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: API_VERSION,
  useCdn: false,
  token: READ_TOKEN,
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