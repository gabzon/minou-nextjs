import { render, screen } from '@testing-library/react';
import { CollectionsCarousel } from './collections-carousel';
import { describe, it, expect } from 'vitest';

describe('CollectionsCarousel', () => {
  it('renders the section title', () => {
    render(<CollectionsCarousel />);
    expect(screen.getByText('Collections')).toBeDefined();
  });

  it('renders a "See All" link', () => {
    render(<CollectionsCarousel />);
    expect(screen.getByText(/See All/i)).toBeDefined();
  });

  it('renders collection items', () => {
    render(<CollectionsCarousel />);
    // We expect some sample collections for now
    expect(screen.getByText(/Summer Rays/i)).toBeDefined();
  });
});
