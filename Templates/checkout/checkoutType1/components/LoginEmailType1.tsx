import { checkoutEmailvalidationSchema } from '@constants/schemas/checkout.schema';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { FC } from 'react';

const LoginEmail: FC<{
  // eslint-disable-next-line no-unused-vars
  checkEmail: (arg: { email: string }) => void;
}> = ({ checkEmail }) => {
  const validationSchema = checkoutEmailvalidationSchema;

  return (
    <div className='' id='LoginEmail'>
      <div className='text-title-text font-semibold pb-[20px] mb-[20px] border-b border-gray-border'>
        Email Address
      </div>
      <div className='text-sub-text font-normal mb-[20px] tracking-normal'>
        Tell us where to send your order confirmation and tracking number.
      </div>
      <div className='max-w-[600px]'>
        <Formik
          onSubmit={checkEmail}
          initialValues={{ email: '' }}
          validationSchema={validationSchema}
        >
          {({ errors, handleSubmit, handleBlur, handleChange }) => (
            <Form>
              <div className='relative z-0 w-full border border-gray-border rounded'>
                <input
                  name='email'
                  placeholder=' '
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
                />
                <label
                  htmlFor='EmailAddress'
                  className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
                >
                  Email Address*
                </label>
              </div>
              {errors.email && (
                <p className='text-red-500 text-xs mt-1'>{errors.email}</p>
              )}
              <div className='mb-[24px] mt-[20px]'>
                <button
                  id='btn-start-checkout'
                  className='btn btn-secondary btn-lg font-semibold'
                  type='submit'
                >
                  START CHECKOUT
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className='text-small-text tracking-normal'>
        By continuing, you agree and consent to our 
           {' '}<Link href='/privacy-policy.html'><a>Privacy Policy</a></Link>.
        </div>
      </div>
    </div>
  );
};

export default LoginEmail;
