import { __console_v2 } from '@configs/console.config';
import { storeBuilderTypeId } from '@configs/page.config';
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
import { _ProductRatings, _ProductReview } from '@services/review';
import {
  FetchProductRatings,
  FetchProductReviews,
} from '@services/review.service';
import { _globalStore } from 'store.global';
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
  reviews: _ProductReview[] | null;
  ratings: _ProductRatings | null;
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////// SERVER SIDE FUNCTIONS ---------------------------------------
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

export const getProductDetailProps = async (payload: {
  storeId: number;
  seName: string;
  productId: number;
  isAttributeSaparateProduct: boolean;
}) => {
  return await FetchProductDetails(payload);
};

export const FetchProductDetails = async (payload: {
  storeId: number;
  seName: string;
  productId: number;
  isAttributeSaparateProduct: boolean;
}): Promise<_FetchProductDetails> => {
  let productColors: null | _ProductColor[] = null;
  let productReviews: null | _ProductReview[] = null;
  let productRatings: null | _ProductRatings = null;
  let productDetails: null | _ProductDetails | _ProductDoNotExist = null;
  let productSizeChart: null | _SizeChartTransformed = null;
  let productSEOtags: null | _ProductSEO = null;
  let productsAlike: null | _ProductsAlike[] = null;
  let productConfigs: null | _FetchPageThemeConfigs_ProductDetails = {
    productDetailTemplateId: _defaultTemplates.productDetails,
  } as _FetchPageThemeConfigs_ProductDetails;
  let views: string[] = [];
  try {
    // Request 1
    await Promise.allSettled([
      FetchProductById({
        seName: payload.seName,
        storeId: payload.storeId,
        productId: 0, // Not required when fetching details by seName
      }),
      FetchColors({
        productId: payload.productId,
        storeId: payload.storeId,
        isAttributeSaparateProduct: payload.isAttributeSaparateProduct,
      }),
      FetchSizeChartById(payload.productId),
      FetchProductSEOtags({
        seName: payload.seName,
        storeId: payload.storeId,
      }),
      FetchSimilartProducts({
        productId: payload.productId,
        storeId: payload.storeId,
      }),
      getConfigs<_FetchPageThemeConfigs_ProductDetails>(
        payload.storeId,
        'productDetail',
      ),
      FetchProductRatings(payload.productId),
      FetchProductReviews(payload.productId),
    ]).then((values) => {
      productDetails =
        values[0].status === 'fulfilled' ? values[0].value : null;
      productColors = values[1].status === 'fulfilled' ? values[1].value : null;
      productSizeChart =
        values[2].status === 'fulfilled' ? values[2].value : null;
      productSEOtags =
        values[3].status === 'fulfilled' ? values[3].value : null;
      productsAlike = values[4].status === 'fulfilled' ? values[4].value : null;
      productConfigs =
        values[5].status === 'fulfilled' ? values[5].value : null;
      productRatings =
        values[6].status === 'fulfilled' ? values[6].value : null;
      productReviews =
        values[7].status === 'fulfilled' ? values[7].value : null;
    });

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

  let templateId = productConfigs?.productDetailTemplateId || '1';

  if (!productConfigs?.productDetailTemplateId) {
    if (_globalStore.storeTypeId === storeBuilderTypeId) {
      templateId = '7';
    }
  }

  return {
    details: productDetails,
    colors: productColors,
    sizes: productSizeChart,
    SEO: productSEOtags,
    alike: productsAlike,
    views: views,
    reviews: productReviews,
    templateId: templateId,
    ratings: productRatings,
  };
};
