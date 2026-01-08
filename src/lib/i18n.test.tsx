import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { LanguageProvider, useLanguage } from './i18n';
import React from 'react';

// Mock component to display the current language
const TestComponent = () => {
  const { language } = useLanguage();
  return <div data-testid="current-language">{language}</div>;
};

describe('LanguageProvider', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('defaults to "hr" when no language is saved in localStorage', async () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    // Wait for the component to be mounted and visible
    await waitFor(() => {
        expect(screen.getByTestId('current-language')).toBeVisible();
    });

    // Expect the language to be 'hr'
    expect(screen.getByTestId('current-language')).toHaveTextContent('hr');
  });

  it('uses saved language from localStorage if present', async () => {
    localStorage.setItem('minou-lang', 'en');
    
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    await waitFor(() => {
        expect(screen.getByTestId('current-language')).toBeVisible();
    });

    expect(screen.getByTestId('current-language')).toHaveTextContent('en');
  });
});
