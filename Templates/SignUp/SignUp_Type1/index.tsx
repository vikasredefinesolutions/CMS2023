/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint-disable-next-line import/named
import { Form, Formik, FormikErrors } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import * as Yup from 'yup';

import { paths } from '@constants/paths.constant';
import { __ValidationText } from '@constants/validation.text';
import {
  _CNA_StoreCustomerAddress,
  _CNA_StoreCustomerModel,
  _CreateNewAccount_Payload,
  createNewAccount_payload,
} from '@payloads/createNewAccount.payload';
import {
  CreateNewAccount,
  GetStoreCustomer,
  getLocationWithZipCode,
  signInUser,
} from '@services/user.service';
import getLocation from 'helpers_v2/getLocation';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';

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
import {
  KlaviyoScriptTag,
  TrackGTMEvent,
  deleteCookie,
  extractCookies,
  setCookie,
} from '@helpers/common.helper';
import { updateCartByNewUserId } from '@services/cart.service';
import { getWishlist } from '@services/wishlist.service';
import SU_EmailInput from './Components/SU1_EmailInput';
import SU1_Input from './Components/SU1_Input';
import SU_PasswordInput from './Components/SU1_PasswordInput';
import SU_StateNcountries from './Components/SU1_StateNcountries';

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
  companyName: Yup.string()
    .trim()
    .required(__ValidationText.signUp.companyName.required)
    .min(__ValidationText.signUp.companyName.minLength)
    .max(__ValidationText.signUp.companyName.maxLength),
  email: Yup.string()
    .trim()
    .email(__ValidationText.signUp.email.valid)
    .required(__ValidationText.signUp.email.required),
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
  storeCustomerAddress: Yup.array().of(
    Yup.object().shape({
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
    }),
  ),
});

const SignUp_type1: React.FC = () => {
  const router = useRouter();
  const {
    showModal,
    updateWishListData,
    setShowLoader,
    updateCustomer,
    logInUser,
  } = useActions_v2();
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const userId = useTypedSelector_v2((state) => state.user.id);
  // const state = useTypedSelector_v2((state) => state);
  // console.log('state', state);

  const loginSubmitHandler = async (enteredInputs: _CNA_StoreCustomerModel) => {
    const location = await getLocation();
    setShowLoader(true);

    const payload: _CreateNewAccount_Payload = {
      storeCustomerModel: {
        ...enteredInputs,
        location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
        ipAddress: location.ip_address,
        storeId: storeId,
        customerType: 'corporate',
        industryId: 0,
        gender: 'string',
        memberFrom: 0,
        memberTo: 0,
        organizationId: 0,
        primaryColor: '',
        mascotId: '',
        teamGender: '',
        timeOfYearPurchase: '',
        position: '',
        navCustomerId: '',
        storeCustomerAddress: [
          {
            ...enteredInputs.storeCustomerAddress[0],
            addressType: UserAddressType.BILLINGADDRESS,
            companyName: enteredInputs.companyName,
            firstname: enteredInputs.firstname,
            lastName: enteredInputs.lastName,
            email: enteredInputs.email,
            recStatus: 'A',
          },
        ],
        recStatus: 'A',
      },
    };

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
      const userRegistrationEventPayload = {
        user_firstname: payload?.storeCustomerModel?.firstname,
        user_lastname: payload?.storeCustomerModel?.lastName,
        user_email: payload?.storeCustomerModel?.email,
        user_phone: payload?.storeCustomerModel?.storeCustomerAddress[0]?.phone,
        companyName: payload?.storeCustomerModel?.companyName,
        jobTitle: payload?.storeCustomerModel?.jobTitle,
        address1:
          payload?.storeCustomerModel?.storeCustomerAddress[0]?.address1,
        address2:
          payload?.storeCustomerModel?.storeCustomerAddress[0]?.address2,
        zipcode:
          payload?.storeCustomerModel?.storeCustomerAddress[0]?.postalCode,
        city: payload?.storeCustomerModel?.storeCustomerAddress[0]?.city,
        state: payload?.storeCustomerModel?.storeCustomerAddress[0]?.state,
        coutry:
          payload?.storeCustomerModel?.storeCustomerAddress[0]?.countryName,
        location: `${location?.city}, ${location?.region}, ${location?.country}, ${location?.postal_code}`,
      };
      TrackGTMEvent(userRegistrationEventPayload);
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
          // CartController();
        });
      router.push(paths.HOME);
    });
  };

  const getStateCountry = async (zipCode: string) => {
    const res = await getLocationWithZipCode(zipCode);

    return res;
  };

  if (userId) {
    router.push(paths.HOME);
    return <></>;
  }

  return (
    <>
      <section className='pt-[40px] pb-[30px]'>
        <div className='container mx-auto'>
          <div className='text-4xl text-center '>
            <h1>CREATE NEW CUSTOMER ACCOUNT</h1>
          </div>
        </div>
      </section>
      <section className=''>
        <Formik
          initialValues={{
            ...createNewAccount_payload.storeCustomerModel,
            storeCustomerAddress: [
              {
                ...createNewAccount_payload.storeCustomerModel
                  .storeCustomerAddress[0],
                state: '',
                countryCode: '',
                countryName: '',
              },
            ],
          }}
          onSubmit={loginSubmitHandler}
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
            ) => {
              handleBlur(e);

              getStateCountry(e.target.value).then((res) => {
                if (res?.countryId) {
                  setFieldValue('storeCustomerAddress[0].city', res.cityName);
                  setFieldValue(
                    'storeCustomerAddress[0].countryName',
                    res.countryId,
                  );
                  setFieldValue('storeCustomerAddress[0].state', res.stateId);
                }
              });
            };
            return (
              <Form>
                <div className='container mx-auto mb-6'>
                  <div className='w-full mx-auto max-w-5xl bg-light-gray p-5'>
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
                      <SU1_Input
                        name={'companyName'}
                        value={values?.companyName ? values.companyName : ''}
                        label={'Company Name'}
                        onChange={handleChange}
                        placeHolder={'Enter Your Company Name'}
                        required
                        onBlur={handleBlur}
                        touched={!!touched.companyName}
                        error={errors?.companyName ? errors.companyName : null}
                      />
                      <SU1_Input
                        type={'text'}
                        name={'storeCustomerAddress[0].phone'}
                        value={values.storeCustomerAddress[0].phone}
                        label={'Phone Number'}
                        onChange={handleChange}
                        placeHolder={'Enter Your Phone Number'}
                        required
                        onBlur={handleBlur}
                        touched={
                          touched.storeCustomerAddress
                            ? !!touched.storeCustomerAddress[0].phone
                            : false
                        }
                        error={
                          errors.storeCustomerAddress
                            ? (
                                errors
                                  .storeCustomerAddress[0] as FormikErrors<_CNA_StoreCustomerAddress>
                              ).phone!
                            : null
                        }
                      />
                      <SU_EmailInput
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
                      />
                      <SU1_Input
                        name={'jobTitle'}
                        value={values.jobTitle}
                        label={'Job Title'}
                        onChange={handleChange}
                        placeHolder={'Enter Your Job Title'}
                        onBlur={handleBlur}
                        touched={!!touched.jobTitle}
                        error={errors?.jobTitle ? errors.jobTitle : null}
                      />
                      <SU_PasswordInput
                        name={'password'}
                        value={values.password}
                        label={'Password'}
                        onChange={handleChange}
                        placeHolder='Password'
                        required={true}
                        touched={!!touched.password}
                        error={errors?.password ? errors.password : null}
                      />
                      <SU_PasswordInput
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
                        name={'storeCustomerAddress[0].address1'}
                        value={values.storeCustomerAddress[0].address1}
                        label={'Address 1'}
                        onChange={handleChange}
                        placeHolder='Enter Your Address 1'
                        onBlur={handleBlur}
                        touched={
                          touched.storeCustomerAddress
                            ? !!touched.storeCustomerAddress[0].address1
                            : false
                        }
                        error={
                          errors.storeCustomerAddress
                            ? (
                                errors
                                  .storeCustomerAddress[0] as FormikErrors<_CNA_StoreCustomerAddress>
                              ).address1!
                            : null
                        }
                      />
                      <SU1_Input
                        name={'storeCustomerAddress[0].address2'}
                        value={values.storeCustomerAddress[0].address2}
                        label={'Address 2'}
                        onChange={handleChange}
                        placeHolder='Enter Your Address 2'
                        onBlur={handleBlur}
                        touched={
                          touched.storeCustomerAddress
                            ? !!touched.storeCustomerAddress[0].address2
                            : false
                        }
                        error={
                          errors.storeCustomerAddress
                            ? (
                                errors
                                  .storeCustomerAddress[0] as FormikErrors<_CNA_StoreCustomerAddress>
                              ).address2!
                            : null
                        }
                      />
                      <SU1_Input
                        name={'storeCustomerAddress[0].postalCode'}
                        value={values.storeCustomerAddress[0].postalCode}
                        label={'Zip Code'}
                        onChange={handleChange}
                        placeHolder='Enter Your Zip Code'
                        onBlur={customHandleBlur}
                        touched={
                          touched.storeCustomerAddress
                            ? !!touched.storeCustomerAddress[0].postalCode
                            : false
                        }
                        error={
                          errors.storeCustomerAddress
                            ? (
                                errors
                                  .storeCustomerAddress[0] as FormikErrors<_CNA_StoreCustomerAddress>
                              ).postalCode!
                            : null
                        }
                      />
                      <SU1_Input
                        name={'storeCustomerAddress[0].city'}
                        value={values.storeCustomerAddress[0].city}
                        label={'City'}
                        onChange={handleChange}
                        placeHolder='Enter Your City'
                        onBlur={handleBlur}
                        touched={
                          touched.storeCustomerAddress
                            ? !!touched.storeCustomerAddress[0].city
                            : false
                        }
                        error={
                          errors.storeCustomerAddress
                            ? (
                                errors
                                  .storeCustomerAddress[0] as FormikErrors<_CNA_StoreCustomerAddress>
                              ).city!
                            : null
                        }
                      />
                      <SU_StateNcountries
                        countryName={'storeCustomerAddress[0].countryName'}
                        countryValue={
                          values.storeCustomerAddress[0].countryName
                        }
                        stateName={'storeCustomerAddress[0].state'}
                        stateValue={values.storeCustomerAddress[0].state}
                        setFieldValue={setFieldValue}
                      />
                      <div className='w-full lg:w-full px-[15px] text-center'>
                        <button
                          type='submit'
                          className='btn btn-secondary btn-xl'
                        >
                          SUBMIT
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </section>
    </>
  );
};

export default SignUp_type1;
