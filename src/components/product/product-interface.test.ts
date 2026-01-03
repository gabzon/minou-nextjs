import { describe, it, expectTypeOf } from 'vitest';
import { type Product } from './product-card';

describe('Product Interface', () => {
  it('should have category and color properties', () => {
    type ProductHasCategory = Product extends { category: any } ? true : false;
    type ProductHasColor = Product extends { color: any } ? true : false;

    expectTypeOf<ProductHasCategory>().toEqualTypeOf<true>();
    expectTypeOf<ProductHasColor>().toEqualTypeOf<true>();
  });
});