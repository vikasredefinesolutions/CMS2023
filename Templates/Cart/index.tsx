import CartType1 from './Cart_Type1';
import CartType2 from './Cart_Type2';
import CartType3 from './Cart_Type3';
import CartType4 from './Cart_Type4';

import { FC } from 'react';
import { _CartProps, _CartTemplates } from './Cart';

const CartTemplates: _CartTemplates = {
  type1: CartType1,
  type2: CartType2,
  type3: CartType3,
  type4: CartType4,
};

const CartTemplate: FC<_CartProps> = (props) => {
  const Cart = CartTemplates['type1'];
  return <Cart {...props} />;
};

export default CartTemplate;
