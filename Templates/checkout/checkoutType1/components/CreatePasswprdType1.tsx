import { checkoutNewAccountPasswordValidationSchema } from '@constants/schemas/checkout.schema';
import { Form, Formik } from 'formik';
import { FC } from 'react';

/* eslint-disable no-unused-vars */
type Props = {
  continueAsGuest: () => void;
  createAccountHandler: (arg: {
    password: string;
    confirmPassword: string;
  }) => void;
  allowGuest: boolean;
};
/* eslint-enable no-unused-vars */

const CreatePassword: FC<Props> = ({
  continueAsGuest,
  createAccountHandler,
  allowGuest,
}) => {
  const validationSchema = checkoutNewAccountPasswordValidationSchema;
  return (
    <div id='LoginPassword'>
      <div className='text-title-text font-semibold pb-[20px] mb-[20px] border-b border-gray-border'>
        Create an Account
      </div>
      <div className='flex flex-wrap justify-between'>
        <div className='w-full lg:max-w-[600px]'>
          <div className='text-sub-text font-normal tracking-normal'>
            Welcome! It looks like you’re new here.
          </div>
          <div className='text-sub-text font-normal mb-[20px] tracking-normal'>
            Please set a password to create a new account.
          </div>
          <Formik
            validationSchema={validationSchema}
            onSubmit={createAccountHandler}
            initialValues={{
              password: '',
              confirmPassword: '',
            }}
          >
            {({ handleBlur, handleChange, errors, touched }) => (
              <Form>
                <div className='relative z-0 w-full mb-[20px] border border-gray-border rounded'>
                  <input
                    type='password'
                    name='password'
                    placeholder=' '
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
                  />
                  <label
                    htmlFor='password'
                    className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
                  >
                    Create Password*
                  </label>
                </div>
                <div className='text-red-500 text-s mt-1'>
                  {touched.password && errors.password}
                </div>
                <div className='relative z-0 w-full mb-[20px] border border-gray-border rounded'>
                  <input
                    type='password'
                    name='confirmPassword'
                    placeholder=' '
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
                  />
                  <label
                    htmlFor='confirmPassword'
                    className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
                  >
                    Verify Password*
                  </label>
                </div>
                <div className='text-red-500 text-s mt-1'>
                  {touched.confirmPassword && errors.confirmPassword}
                </div>
                <div className='mb-6 flex justify-between items-center'>
                  <div>
                    <button
                      id='btn-login-password'
                      className='btn btn-secondary btn-lg font-semibold'
                      type={'submit'}
                    >
                      CONTINUE
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        {allowGuest && (
          <div className=''>
            <button
              className='btn btn-secondary btn-lg font-semibold'
              onClick={continueAsGuest}
            >
              CHECKOUT AS GUEST
            </button>
          </div>
        )}
        <div className='text-small-text tracking-normal'>
          By continuing, you agree to our Terms of Use and consent to our
          Privacy Policy.
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;
