import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url'
import { type SanityImageSource } from "@sanity/image-url";

export const client = createClient({
  projectId: '5nz4uhz2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}