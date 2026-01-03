import { renderHook, act } from '@testing-library/react';
import { useFilter } from './use-filter';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
  usePathname: vi.fn(),
}));

describe('useFilter', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({ push: mockPush });
    (useSearchParams as any).mockReturnValue(new URLSearchParams(''));
    (usePathname as any).mockReturnValue('/shop');
  });

  it('generates correct URL for type filter', () => {
    const { result } = renderHook(() => useFilter());
    
    act(() => {
      result.current.setFilter('type', 'necklaces');
    });

    expect(mockPush).toHaveBeenCalledWith('/shop?type=necklaces');
  });

  it('supports single-select for categories', () => {
    (useSearchParams as any).mockReturnValue(new URLSearchParams('category=silver'));
    const { result } = renderHook(() => useFilter());

    act(() => {
      result.current.setFilter('category', 'gold');
    });

    // Should replace silver with gold
    expect(mockPush).toHaveBeenCalledWith('/shop?category=gold');
  });

  it('removes filter when value is empty', () => {
    (useSearchParams as any).mockReturnValue(new URLSearchParams('type=earrings'));
    const { result } = renderHook(() => useFilter());

    act(() => {
      result.current.setFilter('type', '');
    });

    expect(mockPush).toHaveBeenCalledWith('/shop');
  });

  it('preserves existing filters', () => {
    (useSearchParams as any).mockReturnValue(new URLSearchParams('type=earrings'));
    const { result } = renderHook(() => useFilter());

    act(() => {
      result.current.setFilter('collection', 'summer');
    });

    expect(mockPush).toHaveBeenCalledWith('/shop?type=earrings&collection=summer');
  });
});
