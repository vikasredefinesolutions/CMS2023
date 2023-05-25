/* eslint-disable no-unused-vars */

import { _CartItem } from '@services/cart';

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

export interface _ProductDetails {
  productBrandLogo: string | null;
  id: number;
  storeId: number;
  name: string;
  description: string;
  shortDescription: string;
  quantity: number;
  ourCost: number;
  msrp: number;
  imap: number;
  salePrice: number;
  companionProductId: number | null;
  companionProductName: string | null;
  companionProductSEName: string | null;
  companionProductImage: string | null;
  isEnableLogolocation: boolean;
  sku: string;
  brandID: number | null;
  brandName: string | null;
  brandImage: string | null;
  sizes: string;
  brandColorLogoUrl: string;
  brandBannerImage: null;
  isDiscontinue: boolean;
  discontinueDate: string;
  discontinueEndDate: string;
  suggestedProducts: _SuggestedProduct[];
  isBrandOnline: boolean;
  isPolicywithcheckbox: boolean;
  policyMessage: string;
  isEnduserDisplay: boolean;
  isSpecialBrand: boolean;
  categoryName?: string;
  brandSEname: string | null;
}

export interface _SuggestedProduct {
  id: number;
  name: string;
  sku: string;
  ourCost: string;
  brandName: string;
  brandId: number;
  msrp: string;
  imap: string;
  salePrice: string;
  seName: string;
  image: string;
  categoryId: number;
  storeId: number;
}

export interface _startOrderModalProps {
  product: _ProductDetails;
  modalHandler: (val: null | _modals) => void;
  edit?: _CartItem;
}
