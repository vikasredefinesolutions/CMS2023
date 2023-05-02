import { FC } from 'react';
import CIlayout1 from './CI_layout1';
import { CI_Props, CI_Templates } from './cartItem';
import CIlayout2 from './cartItemLayout2.tsx';
import CIlayout3 from './cartItemLayout3';
import CIlayout4 from './cartItemlayout4';

const CartTemplates: CI_Templates = {
  type1: CIlayout1,
  type2: CIlayout2,
  type3: CIlayout3,
  type4: CIlayout4,
};

const CartItem: FC<CI_Props> = (props) => {
  const CI_Template =
    CartTemplates[
      (`type${props.cartType}` as 'type1') || 'type2' || 'type3' || 'type4'
    ];
  return <CI_Template {...props} />;
};

export default CartItem;
