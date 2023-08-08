import { CustomerAddress } from '@definations/APIs/user.res';
import { createSlice } from '@reduxjs/toolkit';

interface _POPaymentMethod {
  method: 'bulk_payment';
  poNumber: string;
}

interface _CCPaymentMethod {
  method: 'individual_cards';
  data: {
    nameOnCard: string;
    cardName: '' | 'VISA' | 'MASTERCARD' | 'AMEX' | 'DISCOVER';
    year: string;
    ccNumber: string;
    month: string;
    securityCode: string;
  };
}

export interface _Checkout_Initials {
  user: {
    email: string;
    creditBalance: number;
  };
  playerInformation: {
    needToValidate: boolean;
    firstName: string;
    lastName: string;
    playerNo: number;
    poNumberToMatch: string;
  };
  additionalInformation: {
    name: string;
    type: string;
    isRequired: boolean;
    value: string;
  }[];
  address: {
    zipCode: string;
    billing: CustomerAddress | null;
    shipping: CustomerAddress | null;
    editing: CustomerAddress | null;
    useShippingAddressForBilling: boolean;
    shipToSchool: boolean;
  };
  payment: {
    useCreditBalance: boolean;
    paymentRequired: boolean;
    creditCard: _CCPaymentMethod['data'];
    poNumber: string;
    method: 'CREDIT_CARD' | 'PURCHASE_ORDER';
  };
  charges: {
    salesTax: number;
  };
  shippingMethod: {
    destination: 'residential' | 'commercial';
    name: string;
    price: number;
  };
  orderNotes: string;
  el: {
    shippingPrice: number;
    allowPo: boolean;
    smallRunFee: number;
    isPaymentPending: boolean;
    salesRep: {
      value: string;
      label: string;
    };
    source: {
      value: string;
      label: string;
    };
    orderSubType: {
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
  user: {
    email: '',
    creditBalance: 0,
  },
  playerInformation: {
    needToValidate: false,
    firstName: '',
    lastName: '',
    playerNo: 0,
    poNumberToMatch: '',
  },
  additionalInformation: [],
  shippingMethod: {
    destination: 'residential',
    name: '',
    price: 0,
  },
  orderNotes: '',
  address: {
    zipCode: '',
    billing: null,
    shipping: null,
    editing: null,
    useShippingAddressForBilling: false,
    shipToSchool: false,
  },
  charges: {
    salesTax: 0,
  },
  payment: {
    useCreditBalance: false,
    paymentRequired: true,
    creditCard: {
      nameOnCard: '',
      cardName: '',
      year: '',
      ccNumber: '',
      month: '',
      securityCode: '',
    },
    poNumber: '',
    method: 'CREDIT_CARD',
  },
  el: {
    shippingPrice: 0,
    smallRunFee: 0,
    allowPo: false,
    isPaymentPending: false,
    salesRep: {
      value: '',
      label: '',
    },
    orderSubType: {
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

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
///////////////////////                       SLICE
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    update_CheckoutUser: (
      state,
      { payload }: { payload: { email: string } | { creditBalance: number } },
    ) => {
      if ('email' in payload) {
        state.user.email = payload.email;
        return;
      }

      if ('creditBalance' in payload) {
        state.user.creditBalance = payload.creditBalance;
        return;
      }
    },

    update_CheckoutCharges: (
      state,
      {
        payload,
      }: { payload: { type: 'SALES_TAX'; cost: number } | 'CLEAN_UP' },
    ) => {
      if (payload === 'CLEAN_UP') {
        state.charges.salesTax = 0;
        return;
      }

      if (payload.type === 'SALES_TAX') {
        state.charges.salesTax = payload.cost;
        return;
      }
    },

    update_CheckoutAddress: (
      state,
      {
        payload,
      }: {
        payload: _update_CheckoutAddress_Actions;
      },
    ) => {
      if (payload === 'CLEAN_ALL') {
        state.address.editing = null;
        state.address.shipping = null;
        state.address.billing = null;
        state.address.useShippingAddressForBilling = false;
        return;
      }

      if (payload.type === 'ZIP_CODE') {
        if (payload.value === 'CLEANUP') {
          state.address.zipCode = '';
          return;
        }

        state.address.zipCode = payload.value || '';
        return;
      }

      if (payload.type === 'EDITING...') {
        if (payload.address === 'CLEANUP') {
          state.address.editing = null;
          return;
        }

        state.address.editing = payload.address;
        return;
      }
      if (payload.type === 'SHIPPING_ADDRESS') {
        if (payload.address === 'CLEANUP') {
          state.address.shipping = null;
          return;
        }

        state.address.shipping = payload.address;
        return;
      }
      if (payload.type === 'BILLING_ADDRESS') {
        if (payload.address === 'CLEANUP') {
          state.address.billing = null;
          return;
        }

        state.address.billing = payload.address;
        return;
      }
      if (payload.type === 'USE_SHIPPING_ADDRESS_FOR_BILLING') {
        if (payload.value === 'CLEANUP') {
          state.address.useShippingAddressForBilling = false;
          return;
        }

        state.address.billing = null;
        state.address.useShippingAddressForBilling = payload.value;
        return;
      }
      if (payload.type === 'SHIP_TO_SCHOOL') {
        if (payload.value === 'CLEANUP') {
          state.address.shipToSchool = false;

          return;
        }

        state.address.shipToSchool = payload.value;
        state.shippingMethod.name = '';
        state.shippingMethod.price = 0;
        return;
      }
    },
    update_PaymentDetails: (
      state,
      action: {
        payload:
          | 'CLEANUP'
          | { type: 'PURCHASE_ORDER' | 'CREDIT_CARD'; method: 'CHANGED' }
          | {
              value: boolean;
              method: 'USE_CREDIT_BALANCE';
            }
          | {
              value: boolean;
              method: 'PAYMENT_REQUIRED';
            }
          | _POPaymentMethod
          | _CCPaymentMethod;
      },
    ) => {
      if (action.payload === 'CLEANUP') {
        state.payment = JSON.parse(JSON.stringify(initialState.payment));
        return;
      }
      if (action.payload.method === 'USE_CREDIT_BALANCE') {
        state.payment.useCreditBalance = action.payload.value;
        return;
      }

      if (action.payload.method === 'PAYMENT_REQUIRED') {
        state.payment.paymentRequired = action.payload.value;
        if (!action.payload.value) {
          state.payment.creditCard = JSON.parse(
            JSON.stringify(initialState.payment.creditCard),
          );
          state.payment.poNumber = '';
        }
        return;
      }

      if (action.payload.method === 'CHANGED') {
        state.payment.method = action.payload.type;
        return;
      }

      if (action.payload.method === 'bulk_payment') {
        state.payment.poNumber = action.payload.poNumber;
        state.payment.method = 'PURCHASE_ORDER';
        state.payment.creditCard = JSON.parse(
          JSON.stringify(initialState.payment.creditCard),
        );
        return;
      }

      if (action.payload.method === 'individual_cards') {
        state.payment.creditCard = { ...action.payload.data };
        state.payment.method = 'CREDIT_CARD';
        state.payment.poNumber = '';
        return;
      }
    },
    update_CheckoutEmployeeLogin: (
      state,
      { payload }: { payload: _Update_CO_EL_Actions },
    ) => {
      if (payload === 'CLEAN_ALL') {
        state.el = JSON.parse(JSON.stringify(initialState.el));
        return;
      }
      if (payload.type === 'SMALL_RUN_FEE') {
        state.el.smallRunFee = payload.value;
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

      if (payload.type === 'ORDER_SUB_TYPE') {
        state.el.orderSubType = payload.value;
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
    update_CheckoutShippingMethod: (
      state,
      { payload }: { payload: _Update_CO_ShippinMethod },
    ) => {
      if (payload === 'CLEAN_ALL') {
        state.shippingMethod = JSON.parse(
          JSON.stringify(initialState.shippingMethod),
        );
        return;
      }
      if (payload.type === 'destination') {
        state.shippingMethod.destination = payload.value;
        return;
      }
      if (payload.type === 'method') {
        if (payload.value === 'CLEAN_UP') {
          state.shippingMethod.name = '';
          state.shippingMethod.price = 0;
          return;
        }

        state.shippingMethod.name = payload.value.name;
        state.shippingMethod.price = payload.value.price;
        return;
      }
    },
    update_CheckoutCustomInformation: (
      state,
      action: {
        payload: _Update_CO_CustomInformation;
      },
    ) => {
      if (action.payload.type === 'VALIDATE_PLAYER') {
        state.playerInformation.needToValidate = action.payload.value;
        return;
      }

      if (action.payload.type === 'PO_NUMBER_TO_MATCH') {
        state.playerInformation.poNumberToMatch = action.payload.value;
        return;
      }

      if (action.payload.type === 'PLAYER') {
        state.playerInformation.firstName = action.payload.data.firstName;
        state.playerInformation.lastName = action.payload.data.lastName;
        state.playerInformation.playerNo = action.payload.data.playerNo;
        return;
      }

      if (action.payload.type === 'ADDITIONAL') {
        state.additionalInformation = action.payload.data;
        return;
      }
    },
    clear_Checkout: (state) => {
      state.user = JSON.parse(JSON.stringify(initialState.user));
      state.playerInformation = JSON.parse(
        JSON.stringify(initialState.playerInformation),
      );

      state.additionalInformation = JSON.parse(
        JSON.stringify(initialState.additionalInformation),
      );
      state.payment = JSON.parse(JSON.stringify(initialState.payment));
      state.address = JSON.parse(JSON.stringify(initialState.address));
      state.charges = JSON.parse(JSON.stringify(initialState.charges));
      state.shippingMethod = JSON.parse(
        JSON.stringify(initialState.shippingMethod),
      );
      state.orderNotes = JSON.parse(JSON.stringify(initialState.orderNotes));
      state.el = JSON.parse(JSON.stringify(initialState.el));
    },
  },
});

export const checkoutActions = checkoutSlice.actions;

export default checkoutSlice.reducer;

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
///////////////////////                       TYPES
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

type _Update_CO_ShippinMethod =
  | 'CLEAN_ALL'
  | {
      type: 'destination';
      value: 'residential' | 'commercial';
    }
  | {
      type: 'method';
      value:
        | {
            name: string;
            price: number;
          }
        | 'CLEAN_UP';
    };

type _Update_CO_CustomInformation =
  | { type: 'VALIDATE_PLAYER'; value: boolean }
  | { type: 'PO_NUMBER_TO_MATCH'; value: string }
  | {
      type: 'PLAYER';
      data: { firstName: string; lastName: string; playerNo: number };
    }
  | {
      type: 'ADDITIONAL';
      data: {
        name: string;
        type: string;
        isRequired: boolean;
        value: string;
      }[];
    };

type _Update_CO_EL_Actions =
  | 'CLEAN_ALL'
  | {
      type: 'ALLOW_PO';
      value: boolean;
    }
  | {
      type: 'SMALL_RUN_FEE';
      value: number;
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
      type: 'ORDER_SUB_TYPE';
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
type _update_CheckoutAddress_Actions =
  | 'CLEAN_ALL'
  | { type: 'UPDATE_NOTE'; value: string }
  | {
      type: 'EDITING...';
      address: CustomerAddress | 'CLEANUP';
    }
  | {
      type: 'BILLING_ADDRESS';
      address: CustomerAddress | 'CLEANUP';
    }
  | {
      type: 'USE_SHIPPING_ADDRESS_FOR_BILLING';
      value: boolean | 'CLEANUP';
    }
  | {
      type: 'SHIP_TO_SCHOOL';
      value: boolean | 'CLEANUP';
    }
  | {
      type: 'SHIPPING_ADDRESS';
      address: CustomerAddress | 'CLEANUP';
    }
  | {
      type: 'ZIP_CODE';
      value: string | 'CLEANUP';
    };
