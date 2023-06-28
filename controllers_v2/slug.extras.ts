import { FetchPageThemeConfigs } from '@services/product.service';
import { GetlAllProductList } from '@templates/ProductListings/ProductListingType';
import { _Banner } from '@templates/banner';

// FUNCTIONS
const parseJson = <T>(
  toParse: string | undefined,
  page: 'productDetail' | 'productListing',
): T | null => {
  if (toParse && page === 'productDetail') {
    return JSON.parse(toParse) as T;
  }

  if (toParse && page === 'productListing') {
    return JSON.parse(toParse) as T;
  }

  return null;
};

export const getConfigs = async <T>(
  storeId: number,
  page: 'productDetail' | 'productListing',
): Promise<T | null> => {
  let send: T | null = null;
  await FetchPageThemeConfigs(storeId.toString(), page).then((response) => {
    if (page === 'productDetail') {
      send = parseJson(response.config_value, page) as T;
    }

    if (page === 'productListing') {
      send = parseJson(response.config_value, page) as T;
    }
  });

  return send;
};

// TYPES
export interface _ProductList_PropsData {
  filters: _Filter[];
  product: GetlAllProductList[];
  checkedFilters: _CheckedFilter[];
  brandId: number;
  googleTagManagerResponseCommonData: any | null;
  categoryComponents: string | null;
  banner: _Banner[] | null;
}

export interface _BrandSEO {
  brandId: number;
  brandName: string;
  seName: string;
  seTitle: string;
  seKeyWords: string;
  seDescription: string;
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

export interface _GetProductImageOptionList2 {
  id: number;
  imageName: string;
  colorName: string;
  displayorder: number;
  alttag: string;
}

export interface Product {
  getProductImageOptionList: _GetProductImageOptionList2[];
  id: number;
  name: string;
  sename: string;
  msrp: number;
  salePrice: number;
  brandlogo: string;
  iswishlist: boolean;
  wishListId: number;
  displayOrder: number;
  blackBrandlogo?: string;
}

export interface _CheckedFilter {
  name: string;
  value: string;
}
export interface _NameValuePairs {
  name: string;
  value: string;
}
export interface _FetchPageThemeConfigs_ProductDetails {
  productDetailTemplateId: string;
  sectionDisplay: {
    youmayalsolike: { isVisible: boolean; value: string };
    recentlyviewed: { isVisible: boolean; value: string };
    writereview: { isVisible: boolean; value: string };
  };
  myAccountTemplateId: number;
  customize_logo: boolean;
  customizeLogoTemplate: string;
}

export interface _FetchPageThemeConfigs_ProductListing {
  templateID: string;
  breadCrumbTemplateId: string;
  bannertype: string;
}
