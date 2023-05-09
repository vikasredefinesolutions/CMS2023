import { commonMessage } from './successError.text';

/* eslint-disable no-unused-vars */
export const __Login = {
  something_went_wrong: commonMessage.somethingWentWrong,
};

export enum __Cookie {
  loggedIn = 'loggedIn',
  userId = 'userId',
  storeInfo = 'storeInfo',
  tempCustomerId = 'tempCustomerId',
  empData = 'emp_data',
  companyId = 'companyId',
  customScripts = 'customScripts',
  googleTags = 'googleTags',
}

// cookie_expiry in days
export const __Cookie_Expiry = {
  userId: 2,
  storeBuilder: {
    tempCustomerId: 7,
  },
  Session: 'Session',
};

export enum __Error {
  storeIdMissing = 'STORE_ID is missing',
  noPageTypeFound = 'PageType is missing',
}

export const __LocalStorage = {
  recetlyViewedProducts: '_rcvwp',
  compareProducts: '_cmpPdts',
  tempCustomerId: 'tempCustomerId',
};

export const __Params = {
  giftId: 'giftId',
};

export const __UserMessages = {
  signUpPage: {
    SomethingWentWrong: commonMessage.somethingWentWrong,
    SuccessFullyAccountCreated: 'Account Created Successfully!!!',
  },
};
export const perPageCount = 18;
export const maximumWordsForChestLogoPersonalization: number = 26;
export const maximumWordsForSleeveLogoPersonalization: number = 20;

export const employeeData = {
  secretPass: 'XkhZG4fW2t2W',
};

export const showcolors = 4;
export const listing_max_showcolors = 7;
export const zeroValue = 0;
export const fallbackStoreId = 1;
export const maximumItemsForFetch = 4;

export const CustomizeLater =
  'A Gear Expert will contact you to discuss the customization of this product.';

export const cartRemoveConfirmMessage = 'Are you sure want to remove?';
export const cartQuantityUpdateConfirmMessage =
  'Are you sure want to update the product quantity';

export enum __pageTypeConstant {
  blog = 'blog',
  stories = 'stories',
}
