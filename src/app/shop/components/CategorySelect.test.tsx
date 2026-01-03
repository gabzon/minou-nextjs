import { render, screen, fireEvent } from '@testing-library/react';
import CategorySelect from './CategorySelect';
import { describe, it, expect, vi } from 'vitest';

// Mock useLanguage
vi.mock('@/lib/i18n', () => ({
  useLanguage: () => ({
    getLocalized: (name: any) => name.en,
    t: (key: string) => key,
  }),
}));

const MOCK_CATEGORIES = [
  { _id: '1', name: { en: 'Gold', hr: 'Zlato' }, slug: 'gold' },
  { _id: '2', name: { en: 'Silver', hr: 'Srebro' }, slug: 'silver' },
];

describe('CategorySelect', () => {
  it('renders select with options', () => {
    const onChange = vi.fn();
    render(<CategorySelect categories={MOCK_CATEGORIES} selectedCategory="" onChange={onChange} />);
    
    expect(screen.getByRole('combobox')).toBeDefined();
    expect(screen.getByText('Gold')).toBeDefined();
    expect(screen.getByText('Silver')).toBeDefined();
  });

  it('calls onChange when selection changes', () => {
    const onChange = vi.fn();
    render(<CategorySelect categories={MOCK_CATEGORIES} selectedCategory="" onChange={onChange} />);
    
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'gold' } });
    expect(onChange).toHaveBeenCalledWith('gold');
  });
});
