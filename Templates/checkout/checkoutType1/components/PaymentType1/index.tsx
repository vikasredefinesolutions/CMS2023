import { paymentMethodCustom } from '@constants/enum';
import { ChangeEvent, FC } from 'react';
import CardPaymentType1 from './components/CardPaymentType1';
import PurchaseOrderType1 from './components/PurchaseOrderType1';

export type paymentProps = FC<{
  /* eslint-disable no-unused-vars */
  updatePaymentMethod: (arg: paymentMethodCustom) => void;
  changeHandler: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  detectCardType?: () => string;
  cardDetails?: {
    cardNumber: string;
    cardExpirationMonth: string;
    cardExpirationYear: string;
    cardVarificationCode: string;
  };
  paymentMethod?: paymentMethodCustom;
  purchaseOrder?: string;
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
  cardDetails: {
    cardNumber: string;
    cardExpirationMonth: string;
    cardExpirationYear: string;
    cardVarificationCode: string;
  };
  purchaseOrder: string;

  /* eslint-enable no-unused-vars */
}> = ({
  changeHandler,
  paymentMethod,
  updatePaymentMethod,
  detectCardType,
  cardDetails,
  purchaseOrder,
}) => {
  switch (paymentMethod) {
    case paymentMethodCustom.creditCard:
      return (
        <CardPaymentType1
          {...{
            changeHandler,
            updatePaymentMethod,
            detectCardType,
            cardDetails,
            purchaseOrder,
          }}
        />
      );
    case paymentMethodCustom.purchaseOrder:
      return (
        <PurchaseOrderType1
          {...{
            updatePaymentMethod,
            changeHandler,
            cardDetails,
            purchaseOrder,
          }}
        />
      );

    default:
      return <></>;
  }
};

export default PaymentType1;
