import { _SbStoreConfiguration } from '@definations/store.type';
import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state

// Define the initial state using that type
const initialState: {
  store: _SbStoreConfiguration;
  klaviyokey: string | null;
  messages: {
    checkOutMessage: string;
    orderSuccessMessage: string;
    headerMessage: string;
    checkoutTermsAndCondition: string;
  };
} = {
  store: {
    isLeftNavigation: false,
    id: 0,
    storeId: 0,
    organizationId: 0,
    sportId: 0,
    salesPersonId: 0,
    salesCode: '',
    directAccessURL: '',
    estimateShipDate: '',
    workOrder: null,
    message: null,
    isLogo: false,
    messageTypeId: 0,
    openStoreOn: '',
    closeStoreOn: '',
    userTerms: '',
    coachemail: null,
    serviceEmailId: 0,
    serviceEmailSalesPersonId: 0,
    servicePhoneId: 0,
    servicePhoneSalesPersonId: 0,
    tcFees: 0,
    cardProcessFees: 0,
    fundRaisingShare: 0,
    isCoach: 0,
    firstName: '',
    lastName: '',
    company: null,
    address1: '',
    address2: null,
    city: '',
    state: '',
    suite: '',
    zipCode: '',
    country: 0,
    countryName: '',
    phone: '',
    fax: '',
    email: '',
    shipFirstName: '',
    shipLastName: '',
    shipCompany: null,
    shipAddress1: '',
    shipAddress2: null,
    shipCity: '',
    shipState: '',
    shipSuite: '',
    shipZipcode: '',
    shipCountry: 1,
    shipCountryName: '',
    shipPhone: '',
    shipFax: null,
    shipEmail: null,
    shipSameasBilling: false,
    navCustomerId: '2',
    studentShipOption: 0,
    studentShipFirstname: '',
    studentShipLastname: '',
    studentShipcompany: '',
    studentShipAddress1: '',
    studentShipAddress2: '',
    studentShipCity: '',
    studentShipState: '',
    studentShipSuite: '',
    studentShipZipcode: '',
    studentShipCountry: 0,
    studentShipCountryName: null,
    studentShipPhone: '',
    studentshipfax: '',
    studentShipEmail: '',
    navLocationCode: '',
    followUpdate: '',
    teamName: null,
    payBusinessMethodId: 6,
    payBusinessMethod: 'both',
    payBusinessMethodDeliveryOptions: 'both',
    isCategoryMenu: false,
    isStoreName: false,
    shippingMethod: null,
    shippingCharge: 0,
    shippingMethodId: 0,
    isTimer: false,
    logoUrl: '',
    recStatus: null,
    createdDate: null,
    createdBy: null,
    modifiedDate: null,
    modifiedBy: null,
    rowVersion: null,
    location: null,
    ipAddress: null,
    macAddress: null,
    isDisplayTimer: false,
    storeDisplayName: '',
    storeOwnerFirstName: '',
    storeOwnerLastName: '',
    designation: null,
    departMent: null,
    storeOwnerCompany: '',
    storeOwnerEmailID: '',
    storeStreetAddress: '',
    storeOwnerAPISuite: '',
    storeOwnerAPIZipCode: '',
    storeOwnerCity: '',
    storeOwnerStateName: '',
    storeOwnerCountryName: '',
    storeOwnerPhoneNo: '',
    isDisplayFeesInformation: false,
    storeLogoPath: '',
    domainTypeId: 0,
    shipToMyAddress: true,
    isDisplayHome: true,
  },
  klaviyokey: '',
  messages: {
    checkOutMessage: '',
    orderSuccessMessage: '',
    headerMessage: '',
    checkoutTermsAndCondition: '',
  },
};

export const sbStoreSlice = createSlice({
  name: 'sbStore',
  initialState,
  reducers: {
    sbStore_sbStoreDetails: (
      state,
      action: {
        payload: {
          sbStore: _SbStoreConfiguration;
        };
      },
    ) => {
      state.store = {
        ...action.payload.sbStore,
      };
    },
    setKlaviyoKey: (
      state,
      action: { payload: { klaviyoKey: string | null } },
    ) => {
      state.klaviyokey = action.payload.klaviyoKey || null;
    },
    update_SbStoreMessages: (
      state,
      action: {
        payload: {
          checkOutMessage: string;
          orderSuccessMessage: string;
          headerMessage: string;
          checkoutTermsAndCondition: string;
        };
      },
    ) => {
      state.messages = action.payload;
    },
  },
});

export const sbStoreActions = sbStoreSlice.actions;

export default sbStoreSlice.reducer;
