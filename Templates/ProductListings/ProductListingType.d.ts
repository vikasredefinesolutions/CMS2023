/* eslint-disable no-unused-vars */
import { splitproductList } from '@definations/productList.type';
import React from 'react';

export interface _ProductListingProps {
  pageData: _PageData;
  slug: string;
  seType: string;
}

export interface _ListingProps {
  filters: FilterType;
  products: ProductList;
  checkedFilters: Array<_CheckedFilter>;
  totalCount: number;
  productView: string;
  showFilter: boolean;
  showSortMenu: boolean;
  skuList: string[];
  compareCheckBoxHandler: (sku: string) => void;
  colorChangeHandler: ColorChangeHandler;
  handleChange: FilterChangeHandler;
  loadMore: () => void;
  sortProductJson: (arg: number) => void;
  setShowSortMenu: (arg: boolean) => void;
  setProductView: (arg: string) => void;
  setShowFilter: (arg: boolean) => void;
  clearFilters: () => void;
  slug?: string;
  seType: string;
  brandId: number | null;
  sortingType?: number;
}

export interface _PageData {
  brandSEO: _BrandSEO;
  filters: _Filter[];
  product: GetlAllProductList[];
  checkedFilters: _CheckedFilter[];
  brandId: number;
}
export interface _FilterOption {
  label: string;
  id: number;
  name: string;
  productCount: number;
  displayOrder: number;
  colorCode: string;
  fromPrice?: number;
  toPrice?: number;
}

export interface _Filter {
  label: string;
  options: _FilterOption[];
}

export interface _CheckedFilter {
  name: string;
  value: string;
}

export interface _BrandSEO {
  brandId: number;
  brandName: string;
  seName: string;
  seTitle: string;
  seKeyWords: string;
  seDescription: string;
}

export interface _ProductListingTemplates {
  type1: React.FC<_ListingProps>;
  type2: React.FC<_ListingProps>;
  type3: React.FC<_ListingProps>;
  type4: React.FC<_ListingProps>;
  type5: React.FC<_ListingProps>;
}

export interface LoginBar {
  text: string;
  color: string;
  font: string;
  background: string;
}

export interface ShippingStatement {
  background: string;
}

export interface ProductBanner {
  html: string;
  loginBar: LoginBar;
  shippingStatement: ShippingStatement;
}

export interface Brand {
  name: string;
  logo: string;
}

export interface Image {
  label: string;
  id: string;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  skuId: string;
  price: string;
  priceUnit: string;
  brand: Brand;
  image: Image;
  description: string;
  createdName: string;
}

export interface SubRow {
  id: number;
  storeId: number;
  productImage: string;
  ourSKU: string;
  name: string;
  recStatus: string;
  upc: string;
  quantity: number;
  price: number;
  category: string;
  createdDate: Date;
  createdBy: number;
  modifiedDate: Date;
  modifiedBy: number;
  location?: string;
  ipAddress?: string;
  macAddress?: string;
}

export interface Item {
  id: number;
  storeId: number;
  productImage: [];
  count: number;
  ourSKU: string;
  name: string;
  recStatus: string;
  upc: string;
  quantity: number;
  ourCost: number;
  msrp: number;
  imap: number;
  salePrice: number;
  categoryId: number;
  category: string;
  brandName: string;
  createdDate: Date;
  createdBy: number;
  modifiedDate?: Date;
  modifiedBy?: number;
  location: string;
  ipAddress: string;
  macAddress: string;
  rowVersion: string;
  createdName: string;
  modifiedName: string;
  subRows: SubRow | number[];
  brandImage: string;
}

export interface ProductListObject {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: Item[];
}

export interface StoreBrandProductColorViewModel {
  label: string;
  id: number;
  name: string;
  productCount: number;
  displayOrder: number;
  colorCode: string;
}

export interface StoreBrandProductSizeViewModel {
  label: string;
  id: number;
  name: string;
  productCount: number;
  displayOrder: number;
}

export interface StoreBrandProductGenderViewModel {
  label: string;
  id: number;
  name?: string;
  productCount: number;
  displayOrder: number;
}

export interface StoreBrandProductProductTypeViewModel {
  label: string;
  id: number;
  name: string;
  productCount: number;
  displayOrder: number;
}

export interface StoreBrandProductPriceRangeViewModel {
  label: string;
  id: number;
  name: string;
  productCount: number;
  displayOrder: number;
}

export interface GetProductImageOptionList {
  id: number;
  imageName?: string;
  colorName?: string;
  displayorder?: number;
  alttag?: string;
  attributeOptionID?: number;
  imageUrl?: string;
  attributeOptionName?: string;
  displayOrder?: number;
  altTag?: string;
  productId?: number;
}

export interface GetlAllProductList {
  isBrandOnline: boolean;
  brandUrl: string;
  getProductImageOptionList?: GetProductImageOptionList[];
  id?: number;
  name?: string;
  productTagViewModel: Array<{
    productId: number;
    imagename: string;
    productTagName: string;
    tagPosition: string;
  }>;
  isspecialbrand: boolean;
  sename?: string;
  msrp: number;
  salePrice: number;
  brandlogo?: string;
  iswishlist?: boolean;
  label?: string;
  wishListId?: number;
  sku?: string;
  imageUrl?: string;
  imap?: string;
  splitproductList: splitproductList[] | null;
  productId?: number;
  productName?: string;
  productSEName?: string;
  productDisplayOrder?: number;
  attributeOptionName?: string;
  blackBrandlogo: string;
  ourCost?: number;
  brandName: string;
  index: number | string;
  lowPrice: number;
  productBrandlogo: string | null;
}

export interface BrandFilter {
  storeBrandProductColorViewModels: StoreBrandProductColorViewModel[];
  storeBrandProductSizeViewModels: StoreBrandProductSizeViewModel[];
  storeBrandProductGenderViewModels: StoreBrandProductGenderViewModel[];
  storeBrandProductProductTypeViewModels: StoreBrandProductProductTypeViewModel[];
  storeBrandProductPriceRangeViewModels: StoreBrandProductPriceRangeViewModel[];
  getlAllProductList: GetlAllProductList[];
  [key: string]: Array<
    | StoreBrandProductColorViewModel
    | StoreBrandProductSizeViewModel
    | StoreBrandProductGenderViewModel
    | StoreBrandProductProductTypeViewModel
    | StoreBrandProductPriceRangeViewModel
    | GetlAllProductList
  >;
}

export type FilterType = Array<{
  label: string;
  options: Array<{
    label: string;
    id: number;
    name: string;
    productCount: number;
    displayOrder: number;
    colorCode: string;
    sename?: string;
    subrows?: {
      id: number;
      name: string;
      productCount: number;
      displayOrder: number;
      sename: string;
    }[];
  }>;
}>;

export type FilterApiRequest = {
  storeID: string | number;
  brandId?: string | number;
  categoryId?: string | number;
  customerId: number;
  filterOptionforfaceteds: Array<{
    name: string;
    value: string;
  }>;
};

export type ProductList = GetlAllProductList[];

export type ColorChangeHandler = (
  productId: number | undefined,
  seName: string | undefined,
  color: string | undefined | null,
) => void;

export type FilterChangeHandler = (
  name: string,
  value: string,
  checked: boolean,
) => void;

export interface StoreCategoryProductCategoryListViewModel {
  label?: string;
  subrows: [];
  id: number;
  name: string;
  productCount: number;
  displayOrder: number;
  sename: string;
}

export interface StoreBrandProductBrandViewModel {
  label: string;
  id: number;
  name: string;
  productCount: number;
  displayOrder: number;
}

export interface CategoryFilter {
  storeBrandProductColorViewModels: StoreBrandProductColorViewModel[];
  storeBrandProductSizeViewModels: StoreBrandProductSizeViewModel[];
  storeBrandProductGenderViewModels: StoreBrandProductGenderViewModel[];
  storeBrandProductProductTypeViewModels: StoreBrandProductProductTypeViewModel[];
  storeBrandProductPriceRangeViewModels: StoreBrandProductPriceRangeViewModel[];
  storeCategoryProductCategoryListViewModel: StoreCategoryProductCategoryListViewModel[];
  storeBrandProductBrandViewModel: StoreBrandProductBrandViewModel[];
  getlAllProductList: GetlAllProductList[];
  [key: string]: Array<
    | StoreBrandProductColorViewModel
    | StoreBrandProductSizeViewModel
    | StoreBrandProductGenderViewModel
    | StoreBrandProductProductTypeViewModel
    | StoreBrandProductPriceRangeViewModel
    | StoreCategoryProductCategoryListViewModel
    | StoreBrandProductBrandViewModel
    | GetlAllProductList
  >;
}

// for banner

export interface Welcome {
  success: boolean;
  data: _BannerRes[];
  errors: Errors;
  otherData: null;
}

export interface _BannerRes {
  id: number;
  brandLogo: string | null;
  description: string;
  banner: string;
  seTitle: null;
  seKeyWords: null;
  seDescription: null;
}

export interface Errors {}
