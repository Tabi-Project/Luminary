// js/sanity.js

export const SANITY_PROJECT_ID = "4czzyaxl";
export const SANITY_DATASET = "production";
export const SANITY_API_VERSION = "2024-01-01";
export const SANITY_WRITE_TOKEN =
  "skZvvZwECsQCN3UdUFHTmxWs1sgKDNkLJ3NQkEeMVSxmJA9wFhqbtKBCX2ZMVesLEyCudNAr97wkWEeTMYgjZMZvybi0KE3W5wMTdQk5sFIcKuSJzf8bwyrLbcP6RfGLb156v8y4FuhJhR2nYC34ZjygCbeJsnL9KvwLpVnZEXw94AyCDEDI";

const QUERY_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`;
const MUTATE_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${SANITY_DATASET}`;
const ASSET_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/assets/images/${SANITY_DATASET}`;

// ── Query (read) ─────────────────────────────────────────────────────────────

export async function sanityQuery(groqQuery: string, params = {}) {
  const url = new URL(QUERY_URL);
  url.searchParams.set("query", groqQuery);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(`$${key}`, JSON.stringify(value));
  }

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Sanity query failed: ${res.status}`);
  const json = await res.json();
  return json.result;
}

// ── Mutate (write) ───────────────────────────────────────────────────────────

export async function sanityMutate(mutations: object | object[]) {
  const res = await fetch(MUTATE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SANITY_WRITE_TOKEN}`,
    },
    body: JSON.stringify({ mutations }),
  });
  if (!res.ok) throw new Error(`Sanity mutation failed: ${res.status}`);
  return res.json();
}

// ── Image upload ─────────────────────────────────────────────────────────────
// Uploads a File object to Sanity's asset pipeline.
// Returns the asset _id to reference in a mutation.

export async function sanityUploadImage(file: File) {
  const res = await fetch(ASSET_URL, {
    method: "POST",
    headers: {
      "Content-Type": file.type,
      Authorization: `Bearer ${SANITY_WRITE_TOKEN}`,
    },
    body: file,
  });
  if (!res.ok) throw new Error(`Image upload failed: ${res.status}`);
  const data = await res.json();
  return data.document._id; // e.g. "image-abc123-800x600-jpg"
}
