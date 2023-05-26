import { DisplayLineAttributeOption } from '@services/cart';

export type UserCreateResponse = {
  data: UserType;
  errors: Object;
  otherData: null;
  status: boolean;
};

export interface _Valid {
  credentials: 'VALID';
  id: string;
}
export interface _Invalid {
  credentials: 'INVALID';
  message: string;
}

export interface CustomerAddress {
  id: number;
  customerId: number;
  firstname: string;
  lastName: string;
  email: string;
  address1: string;
  address2: string;
  suite: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  fax: string;
  countryName: string;
  countryCode: string;
  addressType: string;
  isDefault: boolean;
  recStatus: string;
  createdDate?: any;
  createdBy?: any;
  modifiedDate?: any;
  modifiedBy?: any;
  rowVersion: string;
  location?: any;
  ipAddress?: any;
  macAddress?: any;
  companyName?: string;
  CompanyName: string;
}

export interface UserType {
  birthDate: string;
  name: string;
  storeName: string;
  gender: string;
  createdByName?: any;
  modifiedByName?: any;
  companyName: string;
  customerAddress: CustomerAddress[];
  id: number;
  firstname: string;
  lastName: string;
  email: string;
  password: string;
  companyId: number;
  tierId: number;
  isRegistered: number;
  storeId: number;
  sharedCustomerId: number;
  isLocked: boolean;
  navCustomerId: string;
  isSuperuser: boolean;
  customerType?: any;
  isTaxableuser: boolean;
  industryId: number;
  recStatus: string;
  createdDate: Date;
  createdBy: number;
  modifiedDate?: any;
  modifiedBy?: any;
  rowVersion: string;
  location: string;
  ipAddress: string;
  customerRoleId: number;
  macAddress: string;
  isCustomerPersonalization: null | boolean;
}

export interface EmployeeType {
  firstname: string;
  lastName: string;
  email: string;
}

export interface _MyAcc_OrderBillingDetails {
  id: number;
  storeID: number;
  orderGUID: null;
  isNew: boolean;
  shoppingCartID: number;
  customerID: number;
  firstName: string;
  lastName: string;
  email: string;
  notes: string;
  giftPackNote: null;
  billingEqualsShipping: boolean;
  billingEmail: string;
  billingFirstName: string;
  billingLastName: string;
  billingCompany: string;
  billingAddress1: string;
  billingAddress2: string;
  billingSuite: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  billingCountry: string;
  billingPhone: string;
  shippingEmail: string;
  shippingFirstName: string;
  shippingLastName: string;
  shippingCompany: string;
  shippingAddress1: string;
  shippingAddress2: string;
  shippingSuite: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingCountry: string;
  shippingPhone: string;
  shippingMethod: string;
  okToEmail: boolean;
  cardName: string;
  cardType: string;
  cardNumber: string;
  cardVarificationCode: string;
  cardExpirationMonth: string;
  cardExpirationYear: string;
  couponCode: string;
  couponDiscountAmount: number;
  giftCertiSerialNumber: string;
  giftCertificateDiscountAmount: number;
  quantityDiscountAmount: number;
  levelDiscountPercent: number;
  levelDiscountAmount: number;
  customDiscount: number;
  orderSubtotal: number;
  orderTax: number;
  orderShippingCosts: number;
  orderTotal: number;
  authorizationCode: string;
  authorizationResult: string;
  authorizationPNREF: string;
  transactionCommand: string;
  lastIPAddress: string;
  paymentGateway: string;
  paymentMethod: string;
  shippingTrackingNumber: null;
  shippedVIA: null;
  orderStatus: string;
  transactionStatus: string;
  avsResult: string;
  cvc2Response: null;
  captureTxCommand: string;
  captureTXResult: string;
  voidTXCommand: null;
  voidTXResult: null;
  refundTXCommand: null;
  refundTXResult: null;
  refundReason: null;
  cartType: null;
  last4: null;
  authorizedOn: Date;
  capturedOn: Date;
  refundedOn: Date;
  voidedOn: Date;
  fraudedOn: Date;
  shippedOn: Date;
  orderDate: Date;
  deleted: boolean;
  referralLink: null;
  referrer: string;
  refundedAmount: number;
  chargeAmount: number;
  authorizedAmount: number;
  adjustmentAmount: number;
  adjustmentCapturedOn: Date;
  orderNotes: string;
  isGiftWrap: boolean;
  giftWrapAmt: number;
  salesRepName: null;
  inventoryWasReduced: boolean;
  refOrderID: string;
  isPrinted: boolean;
  isMobileOrder: boolean;
  isPhoneOrder: boolean;
  batchId: number;
  shippingLabelMethod: null;
  shippingLabelFileName: null;
  shippingLabelCost: number;
  shippingLabelWeight1: number;
  shippingLabelPackageHeight: number;
  shippingLabelPackageWidth: number;
  shippingLabelPackageLength: number;
  noOfLabels: number;
  cashReceived: number;
  cashChangedReturned: number;
  bankName: null;
  chequeNumber: null;
  chequeDate: Date;
  ccReceiptNo: null;
  salesAgentId: number;
  posOrderNumber: number;
  isPrintedSlip: boolean;
  isApproved: boolean;
  receiptNumber: null;
  dimensionValue: number;
  shippingDimension: null;
  giftWrapPrice: number;
  shipPromotionDiscount: number;
  serialNumber: null;
  isFullFillment: boolean;
  internalNotes: null;
  returnedStock: number;
  returnedFee: number;
  customerType: null;
  isAmazonuplaod: boolean;
  shippingLabelWeightNew: number;
  shippingLabelWeight: number;
  cvvResult: string;
  isMailSend: boolean;
  shippedByStamps: boolean;
  logoFinalTotal: number;
  lineFinalTotal: number;
  isExport: boolean;
  isFreight: boolean;
  inHandDate: Date;
  storeCredit: number;
  chargeHostedPaymentID: string;
  chargeConfirmationID: null;
  chargeToken: null;
  sewout: boolean;
  sewoutTotal: number;
  digitalTotal: number;
  brandStoreID: number;
  orderSubType: null;
  empSourceName: string;
  empSourceMedium: string;
  gclid: string;
  isPayLater: boolean;
  orderCheckoutNote: string;
  empSalesRap: string;
  employeeID: number;
  recStatus: null;
  createdDate: Date;
  createdBy: number;
  modifiedDate: Date;
  modifiedBy: number;
  rowVersion: string;
  location: null;
  ipAddress: null;
  macAddress: null;
  orderLogoSetupFee: number;
  orderSmallRunFee: number;
}

export interface _MyAcc_OrderProductDetails {
  colorImage: string;
  productName: string;
  productId: number;
  sku: string;
  attributeOptionId: string;
  attributeOptionValue: string;
  shoppingCartItemsId: number;
  shoppingCartItemDetailsViewModels: ShoppingCartItemDetailsViewModel[];
  shoppingCartLogoPersonViewModels: ShoppingCartLogoPersonViewModel[];
  shoppingCartLinePersonViewModel: any[];
  totalQty: number;
  totalPrice: number;
  txtcode: null;
  seName: null | string;
  logoTotalPrice: number;
  lineTotalPrice: number;
  productTotal: number;
  itemNote: string | null;
  isBrandPersonalization: boolean;
  displayLineAttributeOptions: DisplayLineAttributeOption[];
}

export interface ShoppingCartItemDetailsViewModel {
  attributeOptionId: number;
  attributeOptionValue: string;
  qty: number;
  price: number;
  id: number;
}

export interface ShoppingCartLogoPersonViewModel {
  id: number;
  cartLogoPersonDetailId: number;
  logoImagePath: string;
  logoPrice: number;
  logoLocation: string;
  logoPositionImage: string;
  sku: null;
  size: null;
  name: string;
  qty: number;
  isSewOut: boolean;
  sewOutAmount: number;
  logoName: 'Customize Logo' | 'Add Logo Later' | 'Customize Later';
}

export interface _UpdatePasswordForGuestEmail {
  id: number;
  firstname: string;
  lastName: string;
  email: string;
  password: string;
  companyId: number;
  tierId: number;
  isRegistered: number;
  storeId: number;
  sharedCustomerId: number;
  isLocked: boolean;
  navCustomerId: string;
  isSuperuser: boolean;
  customerType: string;
  isTaxableuser: boolean;
  industryId: number;
  customerRoleId: number;
  birthDate: null;
  gender: null;
  isForceAdminForResetPassword: boolean;
  resetPasswordRequestDate: null;
  resetPasswordChangedDate: null;
  forgotPasswordResetToken: string;
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

export interface _ForgetCustomerPassword {
  email: string;
  storeId: number;
}
export interface _ForgetCustomerPassword_Res {
  issend: boolean;
}

export interface _GetAdminCustomerUser {
  name: string;
  customerRoleName: string;
  storeName: string;
  createdByName: string;
  modifiedByName: string;
  companyName: string;
  customerAddress: CustomerAddress[];
  id: number;
  firstname: string;
  lastName: string;
  email: string;
  password: string;
  jobTitle: null;
  companyId: number;
  tierId: number;
  isRegistered: number;
  storeId: number;
  sharedCustomerId: number;
  isLocked: boolean;
  navCustomerId: string;
  isSuperuser: boolean;
  customerType: null;
  isTaxableuser: boolean;
  industryId: number;
  customerRoleId: number;
  birthDate: null;
  gender: string;
  isForceAdminForResetPassword: boolean;
  resetPasswordRequestDate: null;
  resetPasswordChangedDate: null;
  forgotPasswordResetToken: null;
  klaviyoProfileId: null;
  isUseNet: boolean;
  recStatus: string;
  createdDate: string;
  createdBy: number;
  modifiedDate: string;
  modifiedBy: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
}

export interface _GetCityStateCountryWithZip {
  countryId: number;
  countryName: string;
  stateId: number;
  stateName: string;
  cityId: number;
  cityName: string;
  zipCode: string;
}
