import { CCmonths } from '@constants/common.constant';
import { useActions_v2 } from '@hooks_v2/index';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { getYears, initialMethod } from '../CO4_Extras';
import { CO4_CreditCardInput, CO4_CreditCardSelect } from './CO4_Inputs';
const next12Years = getYears(12);

interface _Props {
  methods: 'individual_cards' | 'bulk_payment' | 'both';
}

const creditCardValidationSchema = Yup.object().shape({
  ccNumber: Yup.string().length(16).required(),
  year: Yup.string().required(),
  month: Yup.string().required(),
  securityCode: Yup.string().length(3).required(),
});
const purchasingOrderValidationSchema = Yup.object().shape({
  poNumber: Yup.string().length(16).required(),
});

const CO4_PaymentMethods: React.FC<_Props> = ({ methods }) => {
  const showToggleOption = methods === 'both';

  const { update_PaymentDetails } = useActions_v2();
  const [methodToShow, setMethodToShow] = useState<
    'individual_cards' | 'bulk_payment'
  >(initialMethod(methods));

  const toggleMethod = () => {
    setMethodToShow((prevMethod) => {
      if (prevMethod === 'individual_cards') {
        return 'bulk_payment';
      }

      return 'individual_cards';
    });
  };

  const handlePoNumberSubmit = ({ poNumber }: { poNumber: string }) => {};

  const handleCCSubmit = (inputs: {
    year: '';
    ccNumber: '';
    month: '';
    securityCode: '';
  }) => {};

  return (
    <div>
      {showToggleOption && (
        <div className='flex justify-between items-center mt-[12px] mb-[12px] pb-[18px] border-b border-gray-border'>
          <div className='text-title-text font-semibold tracking-normal'>
            Payment
          </div>
          <div>
            <button
              onClick={() => toggleMethod()}
              className='!text-anchor hover:!text-anchor-hover underline'
              id='btn-use-purchase-order'
            >
              {methodToShow === 'individual_cards'
                ? 'Use Purchase Order'
                : 'Use Credit Card'}
            </button>
          </div>
        </div>
      )}
      {methodToShow === 'individual_cards' && (
        <Formik
          initialValues={{
            year: '',
            ccNumber: '',
            month: '',
            securityCode: '',
          }}
          onSubmit={handleCCSubmit}
          validationSchema={creditCardValidationSchema}
          validateOnBlur
        >
          {({
            values,
            handleBlur,
            handleChange,
            setFieldValue,
            submitForm,
          }) => {
            return (
              <Form>
                <CO4_CreditCardInput
                  type={'text'}
                  name={'ccNumber'}
                  label={'Credit Card Number'}
                  required={true}
                  value={values.ccNumber}
                  onBlur={(event) => {
                    handleBlur(event);
                    submitForm();
                  }}
                  max={16}
                  setFieldValue={setFieldValue}
                  onChange={handleChange}
                  isCreditCard
                  error={true}
                />
                <div className='flex flex-wrap -mx-3 md:gap-y-6'>
                  <div className='md:w-3/12 w-6/12 pl-[12px] pr-[12px]'>
                    <CO4_CreditCardSelect
                      name={'month'}
                      label={'Month'}
                      required={true}
                      value={values.month}
                      onBlur={(event) => {
                        handleBlur(event);
                        submitForm();
                      }}
                      onChange={handleChange}
                      options={CCmonths}
                      setFieldValue={setFieldValue}
                      error={true}
                    />
                  </div>
                  <div className='md:w-3/12 w-6/12 pl-[12px] pr-[12px]'>
                    <CO4_CreditCardSelect
                      name={'year'}
                      label={'Year'}
                      required={true}
                      value={values.year}
                      onBlur={(event) => {
                        handleBlur(event);
                        submitForm();
                      }}
                      onChange={handleChange}
                      options={next12Years}
                      setFieldValue={setFieldValue}
                      error={true}
                    />
                  </div>
                  <div className='md:w-6/12 w-full pl-[12px] pr-[12px]'>
                    <CO4_CreditCardInput
                      type={'text'}
                      setFieldValue={setFieldValue}
                      name={'securityCode'}
                      label={'Security Code (CCV)'}
                      required={true}
                      value={values.securityCode}
                      onBlur={(event) => {
                        handleBlur(event);
                        submitForm();
                      }}
                      onChange={handleChange}
                      error={true}
                      max={3}
                    />
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      )}
      {methodToShow === 'bulk_payment' && (
        <>
          <Formik
            initialValues={{ poNumber: '' }}
            onSubmit={handlePoNumberSubmit}
            validationSchema={purchasingOrderValidationSchema}
          >
            {({ values, handleBlur, handleChange, submitForm }) => {
              return (
                <Form>
                  <div className='relative z-0 w-full mb-[20px] border border-gray-border rounded'>
                    <input
                      name='poNumber'
                      type='number'
                      placeholder=' '
                      onChange={handleChange}
                      onBlur={(event) => {
                        handleBlur(event);
                        submitForm();
                      }}
                      value={values.poNumber}
                      className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
                    />
                    <label
                      htmlFor='poNumber'
                      className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
                    >
                      Enter PO Number *
                    </label>
                  </div>
                  <div className='text-base'>
                    Please enter your PO Number. We will contact you to confirm
                    details of your payment.
                  </div>
                </Form>
              );
            }}
          </Formik>
        </>
      )}
    </div>
  );
};

export default CO4_PaymentMethods;
