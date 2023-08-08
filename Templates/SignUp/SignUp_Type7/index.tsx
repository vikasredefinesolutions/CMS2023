/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint-disable-next-line import/named
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

import { paths } from '@constants/paths.constant';
import { __ValidationText } from '@constants/validation.text';
import { _CreateNewAccount_Payload } from '@payloads/createNewAccount.payload';
import {
  CreateNewAccount,
  GetStoreCustomer,
  getLocationWithZipCode,
  signInUser,
} from '@services/user.service';
import getLocation from 'helpers_v2/getLocation';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';

import AccountCreateSuccessModal from '@appComponents/modals/accountCreateSuccessModal';
import { _STORE_EMAIL } from '@constants/common.constant';
import { UserAddressType } from '@constants/enum';
import {
  __Cookie,
  __Cookie_Expiry,
  __UserMessages,
  phonePattern1,
  phonePattern2,
  phonePattern3,
  phonePattern4,
} from '@constants/global.constant';
import { _Country, _State } from '@definations/app.type';
import {
  KlaviyoScriptTag,
  deleteCookie,
  extractCookies,
  setCookie,
} from '@helpers/common.helper';
import { updateCartByNewUserId } from '@services/cart.service';
import { FetchCountriesList, FetchStatesList } from '@services/general.service';
import { getWishlist } from '@services/wishlist.service';
import {
  _SU5_InitialValues,
  su5_initialValues,
} from '../SignUP_Type6/SU6.extra';
import SU1_EmailInput from '../SignUp_Type1/Components/SU1_EmailInput';
import SU1_Input from '../SignUp_Type1/Components/SU1_Input';
import SU1_PasswordInput from '../SignUp_Type1/Components/SU1_PasswordInput';

const SignUp_type7: React.FC = () => {
  const router = useRouter();
  const {
    showModal,
    updateWishListData,
    setShowLoader,
    updateCustomer,
    logInUser,
  } = useActions_v2();
  const {
    id: storeId,
    code: storeCode,
    storeName,
  } = useTypedSelector_v2((state) => state.store);

  let modalShowState: boolean;

  const [country, setCountry] = useState<_Country[]>([]);
  const [state, setState] = useState<_State[]>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const user = useTypedSelector_v2((state) => state.user);

  useEffect(() => {}, [modalShow]);

  const modalHandlerFunction = (boolVal: boolean) => {
    modalShowState = boolVal;
    setModalShow(boolVal);
  };

  const _SignupSchema = Yup.object().shape({
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
  });

  const handleFormikSubmit = async (values: _SU5_InitialValues) => {
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
        });
      router.push(paths.HOME);
    });
  };

  const getStateCountry = async (zipCode: string) => {
    const res = await getLocationWithZipCode(zipCode);

    return res;
  };
  useEffect(() => {
    if (user.id) {
      router.push('/');
    }
  }, [user.id]);

  useEffect(() => {
    FetchCountriesList().then((response) => {
      setCountry(response ? response : []);
    });

    FetchStatesList(1).then((response) => {
      setState(response ? response : []);
    });
  }, []);

  const customChangeHandler = (e: any, handleChange: any) => {
    handleChange(e);
    let countryId = e.target[e?.target.selectedIndex].id;
    FetchStatesList(countryId).then((response) => {
      setState(response ? response : []);
    });
  };

  return (
    <>
      <section className=''>
        <div className='container mx-auto'>
          <div
            className={`
            text-sub-text text-center bg-white pt-[30px] pb-[30px]`}
          >
            <h1>SIGN UP</h1>
          </div>
        </div>
      </section>
      <section className=''>
        <Formik
          initialValues={su5_initialValues}
          onSubmit={handleFormikSubmit}
          validationSchema={_SignupSchema}
        >
          {({
            values,
            handleChange,
            setFieldValue,
            touched,
            errors,
            handleBlur,
            setFieldError,
          }) => {
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
                    setState(response ? response : []);
                    setFieldValue('state', res.stateName);
                  });
                }
              });
            };

            return (
              <Form>
                <div className='container mx-auto'>
                  <div className='bg-white pb-6'>
                    <div className='w-full mx-auto max-w-5xl p-5'>
                      <div className='w-full text-sub-text mb-5'>
                        Personal Information
                      </div>
                      <div className='flex flex-wrap mx-[-15px] gap-y-6'>
                        <SU1_Input
                          name={'firstname'}
                          value={values.firstname}
                          label={'First Name'}
                          onChange={handleChange}
                          placeHolder={'Enter Your First Name'}
                          required
                          onBlur={handleBlur}
                          touched={!!touched.firstname}
                          error={errors?.firstname ? errors.firstname : null}
                        />
                        <SU1_Input
                          name={'lastName'}
                          value={values.lastName}
                          label={'Last Name'}
                          onChange={handleChange}
                          placeHolder='Enter Your Last Name'
                          required
                          onBlur={handleBlur}
                          touched={!!touched.lastName}
                          error={errors?.lastName ? errors.lastName : null}
                        />

                        <SU1_EmailInput
                          name={'email'}
                          value={values.email}
                          label={'Email Address'}
                          onChange={handleChange}
                          placeHolder={'Enter Email Address'}
                          required
                          onBlur={handleBlur}
                          touched={!!touched.email}
                          error={errors?.email ? errors.email : null}
                          setError={setFieldError}
                          className='w-full lg:w-full'
                        />

                        <SU1_PasswordInput
                          name={'password'}
                          value={values.password}
                          label={'Password'}
                          onChange={handleChange}
                          placeHolder='Password'
                          required={true}
                          touched={!!touched.password}
                          error={errors?.password ? errors.password : null}
                        />
                        <SU1_PasswordInput
                          name={'confirmPassword'}
                          value={values.confirmPassword}
                          label={'Confirm Password'}
                          onChange={handleChange}
                          placeHolder='Password'
                          required={true}
                          touched={!!touched.confirmPassword}
                          error={
                            errors?.confirmPassword
                              ? errors.confirmPassword
                              : null
                          }
                        />
                        <SU1_Input
                          name='companyAddress'
                          value={values.companyAddress}
                          label={'Ship to Address'}
                          onChange={handleChange}
                          placeHolder={'Enter Your Address'}
                          onBlur={handleBlur}
                          className='w-full lg:w-full'
                          touched={!!touched.companyAddress}
                          error={errors.companyAddress || null}
                          required
                        />

                        <SU1_Input
                          name='zipCode'
                          value={values.zipCode}
                          label={'Zip Code'}
                          onChange={handleChange}
                          placeHolder='Enter Your Zip Code'
                          onBlur={(e) =>
                            customHandleBlur(e, handleBlur, setFieldValue)
                          }
                          touched={!!touched.zipCode}
                          error={errors.zipCode || null}
                          required
                        />
                        <SU1_Input
                          name='cityName'
                          value={values.cityName}
                          label={'City'}
                          onChange={handleChange}
                          placeHolder='Enter Your City'
                          onBlur={handleBlur}
                          touched={!!touched.cityName}
                          error={errors.cityName || null}
                          required
                        />

                        <div className='w-full lg:w-1/2 px-[15px]'>
                          <label className='block text-default-text'>
                            State / Province
                            <span className='ml-1 text-rose-500'>*</span>
                          </label>
                          <div className='mt-2 relative'>
                            <div className='mr-8'>
                              <select
                                className='form-input'
                                name='state'
                                value={values.state}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <>
                                  {country.length === 0 ? (
                                    <option>No State found</option>
                                  ) : (
                                    ''
                                  )}
                                  {state?.map((opt) => (
                                    <option id={opt.id.toString()} key={opt.id}>
                                      {opt.name}
                                    </option>
                                  ))}
                                </>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className='w-full lg:w-1/2 px-[15px]'>
                          <label className='block text-default-text'>
                            Country
                            <span className='ml-1 text-rose-500'>*</span>
                          </label>

                          <div className='mt-2 relative'>
                            <div className='mr-8'>
                              <select
                                className='form-input'
                                name='country'
                                value={values.country}
                                onChange={(e) => {
                                  customChangeHandler(e, handleChange);
                                }}
                                onBlur={handleBlur}
                              >
                                <>
                                  {country.length === 0 ? (
                                    <option>No State found</option>
                                  ) : (
                                    ''
                                  )}
                                  {country?.map((opt) => (
                                    <option id={opt.id.toString()} key={opt.id}>
                                      {opt.name}
                                    </option>
                                  ))}
                                </>
                              </select>
                            </div>
                          </div>
                        </div>
                        <SU1_Input
                          type={'text'}
                          name='phoneNumber'
                          value={values.phoneNumber}
                          label={'Company Phone Number'}
                          onChange={handleChange}
                          placeHolder={'Company Phone Number:'}
                          required
                          onBlur={handleBlur}
                          error={errors.phoneNumber || null}
                          touched={!!touched.phoneNumber}
                        />

                        <div className='w-full lg:w-full px-[15px] text-center'>
                          <button type='submit' className='btn btn-secondary'>
                            SUBMIT
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </section>
      {modalShow && (
        <AccountCreateSuccessModal showModal={modalHandlerFunction} />
      )}
    </>
  );
};

export default SignUp_type7;
