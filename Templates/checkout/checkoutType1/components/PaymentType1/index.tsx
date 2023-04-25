import { paymentMethodCustom } from '@constants/enum';
import { ChangeEvent, FC } from 'react';
import CardPaymentType1 from './components/CardPaymentType1';
import PurchaseOrderType1 from './components/PurchaseOrderType1';

export type paymentProps = FC<{
  /* eslint-disable no-unused-vars */
  updatePaymentMethod: (arg: paymentMethodCustom) => void;
  changeHandler: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  detectCardType?: () => string;
  /* eslint-enable no-unused-vars */
}>;

const PaymentType1: FC<{
  changeHandler: (
    /* eslint-disable no-unused-vars */
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  paymentMethod: paymentMethodCustom;
  updatePaymentMethod: (arg: paymentMethodCustom) => void;
  detectCardType: () => string;
  /* eslint-enable no-unused-vars */
}> = ({
  changeHandler,
  paymentMethod,
  updatePaymentMethod,
  detectCardType,
}) => {
  switch (paymentMethod) {
    case paymentMethodCustom.creditCard:
      return (
        <CardPaymentType1
          {...{
            changeHandler,
            updatePaymentMethod,
            detectCardType,
          }}
        />
      );
    case paymentMethodCustom.purchaseOrder:
      return (
        <PurchaseOrderType1
          {...{
            updatePaymentMethod,
            changeHandler,
          }}
        />
      );

    default:
      return <>test</>;
  }
};

export default PaymentType1;
