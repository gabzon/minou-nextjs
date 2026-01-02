import { createClient } from 'next-sanity';

const client = createClient({
  projectId: '5nz4uhz2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function checkData() {
  // Query for the singleton document. Usually singletons have a specific ID or type.
  // The user said "siteSetting schema". Let's try to find it.
  const settings = await client.fetch(`*[_type == "siteSettings"][0]`);
  
  console.log("Site Settings:", JSON.stringify(settings, null, 2));
}

checkData();