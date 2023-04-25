import { paymentMethodCustom } from '@constants/enum';
import { ChangeEvent, FC } from 'react';
import CardPaymentType from './components/CardPaymentType';
import PaymentChange from './PaymentChange';
import PurchaseOrderType from './components/PurchaseorderType';

export type paymentProps = FC<{
  /* eslint-disable no-unused-vars */
  updatePaymentMethod: (arg: paymentMethodCustom) => void;
  changeHandler: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  detectCardType?: () => string;
  /* eslint-enable no-unused-vars */
}>;

const PaymentType: FC<{
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
        <>
          <PaymentChange
            {...{
              changeHandler,
              updatePaymentMethod,
              detectCardType,
            }}
          />
          <CardPaymentType
            {...{
              changeHandler,
              updatePaymentMethod,
              detectCardType,
            }}
          />
        </>
      );
    case paymentMethodCustom.purchaseOrder:
      return (
        <>
          <PaymentChange
            {...{
              changeHandler,
              updatePaymentMethod,
              detectCardType,
            }}
          />
          <PurchaseOrderType
            {...{
              updatePaymentMethod,
              changeHandler,
            }}
          />
        </>
      );

    default:
      return <></>;
  }
};

export default PaymentType;
