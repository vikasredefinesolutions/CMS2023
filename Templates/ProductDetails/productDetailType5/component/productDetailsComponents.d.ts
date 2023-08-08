/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { _modals } from '@appComponents/modals/modal';
import { _Reviews } from '@definations/product.type';
import { _ProductRatings } from '@services/review';

import {
  _ProductDetails,
  _ProductsAlike,
  _SuggestedProduct,
} from '@templates/ProductDetails/productDetailsTypes/productDetail.res';

export interface _AskToLoginprops {
  modalHandler: (val: null | _modals) => void;
}

export interface _DiscountPricingProps {
  showMsrpLine: boolean;
  price: {
    msrp: number;
    salePrice: number;
  };
  modalHandler?: (param: null | _modals) => void;
  showLogin?: boolean;
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
  product: _ProductDetails | null;
  storeCode: string;
}

export interface _ProductImgProps {
  product: _ProductDetails | null;
}

export interface _ProductInfoProps {
  product: _ProductDetails | null;
  storeCode: string;
}

export interface _ProductReviewDetailsProps {
  storeCode: string;
  productId: number | null;
}

export interface _ProductReviewRatingProps {
  storeCode: string;
  ratings?: _ProductRatings;
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
}

export type _SizePriceQtyTableProps = {
  editDetails: {
    price: number;
    qty: number;
    optionValue: string;
  }[];
};

export interface _SOMActionHandlerProps {
  closeStartOrderModal: () => void;
  note: string;
  cartItemId: number;
  isUpdate: boolean;
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

export interface _SOMLogoOptionProps {
  index: number;
  title: string;
  id: string;
  name: string;
  textIndex: number;
  price: 'FREE' | number;
  onRemove: () => void;
  editDetails: LogoDetails | null;
}

export interface _TopRatedProductsProps {
  title: string;
  suggestedProducts: _SuggestedProduct[];
}

export interface _ProductCompanion {
  product: _ProductDetails | null;
  companionProductcolor: _ProductColor[] | null;
  companionsplitproductList: _ProductColor[] | null;
}
export type _modals =
  | 'requiredQty'
  | 'sizeChart'
  | 'availableInventory'
  | 'login'
  | 'forgot'
  | 'personalizationFonts'
  | 'qouteRequest'
  | 'startOrder'
  | 'InventoryLimit';
