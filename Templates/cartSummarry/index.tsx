import { _defaultTemplates } from '@configs/template.config';
import { _shippingMethod } from '@controllers/checkoutController';
import { FC } from 'react';
import CartSummarryType1 from './cartSummaryType1';
import CartSummarryType2 from './cartSummaryType2';
import CartSummarryType3 from './cartSummaryType3';
import CartSummarryType4 from './cartSummaryType4';

interface CS_Templates {
  type1: FC<_props>;
  type2: FC<_props>;
  type3: FC;
  type4: FC;
}

const CartSummaryTemplates: CS_Templates = {
  type1: CartSummarryType1,
  type2: CartSummarryType2,
  type3: CartSummarryType3,
  type4: CartSummarryType4,
};

interface _props {
  selectedShippingModel: _shippingMethod;
}
const CartSummary: FC<_props> = ({ selectedShippingModel }) => {
  const CS_Template = CartSummaryTemplates[_defaultTemplates.cartSummary];
  return <CS_Template selectedShippingModel={selectedShippingModel} />;
};

export default CartSummary;
