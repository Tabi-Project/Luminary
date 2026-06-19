"use server";

const SANITY_PROJECT_ID  = '4czzyaxl'
const SANITY_DATASET     = 'production'
const SANITY_API_VERSION = '2024-01-01'
const SANITY_WRITE_TOKEN = 'skZvvZwECsQCN3UdUFHTmxWs1sgKDNkLJ3NQkEeMVSxmJA9wFhqbtKBCX2ZMVesLEyCudNAr97wkWEeTMYgjZMZvybi0KE3W5wMTdQk5sFIcKuSJzf8bwyrLbcP6RfGLb156v8y4FuhJhR2nYC34ZjygCbeJsnL9KvwLpVnZEXw94AyCDEDI'

const QUERY_URL  = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`
const MUTATE_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${SANITY_DATASET}`
const ASSET_URL  = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/assets/images/${SANITY_DATASET}`

export async function sanityQuery(groqQuery: string, params: Record<string, any> = {}) {
  const url = new URL(QUERY_URL)
  url.searchParams.set('query', groqQuery)

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(`$${key}`, JSON.stringify(value))
  }

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`Sanity query failed: ${res.status}`)
  const json = await res.json()
  return json.result
}

export async function sanityMutate(mutations: any[]) {
  const res = await fetch(MUTATE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SANITY_WRITE_TOKEN}`
    },
    body: JSON.stringify({ mutations })
  })
  if (!res.ok) throw new Error(`Sanity mutation failed: ${res.status}`)
  return res.json()
}

export async function sanityUploadImage(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided");

  const res = await fetch(ASSET_URL, {
    method: 'POST',
    headers: {
      'Content-Type': file.type,
      'Authorization': `Bearer ${SANITY_WRITE_TOKEN}`
    },
    body: file
  })
  if (!res.ok) throw new Error(`Image upload failed: ${res.status}`)
  const data = await res.json()
  return data.document._id
}
