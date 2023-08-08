import { _STORE_EMAIL } from '@constants/common.constant';
import { UserAddressType } from '@constants/enum';
import {
  BACARDI,
  HEALTHYPOINTS,
  SIMPLI_SAFE_CODE,
  UCA,
  __Cookie,
  __Cookie_Expiry,
  __UserMessages,
  phonePattern1,
  phonePattern2,
  phonePattern3,
  phonePattern4,
} from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import { __SuccessErrorText } from '@constants/successError.text';
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
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { _SU5_InitialValues, su5_initialValues } from './SU6.extra';
interface _props {
  setShowSection: (args: any) => void;
  showSection: string;
  modalHandler: (val: any) => void;
}
const SignUp_type6: React.FC<_props> = ({
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
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const [verifiedRecaptch, setverifiedRecaptch] = useState(false);
  const { code: storeCode, storeName } = useTypedSelector_v2(
    (state) => state.store,
  );
  const selectedBacardiStor = extractCookies(
    'BacardiSelectedStore',
    'browserCookie',
  ).BacardiSelectedStore;
  // const [terms, setTerms] = useState<boolean>(false);
  const {
    showModal,
    updateWishListData,
    setShowLoader,
    updateCustomer,
    logInUser,
  } = useActions_v2();

  const _Signup2Schema = Yup.object().shape({
    // industryType: Yup.string()
    //   .trim()
    //   .required(__ValidationText.signUp.industryType.required),
    // organizationName: Yup.string()
    //   .trim()
    //   .required(__ValidationText.signUp.companyName.required),
    // departmentName: Yup.string()
    //   .trim()
    //   .min(__ValidationText.signUp.companyName.minLength)
    //   .max(__ValidationText.signUp.companyName.maxLength),
    firstname: Yup.string()
      .trim()
      .required(__ValidationText.signUp.firstName.required)
      .min(__ValidationText.signUp.firstName.minLength)
      .max(__ValidationText.signUp.firstName.maxLength),
    lastName: Yup.string()
      .trim()
      .required(__ValidationText.signUp.lastName.required)
      .min(__ValidationText.signUp.lastName.minLength)
      .max(__ValidationText.signUp.lastName.maxLength),
    password: Yup.string()
      .trim()
      .required(__ValidationText.signUp.password.required)
      .min(__ValidationText.signUp.password.minLength)
      .max(__ValidationText.signUp.password.maxLength),
    confirmPassword: Yup.string()
      .trim()
      .required(__ValidationText.signUp.confirmPassword.required)
      .test(
        'passwords-match',
        __ValidationText.signUp.confirmPassword.mustMatch,
        function (value) {
          return this.parent.password === value;
        },
      ),

    email: Yup.string()
      .trim()
      .email(__ValidationText.signUp.email.valid)
      .required()
      .test(
        'email',
        `Please enter ${(_STORE_EMAIL as any)[storeCode]} email address.`,
        (value) => {
          if (storeCode == BACARDI) return true;
          const domain = (_STORE_EMAIL as any)[storeCode];
          return new RegExp(`[a-zA-Z0-9._%+-]+@` + domain + `\.com$`).test(
            value || '',
          );
        },
      )
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
    // usersMessage: Yup.string()
    //   .trim()
    //   .max(
    //     __ValidationText.signUp.companyName.maxLength,
    //     'Description must be less than 50',
    //   ),
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
    // checkCustomEmail(
    //   values.email,
    //   (_STORE_EMAIL as any)[storeCode],
    //   setFieldError,
    // );
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
        companyName: values.organizationName
          ? `${values.organizationName}`
          : storeName || storeCode,
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
            companyName: values.organizationName
              ? `${values.organizationName}`
              : storeName || storeCode,
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

    // if (verifiedRecaptch) {
    CreateNewAccount(payload).then((res: any) => {
      const keyRes = Object.keys(res).find((obj) =>
        obj.includes('storeCustomerModel.'),
      );
      if (res?.data === null) {
        setShowLoader(false);
        showModal({
          message:
            res[keyRes || ''] || __UserMessages.signUpPage.SomethingWentWrong,
          title: 'Error',
        });

        return;
      }
      showModal({
        message: __UserMessages.signUpPage.SuccessFullyAccountCreated,
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
      if (storeCode == BACARDI) {
        if (selectedBacardiStor?.toLowerCase() == 'bacardi') {
          router.push(paths.bacardi.bacardi);
        } else if (selectedBacardiStor?.toLowerCase() == 'greygoose') {
          router.push(paths.bacardi.greyGoose);
        } else {
          router.push(paths.bacardi.bacardi);
        }
      } else {
        router.push(paths.HOME);
      }
    });
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

    const emailCheck = await CheckIfEmailIsAlreadyRegistered({
      storeId: storeId,
      email: e.target.value,
    }).then((res) => {
      if (res === null || res === true) {
        setFieldError('email', __SuccessErrorText.alreadyRegistered);
      }
    });
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
                    {(showSection == 'UCA Register' ||
                      showSection === 'BACARDI') && (
                      <div className='flex flex-wrap p-[15px] bg-light-gray m-[25px]'>
                        <div className='w-full text-left text-lg px-3 mb-[10px]'>
                          <span className='font-semibold'>
                            Personal Information
                          </span>
                        </div>

                        <div className='w-full lg:w-1/2 px-3 pb-[10px]'>
                          <label
                            className='mb-[4px] text-normal-text'
                            htmlFor='textFirstName'
                          >
                            First Name <span className='text-rose-500'>*</span>
                          </label>
                          <div className=''>
                            <input
                              placeholder=''
                              id='textFirstName'
                              value={values.firstname}
                              name='firstname'
                              className={`form-input !w-[calc(100%-40px)] ${
                                touched.firstname &&
                                errors.firstname &&
                                (storeCode === UCA ||
                                  storeCode === HEALTHYPOINTS)
                                  ? 'has-error'
                                  : ''
                              }`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className='text-red-500 text-s'>
                            {touched.firstname && errors.firstname}
                          </div>
                        </div>

                        <div className='w-full lg:w-1/2 px-3 pb-[10px]'>
                          <label
                            className='mb-[4px] text-normal-text'
                            htmlFor='textLastName'
                          >
                            Last Name <span className='text-rose-500'>*</span>
                          </label>
                          <div className=''>
                            <input
                              id='textLastName'
                              placeholder=''
                              value={values.lastName}
                              name='lastName'
                              className={`form-input !w-[calc(100%-40px)] ${
                                touched.lastName &&
                                errors.lastName &&
                                (storeCode === UCA ||
                                  storeCode === HEALTHYPOINTS)
                                  ? 'has-error'
                                  : ''
                              }`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className='text-red-500 text-s'>
                            {touched.lastName && errors.lastName}
                          </div>
                        </div>

                        <div className=' w-full lg:w-full px-3 px-3 pb-[10px]'>
                          <label
                            className='mb-[4px] text-normal-text'
                            htmlFor='textEmail'
                          >
                            Email Address{' '}
                            <span className='text-rose-500'>*</span>
                          </label>
                          <div className=''>
                            <input
                              id='textEmail'
                              placeholder=''
                              type='email'
                              value={values.email}
                              name='email'
                              autoComplete='none'
                              className={`form-input !w-[calc(100%-40px)] ${
                                touched.email &&
                                errors.email &&
                                (storeCode === UCA ||
                                  storeCode === HEALTHYPOINTS)
                                  ? 'has-error'
                                  : ''
                              }`}
                              onChange={handleChange}
                              onBlur={(e) => {
                                customEmailHandler(
                                  e,
                                  handleBlur,
                                  setFieldError,
                                );
                              }}
                            />
                          </div>
                          <div className='text-red-500 text-s'>
                            {touched.email && errors.email}
                          </div>
                        </div>
                        <div className='w-full lg:w-1/2 px-3 pb-[10px]'>
                          <label
                            className='mb-[4px] text-normal-text'
                            htmlFor='textPassword'
                          >
                            Password <span className='text-rose-500'>*</span>
                          </label>
                          <div className='relative'>
                            <input
                              id='textPassword'
                              placeholder=''
                              type={showPassword ? 'text' : 'password'}
                              value={values.password}
                              name='password'
                              className={`form-input !w-[calc(100%-40px)] ${
                                touched.password &&
                                errors.password &&
                                (storeCode === UCA ||
                                  storeCode === HEALTHYPOINTS)
                                  ? 'has-error'
                                  : ''
                              }`}
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
                          <label
                            className='mb-[4px] text-normal-text'
                            htmlFor='textConfirmPassword'
                          >
                            Confirm Password{' '}
                            <span className='text-rose-500'>*</span>
                          </label>
                          <div className='relative'>
                            <input
                              id='textConfirmPassword'
                              placeholder=''
                              type={showConfirmPassword ? 'text' : 'password'}
                              value={values.confirmPassword}
                              name='confirmPassword'
                              className={`form-input !w-[calc(100%-40px)] ${
                                touched.confirmPassword &&
                                errors.confirmPassword &&
                                (storeCode === UCA ||
                                  storeCode === HEALTHYPOINTS)
                                  ? 'has-error'
                                  : ''
                              }`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <button
                              type='button'
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              className='block w-7 h-7 text-center absolute top-2 right-2'
                            >
                              <span className='material-symbols-outlined text-gray-400 focus:outline-none hover:text-primary transition-colors'>
                                visibility
                              </span>
                            </button>
                          </div>

                          <div className='text-red-500 text-s'>
                            {touched.confirmPassword && errors.confirmPassword}
                          </div>
                        </div>
                        <div className=' w-full lg:w-full px-3 pb-[10px]'>
                          <label
                            className='mb-[4px] text-normal-text'
                            htmlFor='textAddress'
                          >
                            {storeCode == SIMPLI_SAFE_CODE
                              ? 'Ship to Address'
                              : storeCode === BACARDI
                              ? 'Street Address'
                              : 'Company Address'}
                            <span className='text-rose-500'>*</span>
                          </label>
                          <div className=''>
                            <input
                              id='textAddress'
                              placeholder=''
                              type='text'
                              value={values.companyAddress}
                              name='companyAddress'
                              className={`form-input !w-[calc(100%-40px)] ${
                                touched.companyAddress &&
                                errors.companyAddress &&
                                (storeCode === UCA ||
                                  storeCode === HEALTHYPOINTS)
                                  ? 'has-error'
                                  : ''
                              }`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className='text-red-500 text-s'>
                            {touched.companyAddress && errors.companyAddress}
                          </div>
                        </div>

                        <div className='w-full lg:w-1/2 px-3 pb-[10px]'>
                          <label
                            className='mb-[4px] text-normal-text'
                            htmlFor='textZipCode'
                          >
                            Zip Code <span className='text-rose-500'>*</span>
                          </label>
                          <div className=''>
                            <input
                              id='textZipCode'
                              name='zipCode'
                              placeholder=''
                              value={values.zipCode}
                              onChange={handleChange}
                              onBlur={(e) => {
                                customHandleBlur(e, handleBlur, setFieldValue);
                              }}
                              className={`form-input !w-[calc(100%-40px)] ${
                                touched.zipCode &&
                                errors.zipCode &&
                                (storeCode === UCA ||
                                  storeCode === HEALTHYPOINTS)
                                  ? 'has-error'
                                  : ''
                              }`}
                            />
                          </div>
                          <div className='text-red-500 text-s'>
                            {touched.zipCode && errors.zipCode}
                          </div>
                        </div>

                        <div className='w-full lg:w-1/2 px-3 pb-[10px]'>
                          <label
                            className='mb-[4px] text-normal-text'
                            htmlFor='textCity'
                          >
                            City <span className='text-rose-500'>*</span>
                          </label>
                          <div className=''>
                            <input
                              id='textCity'
                              name='cityName'
                              placeholder=''
                              value={values.cityName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`form-input !w-[calc(100%-40px)] ${
                                touched.cityName &&
                                errors.cityName &&
                                (storeCode === UCA ||
                                  storeCode === HEALTHYPOINTS)
                                  ? 'has-error'
                                  : ''
                              }`}
                            />
                          </div>
                          <div className='text-red-500 text-s'>
                            {touched.cityName && errors.cityName}
                          </div>
                        </div>

                        <div className='w-full lg:w-1/2 px-3 pb-[10px]'>
                          <label
                            className='mb-[4px] text-normal-text'
                            htmlFor='textState'
                          >
                            State/Provience{' '}
                            <span className='text-rose-500'>*</span>
                          </label>
                          <div className=''>
                            <select
                              className={`form-input !w-[calc(100%-40px)] ${
                                touched.state &&
                                errors.state &&
                                (storeCode === UCA ||
                                  storeCode === HEALTHYPOINTS)
                                  ? 'has-error'
                                  : ''
                              }`}
                              id='textState'
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
                          <label
                            className='mb-[4px] text-normal-text'
                            htmlFor='textCountry'
                          >
                            Country <span className='text-rose-500'>*</span>
                          </label>
                          <div className=''>
                            <select
                              id='textCountry'
                              className={`form-input !w-[calc(100%-40px)] ${
                                touched.country &&
                                errors.country &&
                                (storeCode === UCA ||
                                  storeCode === HEALTHYPOINTS)
                                  ? 'has-error'
                                  : ''
                              }`}
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
                          <label
                            className='mb-[4px] text-normal-text'
                            htmlFor='textPhone'
                          >
                            {storeCode === BACARDI
                              ? 'Phone Number'
                              : 'Company Phone Number'}
                            <span className='text-rose-500'>*</span>
                          </label>
                          <div className=''>
                            <input
                              id='textPhone'
                              name='phoneNumber'
                              placeholder=''
                              value={values.phoneNumber}
                              className={`form-input !w-[calc(100%-40px)] ${
                                touched.phoneNumber &&
                                errors.phoneNumber &&
                                (storeCode === UCA ||
                                  storeCode === HEALTHYPOINTS)
                                  ? 'has-error'
                                  : ''
                              }`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className='text-red-500 text-s'>
                            {touched.phoneNumber && errors.phoneNumber}
                          </div>
                        </div>

                        {/* {!(storeCode === 'PKHG') && (
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
                        </div> */}
                      </div>
                    )}

                    {/* <div className='has-error'>{JSON.stringify(errors)}</div> */}

                    <div className='flex justify-center items-center p-[15px] rounded-t border-t sticky top-0 left-0 bg-[#ffffff] z-50 w-full'>
                      {/* {showSection == 'Submit' ? ( */}
                      <>
                        <button
                          type='button'
                          className='btn btn-secondary mr-[15px] focus:outline-none'
                          onClick={() => setShowSection('Login')}
                        >
                          Back
                        </button>
                        <button
                          type='submit'
                          className={'btn btn-secondary'}
                          // disabled={!terms}
                        >
                          {`Submit `}
                        </button>
                      </>
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

export default SignUp_type6;
