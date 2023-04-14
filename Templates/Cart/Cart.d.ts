/* eslint-disable no-unused-vars */
import { EmpCustomQtyPriceType } from '@controllers/cartController/cartController.type';
import { _CartItem } from '@definations/startOrderModal';
import { CartList } from '@services/cart';
import { NextPage } from 'next';
import { ChangeEvent } from 'react';

export interface _CartProps {
  cartData: CartList | null;
  removeCartItem: (itemId: number) => void;
  couponInputChangeHandler: (arg: string) => void;
  couponSubmitHandler: () => void;
  showApplyButton: boolean;
  coupon: string;
  empCustomQtyPrice: EmpCustomQtyPriceType;
  employeeAmtChangeHandler: (
    event: ChangeEvent<HTMLInputElement>,
    cartProdDetailsIndex: number,
    cartProductIndex: number,
  ) => void;
  amtQtyBlurHandler: (arg: number, mediaBaseUrl: string) => void;
  loadProduct: (product: _CartItem) => void;
  setShowAddOtf: (arg: boolean) => void;
}

export interface _CartTemplates {
  type1: NextPage<_CartProps, _CartProps>;
  type2: NextPage<_CartProps, _CartProps>;
  type3: NextPage<_CartProps, _CartProps>;
  type4: NextPage<_CartProps, _CartProps>;
}
