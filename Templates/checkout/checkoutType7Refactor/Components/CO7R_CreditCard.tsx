import NxtImage from '@appComponents/reUsable/Image';
import { cardType } from '@constants/common.constant';
import { isNumberKey } from '@helpers/common.helper';

import { FormikErrors, FormikTouched } from 'formik';
import React from 'react';
import {
  _CO7R_CreditCardFields,
  detectCardIssuer,
  maxLengthCalculator,
} from '../CO7R_Extras';
import { CO7R_CreditCardInput, CO7R_Input } from './CO7R_Inputs';

interface _CustomEvent extends Event {
  inputType: 'deleteContentBackward';
}

interface _Props {
  values: _CO7R_CreditCardFields;
  handleChange(e: React.ChangeEvent<any>): void;
  handleBlur(e: React.FocusEvent<any, Element>): void;
  touched: FormikTouched<_CO7R_CreditCardFields>;
  errors: FormikErrors<_CO7R_CreditCardFields>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<_CO7R_CreditCardFields>>;
  setFieldTouched: (
    field: string,
    touched?: boolean | undefined,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<_CO7R_CreditCardFields>>;
  setFieldError: (field: string, value: string | undefined) => void;
}

const CO7R_CreditCard: React.FC<_Props> = ({
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

  const handleExpiryMonth = (event: React.FocusEvent<any, Element>) => {
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
        <CO7R_Input
          label='Name On Card'
          additionalClass={'md:w-6/12'}
          type={'text'}
          name={'nameOnCard'}
          required={true}
          value={values.nameOnCard}
          onChange={(e) => {
            if (
              (e.nativeEvent as _CustomEvent).inputType ===
              'deleteContentBackward'
            ) {
              if (e.currentTarget.value === '') {
                setFieldValue('ccNumber', '');
                setFieldValue('expiryMonth', '');
                setFieldValue('expiryYear', '');
                setFieldValue('cvc', '');
              }
            }
            handleChange(e);
          }}
          autoComplete='cc-name'
          onBlur={handleBlur}
          touched={!!touched.nameOnCard}
          error={errors?.nameOnCard ? errors.nameOnCard : null}
        />
        <CO7R_Input
          label='Credit Card Number'
          additionalClass={'md:w-6/12'}
          type={'text'}
          name={'ccNumber'}
          autoComplete='cc-number'
          required={true}
          length={maxLengthCalculator('ccNumber', values.ccNumber)}
          value={values.ccNumber}
          onChange={(e) => {
            if (
              (e.nativeEvent as _CustomEvent).inputType ===
              'deleteContentBackward'
            ) {
              if (e.currentTarget.value === '') {
                setFieldValue('expiryMonth', '');
                setFieldValue('expiryYear', '');
                setFieldValue('cvc', '');
              }
            }
            handleChange(e);
          }}
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
        </CO7R_Input>
      </div>
      <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
        <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
          <label className='mb-[4px] text-normal-text'>Expiration Date*</label>
          <div className='flex items-center justify-start'>
            <CO7R_CreditCardInput
              value={values.expiryMonth}
              onChange={handleExpiryMonthOnChange}
              name={'expiryMonth'}
              autoComplete='cc-exp-month'
              onBlur={handleExpiryMonth}
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
            <CO7R_CreditCardInput
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
        <CO7R_Input
          label='Security Code(CVV/CVC)'
          additionalClass={'md:w-6/12'}
          type={'text'}
          autoComplete='cc-csc'
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

export default CO7R_CreditCard;
