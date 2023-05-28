import { _CartLinePersonDetailModel } from './product.service.type';

export interface ShoppingCartItemDetailsViewModel {
  id: number;
  attributeOptionId: number;
  attributeOptionValue: string;
  qty: number;
  price: number;
  shoppingCartLineOnePersonViewModel: ShoppingCartLinePersonViewModel[];
  shoppingCartLineTwoPersonViewModel: ShoppingCartLinePersonViewModel[];
}

export interface ShoppingCartLinePersonViewModel {
  id: number;
  cartLinePersonId: number;
  linePrice: number;
  lineqty: string;
  lineabovelogo: number;
  lineindividually: number;
  lineNumber: number;
  linetext: string;
  linetotal: number;
  linefont: string;
  linecolor: string;
  parentId: number;
  personalizeLocation: string;
}

export interface ShoppingCartLogoPersonViewModel {
  id: number;
  cartLogoPersonDetailId: number;
  logoImagePath: string;
  logoPrice: number;
  logoLocation: string;
  logoName: string;
  logoPositionImage: string;
  isSewOut: boolean;
  sewOutAmount: number;
  reUsableCustomerLogo: number;
  sku: string;
  size: string;
  name: string;
  qty: number;
}

export interface _CartItem {
  itemNote: string;
  colorImage: string;
  productName: string;
  productId: number;
  isBrandPersonalization: boolean;
  sku: string;
  attributeOptionId: string;
  discountPrice: number;
  attributeOptionValue: string;
  shoppingCartItemsId: number;
  shoppingCartItemDetailsViewModels: ShoppingCartItemDetailsViewModel[];
  shoppingCartLogoPersonViewModels: ShoppingCartLogoPersonViewModel[];
  shoppingCartLinePersonViewModel: unknown[];
  totalCustomFieldsCharges: number;
  totalQty: number;
  totalPrice: number;
  txtcode: string;
  seName: string;
  cartLinePersonModels?: unknown[]; // dobutful
  categoryName?: string; // dobutful
  brandName?: string; // dobutful
  logoTotalPrice: number;
  lineTotalPrice: number;
  productTotal: number;
  shoppingCartItemsCustomFieldViewModel: ShoppingCartItemsCustomFieldViewModel[];
  isBrandPersonalization: boolean;
  displayLineAttributeOptions: DisplayLineAttributeOption[];
}

export type DeleteCartItemResponse = {
  success: boolean;
  data: Object;
  otherData: null;
  errors: Object;
};

export interface ShoppingCartItemsCustomFieldViewModel {
  id: number;
  cartItemsId: number;
  storeProductCustomFieldName: string;
  storeProductCustomFieldValue: string;
  customizationCharges: number;
  isRequired: boolean;
  isExclusive: boolean;
  isChargePerCharacter: boolean;
  quantity: number;
  subTotal: number;
  productId: number;
}

export interface DisplayLineAttributeOption {
  attributeOptionName: string;
  linePersonalizeDetails: linePersonalizeDetails[];
}

export interface linePersonalizeDetails {
  font: string;
  color: string;
  location: string;
  line1Text: string;
  line2Text: string;
}

export type AddPromoCodeReq = {
  promotionsModel: {
    customerId: number;
    couponCode: string;
    storeId: number;
    taxCost: number;
    shippingCost: number;
  };
};

export type AddPromoCodeResponse = {
  success: boolean;
  data: {
    couponCode: string;
    percentage: string;
    discountAmount: string;
    isFreeShipping: boolean;
    taxCost: string;
    shiipingCost: string;
  };
  otherData: null;
  errors: { [key: string]: string };
};

// =============

export interface ShoppingCartItemModel {
  id: number;
  price: number;
  quantity: number;
  weight: number;
  productType: number;
  discountPrice: number;
  logoTitle: string;
  logogImagePath: string;
  perQuantity: number;
  appQuantity: number;
  status: number;
  discountPercentage: number;
  productCustomizationId: number;
  itemNotes: string;
  isEmployeeLoginPrice: number;
}

export interface ShoppingCartItemsDetailModel {
  attributeOptionName: string;
  attributeOptionValue: string;
  attributeOptionId: string | number;
}

export interface CartLogoPersonModel {
  id?: number;
  attributeOptionId: number | string;
  attributeOptionValue: string;
  code: string;
  price: number;
  quantity: number;
  estimateDate: Date;
  isEmployeeLoginPrice: number;
}

export interface CartLogoPersonDetailModel {
  id: number;
  logoPrice: number;
  logoQty: number;
  logoFile: string;
  logoLocation: string;
  logoTotal: number;
  colorImagePath: string;
  logoUniqueId: string;
  price: number;
  logoColors: string;
  logoNotes: string;
  logoDate: Date;
  logoNames: string;
  digitalPrice: number;
  logoPositionImage: string;
  oldFilePath: string;
  isSewOut: boolean;
  sewOutAmount: number;
  reUsableCustomerLogo: number;
  originalLogoFilePath: string;
}

export interface CartLinePersonDetailModel {
  linePrice: number;
  lineQty: number;
  lineAboveLogo: number;
  lineIndividually: number;
  lineNumber: number;
  lineText: string;
  lineTotal: number;
  lineFont: string;
  lineColor: string;
  linePriceDouble: number;
  logoCartId: number;
  personalizeLocation: string;
}

export interface AddToCartModel {
  customerId: number;
  productId: number;
  storeId: number;
  isempLogin: boolean;
  shoppingCartItemModel: ShoppingCartItemModel;
  shoppingCartItemsDetailModels: ShoppingCartItemsDetailModel[];
  cartLogoPersonModel: CartLogoPersonModel[];
  cartLogoPersonDetailModels: CartLogoPersonDetailModel[];
}
export interface CartReq {
  addToCartModel: AddToCartModel;
}

export interface CartPersonalizationReq {
  cartLinePersonDetailModel: _CartLinePersonDetailModel[];
}

export interface PersonalizationFont {
  id: number;
  name: string;
  image: string;
  storeId: number;
  displayOrder: number;
  recStatus: string;
  createdBy: number;
  modifiedBy: number;
  createdDate: string;
  modifiedDate: string;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
}

export interface PersonalizationLocation {
  id: number;
  name: string;
  storeId: number;
  displayOrder: number;
  recStatus: string;
  createdBy: number;
  modifiedBy: null;
  createdDate: string;
  modifiedDate: null;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
}

export interface PersonalizationColor {
  id: number;
  name: string;
  storeId: number;
  displayOrder: number;
  recStatus: string;
  createdBy: number;
  modifiedBy: null;
  createdDate: string;
  modifiedDate: null;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
}
export interface updateCartQuantity {
  cartLogoPersonId: number;
  quantity: number | undefined;
  attributeOptionId: number | string;
}

export interface updateCartQuantityRes {
  updateCartLinePersonModel: updateCartQuantity;
}

export interface removeParticularSizeProduct {
  cartLogoPersonId: number;
  attributeOptionId: number | string;
}
export interface removeParticularSizeProductRes {
  deletecartlogopersonmodel: deletecartlogopersonmodel;
}

export interface removeLogoRes {
  deletecartlogopersondetailmodel: {
    cartLogoPersonDetailId: number;
    shoppingCartItemsId: number;
  };
}

export interface _sbsStore {
  id: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
  shoppingCartItemsId: number | string;
  isRequired: boolean;
  isExclusive: boolean;
  isChargePerCharacter: boolean;
  storeProductCustomFieldName: string;
  storeProductCustomFieldValue: string | number;
  customizationCharges: number;
}

export interface sbsStore {
  shoppingCartItemsCustomFieldModel: _sbsStore[];
}
