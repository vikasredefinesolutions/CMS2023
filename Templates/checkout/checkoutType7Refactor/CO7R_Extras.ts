import { PaymentMethod } from '@constants/enum';
import { __messages } from '@constants/form.config';
import {
  __Cookie,
  phonePattern1,
  phonePattern2,
  phonePattern3,
  phonePattern4,
} from '@constants/global.constant';
import { CheckoutMessage, __ValidationText } from '@constants/validation.text';
import { AddressAPIRequest } from '@definations/APIs/address.req';
import { CustomerAddress, UserType } from '@definations/APIs/user.res';
import {
  KlaviyoScriptTag,
  deleteCookie,
  extractCookies,
} from '@helpers/common.helper';
import {
  CreateUserAddress,
  UpdateUserAddress,
} from '@services/address.service';
import { updateCartByNewUserId } from '@services/cart.service';
import * as Yup from 'yup';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////        VIEW
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type _CO7R_Screens =
  | 'completeOrderDetails'
  | 'enterEmailAddress'
  | 'addShipping'
  | 'addPaymentMethodAndBilling';

export const showOrderReview = (screenToShow: _CO7R_Screens) => {
  if (screenToShow === 'enterEmailAddress') return false;
  if (screenToShow === 'addShipping') return false;
  if (screenToShow === 'completeOrderDetails') return true;
  if (screenToShow === 'addPaymentMethodAndBilling') return true;
  // default
  return false;
};

export const showOrderBillingAndPayment = (screenToShow: _CO7R_Screens) => {
  if (screenToShow === 'addPaymentMethodAndBilling') return true;
  if (screenToShow === 'completeOrderDetails') return true;

  return false;
};

export const showPaymentMethodOpaque = (screenToShow: _CO7R_Screens) => {
  if (screenToShow === 'enterEmailAddress') return false;
  if (screenToShow === 'addShipping') return true;
  if (screenToShow === 'completeOrderDetails') return false;
  if (screenToShow !== 'addPaymentMethodAndBilling') return true;

  return false;
};

export const showOrderReviewOpaque = (screenToShow: _CO7R_Screens) => {
  if (screenToShow === 'enterEmailAddress') return false;
  if (screenToShow === 'addShipping') return true;
  if (screenToShow === 'completeOrderDetails') return false;
  if (screenToShow !== 'addPaymentMethodAndBilling') return false;

  return false;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////        ADD - EdIT ADDRESS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type _CO7R_AddEditInputFieldsName =
  | 'firstname'
  | 'lastName'
  | 'address1'
  | 'address2'
  | 'city'
  | 'state'
  | 'postalCode'
  | 'countryCode'
  | 'countryName'
  | 'companyName'
  | 'phone';

export interface _CO7R_AddressFields {
  firstname: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  countryCode: string;
  countryName: string;
  companyName: string;
  phone: string;
}

export const CO7R_AddressFields: _CO7R_AddressFields = {
  firstname: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  postalCode: '',
  phone: '',
  countryName: '',
  companyName: '',
  countryCode: '',
};

export const CO7R_addressValidationSchema = Yup.object({
  firstname: Yup.string()
    .trim()
    .required('Required field')
    .min(
      CheckoutMessage.firstName.minLength,
      CheckoutMessage.firstName.minValidation,
    ),
  lastName: Yup.string()
    .trim()
    .required('Required field')
    .min(
      CheckoutMessage.lastName.minLength,
      CheckoutMessage.lastName.minValidation,
    ),
  address1: Yup.string().trim().required('Required field'),
  city: Yup.string().trim().required('Required field'),
  postalCode: Yup.string().trim().required('Required Field'),
  countryCode: Yup.string().trim().required('Required field'),
  state: Yup.string().trim().required('Required field'),
  phone: Yup.string()
    .trim()
    .required(__ValidationText.signUp.storeCustomerAddress.phone.required)
    .test(
      'phone-test',
      __ValidationText.signUp.storeCustomerAddress.phone.valid,
      (value) => {
        if (
          phonePattern1.test(value || '') ||
          phonePattern2.test(value || '') ||
          phonePattern3.test(value || '') ||
          phonePattern4.test(value || '')
        ) {
          return true;
        }
        return false;
      },
    ),
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////        CREDIT CARD - PURCHASE ORDER
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const detectCardIssuer = (cardNumber: string) => {
  let re = new RegExp('^4');

  if (!cardNumber) return '';

  //
  if (cardNumber.match(re) != null) {
    return 'VISA';
  }

  if (
    /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
      cardNumber,
    )
  ) {
    return 'MASTERCARD';
  }

  re = new RegExp('^3[47]');
  if (cardNumber.match(re) != null) {
    return 'AMEX';
  }

  re = new RegExp(
    '^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)',
  );
  if (cardNumber.match(re) != null) {
    return 'DISCOVER';
  }

  return '';
};

export const maxLengthCalculator = (
  name: 'ccNumber' | 'cvc',
  value: string,
): number => {
  if (name === 'ccNumber') return detectCardIssuer(value) === 'AMEX' ? 15 : 16;
  if (name === 'cvc') return detectCardIssuer(value) === 'AMEX' ? 4 : 3;

  return 200;
};

export interface _CO7R_CreditCardFields {
  nameOnCard: string;
  ccNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
}

export const CO7R_creditCardFields: _CO7R_CreditCardFields = {
  nameOnCard: '',
  ccNumber: '',
  expiryMonth: '',
  expiryYear: '',
  cvc: '',
};

export const CO7R_creditCardValidationSchema = Yup.object({
  nameOnCard: Yup.string().trim().min(2).required('Required field'),
  ccNumber: Yup.string()
    .trim()
    .min(15)
    .max(16)
    .required('Required field')
    .test('valid-ccLength', 'Some message', function (enteredCCnumber) {
      let cardType = '';
      const cardLength = enteredCCnumber?.length || 0;

      if (enteredCCnumber && cardLength > 0) {
        cardType = detectCardIssuer(enteredCCnumber);
      }

      if (cardType === 'AMEX') return cardLength === 15;

      if (
        cardType === 'MASTERCARD' ||
        cardType === 'DISCOVER' ||
        cardType === 'VISA'
      ) {
        return cardLength === 16;
      }
      //
      return cardLength === 16;
    }),
  expiryMonth: Yup.string()
    .trim()
    .length(2)
    .required()
    .test('valid-expiry-year', 'Some message', function (enteredMonth) {
      if (!enteredMonth) return false;
      //
      const currentYear = new Date().getFullYear().toString().slice(-2);
      const currentMonth = new Date().getMonth() + 1;

      if (this.parent.expiredYear < currentYear) return false;
      //
      if (this.parent.expiryYear === currentYear) {
        if (+enteredMonth > currentMonth) return true;
        //
        return false;
      }
      //
      return true;
    }),
  expiryYear: Yup.string()
    .trim()
    .length(2)
    .required()
    .test('valid-expiry-year', 'Some message', function (enteredYear) {
      if (!enteredYear) return false;
      //
      const currentYear = new Date().getFullYear().toString().slice(-2);
      if (+enteredYear >= +currentYear) return true;
      //
      return false;
    }),
  cvc: Yup.string()
    .trim()
    .min(3)
    .max(4)
    .required('Required field')
    .test('valid-length', 'some message', function (enteredCVC) {
      const cardType = detectCardIssuer(this.parent.ccNumber);
      const cvcLength = enteredCVC?.length || 0;

      if (cardType === 'AMEX') {
        if (cvcLength === 4) {
          return true;
        }
        return false;
      }
      if (cvcLength === 3) return true;
      //
      return false;
    }),
});

export const CO7R_purchaseOrderValidationSchema = Yup.object({
  poNumber: Yup.string().trim().min(3).required('Required field'),
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////       LOGIN
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface _CO7R_LoginInitials {
  email: string;
  password: string;
  keepMeLoggedIn: boolean;
}

export const CO7R_LoginInitials: _CO7R_LoginInitials = {
  email: '',
  password: '',
  keepMeLoggedIn: false,
};

export const CO7R_LoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email(__messages.email.validRequest)
    .required(__messages.email.required)
    .nullable(),
  password: Yup.string().required(__messages.password.required).nullable(),
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////        API HELPERS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const udpateCustomerIdInCookie = (registeredId: number) => {
  const tempCustomerId = extractCookies(
    __Cookie.tempCustomerId,
    'browserCookie',
  ).tempCustomerId;

  if (tempCustomerId) {
    updateCartByNewUserId(+tempCustomerId, registeredId);
    deleteCookie(__Cookie.tempCustomerId);
  }
};

export const updateKlaviyo = (user: UserType) => {
  const userInfo = {
    $email: user.email,
    $first_name: user.firstname,
    $last_name: user.lastName,
    $phone_number: '',
    $organization: user.companyName,
    $title: 'title',
    $timestamp: new Date(),
  };

  KlaviyoScriptTag(['identify', userInfo]);
};

export const billingFields = (
  useShippingAddressForBilling: boolean,
  shipping: _CO7R_AddressFields,
  billing: CustomerAddress | null,
) => {
  if (useShippingAddressForBilling) {
    return {
      billingEqualsShipping: true,
      //
      billingFirstName: shipping.firstname,
      billingLastName: shipping.lastName,
      billingAddress1: shipping.address1,
      billingAddress2: shipping.address2,
      billingCity: shipping.city,
      billingState: shipping.state,
      billingZip: shipping.postalCode,
      billingCountry: shipping.countryName,
      billingPhone: shipping.phone,
      //
      billingCompany: '',
      billingSuite: '',
    };
  }

  return {
    billingEqualsShipping: false,
    //
    billingFirstName: billing!.firstname,
    billingLastName: billing!.lastName,
    billingAddress1: billing!.address1,
    billingAddress2: billing!.address2,
    billingCity: billing!.city,
    billingState: billing!.state,
    billingZip: billing!.postalCode,
    billingCountry: billing!.countryName,
    billingPhone: billing!.phone,
    //
    billingSuite: '',
    billingCompany: '',
  };
};

export const shippingFields = (address: _CO7R_AddressFields) => {
  return {
    shippingFirstName: address.firstname,
    shippingLastName: address.lastName,
    shippingAddress1: address.address1,
    shippingAddress2: address.address2,
    shippingCity: address.city,
    shippingState: address.state,
    shippingZip: address.postalCode,
    shippingCountry: address.countryName,
    shippingPhone: address.phone,
    //
    shippingCompany: '',
    shippingSuite: '',
  };
};

export const paymentFields = (payment: {
  creditCard: {
    nameOnCard: string;
    cardName: string;
    year: string;
    ccNumber: string;
    month: string;
    securityCode: string;
  };
  poNumber: string;
  method: 'PURCHASE_ORDER' | 'CREDIT_CARD';
}): {
  cardName: string;
  cardType: string;
  cardNumber: string;
  cardVarificationCode: string;
  cardExpirationMonth: string;
  cardExpirationYear: string;
  authorizationPNREF: string;
  paymentGateway: string;
  paymentMethod: string;
} => {
  if (payment.method === 'CREDIT_CARD') {
    return {
      authorizationPNREF: payment.poNumber,
      cardType: payment.creditCard.cardName,
      cardNumber: payment.creditCard.ccNumber,
      cardVarificationCode: payment.creditCard.securityCode,
      cardExpirationMonth: payment.creditCard.month,
      cardExpirationYear: payment.creditCard.year,
      cardName: payment.creditCard.nameOnCard,
      paymentMethod: PaymentMethod.CREDITCARD,
      paymentGateway: PaymentMethod.CHARGELOGIC,
    };
  }

  if (payment.method === 'PURCHASE_ORDER') {
    return {
      cardName: '',
      cardType: '',
      cardNumber: '',
      cardVarificationCode: '',
      cardExpirationMonth: '',
      cardExpirationYear: '',
      authorizationPNREF: payment.poNumber,
      paymentMethod: PaymentMethod.PREPAYMENT,
      paymentGateway: PaymentMethod.PREPAYMENT,
    };
  }

  return {
    cardName: '',
    cardType: '',
    cardNumber: '',
    cardVarificationCode: '',
    cardExpirationMonth: '',
    cardExpirationYear: '',
    authorizationPNREF: '',
    paymentGateway: '',
    paymentMethod: '',
  };
};

interface _Discount {
  coupon: string;
  amount: number;
  percentage: number;
  showTextFor3Sec: boolean;
}

export const couponFields = (
  discount: _Discount | null,
): {
  couponCode: string;
  couponDiscountAmount: number;
} => {
  return {
    couponCode: discount?.coupon || '',
    couponDiscountAmount: discount?.amount || 0,
  };
};

export const decideToAddOrUpdateTheAddress = async (
  payload: AddressAPIRequest,
  updateAddress: boolean,
) => {
  if (updateAddress) {
    return UpdateUserAddress(payload);
  }

  return CreateUserAddress(payload);
};
