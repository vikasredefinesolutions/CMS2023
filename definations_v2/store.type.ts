export interface _StoreReturnType {
  storeId: null | number;
  pageType: string;
  storeTypeId: null | number;
  logoUrl: string;
  code: string;
  storeName: string | null;
  isAttributeSaparateProduct: boolean;
  cartCharges: null | {
    isSmallRun: boolean;
    smallRunLimit: number;
    smallRunFeesCharges: number;
    isLogoSetupCharges: boolean;
    logoSetupCharges: number;
  };
  urls: {
    logo: string;
    favicon: string;
  };
  mediaBaseUrl: string;
  sewOutCharges: number;
  firstLineCharges: number;
  secondLineCharges: number;
  imageFolderPath: string;
  isSewOutEnable: boolean;
  shippingChargeType: number;
  email_address: string;
  phone_number: string;
  company_address: string;
  thirdPartyLogin: boolean;
  bothLogin: boolean;
  isLinepersonalization: boolean;
  firstLogoCharge: number;
  secondLogoCharge: number;
  storeXPaymetnOptionListViewModels:
    | { paymentOptionId: number; paymentOptionName: string }[]
    | [];
}

export interface _FetchStoreConfigurations {
  id: number;
  status: string;
  store_id: number;
  config_name: string;
  created_at: null | string;
  updated_at: null | string;
  config_value: null | string;
  klaviyoKey: null | string;
}
export type StoreConfigurationConfigs =
  | 'footer'
  | 'customScript'
  | 'customHomeScript'
  | 'customGlobalBodyScript'
  | 'header_config'
  | 'googleTags'
  | 'productListing'
  | 'contactInfo'
  | 'productDetail'
  | 'contactinfo';

export interface _SbStoreConfiguration {
  id: number;
  storeId: number;
  organizationId: number;
  sportId: number;
  salesPersonId: number;
  salesCode: string;
  directAccessURL: string;
  estimateShipDate: string;
  workOrder: null;
  message: null;
  messageTypeId: number;
  openStoreOn: string;
  closeStoreOn: string;
  userTerms: string;
  coachemail: null;
  serviceEmailId: number;
  serviceEmailSalesPersonId: number;
  servicePhoneId: number;
  servicePhoneSalesPersonId: number;
  tcFees: number;
  cardProcessFees: number;
  fundRaisingShare: number;
  isCoach: number;
  firstName: string;
  lastName: string;
  company: null;
  address1: string;
  address2: null;
  city: string;
  state: string;
  suite: string;
  zipCode: string;
  country: number;
  countryName: string;
  phone: string;
  fax: string;
  email: string;
  shipFirstName: string;
  shipLastName: string;
  shipCompany: null;
  shipAddress1: string;
  shipAddress2: null;
  shipCity: string;
  shipState: string;
  shipSuite: string;
  shipZipcode: string;
  shipCountry: number;
  shipCountryName: string;
  shipPhone: string;
  shipFax: null;
  shipEmail: null;
  shipSameasBilling: boolean;
  navCustomerId: string;
  studentShipOption: number;
  studentShipFirstname: string;
  studentShipLastname: string;
  studentShipcompany: string;
  studentShipAddress1: string;
  studentShipAddress2: string;
  studentShipCity: string;
  studentShipState: string;
  studentShipSuite: string;
  studentShipZipcode: string;
  studentShipCountry: number;
  studentShipCountryName: null | string;
  studentShipPhone: string;
  studentshipfax: string;
  studentShipEmail: string;
  navLocationCode: string;
  followUpdate: string;
  teamName: null;
  payBusinessMethodId: 2 | 6;
  payBusinessMethod: 'individual_cards' | 'bulk_payment' | 'both';
  payBusinessMethodDeliveryOptions:
    | 'both'
    | 'individual_addresses'
    | 'one_address';
  isLogo: boolean;
  isCategoryMenu: boolean;
  isStoreName: boolean;
  shippingMethod: null;
  shippingCharge: number;
  shippingMethodId: number;
  isTimer: boolean;
  logoUrl: string;
  recStatus: null;
  createdDate: null;
  createdBy: null;
  modifiedDate: null;
  modifiedBy: null;
  rowVersion: null;
  location: null;
  ipAddress: null;
  macAddress: null;
  isDisplayTimer: boolean;
  storeDisplayName: string;
  storeOwnerFirstName: string;
  storeOwnerLastName: string;
  designation: null;
  departMent: null;
  storeOwnerCompany: string;
  storeOwnerEmailID: string;
  storeStreetAddress: string;
  storeOwnerAPISuite: string;
  storeOwnerAPIZipCode: string;
  storeOwnerCity: string;
  storeOwnerStateName: string;
  storeOwnerCountryName: string;
  storeOwnerPhoneNo: string;
  isDisplayFeesInformation: boolean;
  storeLogoPath: string;
  domainTypeId: number;
  shipToMyAddress: boolean;
  isDisplayHome: boolean;
  isLeftNavigation: boolean;
}

// export interface _SbStoreConfiguration {
//   id: number | null;
//   storeId: number | null;
//   organizationId: number | null;
//   sportId: number | null;
//   salesPersonId: number | null;
//   salesCode: string;
//   directAccessURL: string;
//   estimateShipDate: string;
//   workOrder: null;
//   message: null;
//   isLogo: boolean;
//   messageTypeId: number;
//   openStoreOn: string;
//   closeStoreOn: string;
//   serviceEmailId: number;
//   serviceEmailSalesPersonId: number;
//   servicePhoneId: number;
//   servicePhoneSalesPersonId: number;
//   logoUrl: string;
//   recStatus: null;
//   createdDate: null;
//   createdBy: null;
//   modifiedDate: null;
//   modifiedBy: null;
//   rowVersion: null;
//   location: null;
//   ipAddress: null;
//   macAddress: null;
// }
