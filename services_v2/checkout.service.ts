import { AddOrderRequest } from '@definations/APIs/checkout.req';
import { CheckCustomerAlreadyExistResponse } from '@definations/APIs/checkout.res';
import { SendAsync } from '@utils/axios.util';

export const checkCustomerAlreadyExist = async (
  email: string,
  storeId: number,
): Promise<CheckCustomerAlreadyExistResponse | null> => {
  try {
    const url = `/StoreCustomer/checkstorecustomerguest.json`;
    const res = await SendAsync<CheckCustomerAlreadyExistResponse | null>({
      url: url,
      method: 'POST',
      data: {
        email: email,
        storeId: storeId,
      },
    });

    return res;
  } catch (error) {
    return null;
  }
};

export const placeOrder = async (orderObject: {
  orderModel: AddOrderRequest;
}): Promise<{ id: string } | null> => {
  try {
    const url = `/Order/addorder.json`;
    const res = await SendAsync<{ id: string }>({
      url: url,
      method: 'POST',
      data: orderObject,
    });

    return res;
  } catch (error) {
    return null;
  }
};
