export type StoreproductWishListModel = {
  id: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
  customerId: number;
  productId: number | undefined;
  quantity: number;
  name: string | undefined;
  color: string;
  price: number | undefined;
  recStatus: string;
};

export type WishlistRequest = {
  storeproductWishListModel: StoreproductWishListModel;
};

export interface _WishListProps {
  brandId: number;
  iswishlist: boolean;
  productId: number | undefined;
  price: number | undefined;
  color: string;
  name: string | undefined;
  wishlistId: number;
}

export type WishlistType = {
  id: number;
  customerId: number;
  productId: number;
  quantity: number;
  productName: string;
  color: string;
  price: number;
  colorLogoUrl: string;
  seName: string;
};

export interface _GetWishlistApiResponse {
  success: boolean;
  data: WishlistType[];
  errors: {};
  otherData: null;
}

export interface _DeleteWishlistApiResponse {
  success: boolean;
  data: WishlistType;
  errors: {};
  otherData: null;
}

export interface _AddWishlistApiResponse {
  success: boolean;
  data: StoreproductWishListModel;
  errors: {};
  otherData: null;
}
