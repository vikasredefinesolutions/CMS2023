import { __length, __messages } from '@constants/form.config';
import {
  phonePattern1,
  phonePattern2,
  phonePattern3,
  phonePattern4,
} from '@constants/global.constant';
import { __ValidationText } from '@constants/validation.text';
import { CustomRequestMessage } from '@constants/validationMessages';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { _CustomerOrderPayload } from '@services/product';
import { CustomerProductOrder } from '@services/product.service';
import router from 'next/router';
// import { UploadImage } from '@services/general.service';
import { paths } from '@constants/paths.constant';
import { UploadImage } from '@services/general.service';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required(CustomRequestMessage.firstName.required)
    .min(
      CustomRequestMessage.firstName.minlength,
      CustomRequestMessage.firstName.minValidation,
    ),
  lastName: Yup.string()
    .trim()
    .required(CustomRequestMessage.lastName.required)
    .min(
      CustomRequestMessage.lastName.minlength,
      CustomRequestMessage.lastName.minValidation,
    ),
  organizationName: Yup.string()
    .trim()
    .required(CustomRequestMessage.organizationName.required),
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
        )
          return true;
        return false;
      },
    ),
  email: Yup.string()
    .trim()
    .email(__messages.email.validRequest)
    .max(__length.email.max)
    .min(__length.email.min)
    .required(__messages.email.required)
    .nullable(),
  itemName: Yup.string()
    .trim()
    .required(CustomRequestMessage.itemName.required),
  brandPreferences: Yup.string(),
  // budgetPerItem: Yup.number().required(CustomRequestMessage.budget.required),
  additionalComments: Yup.string(),
  sizeQty: Yup.string().trim().required(CustomRequestMessage.sizeQty.required),
});

const _initialValues = {
  firstName: '',
  lastName: '',
  organizationName: '',
  phone: '',
  email: '',
  itemName: '',
  brandPreferences: '',
  budgetPerItem: '',
  fileUpload: '',
  itemColor: '',
  sizeQty: '',
  needByDate: '',
  additionalComments: '',
};

const CustomRequestForm: React.FC = () => {
  const [verifiedRecaptch, setverifiedRecaptch] = useState(false);
  const [initialValues, setInitialValues] = useState(_initialValues);
  const [fileName, setFileName] = useState('');
  const { id: storeId, imageFolderPath } = useTypedSelector_v2(
    (state) => state.store,
  );
  const { setShowLoader, showModal } = useActions_v2();

  function onChange(value: any) {
    setverifiedRecaptch(true);
  }

  const blockInvalidChar = (e: any) =>
    ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault();

  const submitHandler = async (values: any) => {
    setShowLoader(true);

    const payload2: _CustomerOrderPayload = {
      customerProductRequestModel: {
        id: 0,
        storeID: storeId!,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        inHandDate: new Date(),
        shipFirstName: values.firstName,
        shipLastName: values.lastName,
        shipAddress1: '',
        shipZipCode: '',
        shipCity: '',
        shipStateId: 0,
        shipCountryId: 0,
        requestGiveAway: true,
        eventName: '',
        targetAudience: '',
        reason: '',
        budget: values.budgetPerItem,
        quantity: values.sizeQty,
        color: values.itemColor,
        ideas: '',
        item2: '',
        item3: '',
        item4: '',
        item5: '',
        specialRequest: values.additionalComments,
        itemName: values.itemName,
        organizationName: values.organizationName,
        logo: fileName,
        shipAddress2: '',
        beforeInHandDate: new Date(),
        reasonForGiveAwayPurpose: '',
        additionalCommentsOrRequest: '',
        ideasParticularItemsOfInterest: '',
        isDesiredBrandingUnitiLogo: false,
        isDesiredBrandingOtherExistingLogo: false,
        isDesiredBrandingNewLogoOrGraphic: false,
        isBeforeInHand: false,
        message: '',
        sport: '',
        brandPreference: values.brandPreferences,
      },
    };
    CustomerProductOrder(payload2)
      .then(() => {
        setInitialValues(_initialValues);
        setShowLoader(false);
        router.push(paths.REQUEST_THANKYOU);
      })
      .catch(() => {
        showModal({
          title: 'Error',
          message: 'Something Went Wrong !!!',
        });
        setShowLoader(false);
      });
  };

  const fileReader = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files === null) {
      return;
    }

    var filePath = event.target.value;

    var allowedExtensions =
      /(\.jpg|\.jpeg|\.png|\.bmp|\.doc|\.docx|\.xlsx|\.xls|\.eps|\.ai|\.pdf)$/i;
    if (!allowedExtensions.exec(filePath)) {
      event.target.value = '';
      showModal({
        title: 'Error',
        message: 'Please Select A Valid File Type!!!',
      });
      return;
    } else {
      setShowLoader(true);
      try {
        const res = await UploadImage({
          folderPath: imageFolderPath,
          files: event?.target?.files[0],
        });
        setFileName(res || '');
      } catch (error) {
        showModal({
          title: 'Error',
          message: 'Something Went Wrong. Try again, later!!!',
        });
      }
      setShowLoader(false);
    }
  };

  return (
    <>
      <div className='w-full text-default-text mb-[30px]'>
        Are you looking for an item or brand not featured in our catalog? We’d
        be glad to help! Please complete the below form with as much detail as
        possible. You will be contacted by a Sales Rep who will provide more
        information about your request.
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => submitHandler(values)}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, touched, errors }) => {
          return (
            <Form>
              <div className='flex flex-wrap mx-[-15px] gap-y-6'>
                <div className='w-full lg:w-1/2 px-[15px]'>
                  <label className='block text-default-text'>
                    First Name <span className='text-red-600'>*</span> :
                  </label>
                  <div className='mt-2'>
                    <input
                      id=''
                      name={'firstName'}
                      placeholder='Enter First Name'
                      value={values.firstName}
                      className='form-input'
                      onChange={handleChange}
                    />
                  </div>
                  {touched.firstName && errors.firstName && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div className='w-full lg:w-1/2 px-[15px]'>
                  <label className='block text-default-text'>
                    Last Name <span className='text-red-600'>*</span> :
                  </label>
                  <div className='mt-2'>
                    <input
                      id=''
                      name={'lastName'}
                      placeholder='Enter Last Name'
                      value={values.lastName}
                      onChange={handleChange}
                      className='form-input'
                    />
                  </div>
                  {touched.lastName && errors.lastName && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.lastName}
                    </p>
                  )}
                </div>

                <div className='w-full lg:w-1/2 px-[15px]'>
                  <label className='block text-default-text font-medium'>
                    Email Address <span className='text-red-600'>*</span> :
                  </label>
                  <div className='mt-2'>
                    <input
                      type='email'
                      id=''
                      name={'email'}
                      placeholder='Enter Email Address'
                      value={values.email}
                      onChange={handleChange}
                      className='form-input'
                    />
                  </div>
                  {touched.email && errors.email && (
                    <p className='text-red-500 text-xs mt-1'>{errors.email}</p>
                  )}
                </div>

                <div className='w-full lg:w-1/2 px-[15px]'>
                  <label className='block text-default-text font-medium'>
                    Phone Number <span className='text-red-600'>*</span> :
                  </label>
                  <div className='mt-2 relative'>
                    <input
                      id=''
                      name={'phone'}
                      placeholder='Enter Phone Number'
                      value={values.phone}
                      onChange={handleChange}
                      className='form-input'
                    />
                  </div>
                  {touched.phone && errors.phone && (
                    <p className='text-red-500 text-xs mt-1'>{errors.phone}</p>
                  )}
                </div>

                <div className='w-full lg:w-1/2 px-[15px]'>
                  <label className='block text-default-text'>
                    Company / Organization Name
                    <span className='text-red-600'>*</span> :
                  </label>
                  <div className='mt-2 relative'>
                    <input
                      id=''
                      name={'organizationName'}
                      placeholder='Enter Company Name'
                      value={values.organizationName}
                      onChange={handleChange}
                      className='form-input'
                    />
                  </div>
                  {touched.organizationName && errors.organizationName && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.organizationName}
                    </p>
                  )}
                </div>

                <div className='w-full px-[15px] text-sub-text pt-[15px]'>
                  Item Request
                </div>

                <div className='w-full lg:w-1/2 px-[15px]'>
                  <label className='block text-default-text font-medium'>
                    Item Name <span className='text-red-600'>*</span> :
                  </label>
                  <div className='mt-2'>
                    <input
                      id=''
                      name={'itemName'}
                      placeholder=''
                      value={values.itemName}
                      onChange={handleChange}
                      className='form-input'
                    />
                  </div>
                  {touched.itemName && errors.itemName && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.itemName}
                    </p>
                  )}
                </div>

                <div className='w-full lg:w-1/2 px-[15px]'>
                  <label className='block text-default-text font-medium'>
                    Brand(s) Preferences
                  </label>
                  <div className='mt-2'>
                    <textarea
                      className='form-input'
                      name={'brandPreferences'}
                      value={values.brandPreferences}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                <div className='w-full lg:w-1/2 px-[15px]'>
                  <label className='block text-default-text font-medium'>
                    Budget Per Item <span className='text-red-600'></span> :
                  </label>
                  <div className='mt-2'>
                    <input
                      type='number'
                      min={1}
                      id=''
                      name={'budgetPerItem'}
                      placeholder=''
                      onKeyDown={blockInvalidChar}
                      value={values.budgetPerItem}
                      onChange={handleChange}
                      className='form-input'
                    />
                  </div>
                  {touched.budgetPerItem && errors.budgetPerItem && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.budgetPerItem}
                    </p>
                  )}
                </div>

                <div className='w-full lg:w-1/2 px-[15px]'>
                  <label className='block text-default-text font-medium'>
                    Quantity Needed <span className='text-red-600'>*</span> :
                  </label>
                  <div className='mt-2'>
                    <input
                      type='number'
                      min={1}
                      id=''
                      name={'sizeQty'}
                      placeholder=''
                      onKeyDown={blockInvalidChar}
                      value={values.sizeQty}
                      onChange={handleChange}
                      className='form-input'
                    />
                  </div>
                  {touched.sizeQty && errors.sizeQty && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.sizeQty}
                    </p>
                  )}
                </div>

                <div className='w-full lg:w-1/2 px-[15px]'>
                  <label className='block text-default-text font-medium'>
                    Color Preferences
                  </label>
                  <div className='mt-2'>
                    <input
                      id=''
                      type='text'
                      name={'itemColor'}
                      placeholder=''
                      value={values.itemColor}
                      onChange={handleChange}
                      className='form-input'
                    />
                  </div>
                </div>

                <div className='w-full px-[15px] text-sub-text pt-[15px]'>
                  Additional Requests
                </div>

                <div className='w-full px-[15px]'>
                  <label className='block text-default-text font-medium'>
                    Additional Comments
                  </label>
                  <div className='mt-2'>
                    <textarea
                      className='form-input'
                      name={'additionalComments'}
                      value={values.additionalComments}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                <div className='w-full px-[15px]'>
                  <label className='block text-default-text font-medium'>
                    Additional documents or logos needed to complete the
                    request:
                  </label>
                  <div className='mt-2'>
                    <input
                      type='file'
                      id=''
                      name=''
                      placeholder=''
                      onChange={fileReader}
                      className='form-input'
                      accept='.doc,.docx, .xlsx, .xls, .eps, .ai, .pdf, .jpg, .jpeg, .png, .bmp'
                    />
                  </div>
                  <div className='text-[12px]'>
                    Only Allow ( .doc,.docx, .xlsx, .xls, .eps, .ai, .pdf, .jpg,
                    .jpeg, .png, .bmp )
                  </div>
                </div>

                <div className='w-full px-[15px]'>
                  <ReCAPTCHA
                    className='max-w-xs'
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHASITEKEY || ''}
                    onChange={onChange}
                  />
                </div>

                <div className='w-full lg:w-full px-[15px] text-center'>
                  <button
                    type={'submit'}
                    className={`btn btn-secondary btn-md ${
                      verifiedRecaptch ? '' : 'opacity-50'
                    }  `}
                    disabled={!verifiedRecaptch}
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default CustomRequestForm;
