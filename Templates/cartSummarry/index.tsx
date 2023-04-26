import { FC } from 'react';
import { CartSummarryProps, CS_Templates } from './CartSumarry';
import CartSummarryType1 from './cartSummaryType1';
import CartSummarryType2 from './cartSummaryType2';
import CartSummarryType3 from './cartSummaryType3';

const CartSummaryTemplates: CS_Templates = {
  type1: CartSummarryType1,
  type2: CartSummarryType2,
  type3: CartSummarryType3,
};

const CartSummary: FC<CartSummarryProps> = (props) => {
  const CS_Template = CartSummaryTemplates['type3'];
  return <CS_Template {...props} />;
};

export default CartSummary;
