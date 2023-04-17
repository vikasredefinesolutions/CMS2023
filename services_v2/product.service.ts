import { __console_v2 } from '@configs/console.config';
import { CategoriesByPid } from '@definations/APIs/category.res';
import { _ProductColor } from '@definations/APIs/colors.res';
import { _ProductDiscountTable } from '@definations/APIs/discountTable.res';
import {
  _ProductInventory,
  _ProductInventoryTransfomed,
} from '@definations/APIs/inventory.res';
import {
  _FetchProductsRecentlyViewedPayload,
  _LogoLocation,
  _ProductBySku,
  _ProductDetails,
  _ProductDoNotExist,
  _ProductsAlike,
  _ProductSEO,
  _ProductsRecentlyViewed,
  _ProductsRecentlyViewedPayload,
  _ProductsRecentlyViewedResponse,
} from '@definations/APIs/productDetail.res';
import {
  _SizeChart,
  _SizeChartTransformed,
} from '@definations/APIs/sizeChart.res';
import {
  BrandFilter,
  CategoryFilter,
  FilterApiRequest,
} from '@definations/productList.type';
import { CallAPI_v2 } from '@helpers/api.helper';
import { conditionalLog_V2 } from '@helpers/console.helper';
import { _FeaturedProduct } from '@templates/ProductDetails/productDetailsTypes/storeDetails.res';
import { SendAsync } from '@utils/axios.util';
import { _SubmitRequestConsultationPayload } from './product';
import {
  _ProductDetailsConfig,
  _ProductListingConfig,
} from './product.service.type';

export type _ProducDetailAPIs_V2 =
  | 'FetchColors'
  | 'FetchProductById'
  | 'FetchSizeChartById'
  | 'FetchInventoryById'
  | 'FetchProductSEOtags'
  | 'FetchProductsBySKUs'
  | 'FetchBrandProductList'
  | 'FetchProductsTagsName'
  | 'FetchSimilartProducts'
  | 'FetchDiscountTablePrices'
  | 'FetchLogoLocationByProductId'
  | 'SumbitRequestConsultationDetails'
  | 'FetchFeaturedProducts'
  | 'FetchProductsBySKUs';

export type _ProductDetailService_V2 = {
  service: 'productDetails';
  api: _ProducDetailAPIs_V2;
};

export const FetchProductById = async (payload: {
  seName: string;
  storeId: number | null;
  productId: number;
}): Promise<_ProductDetails | null | _ProductDoNotExist> => {
  const url = `StoreProduct/getstoreproductbysename/${payload.seName}/${payload.storeId}/${payload.productId}.json`;

  conditionalLog_V2({
    data: payload,
    show: __console_v2.product.service.FetchProductById,
    type: 'API-PAYLOAD',
    name: 'FetchProductById',
  });

  try {
    const res = await SendAsync<_ProductDetails>({
      url: url,
      method: 'GET',
    });

    if (res === null) {
      conditionalLog_V2({
        // @ts-ignore: Unreachable code error
        data: res.otherData,
        show: __console_v2.product.service.FetchProductById,
        type: 'API-RESPONSE',
        name: 'FetchProductById',
      });
      // @ts-ignore: Unreachable code error
      return { id: null, productDoNotExist: res.otherData };
    }
    return res;
  } catch (error) {
    conditionalLog_V2({
      // @ts-ignore: Unreachable code error
      data: error,
      show: __console_v2.product.service.FetchProductById,
      type: 'API-ERROR',
      name: 'FetchProductById',
    });
    return null;
  }
};

export const FetchColors = async ({
  productId,
  storeId,
  isAttributeSaparateProduct,
}: {
  productId: number;
  storeId: number | null;
  isAttributeSaparateProduct: boolean;
}): Promise<_ProductColor[] | null> => {
  let url = '';
  if (isAttributeSaparateProduct === true) {
    url = `StoreProduct/getproductattributecolorbyseparation/${productId}/${storeId}.json`;
  } else {
    url = `StoreProduct/getproductattributecolor/${productId}.json`;
  }

  const response = await CallAPI_v2<_ProductColor[]>({
    name: {
      service: 'productDetails',
      api: 'FetchColors',
    },
    request: {
      url: url,
      method: 'POST',
    },
  });

  return response;
};

/*---------------------------Request Consultation---------------------------*/

export const SumbitRequestConsultationDetails = async (
  payload: _SubmitRequestConsultationPayload,
) => {
  const url = '/ConsultationAndProof/Create.json';

  const response = await CallAPI_v2({
    name: {
      service: 'productDetails',
      api: 'SumbitRequestConsultationDetails',
    },
    request: {
      url: url,
      method: 'POST',
      data: payload,
    },
  });

  return response;
};

/*--------------------------- HOME --------------------------*/
export const FetchFeaturedProducts = async (payload: {
  storeId: number;
  brandId: number;
  maximumItemsForFetch: number;
}): Promise<_FeaturedProduct[] | null> => {
  const url = '/StoreProduct/getfeaturedproductitems.json';

  const response = await CallAPI_v2<_FeaturedProduct[]>({
    name: {
      service: 'productDetails',
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

/*---------------------------Product List --------------------------*/

export const FetchFiltersJsonByBrand = async (
  filterRequest: FilterApiRequest,
) => {
  const url = `/StoreProductFilter/GetFilterByBrandByCatche.json`;
  const res = await SendAsync<BrandFilter>({
    url: url,
    method: 'POST',
    data: filterRequest,
  });

  return res;
};
export const FetchProductListingConfig = async (
  storeId: string,
  configName: string,
) => {
  const url = `CmsStoreThemeConfigs/getstorethemeconfigs/${storeId}/${configName}.json`;
  const res = await SendAsync<_ProductListingConfig>({
    url: url,
    method: 'GET',
  });
  return res;
};

export const FetchProductDetailsConfig = async (
  storeId: string,
  configName: string,
) => {
  const url = `CmsStoreThemeConfigs/getstorethemeconfigs/${storeId}/${configName}.json`;
  const res = await SendAsync<_ProductDetailsConfig>({
    url: url,
    method: 'GET',
  });
  return res;
};
export const FetchFiltersJsonByCategory = async (
  filterRequest: FilterApiRequest,
) => {
  const url = `/StoreProductFilter/GetFilterByCategoryByCatche.json`;
  const res = await SendAsync<CategoryFilter>({
    url: url,
    method: 'POST',
    data: filterRequest,
  });

  return res;
};

export const FetchCategoryByproductId = async (
  productId: number,
  storeId: number | null,
): Promise<CategoriesByPid> => {
  const url = `/Category/getcategorysbyproductid/${storeId}/${productId}.json`;
  const res = await SendAsync<CategoriesByPid>({
    url,
    method: 'GET',
  });

  return res;
};

export const FetchInventoryById = async (payload: {
  productId: number;
  attributeOptionId: number[];
}): Promise<_ProductInventoryTransfomed | null> => {
  const url = `StoreProduct/getproductattributesizes.json`;
  function removeDuplicates(arr: string[]) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }

  const response = await CallAPI_v2<_ProductInventory[]>({
    name: {
      service: 'productDetails',
      api: 'FetchInventoryById',
    },
    request: {
      url: url,
      method: 'POST',
      data: payload,
    },
  });

  if (response === null) {
    return null;
  }

  const sizes = payload.attributeOptionId.map((id) => {
    const repeatedSizes = response
      .map((int) => {
        if (int.colorAttributeOptionId === id) {
          return int.name;
        }
        return '';
      })
      .filter(Boolean);

    return {
      colorAttributeOptionId: id,
      sizeArr: removeDuplicates(repeatedSizes),
    };
  });

  const transformedData: _ProductInventoryTransfomed = {
    inventory: response,
    sizes: sizes,
  };
  return transformedData;
};

export const FetchSimilartProducts = async (payload: {
  storeId: number | null;
  productId: number;
}): Promise<_ProductsAlike[] | null> => {
  const url = `StoreProduct/getyoumaylikeproducts/${payload.productId}/${payload.storeId}.json`;

  const response = await CallAPI_v2<_ProductsAlike[]>({
    name: {
      service: 'productDetails',
      api: 'FetchSimilartProducts',
    },
    request: {
      url: url,
      method: 'POST',
      data: payload,
    },
  });

  return response;
};

export const FetchProductSEOtags = async ({
  storeId,
  seName,
}: {
  storeId: number;
  seName: string;
}): Promise<_ProductSEO | null> => {
  const url = `StoreProductSeo/GetDetails/${storeId}/${seName}.json`;

  const response = await CallAPI_v2<_ProductSEO>({
    name: {
      service: 'productDetails',
      api: 'FetchProductSEOtags',
    },
    request: {
      url: url,
      method: 'GET',
    },
  });

  return response;
};

export const FetchSizeChartById = async (
  payload: number,
): Promise<_SizeChartTransformed | null> => {
  const url = `StoreProduct/getsizechartbyproductid/${payload}.json`;
  const response = await CallAPI_v2<_SizeChart>({
    name: {
      service: 'productDetails',
      api: 'FetchSizeChartById',
    },
    request: {
      url: url,
      method: 'GET',
    },
  });

  // const response = await SendAsync<_SizeChart>({
  //e   url: url,
  //   mthod: 'GET',
  //   data: payload,
  // });

  if (response !== null) {
    const sizeChart: [{ [key: string]: string }] = JSON.parse(
      response.sizeChartView,
    );

    const transformedData: _SizeChartTransformed = {
      ...response,
      sizeChartRange: response.sizeChartRange.split(','),
      sizeChartView: sizeChart[0],
      measurements: response.measurements.split(','),
    };
    return transformedData;
  }

  return null;
};

export const InsertProductRecentlyViewed = async (
  payload: _ProductsRecentlyViewedPayload,
): Promise<_ProductsRecentlyViewed | null> => {
  const url = `StoreProductRecentlyViewed/insertproductrecentlyview.json`;
  try {
    const res = await SendAsync<_ProductsRecentlyViewed>({
      url: url,
      method: 'POST',
      data: payload,
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const fetchCategoryByCategoryId = async (
  catId: number,
  storeId: number,
): Promise<CategoriesByPid> => {
  const url = `/Category/getcategorypathbycategoryid/${storeId}/${catId}.json`;
  const res = await SendAsync<CategoriesByPid>({
    url,
    method: 'GET',
  });

  return res;
};
export const FetchProductRecentlyViewed = async (
  payload: _FetchProductsRecentlyViewedPayload,
): Promise<_ProductsRecentlyViewedResponse[]> => {
  const url = `StoreProductRecentlyViewed/getproductsrecentlyview.json`;

  const res = await SendAsync<_ProductsRecentlyViewedResponse[]>({
    url: url,
    method: 'POST',
    data: payload,
  });
  return res;
};
export const FetchLogoLocationByProductId = async (payload: {
  productId: number;
}): Promise<_LogoLocation | null> => {
  const url = `StoreProduct/getproductlogolocationdetails/${payload.productId}.json`;

  const response = await CallAPI_v2<_LogoLocation>({
    name: {
      service: 'productDetails',
      api: 'FetchLogoLocationByProductId',
    },
    request: {
      url: url,
      method: 'GET',
    },
  });
  return response;
};

export const FetchProductList = async (storeId: string) => {
  const url = '/StoreProduct/list.json';
  const res = await SendAsync({
    url: url,
    method: 'POST',
    data: {
      args: {
        pageIndex: 0,
        pageSize: 6,
        pagingStrategy: 0,
        sortingOptions: [
          {
            field: 'string',
            direction: 0,
            priority: 0,
          },
        ],
        filteringOptions: [
          {
            field: 'string',
            operator: 0,
            value: 'string',
          },
        ],
      },
      storeId: storeId,
    },
  });
  return res;
};

export const FetchDiscountTablePrices = async (payload: {
  storeId: number;
  seName: string;
  customerId: number;
  attributeOptionId: number;
}): Promise<_ProductDiscountTable | null> => {
  const url = `StoreProduct/getproductquantitydiscounttabledetail.json`;

  const response = await CallAPI_v2<_ProductDiscountTable>({
    name: {
      service: 'productDetails',
      api: 'FetchDiscountTablePrices',
    },
    request: {
      url: url,
      method: 'POST',
      data: payload,
    },
  });

  return response;
};

export const FetchProductsBySKUs = async (payload: {
  SKUs: string;
  storeId: number;
}): Promise<_ProductBySku[] | null> => {
  const url = `StoreProduct/getstoreproductbyskus/${payload.SKUs}/${payload.storeId}.json`;

  const response = await CallAPI_v2<_ProductBySku[]>({
    name: {
      service: 'productDetails',
      api: 'FetchProductsBySKUs',
    },
    request: {
      url: url,
      method: 'POST',
      data: payload,
    },
  });

  return response;
};