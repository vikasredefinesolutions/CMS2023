import {
  AddressAPIRequest,
  _DeleteCustomerAddressReq,
} from '@definations/APIs/address.req';
import {
  _CreateUserAddressRes,
  _CustomerAddressDefaultRes,
} from '@definations/APIs/address.res';
import { SendAsync } from '@utils/axios.util';

export const CreateUserAddress = async (request: AddressAPIRequest) => {
  const url = `/StoreCustomer/storecustomercreateaddress.json`;
  const res: _CreateUserAddressRes = await SendAsync<_CreateUserAddressRes>({
    url: url,
    method: 'POST',
    data: request,
  });

  return res;
};

export const getCountryList = async () => {
  const url = '/StoreCustomer/getcustomercountry.json';
  const res = await SendAsync<Array<{ id: number; name: string }>>({
    url: url,
    method: 'POST',
  });
  return res;
};

export const getStatesList = async (id: number) => {
  const url = `/StoreCustomer/getcustomerstatebycountryid/${id}.json`;
  const res = await SendAsync<Array<{ id: number; name: string }>>({
    url: url,
    method: 'GET',
  });
  return res;
};

export const udpateIsDefaultAddress = async (payload: {
  isDefault: boolean;
  addressId: number;
  customerId: number;
  addressType: string;
}) => {
  const url = '/StoreCustomer/setcustomeraddressdefault.json';

  const res = await SendAsync<boolean>({
    url: url,
    method: 'POST',
    data: payload,
  });
  return res;
};

export const UpdateUserAddress = async (request: AddressAPIRequest) => {
  const url = `/StoreCustomer/updatestorecustomeraddress.json`;
  const res: _CustomerAddressDefaultRes =
    await SendAsync<_CustomerAddressDefaultRes>({
      url: url,
      method: 'POST',
      data: request,
    });
  return res;
};

export const deleteCustomerAddress = async (
  request: _DeleteCustomerAddressReq,
) => {
  const url = '/StoreCustomer/deletestorecustomeraddress.json';
  const res = await SendAsync<boolean>({
    url: url,
    method: 'POST',
    data: request,
  });
  return res;
};
