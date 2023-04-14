import { ProductReviewCounts } from '@services/review';
import { NextPage } from 'next';

export interface _Reviews {}
export interface _ReviewDetailsProps {
  productId: number;
  storeCode: string;
  attributeId: number;
  // eslint-disable-next-line no-undef, no-unused-vars
  modalHandler: (val: null | _modals) => void;
  userId: number | null;
  reviewsCount: ProductReviewCounts | undefined;
}
export interface _ReviewDetailsTemplates {
  type1: NextPage<_ReviewDetailsProps>;
  type2: NextPage<_ReviewDetailsProps>;
}
