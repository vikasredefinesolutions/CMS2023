/* eslint-disable @typescript-eslint/no-explicit-any */
import { __console_v2 } from '@configs/console.config';
import { _showConsoles } from '@configs/show.config';
import { __Login } from '@constants/global.constant';
import { __SuccessErrorText } from '@constants/successError.text';
import {
  UserCreateResponse,
  UserType,
  _GetAdminCustomerUser,
  _GetCityStateCountryWithZip,
  _Invalid,
  _MyAcc_OrderBillingDetails,
  _MyAcc_OrderProductDetails,
  _UpdatePasswordForGuestEmail,
  _Valid,
} from '@definations/APIs/user.res';
import { _SignIn } from '@definations/user.type';
import { CallAPI_v2 } from '@helpers/api.helper';
import { conditionalLog_V2 } from '@helpers/console.helper';
import { _CreateNewAccount_Payload } from '@payloads/createNewAccount.payload';
import { _AccCreated } from '@responses/createNewAccount';
import { SendAsync } from '@utils/axios.util';

export type _UserAPIs_V2 =
  | 'SignInUser'
  | 'CreateNewAccount'
  | 'OrderedBillingDetails'
  | 'OrderedProductDetails'
  | 'FetchOrderIds'
  | 'GetStoreCustomer'
  | 'FetchOrderDetails'
  | 'UpdatePasswordForGuestEmail'
  | 'GetEmailByResetToken'
  | 'ResetPassword'
  | 'GetCustomerUsersByCustomerId'
  | 'GetDecryptPass'
  | 'CheckIfEmailIsAlreadyRegistered'
  | 'ResetPassword'
  | 'GetCityStateCountryWithZip'
  | 'FetchUserOrderIds';

export interface _UserServices_V2 {
  service: 'user';
  api: _UserAPIs_V2;
}

export const CreateNewAccount = async (
  payload: _CreateNewAccount_Payload,
): Promise<_AccCreated | string | null> => {
  const url = 'StoreCustomer/storecustomercreate.json';

  conditionalLog_V2({
    data: payload,
    show: __console_v2.user.service.CreateNewAccount,
    type: 'API-PAYLOAD',
    name: 'CreateNewAccount',
  });

  try {
    const res = await SendAsync<_AccCreated>({
      url: url,
      method: 'POST',
      data: payload,
    });

    // @ts-ignore: Unreachable code error
    if (!res.data || res.success === false) {
      let transformedRes: null | string = __SuccessErrorText.SomethingWentWrong;

      // @ts-ignore: Unreachable code error
      if (res.errors && 'storeCustomerModel.Email' in res.errors) {
        // @ts-ignore: Unreachable code error
        transformedRes = res.errors[`storeCustomerModel.Email`] as string;
      }

      conditionalLog_V2({
        data: { res, transformedRes },
        show: __console_v2.user.service.CreateNewAccount,
        type: 'API-RESPONSE',
        name: 'CreateNewAccount',
      });

      return transformedRes;
    }

    return res;
  } catch (error: any) {
    conditionalLog_V2({
      data: error,
      show: __console_v2.user.service.CreateNewAccount,
      type: 'API-ERROR',
      name: 'CreateNewAccount',
    });
    return { data: null, ...error };
  }
};

export const OrderedBillingDetails = async (
  orderId: number,
): Promise<_MyAcc_OrderBillingDetails | null> => {
  const url = `Order/GetById/${orderId}.json`;

  const response = await CallAPI_v2<_MyAcc_OrderBillingDetails>({
    name: {
      service: 'user',
      api: 'OrderedBillingDetails',
    },
    request: {
      url: url,
      method: 'GET',
    },
  });

  return response;
};

const OrderedProductDetails = async (
  orderId: number,
): Promise<_MyAcc_OrderProductDetails[] | null> => {
  const orderProductDetailsURL = `Order/GetOrderedShoppingCartItemsDetail/${orderId}.json`;

  const response = await CallAPI_v2<_MyAcc_OrderProductDetails[]>({
    name: {
      service: 'user',
      api: 'OrderedProductDetails',
    },
    request: {
      url: orderProductDetailsURL,
      method: 'GET',
    },
  });

  return response;
};

export const FetchOrderDetails = async ({
  orderId,
}: {
  orderId: number;
}): Promise<{
  billing: _MyAcc_OrderBillingDetails;
  product: _MyAcc_OrderProductDetails[];
} | null> => {
  let billingDetails: null | _MyAcc_OrderBillingDetails = null;
  let productDetails: null | _MyAcc_OrderProductDetails[] = null;

  await Promise.allSettled([
    OrderedBillingDetails(orderId),
    OrderedProductDetails(orderId),
  ]).then((values) => {
    billingDetails = values[0].status === 'fulfilled' ? values[0].value : null;
    productDetails = values[1].status === 'fulfilled' ? values[1].value : null;
  });

  if (!billingDetails || !productDetails) {
    return null;
  }

  return {
    product: productDetails,
    billing: billingDetails,
  };
};
/////////////////////////////////////////
// NOTE:
///// A Customer (by default is admin) can add others as users by email invitation

export const FetchOrdersIdByCustomerId = async (payload: {
  storeId: number;
  userId: number;
}): Promise<number[] | null> => {
  const url = `Order/GetAllOrdernumberByCustomerId/${payload.userId}/${payload.storeId}.json`;

  const response = await CallAPI_v2<number[]>({
    name: {
      service: 'user',
      api: 'FetchOrderIds',
    },
    request: {
      url: url,
      method: 'GET',
    },
  });

  return response;
};
export const FetchOrdersIdByCustomerUserId = async (payload: {
  storeId: number;
  userId: number;
}): Promise<number[] | null> => {
  const url = `Order/GetAllOrdernumberByCustomerUsers/${payload.userId}/${payload.storeId}.json`;

  const response = await CallAPI_v2<number[]>({
    name: {
      service: 'user',
      api: 'FetchUserOrderIds',
    },
    request: {
      url: url,
      method: 'GET',
    },
  });

  return response;
};

export const GetEmailByResetToken = async (payload: {
  token: string;
  storeId: number;
}): Promise<string | 'INVALID_TOKEN'> => {
  const url = `StoreCustomer/GetCustomerEmailByToken/${payload.storeId}/${payload.token}.json`;

  const response = await CallAPI_v2<any>({
    name: {
      service: 'user',
      api: 'GetEmailByResetToken',
    },
    request: {
      url: url,
      method: 'GET',
    },
  });

  if (response === '') {
    return 'INVALID_TOKEN';
  }

  return response;
};

export const CheckIfEmailIsAlreadyRegistered = async (payload: {
  email: string;
  storeId: number;
}): Promise<boolean | null> => {
  const url = `StoreCustomer/CheckEmailAlreadyExits/${encodeURIComponent(
    payload.email,
  )}/${payload.storeId}.json`;

  const response = await CallAPI_v2<boolean>({
    name: {
      service: 'user',
      api: 'CheckIfEmailIsAlreadyRegistered',
    },
    request: {
      url: url,
      method: 'GET',
    },
  });

  return response;
};

export const ResetPassword = async (payload: {
  emailId: string;
  tokenCode: string;
  newPassword: string;
  reEnterPassword: string;
}): Promise<any> => {
  const url = `StoreCustomer/CreateNewPassword.json`;

  const response = await CallAPI_v2<any>({
    name: {
      service: 'user',
      api: 'ResetPassword',
    },
    request: {
      url: url,
      method: 'POST',
      data: {
        args: payload,
      },
    },
  });

  return response;
};

export const signInUser = async (
  payload: _SignIn,
): Promise<_Valid | _Invalid> => {
  const url = `StoreCustomer/customerlogin.json`;

  try {
    const res = await SendAsync<UserCreateResponse>({
      url: url,
      method: 'POST',
      data: payload,
    });
    if (res === null) {
      return {
        credentials: 'INVALID',
        // @ts-ignore: Unreachable code error
        message: res?.errors?.exception,
      };
    }
    return {
      credentials: 'VALID',
      id: `${res}`,
    };
  } catch (error) {
    return {
      credentials: 'INVALID',
      message: __Login.something_went_wrong,
    };
  }
};

export const GetStoreCustomer = async (
  customerId: number,
): Promise<UserType | null> => {
  const url = `/StoreCustomer/get/${customerId}.json`;

  const response = await CallAPI_v2<UserType>({
    name: {
      service: 'user',
      api: 'GetStoreCustomer',
    },
    request: {
      url: url,
      method: 'GET',
    },
  });

  return response;
};

export const UpdateUserData = async (payload: {
  customerId: number;
  firstName: string;
  lastName: string;
  gender: string;
  companyName: string;
  password: string;
  birthDate?: string | null;
}): Promise<any | null> => {
  try {
    const url = '/StoreCustomer/updateaccountsettingsinfo.json';
    const res = await SendAsync({
      url: url,
      method: 'POST',
      data: payload,
    });
    conditionalLog_V2({
      data: res,
      name: 'updateUserData',
      type: 'API',
      show: true,
    });
    return res;
  } catch (error) {
    conditionalLog_V2({
      data: error,
      name: 'updateUserData',
      type: 'API',
      show: _showConsoles.services.user,
      error: true,
    });
    return null;
  }
};

export const UpdateUserPassword = async (payload: {
  email: string;
  password: string;
  customerId: number;
}): Promise<{
  success: boolean;
  errors: {
    password: string;
  };
} | null> => {
  try {
    const url = '/StoreCustomer/updatestorecustomeremailpassword.json';
    const res = await SendAsync<{
      success: boolean;
      errors: {
        password: string;
      };
    }>({
      url: url,
      method: 'POST',
      data: payload,
    });
    conditionalLog_V2({
      data: res,
      name: 'updatePassword',
      type: 'API',
      show: true,
    });
    return res;
  } catch (error) {
    conditionalLog_V2({
      data: error,
      name: 'updatePassword',
      type: 'API',
      show: _showConsoles.services.user,
      error: true,
    });
    return null;
  }
};

export const UpdatePasswordForGuestEmail = async (payload: {
  customerId: number;
  email: string;
  password: string;
}): Promise<_UpdatePasswordForGuestEmail | null> => {
  const url = `StoreCustomer/updatestorecustomeremailpassword.json`;

  const response = await CallAPI_v2<_UpdatePasswordForGuestEmail>({
    name: {
      service: 'user',
      api: 'UpdatePasswordForGuestEmail',
    },
    request: {
      url: url,
      method: 'POST',
      data: payload,
    },
  });

  return response;
};

export const GetAdminCustomerUsers = async (payload: {
  customerid: number;
  storeid: number;
}): Promise<_GetAdminCustomerUser[] | null> => {
  const url = `StoreCustomer/GetCustomerUsersAddressById/${payload.customerid}/${payload.storeid}.json`;

  const response = await CallAPI_v2<_GetAdminCustomerUser[]>({
    name: {
      service: 'user',
      api: 'GetCustomerUsersByCustomerId',
    },
    request: {
      url: url,
      method: 'GET',
    },
  });
  return response;
};

export const getDecryptPassword = async (payload: {
  password: string;
}): Promise<string | null> => {
  const url = `DataProtectServices/decrypt.json?password=${payload.password}`;

  const response = await CallAPI_v2<string>({
    name: {
      service: 'user',
      api: 'GetDecryptPass',
    },
    request: {
      url: url,
      method: 'POST',
    },
  });

  return response;
};

export const getLocationWithZipCode = async (
  zipCode: string,
): Promise<_GetCityStateCountryWithZip | null> => {
  const url = `City/getcitystatecountrybyzipCode/${zipCode}.json`;

  const response = await CallAPI_v2<_GetCityStateCountryWithZip>({
    name: {
      service: 'user',
      api: 'GetCityStateCountryWithZip',
    },
    request: {
      url: url,
      method: 'GET',
    },
  });

  return response;
};
