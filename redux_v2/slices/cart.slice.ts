import { fetchCartDetails } from '@redux/asyncActions/cart.async';
import { createSlice } from '@reduxjs/toolkit';
import { CartList } from '@services/cart';
import { _Cart_userUpdate_Action } from './_slices';
import { AvailableLocationDetails, LogoDetails } from './cart';

export interface _Cart_Initials {
  email: string;
  guestId: number;
  isGuestCustomer: boolean;
  showThankYou: boolean;
  isCustomerExist: boolean;
  cart: CartList | null;
  cartQty: number;
  userCreditBalance: {
    useBalance: boolean;
    allowedBalance: number;
  };
  discount: {
    coupon: string;
    amount: number;
    percentage: number;
    showTextFor3Sec: boolean;
  } | null;
  logos: {
    details: LogoDetails[] | null;
    allowNextLogo: boolean;
    availableOptions: AvailableLocationDetails[] | null;
  };
  lastUpdate: number;
  isCartLoading: boolean;
}

const initialState: _Cart_Initials = {
  isCustomerExist: false,
  cart: null,
  cartQty: 0,
  userCreditBalance: {
    useBalance: false,
    allowedBalance: 0,
  },
  guestId: 0,
  discount: null,
  logos: {
    details: null,
    allowNextLogo: false,
    availableOptions: null,
  },
  email: '',
  isGuestCustomer: false,
  showThankYou: false,
  lastUpdate: 0,
  isCartLoading: true,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cart_userUpdate: (state, { payload }: _Cart_userUpdate_Action) => {
      if (payload.type === 'noMoreAGuest') {
        state.isGuestCustomer = payload.data.isGuestCustomer;
      }

      if (payload.type === 'guestLogin') {
        state.isCustomerExist = payload.data.isCustomerExist;
        state.guestId = payload.data.guestId;
        state.email = payload.data.email;
        state.showThankYou = payload.data.showThankYou;
        state.isGuestCustomer = payload.data.isGuestCustomer;
      }
    },
    cart_promoCode: (
      state,
      {
        payload,
      }: {
        payload:
          | 'HIDE_TEXT'
          | 'REMOVE_PROMO_CODE'
          | {
              coupon: string;
              amount: number;
              percentage: number;
              showTextFor3Sec: boolean;
            };
      },
    ) => {
      if (payload === 'HIDE_TEXT') {
        state.discount!.showTextFor3Sec = false;
        return;
      }

      if (payload === 'REMOVE_PROMO_CODE') {
        state.discount = null;
        return;
      }

      state.discount = payload;
    },
    updateSomLogo: (
      state,
      action: {
        payload: {
          details: LogoDetails[] | null;
          allowNextLogo: boolean;
          availableOptions: AvailableLocationDetails[];
        };
      },
    ) => {
      state.logos.details = action.payload.details;
      state.logos.allowNextLogo = action.payload.allowNextLogo;
      state.logos.availableOptions = action.payload.availableOptions;
    },
    logoutClearCart: (state) => {
      state.isCartLoading = true;
      state.cart = null;
      state.guestId = 0;
      state.email = '';
      state.isCustomerExist = false;
      state.showThankYou = false;
      state.isGuestCustomer = false;
      state.discount = null;
      state.cartQty = 0;
    },
    customerCreditBalanceUpdate: (state, { payload }) => {
      state.userCreditBalance = payload;
    },
    cart_PageClosed: (state) => {
      state.lastUpdate = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartDetails.fulfilled, (state, { payload }) => {
      state.isCartLoading = false;
      state.lastUpdate = new Date().getTime();
      if (payload && payload.length > 0) {
        state.cart = payload;
        state.cartQty = payload.length;
      } else {
        state.cart = [];
        state.cartQty = 0;
      }
    });
    builder.addCase(fetchCartDetails.pending, (state) => {
      state.isCartLoading = true;
    });
    builder.addCase(fetchCartDetails.rejected, (state) => {
      state.isCartLoading = false;
    });
  },
});

export const CartActions = cartSlice.actions;

export default cartSlice.reducer;
