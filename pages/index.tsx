import ConfirmModal from '@appComponents/modals/paymentSuccessfullModal/paymentSuccessfullModal';
import SeoHead from '@appComponents/reUsable/SeoHead';
import { __Error, __pageTypeConstant } from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import { newFetauredItemResponse } from '@definations/productList.type';
import { _GetPageType } from '@definations/slug.type';
import {
  GTMHomeScriptForAllStores,
  GTMHomeScriptForCG,
} from '@helpers/common.helper';
import { highLightError } from '@helpers/console.helper';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { FetchDataByBrand } from '@services/brand.service';
import { getPageComponents } from '@services/home.service';
import { FetchPageType } from '@services/slug.service';
import Home from '@templates/Home';
import { _SelectedTab } from '@templates/ProductDetails/productDetailsTypes/storeDetails.res';
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next';
import { useRouter } from 'next/router';
import getRawBody from 'raw-body';
import { useEffect, useRef, useState } from 'react';
// import { getDataFromRedis, setDataInRedis } from 'redis';
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
  const {
    hideModal,
    logInUser,
    setShowLoader,
    updateCustomer,
    updateWishListData,
  } = useActions_v2();
  const [modalopen, setmodalopen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    hideModal();
  }, []);

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
          (comp: any) => comp.name == 'Fe00atured Products',
        );
      if (featuredProduct) {
        localStorage.setItem(
          'Featured Products',
          JSON.stringify(featuredProduct?.selectedVal),
        );
      }
    }
  }, [props]);

  useEffect(() => {
    if (
      localStorage.getItem('OrderNumber') &&
      router?.query &&
      router?.query?.OrderNumber === localStorage.getItem('OrderNumber')
    ) {
      setmodalopen(true);
      localStorage.removeItem('OrderNumber');
    }
  }, [router]);

  if ('error' in props) {
    return <>{props.error}</>;
  }

  const { metaData, data } = props;
  const tprops: _TopicHomeProps = {
    pageData: { components: data.components },
    pageType: 'topic',
    slug: metaData.slug,
  };

  // useEffect(() => {
  //   const sessionid = router.query.sessionid;
  //   if (sessionid && storeId) {
  //     const punchoutLoginPayload = {
  //       sessionId: sessionid,
  //       storeId: storeId,
  //       customerId: 0,
  //       browserInfo: 'Chrome',
  //     };
  //     punchoutLogin(punchoutLoginPayload).then((customerId) => {
  //       logInUser({
  //         id: +customerId,
  //       });
  //       setCookie(__Cookie.userId, customerId, __Cookie_Expiry.userId);
  //       setShowLoader(true);
  //       GetStoreCustomer(+customerId)
  //         .then((res) => {
  //           if (res === null) return;
  //           if (localStorage) {
  //             const tempCustomerId = extractCookies(
  //               __Cookie.tempCustomerId,
  //               'browserCookie',
  //             ).tempCustomerId;
  //             localStorage.setItem(
  //               'thirdPartyServices',
  //               thirdPartyLoginService.punchoutLogin,
  //             );
  //             localStorage.setItem('P_SID', btoa(sessionid.toString()));
  //             if (tempCustomerId) {
  //               updateCartByNewUserId(~~tempCustomerId, res.id);
  //               deleteCookie(__Cookie.tempCustomerId);
  //             }
  //           }

  //           const userInfo = {
  //             $email: res.email,
  //             $first_name: res.firstname,
  //             $last_name: res.lastName,
  //             $phone_number: '',
  //             $organization: res.companyName,
  //             $title: 'title',
  //             $timestamp: new Date(),
  //           };

  //           KlaviyoScriptTag(['identify', userInfo]);
  //           updateCustomer({ customer: res });
  //           getWishlist(res.id).then((wishListResponse) => {
  //             updateWishListData(wishListResponse);
  //           });
  //         })
  //         .finally(() => {
  //           setShowLoader(false);
  //           setTimeout(() => router.push('/'), 2000);
  //         });
  //     });
  //   }
  // }, [router.query.sessionid, storeId]);

  // useEffect(() => {
  //   const returnUrl = router.query.returnUrl;
  //   if (returnUrl && storeId) {
  //     localStorage.setItem('returnUrl', atob(returnUrl.toString()));
  //   }
  // }, [storeId, router.query.returnUrl]);

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
          products: data?.featuredItems,
          brands: null,
        }}
      />
      {modalopen && <ConfirmModal setmodalopen={setmodalopen} />}
    </>
  );
};

export default DefaultHomePage;

export const getServerSideProps: GetServerSideProps = async (
  context,
): Promise<GetServerSidePropsResult<_HomeProps>> => {
  const body = await getRawBody(context?.req);
  if (body) {
    console.log('body ====> ', body.toString());
  }
  let store = {
    storeCode: _globalStore.code,
    storeTypeId: _globalStore.storeTypeId,
    storeId: _globalStore.storeId,
    isAttributeSaparateProduct: _globalStore.isAttributeSaparateProduct,
  };
  // ---------------------------------------------------------------
  if (!_globalStore.showHomePage) {
    return {
      redirect: {
        permanent: true,
        destination: paths.SB_PRODUCT_LISTING,
      },
    };
  }

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

  let pageMetaData: _GetPageType | null = _globalStore.pageMetaData;

  //if (!pageMetaData) {
  pageMetaData = await FetchPageType({
    storeId: store.storeId,
    slug: '',
  });
  //}
  let allFeaturedProductComponentData: any = [];
  let allFeaturedProductComponentBody: any = [];
  let allTabingData: any = [];
  let bodyArr: any = [];

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
            /*const cachedData = await getDataFromRedis('featuredProductData');
            if (cachedData) {
              allTabingData = JSON.parse(cachedData);
            } else {*/
            allTabingData = await Promise.all(
              AllTabingApiArray.map(async (TabingApiArray: any) => {
                return await Promise.all(TabingApiArray);
              }),
            );
            /*await setDataInRedis(
                'featuredProductData',
                JSON.stringify(allTabingData),
                3600,
              );
            }*/

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

  return {
    notFound: true,
  };
};
