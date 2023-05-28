import { StoreLayout } from '@constants/enum';
import { PageResponseType } from '@definations/app.type';
import { _StoreReturnType } from '@definations/store.type';
import { createSlice } from '@reduxjs/toolkit';
import { SetPageType } from '../asyncActions/redefineStore.async';

// Define a type for the slice state
export interface _RedesignStore {
  id: number;
  currency: '$';
  storeTypeId: number | null;
  storeName: string | null;
  companyName: string;
  code: string;
  pageType: PageResponseType;
  view: 'DESKTOP' | 'MOBILE';
  isAttributeSaparateProduct: boolean;
  cartCharges: null | {
    isSmallRun: boolean;
    smallRunLimit: number;
    smallRunFeesCharges: number;
    isLogoSetupCharges: boolean;
    logoSetupCharges: number;
  };
  logoAlt: string | null;
  favIcon: string | null;
  logoUrl: string | null;
  isSewOutEnable: boolean;
  sewOutCharges: number;
  mediaBaseUrl: string;
  imageFolderPath: string;
  shippingChargeType: number;
  firstLineCharges: number;
  secondLineCharges: number;
  email_address: string;
  phone_number: string;
  company_address: string;
  thirdPartyLogin: boolean;
  bothLogin: boolean;
  isLinepersonalization: boolean;
  currentPage: 'CHECKOUT' | 'BRANDS' | 'STORIES' | null;
}

// Define the initial state using that type
const initialState: _RedesignStore = {
  id: 0,
  currency: '$',
  isAttributeSaparateProduct: false,
  storeTypeId: StoreLayout.StoreBuilderStore,
  storeName: '',
  code: '',
  companyName: '',
  pageType: {} as PageResponseType,
  view: 'DESKTOP',
  cartCharges: null,
  logoAlt: null,
  logoUrl: null,
  isSewOutEnable: false,
  favIcon: '',
  sewOutCharges: 0,
  mediaBaseUrl: '',
  imageFolderPath: '',
  shippingChargeType: 0,
  firstLineCharges: 0,
  secondLineCharges: 0,
  email_address: '',
  phone_number: '',
  company_address: '',
  thirdPartyLogin: false,
  bothLogin: false,
  isLinepersonalization: false,
  currentPage: null,
};

export const storeSlice = createSlice({
  name: 'redesignStore',
  initialState,
  reducers: {
    store_storeDetails: (
      state,
      action: {
        payload: {
          store: _StoreReturnType;
        };
      },
    ) => {
      const store = action.payload.store;

      //--------------------------------------------------------
      state.id = store.storeId || 0;
      state.isAttributeSaparateProduct = store.isAttributeSaparateProduct;
      state.cartCharges = store.cartCharges;
      state.storeTypeId = store.storeTypeId;
      state.code = store.code;
      state.storeName = store.storeName;
      state.sewOutCharges = store.sewOutCharges;
      state.isSewOutEnable = store.isSewOutEnable;
      state.mediaBaseUrl = store.mediaBaseUrl;
      state.imageFolderPath = store.imageFolderPath;
      state.firstLineCharges = store.firstLineCharges;
      state.secondLineCharges = store.secondLineCharges;
      state.email_address = store.email_address;
      state.phone_number = store.phone_number;
      state.company_address = store.company_address;
      state.bothLogin = store.bothLogin;
      state.logoUrl = store.urls.logo;
      state.favIcon = store.urls.favicon;
      state.thirdPartyLogin = store.thirdPartyLogin;
      state.shippingChargeType = store.shippingChargeType;
      state.isLinepersonalization = store.isLinepersonalization;
    },

    store_setAppView: (
      state,
      action: {
        payload: 'DESKTOP' | 'MOBILE';
      },
    ) => {
      state.view = action.payload;
    },

    updatePageType: (state, { payload }) => {
      state.pageType = payload;
    },

    store_CurrentPage: (
      state,
      { payload }: { payload: null | 'CHECKOUT' | 'BRANDS' | 'STORIES' },
    ) => {
      state.currentPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(SetPageType.fulfilled, (state, action) => {
      state.pageType = action.payload.payload;
    });
  },
});

export const redefineStoreActions = storeSlice.actions;

export default storeSlice.reducer;
