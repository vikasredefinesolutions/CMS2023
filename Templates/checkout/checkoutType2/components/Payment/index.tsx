import { paymentMethodCustom } from '@constants/enum';
import { ChangeEvent, FC } from 'react';
import PaymentChange from './PaymentChange';
import CardPaymentType from './components/CardPaymentType';
import PurchaseOrderType from './components/PurchaseorderType';

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

const PaymentType: FC<{
  changeHandler: (
    /* eslint-disable no-unused-vars */
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  paymentMethod: paymentMethodCustom;
  updatePaymentMethod: (arg: paymentMethodCustom) => void;
  detectCardType: () => string;
  changeBillingAddress: boolean;
  BillingFormik: any;
  setChangeBillingAddress: (value: boolean) => void;
  cardDetails?: {
    cardNumber: string;
    cardExpirationMonth: string;
    cardExpirationYear: string;
    cardVarificationCode: string;
  };
  purchaseOrder?: string;
  /* eslint-enable no-unused-vars */
}> = ({
  changeHandler,
  paymentMethod,
  updatePaymentMethod,
  changeBillingAddress,
  detectCardType,
  BillingFormik,
  setChangeBillingAddress,
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
              changeBillingAddress,
              BillingFormik,
              setChangeBillingAddress,
              paymentMethod,
            }}
          />
          <CardPaymentType
            {...{
              changeHandler,
              updatePaymentMethod,
              detectCardType,
              paymentMethod,
            }}
          />
        </>
      );
    case paymentMethodCustom.purchaseOrder:
      return (
        <>
          <PaymentChange
            cardDetails={{
              cardNumber: '',
              cardExpirationMonth: '',
              cardExpirationYear: '',
              cardVarificationCode: '',
            }}
            purchaseOrder={''}
            {...{
              changeHandler,
              updatePaymentMethod,
              detectCardType,
              BillingFormik,
              changeBillingAddress,
              setChangeBillingAddress,
              paymentMethod,
            }}
          />
          <PurchaseOrderType
            {...{
              updatePaymentMethod,
              changeHandler,
              paymentMethod,
            }}
          />
        </>
      );

    default:
      return <></>;
  }
};

export default PaymentType;
