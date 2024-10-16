import ForgotModal from '@appComponents/modals/forgotModal';
import { checkoutPasswordValidationSchema } from '@constants/schemas/checkout.schema';
import { Form, Formik } from 'formik';
import { FC, useState } from 'react';

const LoginPassword: FC<{
  // eslint-disable-next-line no-unused-vars
  loginCustomer: (arg: { password: string }) => void;
}> = ({ loginCustomer }) => {
  const validationSchema = checkoutPasswordValidationSchema;
  const [showModal, setShowModal] = useState<string | null>(null);

  return (
    <>
      <div id='LoginPassword'>
        
        <div className='flex flex-wrap justify-between'>
          <div className='w-full lg:max-w-[600px]'>
            <div className='text-sub-text font-normal mb-[20px] tracking-normal'>
            Welcome Back! Please log into your account to place your custom order.
            </div>
            <Formik
              validationSchema={validationSchema}
              initialValues={{ password: '' }}
              onSubmit={loginCustomer}
            >
              {({ errors, handleSubmit, handleBlur, handleChange }) => (
                <Form onSubmit={handleSubmit}>
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
                      htmlFor='EmailPassword'
                      className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
                    >
                      Enter Password*
                    </label>
                  </div>
                  {errors.password && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.password}
                    </p>
                  )}
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
                      <a
                        href='javascript:void(0);'
                        className='!text-anchor hover:!text-anchor-hover underline text-medium-text'
                        data-modal-toggle='forgetpasswordModal'
                        onClick={() => setShowModal('forgot')}
                      >
                        Forgot Password?
                      </a>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      {showModal === 'forgot' && <ForgotModal modalHandler={setShowModal} />}
    </>
  );
};

export default LoginPassword;
