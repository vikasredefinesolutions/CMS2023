/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint-disable-next-line import/named
import { Form, Formik, FormikErrors } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
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

import { _Store } from '@configs/page.config';
import { _STORE_EMAIL } from '@constants/common.constant';
import { UserAddressType } from '@constants/enum';
import {
  CYXTERA_CODE,
  HEALTHYPOINTS,
  SIMPLI_SAFE_CODE,
  UNITI_CODE,
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
import SU_EmailInput from './Components/SU1_EmailInput';
import SU1_Input from './Components/SU1_Input';
import SU_PasswordInput from './Components/SU1_PasswordInput';

const SignUp_type1: React.FC = () => {
  const router = useRouter();
  const {
    showModal,
    updateWishListData,
    setShowLoader,
    updateCustomer,
    logInUser,
  } = useActions_v2();
  const { id: storeId, code: storeCode } = useTypedSelector_v2(
    (state) => state.store,
  );
  const [country, setCountry] = useState<_Country[]>([]);
  const [state, setState] = useState<_State[]>([]);
  const user = useTypedSelector_v2((state) => state.user);

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
      .required(__ValidationText.signUp.email.required)
      .test(
        'custom-email-test',
        `Please enter ${
          (_STORE_EMAIL as any)[storeCode] || ''
        }  email address.`,
        (value) => {
          const domain = (_STORE_EMAIL as any)[storeCode];
          if (!domain) return true;
          const emailTest = new RegExp(
            "^\\w+([-+.']w+)*@" + domain + '.com$',
          ).test(value?.trim() || '');
          return emailTest;
        },
      ),
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

        postalCode: Yup.string().max(
          __ValidationText.signUp.storeCustomerAddress.postalCode.maxLength,
          'Postal code must be less than 9',
        ),
      }),
    ),
  });

  const { code: stroeCode } = useTypedSelector_v2((state) => state.store);

  const loginSubmitHandler = async (enteredInputs: _CNA_StoreCustomerModel) => {
    const location = await getLocation();
    setShowLoader(true);

    let addressObj = [
      {
        ...enteredInputs.storeCustomerAddress[0],
        addressType: UserAddressType.BILLINGADDRESS,
        companyName: enteredInputs.companyName,
        firstname: enteredInputs.firstname,
        lastName: enteredInputs.lastName,
        email: enteredInputs.email,
        recStatus: 'A',
      },
    ];

    if (
      storeCode === HEALTHYPOINTS ||
      storeCode === SIMPLI_SAFE_CODE ||
      storeCode === UNITI_CODE ||
      storeCode === CYXTERA_CODE
    ) {
      addressObj.push({
        ...enteredInputs.storeCustomerAddress[0],
        addressType: UserAddressType.SHIPPINGADDRESS,
        companyName: enteredInputs.companyName,
        firstname: enteredInputs.firstname,
        lastName: enteredInputs.lastName,
        email: enteredInputs.email,
        recStatus: 'A',
      });
    }

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
        navCustomerId: enteredInputs.navCustomerId
          ? enteredInputs.navCustomerId
          : '',
        storeCustomerAddress: addressObj,
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

  // if (userId) {
  //   router.push(paths.HOME);
  //   return <></>;
  // }

  return (
    <>
      <section className='pt-[40px] pb-[30px]'>
        <div className='container mx-auto'>
          <div className='text-2xl-text text-center '>
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
                    res.countryName,
                  );
                  FetchStatesList(res.countryId).then((response) => {
                    setState(response ? response : []);

                    setFieldValue(
                      'storeCustomerAddress[0].state',
                      res.stateName,
                    );
                  });
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

                      <div className='w-full lg:w-1/2 px-[15px]'>
                        <label className='block text-default-text'>
                          Country
                        </label>
                        <div className='mt-2 relative'>
                          <div className='mr-8'>
                            <select
                              className='form-input'
                              name='storeCustomerAddress[0].countryName'
                              value={values.storeCustomerAddress[0].countryName}
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

                      <div className='w-full lg:w-1/2 px-[15px]'>
                        <label className='block text-default-text'>State</label>
                        <div className='mt-2 relative'>
                          <div className='mr-8'>
                            <select
                              className='form-input'
                              name='storeCustomerAddress[0].state'
                              value={values.storeCustomerAddress[0].state}
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

                      {storeCode == _Store.type4 && (
                        <SU1_Input
                          name={'navCustomerId'}
                          value={values.navCustomerId}
                          label={'Customer Number:'}
                          onChange={handleChange}
                          placeHolder={'Enter Your Customer Number'}
                          onBlur={handleBlur}
                          touched={!!touched.navCustomerId}
                          error={
                            errors?.navCustomerId ? errors.navCustomerId : null
                          }
                        />
                      )}
                      {/* <SU1_StateNcountries
                        countryName={'storeCustomerAddress[0].countryName'}
                        countryValue={
                          values.storeCustomerAddress[0].countryName
                        }
                        stateName={'storeCustomerAddress[0].state'}
                        stateValue={values.storeCustomerAddress[0].state}
                        setFieldValue={setFieldValue}
                      /> */}

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
