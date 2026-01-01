import { render, screen } from '@testing-library/react';
import { ProductGrid } from './product-grid';
import { describe, it, expect } from 'vitest';

const MOCK_PRODUCTS = [
  {
    _id: '1',
    name: 'Sunset Drop Earrings',
    price: 25,
    slug: { current: 'sunset-drop-earrings' },
    images: [{ asset: { _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg' } }],
    isNew: true,
  },
  {
    _id: '2',
    name: 'Cloud Nine Studs',
    price: 18,
    slug: { current: 'cloud-nine-studs' },
    images: [{ asset: { _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg' } }],
  },
];

describe('ProductGrid', () => {
  it('renders the section title', () => {
    render(<ProductGrid products={MOCK_PRODUCTS} title="Freshly Baked" />);
    expect(screen.getByText('Freshly Baked')).toBeDefined();
  });

  it('renders product names and prices', () => {
    render(<ProductGrid products={MOCK_PRODUCTS} title="Freshly Baked" />);
    expect(screen.getByText('Sunset Drop Earrings')).toBeDefined();
    expect(screen.getByText('$25')).toBeDefined();
    expect(screen.getByText('Cloud Nine Studs')).toBeDefined();
    expect(screen.getByText('$18')).toBeDefined();
  });

  it('renders the "New" badge for new products', () => {
    render(<ProductGrid products={MOCK_PRODUCTS} title="Freshly Baked" />);
    expect(screen.getByText('New')).toBeDefined();
  });

  it('renders "View All Products" button', () => {
    render(<ProductGrid products={MOCK_PRODUCTS} title="Freshly Baked" />);
    expect(screen.getByText(/View All Products/i)).toBeDefined();
  });
});
