import CartType3 from './cartType3';
import CartType1 from './Cart_Type1';
import CartType4 from './Cart_Type4';

import { _defaultTemplates } from '@configs/template.config';
import { FC } from 'react';
import { _CartProps, _CartTemplates } from './Cart';
import CartType2 from './cartType2';

const CartTemplates: _CartTemplates = {
  type1: CartType1,
  type2: CartType2,
  type3: CartType3,
  type4: CartType4,
};

const CartTemplate: FC<_CartProps> = (props) => {
  const Cart = CartTemplates[_defaultTemplates.cart];
  return <Cart {...props} />;
};

export default CartTemplate;
