/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { __domain, storeBuilderTypeId } from '@configs/page.config';
import * as _AppController from '@controllers/_AppController.async';
import { TrackFile } from '@services/tracking.service';
import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import 'public/assets/css/custom.css';
// import 'public/assets/css/main.css';
import 'public/assets/css/spinner.css';
import { useEffect } from 'react';
import { _globalStore } from 'store.global';

import { reduxWrapper } from '@redux/store.redux';
import { getWishlist } from '@services/wishlist.service';
import {
  domainToShow,
  extractCookies,
  Logout,
  nextJsSetCookie,
  setCookie,
} from 'helpers_v2/common.helper';
import { useActions_v2 } from 'hooks_v2';

import { __console_v2 } from '@configs/console.config';
import { __Cookie } from '@constants/global.constant';
import EmployeeController from '@controllers/EmployeeController';
import {
  _FetchStoreConfigurations,
  _SbStoreConfiguration,
  _StoreReturnType,
} from '@definations/store.type';
import { conditionalLog_V2 } from '@helpers/console.helper';

import Metatags from '@appComponents/MetaTags';
import Spinner from '@appComponents/ui/spinner';
import { _Expected_AppProps, PageResponseType } from '@definations/app.type';
import { _MenuItems } from '@definations/header.type';
import {
  FetchCompanyConfiguration,
  fetchSbStoreConfiguration,
  getAllConfigurations,
} from '@services/app.service';
import { GetStoreCustomer } from '@services/user.service';
import Redefine_Layout from '@templates//TemplateComponents/Redefine_Layout';
import AuthGuard from 'Guard/AuthGuard';

type AppOwnProps = {
  store: _StoreReturnType | null;
  menuItems: _MenuItems | null;
  configs: (_FetchStoreConfigurations | null)[];
  // Husain - added any for now - 20-3-23
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any | null;
  sbStore: _SbStoreConfiguration | null;
};

const RedefineCustomApp = ({
  Component,
  pageProps,
  store,
  menuItems,
  configs,
  sbStore,
}: AppProps & AppOwnProps) => {
  EmployeeController();
  const router = useRouter();
  const {
    updateCustomerV2,
    logInUser,
    updateWishListData,
    store_storeDetails,
    sbStore_sbStoreDetails,
  } = useActions_v2();

  const refreshHandler = () => {
    return setCookie(__Cookie.storeInfo, '', 'EPOCH');
  };
  const { updatePageType, setShowLoader } = useActions_v2();
  const trackingFile = async () => {
    let data = {
      trackingModel: {
        id: 0,
        storeId: extractCookies(__Cookie.storeInfo, 'browserCookie').storeInfo
          ?.storeId,
        sessionID: 'string',
        visitorId: '',
        gclId: router?.query?.gclid ?? '',
        msclkId: router?.query?.msclkId ?? '',
        initialReferrer: '',
        initialLandingPage: '',
        marketingTimeStamp: '',
        marketingLandingPage: '',
        marketingInitialReferrer: '',
        utmSource: router?.query?.utmSource ?? '',
        utmMedium: router?.query?.utmMedium ?? '',
        utmTerm: router?.query?.utmTerm ?? '',
        utmContent: router?.query?.utmContent ?? '',
        utmCampaign: router?.query?.utm_campaign ?? '',
        utmExpid: router?.query?.utm_expid ?? '',
        utmReferrer: router?.query?.utm_referrer ?? '',
        isNewVisitor: true,
        ipAddress: '192.168.1.1',
      },
    };
    await TrackFile(data);
  };

  const getUserDetails = async (
    userId: number,
    tempCustomerId: string | null,
  ) => {
    setShowLoader(true);
    GetStoreCustomer(userId)
      .then((res) => {
        if (res === null) {
          Logout(logInUser);
          return;
        }
        updateCustomerV2({
          customer: res,
          id: res.id,
        });
        getWishlist(res.id || ~~(tempCustomerId || 0)).then((data) => {
          updateWishListData(data);
        });
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

  useEffect(() => {
    const handleStart = () => {
      updatePageType({} as PageResponseType);
      setShowLoader(true);
    };
    const handleComplete = () => {
      setShowLoader(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);

  useEffect(() => {
    const cookies = extractCookies('', 'browserCookie');
    const tempCustomerId = extractCookies(
      __Cookie.tempCustomerId,
      'browserCookie',
    ).tempCustomerId;

    if (store) {
      store_storeDetails({
        store: store,
      });
    }

    if (sbStore && store?.storeTypeId == storeBuilderTypeId) {
      sbStore_sbStoreDetails({
        sbStore: sbStore,
      });
    }

    if (cookies && cookies.userId) {
      getUserDetails(cookies.userId, tempCustomerId);
    }

    trackingFile();
    setShowLoader(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', refreshHandler);
    return () => {
      window.removeEventListener('beforeunload', refreshHandler);
      setShowLoader(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!store || !store.storeTypeId) {
    return <>Store Details not found</>;
  }

  return (
    <>
      <Spinner>
        <Metatags
          storeName={store.storeName}
          pageMetaData={pageProps?.pageMetaData}
          routepath={router.asPath}
        />
        <Redefine_Layout
          logoUrl={store.urls.logo}
          storeCode={store.code}
          storeTypeId={store.storeTypeId}
          configs={{ footer: configs[0] }}
          menuItems={menuItems}
          sbStore={sbStore}
        >
          <Component {...pageProps} />
        </Redefine_Layout>
      </Spinner>
    </>
  );
};

RedefineCustomApp.getInitialProps = async (
  context: AppContext,
): Promise<AppOwnProps & AppInitialProps> => {
  let APIsCalledOnce = false;
  const res = context.ctx.res;
  const pathName = context.ctx.pathname;
  const currentPath = context.ctx.asPath;

  const expectedProps: _Expected_AppProps = {
    store: {
      imageFolderPath: '',
      storeId: null,
      layout: null,
      pageType: '',
      pathName: '',
      code: '',
      storeName: '',
      storeTypeId: null,
      isAttributeSaparateProduct: false,
      cartCharges: null,
      urls: {
        logo: '',
        favicon: '',
      },
      isSewOutEnable: false,
      sewOutCharges: 0,
      mediaBaseUrl: '',
      shippingChargeType: 0,
      firstLineCharges: 0,
      secondLineCharges: 0,
    },
    menuItems: null,
    configs: [],
    blobUrlRootDirectory: '',
    companyId: 0,
    sbStore: {
      id: null,
      storeId: null,
      organizationId: null,
      sportId: null,
      salesPersonId: 0,
      salesCode: '',
      directAccessURL: '',
      estimateShipDate: '',
      workOrder: null,
      message: null,
      isLogo: true,
      messageTypeId: 0,
      openStoreOn: '',
      closeStoreOn: '',
      serviceEmailId: 0,
      serviceEmailSalesPersonId: 0,
      servicePhoneId: 0,
      servicePhoneSalesPersonId: 0,
      logoUrl: '',
      recStatus: null,
      createdDate: null,
      createdBy: null,
      modifiedDate: null,
      modifiedBy: null,
      rowVersion: null,
      location: null,
      ipAddress: null,
      macAddress: null,
    },
  };

  //------------------------------------
  const ctx = await App.getInitialProps(context);
  const cookies = extractCookies(context.ctx.req?.headers.cookie);

  const domain = domainToShow({
    domain: context.ctx.req?.rawHeaders[1],
    showProd: __domain.isSiteLive,
  });

  if (cookies.storeInfo?.storeId && cookies.storeInfo?.domain === domain) {
    APIsCalledOnce = true;
    expectedProps.store.storeId = cookies.storeInfo.storeId;
    expectedProps.store.isAttributeSaparateProduct =
      cookies.storeInfo.isAttributeSaparateProduct;
    expectedProps.store.code = cookies.storeInfo.storeCode;
    expectedProps.store.storeTypeId = cookies.storeInfo.storeTypeId;
    expectedProps.store.urls = {
      logo: cookies.storeInfo.logoUrl,
      favicon: cookies.storeInfo.favicon,
    };
  }

  if (res && currentPath) {
    const currentPage = AuthGuard({
      path: currentPath,
      loggedIn: cookies.loggedIN,
    });

    if (currentPage.access === false) {
      res.writeHead(302, {
        Location: currentPage.redirectTo,
      });
      res.end();
    }
  }

  try {
    if (APIsCalledOnce === false) {
      const storeDetails = await _AppController.fetchStoreDetails(
        domain,
        pathName,
      );

      expectedProps.companyId = (await FetchCompanyConfiguration()).companyId;
      if (storeDetails) {
        expectedProps.store.imageFolderPath = `/rdc/${expectedProps.companyId}/store/${storeDetails.store.storeId}/images/`;
        expectedProps.store = storeDetails.store;
        expectedProps.store.imageFolderPath = `/${storeDetails.blobUrlRootDirectory}/${expectedProps.companyId}/store/${storeDetails.store.storeId}/images/`;
        expectedProps.blobUrlRootDirectory = storeDetails.blobUrlRootDirectory;
      }

      if (expectedProps.store?.storeId) {
        expectedProps.configs = await getAllConfigurations({
          storeId: expectedProps.store?.storeId,
          configNames: [
            'footer',
            'customScript',
            'customHomeScript',
            'customGlobalBodyScript',
            'googleTags',
          ],
        });

        expectedProps.menuItems = await _AppController.fetchMenuItems(
          expectedProps.store.storeId,
        );

        if (res && cookies.storeInfo === null) {
          nextJsSetCookie({
            res,
            cookie: {
              name: __Cookie.storeInfo,
              value: {
                storeId: expectedProps.store.storeId,
                domain: domain,
                storeCode: expectedProps.store.code,
                storeTypeId: expectedProps?.store?.storeTypeId!,
                isAttributeSaparateProduct:
                  expectedProps.store.isAttributeSaparateProduct,
                favicon: expectedProps.store.urls.favicon,
                logoUrl: expectedProps.store.urls.logo,
              },
            },
          });
        }
      }
    }

    conditionalLog_V2({
      data: expectedProps,
      type: 'SERVER_METHOD',
      name: ' _app.tsx',
      show: __console_v2.serverMethod.app,
    });
  } catch (error) {
    conditionalLog_V2({
      data: error,
      type: 'CATCH',
      name: ' _app.tsx - Something went wrong',
      show: __console_v2.allCatch,
    });
  }

  if (
    expectedProps.store.storeTypeId === storeBuilderTypeId &&
    expectedProps.store.storeId
  ) {
    expectedProps.sbStore = await fetchSbStoreConfiguration({
      storeId: expectedProps.store.storeId,
    });
  }
  if (expectedProps.store.storeId) {
    let customScript = expectedProps.configs[1]?.config_value
      ? expectedProps.configs[1]?.config_value
      : JSON.stringify({ googleFonts: '' });

    let googleTags = expectedProps?.configs[4]?.config_value
      ? expectedProps?.configs[4]?.config_value
      : JSON.stringify(_globalStore.googleTags);

    _globalStore.set({ key: 'storeId', value: expectedProps.store.storeId });
    _globalStore.set({
      key: 'isAttributeSaparateProduct',
      value: expectedProps.store.isAttributeSaparateProduct,
    });
    _globalStore.set({
      key: 'code',
      value: expectedProps.store.code,
    });
    _globalStore.set({
      key: 'storeTypeId',
      value: expectedProps.store.storeTypeId,
    });
    _globalStore.set({
      key: 'favicon',
      value: expectedProps.store.urls.favicon,
    });
    _globalStore.set({
      key: 'logoUrl',
      value: expectedProps.store.urls.logo,
    });
    _globalStore.set({
      key: 'blobUrl',
      value: expectedProps.store.mediaBaseUrl,
    });
    _globalStore.set({
      key: 'blobUrlRootDirectory',
      value: expectedProps.blobUrlRootDirectory,
    });
    _globalStore.set({
      key: 'companyId',
      value: expectedProps.companyId,
    });
    _globalStore.set({
      key: 'customGlobalBodyScript',
      value: JSON.parse(customScript)?.customGlobalBodyScript,
    });
    _globalStore.set({
      key: 'customGlobalBodyScript',
      value: JSON.parse(customScript)?.customGlobalBodyScript,
    });
    _globalStore.set({
      key: 'googleFonts',
      value: JSON.parse(customScript)?.googleFonts,
    });
    _globalStore.set({
      key: 'customHeadScript',
      value: JSON.parse(customScript)?.customHeadScript,
    });
    _globalStore.set({
      key: 'customGoogleVerification',
      value: JSON.parse(customScript)?.customGoogleVerification,
    });
    _globalStore.set({
      key: 'customFooterScript',
      value: JSON.parse(customScript)?.customFooterScript,
    });
    _globalStore.set({
      key: 'googleTags',
      value: JSON.parse(googleTags),
    });
  }

  return {
    ...ctx,
    store: expectedProps.store,
    menuItems: expectedProps.menuItems,
    configs: expectedProps.configs,
    sbStore: expectedProps.sbStore,
  };
};

export default reduxWrapper.withRedux(RedefineCustomApp);
