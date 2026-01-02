import { render, screen } from '@testing-library/react';
import { GenreGrid } from './genre-grid';
import { describe, it, expect, vi } from 'vitest';

// Mock the Sanity client and urlFor
vi.mock('@/sanity/client', () => ({
  urlFor: () => ({
    width: () => ({
      url: () => 'https://example.com/mock-image.jpg'
    })
  })
}));

const MOCK_GENRES = [
  { _id: '1', name: 'Rings', slug: 'rings' },
  { _id: '2', name: 'Earrings', slug: 'earrings' },
];

describe('GenreGrid', () => {
  it('renders the section title', () => {
    render(<GenreGrid genres={MOCK_GENRES} />);
    expect(screen.getByText('Shop by Type')).toBeDefined();
  });

  it('renders genre items', () => {
    render(<GenreGrid genres={MOCK_GENRES} />);
    expect(screen.getByText('Rings')).toBeDefined();
    expect(screen.getByText('Earrings')).toBeDefined();
  });

  it('does not render if no genres provided', () => {
    const { container } = render(<GenreGrid genres={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
