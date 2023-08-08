/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-unused-vars */
import { _Store } from '@configs/page.config';
import { _STORE_EMAIL, __Login } from '@constants/common.constant';
import { __length, __messages } from '@constants/form.config';
import {
  BACARDI,
  HEALTHYPOINTS,
  SIMPLI_SAFE_CODE,
  UCA,
  _Store_CODES,
  __Cookie,
  __Cookie_Expiry,
  __LocalStorage,
} from '@constants/global.constant';
import { thirdPartyLoginService } from '@constants/pages.constant';
import { __pagesText } from '@constants/pages.text';
import { fetchCartDetails } from '@redux/asyncActions/cart.async';
import { updateCartByNewUserId } from '@services/cart.service';
import { checkCustomerAlreadyExist } from '@services/checkout.service';
import { getCustomerAllowBalance } from '@services/payment.service';
import { fetchThirdpartyservice } from '@services/thirdparty.service';
import { GetStoreCustomer, signInUser } from '@services/user.service';
import { getWishlist } from '@services/wishlist.service';
import SignUp_type6 from '@templates/SignUp/SignUP_Type6';
import SignUp_type5 from '@templates/SignUp/SignUp_Type5';
import { paths } from 'constants_v2/paths.constant';
import { Form, Formik, FormikValues } from 'formik';
import {
  KlaviyoScriptTag,
  deleteCookie,
  extractCookies,
  handleTabKey,
  setCookie,
} from 'helpers_v2/common.helper';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
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

const selectedBacardiStor = extractCookies(
  'BacardiSelectedStore',
  'browserCookie',
).BacardiSelectedStore;

const empGuestvalidationSchema = Yup.object().shape({
  userName: Yup.string()
    .email(__messages.email.validRequest)
    .required(__messages.email.required),
});

const LoginModal: React.FC<_ModalProps> = ({ modalHandler, closeHandler }) => {
  const router = useRouter();
  const {
    logInUser,
    setShowLoader,
    updateCustomer,
    updateWishListData,
    showModal,
    employee_Login,
    customerCreditBalanceUpdate,
    customerUseCreditBalance,
    setRedirectPagePath,
  } = useActions_v2();
  const bothLogin = useTypedSelector_v2((state) => state.store.bothLogin);
  const [showErroMsg, setErrorMsg] = useState<null | string>(null);
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const storeCode = useTypedSelector_v2((state) => state.store.code);

  const { redirectPath } = useTypedSelector_v2((state) => state.home);
  // const storeEmail = useTypedSelector_v2((state) => state.store.email_address);
  const { phone_number: storePhoneNumber, email_address: storeEmail } =
    useTypedSelector_v2((state) => state.store);
  const { empId } = useTypedSelector_v2((state) => state.employee);

  const [showSection, setShowSection] = useState<
    'Login' | 'Register' | 'Submit' | 'Success' | 'UCA Register' | 'BACARDI'
  >('Login');

  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Add event listener to handle tab key press
    document.addEventListener('keydown', (e) => handleTabKey(e, modalRef));
    if (modalRef.current) {
      modalRef.current.addEventListener(
        'keydown',
        (e) => e.key === 'Escape' && modalHandler(null),
      );
    }
    if (closeBtnRef.current) closeBtnRef.current.focus();

    // Remove event listener on component unmount
    return () => {
      document.removeEventListener('keydown', (e) => handleTabKey(e, modalRef));
    };
  }, []);

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
                if (storeCode !== 'PKHG') {
                  updateCartByNewUserId(~~tempCustomerId, res.id);
                }
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
            if (res.id) {
              getCustomerAllowBalance(res.id)
                .then((response) => {
                  if (response && typeof response === 'number') {
                    customerCreditBalanceUpdate(response);
                    customerUseCreditBalance(true);
                  }
                })
                .finally(() => {
                  if (redirectPath) {
                    setRedirectPagePath('');
                    if (storeCode == BACARDI) {
                      if (selectedBacardiStor?.toLowerCase() == 'bacardi') {
                        router.push(paths.bacardi.bacardi);
                      } else if (
                        selectedBacardiStor?.toLowerCase() == 'greygoose'
                      ) {
                        router.push(paths.bacardi.greyGoose);
                      }
                    } else {
                      router.push(redirectPath);
                    }
                  }
                });
            }
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
        if (
          service.thirdPartyServiceName.toLocaleLowerCase() ==
          thirdPartyLoginService.oktaLogin.toLocaleLowerCase()
        ) {
          localStorage.setItem(
            __LocalStorage.thirdPartyServiceName,
            service.thirdPartyServiceName,
          );
          return router.push(service.url);
        } else if (
          service.thirdPartyServiceName.toLocaleLowerCase() ==
          thirdPartyLoginService.samlLogin.toLocaleLowerCase()
        ) {
          const jsonDate = new Date().toJSON();
          const datejson = jsonDate.split('.')[0] + 'Z';
          // console.log(datejson, 'datejson', jsonDate);
          return router.push(service.url + encodeURIComponent(datejson));
        }
      });
    });
  };

  const empGuestSignInHandler = async (values: FormikValues) => {
    if (!empId) return;
    setShowLoader(true);
    const isEmployeeExits = await checkCustomerAlreadyExist(
      values.userName,
      storeId,
    );
    if (isEmployeeExits && isEmployeeExits.isCustomerExist) {
      const encodeEmpGuestData = encodeURIComponent(
        JSON.stringify(isEmployeeExits),
      );
      localStorage.setItem(__LocalStorage.empGuest, encodeEmpGuestData);
      logInUser({
        id: +isEmployeeExits.id,
      });
      employee_Login({ isGuest: true });
      setCookie(
        __Cookie.userId,
        `${isEmployeeExits.id}`,
        __Cookie_Expiry.userId,
      );
      fetchCartDetails({
        customerId: isEmployeeExits.id,
        isEmployeeLoggedIn: true,
      });
      const tempCustomerId = extractCookies(
        __Cookie.tempCustomerId,
        'browserCookie',
      ).tempCustomerId;

      if (tempCustomerId) {
        await updateCartByNewUserId(~~tempCustomerId, isEmployeeExits.id);
        fetchCartDetails({
          customerId: isEmployeeExits.id,
          isEmployeeLoggedIn: true,
        });

        deleteCookie(__Cookie.tempCustomerId);
      }

      const guestDetails = await GetStoreCustomer(isEmployeeExits.id);
      if (guestDetails) updateCustomer({ customer: guestDetails });
    } else {
      localStorage.setItem(
        __LocalStorage.guestEmailID,
        JSON.stringify({ onlyEmail: true, email: values.userName }),
      );
      employee_Login({ isGuest: true });
    }

    modalHandler(null);
    setShowLoader(false);
    try {
    } catch (err: any) {
      setErrorMsg(__Login.something_went_wrong);
      setShowLoader(false);
    }
  };

  const checkCustomEmail = (
    email: string,
    domain: _STORE_EMAIL | undefined,
  ) => {
    if (!domain) return;
    const result = new RegExp(`[a-zA-Z0-9._%+-]+@` + domain + `\.com$`).test(
      email.trim(),
    );
    if (!result) {
      setErrorMsg(`Please enter ${domain} email address.`);
    }
    return;
  };

  return (
    <>
      <div
        ref={modalRef}
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
        id='LoginModal'
        className=' overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal inset-0 text-default-text'
      >
        <div className='w-full h-full bg-[#000000] bg-opacity-[0.50] flex items-center justify-center'>
          <div className={`relative px-[16px] w-full max-w-2xl h-auto`}>
            <div className='relative bg-[#ffffff] shadow max-h-screen overflow-y-auto h-full rounded-md'>
              <div className='flex justify-between items-center p-[15px] rounded-t border-b sticky top-0 left-0 bg-[#ffffff] z-50'>
                <div className='font-[600] text-medium-text'>
                  {showSection == 'Login'
                    ? __pagesText.productInfo.loginModal.signIn
                    : __pagesText.productInfo.loginModal.signUp}
                </div>
                <button
                  ref={closeBtnRef}
                  type='button'
                  className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[14px] p-[6px] ml-auto inline-flex items-center'
                  onClick={() =>
                    closeHandler ? closeHandler() : modalHandler(null)
                  }
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
              {/* login section */}
              {showSection == 'Login' && (
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
                    ) : storeCode === _Store_CODES.USAAHEALTHYPOINTS ? (
                      <p className='text-title-text uppercase'>
                        {__pagesText.productInfo.loginModal.signIn}
                      </p>
                    ) : (
                      <>{__pagesText.productInfo.loginModal.signIn}</>
                    )}
                  </div>
                  {storeCode === 'PKHG' && empId ? (
                    <Formik
                      initialValues={{
                        userName: '',
                      }}
                      onSubmit={empGuestSignInHandler}
                      validationSchema={empGuestvalidationSchema}
                    >
                      {({ values, handleChange, errors }) => {
                        return (
                          <>
                            <Form>
                              {showErroMsg && (
                                <span className='mb-1 text-rose-500'>
                                  {showErroMsg}
                                </span>
                              )}
                              <div className='Login-Main'>
                                <Input
                                  label={''}
                                  id='email-address'
                                  placeHolder={
                                    __pagesText.productInfo.loginModal
                                      .emailPlaceHolder
                                  }
                                  name={'userName'}
                                  value={values.userName}
                                  onChange={handleChange}
                                  type={'email'}
                                  required={true}
                                  error={errors}
                                />

                                <div className='mb-[20px]'>
                                  <button
                                    className={`btn btn-md btn-secondary  w-full pk-hg-primary`}
                                    type='submit'
                                  >
                                    {__pagesText.productInfo.loginModal.shopNow}
                                  </button>
                                </div>

                                <div className='mt-[10px] text-extra-small-text text-center'>
                                  {
                                    __pagesText.productInfo.loginModal
                                      .clickMessage
                                  }{' '}
                                  <Link href={paths.TERMS_OF_USE}>
                                    <a
                                      className='text-anchor'
                                      onClick={() => modalHandler(null)}
                                    >
                                      {
                                        __pagesText.productInfo.loginModal
                                          .termsOfUse
                                      }
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
                            </Form>
                          </>
                        );
                      }}
                    </Formik>
                  ) : (
                    <Formik
                      initialValues={{
                        userName: '',
                        password: '',
                        keepMeLoggedIn: false,
                      }}
                      onSubmit={signInHandler}
                      validationSchema={validationSchema}
                    >
                      {({
                        values,
                        handleChange,
                        validateForm,
                        setTouched,
                        errors,
                        handleBlur,
                      }) => {
                        return (
                          <>
                            <Form>
                              <div className='Login-Main'>
                                <div className='w-full md:w-2/6'>
                                  <label
                                    className='text-default-text font-[600] w-full md:w-full md:text-left'
                                    htmlFor='email-address-login'
                                  >
                                    Email:*
                                  </label>
                                </div>
                                <Input
                                  label={''}
                                  id='email-address-login'
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
                                  onBlur={(e) => {
                                    handleBlur(e);
                                    checkCustomEmail(
                                      e.target.value,
                                      (_STORE_EMAIL as any)[storeCode],
                                    );
                                  }}
                                  validateForm={validateForm}
                                  setTouched={setTouched}
                                  error={errors}
                                  showErroMsg={showErroMsg}
                                />

                                <div className='w-full md:w-2/6'>
                                  <label
                                    className='text-default-text font-[600] w-full md:w-full md:text-left'
                                    htmlFor='email-address-login'
                                  >
                                    Password:*
                                  </label>
                                </div>
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
                                  onBlur={handleBlur}
                                  type={'password'}
                                  required={false}
                                  error={errors}
                                />

                                <div className='mb-[20px]'>
                                  <button
                                    disabled={!!showErroMsg}
                                    className={`btn ${
                                      storeCode == _Store.type4
                                        ? 'btn-primary'
                                        : 'btn-md btn-secondary'
                                    }   w-full pk-hg-primary`}
                                    type='submit'
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
                                      className='text-anchor hover:text-anchor'
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
                                      {
                                        __pagesText.productInfo.loginModal
                                          .samllogin
                                      }
                                    </button>
                                  </div>
                                )}
                                <div className='mb-4'>
                                  <button
                                    onClick={() => {
                                      if (storeCode == _Store.type3) {
                                        setShowSection('Register');
                                      } else if (
                                        storeCode == UCA ||
                                        storeCode == SIMPLI_SAFE_CODE ||
                                        storeCode ===
                                          _Store_CODES.USAAHEALTHYPOINTS
                                      ) {
                                        setShowSection('UCA Register');
                                      } else if (storeCode == BACARDI) {
                                        setShowSection('BACARDI');
                                      } else {
                                        modalHandler(null);
                                        router.push(paths.SIGN_UP);
                                      }
                                    }}
                                    className={`btn ${
                                      storeCode == _Store.type4
                                        ? 'btn-primary'
                                        : 'btn-md btn-secondary'
                                    }   w-full pk-hg-primary`}
                                  >
                                    {storeCode === 'DI'
                                      ? __pagesText.productInfo.loginModal
                                          .requestLogin
                                      : __pagesText.productInfo.loginModal
                                          .createNewAccount}
                                  </button>
                                </div>

                                <div
                                  className={`${
                                    storeCode == _Store.type4
                                      ? 'mb-4'
                                      : 'hidden'
                                  }`}
                                >
                                  <button
                                    type='button'
                                    onClick={() => {
                                      showModal({
                                        message: `Please contact Driving Impressions at ${storeEmail} or ${storePhoneNumber} For Driving Impression Account`,
                                        title: 'Information',
                                      });
                                    }}
                                    className={`btn ${
                                      storeCode == _Store.type4
                                        ? 'btn-primary'
                                        : 'btn-md btn-secondary'
                                    }   w-full pk-hg-primary`}
                                  >
                                    {
                                      __pagesText.productInfo.loginModal
                                        .newCustomer
                                    }
                                  </button>
                                </div>

                                {(storeCode === 'PKHG' ||
                                  storeCode === 'DI' ||
                                  storeCode === 'CG' ||
                                  storeCode === SIMPLI_SAFE_CODE ||
                                  storeCode === UCA) && (
                                  <div className='mt-[10px] text-extra-small-text text-center'>
                                    {
                                      __pagesText.productInfo.loginModal
                                        .clickMessage
                                    }{' '}
                                    <Link
                                      href={`${
                                        storeCode == _Store.type3
                                          ? paths.PKHGTERMS_OF_USE
                                          : paths.TERMS_OF_USE
                                      }`}
                                    >
                                      <a
                                        className='secondary-link hover:secondary-link'
                                        onClick={() => modalHandler(null)}
                                      >
                                        {
                                          __pagesText.productInfo.loginModal
                                            .termsOfUse
                                        }
                                      </a>
                                    </Link>{' '}
                                    {__pagesText.productInfo.loginModal.and}{' '}
                                    <a
                                      href={paths?.PRIVACY_POLICY}
                                      className='secondary-link hover:secondary-link'
                                    >
                                      {
                                        __pagesText.productInfo.loginModal
                                          .privacyPolicy
                                      }
                                    </a>
                                  </div>
                                )}
                              </div>
                            </Form>
                          </>
                        );
                      }}
                    </Formik>
                  )}
                  {storeCode === _Store_CODES.USAAHEALTHYPOINTS && (
                    <div className='text-center'>
                      <small>
                        By Clicking "SHOP NOW", you agree to our{' '}
                        <a
                          href={paths.termsAndConditions}
                          title=''
                          className='text-red-600 '
                        >
                          Terms of use
                        </a>{' '}
                        and{' '}
                        <a
                          href={paths.privacyPolicy}
                          title=''
                          className='text-red-600'
                        >
                          Privacy policy.
                        </a>
                      </small>
                    </div>
                  )}
                </div>
              )}

              {/* register section */}
              {(showSection === 'Register' || showSection === 'Submit') && (
                <div className='pt-[15px] pb-[15px]'>
                  <SignUp_type5
                    setShowSection={setShowSection}
                    showSection={showSection}
                    modalHandler={modalHandler}
                  />
                </div>
              )}
              {(showSection === 'UCA Register' ||
                showSection === 'BACARDI') && (
                <div className='pt-[15px] pb-[15px]'>
                  <SignUp_type6
                    setShowSection={setShowSection}
                    showSection={showSection}
                    modalHandler={modalHandler}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
