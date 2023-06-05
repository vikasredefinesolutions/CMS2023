import { __messages } from '@constants/form.config';
import {
  __Cookie,
  __Cookie_Expiry,
  __UserMessages,
} from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { __ValidationText } from '@constants/validation.text';
import {
  KlaviyoScriptTag,
  deleteCookie,
  extractCookies,
  setCookie,
} from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { fetchCartDetails } from '@redux/asyncActions/cart.async';
import { updateCartByNewUserId } from '@services/cart.service';
import {
  GetStoreCustomer,
  createAccountWithoutCompany,
  signInUser,
} from '@services/user.service';
import { getWishlist } from '@services/wishlist.service';
import { _ThankYouProps } from '@templates/ThankYou/ThankYou';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { Fragment, useState } from 'react';
import * as Yup from 'yup';
import ThankYouSubTotal from '../../CommonComponents/ThankYouSubTotal';
import ThankYouProduct from './ThankYouProduct';

const ThankYouAccordian: React.FC<_ThankYouProps> = ({ order }) => {
  const [showAccordian, setshowAccordian] = useState<boolean>(true);

  const guest = useTypedSelector_v2((state) => state.cart);
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const { loggedIn: isEmployeeLoggedIn, isLoadingComplete } =
    useTypedSelector_v2((state) => state.employee);
  const { logInUser, updateWishListData, setShowLoader, showModal } =
    useActions_v2();
  const user = useTypedSelector_v2((state) => state.user);
  const router = useRouter();

  const initialValues = {
    password: '',
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required(__messages.password.required)
      .min(__ValidationText.signUp.password.minLength)
      .max(__ValidationText.signUp.password.maxLength)
      .nullable(),
  });
  const submitHandler = async (values: any) => {
    const addAccount = {
      storeCustomerGuestModel: {
        id: 0,
        email: order?.billing?.billingEmail,
        password: values.password,
        confirmPassword: values.password,
        storeId: storeId,
        recStatus: 'A',
      },
    };
    createAccountWithoutCompany(addAccount)
      .then((result) => {
        setShowLoader(true);
        if (result && result?.data !== null) {
          signInUser({
            userName: order?.billing?.billingEmail,
            password: values.password,
            storeId: storeId!,
          })
            .then((user) => {
              if (user.credentials === 'INVALID') {
                // setErrorMsg(user.message);
              }
              if (user.credentials === 'VALID') {
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
                      updateCartByNewUserId(~~tempCustomerId, res.id).then(
                        () => {
                          fetchCartDetails({
                            customerId: res.id,
                            isEmployeeLoggedIn: isEmployeeLoggedIn,
                          });
                        },
                      );
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

                  getWishlist(res.id).then((wishListResponse) => {
                    updateWishListData(wishListResponse);
                  });
                });
                router.push('/Orders');
              }
            })
            .finally(() => {
              setShowLoader(false);
            });
        } else {
          setShowLoader(false);

          const keyRes = Object.keys(result && result?.errors).find((obj) =>
            obj.includes('storeCustomerGuestModel.'),
          );
          showModal({
            message:
              result?.errors[keyRes || ''] ||
              __UserMessages.signUpPage.SomethingWentWrong,
            title: 'Error',
          });
        }
      })
      .catch((error) => {
        console.log(error, 'error');
        const keyRes = Object.keys(error).find((obj) =>
          obj.includes('storeCustomerGuestModel.'),
        );
        showModal({
          message:
            error[keyRes || ''] || __UserMessages.signUpPage.SomethingWentWrong,
          title: 'Error',
        });
      });
  };
  return (
    <>
      {guest.isCustomerExist !== true ? (
        <>
          <div className='text-title-text mb-[10px] mt-[20px]'>
            Save your information for next time
          </div>
          <div className='max-w-[600px]'>
            <div className='relative z-0 w-full mb-[20px]'>
              <label
                htmlFor='EmailAddress'
                className='text-[#000000] text-[18px] font-bold'
              >
                Create Password
              </label>
            </div>
            <Formik
              initialValues={initialValues}
              onSubmit={submitHandler}
              validationSchema={validationSchema}
            >
              {({ values, handleChange }) => {
                return (
                  <Form>
                    <div className='lg:flex'>
                      <div className='w-full lg:w-[350px] border border-gray-border rounded'>
                        <input
                          type='password'
                          name='password'
                          placeholder=' '
                          required
                          className='pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
                          onChange={handleChange}
                        />
                      </div>
                      <button
                        type='submit'
                        id='btn-start-checkout'
                        className='btn btn-secondary btn-lg font-semibold mt-[15px] lg:mt-0'
                      >
                        Create Account
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>

            <div className='w-full text-default-text mt-[20px] lg:mt-0 mb-[24px]'>
              Combination of letters and words
            </div>
          </div>
        </>
      ) : null}

      <div className='accordion w-full mb-[30px]' id='accordionExample'>
        <div className='accordion-item !rounded-none bg-[#ffffff] border border-gray-border '>
          <h2
            className='accordion-header mb-0'
            id='headingOne'
            onClick={() => setshowAccordian(!showAccordian)}
          >
            <button
              className='accordion relative flex items-center w-full py-4 px-5 !text-primary text-left bg-white border rounded-none transition focus:outline-none text-2xl '
              type='button'
            >
              {__pagesText.ThankYouPage.AccordianHeader}
              {order.billing?.id}
            </button>
          </h2>
          <div
            id='collapseOne'
            className={`accordion-collapse ${showAccordian ? '' : 'hidden'}`}
            aria-labelledby='headingOne'
          >
            <div className='accordion-body pl-[15px] pr-[15px] pb-[15px] pt-[15px]'>
              <ul
                role='list'
                className='border-b border-gray-border divide-y divide-gray-300'
              >
                {order.product?.map((prod, index) => (
                  <Fragment key={index}>
                    <ThankYouProduct product={prod} />
                  </Fragment>
                ))}
              </ul>
              <ThankYouSubTotal billing={order.billing} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThankYouAccordian;
