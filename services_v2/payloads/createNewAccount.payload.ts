export interface _CreateNewAccount_Payload {
  storeCustomerModel: _CNA_StoreCustomerModel;
}

export interface _CreateNewAccount_Payload_without {
  storeCustomerGuestModel: {
    id: number;
    email: string;
    password: string;
    confirmPassword: string;
    storeId: number | string;
    recStatus: string;
  };
}

export interface _CNA_StoreCustomerModel {
  id: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
  firstname: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  companyName?: string;
  companyId: number;
  jobTitle: string; // not storing in DB.
  sharedCustomerId: number;
  customerType: string;
  storeId: number;
  isTaxableuser: boolean;
  storeCustomerAddress: _CNA_StoreCustomerAddress[];
  recStatus: string;
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
  navCustomerId: string;
  organizationName: string;
}

export interface _CNA_StoreCustomerAddress {
  id: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
  customerId: number;
  firstname: string;
  lastName: string;
  companyName?: string;
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
}

export const createNewAccount_payload: _CreateNewAccount_Payload = {
  storeCustomerModel: {
    id: 0,
    rowVersion: '',
    location: '',
    ipAddress: '192.168.1.1',
    macAddress: '00-00-00-00-00-00',
    firstname: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    jobTitle: '',
    companyId: 0,
    sharedCustomerId: 0,
    customerType: 'corporate',
    storeId: 0,
    isTaxableuser: false,
    memberFrom: 0,
    memberTo: 0,
    organizationId: 0,
    organizationName: '',
    primaryColor: '',
    mascotId: '',
    teamGender: '',
    timeOfYearPurchase: '',
    position: '',
    navCustomerId: '',
    storeCustomerAddress: [
      {
        id: 0,
        rowVersion: '',
        location: '',
        ipAddress: '',
        macAddress: '00-00-00-00-00-00',
        customerId: 0,
        firstname: '',
        lastName: '',
        companyName: '',
        email: '',
        address1: '',
        address2: '',
        suite: '',
        city: '',
        state: '',
        postalCode: '',
        phone: '',
        fax: '',
        countryName: 'United States',
        countryCode: '',
        addressType: '',
        isDefault: false,
        recStatus: 'A',
      },
    ],
    recStatus: 'A',
    industryId: 0,
    gender: '',
  },
};
