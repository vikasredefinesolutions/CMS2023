/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { __domain } from '@configs/page.config';
import * as _AppController from '@controllers/_AppController.async';
import { TrackFile } from '@services/tracking.service';
import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import 'public/assets/css/main.css';
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
import { _Footer } from '@definations/APIs/footer.res';
import { _StoreReturnType } from '@definations/store.type';
import { conditionalLog_V2 } from '@helpers/console.helper';
import {
  _Expected_AppProps,
  _MenuItems,
  _TransformedHeaderConfig,
} from '@templates/Header/header.type';

import Metatags from '@appComponents/MetaTags';
import SuccessErrorModal from '@appComponents/modals/successErrorModal';
import Spinner from '@appComponents/ui/spinner';
import { PageResponseType } from '@definations/app.type';
import { fetchFooter } from '@services/footer.service';
import { GetStoreCustomer } from '@services/user.service';
import Redefine_Layout from '@templates//TemplateComponents/Redefine_Layout';
import AuthGuard from 'Guard/AuthGuard';

type AppOwnProps = {
  store: _StoreReturnType | null;
  menuItems: _MenuItems | null;
  configs: {
    header: _TransformedHeaderConfig | null;
    footer: _Footer | null;
  };
  // Husain - added any for now - 20-3-23
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any | null;
};

const RedefineCustomApp = ({
  Component,
  pageProps,
  store,
  menuItems,
  configs,
}: AppProps & AppOwnProps) => {
  EmployeeController();
  const router = useRouter();
  const {
    updateCustomerV2,
    logInUser,
    updateWishListData,
    store_storeDetails,
  } = useActions_v2();

  const refreshHandler = () => {
    return setCookie(__Cookie.storeInfo, '', 'EPOCH');
  };
  const { updatePageType, setShowLoader, hideLoader } = useActions_v2();
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

    if (cookies && cookies.userId) {
      getUserDetails(cookies.userId, tempCustomerId);
    }

    trackingFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', refreshHandler);
    return () => {
      window.removeEventListener('beforeunload', refreshHandler);
      hideLoader();
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
        <SuccessErrorModal />
        <Redefine_Layout
          logoUrl={store.urls.logo}
          storeCode={store.code}
          storeTypeId={store.storeTypeId}
          configs={configs}
          menuItems={menuItems}
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
    },
    menuItems: null,
    configs: {
      header: null,
      footer: null,
    },
    blobUrlRootDirectory: '',
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

      if (storeDetails) {
        expectedProps.store = storeDetails.store;
        expectedProps.blobUrlRootDirectory = storeDetails.blobUrlRootDirectory;
      }

      if (expectedProps.store?.storeId) {
        expectedProps.configs.footer = await fetchFooter({
          storeId: expectedProps.store?.storeId,
          configname: 'footer',
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

  if (expectedProps.store.storeId) {
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
  }

  return {
    ...ctx,
    store: expectedProps.store,
    menuItems: expectedProps.menuItems,
    configs: expectedProps.configs,
  };
};

export default reduxWrapper.withRedux(RedefineCustomApp);
