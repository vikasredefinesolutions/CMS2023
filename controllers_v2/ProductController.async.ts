import { __console_v2 } from '@configs/console.config';
import { _defaultTemplates } from '@configs/template.config';
import { _ProductColor } from '@definations/APIs/colors.res';
import {
  _ProductDetails,
  _ProductDoNotExist,
  _ProductsAlike,
  _ProductSEO,
} from '@definations/APIs/productDetail.res';
import { _SizeChartTransformed } from '@definations/APIs/sizeChart.res';
import { conditionalLog_V2 } from '@helpers/console.helper';
import {
  FetchColors,
  FetchProductById,
  FetchProductSEOtags,
  FetchSimilartProducts,
  FetchSizeChartById,
} from '@services/product.service';
import {
  _FetchPageThemeConfigs_ProductDetails,
  getConfigs,
} from './slug.extras';

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////// TYPES: JUST FOR  THIS PAGE ----------------------------------
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

export interface _FetchProductDetails {
  details: null | _ProductDetails | _ProductDoNotExist;
  colors: null | _ProductColor[];
  sizes: null | _SizeChartTransformed;
  SEO: null | _ProductSEO;
  alike: null | _ProductsAlike[];
  views: string[];
  templateId: string;
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////// SERVER SIDE FUNCTIONS ---------------------------------------
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

export const getProductDetailProps = async (payload: {
  storeId: number;
  seName: string;
  isAttributeSaparateProduct: boolean;
}) => {
  return await FetchProductDetails(payload);
};

export const FetchProductDetails = async (payload: {
  storeId: number;
  seName: string;
  isAttributeSaparateProduct: boolean;
}): Promise<_FetchProductDetails> => {
  let productColors: null | _ProductColor[] = null;
  let productDetails: null | _ProductDetails | _ProductDoNotExist = null;
  let productSizeChart: null | _SizeChartTransformed = null;
  let productSEOtags: null | _ProductSEO = null;
  let productsAlike: null | _ProductsAlike[] = null;
  let productConfigs: null | _FetchPageThemeConfigs_ProductDetails = {
    productDetailTemplateId: _defaultTemplates.productDetails,
  } as _FetchPageThemeConfigs_ProductDetails;
  let views: string[] = [];

  try {
    // Request - 1
    productDetails = await FetchProductById({
      seName: payload.seName,
      storeId: payload.storeId,
      productId: 0, // Not required when fetching details by seName
    });

    if (productDetails?.id) {
      // Request - 2,3,4,5,6 based on 1
      await Promise.allSettled([
        FetchColors({
          productId: productDetails.id,
          storeId: payload.storeId,
          isAttributeSaparateProduct: payload.isAttributeSaparateProduct,
        }),
        FetchSizeChartById(productDetails.id),
        FetchProductSEOtags({
          seName: payload.seName,
          storeId: payload.storeId,
        }),
        FetchSimilartProducts({
          productId: productDetails.id,
          storeId: payload.storeId,
        }),
        getConfigs<_FetchPageThemeConfigs_ProductDetails>(
          payload.storeId,
          'productDetail',
        ),
      ]).then((values) => {
        productColors =
          values[0].status === 'fulfilled' ? values[0].value : null;
        productSizeChart =
          values[1].status === 'fulfilled' ? values[1].value : null;
        productSEOtags =
          values[2].status === 'fulfilled' ? values[2].value : null;
        productsAlike =
          values[3].status === 'fulfilled' ? values[3].value : null;
        productConfigs =
          values[4].status === 'fulfilled' ? values[4].value : null;
      });
    }

    if (productConfigs) {
      productConfigs.sectionDisplay &&
        Object.entries(productConfigs.sectionDisplay).forEach((val: any) => {
          if (val[1].isVisible) {
            views[views.length] = val[0];
          }
        });
    }
  } catch (error) {
    conditionalLog_V2({
      data: error,
      show: __console_v2.allCatch,
      type: 'CATCH',
      name: 'Product Details: Controller - Something went wrong',
    });
  }

  return {
    details: productDetails,
    colors: productColors,
    sizes: productSizeChart,
    SEO: productSEOtags,
    alike: productsAlike,
    views: views,
    templateId: productConfigs.productDetailTemplateId,
  };
};
