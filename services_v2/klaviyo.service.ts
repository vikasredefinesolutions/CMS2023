import config from '@configs/api.config';
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
  var formData = new FormData();

  Object.entries(payload).forEach((val: any) => {
    let key = val[0];
    let value = val[1];
    formData.append(key, value);
  });

  const url = `${config.baseUrl.klaviyo2}onsite/components/back-in-stock/subscribe`;

  const res: _Response = await axios.post(url, formData);
  return res.data;
};
