import { __length, __messages } from '@constants/form.config';
import {
  phonePattern1,
  phonePattern2,
  phonePattern3,
  phonePattern4,
} from '@constants/global.constant';
import { __ValidationText } from '@constants/validation.text';
import { CustomRequestMessage } from '@constants/validationMessages';
import getLocation from '@helpers/getLocation';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { UploadImage } from '@services/file.service';
import { _CustomerOrderPayload } from '@services/product';
import { CustomerProductOrder } from '@services/product.service';
// import { UploadImage } from '@services/general.service';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required(CustomRequestMessage.firstName.required),
  lastName: Yup.string().required(CustomRequestMessage.lastName.required),
  organizationName: Yup.string().required(
    CustomRequestMessage.organizationName.required,
  ),
  phone: Yup.string()
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
    .email(__messages.email.validRequest)
    .max(__length.email.max)
    .min(__length.email.min)
    .required(__messages.email.required)
    .nullable(),
  itemName: Yup.string().required(CustomRequestMessage.itemName.required),
  brandPreferences: Yup.string(),
  budgetPerItem: Yup.string(),
  additionalComments: Yup.string(),
  itemColor: Yup.string().required(CustomRequestMessage.itemColor.required),
  sizeQty: Yup.string().required(CustomRequestMessage.sizeQty.required),
});

const _initialValues = {
  firstName: '',
  lastName: '',
  organizationName: '',
  phone: '',
  email: '',
  // firstNameAddress: '',
  // lastNameAddress: '',
  // address1: '',
  // address2: '',
  // city: '',
  // zipCode: '',
  // countryName: '',
  // stateName: '',
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
  const [fileToUpload, setFileToUpload] = useState<{
    name: string;
    type: string;
    previewURL: string;
  } | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [verifiedRecaptch, setverifiedRecaptch] = useState(false);
  const [initialValues, setInitialValues] = useState(_initialValues);

  const { id: storeId, imageFolderPath } = useTypedSelector_v2(
    (state) => state.store,
  );
  const { setShowLoader, showModal } = useActions_v2();

  function onChange(value: any) {
    setverifiedRecaptch(true);
  }

  const submitHandler = async (values: any) => {
    setShowLoader(true);
    const location = await getLocation();

    const payload2: _CustomerOrderPayload = {
      customerProductRequestModel: {
        id: 0,
        storeID: storeId!,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        inHandDate: new Date(),
        shipFirstName: '',
        shipLastName: '',
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
        specialRequest: '',
        companyLogo: '',
        beforeInHandDate: new Date(),
      },
    };
    CustomerProductOrder(payload2)
      .then((res) => {
        setInitialValues(_initialValues);
      })
      .finally(() => setShowLoader(false));
  };

  const fileReader = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files === null) return;

    setShowLoader(true);

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

      setFileName(event.target.files[0].name);
    } catch (error) {
      showModal({
        title: 'Error',
        message: 'Something Went Wrong. Try again, later!!!',
      });
    }
    setShowLoader(false);
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
                  <label className='block text-default-text font-mediut'>
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
                  <label className='block text-default-text font-mediut'>
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
                  <label className='block text-default-text font-mediut'>
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
                  <label className='block text-default-text font-mediut'>
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
                  <label className='block text-default-text font-mediut'>
                    Budget Per Item
                  </label>
                  <div className='mt-2'>
                    <input
                      id=''
                      name={'budgetPerItem'}
                      placeholder=''
                      value={values.budgetPerItem}
                      onChange={handleChange}
                      className='form-input'
                    />
                  </div>
                </div>

                <div className='w-full lg:w-1/2 px-[15px]'>
                  <label className='block text-default-text font-mediut'>
                    Quantity Needed <span className='text-red-600'>*</span> :
                  </label>
                  <div className='mt-2'>
                    <input
                      id=''
                      name={'sizeQty'}
                      placeholder=''
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
                  <label className='block text-default-text font-mediut'>
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
                  <label className='block text-default-text font-mediut'>
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
                  <label className='block text-default-text font-mediut'>
                    Additional documents or logos needed to complete the
                    request:
                  </label>
                  <div className='mt-2'>
                    <input
                      type='file'
                      id=''
                      name=''
                      placeholder=''
                      // value={fileName}
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
