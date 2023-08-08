import Input from '@appComponents/ui/switch/Input';
import { _Store } from '@configs/page.config';
import {
  SIMPLI_SAFE_CODE,
  _Store_CODES,
  __Cookie,
  __Cookie_Expiry,
} from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { setCookie } from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { GetStoreCustomer, signInUser } from '@services/user.service';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  CO7R_LoginInitials,
  CO7R_LoginValidationSchema,
  _CO7R_Screens,
  udpateCustomerIdInCookie,
  updateKlaviyo,
} from '../CO7R_Extras';

interface _Props {
  setScreenToShow: React.Dispatch<React.SetStateAction<_CO7R_Screens>>;
}

const CO7_LoginMenu: React.FC<_Props> = ({ setScreenToShow }) => {
  const { setShowLoader, logInUser, update_CheckoutUser, updateCustomerV2 } =
    useActions_v2();
  const { code: storeCode, id: storeId } = useTypedSelector_v2(
    (state) => state.store,
  );
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchUserInformation = async (userId: string) => {
    logInUser({
      id: +userId,
    });
    setCookie(__Cookie.userId, userId, __Cookie_Expiry.userId);

    return await GetStoreCustomer(+userId).then((response) => {
      if (response === null) return;

      updateCustomerV2({ customer: response, id: response.id });
      // getWishlist(+userId).then((wishListResponse) => {
      //   updateWishListData(wishListResponse);
      // });
      udpateCustomerIdInCookie(+userId);
      updateKlaviyo(response);
      return 'SUCCESS';
    });
  };

  const emailSubmitHandler = async (input: {
    email: string;
    password: string;
    keepMeLoggedIn: boolean;
  }) => {
    setShowLoader(true);
    setErrorMessage('');

    await signInUser({
      storeId: storeId,
      userName: input.email,
      password: input.password,
    })
      .then((user) => {
        if (user.credentials === 'INVALID') {
          setErrorMessage(JSON.parse(user.message));
          return;
        }

        if (user.credentials === 'VALID') {
          return fetchUserInformation(user.id);
        }

        // redirect to next screen
      })
      .then((response) => {
        if (!response) return;
        setScreenToShow('addShipping');
      })
      .catch((error) => {
        console.log('Errror ===>', error);
        // Handle Login Error
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

  const checkDomainNameInEmail = (
    event: React.ChangeEvent<HTMLInputElement>,
    domain: 'usaa' | 'simplisafe',
  ) => {
    const enteredEmail = event.target.value.trim();

    if (enteredEmail.length <= 2) {
      return;
    }

    if (
      storeCode == _Store.type5 ||
      storeCode == SIMPLI_SAFE_CODE ||
      storeCode === _Store_CODES.USAAHEALTHYPOINTS
    ) {
      const matched = new RegExp(`[a-zA-Z0-9._%+-]+@` + domain + `\.com$`).test(
        enteredEmail,
      );

      if (!matched) {
        setErrorMessage(`Please enter ${domain} email address.`);
        return;
      }
      setErrorMessage('');
    }
  };

  return (
    <div
      className={`flex flex-wrap ml-[-15px] mr-[-15px] ${
        storeCode == SIMPLI_SAFE_CODE ? '' : '-mt-3'
      } checkout-box`}
    >
      <>
        <div className='w-full lg:w-6/12 md:w-6/12 pl-[15px] pr-[15px]'>
          <div className='p-[15px] bg-light-gray'>
            <div className='pb-[15px] text-title-text text-center uppercase'>
              {__pagesText.productInfo.loginModal.signIn}
            </div>
            <Formik
              initialValues={CO7R_LoginInitials}
              onSubmit={emailSubmitHandler}
              validationSchema={CO7R_LoginValidationSchema}
            >
              {({ values, handleChange, errors }) => {
                return (
                  <Form>
                    <div className='Login-Main'>
                      {errorMessage && (
                        <span className='mb-1 text-rose-500'>
                          {errorMessage}
                        </span>
                      )}
                      <Input
                        label={''}
                        id='emailAddress'
                        placeHolder={
                          __pagesText.productInfo.loginModal.emailPlaceHolder
                        }
                        name={'email'}
                        value={values.email}
                        onChange={(event) => {
                          if (errorMessage) {
                            setErrorMessage('');
                          }

                          handleChange(event);
                        }}
                        type={'email'}
                        required={false}
                        onBlur={(e) =>
                          checkDomainNameInEmail(
                            e,
                            storeCode == SIMPLI_SAFE_CODE
                              ? 'simplisafe'
                              : 'usaa',
                          )
                        }
                      />
                      <Input
                        label={''}
                        placeHolder={
                          __pagesText.productInfo.loginModal.passwordPlaceHolder
                        }
                        id='password'
                        name={'password'}
                        value={values.password}
                        onChange={(ev) => {
                          handleChange(ev);
                        }}
                        type={'password'}
                        required={false}
                      />
                      <div className='mb-[20px]'>
                        <button
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
                            onChange={(ev) => {
                              handleChange(ev);
                            }}
                            type='checkbox'
                            id='ChkKeepMeLogged'
                            name='keepMeLoggedIn'
                          />
                          <label htmlFor='ChkKeepMeLogged'>
                            {__pagesText.productInfo.loginModal.keepMeLoggedIn}
                          </label>
                        </div>

                        <div className='mb-[10px]'>
                          <button onClick={() => {}} className='text-anchor'>
                            {__pagesText.productInfo.loginModal.forgotPassword}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
            <div className='mt-[10px] text-extra-small-text text-center  '>
              {__pagesText.productInfo.loginModal.clickMessage}{' '}
              <Link
                href={`${
                  storeCode == _Store.type3
                    ? paths.PKHGTERMS_OF_USE
                    : paths.TERMS_OF_USE
                }`}
              >
                <a
                  className={`${
                    storeCode === _Store_CODES.USAAHEALTHYPOINTS &&
                    'text-red-600'
                  }`}
                >
                  {__pagesText.productInfo.loginModal.termsOfUse}
                </a>
              </Link>{' '}
              {__pagesText.productInfo.loginModal.and}{' '}
              <a
                href={paths?.PRIVACY_POLICY}
                className={`${
                  storeCode === _Store_CODES.USAAHEALTHYPOINTS && 'text-red-600'
                }`}
              >
                {__pagesText.productInfo.loginModal.privacyPolicy}
              </a>
            </div>
          </div>
        </div>
        <div className='w-full lg:w-6/12 md:w-6/12 pl-[15px] pr-[15px]'>
          <div className='p-[15px] bg-light-gray'>
            <div className='pb-[15px] text-title-text text-center uppercase'>
              {__pagesText.productInfo.loginModal.signUp}
            </div>
            <div className=''>
              <Link href={paths.SIGN_UP}>
                <a
                  className={`btn ${
                    storeCode == _Store.type4
                      ? 'btn-primary'
                      : 'btn-md btn-secondary'
                  }   w-full pk-hg-primary text-center`}
                >
                  {__pagesText.productInfo.loginModal.createNewAccount}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default CO7_LoginMenu;
