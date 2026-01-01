'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import urlBuilder from '@sanity/image-url';
import { client } from '@/sanity/client';

const builder = urlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function urlFor(source: any) {
  return builder.image(source);
}

interface Image {
  asset: { _ref: string };
  alt?: string;
}

interface Props {
  images: Image[];
}

export default function ImageGallery({ images }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const slides = images.map((img) => ({
    src: urlFor(img).url(),
    alt: img.alt,
  }));

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={urlFor(images[selectedIndex]).url()}
          alt={images[selectedIndex]?.alt || 'Product image'}
          className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setIsOpen(true)}
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative aspect-square overflow-hidden rounded-md border-2 ${
                selectedIndex === idx ? 'border-rose-500' : 'border-gray-200'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={urlFor(img).url()}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={slides}
          index={selectedIndex}
        />
      )}
    </div>
  );
}