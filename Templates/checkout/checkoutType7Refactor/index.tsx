import NxtImage from '@appComponents/reUsable/Image';

import { _Store } from '@configs/page.config';
import { UserAddressType } from '@constants/enum';
import {
  BOSTONBEAR,
  HEALTHYPOINTS,
  SIMPLI_SAFE_CODE,
  UCA,
  _Store_CODES,
} from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { UserType } from '@definations/APIs/user.res';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { getCustomerAllowBalance } from '@services/payment.service';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  CO7R_addressValidationSchema,
  _CO7R_Screens,
  showOrderBillingAndPayment,
  showOrderReview,
  showOrderReviewOpaque,
  showPaymentMethodOpaque,
} from './CO7R_Extras';
import CO7_AddAddress from './Components/CO7R_AddAddress';
import CO7R_ChooseShippingMethods from './Components/CO7R_ChooseShippingMethods';
import CO7_LoginMenu from './Components/CO7R_LoginMenu';
import CO7_OrderSummary from './Components/CO7R_OrderSummary';
import CO7_PaymentMethod from './Components/CO7R_PaymentMethod';
import CO7R_ReviewPaymentMethod from './Components/CO7R_ReviewPaymentMethod';
import CO7R_ReviewProducts from './Components/CO7R_ReviewProducts';
import CO7_ReviewShippingInformation from './Components/CO7R_ReviewShippingInformation';

const CheckoutType7Refactor: React.FC = () => {
  const {
    update_PaymentDetails,
    update_CheckoutAddress,
    update_CheckoutUser,
    clear_Checkout,
  } = useActions_v2();
  const { customer } = useTypedSelector_v2((state) => state.user);
  const { code: storeCode } = useTypedSelector_v2((state) => state.store);
  const [screenToShow, setScreenToShow] =
    useState<_CO7R_Screens>('enterEmailAddress');
  const { user, shippingMethod, charges } = useTypedSelector_v2(
    (state) => state.checkout,
  );
  const messages = useTypedSelector_v2((state) => state.sbStore.messages);
  const { cart: cartItems, discount } = useTypedSelector_v2(
    (state) => state.cart,
  );

  const storeBillingAddress = () => {
    const billingAddress = customer?.customerAddress.find((address) => {
      if (
        (address.isDefault &&
          address.addressType === UserAddressType.BILLINGADDRESS) ||
        // Condition - 2  ????
        address.addressType === UserAddressType.BILLINGADDRESS ||
        // Condition - 3  ????
        (address.isDefault &&
          (storeCode === SIMPLI_SAFE_CODE || storeCode === _Store.type5))
      ) {
        return true;
      }

      return false;
    });

    if (billingAddress) {
      update_CheckoutAddress({
        type: 'BILLING_ADDRESS',
        address: billingAddress,
      });
    }
  };

  const convertIntoShippingInitials = () => {
    const shippingAddress = customer?.customerAddress.find((address) => {
      if (
        (address.isDefault &&
          address.addressType === UserAddressType.SHIPPINGADDRESS) ||
        // Condition - 2  ????
        address.addressType === UserAddressType.SHIPPINGADDRESS ||
        // Condition - 3  ????
        (address.isDefault &&
          (storeCode === SIMPLI_SAFE_CODE || storeCode === _Store.type5))
      ) {
        return true;
      }

      return false;
    });

    if (shippingAddress) {
      update_CheckoutAddress({
        type: 'SHIPPING_ADDRESS',
        address: shippingAddress,
      });
    }

    return {
      firstname: shippingAddress?.firstname || '',
      lastName: shippingAddress?.lastName || '',
      address1: shippingAddress?.address1 || '',
      address2: shippingAddress?.address2 || '',
      city: shippingAddress?.city || '',
      state: shippingAddress?.state || '',
      postalCode: shippingAddress?.postalCode || '',
      phone: shippingAddress?.phone || '',
      countryName: shippingAddress?.countryName || '',
      companyName: shippingAddress?.companyName || '',
      countryCode: shippingAddress?.countryCode || '',
    };
  };

  const shippingAddress = useFormik({
    initialValues: convertIntoShippingInitials(),
    validationSchema: CO7R_addressValidationSchema,
    // validateOnMount: true,
    enableReinitialize: true,
    onSubmit: (values) => {},
  });

  const handleGoToPaymentScreen = () => {
    shippingAddress.submitForm();
    if (!shippingAddress.isValid) return;
    //
    setScreenToShow('addPaymentMethodAndBilling');
  };

  const titleClass = () => {
    if (storeCode === _Store.type11) {
      return 'pt-[20px] pb-[20px] text-title-text text-center';
    }

    return 'pt-[20px] pb-[20px] text-title-text ';
  };

  const getCreditBalance = (customer: UserType) => {
    getCustomerAllowBalance(customer.id).then((res) => {
      if (res && typeof res === 'number') {
        update_CheckoutUser({ creditBalance: res });
      }
      update_CheckoutUser({ email: customer.email });
    });
  };

  const itemsTotal = () => {
    let subTotal = 0;
    if (!cartItems) return 0;

    cartItems.forEach((item) => {
      subTotal += item.totalPrice + item.totalCustomFieldsCharges;
    });

    return subTotal;
  };

  const skipPaymentScreen = () => {
    if (storeCode !== _Store_CODES.UNITi) return false;

    const subTotal = itemsTotal() + shippingMethod.price + charges.salesTax;
    const credits =
      user.creditBalance +
      (discount?.amount || 0) +
      (discount?.giftCardAmt || 0);

    //
    return subTotal <= credits;
  };

  useEffect(() => {
    storeBillingAddress();
    return () => {
      clear_Checkout();
    };
  }, []);

  useEffect(() => {
    if (customer?.id) {
      setScreenToShow('addShipping');

      getCreditBalance(customer);
    }
  }, [customer]);

  useEffect(() => {
    if (skipPaymentScreen() && shippingAddress.isValid) {
      update_PaymentDetails({
        method: 'PAYMENT_REQUIRED',
        value: false,
      });
      update_PaymentDetails({
        method: 'USE_CREDIT_BALANCE',
        value: true,
      });
      setScreenToShow('completeOrderDetails');
    }
  }, [skipPaymentScreen(), cartItems?.length]);

  return (
    <section id='' className=''>
      <div className='container mx-auto'>
        <div className='bg-white min-h-[70vh]]'>
          {storeCode != SIMPLI_SAFE_CODE &&
            storeCode != _Store_CODES.UNITi &&
            storeCode != UCA &&
            storeCode != BOSTONBEAR &&
            storeCode !== HEALTHYPOINTS &&
            screenToShow !== 'enterEmailAddress' && (
              <div className='pt-[20px] pb-[20px] text-title-text pl-[10px]'>
                Checkout
              </div>
            )}

          <div className='pt-[20px] pb-[40px] text-subtitle-text pl-[10px] text-center text-rose-500 !font-bold'>
            {storeCode !== UCA &&
            storeCode !== BOSTONBEAR &&
            storeCode !== _Store_CODES.USAAHEALTHYPOINTS
              ? __pagesText.checkoutHeaderNote
              : ''}
          </div>

          <div
            className={`${
              screenToShow === 'enterEmailAddress' ? 'pt-[30px] pb-[30px]' : ''
            } flex flex-wrap mx-[-10px] checkout-box`}
          >
            <section
              aria-labelledby='cart-heading'
              className={`${
                screenToShow === 'enterEmailAddress'
                  ? 'w-full pl-[10px] pr-[10px] lg:w-12/12 md:w-12/12'
                  : 'w-full pl-[10px] pr-[10px] lg:w-9/12 md:w-8/12'
              }`}
            >
              {/*  */}
              {messages.checkOutMessage && (
                <div className='w-full mb-[30px] message_box'>
                  <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                    <div className='flex flex-wrap items-center justify-between'>
                      <div
                        className='pt-[10px] pb-[10px] text-default-text'
                        dangerouslySetInnerHTML={{
                          __html: messages.checkOutMessage,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {showOrderBillingAndPayment(screenToShow) && (
                <div className='flex flex-wrap checkout-box ml-[-15px] mr-[-15px]'>
                  <CO7_ReviewShippingInformation
                    setScreenToShow={setScreenToShow}
                    address={shippingAddress.values}
                  />
                  {storeCode == HEALTHYPOINTS ? (
                    <></>
                  ) : (
                    <CO7R_ReviewPaymentMethod
                      setScreenToShow={setScreenToShow}
                      isMethodSelected={false}
                    />
                  )}
                </div>
              )}

              {/* SCREEN 1 */}
              {screenToShow === 'enterEmailAddress' && (
                <CO7_LoginMenu setScreenToShow={setScreenToShow} />
              )}

              {/* SCREEN 2 */}
              {screenToShow === 'addShipping' && (
                <>
                  <div
                    className='bg-light-gray w-full mb-[30px] opacity-100'
                    id='ShippingAddress'
                  >
                    <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                      <CO7_AddAddress
                        addressType={'SHIP'}
                        values={shippingAddress.values}
                        errors={shippingAddress.errors}
                        touched={shippingAddress.touched}
                        setValues={shippingAddress.setValues}
                        handleBlur={shippingAddress.handleBlur}
                        handleChange={shippingAddress.handleChange}
                        setFieldValue={shippingAddress.setFieldValue}
                        setFieldTouched={shippingAddress.setFieldTouched}
                        setFieldError={shippingAddress.setFieldError}
                      />
                    </div>
                  </div>
                  <CO7R_ChooseShippingMethods
                    setScreenToShow={setScreenToShow}
                    city={shippingAddress.values.city}
                    state={shippingAddress.values.state}
                    postalCode={shippingAddress.values.postalCode}
                    countryName={shippingAddress.values.countryName}
                    handleGoToPaymentScreen={handleGoToPaymentScreen}
                  />
                  {/* <div className='bg-light-gray w-full mb-[30px]'>
                    <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                      <div className='flex flex-wrap items-center justify-between'>
                        <button
                          className='pt-[10px] pb-[10px] btn btn-quaternary'
                          onClick={handleGoToPaymentScreen}
                        >
                          Go to Payment Details
                        </button>
                      </div>
                    </div>
                  </div> */}
                </>
              )}

              {showPaymentMethodOpaque(screenToShow) && (
                <div
                  className='bg-light-gray w-full mb-[30px] opacity-50'
                  id='PaymentMethodTop'
                >
                  {!(storeCode == HEALTHYPOINTS) && (
                    <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                      <div className='flex flex-wrap items-center justify-between'>
                        <div className='pt-[10px] pb-[10px] text-title-text'>
                          Payment Method
                        </div>
                        <div className='pt-[10px] pb-[10px]'>
                          <NxtImage
                            isStatic
                            src='/assets/images/secure-card-hover.png'
                            className=''
                            alt={'secured payment symbol'}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {showOrderReviewOpaque(screenToShow) && (
                <div
                  className='bg-light-gray w-full mb-[30px] '
                  id='orderReviewTop'
                >
                  <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                    <div className='flex flex-wrap items-center justify-between'>
                      <div className='pt-[10px] pb-[10px] text-title-text'>
                        Order Review
                      </div>
                      <div className='pt-[10px] pb-[20px]'>{'  '}</div>
                    </div>
                  </div>
                </div>
              )}

              {screenToShow === 'addPaymentMethodAndBilling' && (
                <CO7_PaymentMethod setScreenToShow={setScreenToShow} />
              )}
              {showOrderReview(screenToShow) && <CO7R_ReviewProducts />}
            </section>
            {screenToShow !== 'enterEmailAddress' && (
              <CO7_OrderSummary
                showPlaceOrder={screenToShow === 'completeOrderDetails'}
                screenToShow={screenToShow}
                shippingAddress={shippingAddress.values}
              />
            )}
          </div>
        </div>
      </div>
      {storeCode === _Store_CODES.USAAHEALTHYPOINTS && (
        <div className='footer' id='MainFooter'>
          <div>
            <div className='container mx-auto white-link'>
              <div className='bg-primary'>
                <div className='border-t border-gray-border py-[25px]'>
                  <div>
                    <div className='text-center text-xs text-white'>
                      © 2023 ParsonsKellogg Store. All Rights Reserved
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CheckoutType7Refactor;
