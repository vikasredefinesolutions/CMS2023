import { CallAPI_v2 } from '@helpers/api.helper';
import { SendAsync } from '@utils/axios.util';
import { _GiftCard } from './gift';

export type _GiftCardAPIs =
  | 'FetchGiftCardsList'
  | 'FetchGiftCardDetailsBySename';

export type _GiftCardService = {
  service: 'giftCard';
  api: _GiftCardAPIs;
};

export const FetchGiftCardsList = async (payload: {
  storeId: number;
}): Promise<_GiftCard[] | null> => {
  const url = `StoreProduct/giftproductlist/${payload.storeId}.json`;

  const response = await CallAPI_v2<_GiftCard[]>({
    name: {
      service: 'giftCard',
      api: 'FetchGiftCardsList',
    },
    request: {
      url: url,
      method: 'POST',
      data: {},
    },
  });

  return response;
};

interface _UnCookedGiftCard {
  id: number;
  seName: string;
  storeId: number;
  name: string;
  description: string;
  shortDescription: string;
  ourCost: string;
  salePrice: string;
  sku: string;
  imageName: string;
}

interface _GiftCardApplyResponse {
  giftCardSerialNo: string;
  giftCardId: number;
  giftCardAmount: number;
  expiryDate: string;
}

export const FetchGiftCardDetailsBySename = async (payload: {
  storeId: number;
  giftId: string;
}): Promise<_GiftCard | null> => {
  const url = `StoreProduct/giftproductdetailsbysename/${payload.giftId}/${payload.storeId}.json`;

  const response = await CallAPI_v2<_UnCookedGiftCard>({
    name: {
      service: 'giftCard',
      api: 'FetchGiftCardDetailsBySename',
    },
    request: {
      url: url,
      method: 'GET',
    },
  });

  if (response === null) {
    return null;
  }

  const fieldNameChanged: _GiftCard = {
    ...response,
    productId: response?.id,
  };

  return fieldNameChanged;
};

export const ApplyGiftCard = async (payload: {
  giftCardModel: {
    customerID: number;
    storeId: number;
    giftCardSerialNo: string;
    emailId: string;
  };
}) => {
  const url = `/GiftCard/getgiftcarddetails.json`;

  const res = await SendAsync<_GiftCardApplyResponse>({
    url: url,
    method: 'POST',
    data: payload,
  });

  return res;
};
