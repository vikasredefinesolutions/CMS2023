// /* eslint-disable @typescript-eslint/no-non-null-assertion */
// // eslint-disable-next-line import/named
import { ErrorMessage, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import * as Yup from 'yup';

import { paths } from '@constants/paths.constant';
import { __ValidationText } from '@constants/validation.text';
import {
  _CNA_StoreCustomerModel,
  _CreateNewAccount_Payload,
  createNewAccount_payload,
} from '@payloads/createNewAccount.payload';
import { CreateNewAccount } from '@services/user.service';
import getLocation from 'helpers_v2/getLocation';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';

import { UserAddressType } from '@constants/enum';
import { __UserMessages } from '@constants/global.constant';

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

const CreateAccount: React.FC = () => {
  const router = useRouter();
  const { showModal } = useActions_v2();
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const userId = useTypedSelector_v2((state) => state.user.id);

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

    CreateNewAccount(payload).then((res) => {
      if (res === null) {
        showModal({
          message: res || __UserMessages.signUpPage.SomethingWentWrong,
          title: 'Error',
        });
        return;
      }
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
    <div className='mt-[10px] border border-gray-border p-[10px] lg:p-[20px] text-center'>
      <div className='text-title-text mb-[10px]'>CREATE AN ACCOUNT</div>
      <div className='mb-[10px]'>
        To see discounted pricing on this product.
      </div>
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
          {({ values, handleChange, handleBlur }) => {
            return (
              <Form>
                {/* <div className='mb-[10px]'>
                  {' '}
                  <input
                    name=''
                    id=''
                    className='form-input'
                    placeholder='First Name'
                    value=''
                  />
                </div> */}

                <div className='mb-[10px]'>
                  <input
                    name={'firstname'}
                    value={values.firstname}
                    onChange={handleChange}
                    placeholder={'Enter Your First Name'}
                    className='form-input'
                    required
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    className='text-rose-500'
                    component={'span'}
                    name={'firstname'}
                  />
                </div>
                <div className='mb-[10px]'>
                  <input
                    name={'lastName'}
                    value={values.lastName}
                    onChange={handleChange}
                    placeholder='Last Name'
                    className='form-input'
                    required
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    className='text-rose-500'
                    component={'span'}
                    name={'lastName'}
                  />
                </div>

                <div className='mb-[10px]'>
                  <input
                    name={'companyName'}
                    value={values?.companyName}
                    onChange={handleChange}
                    placeholder='Company'
                    className='form-input'
                    required
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    className='text-rose-500'
                    component={'span'}
                    name={'companyName'}
                  />
                </div>

                <div className='mb-[10px]'>
                  <input
                    name={'email'}
                    value={values.email}
                    onChange={handleChange}
                    placeholder={'Enter Email Address'}
                    required
                    onBlur={handleBlur}
                    className='form-input'
                  />
                  <ErrorMessage
                    className='text-rose-500'
                    component={'span'}
                    name={'email'}
                  />
                </div>

                <div className='mb-[10px]'>
                  <input
                    name={'password'}
                    type='password'
                    value={values.password}
                    onChange={handleChange}
                    placeholder={'Password'}
                    required
                    onBlur={handleBlur}
                    className='form-input'
                  />
                  <ErrorMessage
                    className='text-rose-500'
                    component={'span'}
                    name={'password'}
                  />
                </div>

                <div className='mb-[10px]'>
                  <button type='submit' className='btn btn-tertiary'>
                    SUBMIT
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </section>
    </div>
  );
};

export default CreateAccount;
