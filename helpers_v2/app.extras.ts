import { __Cookie } from '@constants/global.constant';
import * as _AppController from '@controllers/_AppController.async';
import { _Expected_AppProps } from '@definations/app.type';
import { _MenuItems } from '@definations/header.type';
import {
  _FetchStoreConfigurations,
  _StoreReturnType,
} from '@definations/store.type';
import {
  FetchCompanyConfiguration,
  getAllConfigurations,
} from '@services/app.service';
import { IncomingMessage, ServerResponse } from 'http';
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
  },
  menuItems: null,
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

export const callConfigsAndRemainingStoreAPIsAndSetURls = async (
  storeDetails: _StoreReturnType,
): Promise<{
  store: _StoreReturnType;
  footerHTML: _FetchStoreConfigurations | null;
  headerConfig: _FetchStoreConfigurations | null;
  menuItems: _MenuItems | null;
  companyId: number;
  templateIDs: _templateIds;
}> => {
  let companyId = 0;
  let footerHTML: _FetchStoreConfigurations | null = null;
  let menuItems: _MenuItems | null = null;
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
    getAllConfigurations({
      storeId: storeDetails.storeId!,
      configNames: ['footer', 'contactInfo', 'header_config', 'productListing'],
    }),
    _AppController.fetchMenuItems(storeDetails.storeId!),
  ])
    .then((values) => {
      companyId =
        values[0].status === 'fulfilled' ? values[0].value.companyId : 0;

      if (values[1].status === 'fulfilled') {
        const configs = values[1].value;
        footerHTML = configs[0];
        headerConfig = configs[2];
        contactInfo =
          parseJson<_contactInfo>(configs[1]?.config_value) || contactInfo;

        templateIDs.headerTemplateId =
          parseJson<{ template_Id: string }>(configs[2]?.config_value)
            ?.template_Id || '';

        templateIDs.breadCrumbsTemplateId =
          parseJson<{ breadCrumbTemplateId: string }>(configs[3]?.config_value)
            ?.breadCrumbTemplateId || '';
      }

      menuItems = values[2].status === 'fulfilled' ? values[2].value : null;
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
  const { storeInfo, loggedIN, adminConfigs } = extractCookies(cookies);

  return {
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
      },
    },
  });
};

export const passPropsToDocumentFile = ({
  store,
  customScripts,
  gTags,
  adminConfigs,
}: {
  customScripts: null | _CustomScriptConfigValue;
  gTags: null | _GoogleTagsConfigValue;
  store: _PropsToStoreAndGetFromCookies['store'];
  adminConfigs: _PropsToStoreAndGetFromCookies['adminConfig'];
}): void => {
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
    _globalStore.set({
      key: 'customGoogleVerification',
      value: customScripts.customGoogleVerification,
    });
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
};

export const configsToCallEveryTime = async (
  storeId: number,
): Promise<{
  customScripts: null | _CustomScriptConfigValue;
  gTags: null | _GoogleTagsConfigValue;
}> => {
  let customScripts: null | _CustomScriptConfigValue = null;
  let gTags: null | _GoogleTagsConfigValue = null;

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

  return {
    customScripts: customScripts,
    gTags: gTags,
  };
};
export const getTemplateIDs = () => {};
