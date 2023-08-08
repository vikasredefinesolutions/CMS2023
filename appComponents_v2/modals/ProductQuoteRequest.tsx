import ProductQuoteRequestInput from '@appComponents/reUsable/ProductQuoteRequestInput';
import {
  phonePattern1,
  phonePattern2,
  phonePattern3,
  phonePattern4,
} from '@constants/global.constant';
import { CommanMessage } from '@constants/successErrorMessages.constant';
import {
  __QuoteRequestMessages,
  __ValidationText,
} from '@constants/validation.text';
import { _ContactRequest } from '@definations/contactRequest.type';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { SendAsync } from '@utils/axios.util';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import * as Yup from 'yup';
import { _modals } from './modal';
// import ProductQuoteRequestInput from './ProductQuoteRequestInput';

type __QuoteRequest = {
  name: string;
  email: string;
  organization: string;
  sport: string;
  phoneNumber: string;
  additionalInformation: string;
};

const __QuoteRequestInitials: __QuoteRequest = {
  name: '',
  email: '',
  organization: '',
  sport: '',
  phoneNumber: '',
  additionalInformation: '',
};

const __QuoteRequestSchema = Yup.object().shape({
  name: Yup.string().required(__QuoteRequestMessages.name.required),
  email: Yup.string().required(__QuoteRequestMessages.email.required),
  phoneNumber: Yup.string()
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
        )
          return true;
        return false;
      },
    ),

  organization: Yup.string().required(
    __QuoteRequestMessages.organization.required,
  ),
  sport: Yup.string().required(__QuoteRequestMessages.sport.required),
});

interface _props {
  // eslint-disable-next-line no-unused-vars
  modalHandler: (param: null | _modals) => void;
  product?: string | undefined;
  productColor?: string | undefined;
}

const ProductQuoteRequest: React.FC<_props> = ({
  modalHandler,
  product,
  productColor,
}) => {
  const [verifiedRecaptch, setverifiedRecaptch] = useState(false);
  const { name } = useTypedSelector_v2((state) => state.product.product);
  const { setShowLoader, showModal } = useActions_v2();
  const { id: storeId } = useTypedSelector_v2((state) => state.store);

  const productName = product ? product : name;
  const quoteRequestHandler = (value: any) => {
    const payload: _ContactRequest = {
      contactUsModel: {
        id: 0,
        rowVersion: ' ',
        location: ' ',
        ipAddress: '192.168.1.1',
        macAddress: '00-00-00-00-00-00',
        name: value?.name,
        email: value.email,
        subject: ' ',
        companyName: value?.companyName,
        address: ' ',
        city: ' ',
        county: ' ',
        state: ' ',
        zipCode: ' ',
        phone: '',
        comment: value.additionalInformation,
        storeId: storeId,
        recStatus: ' ',
      },
    };
    const createContactUs = async (payload: _ContactRequest) => {
      setShowLoader(true);

      const url = `/ContactUs/CreateContactUs.json`;
      const res = await SendAsync({
        url: url,
        method: 'POST',
        data: payload,
      })
        .then((res) => {
          if (res) {
            showModal({
              message:
                'A dedicated member of our team will be in touch regarding your request within 2 business days.',
              title: 'THANK YOU',
            });
            window.location.reload();
          }
        })
        .catch((err) => {
          showModal({ message: CommanMessage.Failed, title: 'Failed' });
        })
        .finally(() => {
          setShowLoader(false);
        });
      return res;
    };
    createContactUs(payload);

    modalHandler(null);
  };
  function onChange(value: any) {
    setverifiedRecaptch(true);
  }

  return (
    <div
      id='QuoteRequestModal'
      aria-hidden='true'
      className=' overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal h-full inset-0'
    >
      <div className='w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
        <div className='relative px-4 w-full max-w-2xl h-fullborder border-neutral-200 inline-block h-auto'>
          <Formik
            initialValues={__QuoteRequestInitials}
            onSubmit={quoteRequestHandler}
            validationSchema={__QuoteRequestSchema}
          >
            {({ values, handleChange }) => {
              return (
                <Form>
                  <div className='relative bg-white rounded-lg shadow max-h-screen overflow-y-auto'>
                    <div className='flex justify-between items-center p-5 rounded-t border-b sticky top-0 left-0 bg-white'>
                      <div className='text-xl font-semibold text-gray-900 lg:text-2xl login-top-title'>
                        Contact us
                      </div>
                      <div className='flex items-center gap-x-2'>
                        <button
                          type='button'
                          className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
                          onClick={() => modalHandler(null)}
                        >
                          <svg
                            className='w-5 h-5'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              fillRule='evenodd'
                              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                              clipRule='evenodd'
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className='p-[25px]'>
                      <div className='mb-6 medium-text text-left font-bold'>
                        Product Name :{productName}
                      </div>
                      {productColor && (
                        <div className='mb-6 medium-text text-left font-bold'>
                          Color :{productColor}
                        </div>
                      )}
                      <div className='flex flex-wrap -mx-3 gap-y-6 text-left font-bold'>
                        <ProductQuoteRequestInput
                          label={'Name'}
                          placeHolder={'Name'}
                          value={values.name}
                          name={'name'}
                          onChange={handleChange}
                          type={'text'}
                          required={true}
                          containerClass={'w-full px-3'}
                        />
                        <ProductQuoteRequestInput
                          label={'Email'}
                          placeHolder={'Your Email Address'}
                          value={values.email}
                          name={'email'}
                          onChange={handleChange}
                          type={'text'}
                          required={true}
                          containerClass={'w-full px-3'}
                        />
                        <ProductQuoteRequestInput
                          label={'School/Organization'}
                          placeHolder={'Your School/Organization'}
                          value={values.organization}
                          name={'organization'}
                          onChange={handleChange}
                          type={'text'}
                          required={true}
                          containerClass={'w-full px-3'}
                        />
                        <ProductQuoteRequestInput
                          label={'Sport'}
                          placeHolder={'Your Sport'}
                          value={values.sport}
                          name={'sport'}
                          onChange={handleChange}
                          type={'text'}
                          required={true}
                          containerClass={'w-full px-3'}
                        />
                        <ProductQuoteRequestInput
                          label={'Phone Number'}
                          placeHolder={'Your Phone'}
                          value={values.phoneNumber}
                          name={'phoneNumber'}
                          onChange={handleChange}
                          type={'number'}
                          required={true}
                          containerClass={'w-full px-3'}
                        />
                        <ProductQuoteRequestInput
                          label={'Additional Information'}
                          placeHolder={'Enter Additional Information'}
                          value={values.additionalInformation}
                          name={'additionalInformation'}
                          onChange={handleChange}
                          type={'textArea'}
                          required={false}
                          containerClass={'w-full px-3 '}
                        />
                        <ReCAPTCHA
                          className='w-full px-3'
                          sitekey={
                            process.env.NEXT_PUBLIC_RECAPTCHASITEKEY || ''
                          }
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className='flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200'>
                      <button
                        type='button'
                        className='btn btn-primary'
                        onClick={() => modalHandler(null)}
                      >
                        Close
                      </button>
                      <button
                        type='submit'
                        className={`btn btn-secondary ${
                          verifiedRecaptch ? '' : 'opacity-50'
                        }  `}
                        disabled={!verifiedRecaptch}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ProductQuoteRequest;
