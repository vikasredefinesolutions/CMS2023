import { _ProductsAlike } from '@definations/APIs/productDetail.res';

import React from 'react';

export interface _YouMayAlsoLikeProps {
  product: _ProductsAlike[] | null;
  id: string;
}

export interface _YouMayAlsoLikeTemplates {
  type1: React.FC<_TemplateProps>;
  type2: React.FC<_TemplateProps>;
  type3: React.FC<_TemplateProps>;
  type4: React.FC<_TemplateProps>;
  type5: React.FC<_TemplateProps>;
}

export interface _TemplateProps {
  productsData: _ProductsAlike[] | null;
}
