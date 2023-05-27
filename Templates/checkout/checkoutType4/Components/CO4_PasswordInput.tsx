import { useActions_v2 } from '@hooks_v2/index';
import { ErrorMessage, Form, Formik } from 'formik';
import React from 'react';

interface _Props {}

const CO4_PasswordInput: React.FC<_Props> = () => {
  const { update_CheckoutProps } = useActions_v2();
  const forgotPasswordHandler = () => {};
  const verifyPasswordHandler = (input: { emailPassword: string }) => {
    // update_CheckoutProps({
    //   showShippingDetails: true,
    // });
  };

  return (
    <div id='LoginPassword'>
      <div className='text-title-text font-semibold pb-[20px] mb-[20px] border-b border-gray-border'>
        Welcome Back!
      </div>
      <div className='flex flex-wrap justify-between'>
        <div className='w-full lg:max-w-[600px]'>
          <Formik
            initialValues={{ emailPassword: '' }}
            onSubmit={verifyPasswordHandler}
          >
            {({ values, handleBlur, handleChange }) => {
              return (
                <Form>
                  <div className='text-sub-text font-normal mb-[20px] tracking-normal'>
                    Please log in to your account.
                  </div>
                  <div className='relative z-0 w-full mb-[20px] border border-gray-border rounded'>
                    <input
                      type='emailPassword'
                      name='emailPassword'
                      placeholder=' '
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.emailPassword}
                      className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
                    />
                    <label
                      htmlFor='emailPassword'
                      className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
                    >
                      Enter Password*
                    </label>
                  </div>
                  <ErrorMessage
                    className='text-red-500 text-xs mt-1'
                    name='emailAddress'
                    component={'p'}
                  />
                  <div className='mb-6 flex justify-between items-center'>
                    <div>
                      <button
                        type='submit'
                        id='btn-login-password'
                        className='btn btn-secondary btn-lg font-semibold'
                      >
                        CONTINUE
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => forgotPasswordHandler}
                        className='!text-anchor hover:!text-anchor-hover underline text-medium-text'
                      >
                        Forgot Password?
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        <div className=''>
          <button
            onClick={() => {
              // update_CheckoutProps({
              //   checkoutAsGuest: true,
              //   showShippingDetails: true,
              // });
            }}
            className='btn btn-secondary btn-lg font-semibold'
          >
            CHECKOUT AS GUEST
          </button>
        </div>
      </div>
    </div>
  );
};

export default CO4_PasswordInput;
