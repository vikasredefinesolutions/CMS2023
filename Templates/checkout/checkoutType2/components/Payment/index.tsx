import { paymentMethodCustom } from '@constants/enum';
import { AddressType } from '@controllers/checkoutController/CheckoutAddressForm';
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
  billingAddress?: AddressType | null;
  setShippingAddress?: (args: any) => void;
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
  billingAddress: AddressType | null;
  setShippingAddress: (args: any) => void;
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
  billingAddress,
  setShippingAddress,
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
              setShippingAddress,
              billingAddress,
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
              setShippingAddress,
              billingAddress,
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
