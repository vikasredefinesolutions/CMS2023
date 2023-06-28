import { _SbStoreConfiguration } from '@definations/store.type';
import { CallAPI_v2 } from '@helpers/api.helper';
import { _CartItem } from './cart';

export type _StoreBuilderAPIs =
  | 'FetchSbStoreConfiguration'
  | 'FetchSbStoreMessages'
  //
  | 'FetchSbStoreFixedFees'
  | 'FetchSbStoreFees'
  | 'FetchSbCouponRebates'
  | 'FetchSbStoreOrderTax'
  | 'FetchSbStoreCartProductAdditionalPrices'
  //
  | 'FetchSbStoreProductCustomFields'
  | 'FetchSbStoreAdditionalCustomFields'
  | 'FetchSbStorePlayerInformation'
  //
  | 'SaveSbStoreCartProductCustomFieldValues'
  | 'SaveSbStoreAdditionalCustomFieldsValue'
  | 'SaveSbStorePlayerInformation'
  //
  | 'DeleteSbStoreCartProductDetails';

export interface _StoreBuilderServices {
  service: 'storeBuilder';
  api: _StoreBuilderAPIs;
}

export const FetchSbStoreConfiguration = async (payload: {
  storeId: number;
}): Promise<null | _SbStoreConfiguration> => {
  const url = `SbStoreConfiguration/GetSbStoreConfiguration`;

  const response = await CallAPI_v2<_SbStoreConfiguration>({
    name: {
      service: 'storeBuilder',
      api: 'FetchSbStoreConfiguration',
    },
    request: {
      url: url,
      method: 'POST',
      data: payload,
    },
  });

  return response;
};

interface _SbStoreMessages {
  id: number;
  storeId: number;
  primaryLogo: null;
  secondaryLogo: null;
  secondaryLogoLink: null;
  checkOutMessage: string;
  orderSuccessMessage: string;
  receiptHeaderNote: string;
  salesExpiredMessage: string;
  displayCategoryMenu: null;
  showSaleEndDate: null;
  taxAutomatically: null;
  headerMessage: string;
  checkoutTermsAndCondition: string;
}

export const FetchSbStoreMessages = async (payload: {
  storeId: number;
}): Promise<null | _SbStoreMessages> => {
  const url = `SbStoreMessages/list`;

  const response = await CallAPI_v2<_SbStoreMessages[]>({
    name: {
      service: 'storeBuilder',
      api: 'FetchSbStoreMessages',
    },
    request: {
      url: url,
      method: 'POST',
      data: payload,
    },
  });

  if (response) {
    return response[0];
  }

  return null;
};

export interface _SbStoreFixedFees {
  id: number;
  storeId: number;
  fixedCharge: number;
  cardProcessingCharge: number;
  isAvalaraTaxes: boolean;
  isDisplayFeesInformation: boolean;
  recStatus: string;
  createdDate: Date;
  createdBy: number;
  modifiedDate: Date;
  modifiedBy: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
}

export const FetchSbStoreFixedFees = async (payload: {
  storeId: number;
}): Promise<null | _SbStoreFixedFees> => {
  const url = `SbStoreFixedFees/list`;

  const response = await CallAPI_v2<_SbStoreFixedFees[]>({
    name: {
      service: 'storeBuilder',
      api: 'FetchSbStoreFixedFees',
    },
    request: {
      url: url,
      method: 'POST',
      data: payload,
    },
  });

  if (response) {
    return response[0];
  }

  return response;
};

export interface _SbStoreFees {
  id: number;
  storeId: number;
  name: string;
  type: 1 | 2; // 1=> percentage 2=> fixed amount
  amount: number;
}

export const FetchSbStoreFees = async (payload: {
  storeId: number;
}): Promise<null | _SbStoreFees[]> => {
  const url = `SbStoreFees/list`;

  const response = await CallAPI_v2<_SbStoreFees[]>({
    name: {
      service: 'storeBuilder',
      api: 'FetchSbStoreFees',
    },
    request: {
      url: url,
      method: 'POST',
      data: payload,
    },
  });

  return response;
};

export interface _SbStoreCouponRebates {
  storeId: number;
  name: string;
  type: 1 | 2;
  amount: number;
  couponCodes: string;
  couponCodeUsedOnes: string;
  recStatus: string;
  id: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
}

export const FetchSbCouponRebates = async (payload: {
  storeId: number;
}): Promise<null | _SbStoreCouponRebates[]> => {
  const url = `SbCouponRebates/GetSbCouponRebatesByStore/${payload.storeId}.json`;

  const response = await CallAPI_v2<_SbStoreCouponRebates[]>({
    name: {
      service: 'storeBuilder',
      api: 'FetchSbCouponRebates',
    },
    request: {
      url: url,
      method: 'GET',
    },
  });

  return response;
};

export interface _SbStoreCustomFields {
  id: number;
  storeId: number;
  name: string;
  type: string;
  isRequired: boolean;
  recStatus: string;
  createdDate: Date;
  createdBy: number;
  modifiedDate: null;
  modifiedBy: null;
  rowVersion: null;
  location: null;
  ipAddress: null;
  macAddress: null;
}

export const FetchSbStoreAdditionalCustomFields = async (payload: {
  storeId: number;
}): Promise<null | _SbStoreCustomFields[]> => {
  const url = `SbStoreCustomField/list`;

  const response = await CallAPI_v2<_SbStoreCustomFields[]>({
    name: {
      service: 'storeBuilder',
      api: 'FetchSbStoreAdditionalCustomFields',
    },
    request: {
      url: url,
      method: 'POST',
      data: payload,
    },
  });

  return response;
};

interface _SbStoreOrderTax_Payload {
  storeId: 0;
  customerId: 0;
  zipCode: 'string';
  avaTaxAppName: 'string';
  avaTaxUserName: 'string';
  avaTaxPassword: 'string';
  avaTaxVersion: 'string';
  avaTaxIsSandBox: true;
}

export const FetchSbStoreOrderTax = async (
  payload: _SbStoreOrderTax_Payload,
): Promise<null | unknown> => {
  const url = `SbStoreFixedFees/GetOrderTax.json`;

  const response = await CallAPI_v2<unknown>({
    name: {
      service: 'storeBuilder',
      api: 'FetchSbStoreOrderTax',
    },
    request: {
      url: url,
      method: 'POST',
      data: payload,
    },
  });

  return response;
};

interface _SbStoreAdditionalCustomFieldsValue_Paylaod {
  sbStoreShoppingCartCustom: {
    id: number;
    rowVersion: string;
    location: string;
    ipAddress: string;
    macAddress: string;
    shoppingCartId: number;
    name: string;
    type: string;
    isRequired: boolean;
    value: string;
    storeId: number;
    recStatus: string;
  }[];
}

export const SaveSbStoreAdditionalCustomFieldsValue = async (
  payload: _SbStoreAdditionalCustomFieldsValue_Paylaod,
): Promise<null | unknown> => {
  const url =
    'SbStoreShoppingCartCustomFieldValue/CreateSbStoreShoppingCartCustomFieldValue';

  const response = await CallAPI_v2<unknown>({
    name: {
      service: 'storeBuilder',
      api: 'SaveSbStoreAdditionalCustomFieldsValue',
    },
    request: {
      url: url,
      method: 'POST',
      data: payload,
    },
  });

  return response;
};

export interface _SbStorePlayerInformation {
  id: number;
  name: null;
  poNumber: string;
  collectBillingInfo: string;
  hidePrices: null;
  collectPlayerName: boolean;
  customPlayername: null;
  paymentMethod: number;
  shippingCharges: number;
  storeId: number;
  modifiedDate: Date;
  createdDate: Date;
  createdBy: number;
  modifiedBy: number;
  location: string;
  ipAddress: string;
  macAddress: string;
  rowVersion: string;
  recStatus: string;
  playerFirstName: string;
  playerLastName: string;
  playerNo: string;
}

export const FetchSbStorePlayerInformation = async (
  storeId: number,
): Promise<_SbStorePlayerInformation | null> => {
  const url = `StorePaymentInformation/GetPaymentInformationByStore/${storeId}.json`;

  const response = await CallAPI_v2<_SbStorePlayerInformation>({
    name: {
      service: 'storeBuilder',
      api: 'FetchSbStorePlayerInformation',
    },
    request: {
      url: url,
      method: 'GET',
    },
  });

  return response;
};

//

interface _SbStoreSavePlayerInformation_Payload {
  sbStorePlayerDetails: {
    id: number;
    rowVersion: string;
    location: string;
    ipAddress: string;
    macAddress: string;
    shoppingCartId: number;
    firstName: string;
    lastName: string;
    playerNo: number;
    recStatus: string;
  };
}

export const SaveSbStorePlayerInformation = async (
  paylod: _SbStoreSavePlayerInformation_Payload,
): Promise<unknown | null> => {
  const url = `SbStorePlayerDetails/CreateSbPlayerDetails`;

  const response = await CallAPI_v2<unknown>({
    name: {
      service: 'storeBuilder',
      api: 'SaveSbStorePlayerInformation',
    },
    request: {
      url: url,
      method: 'POST',
      data: paylod,
    },
  });

  return response;
};

export interface _SbProductAdditionalPrices {
  productId: number;
  name: string;
  amount: number;
  description: string;
  hideForCustomer: boolean;
  fundRaising: boolean;
  storeId: number;
  recStatus: 'A';
  id: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
}

export const FetchSbStoreProductAdditionalPrices = async (paylod: {
  storeId: number;
  productId: number;
}): Promise<_SbProductAdditionalPrices[] | null> => {
  const url = `SbStoreProductAdditionPrice/GetByProductAndStoreId.json`;

  const response = await CallAPI_v2<_SbProductAdditionalPrices[]>({
    name: {
      service: 'storeBuilder',
      api: 'FetchSbStoreCartProductAdditionalPrices',
    },
    request: {
      url: url,
      method: 'POST',
      data: paylod,
    },
  });

  return response;
};

export interface _SbProductCustomField {
  id: number;
  productId: number;
  storeId: number;
  name: string;
  customizationCharges: number;
  type: null;
  isRequired: boolean;
  recStatus: string;
  isExclusive: boolean;
  isChargePerCharacter: boolean;
  createdDate: Date;
  createdBy: number;
  modifiedDate: null;
  modifiedBy: null;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
}

export const FetchSbStoreProductCustomFields = async (paylod: {
  productId: number;
}): Promise<_SbProductCustomField[] | null> => {
  const url = `StoreProductCustomField/list.json`;

  const response = await CallAPI_v2<_SbProductCustomField[]>({
    name: {
      service: 'storeBuilder',
      api: 'FetchSbStoreProductCustomFields',
    },
    request: {
      url: url,
      method: 'POST',
      data: paylod,
    },
  });

  return response;
};

interface _SbStoreCartCustomFieldValues_Payload {
  shoppingCartItemsCustomFieldModel: {
    id: number;
    rowVersion: string;
    location: string;
    ipAddress: string;
    macAddress: string;
    shoppingCartItemsId: number;
    storeProductCustomFieldName: string;
    storeProductCustomFieldValue: string;
    customizationCharges: number;
    isRequired: boolean;
    isExclusive: boolean;
    isChargePerCharacter: boolean;
    productId: number;
  }[];
}

export const SaveSbStreCartProductCustomFieldValues = async (
  payload: _SbStoreCartCustomFieldValues_Payload,
): Promise<number | string | null> => {
  const url = `/ShoppingCartItemsCustomField/addcustomfiledvalues.json`;

  const response = await CallAPI_v2<number | string>({
    name: {
      service: 'storeBuilder',
      api: 'SaveSbStoreCartProductCustomFieldValues',
    },
    request: {
      url: url,
      method: 'POST',
      data: payload,
    },
  });

  return response;
};

export const FetchSbStoreCartDetails = async (
  customerId: number,
): Promise<_CartItem[] | null> => {
  const url = `Store/GetShoppingCartItemsDetail/${customerId}/false.json`;

  const response = await CallAPI_v2<_CartItem[] | null>({
    name: {
      service: 'storeBuilder',
      api: 'SaveSbStoreCartProductCustomFieldValues',
    },
    request: {
      url,
      method: 'GET',
    },
  });

  return response;
};

export const DeleteSbStoreCartProductDetails = async (payload: {
  shoppingCartItemsId: number;
}): Promise<boolean> => {
  const url = `ShoppingCartItemsCustomField/deletecustomfiledvalues.json`;

  const response = await CallAPI_v2<boolean>({
    name: {
      service: 'storeBuilder',
      api: 'DeleteSbStoreCartProductDetails',
    },
    request: {
      url,
      method: 'POST',
      data: payload,
    },
  });

  if (!response) return false;

  return response;
};
