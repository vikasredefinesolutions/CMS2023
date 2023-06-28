import { FC } from 'react';
import { _CartProps, _CartTemplates } from './Cart';
import CartType1 from './Cart_Type1';
import CartType5 from './Cart_Type5';
import CartType2 from './cartType2';
import CartType3 from './cartType3';
import CartType4 from './cart_Type4';
import CartType6 from './cart_Type6';

const CartTemplates: _CartTemplates = {
  type1: CartType1, //for Corporate Gear
  type2: CartType2, //for PKHG
  type3: CartType3, //for Store Builder
  type4: CartType4, //for corporate Store like cyxtera and etc
  type5: CartType5, // di
  type6: CartType6, // usaa healthypoints
};

const CartTemplate: FC<_CartProps> = (props) => {
  const Cart =
    CartTemplates[
      (`type${props.templateId}` as 'type1') ||
        'type2' ||
        'type3' ||
        'type4' ||
        'type5' ||
        'type6'
    ];
    
  return <Cart {...props} />;
};

export default CartTemplate;
