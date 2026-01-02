import { createClient } from 'next-sanity';

const client = createClient({
  projectId: '5nz4uhz2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function checkProductData() {
  const products = await client.fetch(`*[_type == "products"]{
    name,
    "hasColor": defined(color),
    "colorCount": count(color),
    color[]->{name, hex},
    "hasMaterials": defined(materials),
    "materialCount": count(materials),
    materials[]->{name}
  }`);
  
  console.log("Products Data:", JSON.stringify(products, null, 2));
}

checkProductData();