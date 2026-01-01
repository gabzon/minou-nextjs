import fs from 'fs';
import path from 'path';
import { describe, it, expect } from 'vitest';

describe('Theme Configuration', () => {
  const globalsCssPath = path.join(process.cwd(), 'src/app/globals.css');
  const globalsCssContent = fs.readFileSync(globalsCssPath, 'utf-8');

  it('should include the custom font variable for Plus Jakarta Sans', () => {
    // We expect the variable name to be --font-jakarta-sans or similar
    expect(globalsCssContent).toContain('--font-jakarta-sans');
  });

  it('should include the cream background color variable', () => {
     // Light mode background #FAFAF5
    expect(globalsCssContent).toContain('--background: #FAFAF5'); 
  });

  it('should include the deep charcoal background color variable for dark mode', () => {
    // Dark mode background #221015
    expect(globalsCssContent).toContain('--background: #221015');
  });

   it('should include the pastel mint accent color', () => {
    expect(globalsCssContent).toContain('--color-accent-mint');
  });
  
  it('should include the pastel blush accent color', () => {
    expect(globalsCssContent).toContain('--color-accent-blush');
  });
  
   it('should include the pastel butter accent color', () => {
    expect(globalsCssContent).toContain('--color-accent-butter');
  });
});
