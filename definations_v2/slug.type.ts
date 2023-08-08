import { __pageTypeConstant } from '@constants/global.constant';

export type _PageTypesAvailable =
  | __pageTypeConstant.cmsPages
  | __pageTypeConstant.category
  | __pageTypeConstant.productDetails
  | __pageTypeConstant.brand
  | __pageTypeConstant.notFound
  | __pageTypeConstant.stories // ===> All story categories
  | __pageTypeConstant.blog; // ===> Individual Story

export interface _GetPageType {
  id: number;
  name: string;
  type: string;
  meta_Title: string;
  meta_Description: string;
  meta_Keywords: string;
  storeId: number;
  slug: string;
  description: null;
  isbreadcrumbShow: null;
  openGraphImagePath: string;
  openGraphTitle: string;
  openGraphDescription: string;
  twitterImagePath: string;
  twitterOpenGraphTitle: string;
  twitterOpenGraphDescription: string;
  pinterestImagePath: string;
  pinterestOpenGraphTitle: string;
  pinterestOpenGraphDescription: string;
  facebookImagePath: string;
  facebookOpenGraphTitle: string;
  facebookOpenGraphDescription: string;
  linkedinImagePath: string;
  linkedinOpenGraphTitle: string;
  linkedinOpenGraphDescription: string;
}

export interface _StoreCache {
  storeCode: string;
  storeTypeId: number;
}

export interface FilterOption {
  label: string;
  id: number;
  name: string;
  productCount: number;
  displayOrder: number;
  colorCode: string;
  fromPrice?: number;
  toPrice?: number;
}

export interface Filter {
  label: string;
  options: FilterOption[];
}

export interface GetProductImageOptionList2 {
  id: number;
  imageName: string;
  colorName: string;
  displayorder: number;
  alttag: string;
}

export interface Product {
  getProductImageOptionList: GetProductImageOptionList2[];
  id: number;
  name: string;
  sename: string;
  msrp: number;
  salePrice: number;
  brandlogo: string;
  iswishlist: boolean;
  wishListId: number;
  displayOrder: number;
}

export interface CheckedFilter {
  name: string;
  value: string;
}
