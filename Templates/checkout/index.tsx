import { layoutToShow } from '@configs/page.config';
import { FC } from 'react';
import { CTProps, CTTemplates } from './checkout';
import CheckoutType1 from './checkoutType1';

const checkoutTemplates: CTTemplates = {
  type1: CheckoutType1,
};

const CheckoutTemplate: FC<CTProps> = (props) => {
  const CheckoutSelectedTemplate = checkoutTemplates[layoutToShow];
  return <CheckoutSelectedTemplate {...props} />;
};

export default CheckoutTemplate;
