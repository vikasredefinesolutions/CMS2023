import { _ProductDetailsProps } from '@definations/APIs/productDetail.res';
import { NextPage } from 'next';
import { _StoreCache } from 'pages/[slug]/slug';

export interface _RecentlyViewedProps {
  product: _ProductDetailsProps & _StoreCache;
}

export interface _RecentlyViewedTemplates {
  type1: NextPage<_RecentlyViewedProps>;
  type2: NextPage<_RecentlyViewedProps>;
}
