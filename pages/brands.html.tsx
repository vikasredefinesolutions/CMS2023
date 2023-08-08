import { NextPage } from 'next';

import { _defaultTemplates } from '@configs/template.config';
import { _Brand } from '@definations/brand';
import { newFetauredItemResponse } from '@definations/productList.type';
import { _GetPageType } from '@definations/slug.type';
import { useActions_v2 } from '@hooks_v2/index';
import { FetchDataByBrand } from '@services/brand.service';
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
  const { storeId, code } = _globalStore;
  let brands: _Brand[] | null = null;
  let alphabets: string[] = [];
  let accordian: any = [];

  let pageMetaData: _GetPageType | null = null;
  let allFeaturedProductComponentData: any = [];
  let allFeaturedProductComponentBody: any = [];
  let allTabingData: any = [];
  let bodyArr: any = [];

  if(code === 'CG')
  {
    pageMetaData = await FetchPageType({
      storeId: _globalStore.storeId!,
      slug: 'brands.html',
    });
  
  }
  else
  {
    pageMetaData = await FetchPageType({
      storeId: _globalStore.storeId!,
      slug: 'brands',
    });
  
  }
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
