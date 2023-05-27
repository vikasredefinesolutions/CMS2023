import { useTypedSelector_v2 } from '@hooks_v2/index';
import { checkCustomerAlreadyExist } from '@services/checkout.service';
import { ErrorMessage, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

interface _Props {
  setShow: React.Dispatch<
    React.SetStateAction<'Email' | 'EnterPassword' | 'CreatePassword'>
  >;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Please Enter Valid Email Address'),
});

const CO4_EmailInput: React.FC<_Props> = ({ setShow }) => {
  const storeId = useTypedSelector_v2((state) => state.store.id);
  // const { updateCustomerEmail } = useActions_v2();

  const verifyEmailHandler = async (value: { emailAddress: string }) => {
    checkCustomerAlreadyExist(value.emailAddress, storeId!)
      .then((res) => {
        if (!res) return;

        // updateCustomerEmail({
        //   id: res.id,
        //   email: value.emailAddress,
        // });
        if (res.isCustomerExist) {
          setShow('EnterPassword');
        }
        if (res.isGuestCustomer) {
          setShow('CreatePassword');
        }
      })
      .catch();
  };

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
          initialValues={{ emailAddress: '' }}
          onSubmit={verifyEmailHandler}
          validationSchema={validationSchema}
        >
          {({ values, handleChange, handleBlur }) => {
            return (
              <Form>
                <div className='relative z-0 w-full mb-[20px] border border-gray-border rounded'>
                  <input
                    name='emailAddress'
                    placeholder=' '
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.emailAddress}
                    className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
                  />
                  <label
                    htmlFor='emailAddress'
                    className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
                  >
                    Email Address*
                  </label>
                </div>
                <ErrorMessage
                  className='text-red-500 text-xs mt-1'
                  name='emailAddress'
                  component={'p'}
                />
                <div className='mb-[24px]'>
                  <button
                    type={'submit'}
                    id='btn-start-checkout'
                    className='btn btn-secondary btn-lg font-semibold'
                  >
                    START CHECKOUT
                  </button>
                </div>
                <div className='text-small-text tracking-normal'>
                  By continuing, you agree to our Terms of Use and consent to
                  our Privacy Policy.
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default CO4_EmailInput;
