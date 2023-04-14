import { _ProductDetailsProps } from '@templates/ProductDetails/productDetailsTypes/productDetail.res';

export interface _ProductRecentlyViewedProps {
  title: string;
  product: _ProductDetailsProps | null;
  storeCode: string;
}
