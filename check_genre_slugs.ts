import { createClient } from 'next-sanity';

const client = createClient({
  projectId: '5nz4uhz2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function checkData() {
  const genres = await client.fetch(`*[_type == "genre"]{
    _id,
    name,
    "slug": slug.current
  }`);
  
  console.log("Genres:", JSON.stringify(genres, null, 2));
}

checkData();