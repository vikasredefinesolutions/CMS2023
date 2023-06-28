import { __ValidationText } from '@constants/validation.text';
import { useActions_v2 } from '@hooks_v2/index';
import { _CO6_Screens } from '@templates/checkout/checkoutType6/CO6_Extras';
import { ErrorMessage, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

interface _Props {
  setScreenToShow: React.Dispatch<React.SetStateAction<_CO6_Screens>>;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(__ValidationText.email.required),
});

const CO6_LoginMenu: React.FC<_Props> = ({ setScreenToShow }) => {
  const { update_CheckoutUser } = useActions_v2();

  const emailSubmitHandler = (input: { email: string }) => {
    update_CheckoutUser({ email: input.email });
    setScreenToShow('addShipping');
  };

  return (
    <div
      id='LoginMain'
      className='bg-light-gray p-[15px] mb-[15px] sb_checkoutpage'
    >
      <Formik
        initialValues={{ email: '' }}
        onSubmit={emailSubmitHandler}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, handleBlur }) => {
          return (
            <Form>
              <div className='checkoutpage' id='LoginEmail'>
                <div className='text-title-text font-semibold pb-[20px] mb-[20px] border-b border-gray-border'>
                  Email Address
                </div>
                <div className='text-sub-text font-normal mb-[20px] tracking-normal'>
                  Tell us where to send your order confirmation and tracking
                  number.
                </div>
                <div className='max-w-[600px]'>
                  <div className="w-full pr-[15px]">
                    <label className="mb-[4px] text-normal-text">Email Address *</label>
                    <div className="flex flex-wrap  justify-between items-center ">
                      <input
                        name='email'
                        placeholder=' '
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='form-input w-full'
                      />
</div></div>


                 
                  <ErrorMessage
                    name='email'
                    className='text-rose-500'
                    component={'p'}
                  />
                  <div className='mb-[24px] mt-[15px]'>
                    <button
                      type='submit'
                      className='btn btn-quaternary btn-lg font-semibold'
                    >
                      START CHECKOUT
                    </button>
                  </div>
                  <div className='text-small-text tracking-normal'>
                    By continuing, you agree to our Terms of Use and consent to
                    our Privacy Policy.
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
      {/* <div id='LoginPassword' style={{ display: 'none' }}>
        <div className='text-title-text font-semibold pb-[20px] mb-[20px] border-b border-gray-border'>
          Welcome Back!
        </div>
        <div className='flex flex-wrap justify-between'>
          <div className='w-full lg:max-w-[600px]'>
            <div className='text-sub-text font-normal mb-[20px] tracking-normal'>
              Please log in to your account.
            </div>
            <div className='relative z-0 w-full mb-[20px] border border-gray-border rounded'>
              <input
                type='password'
                name='EmailPassword'
                placeholder=' '
                className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
              />
              <label
                htmlFor='EmailPassword'
                className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
              >
                Enter Password*
              </label>
            </div>
            <div className='mb-6 flex justify-between items-center'>
              <div>
                <button
                  href='javascript:void(0);'
                  id='btn-login-password'
                  className='btn btn-quaternary btn-lg font-semibold'
                >
                  CONTINUE
                </button>
              </div>
              <div>
                <button
                  href='javascript:void(0);'
                  className='!text-anchor hover:!text-anchor-hover underline text-medium-text'
                  data-modal-toggle='forgetpasswordModal'
                >
                  Forgot Password?
                </button>
              </div>
            </div>
          </div>
          <div className=''>
            <button
              href='checkout-guest.html'
              className='btn btn-quaternary btn-lg font-semibold'
            >
              CHECKOUT AS GUEST
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default CO6_LoginMenu;
