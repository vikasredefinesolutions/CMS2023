import { CallAPI_v2 } from '@helpers/api.helper';

export type _StoreRequestAPIs_V2 = 'CreateStoreRequest';

export type _StoreRequestService_V2 = {
  service: 'storeRequest';
  api: _StoreRequestAPIs_V2;
};

export interface _StoryRequest extends _StoryRequestPaylod {
  id: number;
}

export interface _StoryRequestPaylod {
  ggQuoteRequestModel: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    organization: string;
    teamSport: string;
    city: string;
    state: string;
    approximateQuantity: string;
    teamLogo: string;
    message: string;
  };
}

export const createStoreRequests = async (payload: _StoryRequestPaylod) => {
  const url = '/StoreRequests/createggquoterequest.json';
  const response = await CallAPI_v2<_StoryRequest>({
    name: {
      service: 'storeRequest',
      api: 'CreateStoreRequest',
    },
    request: {
      url: url,
      method: 'POST',
      data: payload,
    },
  });
  console.log('response in service: ', response);

  return response;
};
