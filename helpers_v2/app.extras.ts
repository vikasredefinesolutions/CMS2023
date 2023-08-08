import { _Store } from '@configs/page.config';
import {
  BACARDI,
  CG_STORE_CODE,
  _Store_CODES,
  __Cookie,
} from '@constants/global.constant';
import * as _AppController from '@controllers/_AppController.async';
import { _Expected_AppProps } from '@definations/app.type';
import { _StoreMenu } from '@definations/header.type';
import { _GetPageType } from '@definations/slug.type';
import {
  _FetchStoreConfigurations,
  _StoreReturnType,
} from '@definations/store.type';
import {
  FetchCompanyConfiguration,
  FetchStoreConfigurations,
  getAllConfigurations,
} from '@services/app.service';
import { getGTMScript } from '@services/header.service';
import { FetchPageType } from '@services/slug.service';
import { fetchThirdpartyservice } from '@services/thirdparty.service';
import { IncomingMessage, ServerResponse } from 'http';
import { _Slug_CMS_Props } from 'pages';
import {
  _Slug_ProductDetails_Props,
  _Slug_ProductListing_Props,
} from 'pages/[...slug-id]';
import { _globalStore } from 'store.global';
import { extractCookies, nextJsSetCookie } from './common.helper';

export const expectedProps: _Expected_AppProps = {
  store: {
    pageType: '',
    storeName: '',
    storeTypeId: null,
    cartCharges: null,
    isSewOutEnable: false,
    sewOutCharges: 0,
    mediaBaseUrl: '',
    shippingChargeType: 0,
    firstLineCharges: 0,
    secondLineCharges: 0,
    storeId: 0,
    code: '',
    isAttributeSaparateProduct: false,
    urls: {
      logo: '',
      favicon: '',
    },
    imageFolderPath: '',
    email_address: '',
    phone_number: '',
    company_address: '',
    thirdPartyLogin: false,
    bothLogin: false,
    logoUrl: '',
    isLinepersonalization: false,
    firstLogoCharge: 0,
    secondLogoCharge: 0,
    storeXPaymetnOptionListViewModels: [],
  },
  menuItems: null,
  sbStore: null,
  footerHTML: null,
  headerConfig: null,
  templateIDs: {
    headerTemplateId: '3',
    breadCrumbsTemplateId: '3',
  },
};
export interface _contactInfo {
  email_address: string;
  phone_number: string;
  company_address: string;
}
export interface _templateIds {
  headerTemplateId: string;
  breadCrumbsTemplateId: string;
  // phone_number: string;
  // company_address: string;
}
export interface _PropsToStoreAndGetFromCookies {
  store: {
    id: number | null;
    storeTypeId: number;
    code: string;
    urls: {
      logo: string;
      favicon: string;
    };
    isAttributeSaparateProduct: boolean;
  };
  storeBuilder: {
    showHomePage: boolean;
    filters: boolean;
  };
  adminConfig: {
    imageFolderPath: string;
    blobUrl: string;
    blobUrlDirectory: string;
    companyId: number;
  };
  userLoggedIn: boolean;
}

export interface _CustomScriptConfigValue {
  googleFonts: string;
  customHeadScript: string;
  customFooterScript: string;
  customGlobalBodyScript: string;
  customGoogleVerification: string;
}

export interface _GoogleTagsConfigValue {
  twitterTags: {
    twitterTagRadio: boolean;
    twitterTagTextArea: string;
  };
  dcTags: {
    dcTagRadio: boolean;
    dcTagTextArea: string;
  };
}

const parseJson = <T>(arg: string | undefined | null): T | null => {
  const temp = arg || '';
  if (temp.length > 0) {
    return JSON.parse(temp) as T;
  }
  return null;
};

const handlePageTypeAPIResponse = async (response: null | _GetPageType) => {
  _globalStore.set({
    key: 'pageMetaData',
    value: response,
  });
};

const handleGTMscriptsResponse = async (
  headerTopScript: null | string,
  headerBottomScript: null | string,
  bodyTopScript: null | string,
) => {
  if (headerTopScript) {
    _globalStore.set({
      key: 'topHeaderScriptGTM',
      value: headerTopScript
        ? headerTopScript?.replace('<script>', '').replace('</script>', '')
        : '',
    });
  }

  if (headerBottomScript) {
    _globalStore.set({
      key: 'bottomHeaderScriptGTM',
      value: headerBottomScript
        ? headerBottomScript?.replace('<script>', '').replace('</script>', '')
        : '',
    });
  }

  if (bodyTopScript) {
    _globalStore.set({
      key: 'topBodySnippetGTM',
      value: bodyTopScript
        ? bodyTopScript
            ?.replace('<!-- Google Tag Manager (noscript) --><noscript>', '')
            .replace(
              '</noscript><!-- End Google Tag Manager (noscript) -->',
              '',
            )
        : '',
    });
  }
};

const gtmWrapper = async (
  storeId: number,
  scriptName: 'GetTopHeadScript' | 'GetBottomHeadScript' | 'GetTopBodySnippet',
) => {
  if (_globalStore.code !== _Store.type1) return null;
  return await getGTMScript(storeId, scriptName);
};

export const callConfigsAndRemainingStoreAPIsAndSetURls = async (
  storeDetails: _StoreReturnType,
  seName: string,
): Promise<{
  store: _StoreReturnType;
  footerHTML: _FetchStoreConfigurations | null;
  headerConfig: _FetchStoreConfigurations | null;
  menuItems: _StoreMenu[] | null;
  companyId: number;
  templateIDs: _templateIds;
}> => {
  let companyId = 0;
  let footerHTML: _FetchStoreConfigurations | null = null;
  let menuItems: _StoreMenu[] | null = null;
  let contactInfo: _contactInfo = {
    email_address: '',
    phone_number: '',
    company_address: '',
  };
  let templateIDs: _templateIds = {
    headerTemplateId: '1',
    breadCrumbsTemplateId: '1',
  };
  let headerConfig: _FetchStoreConfigurations | null = null;

  await Promise.allSettled([
    FetchCompanyConfiguration(),
    _AppController.fetchMenuItems(storeDetails.storeId!),
    gtmWrapper(storeDetails.storeId!, 'GetTopHeadScript'),
    gtmWrapper(storeDetails.storeId!, 'GetBottomHeadScript'),
    gtmWrapper(storeDetails.storeId!, 'GetTopBodySnippet'),
    FetchPageType({
      storeId: storeDetails.storeId!,
      slug: seName,
    }),
    FetchStoreConfigurations({
      storeId: storeDetails.storeId!,
      configname: 'footer',
    }),
    FetchStoreConfigurations({
      storeId: storeDetails.storeId!,
      configname:
        storeDetails.code === _Store_CODES.PETERMILLAR
          ? 'contactinfo'
          : 'contactInfo',
    }),
    FetchStoreConfigurations({
      storeId: storeDetails.storeId!,
      configname: 'header_config',
    }),
    FetchStoreConfigurations({
      storeId: storeDetails.storeId!,
      configname: 'productListing',
    }),
  ])
    .then((values) => {
      companyId =
        values[0].status === 'fulfilled' ? values[0].value.companyId : 0;

      menuItems = values[1].status === 'fulfilled' ? values[1].value : null;
      handleGTMscriptsResponse(
        values[2].status === 'fulfilled' ? values[2].value : null,
        values[3].status === 'fulfilled' ? values[3].value : null,
        values[4].status === 'fulfilled' ? values[4].value : null,
      );
      handlePageTypeAPIResponse(
        values[5].status === 'fulfilled' ? values[5].value : null,
      );

      if (values[6].status === 'fulfilled') {
        footerHTML = values[6].value;
      }
      if (values[7].status === 'fulfilled') {
        contactInfo =
          parseJson<_contactInfo>(values[7].value?.config_value) || contactInfo;
      }
      if (values[8].status === 'fulfilled') {
        headerConfig = values[8].value;
        templateIDs.headerTemplateId =
          parseJson<{ template_Id: string }>(values[8].value?.config_value)
            ?.template_Id || '';
      }

      if (values[9].status === 'fulfilled') {
        templateIDs.breadCrumbsTemplateId =
          parseJson<{ breadCrumbTemplateId: string }>(
            values[9].value?.config_value,
          )?.breadCrumbTemplateId || '';
      }
    })
    .catch(() => {
      throw new Error(
        'Something went wrong in function: callConfigsAndRemainingStoreAPIsAndSetURls',
      );
    });

  return {
    companyId,
    footerHTML,
    menuItems,
    headerConfig,
    templateIDs,
    store: {
      ...storeDetails,
      //ContactInfo
      email_address: contactInfo.email_address,
      phone_number: contactInfo.phone_number,
      company_address: contactInfo.company_address,
      // This field will be updated Ahead
      mediaBaseUrl: '',
    },
  };
};

export const extractAndfillCookiesIntoProps = (
  cookies: string | undefined,
): _PropsToStoreAndGetFromCookies => {
  const { storeInfo, loggedIN, adminConfigs, storeBuilderInfo } =
    extractCookies(cookies);

  return {
    storeBuilder: {
      showHomePage: storeBuilderInfo?.showHomePage || false,
      filters: storeBuilderInfo?.filters || false,
    },
    store: {
      id: storeInfo?.storeId || null,
      storeTypeId: storeInfo?.storeTypeId || 0,
      code: storeInfo?.storeCode || '',
      urls: {
        logo: storeInfo?.logoUrl || '',
        favicon: storeInfo?.favicon || '',
      },
      isAttributeSaparateProduct:
        storeInfo?.isAttributeSaparateProduct || false,
    },
    adminConfig: {
      imageFolderPath: adminConfigs?.imageFolderPath || '',
      blobUrl: adminConfigs?.blobUrl || '',
      blobUrlDirectory: adminConfigs?.blobUrlDirectory || '',
      companyId: adminConfigs?.companyId || 0,
    },
    userLoggedIn: loggedIN || false,
  };
};

export const storeCookiesToDecreaseNoOfAPIRecalls = async (
  res: ServerResponse<IncomingMessage>,
  props: _PropsToStoreAndGetFromCookies,
  domain: string,
) => {
  nextJsSetCookie({
    res,
    cookie: {
      name: __Cookie.storeInfo,
      value: {
        storeId: props.store.id!,
        domain: domain,
        storeCode: props.store.code,
        storeTypeId: props.store.storeTypeId,
        isAttributeSaparateProduct: props.store.isAttributeSaparateProduct,
        favicon: props.store.urls.favicon,
        logoUrl: props.store.urls.logo,
        // from adminConfigs
        companyId: props.adminConfig.companyId,
        blobUrl: props.adminConfig.blobUrl,
        blobUrlRootDirectory: props.adminConfig.blobUrlDirectory,
        imageFolderP: props.adminConfig.imageFolderPath,
        sb: {
          displayHomePage: props.storeBuilder.showHomePage,
          filters: props.storeBuilder.filters,
        },
      },
    },
  });
};

export const passPropsToDocumentFile = ({
  store,
  customScripts,
  gTags,
  adminConfigs,
  klaviyoKey,
  domain,
  bacardiSelectedStore,
  storeBuilder,
}: {
  storeBuilder: { status: boolean; showHomePage: boolean; filters: boolean };
  customScripts: null | _CustomScriptConfigValue;
  gTags: null | _GoogleTagsConfigValue;
  store: _PropsToStoreAndGetFromCookies['store'];
  adminConfigs: _PropsToStoreAndGetFromCookies['adminConfig'];
  klaviyoKey: string | null;
  domain: string;
  bacardiSelectedStore: string;
}): void => {
  if (storeBuilder.status) {
    _globalStore.set({
      key: 'showHomePage',
      value: storeBuilder.showHomePage,
    });
    _globalStore.set({
      key: 'filters',
      value: storeBuilder.filters,
    });
  }

  if (customScripts) {
    _globalStore.set({
      key: 'googleFonts',
      value: customScripts.googleFonts,
    });
    _globalStore.set({
      key: 'customHeadScript',
      value: customScripts.customHeadScript,
    });
    _globalStore.set({
      key: 'customFooterScript',
      value: customScripts.customFooterScript,
    });
    _globalStore.set({
      key: 'customGlobalBodyScript',
      value: customScripts.customGlobalBodyScript,
    });

    //For not including google script for CG store
    if (Number(store.id) !== CG_STORE_CODE) {
      _globalStore.set({
        key: 'customGoogleVerification',
        value: customScripts.customGoogleVerification,
      });
    }
  }

  if (gTags) {
    _globalStore.set({
      key: 'googleTags',
      value: gTags,
    });
  }

  if (store) {
    _globalStore.set({
      key: 'code',
      value: store.code,
    });
    _globalStore.set({
      key: 'logoUrl',
      value: store.urls.logo,
    });
    _globalStore.set({
      key: 'storeTypeId',
      value: store.storeTypeId!,
    });
    _globalStore.set({
      key: 'favicon',
      value: store.urls.favicon,
    });
    _globalStore.set({
      key: 'isAttributeSaparateProduct',
      value: store.isAttributeSaparateProduct,
    });
    _globalStore.set({ key: 'storeId', value: store.id! });
  }

  if (adminConfigs) {
    _globalStore.set({
      key: 'blobUrl',
      value: adminConfigs.blobUrl,
    });
    _globalStore.set({
      key: 'blobUrlRootDirectory',
      value: adminConfigs.blobUrlDirectory,
    });
    _globalStore.set({
      key: 'companyId',
      value: adminConfigs.companyId,
    });
  }

  if (store.code === BACARDI) {
    _globalStore.set({
      key: 'bacardiSelectedStore',
      value: bacardiSelectedStore,
    });
  }

  _globalStore.set({
    key: 'klaviyoKey',
    value: klaviyoKey,
  });
  _globalStore.set({
    key: 'domain',
    value: domain,
  });
  switch (store.code) {
    case 'CG':
      _globalStore.set({
        key: 'klaviyoKeyApi',
        value: 'klevu-14936563081965977',
      });
      break;
    case 'DI':
      _globalStore.set({
        key: 'klaviyoKeyApi',
        value: 'klevu-14903480948925715',
      });
      break;

    case 'PKHG':
      _globalStore.set({
        key: 'klaviyoKeyApi',
        value: 'klevu-15553979660205871',
      });
      break;

    default:
      break;
  }
};

export const configsToCallEveryTime = async (
  storeId: number,
): Promise<{
  customScripts: null | _CustomScriptConfigValue;
  gTags: null | _GoogleTagsConfigValue;
  klaviyoKey: string | null;
}> => {
  let customScripts: null | _CustomScriptConfigValue = null;
  let gTags: null | _GoogleTagsConfigValue = null;
  let klaviyoKey: string | null = null;

  await getAllConfigurations({
    storeId: storeId,
    configNames: [
      'customScript', // multipleScripts
      'googleTags', // => Basically twitter tags
    ],
  })
    .then((values) => {
      customScripts = parseJson<_CustomScriptConfigValue>(
        values[0]?.config_value,
      );

      gTags = parseJson<_GoogleTagsConfigValue>(values[1]?.config_value);
    })
    .catch(() => {
      throw new Error(
        'Something went wrong in function: callConfigsAndRemainingStoreAPIsAndSetURls',
      );
    });

  await fetchThirdpartyservice({ storeId: storeId })
    .then((resposne) => {
      if (resposne?.length && resposne[0]?.key) klaviyoKey = resposne[0].key;
    })
    .catch(() => console.log('Klaviyo key not available'));

  return {
    customScripts: customScripts,
    gTags: gTags,
    klaviyoKey,
  };
};
export const getTemplateIDs = () => {};

export const forwardProductImage = (
  pageProps:
    | _Slug_ProductDetails_Props
    | _Slug_ProductListing_Props
    | _Slug_CMS_Props,
  colorSEName: string,
) => {
  if (pageProps?.page === 'PRODUCT_DETAILS') {
    if (pageProps.data.colors) {
      const color = pageProps.data.colors.find(
        (color) => color.productSEName === colorSEName,
      );

      if (color) {
        return color.imageUrl || '';
      }
    }
  }
  return null;
};
