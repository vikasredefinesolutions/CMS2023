import NxtImage from '@appComponents/reUsable/Image';
import { PaymentMethod, UserAddressType, checkoutPages } from '@constants/enum';
import { __pagesText } from '@constants/pages.text';
import {
  GetCartTotals,
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';
import CartItem from '@templates/cartItem';
import _ from 'lodash';
import { FC, useEffect, useState } from 'react';
import * as yup from 'yup';
import OrderSummary from './components/OrderSummary';
import PaymentType from './components/Payment';

import { __Cookie } from '@constants/global.constant';
import { __pagesConstant } from '@constants/pages.constant';
import { paths } from '@constants/paths.constant';
import { AddOrderDefault } from '@constants/payloads/checkout';
import CheckoutController, {
  _shippingMethod,
} from '@controllers/checkoutController';
import { AddressType } from '@controllers/checkoutController/CheckoutAddressForm';
import { deleteCookie } from '@helpers/common.helper';
import { GetShippingmethod } from '@services/address.service';
import { placeOrder as placeOrderService } from '@services/checkout.service';
import AddressFormPk from './components/Form';

import { Klaviyo_PlaceOrder } from '@services/klaviyo.service';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
interface _Props {
  templateId: number;
}

const ChekoutType2: FC<_Props> = ({ templateId }) => {
  // placeOrder,
  const {
    currentPage,
    paymentFieldUpdateHandler,
    paymentMethod,
    updatePaymentMethod,
    detectCardType,
    reviewOrder,
    addPaymentDetails,
    setCurrentPage,
    cardDetails,
  } = CheckoutController();
  const router = useRouter();
  const { setShowLoader, logoutClearCart, showModal } = useActions_v2();
  const { shippingChargeType, id: storeId } = useTypedSelector_v2(
    (state) => state.store,
  );
  const useBalance = useTypedSelector_v2(
    (state) => state.cart.userCreditBalance.useBalance,
  );

  const [selectedShipping, setSelectedShipping] = useState<
    _shippingMethod | { name: ''; price: 0 }
  >({ name: '', price: 0 });

  const fetchShipping = async (
    totalPrice: number,
    shippingCountry?: string | null,
  ) => {
    try {
      if (storeId && shippingChargeType) {
        const data = await GetShippingmethod({
          shippingMethodModel: {
            city: shippingAddress?.city || '',
            state: shippingAddress?.state || '',
            country:
              shippingCountry === null ? ' ' : shippingAddress?.countryName,
            zipCode: shippingAddress?.postalCode || '',
            customerID: id,
            storeId: storeId,
            ordertotalwithoutshipppingcharge: totalPrice,
            shippingType: shippingChargeType,
          },
        });
        if (data) {
          setShippingMethod(data);
          setSelectedShipping(data[0]);
        }
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [shippingMethod, setShippingMethod] = useState<_shippingMethod[] | []>([
    {
      name: '',
      price: 0,
    },
  ]);

  const cartData = useTypedSelector_v2((state) => state.cart);
  const { loggedIn: isEmployeeLoggedIn, isLoadingComplete } =
    useTypedSelector_v2((state) => state.employee);
  const [shippingAddress, setShippingAddress] = useState<AddressType | null>(
    null,
  );
  const [billingAddress, setBillingAddress] = useState<AddressType | null>(
    null,
  );

  const { loggedIn, customer, id } = useTypedSelector_v2((state) => state.user);
  const userID = GetCustomerId();
  const [changeBillingAddress, setChangeBillingAddress] =
    useState<boolean>(false);
  useEffect(() => {
    if (loggedIn && customer) {
      if (customer.customerAddress.length > 0) {
        if (customer && customer.customerAddress) {
          for (
            let index = 0;
            index < customer.customerAddress.length;
            index++
          ) {
            if (
              customer.customerAddress[index].addressType ==
                UserAddressType.SHIPPINGADDRESS &&
              customer.customerAddress[index].isDefault
            ) {
              setShippingAddress(
                customer.customerAddress[index] as AddressType,
              );
            } else if (
              customer.customerAddress[index].addressType ==
                UserAddressType.BILLINGADDRESS &&
              customer.customerAddress[index].isDefault
            ) {
              setBillingAddress(customer.customerAddress[index] as AddressType);
            }
          }
        }
      }
    }
  }, [customer]);

  const validationSchema = yup.object({
    firstName: yup.string().required('Required field'),
    lastName: yup.string().required('Required field'),
    streetAddress: yup.string().required('Required field'),
    city: yup.string().required('Required field'),
    zipCode: yup.string().required('Required Field'),
    country: yup.string().required('Required field'),
    state: yup.string().required('Required field'),
    phone: yup.number().required('Required field'),
  });

  const initialBillingValues = {
    firstname: billingAddress ? billingAddress?.firstname : '',
    lastName: billingAddress ? billingAddress?.lastName : '',
    email: billingAddress ? billingAddress?.email : '',
    address1: billingAddress ? billingAddress?.address1 : '',
    address2: billingAddress ? billingAddress?.address2 : '',
    suite: billingAddress ? billingAddress?.suite : '',
    city: billingAddress ? billingAddress?.city : '',
    state: billingAddress ? billingAddress?.state : '',
    postalCode: billingAddress ? billingAddress?.postalCode : '',
    phone: billingAddress ? billingAddress?.phone : '',
    fax: billingAddress ? billingAddress?.fax : '',
    countryName: billingAddress ? billingAddress?.countryName : '',
    isDefault: true,
    companyName: billingAddress ? billingAddress?.companyName : '',
    countryCode: billingAddress ? billingAddress?.countryCode : '',
  };

  const initialShippingValues = {
    firstname: shippingAddress ? shippingAddress?.firstname : '',
    lastName: shippingAddress ? shippingAddress?.lastName : '',
    email: shippingAddress ? shippingAddress?.email : '',
    address1: shippingAddress ? shippingAddress?.address1 : '',
    address2: shippingAddress ? shippingAddress?.address2 : '',
    suite: shippingAddress ? shippingAddress?.suite : '',
    city: shippingAddress ? shippingAddress?.city : '',
    state: shippingAddress ? shippingAddress?.state : '',
    postalCode: shippingAddress ? shippingAddress?.postalCode : '',
    phone: shippingAddress ? shippingAddress?.phone : '',
    fax: shippingAddress ? shippingAddress?.fax : '',
    countryName: shippingAddress ? shippingAddress?.countryName : '',
    isDefault: true,
    companyName: shippingAddress ? shippingAddress?.companyName : '',
    countryCode: shippingAddress ? shippingAddress?.countryCode : '',
  };

  const Billingformik = useFormik({
    initialValues: initialBillingValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: (values) => {},
  });

  const ShippingFormik = useFormik({
    initialValues: initialShippingValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: (values) => {},
  });
  const [useShippingAddress, setUseShippingAddress] = useState<boolean>(true);
  const {
    totalPrice,
    subTotal,
    discount,
    totalLineCharges,
    logoSetupCharges,
    totalLogoCharges,
    smallRunFee,
    salesTax,
    sewOutTotal,
    creditBalance,
  } = GetCartTotals();
  const [showPayment, setshowPayment] = useState<boolean>(false);
  const [showShippingMethod, setShowShippingMethod] = useState<boolean>(true);

  const placeOrder = async (selectedShippingMOodel: _shippingMethod) => {
    // const shippingData = await fetchShipping(price);
    let userNewId = 0;
    setShowLoader(true);

    if (shippingAddress && billingAddress && customer) {
      const orderModel = {
        ...AddOrderDefault,
        ...addPaymentDetails(),
        cardName: billingAddress.firstname + ' ' + billingAddress?.lastName,
        ...(useBalance
          ? {
              isCreditLimit: true,
              storeCredit: creditBalance,
            }
          : {}),
        ...(useBalance && totalPrice === creditBalance
          ? {
              paymentMethod: PaymentMethod.PREPAYMENT,
              paymentGateway: PaymentMethod.PREPAYMENT,
            }
          : {}),
        storeID: storeId,
        customerID: userID,
        firstName: customer?.firstname || billingAddress.firstname,
        lastName: customer?.lastName || billingAddress.lastName,
        email: customer?.email,
        billingEqualsShipping: useShippingAddress,
        billingEmail: billingAddress.email,
        billingFirstName: billingAddress.firstname,
        billingLastName: billingAddress.lastName,
        billingCompany: billingAddress.companyName,
        billingAddress1: billingAddress.address1,
        billingAddress2: billingAddress.address2,
        billingSuite: billingAddress.suite,
        billingCity: billingAddress.city,
        billingState: billingAddress.state,
        billingZip: billingAddress.postalCode,
        billingCountry: billingAddress.countryName,
        billingPhone: billingAddress.phone,
        shippingEmail: customer?.email,
        shippingFirstName: shippingAddress.firstname,
        shippingLastName: shippingAddress.lastName,
        shippingCompany: shippingAddress.companyName,
        shippingAddress1: shippingAddress.address1,
        shippingAddress2: shippingAddress.address2,
        shippingSuite: shippingAddress.suite,
        shippingCity: shippingAddress.city,
        shippingState: shippingAddress.state,
        shippingZip: shippingAddress.postalCode,
        shippingCountry: shippingAddress.countryName,
        shippingPhone: shippingAddress.phone,
        orderSubtotal: subTotal,
        orderTax: salesTax,
        orderTotal: totalPrice + selectedShippingMOodel.price,
        orderNotes: '',
        couponCode: '',
        couponDiscountAmount: discount,
        orderStatus: __pagesConstant.checkoutPage.orderStatus,
        transactionStatus: __pagesConstant.checkoutPage.transactionStatus,
        shippingMethod: selectedShippingMOodel.name,
        endUserName: '',
        logoFinalTotal: totalLogoCharges,
        lineFinalTotal: totalLineCharges,
        orderShippingCosts: selectedShipping.price,
        orderSmallRunFee: smallRunFee,
        orderLogoSetupFee: logoSetupCharges,

        // EMPLOYEE LOGIN SPECIFIC
        // empSourceName: employeeLogin.source.value,
        // empSourceMedium: employeeLogin.sourceMedium.value,
        // empSalesRap: employeeLogin.salesRep.label,
        // salesRepName: employeeLogin.salesRep.label,
        // salesAgentId: +employeeLogin.salesRep.value,
        // isAllowPo: employeeLogin.allowPo,
      };

      try {
        await placeOrderService({
          orderModel,
        })
          .then(async (res) => {
            if (res?.id) {
              await Klaviyo_PlaceOrder({
                orderNumber: res.id,
              });
              // if (isEmployeeLoggedIn) {
              //   logout_EmployeeLogin();
              // }
              setShowLoader(false);
              router.push(`/${paths.THANK_YOU}?orderNumber=${res.id}`);
              logoutClearCart();
              deleteCookie(__Cookie.tempCustomerId);
            } else if (res) {
              setShowLoader(false);
              showModal({
                message: Object.values(res)[0],
                title: 'Error',
              });
            }
          })
          .catch((err) => {
            setShowLoader(false);
            let x = '';
            Object.values(err).forEach((val) => (x = x + val));
            showModal({
              message: x,
              title: 'Failed',
            });
          });
      } catch (error: any) {
        setShowLoader(false);
        let x = '';
        Object.values(error).forEach((val) => (x = x + val));
        showModal({
          message: x,
          title: 'Failed',
        });
      }
    }
  };

  useEffect(() => {
    if (totalPrice) {
      fetchShipping(totalPrice);
    }
  }, [totalPrice, shippingAddress]);

  return (
    <section className='mt-[20px]'>
      <div className='bg-white'>
        <div className='container mx-auto'>
          <div className='flex flex-wrap ml-[-15px] mr-[-15px] -mt-3 checkout-box'>
            {/* Billing Information */}
            <section className='w-full lg:w-8/12 md:w-7/12 pl-[15px] pr-[15px]'>
              <div className='flex flex-wrap checkout-box ml-[-15px] mr-[-15px]'>
                <div className='bg-light-gray flex-1 w-full md:w-6/12 mt-[15px] ml-[15px] mr-[15px] mb-[30px]'>
                  <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                    <div className='flex flex-wrap items-center justify-between pt-[10px] border-b border-[#ececec]'>
                      <div className='pb-[10px] text-title-text'>
                        {__pagesText.CheckoutPage.BillingInformation}
                      </div>
                      <div className='text-default-text'>
                        <div
                          onClick={() => {
                            setChangeBillingAddress(true);
                            setShowShippingMethod(false);
                            setCurrentPage(checkoutPages.address);
                            setshowPayment(true);
                          }}
                          className='!text-anchor hover:!text-anchor-hover cursor-pointer '
                        >
                          {__pagesText.CheckoutPage.Change}
                        </div>
                      </div>
                    </div>
                    {billingAddress && (
                      <div className='text-default-text mt-[10px]'>
                        {billingAddress?.firstname} {billingAddress?.lastName}
                        <br />
                        {billingAddress?.companyName}
                        <br />
                        {billingAddress?.address1}
                        <br />
                        {[
                          billingAddress?.city,
                          billingAddress?.state,
                          billingAddress?.postalCode,
                        ].join(', ')}
                        <br />
                        {billingAddress?.countryName}
                        <br />
                        {billingAddress?.phone}
                      </div>
                    )}
                  </div>
                </div>
                <div className='bg-light-gray flex-1 w-full md:w-6/12 mt-[15px] ml-[15px] mr-[15px] mb-[30px]'>
                  <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                    <div className='flex flex-wrap items-center justify-between pt-[10px] border-b border-[#ececec]'>
                      <div className='pb-[10px] text-title-text'>
                        {__pagesText.CheckoutPage.ShippingMethod}
                      </div>
                      <div className='text-default-text'>
                        <span
                          className='!text-anchor hover:!text-anchor-hover'
                          onClick={() => {
                            setShowShippingMethod(true);
                            setshowPayment(false);
                            setChangeBillingAddress(false);
                          }}
                        >
                          {__pagesText.CheckoutPage.Change}
                        </span>
                      </div>
                    </div>
                    <div className='text-default-text mt-[10px] mb-[15px]'>
                      <span>
                        {__pagesText.CheckoutPage.ShippingMethod}
                        {':'}
                        {!_.isEmpty(selectedShipping) && (
                          <span>{`${
                            selectedShipping.name
                          } $(${selectedShipping.price.toPrecision(2)})`}</span>
                        )}
                      </span>
                    </div>
                    <div className='pt-[10px] border-b border-[#ececec]'>
                      <div className='pb-[10px] text-title-text'>
                        {__pagesText.CheckoutPage.PaymentMethod}
                      </div>
                    </div>
                    <div className='flex flex-wrap items-center justify-between pt-[10px]'>
                      <div className='pb-[10px] text-default-text'>
                        {__pagesText.CheckoutPage.paymentInfo}
                      </div>
                      <div className='text-default-text'>
                        <span
                          className='!text-anchor hover:!text-anchor-hover'
                          onClick={() => {
                            setChangeBillingAddress(false);
                            setCurrentPage(checkoutPages.address);
                            !showShippingMethod && setshowPayment(true);
                          }}
                        >
                          {__pagesText.CheckoutPage.Change}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {currentPage === checkoutPages.reviewOrder ? (
                <CartItem
                  isRemovable={false}
                  isEditable={false}
                  availableFont={[]}
                  availableLocation={[]}
                  availableColor={[]}
                  templateId={templateId}
                />
              ) : (
                <>
                  {showShippingMethod && (
                    <>
                      <div className='bg-light-gray w-full mb-[30px] opacity-100'>
                        <div className='bg-light-gray flex-1 w-full md:w-full mt-[15px] ml-[15px] mr-[15px] mb-[30px]'>
                          <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                            <div className='flex flex-wrap items-center justify-between pt-[10px] border-b border-[#ececec]'>
                              <div className='pb-[10px] text-title-text'>
                                {__pagesText.CheckoutPage.ShippingAddress}
                              </div>
                            </div>
                            <AddressFormPk addressformik={ShippingFormik} />
                          </div>
                        </div>
                      </div>
                      <div
                        className='bg-light-gray w-full mb-[30px]'
                        id='shippingMethod'
                      >
                        <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                          <div className='pt-[10px] border-b border-[#ececec]'>
                            <div className='pb-[10px] text-title-text'>
                              {__pagesText.CheckoutPage.ShippingMethod}
                            </div>
                          </div>
                          <div className='text-default-text mb-[5px] mt-[10px]'>
                            {__pagesText.CheckoutPage.ChooseShippingMethod}
                          </div>
                          <div className='flex items-center flex-wrap mb-[30px]'>
                            {shippingMethod &&
                              shippingMethod.map(
                                (el: _shippingMethod, index: number) => (
                                  <div className='w-full block' key={index}>
                                    <input
                                      type='radio'
                                      name='shippingMethod'
                                      id={`shippingMethod${index}`}
                                      onChange={() => setSelectedShipping(el)}
                                      checked={
                                        selectedShipping.name == el.name
                                          ? true
                                          : false
                                      }
                                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 '
                                    />
                                    <label
                                      htmlFor={`shippingMethod${index}`}
                                      className='ml-2 text-default-text'
                                    >
                                      {shippingMethod &&
                                        `${el.name}($${el.price.toPrecision(
                                          2,
                                        )})`}
                                    </label>
                                  </div>
                                ),
                              )}
                          </div>
                          <div className=''>
                            <button
                              className='btn btn-lg btn-secondary'
                              onClick={() => setshowPayment(true)}
                            >
                              {__pagesText.CheckoutPage.GoToPayment}
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* payment method */}
                  {!showPayment && (
                    <div className='bg-light-gray w-full mb-[30px] opacity-50'>
                      <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                        <div className='flex flex-wrap items-center justify-between'>
                          <div className='pt-[10px] pb-[10px] text-title-text'>
                            {__pagesText.CheckoutPage.PaymentMethod}
                          </div>
                          <div className='pt-[10px] pb-[10px]'>
                            <div className='w-10'>
                              <img
                                src='/secure-card-hover.png'
                                alt='lockimage'
                                className=''
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {showPayment && (
                    <div className='PaymentMethodInne bg-light-gray'>
                      <div className='bg-[#d4d4d4] w-full'>
                        <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                          <div className='flex flex-wrap items-center justify-between pt-[10px] mb-[10px] border-b border-[#ececec]'>
                            <div className='pb-[10px] text-title-text'>
                              {__pagesText.CheckoutPage.PaymentMethod}
                            </div>
                            <div className='pt-[10px] pb-[10px]'>
                              <div className='w-10'>
                                <NxtImage
                                  src='/secure-card.jpg'
                                  alt='lockimage'
                                  className=''
                                />
                              </div>
                            </div>
                          </div>
                          <div className='text-right text-default-text'>
                            {__pagesText.CheckoutPage.secure128}
                          </div>
                        </div>
                      </div>

                      <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                        <PaymentType
                          changeHandler={paymentFieldUpdateHandler}
                          paymentMethod={paymentMethod}
                          updatePaymentMethod={updatePaymentMethod}
                          detectCardType={detectCardType}
                          BillingFormik={Billingformik}
                          changeBillingAddress={changeBillingAddress}
                          setChangeBillingAddress={setChangeBillingAddress}
                          setUseShippingAddress={setUseShippingAddress}
                          useShippingAddress={useShippingAddress}
                        />
                        <div className='max-w-[278px]'>
                          <button
                            className='btn btn-lg !w-full text-center btn-secondary mb-[8px]'
                            id='btn-review-order'
                            onClick={() => {
                              reviewOrder();
                              setBillingAddress({ ...ShippingFormik.values });
                              setShippingAddress({ ...ShippingFormik.values });
                            }}
                          ></button>
                        </div>
                      </div>

                      <div className='bg-[#d4d4d4] w-full mb-[30px]'>
                        <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px] text-center'>
                          <div className='w-28 mx-auto'>
                            <img
                              src={'/secure-btm.jpg'}
                              alt=''
                              className='w-full max-h-[100px]'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className='bg-light-gray w-full mb-[30px] opacity-50'>
                    <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                      <div className='flex flex-wrap items-center justify-between'>
                        <div className='pt-[10px] pb-[10px] text-title-text'>
                          {__pagesText.CheckoutPage.OrderReview}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </section>
            <OrderSummary
              currentpage={currentPage}
              selectedShipModel={selectedShipping}
              placeOrder={placeOrder}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChekoutType2;
