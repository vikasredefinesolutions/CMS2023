import NxtImage from '@appComponents/reUsable/Image';
import { cardType } from '@constants/common.constant';
import { isNumberKey } from '@helpers/common.helper';
import {
  _CO6_CreditCardFields,
  detectCardIssuer,
  maxLengthCalculator,
} from '@templates/checkout/checkoutType6/CO6_Extras';
import {
  CO6_CreditCardInput,
  CO6_Input,
} from '@templates/checkout/checkoutType6/Components/CO6_Inputs';
import { FormikErrors, FormikTouched } from 'formik';
import React from 'react';

interface _Props {
  values: _CO6_CreditCardFields;
  handleChange(e: React.ChangeEvent<any>): void;
  handleBlur(e: React.FocusEvent<any, Element>): void;
  touched: FormikTouched<_CO6_CreditCardFields>;
  errors: FormikErrors<_CO6_CreditCardFields>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<_CO6_CreditCardFields>>;
  setFieldTouched: (
    field: string,
    touched?: boolean | undefined,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<_CO6_CreditCardFields>>;
  setFieldError: (field: string, value: string | undefined) => void;
}

const CO6_CreditCard: React.FC<_Props> = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
}) => {
  const expiredDateErrorMsg = () => {
    const expiredYear =
      (!!touched.expiryYear && values.expiryYear === '') ||
      (!!touched.expiryYear && !!errors.expiryYear);

    const expiredMonth =
      (!!touched.expiryMonth && values.expiryMonth === '') ||
      (!!touched.expiryMonth && !!errors.expiryMonth);

    if (expiredMonth || expiredYear) {
      return 'The date your card expires, typically on the front of your card.';
    }

    return '';
  };

  const handleExpiryMonthOnChange = (event: React.ChangeEvent<any>) => {
    const month = +event.target.value;
    if (event.target.value.trim().length === 1 && month > 1) {
      setFieldValue('expiryMonth', `0` + month);
      return;
    }

    handleChange(event);
  };

  const handleExpiryMonthOnBlur = (event: React.FocusEvent<any, Element>) => {
    const month = +event.target.value;

    if (event.target.value.trim().length === 1) {
      setFieldValue('expiryMonth', `0` + month);
    }

    if (month < 1) {
      setFieldValue('expiryMonth', '01');
    }

    if (month > 12) {
      setFieldValue('expiryMonth', '12');
    }

    handleBlur(event);
  };

  return (
    <div id='CreditCardDetails'>
      <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
        <CO6_Input
          label='Name On Card'
          additionalClass={'md:w-6/12'}
          type={'text'}
          name={'nameOnCard'}
          required={true}
          value={values.nameOnCard}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete='cc-name'
          touched={!!touched.nameOnCard}
          error={errors?.nameOnCard ? errors.nameOnCard : null}
        />
        <CO6_Input
          label='Credit Card Number'
          additionalClass={'md:w-6/12'}
          type={'text'}
          autoComplete='cc-number'
          name={'ccNumber'}
          required={true}
          length={maxLengthCalculator('ccNumber', values.ccNumber)}
          value={values.ccNumber}
          onChange={handleChange}
          creditCard={true}
          onBlur={handleBlur}
          touched={!!touched.ccNumber}
          error={errors?.ccNumber ? errors.ccNumber : null}
        >
          {cardType.map((res) => {
            if (detectCardIssuer(values.ccNumber) !== res.name) return null;

            return (
              <div
                key={res.name}
                className={`opacity-1 absolute right-11 block ml-[4px] top-1 w-[48px] mr-[4px]"`}
              >
                <NxtImage isStatic={true} className='' src={res.url} alt='' />
              </div>
            );
          })}
        </CO6_Input>
      </div>
      <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
        <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
          <label className='mb-[4px] text-normal-text'>Expiration Date*</label>
          <div className='flex items-center justify-start'>
            <CO6_CreditCardInput
              value={values.expiryMonth}
              autoComplete='cc-exp-month'
              onChange={handleExpiryMonthOnChange}
              name={'expiryMonth'}
              onBlur={handleExpiryMonthOnBlur}
              valid={
                !!touched.expiryMonth &&
                values.expiryMonth !== '' &&
                errors?.expiryMonth === undefined
              }
              inValid={
                (!!touched.expiryMonth && values.expiryMonth === '') ||
                (!!touched.expiryMonth && !!errors.expiryMonth)
              }
            />
            <div className='ml-[5px] mr-[5px]'>/</div>
            <CO6_CreditCardInput
              value={values.expiryYear}
              onChange={handleChange}
              name={'expiryYear'}
              onBlur={handleBlur}
              autoComplete='cc-exp-year'
              valid={
                !!touched.expiryYear &&
                values.expiryYear !== '' &&
                errors?.expiryYear === undefined
              }
              inValid={
                (!!touched.expiryYear && values.expiryYear === '') ||
                (!!touched.expiryYear && !!errors.expiryYear)
              }
            />
          </div>
          {expiredDateErrorMsg()}
        </div>
        <CO6_Input
          label='Security Code(CVV/CVC)'
          additionalClass={'md:w-6/12'}
          type={'text'}
          autoComplete=''
          name={'cvc'}
          required={true}
          value={values.cvc}
          length={maxLengthCalculator('cvc', values.ccNumber)}
          onChange={(event) => {
            if (isNumberKey(event)) {
              handleChange(event);
            }
          }}
          onBlur={handleBlur}
          touched={!!touched.cvc}
          error={errors?.cvc ? errors.cvc : null}
        />
      </div>
    </div>
  );
};

export default CO6_CreditCard;
