import { render, screen } from '@testing-library/react';
import { CollectionsCarousel } from './collections-carousel';
import { describe, it, expect, vi } from 'vitest';

// Mock the Sanity client and urlFor
vi.mock('@/sanity/client', () => ({
  urlFor: () => ({
    width: () => ({
      url: () => 'https://example.com/mock-image.jpg'
    })
  })
}));

const MOCK_COLLECTIONS = [
  { _id: '1', name: 'Summer Collection', slug: 'summer', image: {} },
  { _id: '2', name: 'Winter Collection', slug: 'winter', image: {} },
];

describe('CollectionsCarousel', () => {
  it('renders the section title', () => {
    render(<CollectionsCarousel collections={MOCK_COLLECTIONS} />);
    expect(screen.getByText('Collections')).toBeDefined();
  });

  it('renders collection items', () => {
    render(<CollectionsCarousel collections={MOCK_COLLECTIONS} />);
    expect(screen.getByText('Summer Collection')).toBeDefined();
    expect(screen.getByText('Winter Collection')).toBeDefined();
  });

  it('does not render if no collections provided', () => {
    const { container } = render(<CollectionsCarousel collections={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
