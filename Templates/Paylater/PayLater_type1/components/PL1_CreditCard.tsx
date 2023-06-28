import NxtImage from '@appComponents/reUsable/Image';
import { cardType } from '@constants/common.constant';
import { __pagesText } from '@constants/pages.text';
import { isNumberKey } from '@helpers/common.helper';
import { useActions_v2 } from '@hooks_v2/index';
import { detectCardIssuer } from '@templates/checkout/checkoutType4/CO4_Extras';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

const creditCardValidationSchema = Yup.object().shape({
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

      if (cardType === 'AMEX') {
        return cardLength === 15;
      }

      if (
        cardType === 'MASTERCARD' ||
        cardType === 'DISCOVER' ||
        cardType === 'VISA'
      ) {
        return cardLength === 16;
      }

      return true;
    }),
  year: Yup.string()
    .trim()
    .length(4)
    .required()
    .test('valid-expiry-year', 'Some message', function (enteredYear) {
      if (!enteredYear) {
        return false;
      }

      const currentYear = new Date().getFullYear().toString().slice(-2);

      if (+enteredYear >= +currentYear) {
        return true;
      }

      return false;
    }),
  month: Yup.string()
    .trim()
    .min(1)
    .max(2)
    .required()
    .test('valid-expiry-year', 'Some message', function (enteredMonth) {
      if (!enteredMonth) {
        return false;
      }
      const currentYear = new Date().getFullYear().toString().slice(-2);
      const currentMonth = new Date().getMonth() + 1;

      if (this.parent.expiredYear < currentYear) {
        return false;
      }

      if (this.parent.expiryYear === currentYear) {
        if (+enteredMonth > currentMonth) {
          return true;
        }
        return false;
      }

      return true;
    }),
  securityCode: Yup.string()
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
      }
      if (cvcLength === 3) {
        return true;
      }
      return false;
    }),
});

const PL1_CreditCard: React.FC<{ allowPO: boolean }> = ({ allowPO }) => {
  const { update_PaymentDetails } = useActions_v2();
  const [showCardHelp, setShowCardHelp] = useState(false);

  const handleCCSubmit = (inputs: {
    type: string;
    year: string;
    ccNumber: string;
    month: string;
    securityCode: string;
  }) => {
    update_PaymentDetails({
      method: 'individual_cards',
      data: {
        nameOnCard: '',
        cardName: detectCardIssuer(inputs.ccNumber),
        year: inputs.year,
        month: inputs.month,
        ccNumber: inputs.ccNumber,
        securityCode: inputs.securityCode,
      },
    });
  };

  return (
    <div id='PaymentCard'>
      <Formik
        initialValues={{
          type: '',
          year: '',
          ccNumber: '',
          month: '',
          securityCode: '',
        }}
        onSubmit={handleCCSubmit}
        validationSchema={creditCardValidationSchema}
        validateOnBlur
      >
        {({ values, handleBlur, handleChange, submitForm }) => {
          return (
            <Form>
              <div className='flex flex-wrap items-center justify-between pt-[10px] border-b border-[#ececec]'>
                <div className='pb-[10px] text-title-text'>Payment</div>
                <div className=''>
                  {allowPO && (
                    <div className='w-full flex justify-end'>
                      <button
                        className='!text-anchor hover:!text-anchor-hover underline'
                        id='btn-use-purchase-order'
                        onClick={() => {
                          update_PaymentDetails({
                            method: 'CHANGED',
                            type: 'PURCHASE_ORDER',
                          });
                        }}
                      >
                        Use Purchase Order
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className='pt-[15px]'>
                <div
                  className={`relative z-0 w-full mb-[20px] border border-gray-border rounded `}
                >
                  <input
                    required={true}
                    autoComplete='off'
                    onContextMenu={(e) => e.preventDefault()}
                    onBlur={(event) => {
                      handleBlur(event);
                      submitForm();
                    }}
                    onChange={(event) => {
                      if (isNumberKey(event)) {
                        handleChange(event);
                      }
                    }}
                    name='ccNumber'
                    placeholder=''
                    value={values.ccNumber}
                    maxLength={
                      detectCardIssuer(values.ccNumber) === 'AMEX' ? 15 : 16
                    }
                    className='apperance pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
                  />
                  <label
                    htmlFor='CreditCardNumber'
                    className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
                  >
                    Credit Card Number *
                  </label>
                  <div
                    className={`${
                      values.ccNumber.length === 0 ? 'block' : 'hidden'
                    }`}
                  >
                    <div className='absolute top-[14px] right-[8px] flex items-center'>
                      {cardType.map((res) => (
                        <div
                          key={res.name}
                          className={`opacity-70 ml-[4px] w-[32px]`}
                        >
                          <NxtImage
                            isStatic={true}
                            className=''
                            src={res.url}
                            alt=''
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    className={`${
                      values.ccNumber.length > 0 ? 'block' : 'hidden'
                    }`}
                  >
                    <div className='absolute top-[14px] right-[8px] flex items-center'>
                      {cardType.map((res) => (
                        <div
                          key={res.name}
                          className={`opacity-${
                            detectCardIssuer(values.ccNumber) === res.name
                              ? '1 block'
                              : '40 hidden'
                          } ml-[4px] w-[32px]`}
                        >
                          <NxtImage
                            isStatic={true}
                            className=''
                            src={res.url}
                            alt=''
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`flex flex-wrap -mx-3`}>
                  <div className='md:w-6/12 w-6/12 pl-[12px] pr-[12px]'>
                    <div className='relative z-0 w-full mb-[20px] border border-gray-border rounded'>
                      <select
                        onBlur={(event) => {
                          handleBlur(event);
                          submitForm();
                        }}
                        onChange={handleChange}
                        name='month'
                        value={values.month}
                        className='selectFiled pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
                      >
                        <option value=''></option>
                        {new Array(12).fill('').map((_, index) => {
                          const selected =
                            values.year.length > 0
                              ? index + 1 === +values.year
                              : false;

                          if (selected) {
                            return (
                              <option key={index} value={index + 1} selected>
                                {index + 1}
                              </option>
                            );
                          }
                          return (
                            <option key={index} value={index + 1}>
                              {index + 1}
                            </option>
                          );
                        })}
                      </select>
                      <label
                        htmlFor='month'
                        className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
                      >
                        Month *
                      </label>
                    </div>
                  </div>
                  <div className='md:w-6/12 w-6/12 pl-[12px] pr-[12px]'>
                    <div className='relative z-0 w-full mb-[20px] border border-gray-border rounded'>
                      <select
                        onBlur={(event) => {
                          handleBlur(event);
                          submitForm();
                        }}
                        onChange={handleChange}
                        name='year'
                        value={values.year}
                        data-value={values.year}
                        className='selectFiled pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
                      >
                        <option value=''></option>
                        {new Array(12).fill('').map((_, index) => {
                          const optin = new Date().getFullYear() + index;
                          const selected =
                            values.year.length > 0
                              ? optin === +values.year
                              : false;
                          if (selected) {
                            return (
                              <option key={index} value={optin} selected>
                                {optin}
                              </option>
                            );
                          }
                          return (
                            <option key={index} value={optin}>
                              {optin}
                            </option>
                          );
                        })}
                      </select>
                      <label
                        htmlFor='Year'
                        className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
                      >
                        Year *
                      </label>
                    </div>
                  </div>
                  <div className='w-full pl-[12px] pr-[12px]'>
                    <div className='relative z-0 w-full mb-[20px] border border-gray-border rounded'>
                      <input
                        onBlur={(event) => {
                          handleBlur(event);
                          submitForm();
                        }}
                        onChange={(event) => {
                          if (isNumberKey(event)) {
                            handleChange(event);
                            setTimeout(() => {
                              submitForm();
                            }, 240);
                          }
                        }}
                        name='securityCode'
                        placeholder=''
                        required={true}
                        maxLength={
                          detectCardIssuer(values.ccNumber) === 'AMEX' ? 4 : 3
                        }
                        value={values.securityCode}
                        className='apperance  pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
                      />
                      <label
                        htmlFor='SecurityCode'
                        className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
                      >
                        Security Code (CCV) *
                      </label>
                      <div className='absolute top-[12px] right-[8px]'>
                        <div className='relative' x-data='{ open: false }'>
                          <button className='' aria-haspopup='true'></button>
                          <span
                            onMouseEnter={() => setShowCardHelp(true)}
                            onMouseLeave={() => setShowCardHelp(false)}
                            className='material-icons-outlined text-base text-anchor'
                          >
                            help
                          </span>
                          <div className='z-10 absolute bottom-full left-1/2 transform -translate-x-1/2'>
                            <div
                              className='bg-slate-800 p-2 rounded overflow-hidden mb-2'
                              style={{
                                display: showCardHelp ? 'block' : 'none',
                              }}
                            >
                              <div className='text-xs text-gray-200 font-light'>
                                {__pagesText.CheckoutPage.cardInstruction}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PL1_CreditCard;
