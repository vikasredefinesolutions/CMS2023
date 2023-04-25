import { __domain, layoutToShow_fn } from '@configs/page.config';
import { StoreLayout } from '@constants/enum';
import { PageResponseType } from '@definations/app.type';
import { _StoreReturnType } from '@definations/store.type';
import { createSlice } from '@reduxjs/toolkit';
import { SetPageType } from '../asyncActions/redefineStore.async';

// Define a type for the slice state
export interface _RedesignStore {
  id: number;
  currency: '$';
  layout: null | string;
  storeTypeId: number | null;
  storeName: string | null;
  pathName: string;
  companyName: string;
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
  logoUrl: string | null;
  isSewOutEnable: boolean;
  sewOutCharges: number;
  mediaBaseUrl: string;
  imageFolderPath: string;
  shippingChargeType: number;
}

// Define the initial state using that type
const initialState: _RedesignStore = {
  id: 0,
  currency: '$',
  isAttributeSaparateProduct: false,
  layout: null,
  storeTypeId: StoreLayout.StoreBuilderStore,
  storeName: '',
  pathName: '',
  companyName: '',
  pageType: {} as PageResponseType,
  view: 'DESKTOP',
  cartCharges: null,
  logoAlt: null,
  logoUrl: null,
  isSewOutEnable: false,
  sewOutCharges: 0,
  mediaBaseUrl: '',
  imageFolderPath: '',
  shippingChargeType: 0,
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
      state.pathName = store.pathName;
      state.isAttributeSaparateProduct =
        action.payload.store.isAttributeSaparateProduct;
      state.layout = layoutToShow_fn({
        layout: action.payload.store.code,
        showProd: __domain.isSiteLive,
      });
      state.cartCharges = store.cartCharges;
      state.storeTypeId = store.storeTypeId;
      state.storeName = store.storeName;
      state.sewOutCharges = store.sewOutCharges;
      state.isSewOutEnable = store.isSewOutEnable;
      state.mediaBaseUrl = store.mediaBaseUrl;
      state.imageFolderPath = store.imageFolderPath;
    },

    change_Layout: (
      state,
      action: {
        payload: string;
      },
    ) => {
      state.layout = action.payload;
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
  },
  extraReducers: (builder) => {
    builder.addCase(SetPageType.fulfilled, (state, action) => {
      state.pageType = action.payload.payload;
    });
  },
});

export const redefineStoreActions = storeSlice.actions;

export default storeSlice.reducer;
