import {
  _MyAcc_OrderBillingDetails,
  _MyAcc_OrderProductDetails,
} from '@definations/APIs/user.res';
import { FC } from 'react';
import Paylater_type1 from './PayLater_type1';

interface _Props {
  templateId: number;
  orderDetails: {
    billing: _MyAcc_OrderBillingDetails | null;
    product: _MyAcc_OrderProductDetails[] | null;
  };
}

export interface _PaylaterTemplates {
  type1: FC<_Props>;
}

const PayloadTemplates: _PaylaterTemplates = {
  type1: Paylater_type1,
};

const PaylaterTemplate: FC<_Props> = ({ templateId, orderDetails }) => {
  const Template = PayloadTemplates[`type${templateId}` as 'type1'];

  return <Template templateId={templateId} orderDetails={orderDetails} />;
};

export default PaylaterTemplate;
