import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FaqContent from './FaqContent';
import { LanguageProvider } from '@/lib/i18n';

describe('FaqContent', () => {
  it('renders localized title', () => {
    // Default language is 'hr'
    render(
      <LanguageProvider>
        <FaqContent faqs={[]} />
      </LanguageProvider>
    );

    // Should render "Česta pitanja" (HR for nav.faq)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Česta pitanja');
  });
});
