/* eslint-disable no-unused-vars */
import { __Cookie } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { extractCookies } from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { UpdatePasswordForGuestEmail } from '@services/user.service';
// eslint-disable-next-line import/named
import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Enter a password')
    .min(6, 'Password must contain 6 characters'),
});

const ThankYouCreatePassword: React.FC = () => {
  const guestEmail = useTypedSelector_v2((state) => state.cart.email);
  const { cart_userUpdate } = useActions_v2();
  const guestId = extractCookies(
    __Cookie.tempCustomerId,
    'browserCookie',
  ).tempCustomerId;

  const passwordHandler = async (
    input: { password: string },
    actions: FormikHelpers<{ password: string }>,
  ) => {
    const response = await UpdatePasswordForGuestEmail({
      customerId: 122,
      email: guestEmail,
      password: input.password,
    });

    if (response?.firstname) {
      cart_userUpdate({
        type: 'noMoreAGuest',
        data: {
          isGuestCustomer: false,
        },
      });
      return;
    }
    actions.setErrors({ password: 'Something went wrong. Try again!!!' });
  };

  return (
    <div className='pt-2'>
      <div className='pb-2 text-sm text-white font-semibold'>
        {__pagesText.ThankYouPage.CreatePassword}{' '}
      </div>
      <Formik
        initialValues={{ password: '' }}
        onSubmit={passwordHandler}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, handleSubmit }) => {
          return (
            <Form>
              <div className='flex mb-6 items-start gap-2'>
                <div className='relative z-0'>
                  <input
                    type='password'
                    name='password'
                    placeholder='Enter Password'
                    value={values.password}
                    onChange={handleChange}
                    className='form-input'
                  />
                  <div className='text-sm text-white'>
                    <ErrorMessage
                      name='password'
                      className='text-rose-500'
                      component={'p'}
                    />
                  </div>
                </div>
                <div>
                  <button
                    type='button'
                    onClick={() => handleSubmit()}
                    className='btn btn-secondary'
                  >
                    {__pagesText.ThankYouPage.CreateAccount}
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ThankYouCreatePassword;
