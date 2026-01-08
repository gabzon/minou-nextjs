import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import InfoPageContent from './InfoPageContent';
import { LanguageProvider } from '@/lib/i18n';

// Mock dependencies
vi.mock('@/app/product/[slug]/components/PortableText', () => ({
  default: () => <div data-testid="portable-text">Portable Text Content</div>,
}));

describe('InfoPageContent', () => {
  it('renders localized title when titleKey is provided', () => {
    // We need to run this inside LanguageProvider
    // Default language is now 'hr' based on our previous change
    render(
      <LanguageProvider>
        <InfoPageContent title="Fallback Title" titleKey="nav.about" content={null} />
      </LanguageProvider>
    );

    // Should render "O meni" (HR for nav.about)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('O meni');
  });

  it('renders fallback title when titleKey is not provided', () => {
    render(
      <LanguageProvider>
        <InfoPageContent title="Fallback Title" content={null} />
      </LanguageProvider>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Fallback Title');
  });
});
