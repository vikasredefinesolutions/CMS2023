import {
  CG_STORE_CODE,
  __Error,
  __pageTypeConstant,
} from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import {
  BrandFilter,
  CategoryFilter,
  newFetauredItemResponse,
} from '@definations/productList.type';
import { _GetPageType } from '@definations/slug.type';
import { extractSlugName } from '@helpers/common.helper';
import { highLightError } from '@helpers/console.helper';
import {
  GetPageComponentsByCategoryId,
  getPageComponents,
} from '@services/home.service';
import { FetchFiltersJSON } from '@services/product.service';
import { FetchPageType } from '@services/slug.service';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { _Slug_Props } from 'pages/[...slug-id]';
import { getProductDetailProps } from './ProductController.async';

import { storeBuilderTypeId } from '@configs/page.config';
import { FetchDataByBrand } from '@services/brand.service';
import { FetchBannerDetails, getGTMScript } from '@services/header.service';
import { _SelectedTab } from '@templates/ProductDetails/productDetailsTypes/storeDetails.res';
import { GetlAllProductList } from '@templates/ProductListings/ProductListingType';
import { _Banner, _BrandTypes } from '@templates/banner';
import { _globalStore } from 'store.global';
import {
  _FetchPageThemeConfigs_ProductListing,
  _Filter,
  _FilterOption,
  _NameValuePairs,
  getConfigs,
} from './slug.extras';

export const getServerSideProps: GetServerSideProps = async (
  context,
): Promise<GetServerSidePropsResult<_Slug_Props>> => {
  let { seName, otherParams } = extractSlugName(context.params);
  let allFeaturedProductComponentData: any = [];
  let allFeaturedProductComponentBody: any = [];
  let allTabingData: any = [];
  let bodyArr: any = [];

  /*if(!context.req.url?.includes('.html') && !context.req.url?.includes('not-found') && !context.req.url?.includes('.json'))
  {
    // return {
    //   redirect: {
    //     permanent: false,
    //     destination: "/ "
    //   }
    // }
    return {
      redirect: {
        permanent: true,
        destination: "/not-found"
      }
    }
  }*/

  let store = {
    storeCode: _globalStore.code,
    storeTypeId: _globalStore.storeTypeId,
    storeId: _globalStore.storeId,
    isAttributeSaparateProduct: _globalStore.isAttributeSaparateProduct,
  };
  // ---------------------------------------------------------------

  if (store.storeId === 0) {
    highLightError({
      error: `No Store found. Can't proceed further => ${_globalStore.storeId}`,
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
  /////////// GTM integration using API start for CG only
  ////////////////////////////////////////////////
  if (Number(store.storeId) === CG_STORE_CODE) {
    const topHeaderScriptGTM = await getGTMScript(
      store.storeId,
      'GetTopHeadScript',
    );
    _globalStore.set({
      key: 'topHeaderScriptGTM',
      value: topHeaderScriptGTM
        ? topHeaderScriptGTM?.replace('<script>', '').replace('</script>', '')
        : '',
    });

    const bottomHeaderScriptGTM = await getGTMScript(
      store.storeId,
      'GetBottomHeadScript',
    );
    _globalStore.set({
      key: 'bottomHeaderScriptGTM',
      value: bottomHeaderScriptGTM
        ? bottomHeaderScriptGTM
            ?.replace('<script>', '')
            .replace('</script>', '')
        : '',
    });

    const topBodySnippetGTM = await getGTMScript(
      store.storeId,
      'GetTopBodySnippet',
    );
    _globalStore.set({
      key: 'topBodySnippetGTM',
      value: topBodySnippetGTM
        ? topBodySnippetGTM
            ?.replace('<!-- Google Tag Manager (noscript) --><noscript>', '')
            .replace(
              '</noscript><!-- End Google Tag Manager (noscript) -->',
              '',
            )
        : '',
    });
  }

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

    if (components.length > 0) {
      const featuredProducts = components.filter(
        (comp: any) => comp.name == 'Featured Products',
      );
      if (featuredProducts.length > 0) {
        allFeaturedProductComponentBody = featuredProducts?.map(
          (featuredProduct: any, index: number) => {
            let productsData = JSON.parse(featuredProduct?.selectedVal);
            if (
              productsData &&
              productsData?.featuredproducts &&
              productsData?.featuredproducts?.value?.length > 0
            ) {
              bodyArr = productsData.featuredproducts?.value.map(
                (tab: _SelectedTab) => {
                  const tagNameFunc = () => {
                    if (tab.displayMethod == 'manual') {
                      return '';
                    } else if (tab.displayMethod == 'dynamic') {
                      if (
                        featuredProduct[index]
                          ?.featuredproducts_product_to_display?.value
                      ) {
                        return featuredProduct[index]
                          ?.featuredproducts_product_to_display?.value;
                      } else {
                        return 'featured';
                      }
                    }
                  };

                  let body = {
                    sename:
                      tab.displayMethod == 'dynamic'
                        ? tab.selectedBrands
                            ?.map(
                              (brand: { value: string; label: string }) =>
                                brand.value,
                            )
                            .join(',')
                        : tab.selectedProducts
                            .map((product: any) => product?.seName)
                            .join(','),
                    type:
                      tab.displayMethod == 'dynamic'
                        ? tab.productType
                        : tab.displayMethod,
                    storeId: _globalStore.storeId,
                    tagName: tagNameFunc(),
                    maximumItemsForFetch: tab.productCount,
                  };
                  return body;
                },
              );
            }
            return bodyArr;
          },
        );
        if (allFeaturedProductComponentBody?.length > 0) {
          let AllTabingApiArray = allFeaturedProductComponentBody.map(
            (bodyArr: any) => {
              let TabingApiArray = bodyArr.map(
                async (body: {
                  sename: string;
                  type: string;
                  storeId: number;
                  tagName: string;
                  maximumItemsForFetch: number | string;
                }) => {
                  return await FetchDataByBrand(body);
                },
              );
              return TabingApiArray;
            },
          );
          if (AllTabingApiArray.length > 0) {
            allTabingData = await Promise.all(
              AllTabingApiArray.map(async (TabingApiArray: any) => {
                return await Promise.all(TabingApiArray);
              }),
            );

            if (featuredProducts?.length > 0) {
              allFeaturedProductComponentData = featuredProducts?.map(
                (featuredProduct: any, index: number) => {
                  let data: { [x: string]: newFetauredItemResponse[] } = {};
                  let productsData = JSON.parse(featuredProduct?.selectedVal);
                  if (
                    productsData.featuredproducts &&
                    productsData.featuredproducts?.value?.length > 0
                  ) {
                    productsData.featuredproducts?.value.map(
                      (tab: _SelectedTab, ind: number) => {
                        data[tab?.tabName] = allTabingData[index][ind];
                      },
                    );
                  }
                  return data;
                },
              );
            }
          }
        }
      }
    }

    return {
      props: {
        page: 'ALL_CMS_PAGES',
        data: {
          components: components,
          featuredItems: allFeaturedProductComponentData,
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
  //////////         StoreBuilder - Product Listing
  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  if (
    _globalStore.storeTypeId === storeBuilderTypeId &&
    !_globalStore.filters
  ) {
    return {
      redirect: {
        permanent: true,
        destination: paths.SB_PRODUCT_LISTING,
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
    let configs: _FetchPageThemeConfigs_ProductListing = {
      templateID: '1',
      breadCrumbTemplateId: '1',
      bannertype: 'type1',
    };
    let googleTagManagerResponseCommonData: any | null = null;
    let categoryComponents: any | null = null;
    let bannerData: _Banner[] | null = null;

    const getBannerContent = async () => {
      return await FetchBannerDetails({
        storeId: store.storeId,
        isBrand: pageMetaData.type === __pageTypeConstant.brand,
        sename: pageMetaData.slug,
      });
    };

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
        GetPageComponentsByCategoryId({ categoryId: pageMetaData.id }),
        getBannerContent(),
      ]).then((values) => {
        if (values[0].status === 'fulfilled') {
          configs.templateID = values[0].value?.templateID || '1';
          configs.bannertype = values[0].value?.bannertype || 'type1';
          configs.breadCrumbTemplateId =
            values[0].value?.breadCrumbTemplateId || '1';

          if (values[0].value?.templateID) {
            if (_globalStore.storeTypeId === storeBuilderTypeId) {
              configs.templateID = '7';
            }
          }

          if (values[0].value?.bannertype) {
            if (_globalStore.storeTypeId === storeBuilderTypeId) {
              configs.templateID = 'none';
            }
          }
        }

        ProductFilt = values[1].status === 'fulfilled' ? values[1].value : null;
        categoryComponents =
          values[2].status === 'fulfilled' ? values[2].value : null;
        bannerData = values[3].status === 'fulfilled' ? values[3].value : null;
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
          } else if (key === 'googleTagManagerResponseCommonData') {
            googleTagManagerResponseCommonData = element;
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
          googleTagManagerResponseCommonData,
          categoryComponents: categoryComponents,
          banner: bannerData,
        },
        metaData: pageMetaData,
        configs: {
          templateId: configs.templateID,
          bannerType: configs.bannertype as _BrandTypes & 'none',
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
