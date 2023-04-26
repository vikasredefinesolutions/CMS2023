import { paymentMethodCustom } from '@constants/enum';
import { ChangeEvent, FC } from 'react';
import CardPaymentType3 from './components/CardPaymentType1';
import NetPaymentType1 from './components/NetPaymentType1';

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
        <CardPaymentType3
          {...{
            changeHandler,
            updatePaymentMethod,
            detectCardType,
          }}
        />
      );
    case paymentMethodCustom.creditWallet:
      return (
        <NetPaymentType1
          {...{
            updatePaymentMethod,
            changeHandler,
          }}
        />
      );

    default:
      return <></>;
  }
};

export default PaymentType1;
