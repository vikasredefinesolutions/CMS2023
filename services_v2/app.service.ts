import { _StoreDetails } from '@templates/ProductDetails/productDetailsTypes/storeDetails.res';
import { SendAsync } from '@utils/axios.util';

export type _RedefineAppAPIs = 'GetStoreID' | 'FetchThemeConfigs';

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
