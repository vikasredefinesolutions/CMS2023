/* eslint-disable no-unused-vars */
import { CartList } from '@services/cart';
import { FC } from 'react';

type cartProps = {
  isRemovable: true;
  cartData: CartList | null;
  isEditable?: boolean;
  removeCartItem: (cartId: number) => void;
  cartType: number;
};

type checkoutProps = {
  isRemovable: false;
  cartData: CartList | null;
  cartType: number;
};

export type CI_Props = cartProps | checkoutProps;

export interface CI_Templates {
  type1: FC<CI_Props>;
  type2: FC<CI_Props>;
  type3: FC<CI_Props>;
  type4: FC<CI_Props>;
}
