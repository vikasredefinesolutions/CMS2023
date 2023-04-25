import { _defaultTemplates } from '@configs/template.config';
import { FC } from 'react';
import CIlayout1 from './CI_layout1';
import { CI_Props, CI_Templates } from './cartItem';
import CIlayout2 from './cartItemLayout2.tsx';

const CartTemplates: CI_Templates = {
  type1: CIlayout1,
  type2: CIlayout2,
};

const CartItem: FC<CI_Props> = (props) => {
  const CI_Template = CartTemplates[_defaultTemplates.cartItem];
  return <CI_Template {...props} />;
};

export default CartItem;
