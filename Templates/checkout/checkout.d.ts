/* eslint-disable no-unused-vars */
import { paymentMethodCustom } from '@constants/enum';
import {
  AddressFormRefType,
  AddressType,
} from '@controllers/checkoutController/CheckoutAddressForm';
import { CartList } from '@services/cart';
import { ChangeEvent, FC } from 'react';

export type CTProps = {
  coupon: string;
  showApplyButton: boolean;
  currentPage: number;
  allowGuest: boolean;
  showAddAddress: boolean;
  couponInputChangeHandler: (arg: string) => void;
  couponSubmitHandler: () => void;
  checkEmail: (arg: { email: string }) => void;
  continueAsGuest: () => void;
  createAccountHandler: (arg: {
    password: string;
    confirmPassword: string;
  }) => void;
  loginCustomer: (arg: { password: string }) => void;
  reviewOrder: () => void;
  setShippingAddress: (arg: boolean) => void;
  billingForm: AddressFormRefType;
  shippingForm: AddressFormRefType;
  useShippingAddress: boolean;
  cartData: CartList | null;
  paymentFieldUpdateHandler: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  paymentMethod: paymentMethodCustom;
  updatePaymentMethod: (arg: paymentMethodCustom) => void;
  detectCardType: () => string;
  placeOrder: () => void;
  shippingAdress: AddressType | null;
  billingAdress: AddressType | null;
  setAddressType: (arg: null | 'S' | 'B') => void;
};

export interface CTTemplates {
  type1: FC<CTProps>;
}
