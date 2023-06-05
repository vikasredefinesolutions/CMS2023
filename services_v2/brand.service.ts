import { _Brand } from '@definations/brand';
import { newFetauredItemResponse } from '@definations/productList.type';
import {
  _CategorySiteMap,
  _pagesSiteMap,
} from '@templates/siteMap/siteMapTypes';
import { SendAsync } from '@utils/axios.util';

export const FetchBrands = async (storeId: string) => {
  const url = `/Brand/getbrandbystoreid/${storeId}.json`;
  const res: _Brand[] = await SendAsync({
    url: url,
    method: 'GET',
  });
  return res;
};

export const FetchDIBrands = async (storeId: string, sequence: number) => {
  const url = `/Brand/getstoreproductbrandbysequence/${sequence}/${storeId}.json`;
  const res: _Brand[] = await SendAsync({
    url: url,
    method: 'GET',
  });
  return res;
};

// Added Any for now - husain - 20-3-23
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FetchDataByBrand = async (body: any) => {
  const url = '/StoreProduct/getfeaturedproductitemsbytagnameandsename.json';
  console.log('=>>>>>>>>>>>>>>>>>>>>', body);
  const res: newFetauredItemResponse[] = await SendAsync({
    url: url,
    method: 'POST',
    data: { ...body },
  });
  return res;
};

// for sitemap categories
export const FetchSiteMapCategories = async (id: number) => {
  const url = `/Category/getcategorytreeviewlist/${id}.json`;
  const res: _CategorySiteMap[] = await SendAsync({
    url: url,
    method: 'GET',
  });
  return res;
};
export const FetchSiteMapPages = async (id: number) => {
  const url = `CmsTopicsPublish/getalltopicpublishbystoreid.json`;
  const res: _pagesSiteMap[] = await SendAsync({
    url: url,
    method: 'POST',
    data: { storeId: id },
  });
  return res;
};

// Added by Vikas  - 02-06-2023
export const FetchBrandsBySequence = async (storeId: string) => {
  const url = `/Brand/getstorebrandbysequence/${storeId}.json`;
  const res: _Brand[] = await SendAsync({
    url: url,
    method: 'GET',
  });
  return res;
};
