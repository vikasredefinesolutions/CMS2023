import { useTypedSelector_v2 } from '@hooks_v2/index';
import { FC } from 'react';
import PL1_CreditCard from './PL1_CreditCard';
import PL1_PurchaseOrder from './PL1_PurchaseOrder';

interface _Props {
  allowPO: boolean;
}

const AvailablePaymentMethods: FC<_Props> = ({ allowPO }) => {
  const paymentMethod = useTypedSelector_v2(
    (state) => state.checkout.payment.method,
  );

  return (
    <>
      {paymentMethod === 'CREDIT_CARD' && <PL1_CreditCard allowPO={allowPO} />}
      {allowPO && paymentMethod === 'PURCHASE_ORDER' ? (
        <PL1_PurchaseOrder />
      ) : null}
    </>
  );
};

export default AvailablePaymentMethods;
