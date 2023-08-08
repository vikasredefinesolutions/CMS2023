import { paymentMethodCustom } from '@constants/enum';
import CO5_CreditCardOption from './CO5_CreditCardOption';
import CO5_NetPaymentOption from './CO5_NetPaymentOption';

export interface _HandlerProps {
  name: string;
  value: string;
}

interface _Props {
  changeHandler: (e: _HandlerProps) => void;
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
