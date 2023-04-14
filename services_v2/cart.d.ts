export interface ShoppingCartItemDetailsViewModel {
  id: number;
  attributeOptionId: number;
  attributeOptionValue: string;
  qty: number;
  price: number;
}

export interface ShoppingCartLogoPersonViewModel {
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
}

export interface CartObject {
  colorImage: string;
  productName: string;
  productId: number;
  sku: string;
  attributeOptionId: string;
  attributeOptionValue: string;
  shoppingCartItemsId: number;
  shoppingCartItemDetailsViewModels: ShoppingCartItemDetailsViewModel[];
  shoppingCartLogoPersonViewModels: ShoppingCartLogoPersonViewModel[];
  shoppingCartLinePersonViewModel: unknown[];
  totalQty: number;
  totalPrice: number;
  txtcode: unknown;
  seName: string;
  cartLinePersonModels?: unknown[];
  shoppingcartLinePersonModels: unknown[];
}

export type CartList = CartObject[];

export type getCartListResponse = CartList;

export type DeleteCartItemResponse = {
  success: boolean;
  data: Object;
  otherData: null;
  errors: Object;
};

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

export interface CartLinePersonModel {
  attributeOptionId: number | string;
  attributeOptionValue: string;
  code: string;
  cartLinePersonDetailModel: CartLinePersonDetailModel[];
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
  cartLinePersonModels: CartLinePersonModel[];
}
export interface CartReq {
  addToCartModel: AddToCartModel;
}
