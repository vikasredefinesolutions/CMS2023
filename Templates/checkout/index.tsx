import { _defaultTemplates } from '@configs/template.config';
import { FC } from 'react';
import { CTProps, CTTemplates } from './checkout';
import CheckoutType1 from './checkoutType1';
import CheckoutType2 from './checkoutType2';
import CheckoutType3 from './checkoutType3';

const checkoutTemplates: CTTemplates = {
  type1: CheckoutType1,
  type2: CheckoutType2,
  type3: CheckoutType3,
};

const CheckoutTemplate: FC<CTProps> = (props) => {
  const CheckoutSelectedTemplate =
    checkoutTemplates[_defaultTemplates.checkout];
  // const CheckoutSelectedTemplate = checkoutTemplates['type3'];
  return <CheckoutSelectedTemplate {...props} />;
};

export default CheckoutTemplate;
