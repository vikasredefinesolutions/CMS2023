import { FC } from 'react';
import CIlayout1 from './CI_layout1';
import CIlayout5 from './CartItem_Type5/CI_layout5';
import { CI_Templates, _CartProps } from './cartItem';
import CIlayout2 from './cartItemLayout2.tsx';
import CIlayout3 from './cartItemLayout3';
import CIlayout4 from './cartItemlayout4';

const CartTemplates: CI_Templates = {
  type1: CIlayout1,
  type2: CIlayout2,
  type3: CIlayout3,
  type4: CIlayout4,
  type5: CIlayout5,
};

const CartItem: FC<_CartProps & { templateId: number }> = ({
  templateId,
  ...rest
}) => {
  const CI_Template =
    CartTemplates[
      (`type${templateId}` as 'type1') ||
        'type2' ||
        'type3' ||
        'type4' ||
        'type5'
    ];

  return <CI_Template {...rest} />;
};

export default CartItem;
