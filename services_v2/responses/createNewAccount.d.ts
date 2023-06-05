export interface _CreateAccRes {
  success: boolean;
  data: _AccCreated | false;
  errors: Errors;
  otherData: null;
}

export interface _AccCreated_without {
  errors: any;
  data: null;
  item1: {
    id: number;
    email: string;
    password: string;
    confirmPassword: string;
    storeId: number | string;
    recStatus: string;
  };
  item2: string;
}
export interface _AccCreated {
  item1: {
    firstname: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: null;
    companyName: string;
    jobTitle: string;
    companyId: number;
    tierId: number;
    isRegistered: false;
    sharedCustomerId: number;
    isLocked: false;
    navCustomerId: string;
    isSuperuser: false;
    customerType: string;
    storeId: number;
    isTaxableuser: false;
    storeCustomerAddress: StoreCustomerAddress[];
    recStatus: string;
    createdDate: string;
    createdBy: number;
    modifiedDate: null;
    modifiedBy: null;
    industryId: number;
    gender: string;
    memberFrom: number;
    memberTo: number;
    organizationId: number;
    primaryColor: string;
    mascotId: string;
    teamGender: string;
    timeOfYearPurchase: string;
    position: string;
    birthDate: null;
    organizationName: string;
    primarySport: number;
    id: number;
    rowVersion: string;
    location: string;
    ipAddress: string;
    macAddress: string;
  };
  item2: string;
}

export interface StoreCustomerAddress {
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
  createdDate: Date;
  createdBy: number;
  modifiedDate: null;
  modifiedBy: null;
  id: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
}

export interface Errors {
  'storeCustomerModel.Email': string;
  'storeCustomerModel.StoreId': string;
  'storeCustomerModel.RecStatus': string;
  'storeCustomerModel.StoreCustomerAddress[0].AddressType': string;
  'storeCustomerModel.StoreCustomerAddress[0].CountryCode': string;
}
