import { _Brand } from '@definations/brand';
import { SendAsync } from '@utils/axios.util';

import {
  _MenuCategory,
  _StoreMenu,
  _t_Brands,
  _t_MenuCategory,
} from '@definations/header.type';
import { CallAPI_v2 } from '@helpers/api.helper';
import { _BannerRes } from '@templates/banner/Banner';

export type _HeaderAPIs =
  | 'FetchBrands'
  | 'FetchBannerDetails'
  | 'FetchStoreMenu'
  | 'FetchMenuTopics'
  | 'FetchMenuCategories'
  | 'FetchCatalog';

export type _HeaderServices = {
  service: 'header';
  api: _HeaderAPIs;
};

export const FetchBrands = async ({
  storeId,
}: {
  storeId: number;
}): Promise<_t_Brands | null> => {
  const url = `Brand/getbrandbystoreid/${storeId}.json`;

  const response = await CallAPI_v2<_Brand[]>({
    name: {
      api: 'FetchBrands',
      service: 'header',
    },
    request: {
      url: url,
      method: 'GET',
    },
  });

  const transformed: _t_Brands = {
    brands: response,
    dataType: 'BRANDS',
  };

  return transformed;
};
export const FetchCatalog = async ({
  storeId,
}: {
  storeId: number;
}): Promise<_t_Brands | null> => {
  const url = `/Brand/getstoreproductbrandbysequence/2/${storeId}.json`;

  const response = await CallAPI_v2<_Brand[]>({
    name: {
      api: 'FetchCatalog',
      service: 'header',
    },
    request: {
      url: url,
      method: 'GET',
    },
  });

  const transformed: _t_Brands = {
    brands: response,
    dataType: 'BRANDS',
  };
  console.log(transformed, 'console.log(first)');

  return transformed;
};
export const FetchBannerDetails = async (payload: {
  storeId: number;
  isBrand: boolean;
  sename: string;
}): Promise<_BannerRes[] | null> => {
  const url = `Brand/getbannerdeatilsbystoreid.json?isbrand=${payload.isBrand}&storeid=${payload.storeId}&sename=${payload.sename}`;

  const response = await CallAPI_v2<_BannerRes[]>({
    name: {
      api: 'FetchBannerDetails',
      service: 'header',
    },
    request: {
      url: url,
      method: 'GET',
    },
  });

  return response;
};

export const FetchStoreMenu = async (payload: {
  storeId: number;
}): Promise<_StoreMenu[] | null> => {
  const url = `CmsStoreThemeConfigs/getMenuConfig`;

  const response = await CallAPI_v2<_StoreMenu[]>({
    name: {
      api: 'FetchStoreMenu',
      service: 'header',
    },
    request: {
      url: url,
      method: 'POST',
      data: payload,
    },
  });

  return response;
};

export const FetchMenuCategories = async (payload: {
  storeId: number;
  categoryId: number;
}): Promise<_t_MenuCategory | null> => {
  const url = `Category/getcategorysbyparentid/${payload.categoryId}/${payload.storeId}.json`;

  const response = await CallAPI_v2<_MenuCategory[]>({
    name: {
      api: 'FetchMenuCategories',
      service: 'header',
    },
    request: {
      url: url,
      method: 'GET',
    },
  });

  const transformed: _t_MenuCategory = {
    categories: response,
    dataType: 'CATEGORIES',
  };

  return transformed;
};

export const FetchMenuCategoriesWithBrand = async (payload: {
  storeId: number;
  categoryId: number;
}): Promise<_t_MenuCategory | null> => {
  const url = `/Category/getcategoryswithbrandbyparentid/${payload.categoryId}/${payload.storeId}/true.json`;

  const response = await CallAPI_v2<_MenuCategory[]>({
    name: {
      api: 'FetchMenuCategories',
      service: 'header',
    },
    request: {
      url: url,
      method: 'GET',
    },
  });

  const transformed: _t_MenuCategory = {
    categories: response,
    dataType: 'CATEGORIES',
  };

  return transformed;
};

//For CG only
export const getGTMScript = async (
  storeId: number,
  scriptType: string,
  isLoggedIn?: number,
): Promise<string | null> => {
  const url = `ga4cg/DataLayer/${scriptType}/${storeId}${
    isLoggedIn ? '/' + isLoggedIn : ''
  }.json`;
  const resposne = await SendAsync<string>({
    url: url,
    method: 'GET',
  });
  return resposne;
};

//For CG only
export const getGTMHomeScript = async (
  storeId: number,
  scriptType: string,
  customerId: number,
): Promise<any | null> => {
  const url = `ga4cg/DataLayer/${scriptType}/${storeId}/${customerId}.json`;
  const resposne = await SendAsync<any>({
    url: url,
    method: 'GET',
  });
  return resposne;
};

//For CG only
export const postGTMScript = async (
  scriptName: string,
  payload: Record<string, any>,
) => {
  const url = `ga4cg/DataLayer/${scriptName}.json`;
  const response = await SendAsync<any>({
    url,
    method: 'POST',
    data: payload,
  });
  return response;
};

//For all store
export const getGTMScriptForAllStore = async (
  storeId: number,
  scriptType: string,
  customerId?: number,
): Promise<any | null> => {
  const url = `ga4forallstore/${scriptType}/${storeId}/${customerId}.json`;
  const resposne = await SendAsync<string>({
    url: url,
    method: 'GET',
  });
  return resposne;
};

//For all store
export const postGTMScriptForAllStore = async (
  scriptName: string,
  payload: Record<string, any>,
  customerId?: number | string | null,
) => {
  const url = `ga4forallstore/${scriptName}${
    customerId ? '/' + customerId : ''
  }.json`;
  const response = await SendAsync<any>({
    url,
    method: 'POST',
    data: payload,
  });
  return response;
};
