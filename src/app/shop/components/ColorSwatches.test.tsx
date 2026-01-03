import { render, screen, fireEvent } from '@testing-library/react';
import ColorSwatches from './ColorSwatches';
import { describe, it, expect, vi } from 'vitest';

const MOCK_COLORS = [
  { _id: '1', name: 'Red', hex: '#FF0000' },
  { _id: '2', name: 'Blue', hex: '#0000FF' },
];

describe('ColorSwatches', () => {
  it('renders all colors', () => {
    const onSelect = vi.fn();
    render(<ColorSwatches colors={MOCK_COLORS} selectedColor="" onSelect={onSelect} />);
    // Using title as a proxy for the swatch
    expect(screen.getByTitle('Red')).toBeDefined();
    expect(screen.getByTitle('Blue')).toBeDefined();
  });

  it('calls onSelect when a color is clicked', () => {
    const onSelect = vi.fn();
    render(<ColorSwatches colors={MOCK_COLORS} selectedColor="" onSelect={onSelect} />);
    
    fireEvent.click(screen.getByTitle('Red'));
    expect(onSelect).toHaveBeenCalledWith('Red');
  });

  it('highlights the selected color', () => {
    const onSelect = vi.fn();
    const { container } = render(<ColorSwatches colors={MOCK_COLORS} selectedColor="Red" onSelect={onSelect} />);
    
    // Check for some indicator of selection (e.g., a specific class)
    const activeSwatch = screen.getByTitle('Red');
    expect(activeSwatch.className).toContain('ring-2');
  });
});
