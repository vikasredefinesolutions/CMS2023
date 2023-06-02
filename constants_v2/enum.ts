/* eslint-disable no-unused-vars */
export enum logoLocation {
  customizeLogo = 'Customize Logo',
  addLogoLater = 'Add Logo Later',
  logoSubmitted = 'LOGO SUBMITTED',
  submitted = 'submitted',
  submitLater = 'WILL SUBMIT LATER',
  addLater = 'Add Logo Later',
  customizeLater = 'Customize Later',
}

export enum checkoutPages {
  login,
  createAccount,
  password,
  address,
  reviewOrder,
}

export enum StoreLayout {
  CorporateStore = 1,
  EcommerceStore = 2,
  StoreBuilderStore = 3,
}

export enum PaymentMethod {
  STORECREDIT = 'STORECREDIT',
  CHARGELOGIC = 'CHARGELOGIC',
  CREDITCARD = 'CREDITCARD',
  PREPAYMENT = 'PREPAYMENT',
  PAYMENTPENDING = 'PAYMENTPENDING',
}

export enum paymentMethodCustom {
  creditCard,
  purchaseOrder,
  creditWallet = 'Credit',
  netNumber = 'Net',
}

export enum UserAddressType {
  BILLINGADDRESS = 'B',
  SHIPPINGADDRESS = 'S',
  OTHERUSERADDRESS = 'F',
}

export enum CheckoutType {
  corporate = 'CG',
  pkhealthgear = 'PKHG',
  driving = 'DI',
}

export enum Sorting {
  Ascending = 2,
  Descending = 3,
  AtoZ = 4,
  ZtoA = 5,
}

export const dimax = 250;
