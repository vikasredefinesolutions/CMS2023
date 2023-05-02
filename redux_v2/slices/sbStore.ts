import { _SbStoreConfiguration } from '@definations/store.type';
import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface _SbStore {
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
// Define the initial state using that type
const initialState: _SbStore = {
  id: null,
  storeId: null,
  organizationId: null,
  sportId: null,
  salesPersonId: null,
  salesCode: '',
  directAccessURL: '',
  estimateShipDate: '',
  workOrder: null,
  message: null,
  isLogo: true,
  messageTypeId: 0,
  openStoreOn: '',
  closeStoreOn: '',
  serviceEmailId: 0,
  serviceEmailSalesPersonId: 0,
  servicePhoneId: 0,
  servicePhoneSalesPersonId: 0,
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
      const sbStore = action.payload.sbStore;

      state.id = sbStore.id;
      state.storeId = sbStore.storeId;
      state.organizationId = sbStore.organizationId;
      state.sportId = sbStore.sportId;
      state.salesPersonId = sbStore.salesPersonId;
      state.salesCode = sbStore.salesCode;
      state.directAccessURL = sbStore.directAccessURL;
      state.estimateShipDate = sbStore.estimateShipDate;
      state.workOrder = sbStore.workOrder;
      state.message = sbStore.message;
      state.isLogo = sbStore.isLogo;
      state.messageTypeId = sbStore.messageTypeId;
      state.openStoreOn = sbStore.openStoreOn;
      state.closeStoreOn = sbStore.closeStoreOn;
      state.serviceEmailId = sbStore.serviceEmailId;
      state.serviceEmailSalesPersonId = sbStore.serviceEmailSalesPersonId;
      state.servicePhoneId = sbStore.servicePhoneId;
      state.servicePhoneSalesPersonId = sbStore.servicePhoneSalesPersonId;
      state.logoUrl = sbStore.logoUrl;
      state.recStatus = sbStore.recStatus;
      state.createdDate = sbStore.createdDate;
      state.createdBy = sbStore.createdBy;
      state.modifiedDate = sbStore.modifiedDate;
      state.modifiedBy = sbStore.modifiedBy;
      state.rowVersion = sbStore.rowVersion;
      state.location = sbStore.location;
      state.ipAddress = sbStore.ipAddress;
      state.macAddress = sbStore.macAddress;
    },
  },
});

export const sbStoreActions = sbStoreSlice.actions;

export default sbStoreSlice.reducer;
