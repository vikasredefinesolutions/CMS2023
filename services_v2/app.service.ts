import {
  StoreConfigurationConfigs,
  _FetchStoreConfigurations,
} from '@definations/store.type';
import { CallAPI_v2 } from '@helpers/api.helper';
import { _StoreDetails } from '@templates/ProductDetails/productDetailsTypes/storeDetails.res';
import { SendAsync } from '@utils/axios.util';

export type _RedefineAppAPIs =
  | 'GetStoreID'
  | 'FetchThemeConfigs'
  | 'FetchStoreConfigurations'
  | 'FetchCompanyConfiguration'
  | 'FetchSbStoreConfiguration';

export const GetStoreID = async (
  domain: string,
): Promise<_StoreDetails | null> => {
  const url = `Store/getstorebydomain.json`;
  try {
    const response: any = {
      "storeXPaymetnOptionListViewModels": [
        {
          "paymentOptionId": 2,
          "paymentOptionName": "Purchase Order (PO)",
          "rowVersion": "RtUFINRz2wg=",
          "status": "A"
        },
        {
          "paymentOptionId": 3,
          "paymentOptionName": "Credit Card",
          "rowVersion": "itUFINRz2wg=",
          "status": "A"
        }
      ],
      "id": 5,
      "storeTypeId": 2,
      "storeType": {
        "id": 2,
        "name": "eCommerce Store",
        "recStatus": "A",
        "createdDate": "2023-05-27T06:16:20.5933333",
        "createdBy": 1,
        "modifiedDate": "2023-05-27T06:16:36.1833333",
        "modifiedBy": 1,
        "rowVersion": "cmFzbFNEK1AyZ2c9",
        "location": "Ahmedabad Gujarat India 380006",
        "ipAddress": "192.168.1.1",
        "macAddress": "00-00-00-00-00-00"
      },
      "name": "Corporate Gear",
      "code": "CG",
      "url": "https://www.corporategear.com",
      "navCode": "CORP",
      "prefix": "CG",
      "logoUrl": "/storagemedia/1/store/logo_5.svg",
      "isLandingPage": true,
      "isBlogPage": false,
      "isReviewMaster": false,
      "isSeoMarketing": true,
      "isAttributeSaparateProduct": true,
      "attributeid": 2,
      "isQuantityDiscount": true,
      "isFirstLogoFree": true,
      "isLinepersonalization": true,
      "firstLineCharges": 7,
      "secondLineCharges": 5,
      "isSmallRun": false,
      "smallRunLimit": 0,
      "smallRunFeesCharges": 0,
      "isLogoSetupCharges": false,
      "logoSetupCharges": 0,
      "isProductReadinessAllow": true,
      "isSeoReadinessAllow": true,
      "shippingChargeType": 1,
      "isFreeShipping": false,
      "generalAmount": 0,
      "punchoutMessage": "",
      "checkOutRequiredThirdPartyLogin": false,
      "domainBasedLogin": false,
      "domainBasedLoginDesc": "",
      "generalLogin": true,
      "thirdPartyLogin": false,
      "bothLogin": false,
      "onlyGuestLogin": false,
      "isBrandStore": false,
      "storeBrandId": 0,
      "parentstoreid": 0,
      "billToCustomer": "",
      "favicon": "/storagemedia/1/store/favicon/favicon_5.png",
      "isCustomerRegistrationApprovalRequired": false,
      "isAllowToReuseApprovedLogo": true,
      "isLoginRequiredForStore": false,
      "isSewOutEnable": false,
      "sewOutCharges": 0,
      "isCustomerLogoApproval": false,
      "isOrganizationName": false,
      "codeName": "corporategear",
      "navLocationCode": null,
      "storeDisplayOrder": 0,
      "isGA4": false,
      "isPriceSync": true,
      "emailLogo": "/storagemedia/temp/1/store/cbf66862-24fc-46da-b3f1-6c260ea83e81.png",
      "isAddToCartRequiredForStore": false,
      "isAllowEmployeeLogin": true,
      "firstLogoCharge": 0,
      "secondLogoCharge": 6,
      "isBrandDiscount": false,
      "isLogoCustomization": true,
      "isPersonalization": false,
      "isGiftCardValidatebyEmail": false,
      "recStatus": "A",
      "createdDate": "2023-05-27T06:16:22.8533333",
      "createdBy": 1,
      "modifiedDate": "2023-06-23T10:25:09.7585516",
      "modifiedBy": 60,
      "rowVersion": "wi1nKYJ42wg=",
      "location": "RI",
      "ipAddress": "127.0.0.0",
      "macAddress": "00-00-00-00-00-00"
    };
    // await SendAsync<_StoreDetails>({
    //   url: url,
    //   method: 'POST',
    //   data: { url: domain },
    // });
    return response;
  } catch (error) {
    return null;
  }
};

export interface _RedefineAppServices {
  service: 'app';
  api: _RedefineAppAPIs;
}

export interface _GetAdminAppConfigs {
  'azure:BlobUrl': string;
  'azure:StorageAccountAccessKey': string;
  'azure:StorageAccountName': string;
  'cdn:RootDirectory': string;
  'cdnarchive:RootDirectory': string;
  keyCompressimagePanda: string;
  transactionSrc: string;
  ups: string;
}

export const GetAdminAppConfigs = async () => {
  const url = `AdminAppConfig/getadminconfig.json`;

  try {
    const response = await SendAsync<_GetAdminAppConfigs>({
      url: url,
      method: 'GET',
    });
    return response;
  } catch (error) {
    return null;
  }
};

interface _FetchCompanyConfiguration {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: {
    module: string;
    createdName: string;
    modifiedName: string;
    id: number;
    fullName: string;
    shortName: string;
    email: string;
    phone: string;
    companyLogoURL: string;
    logoutTime: string;
    twoFactorEnabled: boolean;
    mS365Enabled: boolean;
    recStatus: string;
    createdDate: Date;
    createdBy: number;
    modifiedDate: Date;
    modifiedBy: number;
    rowVersion: string;
    location: string;
    ipAddress: string;
    macAddress: string;
  }[];
}

export const FetchCompanyConfiguration = async (): Promise<{
  companyId: number;
}> => {
  const url = `CompanyConfiguration/list.json`;

  const staticPayload = {
    args: {
      pageIndex: 0,
      pageSize: 0,
      pagingStrategy: 0,
      sortingOptions: [
        {
          field: '',
          direction: 0,
          priority: 0,
        },
      ],
      filteringOptions: [
        {
          field: '',
          operator: 0,
          value: '',
        },
      ],
    },
  };

  const response = await CallAPI_v2<_FetchCompanyConfiguration>({
    name: {
      service: 'app',
      api: 'FetchCompanyConfiguration',
    },
    request: {
      url: url,
      method: 'POST',
      data: staticPayload,
    },
  });

  if (!response) {
    throw new Error('No Company Id found');
  }

  const transformedData = {
    companyId: response.items[0].id,
  };

  return transformedData;
};

export const FetchStoreConfigurations = async (payload: {
  storeId: number;
  configname: StoreConfigurationConfigs;
}): Promise<_FetchStoreConfigurations | null> => {
  const url = `CmsStoreThemeConfigs/getstorethemeconfigs/${payload.storeId}/${payload.configname}.json`;

  const response = await CallAPI_v2<_FetchStoreConfigurations>({
    name: {
      api: 'FetchStoreConfigurations',
      service: 'app',
    },
    request: {
      url: url,
      method: 'GET',
    },
  });
  return response;
};

export const getAllConfigurations = async (payload: {
  storeId: number;
  configNames: StoreConfigurationConfigs[];
}): Promise<Array<_FetchStoreConfigurations | null>> => {
  const configurations: Array<_FetchStoreConfigurations | null> = [];

  const configsToFetch = payload.configNames.map((configName) => {
    return FetchStoreConfigurations({
      storeId: payload.storeId,
      configname: configName,
    });
  });

  await Promise.allSettled(configsToFetch)
    .then((values) => {
      values.forEach((value, index) => {
        configurations[index] =
          value.status === 'fulfilled' ? value.value : null;
      });
    })
    .catch(() => {
      throw new Error(`Error while fetching Store Configurations`);
    });

  return configurations;
};
