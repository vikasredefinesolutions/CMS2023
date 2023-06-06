import SeoHead from '@appComponents/reUsable/SeoHead';
import { __Error, __pageTypeConstant } from '@constants/global.constant';
import { newFetauredItemResponse } from '@definations/productList.type';
import { _GetPageType } from '@definations/slug.type';
import {
  GTMHomeScriptForAllStores,
  GTMHomeScriptForCG,
} from '@helpers/common.helper';
import { highLightError } from '@helpers/console.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { FetchDataByBrand } from '@services/brand.service';
import { getPageComponents } from '@services/home.service';
import { FetchPageType } from '@services/slug.service';
import Home from '@templates/Home';
import { _SelectedTab } from '@templates/ProductDetails/productDetailsTypes/storeDetails.res';
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next';
import { useEffect, useRef } from 'react';
import { _globalStore } from 'store.global';

export interface _Slug_CMS_Props {
  page: 'ALL_CMS_PAGES';
  data: {
    components: any;
    featuredItems: { [x: string]: newFetauredItemResponse[] } | [];
  };
  metaData: _GetPageType;
}

type _HomeProps =
  | _Slug_CMS_Props
  | {
      error: __Error.noPageTypeFound | __Error.storeIdMissing;
    };

const DefaultHomePage: NextPage<_HomeProps> = (props) => {
  
  const { id: customerId } = useTypedSelector_v2((state) => state.user);
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const isCaptured = useRef(false);

  useEffect(() => {
    if (storeId && !isCaptured.current) {
      isCaptured.current = true;
      GTMHomeScriptForAllStores('HomePage', storeId, customerId || 0);
      GTMHomeScriptForCG('HomePage', storeId, customerId || 0);
    }
  }, [storeId, customerId]);

  useEffect(() => {
    if ('data' in props) {
      let featuredProduct =
        props &&
        props.data?.components.find(
          (comp: any) => comp.name == 'Featured Products',
        );
      if (featuredProduct) {
        localStorage.setItem(
          'Featured Products',
          JSON.stringify(featuredProduct?.selectedVal),
        );
      }
    }
  }, [props]);

  if ('error' in props) {
    return <>{props.error}</>;
  }

  const { metaData, data } = props;
  const tprops: _TopicHomeProps = {
    pageData: { components: data.components },
    pageType: 'topic',
    slug: metaData.slug,
  };

  return (
    <>
      <SeoHead
        title={metaData?.meta_Title ? metaData?.meta_Title : 'Home'}
        description={
          metaData?.meta_Description ? metaData?.meta_Description : ''
        }
        keywords={
          metaData?.meta_Keywords
            ? metaData?.meta_Keywords
            : 'Branded Promotional'
        }
      />
      <Home
        props={tprops}
        featuredItems={{
          products: data.featuredItems,
          brands: null,
        }}
      />
    </>
  );
};

export default DefaultHomePage;

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<_HomeProps>
> => {
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
      component: 'Home: getServerSideProps',
    });
    return {
      props: { error: __Error.storeIdMissing },
    };
  }

  // ---------------------------------------------------------------
  const pageMetaData: _GetPageType | null = await FetchPageType({
    storeId: store.storeId,
    slug: '/',
  });
  let data: { [x: string]: newFetauredItemResponse[] } = {};

  if (pageMetaData === null) {
    highLightError({
      error: `No page type found.`,
      component: 'Home: getServerSideProps',
    });
    return {
      props: { error: __Error.noPageTypeFound },
    };
  }

  ////////////////////////////////////////////////
  /////////// Page Type Checks
  ////////////////////////////////////////////////

  if (pageMetaData.type === __pageTypeConstant.notFound) {
    return {
      notFound: true,
    };
  }

  if (pageMetaData.type === __pageTypeConstant.cmsPages) {
    const components = await getPageComponents({
      pageId: pageMetaData.id,
      type: '',
    });

    if (components.length > 0) {
      const featuredProducts = components.find(
        (comp: any) => comp.name == 'Featured Products',
      );

      if (
        featuredProducts?.selectedVal &&
        featuredProducts?.selectedVal.length > 0
      ) {
        let productsData = JSON.parse(featuredProducts?.selectedVal);
        if (
          productsData?.featuredproducts &&
          productsData?.featuredproducts?.value
        ) {
          const bodyArr = productsData.featuredproducts?.value.map(
            (tab: _SelectedTab) => {
              const tagNameFunc = () => {
                if (tab.displayMethod == 'manual') {
                  return '';
                } else if (tab.displayMethod == 'dynamic') {
                  if (components?.featuredproducts_product_to_display?.value) {
                    return components?.featuredproducts_product_to_display
                      ?.value;
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

          const TabingApiArray = bodyArr.map(
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
          if (TabingApiArray.length > 0) {
            const allTabingData = await Promise.all(TabingApiArray);
            productsData.featuredproducts?.value.map(
              (tab: _SelectedTab, index: number) => {
                data[tab?.tabName] = allTabingData[index];
              },
            );
          }
        }
      }
    }
    return {
      props: {
        page: 'ALL_CMS_PAGES',
        data: {
          components: components,
          featuredItems: data,
        },
        metaData: pageMetaData,
      },
    };
  }

  return {
    notFound: true,
  };
};
