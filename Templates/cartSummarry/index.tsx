import { _defaultTemplates } from '@configs/template.config';
import { FC } from 'react';
import CartSummarryType1 from './cartSummaryType1';
import CartSummarryType2 from './cartSummaryType2';
import CartSummarryType3 from './cartSummaryType3';
import CartSummarryType4 from './cartSummaryType4';

interface CS_Templates {
  type1: FC;
  type2: FC;
  type3: FC;
  type4: FC;
}

const CartSummaryTemplates: CS_Templates = {
  type1: CartSummarryType1,
  type2: CartSummarryType2,
  type3: CartSummarryType3,
  type4: CartSummarryType4,
};

const CartSummary: FC = () => {
  const CS_Template = CartSummaryTemplates[_defaultTemplates.cartSummary];
  return <CS_Template />;
};

export default CartSummary;
