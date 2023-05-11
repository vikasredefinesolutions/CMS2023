/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-unused-vars */
import { _ModalProps } from '@appComponents/modals/modal';
import { __length, __messages } from '@constants/form.config';
import { __Cookie, __Cookie_Expiry } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
// import { Input } from '@mui/material';
import { updateCartByNewUserId } from '@services/cart.service';
import { GetStoreCustomer, signInUser } from '@services/user.service';
import { getWishlist } from '@services/wishlist.service';
import { ErrorMessage, Formik } from 'formik';
import {
  deleteCookie,
  extractCookies,
  KlaviyoScriptTag,
  setCookie,
} from 'helpers_v2/common.helper';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import * as Yup from 'yup';
// import Input from '../../ui/switch/Input';
// import { _ModalProps } from '../modal';

const validationSchema = Yup.object().shape({
  userName: Yup.string()
    .email(__messages.email.validRequest)
    .max(__length.email.max)
    .min(__length.email.min)
    .required(__messages.email.required)
    .nullable(),
  password: Yup.string().required(__messages.password.required).nullable(),
});

const LoginComp: React.FC<_ModalProps> = ({ modalHandler }) => {
  const router = useRouter();
  const {
    logInUser,
    setShowLoader,
    updateCustomer,
    updateWishListData,
    showModal,
  } = useActions_v2();
  const bothLogin = useTypedSelector_v2((state) => state.store.bothLogin);
  const [showErroMsg, setErrorMsg] = useState<null | string>(null);
  const { id: storeId } = useTypedSelector_v2((state) => state.store);

  const signInHandler = (enteredInputs: {
    userName: string;
    password: string;
    keepMeLoggedIn: boolean;
  }) => {
    setShowLoader(true);

    signInUser({
      userName: enteredInputs.userName,
      password: enteredInputs.password,
      storeId: storeId!,
    })
      .then((user) => {
        if (user.credentials === 'INVALID') {
          setErrorMsg(user.message);
        }
        if (user.credentials === 'VALID') {
          modalHandler(null);
          logInUser({
            id: +user.id,
          });
          setCookie(__Cookie.userId, user.id, __Cookie_Expiry.userId);

          GetStoreCustomer(+user.id).then((res) => {
            if (res === null) return;
            if (localStorage) {
              const tempCustomerId = extractCookies(
                __Cookie.tempCustomerId,
                'browserCookie',
              ).tempCustomerId;

              if (tempCustomerId) {
                updateCartByNewUserId(~~tempCustomerId, res.id);
                deleteCookie(__Cookie.tempCustomerId);
              }
            }

            const userInfo = {
              $email: res.email,
              $first_name: res.firstname,
              $last_name: res.lastName,
              $phone_number: '',
              $organization: res.companyName,
              $title: 'title',
              $timestamp: new Date(),
            };

            KlaviyoScriptTag(['identify', userInfo]);
            updateCustomer({ customer: res });
            getWishlist(res.id).then((wishListResponse) => {
              updateWishListData(wishListResponse);
            });
          });
        }
      })
      .finally(() => {
        setShowLoader(false);
        // CartController();
      });
  };

  return (
    <>
      <div className='mt-[10px] border border-gray-border p-[10px] lg:p-[20px] text-center'>
        <div className='text-title-text mb-[10px]'>LOGIN TO YOUR ACCOUNT</div>
        <div className='mb-[10px]'>
          To see discounted pricing on this product.
        </div>
        <Formik
          initialValues={{
            userName: '',
            password: '',
            keepMeLoggedIn: false,
          }}
          onSubmit={signInHandler}
          validationSchema={validationSchema}
        >
          {({ values, handleChange, handleSubmit }) => {
            return (
              <>
                <div className='Login-Main'>
                  <div className='mb-[10px]'>
                    <input
                      className='form-input'
                      placeholder='Enter your email address'
                      onChange={(ev: any) => {
                        if (showErroMsg) {
                          setErrorMsg(null);
                        }
                        handleChange(ev);
                      }}
                      id='email-address0'
                      name={'userName'}
                      value={values.userName}
                      type={'email'}
                      required={false}
                    />
                    <ErrorMessage
                      className='text-rose-500'
                      component={'span'}
                      name={'password'}
                    />
                  </div>

                  <div className='mb-[10px]'>
                    <input
                      className='form-input'
                      placeholder='Password'
                      id='password'
                      name={'password'}
                      value={values.password}
                      onChange={(ev: any) => {
                        if (showErroMsg) {
                          setErrorMsg(null);
                        }
                        handleChange(ev);
                      }}
                      type={'password'}
                      required={false}
                    />
                    <ErrorMessage
                      className='text-rose-500'
                      component={'span'}
                      name={'password'}
                    />
                  </div>

                  <div className='mb-[10px] flex flex-wrap items-center justify-between'>
                    <div className='flex flex-wrap items-center gap-[5px]'>
                      <input
                        checked={values.keepMeLoggedIn}
                        onChange={(ev) => {
                          if (showErroMsg) {
                            setErrorMsg(null);
                          }
                          handleChange(ev);
                        }}
                        type='checkbox'
                        id="'ChkKeepMeLogged'"
                        name='keepMeLoggedIn'
                      />
                      <label htmlFor='ChkKeepMeLogged'>
                        {__pagesText.productInfo.loginModal.keepMeLoggedIn}
                      </label>
                    </div>

                    <div className=''>
                      <button
                        onClick={() => modalHandler('forgot')}
                        className='text-anchor'
                      >
                        {__pagesText.productInfo.loginModal.forgotPassword}
                      </button>
                    </div>
                  </div>
                  <div className='mb-[10px]'>
                    <button
                      disabled={!!showErroMsg}
                      className='btn btn-tertiary'
                      type='submit'
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      SIGN IN
                    </button>
                  </div>
                </div>
              </>
            );
          }}
        </Formik>
        <div className=''>No account yet? Create one here.</div>
      </div>
    </>
  );
};

export default LoginComp;
