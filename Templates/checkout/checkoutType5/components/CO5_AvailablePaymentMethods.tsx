import { paymentMethodCustom } from '@constants/enum';
import { ChangeEvent } from 'react';
import CO5_CreditCardOption from './CO5_CreditCardOption';
import CO5_NetPaymentOption from './CO5_NetPaymentOption';

interface _Props {
  changeHandler: (
    /* eslint-disable no-unused-vars */
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  paymentMethod: paymentMethodCustom.netNumber | paymentMethodCustom.creditCard;
  updatePaymentMethod: (
    arg: paymentMethodCustom.netNumber | paymentMethodCustom.creditCard,
  ) => void;
  detectCardType: () => string;
  cardDetails: {
    cardNumber: string;
    cardExpirationMonth: string;
    cardExpirationYear: string;
    cardVarificationCode: string;
  };
}

const CO5_AvailablePaymentMethods: React.FC<_Props> = ({
  cardDetails,
  paymentMethod,
  changeHandler,
  detectCardType,
  updatePaymentMethod,
}) => {
  switch (paymentMethod) {
    case paymentMethodCustom.creditCard:
      return (
        <CO5_CreditCardOption
          setPaymentMethod={updatePaymentMethod}
          changeHandler={changeHandler}
          cardDetails={cardDetails}
          detectCardType={detectCardType}
        />
      );
    case paymentMethodCustom.netNumber:
      return <CO5_NetPaymentOption updatePaymentMethod={updatePaymentMethod} />;
    default:
      return <></>;
  }
};

export default CO5_AvailablePaymentMethods;
