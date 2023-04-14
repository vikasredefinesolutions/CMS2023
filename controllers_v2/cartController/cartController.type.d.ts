export type EmpCustomQtyPriceType = Array<
  Array<{
    attributeOptionId: number;
    size: string;
    qty: number;
    price: number;
    id: number;
  }>
>;

export interface fetchCartData {
  logoImagePath: string;
  logoPrice: number;
  logoLocation: string | null;
  logoName: string;
  logoPositionImage: string;
  sku?: string;
  size?: string;
  name?: string;
}

export interface LogoLocationDetail {
  logoLocationDetailId: number;
  name: string;
  image: string;
  threeDImage: string;
  threeDLogoLocationClass: string;
  price: number;
  cost: number;
  brandGuideLines: boolean;
}

export type FileToUpload = {
  name: string;
  type: string;
  previewURL: string;
} | null;

export interface ShoppingCartLogoPersonViewModel {
  logoImagePath: string;
  logoPrice: number;
  logoLocation: string | null;
  logoName: string;
  logoPositionImage: string;
  sku?: string;
  size?: string;
  name?: string;
}
