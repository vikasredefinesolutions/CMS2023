import { __length, __messages } from '@constants/form.config';
import { __Cookie, __Cookie_Expiry } from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import {
  KlaviyoScriptTag,
  deleteCookie,
  extractCookies,
  setCookie,
} from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { fetchCartDetails } from '@redux/asyncActions/cart.async';
import { updateCartByNewUserId } from '@services/cart.service';
import { GetStoreCustomer, signInUser } from '@services/user.service';
import { getWishlist } from '@services/wishlist.service';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as Yup from 'yup';
import { _ModalProps } from '../modal';

const LoginModal_Type2: React.FC<_ModalProps> = ({ modalHandler }) => {
  const router = useRouter();
  const { logInUser, setShowLoader, updateCustomer, updateWishListData } =
    useActions_v2();
  const bothLogin = useTypedSelector_v2((state) => state.store.bothLogin);
  const [showErroMsg, setErrorMsg] = useState<null | string>(null);
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  // const storeEmail = useTypedSelector_v2((state) => state.store.email_address);
  const { phone_number: storePhoneNumber, email_address: storeEmail } =
    useTypedSelector_v2((state) => state.store);

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .email(__messages.email.validRequest)
      .max(__length.email.max)
      .min(__length.email.min)
      .required(__messages.email.required)
      .nullable(),
    password: Yup.string().required(__messages.password.required).nullable(),
  });

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

  return (
    <div
      onClick={(e) => {
        modalHandler(null);
      }}
    >
      <Formik
        initialValues={{ userName: '', password: '', keepMeLoggedIn: false }}
        validationSchema={validationSchema}
        onSubmit={signInHandler}
      >
        {() => (
          <Form>
            <div
              id='LoginModal'
              className=' overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal inset-0 text-default-text'
            >
              <div className='w-full h-full bg-[#000000] bg-opacity-[0.50] flex items-center justify-center'>
                <div
                  className='relative w-full max-w-xl h-auto bg-cover'
                  style={{
                    backgroundImage: "url('/assets/images/login-bg-gdg.jpg')",
                  }}
                >
                  <div
                    className='relative bg-[#ffffff] shadow max-h-screen overflow-y-auto h-full p-[20px] bg-opacity-60'
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <div className='flex justify-center items-start p-[15px] bg-tertiary text-large-text'>
                      <div className='font-[600] text-[#ffffff]'>
                        WELCOME TO GDG CLUB
                      </div>
                    </div>
                    <div
                      className='p-[25px] bg-cover'
                      style={{
                        backgroundImage:
                          "url('/assets/images/login-bg-1-gdg.jpg')",
                      }}
                    >
                      <div className='mb-[10px] medium-text text-center'>
                        RETURNING CUSTOMER
                      </div>
                      <div className='Login-Main max-w-xs mx-auto'>
                        <div className='relative mb-[10px] flex'>
                          <div className='bg-tertiary flex items-center justify-center p-[2px]'>
                            <span className='material-icons-round text-white'>
                              person
                            </span>
                          </div>
                          <Field
                            name='userName'
                            type='email'
                            placeholder='Enter Email Address'
                            className='form-input'
                          />
                        </div>
                        <ErrorMessage
                          name='userName'
                          className='text-rose-500'
                          component={'p'}
                        />
                        <div className='relative mb-[10px] flex'>
                          <div className='bg-tertiary flex items-center justify-center p-[2px]'>
                            <span className='material-icons-round text-white'>
                              lock
                            </span>
                          </div>
                          <Field
                            name='password'
                            type='password'
                            className='form-input'
                            placeholder='Password'
                          />
                        </div>
                        <ErrorMessage
                          name='password'
                          className='text-rose-500'
                          component={'p'}
                        />
                        <div className='mb-[20px]'>
                          <button
                            type='submit'
                            className='btn btn-secondary w-full'
                            id=''
                          >
                            Login
                          </button>
                          {showErroMsg && (
                            <span className='mb-1 text-rose-500'>
                              {showErroMsg}
                            </span>
                          )}
                        </div>
                        <div className='flex flex-wrap justify-between items-center pb-[10px] gap-[10px]'>
                          <div className='mb-[10px] flex items-center gap-1'>
                            <input
                              type='checkbox'
                              id='ChkKeepMeLogged'
                              name='ChkKeepMeLogged'
                              className=''
                            />
                            <label htmlFor='ChkKeepMeLogged'>
                              Keep me logged
                            </label>
                          </div>
                          <div className='mb-[10px]'>
                            <button
                              onClick={() => modalHandler('forgot')}
                              data-modal-toggle='Login1Modal'
                              className='text-anchor'
                            >
                              Forgot Password?
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className='flex items-center justify-center gap-[10px]'>
                        <div className=''>Register as a</div>
                        <button
                          className='btn btn-secondary'
                          onClick={() => {
                            modalHandler(null);
                            router.push(paths.SIGN_UP);
                          }}
                        >
                          INDIVIDUALS
                        </button>
                        <button
                          onClick={() => {
                            modalHandler(null);
                            router.push(paths.SIGNUP_TEAM);
                          }}
                          className='btn btn-secondary'
                        >
                          TEAMS
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginModal_Type2;
