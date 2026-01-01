import { render, screen } from '@testing-library/react';
import { Header } from './header';
import { ThemeProvider } from 'next-themes';
import { describe, it, expect } from 'vitest';

describe('Header', () => {
  it('renders the logo', () => {
    render(
      <ThemeProvider attribute="class">
        <Header />
      </ThemeProvider>
    );
    expect(screen.getByText('Minou')).toBeDefined();
  });

  it('contains a menu button', () => {
    render(
      <ThemeProvider attribute="class">
        <Header />
      </ThemeProvider>
    );
    // Menu button usually has an icon or sr-only text
    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toBeDefined();
  });

  it('contains a theme toggle', () => {
    render(
      <ThemeProvider attribute="class">
        <Header />
      </ThemeProvider>
    );
    const themeToggle = screen.getByRole('button', { name: /toggle theme/i });
    expect(themeToggle).toBeDefined();
  });
});
