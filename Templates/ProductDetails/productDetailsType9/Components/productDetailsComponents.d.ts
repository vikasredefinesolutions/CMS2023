/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { _modals } from '@appComponents/modals/modal';
import { _Reviews } from '@definations/product.type';
import { _ProductRatings, _ProductReview } from '@services/review';

import {
  _ProductDetails,
  _ProductsAlike,
  _SuggestedProduct,
} from '@templates/ProductDetails/productDetailsTypes/productDetail.res';

export interface _AskToLoginprops {
  modalHandler: (val: null | _modals) => void;
}

export interface _DiscountPricingProps {
  title?: string;
  showMsrpLine: boolean;
  price: {
    msrp: number;
    salePrice: number;
  };
  modalHandler: (param: null | _modals) => void;
  showLogin?: boolean;
  isSpecialBrand?: boolean;
}

export interface _NextLogoButtonProps {
  cIndex: {
    label: string;
    value: number;
    price: 'FREE' | number;
  };
  arrayHelpers: any;
}

export interface _ProductAlikeProps {
  storeCode?: string;
  title: string;
  products: _ProductsAlike[] | null;
}

export interface _ProductDetailsProps {
  product: _ProductDetails;
  storeCode: string;
}

export interface _ProductImgProps {
  product: _ProductDetails | null;
}

export interface _ProductInfoProps {
  product: _ProductDetails;
  storeCode: string;
}

export interface _ProductReviewDetailsProps {
  storeCode: string;
  reviewsDeatils: _ProductReview[] | null;
  productId: number | null;
}

export interface _ProductReviewRatingProps {
  storeCode: string;
  ratings: _ProductRatings;
  reviewsDeatils: _ProductReview[] | null;
}

export interface _ProductReviewsProps {
  reviews: _Reviews | null;
  productId: number;
}

export interface _SelectOrInputProps {
  sizeAttributeOptionId: number;
  qty: number;
  size: string;
  price: { msrp: number; ourCost: number; salePrice: number };
  defaultQty: number;
  brandName?: string;
  isSpecialBrand: boolean;
}

export type _SizePriceQtyTableProps = {
  editDetails: {
    price: number;
    qty: number;
    optionValue: string;
  }[];
  isSpecialBrand: boolean;
  brandName?: string;
};

export interface _SOMActionHandlerProps {
  closeStartOrderModal: () => void;
  note: string;
  cartItemId: number;
  isUpdate: boolean;
  logoNowOrLater: 'later' | 'now';
}

export type LogoStatus = string;
export type SelectedLocation = {
  label: string;
  value: string;
  image: {
    url: string;
    alt: string;
  };
  show: boolean;
  price: number;
  cost: number;
} | null;

export type FileToUpload = {
  name: string;
  type: string;
  previewURL: string;
} | null;

export type LogoDetails = {
  logoStatus: LogoStatus;
  selectedLocation: SelectedLocation;
  fileToUpload: FileToUpload;
};

export type logoDetailsAr = Array<LogoDetails>;
export interface _ProductCompanion {
  product: _ProductDetails | null;
}

export interface _SOMLogoOptionProps {
  index: number;
  title: string;
  id: string;
  name: string;
  textIndex: number;
  price: 'FREE' | number;
  onRemove: any;
  editDetails: LogoDetails | null;
}

export interface _TopRatedProductsProps {
  title: string;
  suggestedProducts: _SuggestedProduct[];
}
