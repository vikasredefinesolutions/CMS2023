import { CallAPI_v2 } from '@helpers/api.helper';
// import config from 'api.config';
import axios from 'axios';

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
}

interface _BackInStockResponse {
  email: string;
  success: boolean;
}
interface _Response {
  data: _BackInStockResponse;
}

export const Klaviyo_BackInStock = async (payload: _BackInStock) => {
  const url = `${process.env.NEXT_PUBLIC_KLAVIYO_COMPONENTS_URL}/back-in-stock/subscribe`;
  const klaviyoPayload = {
    a: payload.a,
    email: payload.email,
    variant: payload.variant,
    platform: payload.platform,
  };
  const res: _Response = await axios.post(url, klaviyoPayload);
  return res.data;
};
