import { _defaultTemplates } from '@configs/template.config';
import { FC } from 'react';
import CheckoutType1 from './checkoutType1';
import CheckoutType2 from './checkoutType2';
import CheckoutType3 from './checkoutType3';
import CheckoutType4 from './checkoutType4';

interface _Props {
  cartTemplateId: number;
}

export interface CTTemplates {
  type1: FC<_Props>;
  type2: FC<_Props>;
  type3: FC<_Props>;
  type4: FC<_Props>;
}

const checkoutTemplates: CTTemplates = {
  type1: CheckoutType1,
  type2: CheckoutType2,
  type3: CheckoutType3,
  type4: CheckoutType4,
};

const CheckoutTemplate: FC<_Props> = ({ cartTemplateId }) => {
  const CheckoutSelectedTemplate =
    checkoutTemplates[_defaultTemplates.checkout];

  return <CheckoutSelectedTemplate cartTemplateId={cartTemplateId} />;
};

export default CheckoutTemplate;
