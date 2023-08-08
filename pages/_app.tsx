/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { __domain, _Store, storeBuilderTypeId } from '@configs/page.config';
import * as _AppController from '@controllers/_AppController.async';
import { TrackFile } from '@services/tracking.service';
import 'material-icons/iconfont/material-icons.css';
import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import 'public/assets/css/custom.css';
// import 'public/assets/css/main.css';
import { reduxWrapper } from '@redux/store.redux';
import { getWishlist } from '@services/wishlist.service';
import {
  domainToShow,
  extractCookies,
  Logout,
  setCookie,
} from 'helpers_v2/common.helper';
import { useActions_v2 } from 'hooks_v2';
import 'material-icons/iconfont/material-icons.css';
import 'public/assets/css/accordian_pkhg.css';
import 'public/assets/css/spinner.css';
import { useEffect, useRef } from 'react';

import Metatags from '@appComponents/MetaTags';
import QuickHelp from '@appComponents/QuickHelp';
import Spinner from '@appComponents/ui/spinner';
import { __console_v2 } from '@configs/console.config';
import {
  __Cookie,
  __SessionStorage,
  BACARDI,
  CG_STORE_CODE,
} from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import EmployeeController from '@controllers/EmployeeController';
import { PageResponseType } from '@definations/app.type';
import { _MenuItems } from '@definations/header.type';
import {
  _FetchStoreConfigurations,
  _SbStoreConfiguration,
  _StoreReturnType,
} from '@definations/store.type';
import '@fortawesome/fontawesome-free/js/all.js';
import {
  _PropsToStoreAndGetFromCookies,
  _templateIds,
  callConfigsAndRemainingStoreAPIsAndSetURls,
  configsToCallEveryTime,
  expectedProps,
  extractAndfillCookiesIntoProps,
  passPropsToDocumentFile,
  storeCookiesToDecreaseNoOfAPIRecalls,
} from '@helpers/app.extras';
import { conditionalLog_V2 } from '@helpers/console.helper';
import getLocation from '@helpers/getLocation';
import { CustomerRoles } from '@services/customerUser.service';
import { FetchSbStoreConfiguration } from '@services/sb.service';
import { fetchThirdpartyservice } from '@services/thirdparty.service';
import { GetStoreCustomer } from '@services/user.service';
import Redefine_Layout from '@templates//TemplateComponents/Redefine_Layout';
import AuthGuard from 'Guard/AuthGuard';
import uuid from 'react-uuid';
import DcTags from 'tags/DcTags';
import TwitterTags from 'tags/TwitterTags';
import { _Slug_Props } from './[...slug-id]';

type AppOwnProps = {
  store: _StoreReturnType | null;
  menuItems: _MenuItems | null;
  footerHTML: _FetchStoreConfigurations | null;
  pageProps: _Slug_Props | null;
  sbStore: _SbStoreConfiguration | null;
  headerConfig: _FetchStoreConfigurations | null;
  templateIDs: _templateIds;
};

const RedefineCustomApp = ({
  Component,
  pageProps,
  store,
  menuItems,
  footerHTML,
  sbStore,
  headerConfig,
  templateIDs,
}: AppProps & AppOwnProps) => {
  EmployeeController();
  const router = useRouter();
  const {
    updateCustomerV2,
    logInUser,
    updateWishListData,
    store_storeDetails,
    sbStore_sbStoreDetails,
    setKlaviyoKey,
    setCustomerRoles,
    updateGclId,
  } = useActions_v2();

  const isVisitorCreated = useRef(false);

  const { updatePageType, setShowLoader } = useActions_v2();
  const trackingFile = async (storeId: number) => {
    if (isVisitorCreated.current && storeId !== CG_STORE_CODE) return;
    isVisitorCreated.current = true;
    const oldSessionId = sessionStorage.getItem(__SessionStorage.sessionId);
    const visitorInCookie = extractCookies(
      __Cookie.visitorId,
      'browserCookie',
    ).visitorId;
    const freshVisitorId = uuid();
    const freshSessionId = uuid();
    if (!oldSessionId) {
      sessionStorage.setItem(
        __SessionStorage.sessionId,
        freshSessionId.toString(),
      );
    }
    if (!visitorInCookie) {
      setCookie(__Cookie.visitorId, freshVisitorId.toString(), 365);
    }
    const location = await getLocation();

    let data = {
      trackingModel: {
        id: 0,
        storeId: extractCookies(__Cookie.storeInfo, 'browserCookie').storeInfo
          ?.storeId,
        sessionID: sessionStorage.getItem(__SessionStorage.sessionId),
        visitorId: visitorInCookie || freshVisitorId.toString(),
        gclId: router?.query?.gclid || '',
        msclkId: router?.query?.msclkid || '',
        initialReferrer: document.referrer || '', //previous url
        initialLandingPage: window.location.href,
        marketingTimeStamp: '',
        marketingLandingPage: window.location.href, //current url
        marketingInitialReferrer: document.referrer || '', //previous url
        utmSource: router?.query?.utm_source || '',
        utmMedium: router?.query?.utm_medium || '',
        utmTerm: router?.query?.utm_term || '',
        utmContent: router?.query?.utm_content || '',
        utmCampaign: router?.query?.utm_campaign || '',
        utmExpid: router?.query?.utm_expid || '',
        utmReferrer: router?.query?.utm_referrer || '',
        isNewVisitor: true,
        ipAddress: location.ip_address,
        strInitialLandingPage: window.location.href, //current url
        strMarketingTimeStamp: '',
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
    if (router.asPath === paths.HOME) {
      document.body.classList.add('index-page');
    } else {
      document.body.classList.remove('index-page');
    }
  }, [router]);

  const getKlaviyoKey = async (storeId: number) => {
    try {
      const response = await fetchThirdpartyservice({
        storeId,
      });
      if (response?.length && response[0]?.key)
        setKlaviyoKey({ klaviyoKey: response[0].key });
    } catch (error) {
      console.log('Klaviyo key not available', error);
    }
  };

  const getRoles = async (storeId: number) => {
    try {
      const response = await CustomerRoles({ storeId: storeId });

      if (response) {
        setCustomerRoles({
          roles: response,
        });
      }
    } catch (error) {
      console.log('Error in setting roles');
    }
  };

  useEffect(() => {
    if (store?.code === BACARDI && window.location.pathname === '/') {
      const selectedStore = extractCookies(
        'BacardiSelectedStore',
        'browserCookie',
      ).BacardiSelectedStore;
      if (selectedStore) {
        if (selectedStore === 'GreyGoose') {
          router.push('/home/GreyGoose');
        } else {
          router.push('/index.html');
        }
      } else {
        setCookie('BacardiSelectedStore', 'Bacardi', 365);
        router.push('/index.html');
      }
    }
  }, [store?.code]);
  useEffect(() => {
    const cookies = extractCookies('', 'browserCookie');
    const tempCustomerId = extractCookies(
      __Cookie.tempCustomerId,
      'browserCookie',
    ).tempCustomerId;
    // configs.map((config) => {
    //   if (
    //     config?.config_name == 'contactInfo' &&
    //     config?.config_value &&
    //     store
    //   ) {
    //     let contactInfo = JSON.parse(config?.config_value);
    //     store.email_address = contactInfo.email_address;
    //     store.phone_number = contactInfo.phone_number;
    //     store.company_address = contactInfo.company_address;
    //   }
    // });
    if (store) {
      store_storeDetails({
        store: store,
      });
    }

    if (store && store?.storeId) {
      getKlaviyoKey(store.storeId);
      getRoles(store.storeId);
    }

    if (sbStore && store?.storeTypeId == storeBuilderTypeId) {
      sbStore_sbStoreDetails({
        sbStore: sbStore,
      });
    }

    if (cookies && cookies.userId) {
      getUserDetails(cookies.userId, tempCustomerId);
    }
    if (router?.query?.gclid || router?.query?.msclkid)
      updateGclId(
        (router?.query?.gclid as string) ||
          (router?.query?.msclkId as string) ||
          '',
      );
    if (
      (router?.query?.gclid || router?.query?.msclkid) &&
      !cookies?.visitorId
    ) {
      trackingFile(store?.storeId || 0);
    }
    setShowLoader(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!store) {
    return <>Store Details not found</>;
  }
  if ('error' in pageProps) {
    return <>{pageProps.error}</>;
  }

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      // if(document.body.classList.contains('index-page') || storeCode === 'DI')
      // {
      let x = document.querySelector('#spy');
      // alert(x)
      if (x) {
        if (window.pageYOffset > 230) {
          x.classList.add('fix');
        } else {
          x.classList.remove('fix');
        }
      }
      //}
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Spinner>
        <Metatags
          storeName={store.storeName}
          pageMetaData={pageProps?.metaData}
          routepath={router.asPath}
        />
        <DcTags />
        <TwitterTags
          pageMetaData={pageProps?.metaData}
          routepath={router.asPath}
          logoUrl={store.urls.logo}
        />
        <Redefine_Layout
          logoUrl={store.urls.logo}
          storeCode={store.code}
          storeTypeId={store.storeTypeId!}
          configs={{ footer: footerHTML }}
          menuItems={menuItems}
          sbStore={sbStore}
          headerConfig={headerConfig}
          templateIDs={templateIDs}
          pageMetaData={pageProps.metaData}
        >
          {store?.code === _Store.type3 && <QuickHelp />}
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
  let oldTab = false;
  const res = context.ctx.res;
  const req = context.ctx.req;
  let domain: null | string = null;
  const currentPath = context.ctx.asPath;

  let propsToStoreAndGetFromCookies: _PropsToStoreAndGetFromCookies = {
    store: {
      id: null,
      storeTypeId: 0,
      code: '',
      urls: {
        logo: '',
        favicon: '',
      },
      isAttributeSaparateProduct: false,
    },
    storeBuilder: {
      showHomePage: false,
      filters: false,
    },
    adminConfig: {
      imageFolderPath: '',
      blobUrl: '',
      blobUrlDirectory: '',
      companyId: 0,
    },
    userLoggedIn: false,
  };

  //------------------------------------
  const ctx = await App.getInitialProps(context);
  const isUpperCase = (string: any) => /[A-Z]/.test(string);

  if (req && req.headers) {
    if ('x-nextjs-data' in req.headers) {
      // Checking if old tab has made the request If yes then we won't call StoreDetails APIs
      oldTab = true;
    }

    domain = domainToShow({
      domain: req.headers.host,
      showProd: __domain.isSiteLive,
    });

    propsToStoreAndGetFromCookies = extractAndfillCookiesIntoProps(
      req.headers.cookie,
    );

    if (propsToStoreAndGetFromCookies.store.id) {
      // If Store APIs are already called
      const storeIdFound = true;
      APIsCalledOnce = storeIdFound && oldTab;
      if (APIsCalledOnce) {
        const propsFromCookies = propsToStoreAndGetFromCookies.store;
        expectedProps.store = {
          ...expectedProps.store,
          code: propsFromCookies.code,
          storeId: propsFromCookies.id,
          storeTypeId: propsFromCookies.storeTypeId,
          urls: {
            logo: propsFromCookies.urls.logo,
            favicon: propsFromCookies.urls.favicon,
          },
          isAttributeSaparateProduct:
            propsFromCookies.isAttributeSaparateProduct,
        };
      }
    }
  }
  
  // if (res) {
  //   if (
  //     !req?.headers.host?.includes('www') &&
  //     req?.headers.host !== 'localhost:3000'  && req?.headers.host !== 'corporategear.online'
  //   ) {
  //   res.writeHead(301, {
  //       Location: 'https://www.' + req?.headers.host + req?.url,
  //     });
  //     res.end();
  //   }
  // }

  if (res && currentPath) {
    const currentPage = AuthGuard({
      path: currentPath,
      loggedIn: propsToStoreAndGetFromCookies.userLoggedIn,
    });

    if (currentPage.access === false) {
      res.writeHead(301, {
        Location: currentPage.redirectTo,
      });
      res.end();
    }
  }

  try {
    // APIs to call only once if not already called
    if (APIsCalledOnce === false && domain) {
      const details = await _AppController.fetchStoreDetails(domain);

      if (details?.store.storeId) {
        const { store: storeDetails, adminConfig } = details;
        const response = await callConfigsAndRemainingStoreAPIsAndSetURls(
          storeDetails,
        );

        expectedProps.store = response.store;
        expectedProps.footerHTML = response.footerHTML;
        expectedProps.menuItems = response.menuItems;
        expectedProps.store.mediaBaseUrl = adminConfig.blorUrl;
        expectedProps.headerConfig = response.headerConfig;
        expectedProps.templateIDs = response.templateIDs;

        // Customize Here
        expectedProps.store.imageFolderPath = `/${adminConfig.blobUrlRootDirectory}/${response.companyId}/store/${storeDetails.storeId}/images/`;

        // If cookies are empty then store 'Store and other required details' to decrease the number of APIs calls on page transition
        if (res) {
          propsToStoreAndGetFromCookies = {
            storeBuilder: {
              // will be updated later in the code
              showHomePage: false,
              filters: false,
            },
            store: {
              id: response.store.storeId!,
              storeTypeId: response.store.storeTypeId!,
              code: response.store.code,
              urls: {
                logo: response.store.urls.logo,
                favicon: response.store.urls.favicon,
              },
              isAttributeSaparateProduct:
                response.store.isAttributeSaparateProduct,
            },
            adminConfig: {
              companyId: response.companyId,
              blobUrl: adminConfig.blorUrl,
              blobUrlDirectory: adminConfig.blobUrlRootDirectory,
              imageFolderPath: response.store.imageFolderPath,
            },
            userLoggedIn: propsToStoreAndGetFromCookies.userLoggedIn,
          };

          storeCookiesToDecreaseNoOfAPIRecalls(
            res,
            propsToStoreAndGetFromCookies,
            domain,
          );
        }
      }
    }

    if (
      res &&
      domain &&
      APIsCalledOnce === false &&
      propsToStoreAndGetFromCookies.store.storeTypeId === storeBuilderTypeId &&
      propsToStoreAndGetFromCookies.store.id
    ) {
      const response = await FetchSbStoreConfiguration({
        storeId: propsToStoreAndGetFromCookies.store.id,
      });

      if (response) {
        expectedProps.sbStore = {
          ...response,
        };

        propsToStoreAndGetFromCookies.storeBuilder.showHomePage =
          response?.isDisplayHome || false;
        propsToStoreAndGetFromCookies.storeBuilder.filters =
          response?.isLeftNavigation || false;

        storeCookiesToDecreaseNoOfAPIRecalls(
          res,
          propsToStoreAndGetFromCookies,
          domain,
        );
      }
    }

    conditionalLog_V2({
      data: { expectedProps, propsToStoreAndGetFromCookies },
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

  //-------------Add Variables to make globally available.------------------------//
  if (propsToStoreAndGetFromCookies.store.id) {
    const serverConfigs = await configsToCallEveryTime(
      propsToStoreAndGetFromCookies.store.id,
    );
    const bacardiSelectedStoreValue = req?.headers.cookie
      ?.split(';')
      .find((item) => item.includes('BacardiSelectedStore'))
      ?.split('=')[1];

    passPropsToDocumentFile({
      store: propsToStoreAndGetFromCookies.store,
      adminConfigs: propsToStoreAndGetFromCookies.adminConfig,
      customScripts: serverConfigs.customScripts,
      gTags: serverConfigs.gTags,
      klaviyoKey: serverConfigs.klaviyoKey,
      domain: req?.headers?.host ? req.headers.host : '',
      bacardiSelectedStore: bacardiSelectedStoreValue || 'Bacardi',
      storeBuilder: {
        status:
          propsToStoreAndGetFromCookies.store.storeTypeId ===
          storeBuilderTypeId,
        showHomePage: propsToStoreAndGetFromCookies.storeBuilder.showHomePage,
        filters: propsToStoreAndGetFromCookies.storeBuilder.filters,
      },
    });
  }

  return {
    ...ctx,
    store: expectedProps.store,
    menuItems: expectedProps.menuItems,
    footerHTML: expectedProps.footerHTML,
    sbStore: expectedProps.sbStore,
    headerConfig: expectedProps.headerConfig,
    templateIDs: expectedProps.templateIDs,
  };
};

export default reduxWrapper.withRedux(RedefineCustomApp);
