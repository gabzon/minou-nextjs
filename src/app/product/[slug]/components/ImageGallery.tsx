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
      {/* Mobile: Horizontal Scroll Snap */}
      <div className="flex sm:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-4 mx-2 px-2 no-scrollbar mt-4">
        {images.map((img, idx) => (
          <div key={idx} className="snap-center shrink-0 w-[85vw] aspect-[4/5] rounded-[2rem] overflow-hidden bg-gray-100 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={urlFor(img).width(600).url()}
              alt={img.alt || 'Product image'}
              className="w-full h-full object-cover"
              onClick={() => {
                setSelectedIndex(idx);
                setIsOpen(true);
              }}
            />
          </div>
        ))}
      </div>

      {/* Desktop: Main Image + Thumbnails */}
      <div className="hidden sm:block relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={urlFor(images[selectedIndex]).url()}
          alt={images[selectedIndex]?.alt || 'Product image'}
          className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
          onClick={() => setIsOpen(true)}
        />
      </div>

      {images.length > 1 && (
        <div className="hidden sm:grid grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all ${selectedIndex === idx ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-gray-200'
                }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={urlFor(img).width(200).url()}
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