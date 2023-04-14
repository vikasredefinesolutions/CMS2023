import { CallAPI_v2 } from 'helpers_v2/api.helper';

export type _GeneralAPIs =
  | 'UploadImage'
  | 'GetStatesList'
  | 'GetCountriesList'
  | 'GetIndustriesList';

export interface _GeneralService {
  service: 'general';
  api: _GeneralAPIs;
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

export const GetStatesList = async (id: number): Promise<_State[] | null> => {
  const url = `StoreCustomer/getcustomerstatebycountryid/${id}.json`;

  const response = await CallAPI_v2<_State[]>({
    name: {
      service: 'general',
      api: 'GetStatesList',
    },
    request: {
      url: url,
      method: 'GET',
    },
  });

  return response;
};

export const GetCountriesList = async (): Promise<_Country[] | null> => {
  const url = `StoreCustomer/getcustomercountry.json`;

  const response = await CallAPI_v2<_Country[]>({
    name: {
      service: 'general',
      api: 'GetCountriesList',
    },
    request: {
      url: url,
      method: 'POST',
    },
  });

  return response;
};

export const GetIndustriesList = async (): Promise<_Industry[] | null> => {
  const url = `StoreCustomer/getcustomerindustry.json`;

  const response = await CallAPI_v2<_Industry[]>({
    name: {
      service: 'general',
      api: 'GetCountriesList',
    },
    request: {
      url: url,
      method: 'POST',
    },
  });

  return response;
};
