/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { __domain, storeBuilderTypeId } from '@configs/page.config';
import * as _AppController from '@controllers/_AppController.async';
import { TrackFile } from '@services/tracking.service';
import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import 'public/assets/css/custom.css';
// import 'public/assets/css/main.css';
import 'public/assets/css/accordian_pkhg.css';
import 'public/assets/css/spinner.css';
import { useEffect } from 'react';

import { reduxWrapper } from '@redux/store.redux';
import { getWishlist } from '@services/wishlist.service';
import { domainToShow, extractCookies, Logout } from 'helpers_v2/common.helper';
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

import Spinner from '@appComponents/ui/spinner';
import { PageResponseType } from '@definations/app.type';
import { _MenuItems } from '@definations/header.type';
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
import { FetchSbStoreConfiguration } from '@services/app.service';
import { fetchThirdpartyservice } from '@services/thirdparty.service';
import { GetStoreCustomer } from '@services/user.service';
import Redefine_Layout from '@templates//TemplateComponents/Redefine_Layout';
import AuthGuard from 'Guard/AuthGuard';
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
  } = useActions_v2();

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

    if (store && store?.storeId) getKlaviyoKey(store.storeId);

    if (sbStore && store?.storeTypeId == storeBuilderTypeId) {
      sbStore_sbStoreDetails({
        sbStore: sbStore,
      });
    }

    if (cookies && cookies.userId) {
      getUserDetails(cookies.userId, tempCustomerId);
    }

    // const res = trackingFile();
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
        {/* <Metatags
          storeName={store.storeName}
          pageMetaData={pageProps?.metaData}
          routepath={router.asPath}
        /> */}
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

  if (res && currentPath) {
    const currentPage = AuthGuard({
      path: currentPath,
      loggedIn: propsToStoreAndGetFromCookies.userLoggedIn,
    });

    if (currentPage.access === false) {
      res.writeHead(302, {
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
      propsToStoreAndGetFromCookies.store.storeTypeId === storeBuilderTypeId &&
      propsToStoreAndGetFromCookies.store.id
    ) {
      expectedProps.sbStore = await FetchSbStoreConfiguration({
        storeId: propsToStoreAndGetFromCookies.store.id,
      });
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

    passPropsToDocumentFile({
      store: propsToStoreAndGetFromCookies.store,
      adminConfigs: propsToStoreAndGetFromCookies.adminConfig,
      customScripts: serverConfigs.customScripts,
      gTags: serverConfigs.gTags,
      klaviyoKey: serverConfigs.klaviyoKey,
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
