import { __Error, __pageTypeConstant } from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import { BrandFilter, CategoryFilter } from '@definations/productList.type';
import { _GetPageType } from '@definations/slug.type';
import { extractSlugName } from '@helpers/common.helper';
import { highLightError } from '@helpers/console.helper';
import { getPageComponents } from '@services/home.service';
import { FetchFiltersJSON } from '@services/product.service';
import { FetchPageType } from '@services/slug.service';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import {
  _Slug_ProductDetails_Props,
  _Slug_ProductListing_Props,
} from 'pages/[...slug-id]';
import { getProductDetailProps } from './ProductController.async';

import { GetlAllProductList } from '@templates/ProductListings/ProductListingType';
import { _Slug_CMS_Props } from 'pages';
import { _globalStore } from 'store.global';
import {
  _FetchPageThemeConfigs_ProductListing,
  _Filter,
  _FilterOption,
  _NameValuePairs,
  getConfigs,
} from './slug.extras';

type _SlugSearchProps =
  | _Slug_ProductListing_Props
  | _Slug_ProductDetails_Props
  | _Slug_CMS_Props
  | {
      error: __Error.noPageTypeFound | __Error.storeIdMissing;
    };

export const getServerSideProps: GetServerSideProps = async (
  context,
): Promise<GetServerSidePropsResult<_SlugSearchProps>> => {
  let { seName, otherParams } = extractSlugName(context.params);

  let store = {
    storeCode: _globalStore.code,
    storeTypeId: _globalStore.storeTypeId,
    storeId: _globalStore.storeId,
    isAttributeSaparateProduct: _globalStore.isAttributeSaparateProduct,
  };
  // ---------------------------------------------------------------

  if (store.storeId === 0) {
    highLightError({
      error: `No Store found. Can't proceed further`,
      component: 'slug: getServerSideProps.tsx',
    });
    return {
      props: { error: __Error.storeIdMissing },
    };
  }

  // ---------------------------------------------------------------
  const pageMetaData: _GetPageType | null = await FetchPageType({
    storeId: store.storeId,
    slug: seName,
  });

  // pageMetaData!.type = 'brand'; // DUMMY VALUE FOR TEST
  if (pageMetaData === null) {
    highLightError({
      error: `No page type found.`,
      component: 'slug: getServerSideProps.tsx',
    });
    return {
      props: { error: __Error.noPageTypeFound },
    };
  }

  if (seName !== pageMetaData.slug) {
    return {
      redirect: {
        destination: `${pageMetaData.slug}.html`,
        permanent: false,
      },
    };
  }
  // ------------------------------------------------------------------

  ////////////////////////////////////////////////
  /////////// Page Type Checks
  ////////////////////////////////////////////////

  if (pageMetaData.type === __pageTypeConstant.notFound) {
    return {
      notFound: true,
    };
  }

  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  //////////         ALL CMS PAGES
  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  if (pageMetaData.type === __pageTypeConstant.cmsPages) {
    const components = await getPageComponents({
      pageId: pageMetaData.id,
      type: '',
    });

    return {
      props: {
        page: 'ALL_CMS_PAGES',
        data: {
          components: components,
          featuredItems: [],
        },
        metaData: pageMetaData,
      },
    };
  }

  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  //////////         PRODUCT DETAILS
  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  if (pageMetaData.type === __pageTypeConstant.productDetails) {
    let productDetails = await getProductDetailProps({
      storeId: store.storeId,
      seName: seName,
      isAttributeSaparateProduct: store.isAttributeSaparateProduct,
    });

    if (productDetails.details === null || productDetails.details.id === null) {
      return {
        redirect: {
          destination:
            productDetails.details?.productDoNotExist
              ?.retrunUrlOrCategorySename || paths.NOT_FOUND,
          permanent: true,
        },
      };
    }

    return {
      props: {
        page: 'PRODUCT_DETAILS',
        data: productDetails,
        metaData: pageMetaData,
        configs: {
          templateId: productDetails.templateId,
        },
      },
    };
  }

  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  //////////         BRANDS - CATEGORY - PRODUCT LISTING
  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  if (
    pageMetaData.type === __pageTypeConstant.brand ||
    pageMetaData.type === __pageTypeConstant.category
  ) {
    let FilterOptions: Array<_NameValuePairs> = [];
    let filterOptionforfaceteds: Array<_NameValuePairs> = [];

    if (otherParams) {
      const keys = otherParams[0].split(',');
      const values = otherParams[1].split(',');

      keys.forEach((res: string, index: number) =>
        values[index].split('~').forEach((val) => {
          FilterOptions.push({
            name: res,
            value: val,
          });
          filterOptionforfaceteds.push({
            name: res.replace(' ', '-').toLowerCase(),
            value: val,
          });
        }),
      );
    }

    const _filters: _Filter[] = [];
    let product: GetlAllProductList[] = [];
    let configs: _FetchPageThemeConfigs_ProductListing | null = null;

    try {
      const filter = {
        storeID: store.storeId,
        [pageMetaData.type === 'brand' ? 'brandId' : 'categoryId']:
          pageMetaData.id,
        customerId: 0,
        filterOptionforfaceteds: filterOptionforfaceteds,
      };

      let ProductFilt: BrandFilter | CategoryFilter | null = {} as BrandFilter;

      await Promise.allSettled([
        getConfigs<_FetchPageThemeConfigs_ProductListing>(
          store.storeId,
          'productListing',
        ),
        FetchFiltersJSON(pageMetaData.type, filter),
      ]).then((values) => {
        configs = values[0].status === 'fulfilled' ? values[0].value : null;
        ProductFilt = values[1].status === 'fulfilled' ? values[1].value : null;
      });

      if (ProductFilt) {
        for (const key in ProductFilt) {
          const element = ProductFilt[key];
          if (element.length > 0 && key !== 'getlAllProductList') {
            _filters.push({
              label:
                key === 'storeCategoryProductCategoryListViewModel'
                  ? 'Category'
                  : element[0].label || element[0].name || '',
              options: element as _FilterOption[],
            });
          } else if (key === 'getlAllProductList') {
            product = element as unknown as GetlAllProductList[];
          }
        }
      }
    } catch (error) {
      console.log('ERRROR ===>', error);
    }

    return {
      props: {
        page: 'PRODUCT_LISTING',
        listingData: {
          filters: _filters,
          product: product,
          checkedFilters: FilterOptions,
          brandId: pageMetaData.id,
        },
        metaData: pageMetaData,
        configs: {
          templateId: configs!.templateID.toString(),
          bannerType: configs!.bannertype,
        },
      },
    };
  }

  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  //////////         NO MATCHES FOUND
  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  return {
    notFound: true,
  };
};
