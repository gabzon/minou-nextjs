import { render, screen } from '@testing-library/react';
import { Hero } from './hero';
import { describe, it, expect } from 'vitest';

const MOCK_FEATURED = [
  {
    _id: '1',
    name: 'Featured Product 1',
    slug: { current: 'prod-1' },
    price: 100,
    images: [{ asset: { _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg' } }]
  }
];

describe('Hero', () => {
  it('renders the intro card', () => {
    render(<Hero />);
    expect(screen.getByText(/Wear the/i)).toBeDefined();
    expect(screen.getByText(/Shop New Drops/i)).toBeDefined();
  });

  it('renders product information', () => {
    render(<Hero featuredProducts={MOCK_PRODUCTS} />);
    expect(screen.getByText('Featured Product 1')).toBeDefined();
    expect(screen.getByText('100 €')).toBeDefined();
  });

  it('renders without featured products (graceful fallback)', () => {
    render(<Hero />);
    // Should still see the intro card
    expect(screen.getByText(/Wear the/i)).toBeDefined();
    // But no product specific elements
    expect(screen.queryByText('Featured Product 1')).toBeNull();
  });
});