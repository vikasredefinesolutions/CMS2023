import { CallAPI_v2 } from '@helpers/api.helper';
import { _StoreDetails } from '@templates/ProductDetails/productDetailsTypes/storeDetails.res';
import { SendAsync } from '@utils/axios.util';

export type _RedefineAppAPIs =
  | 'GetStoreID'
  | 'FetchThemeConfigs'
  | 'FetchCompanyConfiguration';

export const GetStoreID = async (
  domain: string,
): Promise<_StoreDetails | null> => {
  const url = `Store/getstorebydomain.json`;

  try {
    const response = await SendAsync<_StoreDetails>({
      url: url,
      method: 'POST',
      data: { url: domain },
    });
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
