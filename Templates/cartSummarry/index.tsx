import { _defaultTemplates } from '@configs/template.config';
import { FC } from 'react';
import { CS_Templates, CartSummarryProps } from './CartSumarry';
import CartSummarryType1 from './cartSummaryType1';
import CartSummarryType2 from './cartSummaryType2';

const CartSummaryTemplates: CS_Templates = {
  type1: CartSummarryType1,
  type2: CartSummarryType2,
};

const CartSummary: FC<CartSummarryProps> = (props) => {
  const CS_Template = CartSummaryTemplates[_defaultTemplates.cartSummary];
  return <CS_Template {...props} />;
};

export default CartSummary;
