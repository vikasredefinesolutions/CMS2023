import { layoutToShow } from '@configs/page.config';
import { FC } from 'react';
import { CI_Props, CI_Templates } from './cartItem';
import CIlayout1 from './CI_layout1';

const CartTemplates: CI_Templates = {
  type1: CIlayout1,
};

const CartItem: FC<CI_Props> = (props) => {
  const CI_Template = CartTemplates[layoutToShow];
  return <CI_Template {...props} />;
};

export default CartItem;
