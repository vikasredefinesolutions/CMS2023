import { _GetCustomerRoles } from '@definations/APIs/customer.req';
import {
  _AddCustomerRes,
  _CustomerRoleResponse,
} from '@definations/APIs/customer.res';
import {
  _ForgetCustomerPassword,
  _ForgetCustomerPassword_Res,
} from '@definations/APIs/user.res';
import { SendAsync } from '@utils/axios.util';
import { _CreateStoreCustomer } from './payloads/createStoreCustomerUser';
import { CustomerUsersObject } from './responses/customerUser';

export const AddCustomerUser = async (
  payload: _CreateStoreCustomer,
): Promise<_AddCustomerRes | null> => {
  try {
    const url = '/StoreCustomerUsers/createstorecustomerusers.json';
    const res: _AddCustomerRes = await SendAsync({
      url: url,
      method: 'POST',
      data: payload,
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const getCustomerUserList = async (
  customerId: number,
): Promise<CustomerUsersObject[] | null> => {
  try {
    const url = `/StoreCustomerUsers/getcustomeruserslist/${customerId}.json`;
    const res = await SendAsync<CustomerUsersObject[]>({
      url: url,
      method: 'POST',
    });

    return res;
  } catch (error) {
    return null;
  }
};

export const deleteCustomerUserList = async (
  customerId: number,
): Promise<CustomerUsersObject[] | null> => {
  try {
    const url = `/StoreCustomerUsers/deletecustomerusersbyid/${customerId}.json`;
    const res = await SendAsync<CustomerUsersObject[]>({
      url: url,
      method: 'POST',
    });

    return res;
  } catch (error) {
    return null;
  }
};

export const UpdateCustomerUser = async (
  payload: _CreateStoreCustomer,
): Promise<_AddCustomerRes | null> => {
  try {
    const url = '/StoreCustomerUsers/updatestorecustomerusers.json';
    const res: _AddCustomerRes = await SendAsync({
      url: url,
      method: 'POST',
      data: payload,
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const ForgetCustomerPassword = async (
  payload: _ForgetCustomerPassword,
) => {
  try {
    const url = `/StoreCustomer/customerchangepasswordlink/${payload.storeId}/${payload.email}.json`;

    const res: _ForgetCustomerPassword_Res = await SendAsync({
      url: url,
      method: 'GET',
      data: payload,
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const CustomerRoles = async (
  payload: _GetCustomerRoles,
): Promise<_CustomerRoleResponse[]> => {
  const url = `/storecustomerroles/getcustomerroles/${payload.storeId}.json`;
  const res: _CustomerRoleResponse[] = await SendAsync({
    url: url,
    method: 'POST',
    data: payload.storeId,
  });
  return res;
};
