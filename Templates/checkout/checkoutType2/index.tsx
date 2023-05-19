import NxtImage from '@appComponents/reUsable/Image';
import { checkoutPages, UserAddressType } from '@constants/enum';
import { __pagesText } from '@constants/pages.text';
import { GetCartTotals, useTypedSelector_v2 } from '@hooks_v2/index';
import { GetShippingmethod } from '@services/address.service';
import CartItem from '@templates/cartItem';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import OrderSummary from './components/OrderSummary';
import PaymentType from './components/Payment';
// import { GetShippingmethod } from '@services/address.service';

import CheckoutController from '@controllers/checkoutController';

interface _Props {
  cartTemplateId: number;
}

const ChekoutType2: FC<_Props> = ({ cartTemplateId }) => {
  const { shippingChargeType, id: storeId } = useTypedSelector_v2(
    (state) => state.store,
  );

  const {
    currentPage,
    placeOrder,
    reviewOrder,
    cartData,
    paymentFieldUpdateHandler,
    paymentMethod,
    updatePaymentMethod,
    detectCardType,
    shippingAdress,
    billingAdress,
    setAddressType,
    setShippingMethod,
    shippingMethod,
  } = CheckoutController();

  const [showPayment, setshowPayment] = useState<boolean>(false);

  const { id } = useTypedSelector_v2((state) => state.user);
  const { subTotal } = GetCartTotals();

  const fetchShiiping = async (id: number | null) => {
    try {
      if (storeId && shippingChargeType) {
        await GetShippingmethod({
          shippingMethodModel: {
            city: '',
            state: '',
            country: '',
            zipCode: '',
            customerID: id,
            storeId: storeId,
            ordertotalwithoutshipppingcharge: subTotal,
            shippingType: shippingChargeType,
          },
        }).then((res) => {
          if (res) {
            setShippingMethod(res);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchShiiping(id);
  }, []);

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
                          onClick={() =>
                            setAddressType(UserAddressType.BILLINGADDRESS)
                          }
                          className='!text-anchor hover:!text-anchor-hover '
                        >
                          {__pagesText.CheckoutPage.Change}
                        </div>
                      </div>
                    </div>
                    {billingAdress && (
                      <div className='text-default-text mt-[10px]'>
                        {billingAdress?.firstname} {billingAdress?.lastName}
                        <br />
                        {billingAdress?.companyName}
                        <br />
                        {billingAdress?.address1}
                        <br />
                        {[
                          billingAdress?.city,
                          billingAdress?.state,
                          billingAdress?.postalCode,
                        ].join(', ')}
                        <br />
                        {billingAdress?.countryName}
                        <br />
                        {billingAdress?.phone}
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
                        <Link href={'#shippingMethod'}>
                          <a className='!text-anchor hover:!text-anchor-hover'>
                            {__pagesText.CheckoutPage.Change}
                          </a>
                        </Link>
                      </div>
                    </div>
                    <div className='text-default-text mt-[10px] mb-[15px]'>
                      <span>
                        {__pagesText.CheckoutPage.ShippingMethod}
                        {':'}
                        {shippingMethod &&
                          `${
                            shippingMethod[0].name
                          }($${shippingMethod[0].price.toPrecision(2)})`}
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
                        <div className='!text-anchor hover:!text-anchor-hover'>
                          {__pagesText.CheckoutPage.Change}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {currentPage === checkoutPages.reviewOrder ? (
                <CartItem
                  {...{
                    isRemovable: false,
                    cartData: cartData,
                    cartType: cartTemplateId,
                  }}
                />
              ) : (
                <>
                  {/* Shipping Address */}
                  <div className='bg-light-gray w-full mb-[30px] opacity-100'>
                    <div className='bg-light-gray flex-1 w-full md:w-full mt-[15px] ml-[15px] mr-[15px] mb-[30px]'>
                      <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                        <div className='flex flex-wrap items-center justify-between pt-[10px] border-b border-[#ececec]'>
                          <div className='pb-[10px] text-title-text'>
                            {__pagesText.CheckoutPage.ShippingAddress}
                          </div>
                          <div className='text-default-text'>
                            <div
                              onClick={() =>
                                setAddressType(UserAddressType.SHIPPINGADDRESS)
                              }
                              className='!text-anchor hover:!text-anchor-hover cursor-pointer'
                            >
                              {__pagesText.CheckoutPage.Change}
                            </div>
                          </div>
                        </div>
                        {shippingAdress && (
                          <div className='text-default-text mt-[10px]'>
                            {shippingAdress?.firstname}{' '}
                            {shippingAdress?.lastName}
                            <br />
                            {shippingAdress?.companyName}
                            <br />
                            {shippingAdress?.address1}
                            <br />
                            {[
                              shippingAdress?.city,
                              shippingAdress?.state,
                              shippingAdress?.postalCode,
                            ].join(', ')}
                            <br />
                            {shippingAdress?.countryName}
                            <br />
                            {shippingAdress?.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* shipping method */}
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
                      <div className='flex items-center mb-[30px]'>
                        <input
                          type='radio'
                          name='shippingMethod'
                          id=''
                          checked={true}
                          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                        />
                        <label
                          htmlFor='shippingMethod'
                          className='ml-2 text-default-text'
                        >
                          {shippingMethod &&
                            `${
                              shippingMethod[0].name
                            }($${shippingMethod[0].price.toPrecision(2)})`}
                        </label>
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

                  {/* payment method */}
                  {!showPayment ? (
                    <div className='bg-light-gray w-full mb-[30px] opacity-50'>
                      <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                        <div className='flex flex-wrap items-center justify-between'>
                          <div className='pt-[10px] pb-[10px] text-title-text'>
                            {__pagesText.CheckoutPage.PaymentMethod}
                          </div>
                          <div className='pt-[10px] pb-[10px]'>
                            <div className='w-10'>
                              <NxtImage
                                src='/images/secure-card-hover.png'
                                alt='lockimage'
                                className=''
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
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
                                    src='/images/secure-card.jpg'
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
                          />
                          <div className='max-w-[278px]'>
                            <button
                              className='btn btn-lg !w-full text-center btn-secondary mb-[8px]'
                              id='btn-review-order'
                              onClick={reviewOrder}
                            >
                              {__pagesText.CheckoutPage.GotoReview}
                            </button>
                          </div>
                        </div>

                        <div className='bg-[#d4d4d4] w-full mb-[30px]'>
                          <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px] text-center'>
                            <div>
                              <NxtImage
                                src={'/images/secure-btm.jpg'}
                                alt=''
                                className='w-full max-h-[100px]'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
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
                </>
              )}
            </section>

            <OrderSummary currentpage={currentPage} placeorder={placeOrder} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChekoutType2;
