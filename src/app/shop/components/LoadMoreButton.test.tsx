import { render, screen, fireEvent } from '@testing-library/react';
import LoadMoreButton from './LoadMoreButton';
import { describe, it, expect, vi } from 'vitest';

describe('LoadMoreButton', () => {
  it('renders button when hasMore is true', () => {
    const onLoadMore = vi.fn();
    render(<LoadMoreButton hasMore={true} isLoading={false} onLoadMore={onLoadMore} />);
    expect(screen.getByRole('button')).toBeDefined();
  });

  it('calls onLoadMore when clicked', () => {
    const onLoadMore = vi.fn();
    render(<LoadMoreButton hasMore={true} isLoading={false} onLoadMore={onLoadMore} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onLoadMore).toHaveBeenCalled();
  });

  it('shows loading state', () => {
    const onLoadMore = vi.fn();
    render(<LoadMoreButton hasMore={true} isLoading={true} onLoadMore={onLoadMore} />);
    expect(screen.getByText(/loading/i)).toBeDefined();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is hidden when hasMore is false', () => {
    const onLoadMore = vi.fn();
    const { container } = render(<LoadMoreButton hasMore={false} isLoading={false} onLoadMore={onLoadMore} />);
    expect(container.firstChild).toBeNull();
  });
});
