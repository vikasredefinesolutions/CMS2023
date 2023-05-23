import { _ProductDetailsProps } from '@definations/APIs/productDetail.res';
import { _StoreCache } from '@definations/slug.type';
import { NextPage } from 'next';

export interface _RecentlyViewedProps {
  product: _ProductDetailsProps & _StoreCache;
}

export interface _RecentlyViewedTemplates {
  type1: NextPage<_RecentlyViewedProps>;
  type2: NextPage<_RecentlyViewedProps>;
}
