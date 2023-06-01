/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-unused-vars */
import { _Store } from '@configs/page.config';
import { __length, __messages } from '@constants/form.config';
import { __Cookie, __Cookie_Expiry } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { fetchCartDetails } from '@redux/asyncActions/cart.async';
import { updateCartByNewUserId } from '@services/cart.service';
import { fetchThirdpartyservice } from '@services/thirdparty.service';
import { GetStoreCustomer, signInUser } from '@services/user.service';
import { getWishlist } from '@services/wishlist.service';
import { paths } from 'constants_v2/paths.constant';
import { Formik } from 'formik';
import {
  deleteCookie,
  extractCookies,
  KlaviyoScriptTag,
  setCookie,
} from 'helpers_v2/common.helper';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import * as Yup from 'yup';
import Input from '../../ui/switch/Input';
import { _ModalProps } from '../modal';

const validationSchema = Yup.object().shape({
  userName: Yup.string()
    .email(__messages.email.validRequest)
    .max(__length.email.max)
    .min(__length.email.min)
    .required(__messages.email.required)
    .nullable(),
  password: Yup.string().required(__messages.password.required).nullable(),
});

const LoginModal: React.FC<_ModalProps> = ({ modalHandler }) => {
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
  const storeCode = useTypedSelector_v2((state) => state.store.code);
  // const storeEmail = useTypedSelector_v2((state) => state.store.email_address);
  const { phone_number: storePhoneNumber, email_address: storeEmail } =
    useTypedSelector_v2((state) => state.store);

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
          // setErrorMsg(__SuccessErrorText.invalidCrendentials);
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
                fetchCartDetails({
                  customerId: res.id,
                  isEmployeeLoggedIn: false,
                });
                if (router.pathname === paths.CART) {
                  router.reload();
                }

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
  const SamlloginHandler = () => {
    fetchThirdpartyservice({ storeId }).then((ThirdpartyServices) => {
      ThirdpartyServices.map((service) => {
        if (service.thirdPartyServiceName == 'Okta')
          router.push(ThirdpartyServices[0].url);
      });
    });
  };

  return (
    <>
      <div
        id='LoginModal'
        className=' overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal inset-0 text-default-text'
      >
        <div className='w-full h-full bg-[#000000] bg-opacity-[0.50] flex items-center justify-center'>
          <div
            className={`relative px-[16px] w-full max-w-2xl h-full md:h-auto`}
          >
            <div className='relative bg-[#ffffff] shadow max-h-screen overflow-y-auto h-full rounded-md'>
              <div className='flex justify-between items-center p-[15px] rounded-t border-b sticky top-0 left-0 bg-[#ffffff] z-50'>
                <div className='font-[600] text-medium-text'>
                  {__pagesText.productInfo.loginModal.signIn}
                </div>
                <button
                  type='button'
                  className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[14px] p-[6px] ml-auto inline-flex items-center'
                  onClick={() => modalHandler(null)}
                >
                  <svg
                    className='w-[24px] h-[24px]'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </button>
              </div>

              <div className='p-[25px]'>
                <div className='mb-[10px] font-[700] text-lg text-center'>
                  {storeCode === 'PKHG' ? (
                    <>
                      <p
                        className='!font-normal text-left text-default-text'
                        dangerouslySetInnerHTML={{
                          __html:
                            __pagesText.productInfo.loginModal.pkIntroText,
                        }}
                      />
                    </>
                  ) : (
                    <>{__pagesText.productInfo.loginModal.signIn}</>
                  )}
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
                        {showErroMsg && (
                          <span className='mb-1 text-rose-500'>
                            {showErroMsg}
                          </span>
                        )}
                        <div className='Login-Main'>
                          <Input
                            label={''}
                            id='email-address0'
                            placeHolder={
                              __pagesText.productInfo.loginModal
                                .emailPlaceHolder
                            }
                            name={'userName'}
                            value={values.userName}
                            onChange={(ev) => {
                              if (showErroMsg) {
                                setErrorMsg(null);
                              }
                              handleChange(ev);
                            }}
                            type={'email'}
                            required={false}
                          />

                          <Input
                            label={''}
                            placeHolder={
                              __pagesText.productInfo.loginModal
                                .passwordPlaceHolder
                            }
                            id='password'
                            name={'password'}
                            value={values.password}
                            onChange={(ev) => {
                              if (showErroMsg) {
                                setErrorMsg(null);
                              }
                              handleChange(ev);
                            }}
                            type={'password'}
                            required={false}
                          />

                          <div className='mb-[20px]'>
                            <button
                              disabled={!!showErroMsg}
                              className={`btn ${
                                storeCode == _Store.type4 ? '' : 'btn-md'
                              }  btn-secondary w-full pk-hg-primary`}
                              type='submit'
                              onClick={() => {
                                handleSubmit();
                              }}
                            >
                              {__pagesText.productInfo.loginModal.shopNow}
                            </button>
                          </div>

                          <div className='flex justify-between items-center pb-[10px]'>
                            <div className='mb-[10px] flex items-center gap-1'>
                              <input
                                checked={values.keepMeLoggedIn}
                                onChange={(ev) => {
                                  if (showErroMsg) {
                                    setErrorMsg(null);
                                  }
                                  handleChange(ev);
                                }}
                                type='checkbox'
                                id='ChkKeepMeLogged'
                                name='keepMeLoggedIn'
                              />
                              <label htmlFor='ChkKeepMeLogged'>
                                {
                                  __pagesText.productInfo.loginModal
                                    .keepMeLoggedIn
                                }
                              </label>
                            </div>

                            <div className='mb-[10px]'>
                              <button
                                onClick={() => modalHandler('forgot')}
                                className='text-anchor'
                              >
                                {
                                  __pagesText.productInfo.loginModal
                                    .forgotPassword
                                }
                              </button>
                            </div>
                          </div>

                          {bothLogin && (
                            <div className='mb-4'>
                              <button
                                onClick={SamlloginHandler}
                                className='btn btn-md btn-secondary w-full'
                                type='button'
                              >
                                {__pagesText.productInfo.loginModal.samllogin}
                              </button>
                            </div>
                          )}
                          <div className='mb-4'>
                            <button
                              onClick={() => {
                                modalHandler(null);
                                router.push(paths.SIGN_UP);
                              }}
                              className={`btn ${
                                storeCode == _Store.type4 ? '' : 'btn-md'
                              }  btn-secondary w-full pk-hg-primary`}
                            >
                              {
                                __pagesText.productInfo.loginModal
                                  .createNewAccount
                              }
                            </button>
                          </div>
                          <div
                            className={`${
                              storeCode == _Store.type4 ? 'mb-4' : 'hidden'
                            }`}
                          >
                            <button
                              onClick={() => {
                                showModal({
                                  message: `Please contact Driving Impressions at ${storeEmail} or ${storePhoneNumber} For Driving Impression Account`,
                                  title: 'Information',
                                });
                              }}
                              className={`btn ${
                                storeCode == _Store.type4 ? '' : 'btn-md'
                              }  btn-secondary w-full pk-hg-primary`}
                            >
                              {__pagesText.productInfo.loginModal.newCustomer}
                            </button>
                          </div>
                          <div className='mt-[10px] text-extra-small-text text-center'>
                            {__pagesText.productInfo.loginModal.clickMessage}{' '}
                            <Link href={paths.TERMS_OF_USE}>
                              <a
                                className='text-anchor'
                                onClick={() => modalHandler(null)}
                              >
                                {__pagesText.productInfo.loginModal.termsOfUse}
                              </a>
                            </Link>{' '}
                            {__pagesText.productInfo.loginModal.and}{' '}
                            <Link href={paths.PRIVACY_POLICY}>
                              <a
                                className='text-anchor'
                                onClick={() => modalHandler(null)}
                              >
                                {
                                  __pagesText.productInfo.loginModal
                                    .privacyPolicy
                                }
                              </a>
                            </Link>
                            .
                          </div>
                        </div>
                      </>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
