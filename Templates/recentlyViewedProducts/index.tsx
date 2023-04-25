import { _defaultTemplates } from '@configs/template.config';
import React from 'react';
import {
  _RecentlyViewedProps,
  _RecentlyViewedTemplates,
} from './RecetlyViewed.d';
import ProductRecetlyViewed_Type1 from './RecetlyViewed_Type1';
import ProductRecetlyViewed_Type2 from './RecetlyViewed_Type2';

const ProductRecetlyViewedTemplates: _RecentlyViewedTemplates = {
  type1: ProductRecetlyViewed_Type1,
  type2: ProductRecetlyViewed_Type2,
};
const ProductRecentlyViewed: React.FC<_RecentlyViewedProps> = ({ product }) => {
  const ProductRecetlyViewedTemplate =
    ProductRecetlyViewedTemplates[_defaultTemplates.recentlyViewedProducts];
  return <ProductRecetlyViewedTemplate product={product} />;
};

export default ProductRecentlyViewed;
