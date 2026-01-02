import { createClient } from 'next-sanity';

const client = createClient({
  projectId: '5nz4uhz2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // We want fresh data
});

async function checkData() {
  const genres = await client.fetch(`*[_type == "genre"]{
    _id,
    name,
    "hasImage": defined(image),
    image
  }`);
  
  console.log("Genres found:", JSON.stringify(genres, null, 2));

  const categories = await client.fetch(`*[_type == "category"]{
    _id,
    name,
    "hasImage": defined(image),
    image
  }`);
  
  console.log("Categories found:", JSON.stringify(categories, null, 2));
}

checkData();