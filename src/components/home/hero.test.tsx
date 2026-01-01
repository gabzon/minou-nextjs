import { render, screen } from '@testing-library/react';
import { Hero } from './hero';
import { describe, it, expect } from 'vitest';

describe('Hero', () => {
  it('renders the main headline', () => {
    render(<Hero />);
    expect(screen.getByText(/Wear the/i)).toBeDefined();
    expect(screen.getByText(/Joy/i)).toBeDefined();
  });

  it('renders the New Season badge', () => {
    render(<Hero />);
    expect(screen.getByText(/New Season/i)).toBeDefined();
  });

  it('renders the CTA button', () => {
    render(<Hero />);
    const cta = screen.getByRole('button', { name: /Shop New Drops/i });
    expect(cta).toBeDefined();
  });
});
