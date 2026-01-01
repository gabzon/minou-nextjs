import { render, screen } from '@testing-library/react';
import { MainLayout } from './main-layout';
import { describe, it, expect } from 'vitest';

describe('MainLayout', () => {
  it('renders children', () => {
    render(
      <MainLayout>
        <div data-testid="child">Child Content</div>
      </MainLayout>
    );
    expect(screen.getByTestId('child')).toBeDefined();
  });

  it('applies mobile wrapper classes', () => {
    const { container } = render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    );
    // Expect a div with max-w-md (max width mobile) and centering
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('max-w-md');
    expect(wrapper.className).toContain('mx-auto');
  });
});
