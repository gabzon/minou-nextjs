'use client';

import { PortableText } from '@portabletext/react';

/* eslint-disable @typescript-eslint/no-explicit-any */
const components = {
  block: {
    h1: (props: any) => <h1 className="text-3xl font-bold mb-4">{props.children}</h1>,
    h2: (props: any) => <h2 className="text-2xl font-bold mb-3">{props.children}</h2>,
    h3: (props: any) => <h3 className="text-xl font-bold mb-2">{props.children}</h3>,
    normal: (props: any) => <p className="mb-4">{props.children}</p>,
  },
  list: {
    bullet: (props: any) => <ul className="list-disc list-inside mb-4">{props.children}</ul>,
    number: (props: any) => <ol className="list-decimal list-inside mb-4">{props.children}</ol>,
  },
};
/* eslint-enable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PortableTextRenderer({content}: {content: any[]}) {
  return <PortableText value={content} components={components} />;
}