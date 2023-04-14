export interface _CI_ShoppingCartItemDetailsViewModel {
  id: number;
  attributeOptionId: number;
  attributeOptionValue: string;
  qty: number;
  price: number;
}

export interface _CI_ShoppingCartLogoPersonViewModel {
  logoImagePath: string;
  logoPrice: number;
  logoLocation: string | null;
  logoName: string;
  logoPositionImage: string;
  sku?: string | undefined;
  size?: string | undefined;
  name?: string | undefined;
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
  shoppingCartLinePersonViewModel: any[];
  totalQty: number;
  totalPrice: number;
  txtcode: any;
  seName: string;
  cartLinePersonModels?: any[]; // Not recieved in the response
  shoppingcartLinePersonModels: any[]; // Not recieved in the response
}

export type CartProducts = _CartItem[];
