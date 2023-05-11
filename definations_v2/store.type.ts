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
}

export interface _FetchStoreConfigurations {
  id: number;
  status: string;
  store_id: number;
  config_name: string;
  created_at: null | string;
  updated_at: null | string;
  config_value: null | string;
}
export type StoreConfigurationConfigs =
  | 'footer'
  | 'customScript'
  | 'customHomeScript'
  | 'customGlobalBodyScript'
  | 'header_config'
  | 'googleTags'
  | 'productListing'
  | 'contactInfo';

export interface _FetchSbStoreConfiguration {
  id: number | null;
  storeId: number | null;
  organizationId: number | null;
  sportId: number | null;
  salesPersonId: number | null;
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
  state: null;
  suite: string;
  zipCode: string;
  country: number;
  phone: string;
  fax: null;
  email: string;
  shipFirstName: string;
  shipLastName: string;
  shipCompany: null;
  shipAddress1: string;
  shipAddress2: null;
  shipCity: string;
  shipState: null;
  shipSuite: string;
  shipZipcode: string;
  shipCountry: number;
  shipPhone: string;
  shipFax: null;
  shipEmail: null;
  shipSameasBilling: boolean;
  navCustomerId: string;
  studentShipOption: number;
  studentShipFirstname: null;
  studentShipLastname: null;
  studentShipcompany: null;
  studentShipAddress1: null;
  studentShipAddress2: null;
  studentShipCity: null;
  studentShipState: null;
  studentShipSuite: null;
  studentShipZipcode: null;
  studentShipCountry: number;
  studentShipPhone: null;
  studentshipfax: null;
  studentShipEmail: null;
  navLocationCode: string;
  followUpdate: string;
  teamName: null;
  payBusinessMethodId: 2;
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
}

export interface _SbStoreConfiguration {
  id: number | null;
  storeId: number | null;
  organizationId: number | null;
  sportId: number | null;
  salesPersonId: number | null;
  salesCode: string;
  directAccessURL: string;
  estimateShipDate: string;
  workOrder: null;
  message: null;
  isLogo: boolean;
  messageTypeId: number;
  openStoreOn: string;
  closeStoreOn: string;
  serviceEmailId: number;
  serviceEmailSalesPersonId: number;
  servicePhoneId: number;
  servicePhoneSalesPersonId: number;
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
}
