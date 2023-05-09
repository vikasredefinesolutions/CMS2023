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
import { CreateNewAccount } from '@services/user.service';
import getLocation from 'helpers_v2/getLocation';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';

import { __UserMessages } from '@constants/global.constant';
import { TrackGTMEvent } from '@helpers/common.helper';
import SU_EmailInput from './Components/SU1_EmailInput';
import SU1_Input from './Components/SU1_Input';
import SU_PasswordInput from './Components/SU1_PasswordInput';
import SU_StateNcountries from './Components/SU1_StateNcountries';

//Regex for multiple phone number pattern test
const pattern1 = /^\(?([0-9]{3})\)?[-]([0-9]{3})[-]([0-9]{4})$/; //Matches xxx-xxx-xxxx
const pattern2 = /^\(?([0-9]{3})\)?[.]([0-9]{3})[.]([0-9]{4})$/; //Matches xxx.xxx.xxxx
const pattern3 = /^\(?([0-9]{3})\)?[ ]([0-9]{3})[ ]([0-9]{4})$/; //Matches xxx xxx xxxx
const pattern4 = /^[0-9]{10}$/; //Matches xxxxxxxxxx

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
              pattern1.test(value || '') ||
              pattern2.test(value || '') ||
              pattern3.test(value || '') ||
              pattern4.test(value || '')
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
  const { showModal } = useActions_v2();
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const userId = useTypedSelector_v2((state) => state.user.id);
  // const state = useTypedSelector_v2((state) => state);
  // console.log('state', state);

  const loginSubmitHandler = async (enteredInputs: _CNA_StoreCustomerModel) => {
    const location = await getLocation();

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
            addressType: 'B',
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

    CreateNewAccount(payload).then((res) => {
      if (res === null) {
        showModal({
          message: res || __UserMessages.signUpPage.SomethingWentWrong,
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
      TrackGTMEvent('user_registration', userRegistrationEventPayload);
      showModal({
        message: __UserMessages.signUpPage.SuccessFullyAccountCreated,
        title: 'Success',
      });
      router.push(paths.HOME);
    });
  };

  if (userId) {
    router.push(paths.HOME);
    return <></>;
  }

  return (
    <>
      <section className='pt-[40px] pb-[30px]'>
        <div className='container mx-auto'>
          <div className='text-2xl-text text-center'>
            CREATE NEW CUSTOMER ACCOUNT
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
                        onBlur={handleBlur}
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
