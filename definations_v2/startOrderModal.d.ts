/* eslint-disable no-unused-vars */

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

export interface _CI_ShoppingCartItemDetailsViewModel {
  id: number;
  attributeOptionId: number;
  attributeOptionValue: string;
  qty: number;
  price: number;
}

export interface _CI_ShoppingCartLogoPersonViewModel {
  id: number;
  cartLogoPersonDetailId: number;
  logoImagePath: string;
  logoPrice: number;
  logoLocation: string;
  logoName: string;
  logoPositionImage: string;
  sku?: string;
  size?: string;
  name?: string;
  qty: number;
  isSewOut: boolean;
  sewOutAmount: number;
  reUsableCustomerLogo: number;
}

export interface _CartItem {
  colorImage: string;
  productName: string;
  productId: number;
  sku: string;
  attributeOptionId: string;
  attributeOptionValue: string;
  shoppingCartItemsId: number;
  shoppingCartItemDetailsViewModels: _CI_ShoppingCartItemDetailsViewModel[];
  shoppingCartLogoPersonViewModels: _CI_ShoppingCartLogoPersonViewModel[];
  shoppingCartLinePersonViewModel: unknown[];
  totalQty: number;
  totalPrice: number;
  txtcode: unknown;
  seName: string;
  cartLinePersonModels?: unknown[];
  shoppingcartLinePersonModels: unknown[];
}

export type CartProducts = _CartItem[];

export interface _startOrderModalProps {
  product: _ProductDetails;
  modalHandler: (val: null | _modals) => void;
  editDetails?: _CartItem;
}

export interface _ProductPolicy {
  storeId: number;
  brandID: number | null;
  brandName: string | null;
  isBrandOnline: boolean;
  isPolicywithcheckbox: boolean;
  policyMessage: string;
  isEnduserDisplay: boolean;
}
