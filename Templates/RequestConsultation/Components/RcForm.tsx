import { __pagesConstant } from '@constants/pages.constant';
import { __ValidationText } from '@constants/validation.text';
import getLocation from '@helpers/getLocation';

import {
  phonePattern1,
  phonePattern2,
  phonePattern3,
  phonePattern4,
} from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { UploadImage } from '@services/file.service';
import { SumbitRequestConsultationDetails } from '@services/product.service';
import { Form, Formik } from 'formik';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { _globalStore } from 'store.global';
import * as Yup from 'yup';
import {
  _RequestConsultation,
  _SubmitConsultationPayload,
} from '../requestConsultation';
import RcDate from './RcDate';
import RcInput from './RcInput';
import RcRequestDone from './RcRequestDone';
import RcSelect from './RcSelect';

const _RequestConsultationInitials: _RequestConsultation = {
  firstName: '',
  lastName: '',
  companyName: '',
  email: '',
  phone: '',
  preferedContactMethod: '',
  desiredQty: 0,
  inHandDate: '',
  message: '',
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
  desiredQty: Yup.string()
    .min(
      __ValidationText.requestConsultation.desiredQty.minQty,
      __ValidationText.requestConsultation.desiredQty.minText,
    )
    .required(__ValidationText.requestConsultation.desiredQty.required),
  inHandDate: Yup.string(),
  message: Yup.string(),
});
let mediaBaseUrl = _globalStore.blobUrl;

const RcForm: React.FC<{
  productId: number;
  attriubteOptionId: number;
  formSubmit: boolean;
  setFormSubmit: (value: boolean) => void;
}> = ({ productId, attriubteOptionId, formSubmit, setFormSubmit }) => {
  const router = useRouter();
  const [captchaVerified, setverifiedRecaptch] = useState<
    'NOT_VALID' | null | 'VALID'
  >(null);
  const [showLogo, setShowLogo] = useState<boolean>(false);
  const [fileUploded, setFileUploded] = useState<boolean>(false);
  const { setShowLoader, showModal } = useActions_v2();
  const { id: storeId, imageFolderPath } = useTypedSelector_v2(
    (state) => state.store,
  );

  const store = useTypedSelector_v2((state) => state.store);
  mediaBaseUrl = mediaBaseUrl || store.mediaBaseUrl;

  const [fileToUpload, setFileToUpload] = useState<{
    logoPathURL: string | null;
    name: string;
    type: string;
    previewURL: string;
  } | null>(null);

  const captchaHandler = () => {
    setverifiedRecaptch('VALID');
  };

  const fileReader = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files === null) return;

    try {
      const logoFileURL = await UploadImage({
        folderPath: imageFolderPath,
        files: event?.target?.files[0],
      });
      const file = {
        logoPathURL: logoFileURL,
        name: event.target.files[0].name,
        type: event.target.files[0].type,
        previewURL: URL.createObjectURL(event.target.files[0]),
      };

      setFileToUpload(file);
      setFileUploded(true);
    } catch (error) {
      showModal({
        title: 'Error',
        message: 'Something Went Wrong. Try again, later!!!',
      });
    }
    setShowLoader(false);
  };

  const submitHandler = async (value: _RequestConsultation) => {
    if (!captchaVerified || captchaVerified === 'NOT_VALID') {
      setverifiedRecaptch('NOT_VALID');
      return;
    }

    const location = await getLocation();

    const payload: _SubmitConsultationPayload = {
      consultationModel: {
        id: 0,
        rowVersion: '',
        location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
        ipAddress: location.ip_address,
        macAddress: '00-00-00-00-00-00',
        storeId: storeId,
        productId: productId,
        firstname: value.firstName,
        lastname: value.lastName,
        company: value.companyName,
        email: value.email,
        phone: value.phone,
        contactMethod: value.preferedContactMethod === 'EMAIL' ? 2 : 1,
        desiredQuantity: value.desiredQty,
        inHandsDate: value.inHandDate,
        logoUrl: fileToUpload?.logoPathURL ? fileToUpload.logoPathURL : '',
        message: value.message,
        gclid: '',
        productattributeoptionid: attriubteOptionId,
        recStatus: 'A',
        status: '',
      },
    };

    SumbitRequestConsultationDetails(payload).then(() => {
      setFormSubmit(true);
    });
    // .finally(() => setShowLoader(false));
    setFormSubmit(true);
  };

  if (formSubmit) {
    return <RcRequestDone />;
  }

  return (
    <Formik
      initialValues={_RequestConsultationInitials}
      onSubmit={submitHandler}
      validationSchema={_RequestConsulationSchema}
    >
      {({ values, handleChange, setFieldValue, errors }) => {
        return (
          <div className='w-full lg:w-4/12 md:w-full pl-[15px] pr-[15px] mb-[30px]'>
            <Form>
              <div className='flex flex-wrap gap-y-4 pl-[15px] pr-[15px]'>
                <div className='w-full'>
                  <div className='bg-gray-100 flex flex-wrap items-center justify-between px-3 py-1'>
                    <div className='font-bold text-xl'>
                      {__pagesText.requestConsultation.contactInformation}
                    </div>
                    <div className='text-red-500 text-sm font-bold'>
                      {__pagesText.requestConsultation.allFields}
                    </div>
                  </div>
                </div>
                <RcInput
                  onChange={handleChange}
                  value={values.firstName}
                  id='First Name'
                  name={'firstName'}
                  placeholder='First Name'
                  required={true}
                />
                <RcInput
                  onChange={handleChange}
                  value={values.lastName}
                  id='Last Name'
                  name={'lastName'}
                  placeholder='Last Name'
                  required={true}
                />
                <RcInput
                  onChange={handleChange}
                  value={values.companyName}
                  id='Company Name'
                  name={'companyName'}
                  placeholder='Company'
                  required={true}
                />
                <RcInput
                  onChange={handleChange}
                  value={values.email}
                  type={'email'}
                  id='email-address'
                  name={'email'}
                  placeholder='Email'
                  required={true}
                />
                <RcInput
                  onChange={(event) => {
                    if (/^[0-9]*$/.test(event.target.value)) {
                      handleChange(event);
                    }
                  }}
                  value={values.phone}
                  type={'text'}
                  id='Phone Number'
                  name={'phone'}
                  placeholder='Phone'
                  required={true}
                />
                <RcSelect
                  placeHolder={'Select Prefered Contact Method'}
                  value={values.preferedContactMethod}
                  options={
                    __pagesConstant._requestConsultation.preferedContactMethod
                  }
                  onChange={handleChange}
                  required={true}
                  name={'preferedContactMethod'}
                />
                <RcInput
                  onChange={(event) => {
                    if (/^[0-9]*$/.test(event.target.value)) {
                      handleChange(event);
                    }
                  }}
                  value={values.desiredQty || ''}
                  type={'text'}
                  id='Desired Quantity'
                  name={'desiredQty'}
                  placeholder='Desired Quantity'
                  required={true}
                />
                <div className='w-full'>
                  <div className='bg-[#f5f7f6] flex flex-wrap items-center justify-between pt-[8px] pb-[8px] pl-[12px] pr-[12px]'>
                    <div className='font-bold text-lg'>
                      Optional Information
                    </div>
                    <div>&nbsp;</div>
                  </div>
                </div>
                <RcDate
                  value={values.inHandDate}
                  setFieldValue={setFieldValue}
                />
                <div className='w-full '>
                  <div className='flex flex-wrap items-center justify-between'>
                    <div className=''>Provide Logo (Optional):</div>
                    {!showLogo && (
                      <div className=''>
                        <button
                          className='text-lg rounded pt-[12px] pb-[12px] pl-[12px] !text-anchor hover:!text-anchor-hover underline font-bold'
                          onClick={() => setShowLogo(true)}
                        >
                          <u> + Add Logo</u>
                        </button>
                      </div>
                    )}
                  </div>
                  {showLogo && (
                    <div className='bg-[#f5f7f6] pl-[8px] pr-[8px] pb-[8px] pt-[8px] mt-[8px] border-[2px] border-[#eaeaea]'>
                      <div className='flex flex-wrap items-center justify-between'>
                        <div className='text-normal-text font-semibold'>
                          First Logo
                        </div>
                        <div className=''>
                          <button
                            className='text-medium-text rounded pt-[12px] pb-[12px] pl-[12px] !text-anchor hover:!text-anchor-hover underline text-normal-text font-semibold'
                            onClick={() => setShowLogo(false)}
                          >
                            X Remove
                          </button>
                        </div>
                      </div>
                      <div className='mt-[8px]'>
                        <label className='text-normal-text' htmlFor=''>
                          Select your logo
                        </label>
                        {fileUploded ? (
                          <div className='flex items-center justify-between border border-[#a5a5a5] text-medium-text pl-[5px] pr-[5px] pt-[5px] pb-[5px] rounded'>
                            <img
                              className='w-14 max-h-14'
                              src={`${mediaBaseUrl}${fileToUpload?.logoPathURL}`}
                              alt=''
                            />
                            <button
                              className='underline font-bold text-base text-[#006cd1]'
                              onClick={() => {
                                setFileToUpload({
                                  logoPathURL: '',
                                  name: '',
                                  type: '',
                                  previewURL: '',
                                });
                                setFileUploded(false);
                              }}
                            >
                              X Remove
                            </button>
                            <button
                              onClick={() =>
                                document.getElementById('getFile')?.click()
                              }
                              className='border-r-2 text-white bg-[#003a70] px-3 py-2 font-light text-sm'
                            >
                              Edit
                            </button>
                            <input
                              className='hidden'
                              type='file'
                              id='getFile'
                              // value={fileToUpload?.name}
                              onChange={fileReader}
                              accept={'image/*'}
                            />
                          </div>
                        ) : (
                          <div className='flex items-center justify-between border border-[#a5a5a5] text-medium-text pl-[5px] pr-[5px] pt-[5px] pb-[5px] rounded bg-[#ffffff]'>
                            <div className='text-medium-text'>
                              Upload Your Logo
                            </div>
                            <div className=''>
                              <input
                                type='file'
                                name={'logo'}
                                id={'logo'}
                                // value={fileToUpload?.name}
                                className='sr-only'
                                onChange={fileReader}
                                accept={'image/*'}
                              />
                              <label
                                htmlFor='logo'
                                className='btn-primary text-medium-text inline-flex flex-wrap items-center justify-between pl-[12px] pr-[12px] pt-[8px] pb-[8px]'
                              >
                                <span className='material-icons-round mr-[5px]'>
                                  folder_open
                                </span>
                                <span>Upload</span>
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className='w-full '>
                  <div className=''>
                    <textarea
                      placeholder='Message'
                      className='text-medium-text border border-[#ababab] rounded pt-[12px] pb-[12px] pl-[12px] pr-[12px] w-full'
                      name={'message'}
                      value={values.message}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='w-full text-center max-w-xs'>
                  <ReCAPTCHA
                    className='pt-4 first:pt-0'
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHASITEKEY || ''}
                    onChange={captchaHandler}
                  />
                  {captchaVerified === 'NOT_VALID' && (
                    <p className='text-rose-500'>
                      {__ValidationText.requestConsultation.captcha}
                    </p>
                  )}
                </div>

                <div className='w-full  text-center'>
                  <button
                    type={'submit'}
                    className='btn btn-md btn-secondary text-3xl font-[900] w-full mb-[15px]'
                  >
                    SUBMIT
                  </button>
                  <button
                    onClick={() => router.back()}
                    className='text-center !text-anchor hover:!text-anchor-hover text-xl font-semibold'
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default RcForm;
