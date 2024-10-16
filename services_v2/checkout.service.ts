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
  } catch (error: any) {
    return error;
  }
};

export interface _ValueLabelPair {
  value: string;
  label: string;
}

export const FetchEmpSourceList = async (
  storeId: number,
): Promise<_ValueLabelPair[]> => {
  const url = `/Source/getlist/${storeId}.json`;

  const response = await SendAsync<_ValueLabelPair[]>({
    url: url,
    method: 'GET',
  });
  return response;
};

export const FetchEmpSourceMediumList = async (
  sourceId: string,
): Promise<_ValueLabelPair[]> => {
  const url = `/Source/getlistbyid/${sourceId}.json`;

  const response = await SendAsync<_ValueLabelPair[]>({
    url: url,
    method: 'GET',
  });

  return response;
};

export const FetchEmpOrderSubTypeList = async (): Promise<
  _ValueLabelPair[]
> => {
  const url = `Source/getproducttype.json`;

  const response = await SendAsync<_ValueLabelPair[]>({
    url: url,
    method: 'GET',
  });
  return response;
};

export const FetchEmployeesList = async (): Promise<_ValueLabelPair[]> => {
  const url = `EmployeeLogin/getallemployee.json`;

  const response = await SendAsync<_ValueLabelPair[]>({
    url: url,
    method: 'POST',
  });

  return response;
};

export const FetchSalesTax = async ({
  customerId,
  zipCode,
  logoTotal,
  lineTotal,
  logoSetupCharge,
  shippingCharges,
  smallRunFee,
}: any): Promise<number> => {
  const url = `Store/Getsalestax/${customerId}/${zipCode}/${logoTotal}/${lineTotal}/${logoSetupCharge}/${shippingCharges}/${smallRunFee}.json`;

  const response = await SendAsync<number>({
    url: url,

    method: 'GET',
  });

  return response;
};

export const punchoutCheckout = async (payload: {
  sessionId: string;
  customerId: string | number;
}): Promise<any> => {
  const url = `Punchout/cart/${payload.sessionId}/${payload.customerId}.json`;
  return await SendAsync({
    url,
    method: 'GET',
  });
};
