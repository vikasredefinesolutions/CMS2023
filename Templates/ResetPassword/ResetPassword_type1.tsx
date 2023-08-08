import { ErrorMessage, Form, Formik } from 'formik';
import { useEffect } from 'react';

import { paths } from '@constants/paths.constant';
import { __ValidationText } from '@constants/validation.text';

import {
  GetEmailByResetToken,
  ResetPassword as ResetPasswordAPI,
} from '@services/user.service';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .trim()
    .required(__ValidationText.resetPassword.password.required)
    .min(__ValidationText.signUp.password.minLength)
    .max(__ValidationText.signUp.password.maxLength),
  cPassword: Yup.string()
    .trim()
    .required(__ValidationText.resetPassword.confirmPassword.mustMatch)
    .test(
      'passwords-match',
      __ValidationText.resetPassword.confirmPassword.mustMatch,
      function (value) {
        return this.parent.password === value;
      },
    ),
});

const _initialValues: _ResetPassword_InitialValues = {
  password: '',
  cPassword: '',
};

const ResetPassword_type1: React.FC<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const { setShowLoader } = useActions_v2();
  const storeId = useTypedSelector_v2((state) => state.store.id);

  const checkTokenValidity = () => {
    GetEmailByResetToken({ token: token, storeId: storeId! }).then((res) => {
      if (res === 'INVALID_TOKEN') {
        router.push(paths.HOME);
        return;
      }
    });
  };

  const submitHandler = (values: _ResetPassword_InitialValues) => {
    setShowLoader(true);
    ResetPasswordAPI({
      emailId: '', // Don't send email address
      tokenCode: token,
      newPassword: values.password,
      reEnterPassword: values.cPassword,
    })
      .then(() => {
        router.push(paths.HOME);
      })
      .catch(() => {})
      .finally(() => {
        setShowLoader(false);
      });
  };

  useEffect(() => {
    if (!storeId) return;
    checkTokenValidity();
  }, [storeId]);

  return (
    <section className='pt-[40px] pb-[20px]'>
      <div className='container mx-auto'>
        <Formik
          initialValues={_initialValues}
          onSubmit={submitHandler}
          validationSchema={validationSchema}
        >
          {({ values, handleBlur, handleChange }) => {
            return (
              <Form>
                <div className='text-2xl-text text-center'>RESET PASSWORD</div>
                <div className='gird grid-cols-1 lg:flex lg:items-center'>
                  <div className='w-full mx-auto max-w-xl'>
                    <div className='mb-[24px] mt-[24px]'>
                      <div className='mt-[15px] text-default-text'>
                        <div>Welcome back!</div>
                        <div>Please enter your new password below.</div>
                        <div className='mt-[15px] flex flex-wrap items-center gap-[8px]'>
                          <div className='grow'>
                            <input
                              type='password'
                              id='password'
                              name='password'
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className='form-input'
                              placeholder='New Password'
                            />
                            <ErrorMessage
                              name={'password'}
                              className='text-red-500 text-s mt-1'
                              component='p'
                            />
                          </div>
                        </div>
                        <div className='mt-[15px] flex flex-wrap items-center gap-[8px]'>
                          <div className='grow'>
                            <input
                              type='password'
                              id='cPassword'
                              name='cPassword'
                              value={values.cPassword}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              className='form-input'
                              placeholder='Re-Enter Password'
                            />
                            <ErrorMessage
                              name={'cPassword'}
                              className='text-red-500 text-s mt-1'
                              component='p'
                            />
                          </div>
                        </div>
                        <div className='mt-[15px]'>
                          <button
                            type={'submit'}
                            className={`btn ${
                              storeId === 7 ? 'btn-primary' : 'btn-secondary'
                            } btn-md w-full`}
                          >
                            RESET PASSWORD
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </section>
  );
};

export default ResetPassword_type1;
