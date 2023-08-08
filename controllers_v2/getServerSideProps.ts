import {
  BOSTONBEAR,
  listingProductsCount,
  __Error,
  __pageTypeConstant,
} from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import {
  BrandFilter,
  CategoryFilter,
  newFetauredItemResponse,
  _GoogleTagManagerResponseCommonData,
} from '@definations/productList.type';
import { extractSlugName } from '@helpers/common.helper';
import { highLightError } from '@helpers/console.helper';
import {
  getPageComponents,
  GetPageComponentsByCategoryId,
} from '@services/home.service';
import { FetchFiltersJSON } from '@services/product.service';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { _Slug_Props } from 'pages/[...slug-id]';
import { getProductDetailProps } from './ProductController.async';

import { storeBuilderTypeId, _Store } from '@configs/page.config';
import { Sorting } from '@constants/enum';
import { FetchDataByBrand } from '@services/brand.service';
import { FetchBannerDetails } from '@services/header.service';
import { FetchPageType } from '@services/slug.service';
import { _Banner, _BrandTypes } from '@templates/banner';
import { _SelectedTab } from '@templates/ProductDetails/productDetailsTypes/storeDetails.res';
import {
  GetlAllProductList,
  _ListingPageProduct,
} from '@templates/ProductListings/ProductListingType';
import { _globalStore } from 'store.global';
import {
  getConfigs,
  _FetchPageThemeConfigs_ProductListing,
  _Filter,
  _FilterOption,
  _NameValuePairs,
} from './slug.extras';

export const getServerSideProps: GetServerSideProps = async (
  context,
): Promise<GetServerSidePropsResult<_Slug_Props>> => {
  let { seName, otherParams, seNameForSearch } = extractSlugName(
    _globalStore.code,
    context.params,
  );
  let allFeaturedProductComponentData: any = [];
  let allFeaturedProductComponentBody: any = [];
  let allTabingData: any = [];
  let bodyArr: any = [];
  let customerId = context.req.cookies.userId;
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
  // let pageMetaData: _GetPageType | null = _globalStore.pageMetaData;

  // if (!pageMetaData) {
  const pageMetaData = await FetchPageType({
    storeId: store.storeId,
    slug: seName,
  });
  // }

  //}

  // cLog(
  //   {
  //     extracted: {
  //       seName,
  //       seNameForSearch,
  //     },
  //     pageMetaData,
  //   },
  //   'Page Meta Data',
  // );

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

  if (
    pageMetaData?.type === 'withouthtml' ||
    pageMetaData?.type === 'upperwithouthtml' ||
    pageMetaData?.type === 'upperwithhtml' ||
    pageMetaData?.type === '301'
  ) {
    // cLog(
    //   pageMetaData,
    //   `REDIRECTING... from ${seNameForSearch} to ${pageMetaData.slug}`,
    // );

    return {
      redirect: {
        statusCode: 301,
        destination: pageMetaData.slug,
      },
    };
  }
  // return {
  //   redirect: {
  //     destination: `/${pageMetaData.slug}`,
  //     permanent: false,
  //   },
  // };
  // }
  //  else if (pageMetaData && pageMetaData?.type == 'upperwithouthtml') {
  //   context.res.writeHead(301, {
  //     Location: 'https://www.' + context.req?.headers.host + pageMetaData?.slug,
  //   });
  //   context.res.end();
  //     // return {
  //     //   redirect: {
  //     //     destination: `/${pageMetaData.slug}`,
  //     //     permanent: false,
  //     //   },
  //     // };
  //   } else if (pageMetaData && pageMetaData?.type == 'upperwithhtml') {
  //     context.res.writeHead(301, {
  //       Location: 'https://www.' + context.req?.headers.host + pageMetaData?.slug,
  //     });
  //     context.res.end();
  //     // return {
  //     //   redirect: {
  //     //     destination: `/${pageMetaData.slug}`,
  //     //     permanent: false,
  //     //   },
  //     // };
  //   }

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
      seName: seName.replace('.html', ''),
      isAttributeSaparateProduct: store.isAttributeSaparateProduct,
      productId: pageMetaData.id,
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
    let checkedFilters: Array<_NameValuePairs> = [];
    let filterOptionforfaceteds: Array<_NameValuePairs> = [];
    const sortBy = (context.query?.sort as string) || 0;
    const pageNo = +((context.query?.page as string) || 1);

    if (otherParams) {
      const keys = otherParams[0].split(',');
      const values = otherParams[1].split(',');

      keys.forEach((res: string, index: number) =>
        values[index].split('~').forEach((val) => {
          checkedFilters.push({
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
    let products: GetlAllProductList[] = [];
    let configs: _FetchPageThemeConfigs_ProductListing = {
      templateID: '1',
      breadCrumbTemplateId: '1',
      bannertype: 'type1',
    };
    let googleTagManagerResponseCommonData: _GoogleTagManagerResponseCommonData | null =
      null;
    let categoryComponents: any | null = null;
    let bannerData: _Banner[] | null = null;

    const getBannerContent = async () => {
      return await FetchBannerDetails({
        storeId: store.storeId,
        isBrand: pageMetaData!.type === __pageTypeConstant.brand,
        sename: pageMetaData!.slug,
      });
    };

    const ifCG = _globalStore.code === _Store.type1;

    const filterPayload = {
      storeID: store.storeId,
      [pageMetaData.type === 'brand' ? 'brandId' : 'categoryId']:
        pageMetaData.id,
      customerId: customerId ? parseInt(customerId) : 0,
      jumpBy: listingProductsCount,
      //  pageStartindex: ifCG ? listingProductsCount * (pageNo - 1) + 1 : 0,
      //pageEndindex: ifCG ? listingProductsCount * pageNo : 0,
      pageStartindex: 0,
      pageEndindex: 0,
      filterOptionforfaceteds: filterOptionforfaceteds,
    };

    let productFilters: BrandFilter | CategoryFilter | null = null;
    let totalProductsAvailable = 0;
    try {
      await Promise.allSettled([
        getConfigs<_FetchPageThemeConfigs_ProductListing>(
          store.storeId,
          'productListing',
        ),
        FetchFiltersJSON(pageMetaData.type, filterPayload),
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

        productFilters =
          values[1].status === 'fulfilled' ? values[1].value : null;
        categoryComponents =
          values[2].status === 'fulfilled' ? values[2].value : null;
        bannerData = values[3].status === 'fulfilled' ? values[3].value : null;

        if (productFilters) {
          const filters = productFilters as CategoryFilter;

          (Object.keys(filters) as Array<_CategoryFilterFields>).forEach(
            (propertyName) => {
              if (propertyName === 'googleTagManagerResponseCommonData') {
                googleTagManagerResponseCommonData = filters[propertyName];
                return;
              }

              if (propertyName === 'getlAllProductList') {
                products = filters[propertyName];
                return;
              }

              if (propertyName === 'totalrecords') {
                totalProductsAvailable = filters[propertyName];
                return;
              }

              if (filters[propertyName].length > 0) {
                if (
                  propertyName === 'storeCategoryProductCategoryListViewModel'
                ) {
                  _filters.push({
                    label: 'Category',
                    options: filters[
                      propertyName
                    ] as unknown as _FilterOption[],
                  });
                  return;
                }
                _filters.push({
                  label:
                    filters[propertyName][0].label ||
                    filters[propertyName][0].name ||
                    '',
                  options: filters[propertyName] as _FilterOption[],
                });
              }
            },
          );
        }
      });
    } catch (error) {
      console.log('ERRROR ===>', error);
    }

    const sortProducts = (sortBy: number, products: _ListingPageProduct[]) => {
      return products.sort((pro1, pro2) => {
        if (sortBy === Sorting.Ascending) {
          if (customerId) {
            return pro1.salePrice > pro2.salePrice ? 1 : -1;
          } else {
            return pro1.msrp > pro2.msrp ? 1 : -1;
          }
        } else if (sortBy === Sorting.Descending) {
          if (customerId) {
            return pro1.salePrice < pro2.salePrice ? 1 : -1;
          } else {
            return pro1.msrp < pro2.msrp ? 1 : -1;
          }
        } else if (sortBy === Sorting.AtoZ) {
          return pro1.name > pro2.name ? 1 : -1;
        } else if (sortBy === Sorting.ZtoA) {
          return pro1.name < pro2.name ? 1 : -1;
        }
        return 1;
      });
    };

    const sortedProducts = sortProducts(+sortBy, products);
    const visibleProducts =
      store.storeCode == BOSTONBEAR
        ? products
        : products.slice(0, filterPayload.jumpBy);
    const constructedFilters = checkedFilters?.filter((item) => {
      const filterOptions = _filters?.find((fil) => fil.label === item.name);
      if (
        item.name === filterOptions?.label &&
        filterOptions.options.some((opt) => opt.name === item.value)
      )
        return true;
    });
    checkedFilters = !products.length ? checkedFilters : constructedFilters;
    return {
      props: {
        page: 'PRODUCT_LISTING',
        listingData: {
          list: {
            visible: visibleProducts,
            jumpBy: filterPayload.jumpBy,
            currentPage: pageNo,
            totalAvailable: totalProductsAvailable,
            allProducts: products,
            filterOptionforfaceteds: filterPayload.filterOptionforfaceteds,
          },
          filters: _filters,
          banner: bannerData,
          checkedFilters: checkedFilters,
          googleTagManagerResponseCommonData,
          categoryComponents: categoryComponents,
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

type _CategoryFilterFields =
  | 'storeBrandProductBrandViewModel'
  | 'storeBrandProductSizeViewModels'
  | 'storeBrandProductColorViewModels'
  | 'storeBrandProductGenderViewModels'
  | 'storeBrandProductPriceRangeViewModels'
  | 'storeBrandProductProductTypeViewModels'
  | 'storeCategoryProductCategoryListViewModel'
  | 'googleTagManagerResponseCommonData'
  | 'getlAllProductList'
  | 'totalrecords';
