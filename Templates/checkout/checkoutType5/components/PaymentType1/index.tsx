import { paymentMethodCustom } from '@constants/enum';
import { ChangeEvent, FC } from 'react';
import CardPaymentType1 from './components/CardPaymentType1';
import NetPaymentType1 from './components/NetPaymentType1';

export type netProps = FC<{
  updatePaymentMethod: (arg: paymentMethodCustom) => void;
}>;
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
        <>
          <CardPaymentType1
            {...{
              changeHandler,
              updatePaymentMethod,
              detectCardType,
              cardDetails,
              purchaseOrder,
            }}
          />
        </>
      );
    case paymentMethodCustom.netNumber:
      return (
        <>
          <NetPaymentType1
            {...{
              updatePaymentMethod,
            }}
          />
        </>
      );

    default:
      return <></>;
  }
};

export default PaymentType1;
