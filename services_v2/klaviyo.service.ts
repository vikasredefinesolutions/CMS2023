import { CallAPI_v2 } from '@helpers/api.helper';
import { SendAsync } from '@utils/axios.util';
// import config from 'api.config';

export type _KlaviyoAPIs = 'Klaviyo_PlaceOrder' | 'Klaviyo_BackInStock';

export interface _KlaviyoServices {
  service: 'Klaviyo';
  api: _KlaviyoAPIs;
}

export const Klaviyo_PlaceOrder = async (payload: { orderNumber: string }) => {
  const url = 'Klaviyo/KlaviyoPlaceOrder.json';

  const response = await CallAPI_v2<boolean>({
    name: {
      service: 'Klaviyo',
      api: 'Klaviyo_PlaceOrder',
    },
    request: {
      url: url,
      method: 'POST',
      data: payload,
    },
  });

  return response;
};
interface _BackInStock {
  a: string;
  email: string;
  variant: string;
  platform: string;
  storeId: number;
}

export const Klaviyo_BackInStock = async (payload: _BackInStock) => {
  const url = `/Klaviyo/KlaviyoBackInStock.json`;
  const klaviyoPayload = {
    storeId: payload.storeId,
    klaviyoApiPublicKey: window.__klKey,
    emailId: payload.email,
    attributeOptionsID: payload.variant,
  };
  const res = await SendAsync<any>({
    url: url,
    method: 'POST',
    data: klaviyoPayload,
  });
  return res;
};
