import { CustomerAddress } from '@definations/APIs/user.res';
import { createSlice } from '@reduxjs/toolkit';

interface _POPaymentMethod {
  method: 'bulk_payment';
  poNumber: string;
}

interface _CCPaymentMethod {
  method: 'individual_cards';
  ccDetails: {
    year: number;
    ccNumber: string;
    month: number;
    securityCode: string;
  };
}

export interface _Checkout_Initials {
  shippingAddress: CustomerAddress | null;
  billingAddress: CustomerAddress | null;
  editAddress: CustomerAddress | null;
  useShippingAddressForBilling: boolean;
  payment: {
    valid: boolean;
    details: null | _POPaymentMethod | _CCPaymentMethod;
  };

  el: {
    shippingPrice: number;
    allowPo: boolean;
    isPaymentPending: boolean;
    salesRep: {
      value: string;
      label: string;
    };
    source: {
      value: string;
      label: string;
    };
    sourceMedium: {
      value: string;
      label: string;
    };
  };
}

const initialState: _Checkout_Initials = {
  shippingAddress: null,
  billingAddress: null,
  editAddress: null,
  useShippingAddressForBilling: false,
  payment: {
    valid: false,
    details: null,
  },
  el: {
    shippingPrice: 0,
    allowPo: false,
    isPaymentPending: false,
    salesRep: {
      value: '',
      label: '',
    },
    source: {
      value: '',
      label: '',
    },
    sourceMedium: {
      value: '',
      label: '',
    },
  },
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    update_CheckoutProps: (
      state,
      {
        payload,
      }: {
        payload:
          | 'CLEAN_ALL'
          | {
              editAddress: CustomerAddress | 'CLEANUP';
            }
          | {
              shippingAddress: CustomerAddress | 'CLEANUP';
            }
          | {
              useShippingAddressForBilling: true | 'CLEANUP';
            }
          | {
              billingAddress: CustomerAddress | 'CLEANUP';
            };
      },
    ) => {
      if (payload === 'CLEAN_ALL') {
        state.editAddress = null;
        state.shippingAddress = null;
        state.billingAddress = null;
        state.useShippingAddressForBilling = false;
        return;
      }

      if ('editAddress' in payload) {
        if (payload.editAddress === 'CLEANUP') {
          state.editAddress = null;
          return;
        }

        state.editAddress = payload.editAddress;
        return;
      }
      if ('shippingAddress' in payload) {
        if (payload.shippingAddress === 'CLEANUP') {
          state.shippingAddress = null;
          return;
        }

        state.shippingAddress = payload.shippingAddress;
        return;
      }
      if ('billingAddress' in payload) {
        if (payload.billingAddress === 'CLEANUP') {
          state.billingAddress = null;
          return;
        }

        state.billingAddress = payload.billingAddress;
        state.useShippingAddressForBilling = false;
        return;
      }
      if ('useShippingAddressForBilling' in payload) {
        if (payload.useShippingAddressForBilling === 'CLEANUP') {
          state.useShippingAddressForBilling = false;
          return;
        }

        state.billingAddress = null;
        state.useShippingAddressForBilling =
          payload.useShippingAddressForBilling;
        return;
      }
    },
    update_paymentDetails: (
      state,
      action: {
        payload: 'CLEANUP' | _POPaymentMethod | _CCPaymentMethod;
      },
    ) => {
      if (action.payload === 'CLEANUP') {
        state.payment = {
          valid: false,
          details: null,
        };
        return;
      }

      if (action.payload.method === 'bulk_payment') {
        state.payment = {
          valid: true,
          details: action.payload,
        };

        return;
      }

      if (action.payload.method === 'individual_cards') {
        state.payment = {
          valid: true,
          details: action.payload,
        };
        return;
      }
    },

    update_checkoutEmployeeLogin: (
      state,
      { payload }: { payload: _Update_CO_EL_Actions },
    ) => {
      if (payload === 'CLEAN_ALL') {
        state.el = JSON.parse(JSON.stringify(initialState.el));
        return;
      }
      if (payload.type === 'ALLOW_PO') {
        state.el.allowPo = payload.value;
        return;
      }
      if (payload.type === 'PAYMENT_PENDING') {
        state.el.isPaymentPending = payload.value;
        return;
      }
      if (payload.type === 'SOURCE') {
        state.el.source = payload.value;
        return;
      }
      if (payload.type === 'SOURCE_MEDIUM') {
        state.el.sourceMedium = payload.value;
        return;
      }
      if (payload.type === 'SALES_REP') {
        state.el.salesRep = payload.value;
        return;
      }
      if (payload.type === 'SHIPPING_PRICE') {
        state.el.shippingPrice = payload.value;
        return;
      }
    },
  },
});

export const checkoutActions = checkoutSlice.actions;

export default checkoutSlice.reducer;

type _Update_CO_EL_Actions =
  | 'CLEAN_ALL'
  | {
      type: 'ALLOW_PO';
      value: boolean;
    }
  | {
      type: 'PAYMENT_PENDING';
      value: boolean;
    }
  | {
      type: 'SHIPPING_PRICE';
      value: number;
    }
  | {
      type: 'SALES_REP';
      value: {
        value: string;
        label: string;
      };
    }
  | {
      type: 'SOURCE';
      value: {
        value: string;
        label: string;
      };
    }
  | {
      type: 'SOURCE_MEDIUM';
      value: {
        value: string;
        label: string;
      };
    };