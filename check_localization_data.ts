import { createClient } from 'next-sanity';

const client = createClient({
  projectId: '5nz4uhz2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function checkData() {
  const data = await client.fetch(`{
    "product": *[_type == "products"][0] {
      name,
      description,
      shortDescription
    },
    "category": *[_type == "category"][0] {
      name
    },
    "color": *[_type == "color"][0] {
      name
    },
    "genre": *[_type == "genre"][0] {
      name
    },
    "material": *[_type == "material"][0] {
      name
    }
  }`);
  
  console.log("Localization Check:", JSON.stringify(data, null, 2));
}

checkData();