import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { UploadImage } from '@services/file.service';
import { _CustomerOrderPayload } from '@services/product';
import { CustomerProductOrder } from '@services/product.service';
// import { UploadImage } from '@services/general.service';
import {
  phonePattern1,
  phonePattern2,
  phonePattern3,
  phonePattern4,
} from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { __ValidationText } from '@constants/validation.text';
import { consultationProofMessages } from '@constants/validationMessages';
import { getLocationWithZipCode } from '@services/user.service';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import * as Yup from 'yup';
import CustomInput from './CustomInput';
import StateAndCountriesInput from './StateAndCountriesInput';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.firstName.required)
    .min(
      consultationProofMessages.firstName.minLength,
      consultationProofMessages.firstName.minValidation,
    ),
  lastName: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.lastName.required)
    .min(
      consultationProofMessages.lastName.minLength,
      consultationProofMessages.lastName.minValidation,
    ),
  organizationName: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.companyName.required),
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
    .email()
    .required(__ValidationText.requestConsultation.email.required),
  shipFirstName: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.firstName.required),
  shipLastName: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.lastName.required),
  address1: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.address.required),
  city: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.city.required),
  zipCode: Yup.string()
    .trim()
    .required(__ValidationText.signUp.storeCustomerAddress.postalCode.required)
    .max(
      __ValidationText.signUp.storeCustomerAddress.postalCode.maxLength,
      'Postal code must be less than 9',
    ),
  countryName: Yup.string().required(
    __ValidationText.requestConsultation.country.required,
  ),
  stateName: Yup.string().required(
    __ValidationText.requestConsultation.stateName.required,
  ),
  itemName: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.itemName.required),
  itemColor: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.itemColor.required),
  sizeQty: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.desiredQty.required),
  needByDate: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.needByDate.required),
});

const _initialValues = {
  firstName: '',
  lastName: '',
  organizationName: '',
  phone: '',
  email: '',
  shipFirstName: '',
  shipLastName: '',
  address1: '',
  address2: '',
  city: '',
  zipCode: '',
  countryName: '',
  stateName: '',
  itemName: '',
  fileUpload: '',
  itemColor: '',
  sizeQty: '',
  needByDate: '',
  additionalComments: '',
};

const CustomRequestForm: React.FC = () => {
  const [fileUrl, setFileUrl] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const [verifiedRecaptch, setverifiedRecaptch] = useState(false);
  const [initialValues, setInitialValues] = useState(_initialValues);
  const router = useRouter();

  const { id: storeId, imageFolderPath } = useTypedSelector_v2(
    (state) => state.store,
  );
  const { setShowLoader, showModal } = useActions_v2();

  function onChange() {
    setverifiedRecaptch(true);
  }

  const submitHandler = async (values: typeof _initialValues) => {
    setShowLoader(true);
    const payload2: _CustomerOrderPayload = {
      customerProductRequestModel: {
        id: 0,
        storeID: storeId!,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        inHandDate: new Date(values.needByDate),
        shipFirstName: values.shipFirstName,
        shipLastName: values.shipLastName,
        shipAddress1: values.address1,
        shipZipCode: values.zipCode,
        shipCity: values.city,
        shipStateId: Number(values.stateName),
        shipCountryId: Number(values.countryName),
        requestGiveAway: true,
        eventName: '',
        targetAudience: '',
        reason: '',
        budget: 0,
        quantity: Number(values.sizeQty),
        color: values.itemColor,
        ideas: '',
        item2: '',
        item3: '',
        item4: '',
        item5: '',
        specialRequest: '',
        itemName: values.itemName,
        logo: fileUrl,
        beforeInHandDate: new Date(),
        shipAddress2: values.address2,
        organizationName: values.organizationName,
        reasonForGiveAwayPurpose: '',
        additionalCommentsOrRequest: values.additionalComments,
        ideasParticularItemsOfInterest: '',
        isDesiredBrandingUnitiLogo: false,
        isDesiredBrandingOtherExistingLogo: false,
        isDesiredBrandingNewLogoOrGraphic: false,
        isBeforeInHand: false,
        message: '',
        sport: '',
        brandPreference: '',
      },
    };
    CustomerProductOrder(payload2)
      .then(() => {
        router.push(paths.REQUEST_THANKYOU);
      })
      .catch(() => {
        showModal({
          title: 'Error',
          message: 'Something Went Wrong !!!',
        });
      })
      .finally(() => setShowLoader(false));
  };

  const fileReader = async (event: React.ChangeEvent<HTMLInputElement>) => {
    fileRef.current?.style.setProperty('color', 'white');

    if (
      event.target.files &&
      !['image/png', 'image/jpeg', 'image/jpg'].includes(
        event.target.files[0].type,
      )
    ) {
      alert('Please select an image file.');

      return;
    }

    if (event.target?.files === null) return;
    setShowLoader(true);

    try {
      const res = await UploadImage({
        folderPath: imageFolderPath,
        files: event?.target?.files[0],
      });
      fileRef.current?.style.setProperty('color', 'gray');

      setFileUrl(res || '');
    } catch (error) {
      showModal({
        title: 'Error',
        message: 'Something Went Wrong. Try again, later!!!',
      });
    }
    setShowLoader(false);
  };
  const getStateCountry = async (zipCode: string) => {
    const res = await getLocationWithZipCode(zipCode);

    return res;
  };

  const customHandleBlur = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    setFieldValue: (fieldName: string, fieldValue: string | number) => void,
  ) => {
    getStateCountry(e.target.value).then((res) => {
      if (res?.countryId) {
        setFieldValue('city', res.cityName);
        setFieldValue('countryName', res.countryId);
        setFieldValue('stateName', res.stateId);
      }
    });
  };

  return (
    <>
      <div className='w-full text-default-text mb-[30px]'>
        {__pagesText.PKGH_special_request_form.formDescription}
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => submitHandler(values)}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, setFieldValue, errors, touched }) => {
          return (
            <Form>
              <div className='flex flex-wrap mx-[-15px] gap-y-6'>
                <div className='w-full px-[15px] text-sub-text pt-[15px]'>
                  Contact Information
                </div>
                <div className='w-full lg:w-1/2 px-[15px]'>
                  <CustomInput
                    name='firstName'
                    label='First Name'
                    onChange={handleChange}
                    placeHolder=''
                    value={values.firstName}
                    required
                    type='text'
                    error={errors?.firstName}
                    touched={touched?.firstName}
                  />
                </div>
                <div className='w-full lg:w-1/2 px-[15px]'>
                  <CustomInput
                    name='lastName'
                    label='Last Name'
                    onChange={handleChange}
                    placeHolder=''
                    value={values.lastName}
                    required
                    type='text'
                    error={errors?.lastName}
                    touched={touched?.lastName}
                  />
                </div>
                <div className='w-full lg:w-1/2 px-[15px]'>
                  <CustomInput
                    name='organizationName'
                    label='Organization Name'
                    onChange={handleChange}
                    placeHolder=''
                    value={values.organizationName}
                    required
                    type='text'
                    error={errors?.organizationName}
                    touched={touched?.organizationName}
                  />
                </div>
                <div className='w-full lg:w-1/2 px-[15px]'>
                  <CustomInput
                    name='email'
                    label='Email Address'
                    onChange={handleChange}
                    placeHolder=''
                    value={values.email}
                    required
                    type='email'
                    error={errors?.email}
                    touched={touched?.email}
                  />
                </div>
                <div className='w-full lg:w-1/2 px-[15px]'>
                  <CustomInput
                    name='phone'
                    label='Phone Number'
                    onChange={handleChange}
                    placeHolder=''
                    value={values.phone}
                    required
                    type='text'
                    error={errors?.phone}
                    touched={touched?.phone}
                  />
                </div>
                <div className='w-full px-[15px] text-sub-text pt-[15px]'>
                  Ship to Address
                </div>
                <div className='w-full lg:w-1/2 px-[15px]'>
                  <CustomInput
                    name='shipFirstName'
                    label='First Name'
                    onChange={handleChange}
                    placeHolder=''
                    value={values.shipFirstName}
                    required
                    type='text'
                    error={errors?.shipFirstName}
                    touched={touched?.shipFirstName}
                  />
                </div>
                <div className='w-full lg:w-1/2 px-[15px]'>
                  <CustomInput
                    name='shipLastName'
                    label='Last Name'
                    onChange={handleChange}
                    placeHolder=''
                    value={values.shipLastName}
                    required
                    type='text'
                    error={errors?.shipLastName}
                    touched={touched?.shipLastName}
                  />
                </div>
                <div className='w-full lg:w-1/2 px-[15px]'>
                  <CustomInput
                    name='address1'
                    label='Address 1'
                    onChange={handleChange}
                    placeHolder=''
                    value={values.address1}
                    required
                    type='text'
                    error={errors?.address1}
                    touched={touched?.address1}
                  />
                </div>
                <div className='w-full lg:w-1/2 px-[15px]'>
                  <CustomInput
                    name='address2'
                    label='Address 2'
                    onChange={handleChange}
                    placeHolder=''
                    value={values.address2}
                    type='text'
                    showIcon={false}
                  />
                </div>
                <div className='w-full lg:w-1/2 px-[15px]'>
                  <CustomInput
                    name='zipCode'
                    label='Zip Code'
                    onChange={handleChange}
                    onBlur={(e) => customHandleBlur(e, setFieldValue)}
                    placeHolder=''
                    value={values.zipCode}
                    required
                    type='text'
                    error={errors?.zipCode}
                    touched={touched?.zipCode}
                  />
                </div>
                <div className='w-full lg:w-1/2 px-[15px]'>
                  <CustomInput
                    name='city'
                    label='City'
                    onChange={handleChange}
                    placeHolder=''
                    value={values.city}
                    required
                    type='text'
                    error={errors?.city}
                    touched={touched?.city}
                  />
                </div>
                <StateAndCountriesInput
                  countryName={'countryName'}
                  countryValue={values.countryName}
                  stateName={'stateName'}
                  stateValue={values.stateName}
                  setFieldValue={setFieldValue}
                />
                <div className='w-full px-[15px] text-sub-text pt-[15px]'>
                  Item Request
                </div>
                <div className='w-full lg:w-1/2 px-[15px]'>
                  <CustomInput
                    name='itemName'
                    label='Item Name'
                    onChange={handleChange}
                    placeHolder=''
                    value={values.itemName}
                    required
                    type='text'
                    error={errors?.itemName}
                    touched={touched?.itemName}
                  />
                </div>
                <div className='w-full lg:w-1/2 px-[15px]'>
                  <CustomInput
                    name='itemColor'
                    label='Item Color(s)'
                    onChange={handleChange}
                    placeHolder=''
                    value={values.itemColor}
                    required
                    type='text'
                    error={errors?.itemColor}
                    touched={touched?.itemColor}
                  />
                </div>
                <div className='w-full lg:w-1/2 px-[15px]'>
                  <CustomInput
                    name='sizeQty'
                    label='Size &amp; Quantity Requested'
                    onChange={handleChange}
                    placeHolder=''
                    value={values.sizeQty}
                    onKeyDown={(event) =>
                      ['e', 'E', '+', '-', '.'].includes(event.key) &&
                      event.preventDefault()
                    }
                    required
                    type='number'
                    error={errors?.sizeQty}
                    touched={touched?.sizeQty}
                  />
                </div>
                <div className='w-full lg:w-1/2 px-[15px]'>
                  <CustomInput
                    name='needByDate'
                    label='Need-By Date'
                    onChange={handleChange}
                    placeHolder=''
                    value={values.needByDate}
                    required
                    type='date'
                    error={errors?.needByDate}
                    touched={touched?.needByDate}
                  />
                </div>
                <div className='w-full lg:w-1/2 px-[15px]'>
                  <label
                    htmlFor='file'
                    className='block text-default-text font-mediut'
                  >
                    Logo Upload :
                  </label>
                  <div className='mt-2'>
                    <input
                      type='file'
                      id='file'
                      name=''
                      placeholder=''
                      ref={fileRef}
                      // value={file && file?.name ? file?.name : ''}sadfasdf

                      onChange={fileReader}
                      className='form-input'
                      accept='image/*'
                    />
                  </div>
                  <div className='text-[12px]'>
                    Only Allow ( .jpg,.png,.jpeg )
                  </div>
                </div>
                <div className='w-full lg:w-1/2 px-[15px]'>
                  <CustomInput
                    name='additionalComments'
                    label='Additional Comments'
                    onChange={handleChange}
                    placeHolder=''
                    value={values.additionalComments}
                    type='text'
                    error={errors?.additionalComments}
                    touched={touched?.additionalComments}
                  />
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
                    className={`btn btn-primary ${
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
