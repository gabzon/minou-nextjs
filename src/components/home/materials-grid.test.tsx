import { render, screen } from '@testing-library/react';
import { MaterialsGrid } from './materials-grid';
import { describe, it, expect } from 'vitest';

describe('MaterialsGrid', () => {
  it('renders the section title', () => {
    render(<MaterialsGrid />);
    expect(screen.getByText('Shop by Material')).toBeDefined();
  });

  it('renders material names', () => {
    render(<MaterialsGrid />);
    expect(screen.getByText(/Polymer Clay/i)).toBeDefined();
    expect(screen.getByText(/UV Resin/i)).toBeDefined();
    expect(screen.getByText(/Gold Plated/i)).toBeDefined();
  });

  it('renders circle thumbnails for each material', () => {
    render(<MaterialsGrid />);
    // Check for the rounded circles in the grid
    const circles = screen.getAllByRole('img', { hidden: true });
    expect(circles.length).toBeGreaterThanOrEqual(3);
  });
});
