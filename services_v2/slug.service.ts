import { _GetPageType, _PageTypesAvailable } from '@definations/slug.type';
import { CallAPI_v2 } from '@helpers/api.helper';

export type _SlugAPIs_V2 = 'FetchPageType' | 'FetchPageComponents';

export type _SlugService_V2 = {
  service: 'slug';
  api: _SlugAPIs_V2;
};

export const FetchPageType = async (Req: {
  storeId: number;
  slug: string;
}): Promise<_GetPageType | null> => {
  const url = 'CmsTopicsPublish/getpagetypebyslug.json';

  const response = await CallAPI_v2<_GetPageType>({
    name: {
      api: 'FetchPageType',
      service: 'slug',
    },
    request: {
      url: url,
      method: 'POST',
      data: Req,
    },
  });
console.log("REQ", Req)
  if (response === null) {
    return null;
  }

  const transformedData: _GetPageType = {
    ...response,
    type: response.type.toLocaleLowerCase() as _PageTypesAvailable,
  };

  return transformedData;
};

export const FetchPageComponents = async (payload: {
  pageId: number;
  type: string;
}) => {
  const url = `CmsComponents/getpagecomponents.json`;

  const response = await CallAPI_v2<any>({
    name: {
      service: 'slug',
      api: 'FetchPageComponents',
    },
    request: {
      url: url,
      method: 'POST',
      data: payload,
    },
  });

  return response;
};
