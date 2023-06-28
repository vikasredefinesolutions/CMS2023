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
    creditCardHolder: string;
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
    creditCardHolder: string;
  };
  purchaseOrder?: string;
  setUseShippingAddress: (args: boolean) => void;
  useShippingAddress: boolean;
  /* eslint-enable no-unused-vars */
}> = ({
  changeHandler,
  paymentMethod,
  updatePaymentMethod,
  changeBillingAddress,
  detectCardType,
  BillingFormik,
  setChangeBillingAddress,
  setUseShippingAddress,
  useShippingAddress,
  cardDetails,
  purchaseOrder,
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
              setUseShippingAddress,
              useShippingAddress,
            }}
          />
          <CardPaymentType
            {...{
              changeHandler,
              updatePaymentMethod,
              detectCardType,
              paymentMethod,
              cardDetails,
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
              creditCardHolder: '',
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
              setUseShippingAddress,
              useShippingAddress,
            }}
          />
          <PurchaseOrderType
            {...{
              updatePaymentMethod,
              changeHandler,
              paymentMethod,
              purchaseOrder,
            }}
          />
        </>
      );

    default:
      return <></>;
  }
};

export default PaymentType;
