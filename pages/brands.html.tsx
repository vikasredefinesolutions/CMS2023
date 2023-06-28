import { NextPage } from 'next';

import { _defaultTemplates } from '@configs/template.config';
import { _Brand } from '@definations/brand';
import { newFetauredItemResponse } from '@definations/productList.type';
import { _GetPageType } from '@definations/slug.type';
import { removeDuplicates } from '@helpers/common.helper';
import { useActions_v2 } from '@hooks_v2/index';
import { FetchDataByBrand } from '@services/brand.service';
import { FetchBrands } from '@services/header.service';
import { getPageComponents } from '@services/home.service';
import { FetchPageType } from '@services/slug.service';
import BrandsListingTemplate from '@templates/Brands';
import { _SelectedTab } from '@templates/ProductDetails/productDetailsTypes/storeDetails.res';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { useEffect } from 'react';
import { _globalStore } from 'store.global';

interface _Props {
  brands: _Brand[] | null;
  alphabets: string[];
  accordian: any;
  metaData: any;
  featuredItems: any;
}

const Brands: NextPage<_Props> = (props) => {
  const { store_CurrentPage } = useActions_v2();

  useEffect(() => {
    store_CurrentPage('BRANDS');
    return () => {
      store_CurrentPage(null);
    };
  }, []);
  return (
    <BrandsListingTemplate
      {...props}
      id={_defaultTemplates.brands}
      featuredItems={props?.featuredItems}
    />
  );
};

export default Brands;

export const getServerSideProps: GetServerSideProps = async (
  context,
): Promise<GetServerSidePropsResult<_Props>> => {
  const { storeId } = _globalStore;
  let brands: _Brand[] | null = null;
  let alphabets: string[] = [];
  let accordian: any = [];

  let pageMetaData: _GetPageType | null = null;
  let allFeaturedProductComponentData: any = [];
  let allFeaturedProductComponentBody: any = [];
  let allTabingData: any = [];
  let bodyArr: any = [];

  pageMetaData = await FetchPageType({
    storeId: _globalStore.storeId!,
    slug: 'brands',
  });
  if (pageMetaData) {
    accordian = await getPageComponents({
      pageId: pageMetaData.id,
      type: pageMetaData.type,
    });

    if (accordian && accordian?.length > 0) {
      const featuredProducts = accordian.filter(
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
  }

  if (storeId) {
    const albhabetSet = new Set();
    await FetchBrands({ storeId: storeId }).then((result) => {
      if (!result?.brands) {
        return;
      }
      brands = result.brands.sort(
        (a: { brandName: string }, b: { brandName: string }) => {
          albhabetSet.add(a.brandName[0].toLowerCase());
          return a.brandName
            .toLowerCase()
            .localeCompare(b.brandName.toLowerCase());
        },
      );
      if (brands) {
        brands = removeDuplicates(brands);
        brands = brands.map((brd) => {
          const firstLetter = brd.brandName.charAt(0).toUpperCase();
          const remainingLetter = brd.brandName.slice(1);
          return { ...brd, brandName: firstLetter + remainingLetter };
        });
      }

      alphabets = albhabetSet?.size
        ? (Array.from(albhabetSet) as string[])
        : [];
    });
  }

  return {
    props: {
      brands: brands,
      featuredItems: allFeaturedProductComponentData,
      alphabets: alphabets,
      accordian: accordian,
      metaData: pageMetaData,
    },
  };
};
