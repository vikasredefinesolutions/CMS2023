import getLocation from '@helpers/getLocation';
import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ErrorMessage, Form, Formik } from 'formik';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import * as Yup from 'yup';

import {
  phonePattern1,
  phonePattern2,
  phonePattern3,
  phonePattern4,
} from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { __ValidationText } from '@constants/validation.text';
import { _SubmitConsultationPayload } from '@definations/requestConsultation.type';
import { SumbitRequestConsultationDetails } from '@services/product.service';
import Ecommerce_RequestSubmitted from './Ecommerce_RequestSubmitted';
import RequestInput from './RequestInput';
import RequestSelect from './RequestSelect';

type _RequestConsultation = {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  preferedContactMethod: '' | 'MOBILE' | 'EMAIL';
  inHandDate: string;
  message: string;
};

const _RequestConsulationSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.firstName.required)
    .min(__ValidationText.requestConsultation.firstName.minLength)
    .max(__ValidationText.requestConsultation.firstName.maxLength),

  lastName: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.lastName.required)
    .min(__ValidationText.requestConsultation.lastName.minLength)
    .max(__ValidationText.requestConsultation.lastName.maxLength),
  companyName: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.companyName.required)
    .min(__ValidationText.requestConsultation.companyName.minLength)
    .max(__ValidationText.requestConsultation.companyName.maxLength),
  email: Yup.string()
    .trim()
    .email(__ValidationText.requestConsultation.email.validRequest)
    .required(__ValidationText.requestConsultation.email.required),
  phone: Yup.string()
    .required(__ValidationText.requestConsultation.phone.required)
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
  preferedContactMethod: Yup.string().required(
    __ValidationText.requestConsultation.preferedContactMethod,
  ),
  inHandDate: Yup.date()
    .typeError(__ValidationText.requestConsultation.inHandDate.typeError)
    .required(__ValidationText.requestConsultation.inHandDate.required)
    .min(new Date(), __ValidationText.requestConsultation.inHandDate.min),

  message: Yup.string(),
});
const _RequestConsultationInitials: _RequestConsultation = {
  firstName: '',
  lastName: '',
  companyName: '',
  email: '',
  phone: '',
  preferedContactMethod: '',
  inHandDate: '',
  message: '',
};

const RequestConsultationForm: React.FC<{
  productId: number;
  innerHeading: boolean;
}> = ({ productId, innerHeading = false }) => {
  const router = useRouter();
  const [captchaVerified, setverifiedRecaptch] = useState<
    'NOT_VALID' | null | 'VALID'
  >(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const { setShowLoader, showModal } = useActions_v2();
  const { id: storeId } = useTypedSelector_v2((state) => state.store);

  const captchaHandler = (value: any) => {
    setverifiedRecaptch('VALID');
  };

  const submitHandler = async (value: _RequestConsultation) => {
    if (!captchaVerified || captchaVerified === 'NOT_VALID') {
      setverifiedRecaptch('NOT_VALID');
      return;
    }
    setShowLoader(true);

    const location = await getLocation();

    const payload: _SubmitConsultationPayload = {
      consultationModel: {
        id: 0,
        rowVersion: '',
        location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
        ipAddress: location.ip_address,
        macAddress: '00-00-00-00-00-00',
        storeId: storeId!,
        productId: productId,
        firstname: value.firstName,
        lastname: value.lastName,
        company: value.companyName,
        email: value.email,
        phone: value.phone,
        contactMethod: value.preferedContactMethod === 'EMAIL' ? 0 : 1,
        desiredQuantity: 0,
        inHandsDate: value.inHandDate,
        logoUrl: '',
        message: value.message,
        recStatus: 'A',
        status: '',
      },
    };

    SumbitRequestConsultationDetails(payload)
      .then((res) => {
        setFormSubmitted(true);
      })
      .finally(() => setShowLoader(false));
    setFormSubmitted(true);
  };

  return (
    <>
      {formSubmitted ? (
        <Ecommerce_RequestSubmitted />
      ) : (
        <Formik
          initialValues={_RequestConsultationInitials}
          onSubmit={submitHandler}
          validationSchema={_RequestConsulationSchema}
        >
          {({ values, handleChange, setFieldValue }) => {
            return (
              <Form>
                <div className='my-[10px]'>
                  <div className='container mx-auto'>
                    <div className='flex items-stretch flex-wrap'>
                      <div className='w-full'>
                        <div className='font-semibold mb-[18px] text-[36px] leading-[40px] text-center mt-[15px]'>
                          {__pagesText.requestConsultation.heading}
                        </div>
                        <div className='p-[15px] border border-gray-border'>
                          <div className='bg-light-gray text text-[18px] leading-[36px] h-[36px] block font-semibold px-[15px] mb-[15px]'>
                            {__pagesText.requestConsultation.contactInformation}
                          </div>
                          <div className='mb-[15px]'>
                            <RequestInput
                              placeHolder={'First Name'}
                              name={'firstName'}
                              value={values.firstName}
                              onChange={handleChange}
                              type={'text'}
                              required={true}
                              className={
                                'p-[10px] rounded-md border-gray-border border w-full focus:border-black focus:outline-none'
                              }
                            />
                          </div>
                          <div className='mb-[15px]'>
                            <RequestInput
                              placeHolder={'Last Name'}
                              name={'lastName'}
                              value={values.lastName}
                              onChange={handleChange}
                              type={'text'}
                              required={true}
                              className={
                                'p-[10px] rounded-md border-gray-border border w-full focus:border-black focus:outline-none'
                              }
                            />
                          </div>
                          <div className='mb-[15px]'>
                            <RequestInput
                              placeHolder={'Company'}
                              name={'companyName'}
                              value={values.companyName}
                              onChange={handleChange}
                              type={'text'}
                              required={true}
                              className={
                                'p-[10px] rounded-md border-gray-border border w-full focus:border-black focus:outline-none'
                              }
                            />
                          </div>
                          <div className='mb-[15px]'>
                            <RequestInput
                              placeHolder={'Email'}
                              name={'email'}
                              value={values.email}
                              onChange={handleChange}
                              type={'text'}
                              required={true}
                              className={
                                'p-[10px] rounded-md border-gray-border border w-full focus:border-black focus:outline-none'
                              }
                            />
                          </div>
                          <div className='mb-[15px]'>
                            <RequestInput
                              placeHolder={'Phone'}
                              name={'phone'}
                              value={values.phone}
                              onChange={handleChange}
                              type={'text'}
                              required={true}
                              className={
                                'p-[10px] rounded-md border-gray-border border w-full focus:border-black focus:outline-none'
                              }
                            />
                          </div>

                          <div className='mb-[15px]'>
                            <RequestSelect
                              placeHolder={'Select Prefered Contact Method'}
                              name={'preferedContactMethod'}
                              value={values.preferedContactMethod}
                              options={[
                                { id: 'PHONE', name: 'Phone' },
                                { id: 'EMAIL', name: 'Email' },
                              ]}
                              onChange={(event) =>
                                setFieldValue(
                                  'preferedContactMethod',
                                  event.target.value,
                                )
                              }
                              required={true}
                              className={
                                'p-[10px] rounded-md border-gray-border border w-full focus:border-black focus:outline-none'
                              }
                            />
                          </div>
                          <div className='mb-[15px] flex flex-wrap items-center'>
                            <div className='mr-[15px]'>In Hands Date:</div>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DesktopDatePicker
                                inputFormat='MM/DD/YYYY'
                                value={values.inHandDate}
                                onChange={(event: any) => {
                                  event && event['$d'] !== null
                                    ? setFieldValue('inHandDate', event['$d'])
                                    : '';
                                }}
                                disableHighlightToday={true}
                                disablePast={true}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                              <ErrorMessage
                                name={'inHandDate'}
                                className='text-rose-500'
                                component={'p'}
                              />
                            </LocalizationProvider>
                          </div>
                          <div className='mb-[15px]'>
                            <textarea
                              placeholder='Message here'
                              className='p-[10px] rounded-md border-gray-border border w-full focus:border-black focus:outline-none'
                              name={'message'}
                              value={values.message}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                          <div className='mb-[15px]'>
                            <ReCAPTCHA
                              className='max-w-xs w-full'
                              sitekey={
                                process.env.NEXT_PUBLIC_RECAPTCHASITEKEY || ''
                              }
                              onChange={captchaHandler}
                            />
                            {captchaVerified === 'NOT_VALID' && (
                              <p className='text-rose-500'>
                                {
                                  __pagesText.requestConsultation
                                    .captchaNotValid
                                }
                              </p>
                            )}
                          </div>
                          <div className='mb-[15px]'>
                            <button
                              type='submit'
                              className={
                                'btn btn-xl btn-secondary text-center w-full'
                              }
                            >
                              SUBMIT
                            </button>
                          </div>
                          <div className='mb-[15px] text-center'>
                            <button
                              type='button'
                              className='font-[600] text-center underline text-medium-text text-anchor'
                              onClick={() => router.back()}
                            >
                              Cancel
                            </button>
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
      )}
    </>
  );
};

export default RequestConsultationForm;
