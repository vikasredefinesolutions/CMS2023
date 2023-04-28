import { PaymentOptions } from '@definations/APIs/cart.req';
import { SendAsync } from '@utils/axios.util';

export const getPaymentOption = async (request: {
  storeId: number;
}): Promise<PaymentOptions> => {
  const url = '/StorePaymentOptions/getpaymentoption.json';
  const res = await SendAsync<any>({
    url: url,
    method: 'POST',
    data: request,
  });
  return res.data;
};

export const getCustomerAllowBalance = async (
  customerId: number,
): Promise<number> => {
  const url = `/StoreCustomer/getcustomercredit/${customerId}.json`;
  const res = await SendAsync<any>({
    url: url,
    method: 'GET',
  });
  return +res.data;
};
