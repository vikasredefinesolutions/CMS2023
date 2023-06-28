import { _Country, _Industry, _State } from '@definations/app.type';
import { SendAsync } from '@utils/axios.util';
import { CallAPI_v2 } from 'helpers_v2/api.helper';

export type _GeneralAPIs =
  | 'UploadImage'
  | 'FetchStatesList'
  | 'FetchCountriesList'
  | 'FetchIndustriesList';

export interface _GeneralService {
  service: 'general';
  api: _GeneralAPIs;
}
export interface _SubscribeToNewsletter {
  subscribeModel: {
    rowVersion: string;
    location: string;
    ipAddress: string;
    macAddress: string;
    id: number;
    email: string;
    isSubscribe: boolean;
    storeId: number;
    recStatus: string;
  };
}

export const UploadImage = async ({
  folderPath,
  files,
}: {
  folderPath: string;
  files: File;
}): Promise<string | null> => {
  const url = `/upload/image?folderPath=${folderPath}`;

  const response = await CallAPI_v2<string>({
    name: {
      api: 'UploadImage',
      service: 'general',
    },
    request: {
      url: url,
      method: 'POST',
      data: { files },
    },
  });

  return response;
};

export const DeleteLogo = async (logoid: number, customerid: number) => {
  const url = `/StoreCustomerLogo/removecustomerlogo/${logoid}/${customerid}.json`;
  const response = await SendAsync<any>({
    url: url,
    method: 'POST',
  });

  return response;
};

export const SetLogoDefault = async (
  logoId: number,
  isdefault: boolean,
  customerId: number,
) => {
  const url = `/StoreCustomerLogo/updatedefaultlogo/${logoId}/${isdefault}/${customerId}.json`;
  const response = await SendAsync<any>({
    url: url,
    method: 'POST',
  });

  return response;
};

export const FetchStatesList = async (id: number): Promise<_State[] | null> => {
  const url = `StoreCustomer/getcustomerstatebycountryid/${id}.json`;

  const response = await CallAPI_v2<_State[]>({
    name: {
      service: 'general',
      api: 'FetchStatesList',
    },
    request: {
      url: url,
      method: 'GET',
    },
  });

  if (response?.length === 0) {
    return null;
  }

  return response;
};

export const FetchCountriesList = async (): Promise<_Country[] | null> => {
  const url = `StoreCustomer/getcustomercountry.json`;

  const response = await CallAPI_v2<_Country[]>({
    name: {
      service: 'general',
      api: 'FetchCountriesList',
    },
    request: {
      url: url,
      method: 'POST',
    },
  });

  if (response?.length === 0) {
    return null;
  }

  return response;
};

export const FetchIndustriesList = async (): Promise<_Industry[] | null> => {
  const url = `StoreCustomer/getcustomerindustry.json`;

  const response = await CallAPI_v2<_Industry[]>({
    name: {
      service: 'general',
      api: 'FetchCountriesList',
    },
    request: {
      url: url,
      method: 'POST',
    },
  });

  return response;
};

export const SubsribeToNewsLetter = async (payload: _SubscribeToNewsletter) => {
  const res = await SendAsync<_SubscribeToNewsletter>({
    url: '/Subscribe/CreateSubscribe.json',
    method: 'POST',
    data: payload,
  });
  return res;
};
