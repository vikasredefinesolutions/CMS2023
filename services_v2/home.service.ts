import { CallAPI_v2 } from '@helpers/api.helper';
import { _FeaturedProduct } from '@templates/ProductDetails/productDetailsTypes/storeDetails.res';

export type _HomeAPIs = 'FetchFeaturedProducts' | 'getPageComponents';

export interface _HomeServices {
  service: 'home';
  api: _HomeAPIs;
}

export const FetchFeaturedProducts = async (payload: {
  storeId: number;
  brandId: number;
  maximumItemsForFetch: number;
}): Promise<_FeaturedProduct[] | null> => {
  const url = '/StoreProduct/getfeaturedproductitems.json';

  const response = await CallAPI_v2<_FeaturedProduct[]>({
    name: {
      service: 'home',
      api: 'FetchFeaturedProducts',
    },
    request: {
      url: url,
      method: 'POST',
      data: payload,
    },
  });

  return response;
};

export const getPageComponents = async (payload: {
  pageId: number;
  type: string;
}) => {
  const url = `CmsComponents/getpagecomponents.json`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await CallAPI_v2<any>({
    name: {
      service: 'home',
      api: 'getPageComponents',
    },
    request: {
      url: url,
      method: 'POST',
      data: payload,
    },
  });

  return response;
};
