import { _defaultTemplates } from '@configs/template.config';
import { FC } from 'react';
import { CTProps, CTTemplates } from './checkout';
import CheckoutType1 from './checkoutType1';
import CheckoutType2 from './checkoutType2';

const checkoutTemplates: CTTemplates = {
  type1: CheckoutType1,
  type2: CheckoutType2,
};

const CheckoutTemplate: FC<CTProps> = (props) => {
  const CheckoutSelectedTemplate =
    checkoutTemplates[_defaultTemplates.checkout];
  // const CheckoutSelectedTemplate = checkoutTemplates['type2'];
  return <CheckoutSelectedTemplate {...props} />;
};

export default CheckoutTemplate;
