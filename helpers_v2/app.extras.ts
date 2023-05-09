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
import {
  _CustomScriptsCookies,
  _GoogleTagsCookies,
  extractCookies,
  nextJsSetCookie,
} from './common.helper';

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
  customScripts: _CustomScriptsCookies['value'] | null;
  googleTags: _GoogleTagsCookies['value'];
  userLoggedIn: boolean;
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
  customScripts: null | _CustomScriptsCookies['value'];
  googleTags: string;
  menuItems: _MenuItems | null;
  companyId: number;
  templateIDs: _templateIds;
}> => {
  let companyId = 0;
  let footerHTML: _FetchStoreConfigurations | null = null;
  let customScripts: null | _CustomScriptsCookies['value'] = null;
  let googleTags: string = '';
  let menuItems: _MenuItems | null = null;
  let contactInfo: _contactInfo | null = null;
  let templateIDs: _templateIds = {
    headerTemplateId: '3',
    breadCrumbsTemplateId: '3',
  };
  let headerConfig: _FetchStoreConfigurations | null = null;

  await Promise.allSettled([
    FetchCompanyConfiguration(),
    getAllConfigurations({
      storeId: storeDetails.storeId!,
      configNames: [
        'footer',
        'customScript', // => GoogleFonts
        'googleTags', // => Basicall twitter tags
        'contactInfo',
        'header_config',
        'productListing',
      ],
    }),
    _AppController.fetchMenuItems(storeDetails.storeId!),
  ])
    .then((values) => {
      companyId =
        values[0].status === 'fulfilled' ? values[0].value.companyId : 0;

      if (values[1].status === 'fulfilled') {
        const configs = values[1].value;
        footerHTML = configs[0];
        headerConfig = configs[4];

        customScripts = parseJson<_CustomScriptsCookies['value']>(
          configs[1]?.config_value,
        );

        googleTags = configs[2]?.config_value || '';
        const temp_contactInfo = configs[3]?.config_value || '';
        contactInfo = JSON.parse(temp_contactInfo);
        storeDetails.email_address = contactInfo
          ? contactInfo.email_address
          : '';
        storeDetails.phone_number = contactInfo ? contactInfo.phone_number : '';
        storeDetails.company_address = contactInfo
          ? contactInfo.company_address
          : '';
        const temp_headerTemplateIdinfo = configs[4]?.config_value || '';
        const headerTemplateIdinfo = JSON.parse(temp_headerTemplateIdinfo);

        templateIDs.headerTemplateId = headerTemplateIdinfo.template_Id;
        const temp_breadCrumbTemplateIdinfo = configs[5]?.config_value || '';
        const breadCrumbTemplateIdinfo = JSON.parse(
          temp_breadCrumbTemplateIdinfo,
        );
        templateIDs.breadCrumbsTemplateId =
          breadCrumbTemplateIdinfo.breadCrumbTemplateId;
      }

      menuItems = values[2].status === 'fulfilled' ? values[2].value : null;
    })
    .catch();

  return {
    companyId,
    footerHTML,
    menuItems,
    customScripts,
    googleTags,
    headerConfig,
    templateIDs,
    store: {
      storeId: storeDetails.storeId,
      pageType: storeDetails.pageType,
      storeTypeId: storeDetails.storeTypeId,
      code: storeDetails.code,
      storeName: storeDetails.storeName,
      isAttributeSaparateProduct: storeDetails.isSewOutEnable,
      cartCharges: storeDetails.cartCharges,
      urls: {
        logo: storeDetails.urls.logo,
        favicon: storeDetails.urls.favicon,
      },
      mediaBaseUrl: '',
      sewOutCharges: storeDetails.sewOutCharges,
      firstLineCharges: storeDetails.firstLineCharges,
      secondLineCharges: storeDetails.secondLineCharges,
      imageFolderPath: `/rdc/${companyId}/store/${storeDetails.storeId}/images/`,
      isSewOutEnable: storeDetails.isSewOutEnable,
      shippingChargeType: storeDetails.shippingChargeType,
      email_address: storeDetails.email_address,
      phone_number: storeDetails.phone_number,
      company_address: storeDetails.company_address,
      thirdPartyLogin: storeDetails.thirdPartyLogin,
      bothLogin: storeDetails.bothLogin,
    },
  };
};

export const extractAndfillCookiesIntoProps = (
  cookies: string | undefined,
): _PropsToStoreAndGetFromCookies => {
  const { storeInfo, customScripts, googleTags, loggedIN, adminConfigs } =
    extractCookies(cookies);

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
    customScripts: customScripts || null,
    googleTags: googleTags || '',
    userLoggedIn: loggedIN || false,
  };
};

export const storeCookiesToDecreaseNoOfAPIRecalls = async (
  res: ServerResponse<IncomingMessage>,
  props: _PropsToStoreAndGetFromCookies,
  domain: string,
) => {
  if (props.customScripts) {
    nextJsSetCookie({
      res,
      cookie: {
        name: __Cookie.customScripts,
        value: props.customScripts,
      },
    });
  }

  nextJsSetCookie({
    res,
    cookie: {
      name: __Cookie.googleTags,
      value: props.googleTags,
    },
  });

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
        imageFolderPath: props.adminConfig.imageFolderPath,
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
  customScripts: _PropsToStoreAndGetFromCookies['customScripts'];
  gTags: _PropsToStoreAndGetFromCookies['googleTags'];
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
    const tags: {
      twitterTags: {
        twitterTagRadio: boolean;
        twitterTagTextArea: string;
      };
      dcTags: {
        dcTagRadio: boolean;
        dcTagTextArea: string;
      };
    } = JSON.parse(gTags);

    _globalStore.set({
      key: 'googleTags',
      value: tags,
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
export const getTemplateIDs = () => {};
