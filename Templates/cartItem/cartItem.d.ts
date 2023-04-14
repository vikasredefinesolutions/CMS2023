/* eslint-disable no-unused-vars */
import { EmpCustomQtyPriceType } from '@controllers/cartController/cartController.type';
import { CartList } from '@services/cart';
import { ChangeEvent, FC } from 'react';

type cartProps = {
  isRemovable: true;
  cartData: CartList | null;
  isEditable?: boolean;
  removeCartItem: (cartId: number) => void;
  empCustomQtyPrice: EmpCustomQtyPriceType;
  employeeAmtChangeHandler: (
    event: ChangeEvent<HTMLInputElement>,
    cartProdDetailsIndex: number,
    cartProductIndex: number,
  ) => void;
  amtQtyBlurHandler: (arg: number, mediaBaseUrl: string) => void;
};

type checkoutProps = {
  isRemovable: false;
  cartData: CartList | null;
};

export type CI_Props = cartProps | checkoutProps;

export interface CI_Templates {
  type1: FC<CI_Props>;
}
