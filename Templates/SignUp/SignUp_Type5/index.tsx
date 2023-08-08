import { UserAddressType } from '@constants/enum';
import {
  __Cookie,
  __Cookie_Expiry,
  __UserMessages,
} from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import { __ValidationText } from '@constants/validation.text';
import { _Industry } from '@definations/app.type';
import {
  KlaviyoScriptTag,
  deleteCookie,
  extractCookies,
  setCookie,
} from '@helpers/common.helper';
import getLocation from '@helpers/getLocation';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { updateCartByNewUserId } from '@services/cart.service';
import {
  FetchCountriesList,
  FetchIndustriesList,
  FetchStatesList,
} from '@services/general.service';
import { _CreateNewAccount_Payload } from '@services/payloads/createNewAccount.payload';
import {
  CheckIfEmailIsAlreadyRegistered,
  CreateNewAccount,
  GetStoreCustomer,
  getLocationWithZipCode,
  signInUser,
} from '@services/user.service';
import { getWishlist } from '@services/wishlist.service';
import { Form, Formik } from 'formik';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import * as Yup from 'yup';
import { _SU5_InitialValues, su5_initialValues } from './SU5.extra';
interface _props {
  setShowSection: (args: any) => void;
  showSection: string;
  modalHandler: (val: any) => void;
}
const SignUp_type5: React.FC<_props> = ({
  setShowSection,
  showSection,
  modalHandler,
}) => {
  const router = useRouter();
  const [industries, setIndustries] = useState<_Industry[]>([]);
  const [countries, setCountries] = useState<_Industry[]>([]);
  const [states, setStates] = useState<_Industry[]>([]);
  const [countryChange, setCoutryChange] = useState<number>(0);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const [verifiedRecaptch, setverifiedRecaptch] = useState(false);
  const storeCode = useTypedSelector_v2((state) => state.store.code);
  const [terms, setTerms] = useState<boolean>(false);
  const {
    showModal,
    updateWishListData,
    setShowLoader,
    updateCustomer,
    logInUser,
  } = useActions_v2();

  const [showError, setShowError] = useState<string>('');

  const _Signup2Schema = Yup.object().shape({
    industryType: Yup.string()
      .trim()
      .required(__ValidationText.signUp.industryType.required),
    organizationName: Yup.string()
      .trim()
      .required(__ValidationText.signUp.companyName.required),
    departmentName: Yup.string()
      .trim()
      .min(__ValidationText.signUp.companyName.minLength)
      .max(__ValidationText.signUp.companyName.maxLength),
    firstname: Yup.string()
      .trim()
      .required(__ValidationText.signUp.firstName.required)
      .min(__ValidationText.signUp.firstName.minLength)
      .max(__ValidationText.signUp.firstName.maxLength),
    password: Yup.string()
      .trim()
      .required(__ValidationText.signUp.password.required)
      .min(__ValidationText.signUp.password.minLength)
      .max(__ValidationText.signUp.password.maxLength),
    // confirmPassword: Yup.string()
    //   .trim()
    //   .required(__ValidationText.signUp.confirmPassword.required)
    //   .test(
    //     'passwords-match',
    //     __ValidationText.signUp.confirmPassword.mustMatch,
    //     function (value) {
    //       return this.parent.password === value;
    //     },
    //   ),
    lastName: Yup.string()
      .trim()
      .required(__ValidationText.signUp.lastName.required)
      .min(__ValidationText.signUp.lastName.minLength)
      .max(__ValidationText.signUp.lastName.maxLength),
    email: Yup.string()
      .trim()
      .email(__ValidationText.signUp.email.valid)
      .required(__ValidationText.signUp.email.required),
    companyAddress: Yup.string()
      .trim()
      .required(__ValidationText.signUp.storeCustomerAddress.address1.required),
    zipCode: Yup.string()
      .trim()
      .required(
        __ValidationText.signUp.storeCustomerAddress.postalCode.required,
      )
      .max(__ValidationText.signUp.storeCustomerAddress.postalCode.maxLength),
    cityName: Yup.string()
      .trim()
      .required(__ValidationText.signUp.storeCustomerAddress.city.required),
    state: Yup.string()
      .trim()
      .required(__ValidationText.signUp.storeCustomerAddress.state.required),
    country: Yup.string()
      .trim()
      .required(
        __ValidationText.signUp.storeCustomerAddress.countryName.required,
      ),
    phoneNumber: Yup.string()
      .trim()
      .required(__ValidationText.signUp.storeCustomerAddress.phone.required)
      .min(__ValidationText.signUp.storeCustomerAddress.phone.length)
      .max(__ValidationText.signUp.storeCustomerAddress.phone.length),
    usersMessage: Yup.string()
      .trim()
      .max(
        __ValidationText.signUp.companyName.maxLength,
        'Description must be less than 50',
      ),
    // password: Yup.string()
    //   .trim()
    //   .test('password-test-case', 'Password is required', (value) => {
    //     const domain = (_PASS_FIELD as any)[storeCode];
    //     if (domain) return true;
    //     if (!value || value.length < 6) return false;
    //     return true;
    //   })
    //   // .required(__ValidationText.signUp.password.required)
    //   .min(__ValidationText.signUp.password.minLength)
    //   .max(__ValidationText.signUp.password.maxLength),
  });

  const handleFormikSubmit = async (values: _SU5_InitialValues) => {
    // console.log('working ajkhdkja', values);

    const location = await getLocation();
    const payload: _CreateNewAccount_Payload = {
      storeCustomerModel: {
        id: 0,
        rowVersion: '',
        location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
        ipAddress: `${location.ip_address}`,
        macAddress: '00-00-00-00-00-00',
        firstname: `${values.firstname}`,
        lastName: `${values.lastName}`,
        email: `${values.email}`,
        password: `${values.password}`,
        confirmPassword: `${values.password}`,
        companyName: `${values.organizationName}`,
        jobTitle: `${values.jobTitle}`,
        companyId: 0,
        sharedCustomerId: 0,
        navCustomerId: '',
        customerType: '',
        storeId: storeId,
        isTaxableuser: false,
        storeCustomerAddress: [
          {
            id: 0,
            rowVersion: '',
            location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
            ipAddress: `${location.ip_address}`,
            macAddress: '00-00-00-00-00-00',
            customerId: 0,
            firstname: `${values.firstname}`,
            lastName: `${values.lastName}`,
            companyName: `${values.organizationName}`,
            email: `${values.email}`,
            address1: '',
            address2: '',
            suite: '',
            city: `${values.cityName}`,
            state: `${values.state}`,
            postalCode: `${values.zipCode}`,
            phone: `${values.phoneNumber}`,
            fax: '',
            countryName: `${values.country}`,
            countryCode: '',
            addressType: UserAddressType.BILLINGADDRESS,
            isDefault: false,
            recStatus: 'A',
          },
        ],
        recStatus: 'A',
        industryId: 0,
        gender: '',
        memberFrom: 0,
        memberTo: 0,
        organizationId: 0,
        primaryColor: '',

        mascotId: '',
        teamGender: '',
        timeOfYearPurchase: '',
        position: '',
        organizationName: '',
      },
    };

    if (verifiedRecaptch) {
      CreateNewAccount(payload).then((res: any) => {
        if (res?.data === null) {
          setShowLoader(false);
          showModal({
            message: '',
            title: 'Error',
          });

          return;
        }
        showModal({
          message: __UserMessages.signUpPage.SuccessFullyAccountCreated_PKHG,
          title: 'Success',
        });

        signInUser({
          userName: payload.storeCustomerModel.email,
          password: payload.storeCustomerModel.password,
          storeId: storeId!,
        })
          .then((user) => {
            if (user.credentials === 'INVALID') {
              // setErrorMsg(user.message);
            }
            if (user.credentials === 'VALID') {
              logInUser({
                id: +user.id,
              });
              setCookie(__Cookie.userId, user.id, __Cookie_Expiry.userId);

              GetStoreCustomer(+user.id).then((res) => {
                if (res === null) return;
                if (localStorage) {
                  const tempCustomerId = extractCookies(
                    __Cookie.tempCustomerId,
                    'browserCookie',
                  ).tempCustomerId;

                  if (tempCustomerId) {
                    updateCartByNewUserId(~~tempCustomerId, res.id);
                    deleteCookie(__Cookie.tempCustomerId);
                  }
                }

                const userInfo = {
                  $email: res.email,
                  $first_name: res.firstname,
                  $last_name: res.lastName,
                  $phone_number: '',
                  $organization: res.companyName,
                  $title: 'title',
                  $timestamp: new Date(),
                };

                KlaviyoScriptTag(['identify', userInfo]);
                updateCustomer({ customer: res });
                getWishlist(res.id).then((wishListResponse) => {
                  updateWishListData(wishListResponse);
                });
              });
            }
          })
          .finally(() => {
            setShowLoader(false);
            modalHandler(null);
          });
        router.push(paths.HOME);
      });
    }
  };

  const callOptionAPIs = () => {
    FetchIndustriesList().then((res) => res && setIndustries(res));

    FetchCountriesList().then((countriesExist) => {
      if (countriesExist) {
        setCountries(countriesExist);
        FetchStatesList(countriesExist[0].id).then(
          (res) => res && setStates(res),
        );
      }
    });
  };

  const getStateCountry = async (zipCode: string) => {
    const res = await getLocationWithZipCode(zipCode);

    return res;
  };

  const customEmailHandler = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    handleBlur: any,
    setFieldError: any,
  ) => {
    handleBlur(e);

    // const emailCheck = await CheckIfEmailIsAlreadyRegistered({
    //   storeId: storeId,
    //   email: e.target.value,
    // }).then((res) => {
    //   if (res === null || res === true) {
    //     setFieldError('email', __SuccessErrorText.alreadyRegistered);
    //   }
    // });
  };

  const customHandleBlur = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    handleBlur: any,
    setFieldValue: any,
  ) => {
    handleBlur(e);
    getStateCountry(e.target.value).then((res) => {
      if (res?.countryId) {
        setFieldValue('cityName', res.cityName);
        setFieldValue('country', res.countryName);
        FetchStatesList(res.countryId).then((response) => {
          setStates(response ? response : []);

          setFieldValue('state', res.stateName);
        });
      }
    });
  };

  function onChange(value: any) {
    setverifiedRecaptch(true);
  }

  useEffect(() => {
    if (customerId) {
      router.push('/');
    }
  }, [customerId]);

  useEffect(() => {
    callOptionAPIs();
  }, []);

  useEffect(() => {
    FetchStatesList(countryChange).then((res) => res && setStates(res));
  }, [countryChange]);

  return (
    <section className=''>
      <div className=''>
        <div className='w-full mx-auto max-w-7xl'>
          <Formik
            initialValues={su5_initialValues}
            onSubmit={handleFormikSubmit}
            validationSchema={_Signup2Schema}
          >
            {({
              values,
              handleChange,
              handleBlur,
              setFieldValue,
              setFieldError,
              touched,
              errors,
              validateForm,
              setTouched,
            }) => {
              return (
                <Form>
                  <div className=''>
                    {showSection == 'Register' && (
                      <div className='flex flex-wrap p-[15px] bg-light-gray m-[25px]'>
                        <div className='w-full text-left text-lg px-3 mb-[10px]'>
                          Personal Information
                        </div>
                        <div className='w-full lg:w-1/2 px-3 pb-[10px]'>
                          <label className='mb-[4px] text-normal-text'>
                            Industry Type{' '}
                            <span className='text-rose-500'>*</span>
                          </label>
                          <div className=''>
                            <select
                              className='form-input !w-[calc(100%-40px)]'
                              onBlur={handleBlur}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              name='industryType'
                              value={values.industryType}
                            >
                              <option>Select Industry Type</option>
                              {industries.map((res) => (
                                <option key={res.id}>{res.name}</option>
                              ))}
                            </select>
                          </div>
                          <div className='text-red-500 text-s'>
                            {touched.industryType && errors.industryType}
                          </div>
                        </div>

                        <div className='w-full lg:w-1/2 px-3 pb-[10px]'>
                          <label className='mb-[4px] text-normal-text'>
                            Organization Name{' '}
                            <span className='text-rose-500'>*</span>
                          </label>
                          <div className=''>
                            <input
                              placeholder=''
                              value={values.organizationName}
                              name='organizationName'
                              className='form-input !w-[calc(100%-40px)]'
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className='text-red-500 text-s'>
                            {touched.organizationName &&
                              errors.organizationName}
                          </div>
                        </div>

                        <div className='w-full lg:w-1/2 px-3 pb-[10px]'>
                          <label className='mb-[4px] text-normal-text'>
                            Job title
                          </label>
                          <div className=''>
                            <input
                              placeholder=''
                              value={values.jobTitle}
                              name='jobTitle'
                              className='form-input !w-[calc(100%-40px)]'
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className='text-red-500 text-s'>
                            {touched.jobTitle && errors.jobTitle}
                          </div>
                        </div>

                        <div className='w-full lg:w-1/2 px-3 pb-[10px]'>
                          <label className='mb-[4px] text-normal-text'>
                            Department Name
                          </label>
                          <div className=''>
                            <input
                              placeholder=''
                              value={values.departmentName}
                              name='departmentName'
                              className='form-input !w-[calc(100%-40px)]'
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className='text-red-500 text-s'>
                            {touched.departmentName && errors.departmentName}
                          </div>
                        </div>

                        <div className='w-full lg:w-1/2 px-3 pb-[10px]'>
                          <label className='mb-[4px] text-normal-text'>
                            Password <span className='text-rose-500'>*</span>
                          </label>
                          <div className='relative'>
                            <input
                              placeholder=''
                              type={showPassword ? 'text' : 'password'}
                              value={values.password}
                              name='password'
                              className='form-input !w-[calc(100%-40px)]'
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <button
                              type='button'
                              onClick={() => setShowPassword(!showPassword)}
                              className='block w-7 h-7 text-center absolute top-2 right-2'
                            >
                              <span className='material-symbols-outlined text-gray-400 focus:outline-none hover:text-primary transition-colors'>
                                visibility
                              </span>
                            </button>
                          </div>

                          <div className='text-red-500 text-s'>
                            {touched.password && errors.password}
                          </div>
                        </div>

                        <div className='w-full lg:w-1/2 px-3 pb-[10px]'>
                          <label className='mb-[4px] text-normal-text'>
                            First Name <span className='text-rose-500'>*</span>
                          </label>
                          <div className=''>
                            <input
                              placeholder=''
                              value={values.firstname}
                              name='firstname'
                              className='form-input !w-[calc(100%-40px)]'
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className='text-red-500 text-s'>
                            {touched.firstname && errors.firstname}
                          </div>
                        </div>

                        <div className='w-full lg:w-1/2 px-3 pb-[10px]'>
                          <label className='mb-[4px] text-normal-text'>
                            Last Name <span className='text-rose-500'>*</span>
                          </label>
                          <div className=''>
                            <input
                              placeholder=''
                              value={values.lastName}
                              name='lastName'
                              className='form-input !w-[calc(100%-40px)]'
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className='text-red-500 text-s'>
                            {touched.lastName && errors.lastName}
                          </div>
                        </div>

                        <div className='w-full lg:w-1/2 px-3 pb-[10px]'>
                          <label className='mb-[4px] text-normal-text'>
                            Email Address{' '}
                            <span className='text-rose-500'>*</span>
                          </label>
                          <div className=''>
                            <input
                              placeholder=''
                              type='email'
                              value={values.email}
                              name='email'
                              autoComplete='none'
                              className='form-input !w-[calc(100%-40px)]'
                              onChange={handleChange}
                              onBlur={(e) =>
                                customEmailHandler(e, handleBlur, setFieldError)
                              }
                            />
                          </div>
                          <div className='text-red-500 text-s'>
                            {touched.email && errors.email}
                          </div>
                        </div>

                        <div className='w-full lg:w-1/2 px-3 pb-[10px]'>
                          <label className='mb-[4px] text-normal-text'>
                            Company Address{' '}
                            <span className='text-rose-500'>*</span>
                          </label>
                          <div className=''>
                            <input
                              placeholder=''
                              type='text'
                              value={values.companyAddress}
                              name='companyAddress'
                              className='form-input !w-[calc(100%-40px)]'
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className='text-red-500 text-s'>
                            {touched.companyAddress && errors.companyAddress}
                          </div>
                        </div>

                        <div className='w-full lg:w-1/2 px-3 pb-[10px]'>
                          <label className='mb-[4px] text-normal-text'>
                            Zip Code <span className='text-rose-500'>*</span>
                          </label>
                          <div className=''>
                            <input
                              id=''
                              name='zipCode'
                              placeholder=''
                              value={values.zipCode}
                              onChange={handleChange}
                              onBlur={(e) => {
                                customHandleBlur(e, handleBlur, setFieldValue);
                              }}
                              className='form-input !w-[calc(100%-40px)]'
                            />
                          </div>
                          <div className='text-red-500 text-s'>
                            {touched.zipCode && errors.zipCode}
                          </div>
                        </div>

                        <div className='w-full lg:w-1/2 px-3 pb-[10px]'>
                          <label className='mb-[4px] text-normal-text'>
                            City <span className='text-rose-500'>*</span>
                          </label>
                          <div className=''>
                            <input
                              id=''
                              name='cityName'
                              placeholder=''
                              value={values.cityName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className='form-input !w-[calc(100%-40px)]'
                            />
                          </div>
                          <div className='text-red-500 text-s'>
                            {touched.cityName && errors.cityName}
                          </div>
                        </div>

                        <div className='w-full lg:w-1/2 px-3 pb-[10px]'>
                          <label className='mb-[4px] text-normal-text'>
                            State/Provience{' '}
                            <span className='text-rose-500'>*</span>
                          </label>
                          <div className=''>
                            <select
                              className='form-input !w-[calc(100%-40px)]'
                              onBlur={handleBlur}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              name='state'
                              value={values.state}
                            >
                              <>
                                {countries.length === 0 ? (
                                  <option>No State found</option>
                                ) : (
                                  ''
                                )}
                                {states?.map((opt) => (
                                  <option id={opt.id.toString()} key={opt.id}>
                                    {opt.name}
                                  </option>
                                ))}
                              </>
                            </select>
                          </div>
                          <div className='text-red-500 text-s'>
                            {touched.state && errors.state}
                          </div>
                        </div>

                        <div className='w-full lg:w-1/2 px-3 pb-[10px]'>
                          <label className='mb-[4px] text-normal-text'>
                            Country <span className='text-rose-500'>*</span>
                          </label>
                          <div className=''>
                            <select
                              className='form-input !w-[calc(100%-40px)]'
                              onBlur={handleBlur}
                              onChange={(e) => {
                                handleChange(e);
                                setCoutryChange(
                                  +e.target[e?.target.selectedIndex].id,
                                );
                              }}
                              name='country'
                              value={values.country}
                            >
                              <>
                                {countries.length === 0 ? (
                                  <option>No State found</option>
                                ) : (
                                  ''
                                )}
                                {countries?.map((opt) => (
                                  <option id={opt.id.toString()} key={opt.id}>
                                    {opt.name}
                                  </option>
                                ))}
                              </>
                            </select>
                          </div>
                          <div className='text-red-500 text-s'>
                            {touched.country && errors.country}
                          </div>
                        </div>

                        <div className='w-full lg:w-1/2 px-3 pb-[10px]'>
                          <label className='mb-[4px] text-normal-text'>
                            Phone <span className='text-rose-500'>*</span>
                          </label>
                          <div className=''>
                            <input
                              id=''
                              name='phoneNumber'
                              placeholder=''
                              value={values.phoneNumber}
                              className='form-input !w-[calc(100%-40px)]'
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className='text-red-500 text-s'>
                            {touched.phoneNumber && errors.phoneNumber}
                          </div>
                        </div>

                        {!(storeCode === 'PKHG') && (
                          <div className='w-full lg:w-1/2 px-3'>
                            <label className='mb-[4px] text-normal-text'>
                              Job Title
                            </label>
                            <div className=''>
                              <input
                                id=''
                                name='jobTitle'
                                placeholder=''
                                value={values.jobTitle}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='form-input !w-[calc(100%-40px)]'
                              />
                            </div>
                          </div>
                        )}
                        <div className='w-full lg:w-full px-3'>
                          <label className='mb-[4px] text-normal-text'>
                            Please tell us about your company, and how you would
                            like to use the Patagonia co-branded gear
                          </label>
                          <div className=''>
                            <input
                              id=''
                              name='usersMessage'
                              placeholder=''
                              value={values.usersMessage}
                              maxLength={50}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className='form-input !w-[calc(100%-40px)]'
                            />
                          </div>
                          <div className='text-red-500 text-s'>
                            {touched.usersMessage && errors.usersMessage}
                          </div>
                        </div>

                        <ReCAPTCHA
                          className='w-full px-3 mt-[10px]'
                          sitekey={
                            process.env.NEXT_PUBLIC_RECAPTCHASITEKEY || ''
                          }
                          onChange={onChange}
                        />
                      </div>
                    )}

                    {/* <div className='error'>{JSON.stringify(errors)}</div> */}

                    {showSection == 'Submit' && (
                      <div className='p-[25px] signup-popup-02'>
                        <div className='bg-light-gray py-8'>
                          <div className='w-full mx-auto max-w-4xl'>
                            <form className='form-container popup-customer-ac2'>
                              <div className='flex flex-wrap w-full'>
                                <div className='w-full px-3 text-default-text'>
                                  <div className='w-full px-3 pb-[10px]'>
                                    <p className='text-medium-text'>
                                      IMPORTANT PROGRAM RULES:
                                    </p>
                                    <ul className='list-disc pl-[10px]'>
                                      <li className='mb-[5px]'>
                                        All items ordered must be decorated. We
                                        cannot sell blank products. All logos
                                        intended for placement on Patagonia
                                        items are subject to approval by
                                        Patagonia.
                                      </li>
                                      <li className='mb-[5px]'>
                                        You must have written permission to sell
                                        any Patagonia or Yeti gear, directly to
                                        consumers. No merchandise may be sold in
                                        hospital gift shops, bookstores, etc.
                                      </li>
                                      <li className='mb-[5px]'>
                                        The minimum per style is 4 pieces per
                                        color, which can be split across sizes.
                                        Your order must have a minimum of 10
                                        total pieces.
                                      </li>
                                      <li className='mb-[5px]'>
                                        Your logo and placement must be
                                        standardized across all pieces on your
                                        order (with the exception of thread
                                        color changes).
                                      </li>
                                      <li className='mb-[5px]'>
                                        Inventory is subject to change at any
                                        time, and placing your order online does
                                        not guarantee inventory.
                                      </li>
                                      <li className='mb-[5px]'>
                                        If your order contains any items that
                                        are on backorder, your entire order will
                                        not ship until all items are available.
                                      </li>
                                      <li className='mb-[5px]'>
                                        Patagonia product may be ordered at our
                                        volume discounts and shipped to a
                                        contract embroiderer. Please contact us
                                        for guidelines.
                                      </li>
                                      <li className='mb-[5px]'>
                                        All sales of decorated items are final.
                                      </li>
                                    </ul>
                                  </div>
                                  <div className='w-full px-3 pb-[20px]'>
                                    <label className='pull-left'>
                                      <label className='v-middle rules-checkbox-text'>
                                        <input
                                          type='checkbox'
                                          id='IsReadUnderstand'
                                          name='IsReadUnderstand'
                                          onBlur={handleBlur}
                                          onChange={() => setTerms(!terms)}
                                        />
                                        I have read and understand these rules
                                      </label>
                                      {touched.IsReadUnderstand &&
                                        terms == false && (
                                          <p className='text-red-600 ml-4'>
                                            Please check the box to continue.
                                          </p>
                                        )}
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className='flex justify-center items-center p-[15px] rounded-t border-t sticky top-0 left-0 bg-[#ffffff] z-50 w-full'>
                      {showSection == 'Submit' ? (
                        <>
                          <div
                            className='btn btn-primary mr-[15px]'
                            onClick={() => setShowSection('Register')}
                          >
                            {`< Back`}
                          </div>
                          <button
                            type='submit'
                            className={
                              terms
                                ? 'btn btn-primary'
                                : 'btn btn-primary opacity-50 '
                            }
                            disabled={!terms}
                          >
                            {`Submit >`}
                          </button>
                        </>
                      ) : (
                        <>
                          <div
                            className='btn btn-primary mr-[15px]'
                            onClick={() => setShowSection('Login')}
                          >
                            {`< Back`}
                          </div>
                          <button
                            className={`${
                              verifiedRecaptch ? 'true' : 'false  opactiy-5'
                            } btn btn-primary `}
                            // type='button'
                            onClick={async (e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              const validate = await validateForm();

                              if (!verifiedRecaptch) {
                                alert('ReCaptcha is required');
                              }

                              if (validate) {
                                let obj = {};
                                Object.entries(su5_initialValues).forEach(
                                  (item) => {
                                    obj = { ...obj, [item[0]]: true };
                                  },
                                );

                                if (!isEmpty(validate)) {
                                  return setTouched(obj);
                                }

                                const isemail =
                                  await CheckIfEmailIsAlreadyRegistered({
                                    storeId: storeId,
                                    email: values.email,
                                  }).then((res) => {
                                    if (res === null || res === true) {
                                      alert('Email is already registered');
                                    } else return true;
                                  });
                                if (verifiedRecaptch && isemail) {
                                  setShowSection('Submit');
                                  setTerms(false);
                                }
                              }

                              // else {
                              //   validate ? alert('ReCaptch is reqiured') : null;
                              // }
                            }}
                            // disabled={!verifiedRecaptch}
                          >
                            {`Next >`}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default SignUp_type5;
