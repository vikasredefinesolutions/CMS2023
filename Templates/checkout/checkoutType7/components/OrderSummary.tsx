import Price from '@appComponents/reUsable/Price';
import { checkoutPages } from '@constants/enum';
import { CYXTERA_CODE, UNITI_CODE } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { _shippingMethod } from '@controllers/checkoutController';
import SummarryController from '@controllers/summarryController';
import {
  GetCartTotals,
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';
import { FetchSalesTax } from '@services/checkout.service';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';

interface _props {
  placeOrder: (args: _shippingMethod) => void;
  currentpage: number;
  selectedShipModel: _shippingMethod;
}

const OrderSummary: React.FC<_props> = ({
  placeOrder,
  currentpage,
  selectedShipModel,
}) => {
  let smallRunFeeCharge = 0;
  const {
    totalPrice,
    creditBalance,
    merchandisePrice,
    totalLineCharges,
    totalLogoCharges,
    subTotal,
    firstLogoPrice,
    secondLogoPrice,
  } = GetCartTotals();

  const customerID = GetCustomerId();
  const {
    el: employeeLogin,
    charges,
    address,
  } = useTypedSelector_v2((state) => state.checkout);
  const smallRunFee = useTypedSelector_v2(
    (state) => state.store.cartCharges?.smallRunFeesCharges,
  );

  const currentPage = useTypedSelector_v2((state) => state.store.currentPage);
  const logoSetupCharges = useTypedSelector_v2(
    (state) => state.store.cartCharges?.logoSetupCharges,
  );
  const [textOrNumberSmallRun, setTextOrNumberSmallRun] = useState<
    'number' | 'text'
  >('text');
  const [textOrNumberShippingCost, setTextOrNumberShippingCost] = useState<
    'number' | 'text'
  >('text');
  const { update_CheckoutEmployeeLogin, update_CheckoutCharges } =
    useActions_v2();
  const {
    coupon,
    successMessage,
    setCoupon,
    applyCouponHandler,
    removeCouponCodeHandler,
  } = SummarryController();
  const { useBalance } = useTypedSelector_v2(
    (state) => state.cart.userCreditBalance,
  );
  const couponDetails = useTypedSelector_v2((state) => state.cart.discount);

  const getNewShippingCost = (shippingCost: number): number => {
    if (isEmployeeLoggedIn) {
      return employeeLogin.shippingPrice;
    }
    return shippingCost;
  };

  const getNewSmallRunFee = (smallRunFee: number): number => {
    if (isEmployeeLoggedIn) {
      return employeeLogin.smallRunFee;
    }
    return smallRunFee;
  };

  const messages = useTypedSelector_v2((state) => state.sbStore.messages);

  useEffect(() => {
    console.log('SALES TAX API CALLLING');

    FetchSalesTax({
      customerId: customerID || 0,
      zipCode: address.zipCode || 0,
      logoTotal: totalLogoCharges.toFixed(2),
      lineTotal: totalLineCharges.toFixed(2),
      logoSetupCharge: logoSetupCharges?.toFixed(2),
      // Here shippingPrice will be get updated, even if the store do not use employee login.
      // So, pass it as a dependency
      shippingCharges: getNewShippingCost(selectedShipModel?.price || 0),
      smallRunFee: getNewSmallRunFee(smallRunFeeCharge),
    }).then((res) => {
      update_CheckoutCharges({ type: 'SALES_TAX', cost: res });
    });
  }, [address.zipCode, employeeLogin.smallRunFee, employeeLogin.shippingPrice]);

  const disablePlaceOrder = (): boolean => {
    let disable = false;
    if (isEmployeeLoggedIn) {
      disable = !!!employeeLogin.salesRep.value;
    }

    return disable;
  };
  const { code: storeCode } = useTypedSelector_v2((state) => state.store);

  const ShippingHTML = (userShippingPrice: number) => {
    if (isEmployeeLoggedIn && currentPage === 'CHECKOUT') {
      const price =
        textOrNumberShippingCost === 'text' && employeeLogin.shippingPrice === 0
          ? 'FREE'
          : employeeLogin.shippingPrice.toFixed(2);

      return (
        <div
          className={`${
            storeCode !== CYXTERA_CODE && storeCode !== UNITI_CODE
              ? 'border-t border-gray-200'
              : ''
          }  flex items-center justify-between pt-[15px] pb-[10px]`}
        >
          <dt className='text-normal-text flex items-center tracking-normal pb-[10px]'>
            <span>Shipping</span>
          </dt>
          <dd className='text-normal-text tracking-normal'>
            <div className='form-group m-b-10 pl-[15px] relative max-w-[100px]'>
              <span className='absolute left-[0px] top-[12px] text-normal-text flex items-center tracking-normal'>
                $
              </span>
              <Formik
                key='shipping'
                initialValues={{ shipping: price }}
                onSubmit={(values) => {
                  const price =
                    values.shipping === 'FREE' ? 0 : values.shipping;
                  update_CheckoutEmployeeLogin({
                    type: 'SHIPPING_PRICE',
                    value: +(+price).toFixed(2),
                  });
                }}
                enableReinitialize
              >
                {({ values, setFieldValue, submitForm }) => {
                  return (
                    <Form key='shipping'>
                      <input
                        className='border border-gray-border text-right focus:border-gray-border rounded w-full px-2 py-2'
                        value={values.shipping}
                        min={0}
                        name={'shipping'}
                        type={textOrNumberShippingCost}
                        onFocus={() => {
                          if (textOrNumberSmallRun === 'text') {
                            setFieldValue('shipping', 0);
                            setTextOrNumberShippingCost('number');
                          }
                        }}
                        onChange={(event) => {
                          if (Number(event.target.value) < 0)
                            return setFieldValue('shipping', 0);
                          setFieldValue('shipping', event.target.value);
                        }}
                        onBlur={() => {
                          setFieldValue(
                            'shipping',
                            Number(values.shipping).toFixed(2),
                          );
                          submitForm();
                        }}
                        placeholder=''
                      />
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </dd>
        </div>
      );
    }

    return (
      <div
        className={`${
          storeCode !== CYXTERA_CODE && storeCode !== UNITI_CODE
            ? 'border-t border-gray-200'
            : ''
        }  flex items-center justify-between pt-[15px]`}
      >
        <dt className='text-normal-text flex items-center'>
          <span>Shipping</span>
        </dt>
        <dd className='text-normal-text'>
          {userShippingPrice === 0 ? (
            'FREE'
          ) : (
            <Price value={userShippingPrice} />
          )}
        </dd>
      </div>
    );
  };

  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );

  const decideValue = (args: {
    message: string | null;
    currentValue: string;
    active: number | undefined;
  }) => {
    if (args.message) {
      return args.message; // will show for 3 secs after applying the code
    }

    let text = '';
    if (args.currentValue) {
      text = args.currentValue;
    }
    if (args.active) {
      text = coupon;
    }
    return text;
  };

  const showUpdateBtn = () => {
    if (successMessage) {
      return false;
    }
    if (coupon) {
      return true;
    }
    return false;
  };
  return (
    <section className='w-full lg:w-4/12 md:w-5/12 pl-[15px] pr-[15px] mt-[15px]'>
      <div className='border border-gray-border p-[15px]'>
        <div className='w-full text-sub-text pt-[8px] pb-[8px]'>
          {__pagesText.CheckoutPage.orderSummary.OrderSummary}
        </div>
        <div className='w-full pl-[15px] pr-[15px] border-b border-gray-border mt-[10px] mb-[10px]'></div>
        <dl className='text-default-text'>
          <div className='flex items-center justify-between pt-[15px]'>
            <dt>{__pagesText.CheckoutPage.orderSummary.Subtotal}</dt>
            {/* <dt>{subTotal}</dt> */}
            <Price value={subTotal} />
          </div>

          {ShippingHTML(getNewShippingCost(selectedShipModel?.price))}

          <div className='flex items-center justify-between pt-[15px]'>
            <dt>{__pagesText.CheckoutPage.orderSummary.Tax}</dt>
            <Price value={charges.salesTax} />
          </div>
          {storeCode === CYXTERA_CODE || storeCode == UNITI_CODE ? (
            useBalance ? (
              <div className='flex items-center justify-between pt-[15px]'>
                <dt>{__pagesText.CheckoutPage.orderSummary.InternalCredit}</dt>
                -<Price value={creditBalance} />
              </div>
            ) : (
              <></>
            )
          ) : (
            <div className='flex items-center justify-between pt-[15px]'>
              <dt>{__pagesText.CheckoutPage.orderSummary.InternalCredit}</dt>
              <Price value={creditBalance} />
            </div>
          )}

          <div className='border-t  border-gray-200 flex items-center pt-[10px] pb-[10px] mt-[10px]'>
            <dt className='text-base z-0 w-full promocode relative'>
              <input
                name='Promo_code'
                id='Promo_code'
                placeholder='Promo code'
                type='text'
                value={decideValue({
                  message: successMessage,
                  currentValue: coupon,
                  active: couponDetails?.amount,
                })}
                autoComplete={'false'}
                onChange={(e) => setCoupon(e.target.value.trim())}
                className='peer placeholder:opacity-0 block w-full bg-transparent pt-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200 pr-10 relative z-10'
              />
              <label
                htmlFor='Promo_code'
                className='absolute duration-300 -top-6 -z-1 origin-0 text-base bg-[#ffffff] peer-focus:-top-6 peer-placeholder-shown:top-2 pr-3'
              >
                PROMO CODE
              </label>{' '}
              {showUpdateBtn() ? (
                <button
                  onClick={() => applyCouponHandler(coupon)}
                  className='coupon-code-Apply text-sm absolute right-0 top-2 curosr-pointer z-40 btn btn-secondary btn-sm '
                >
                  UPDATE
                </button>
              ) : (
                <div className='text-base font-medium absolute right-0 top-2'>
                  {successMessage ? '' : '+'}
                </div>
              )}
            </dt>
          </div>

          <div className='flex items-center justify-between pt-[15px] mb-[30px] border-t border-gray-border mt-[15pxz]'>
            <dt className='font-semibold'>
              {__pagesText.CheckoutPage.orderSummary.EstimatedTotal}
            </dt>
            <dt className='font-semibold'>
              <Price
                value={
                  totalPrice +
                  getNewShippingCost(selectedShipModel?.price) +
                  getNewSmallRunFee(smallRunFeeCharge) +
                  charges.salesTax
                }
              />
            </dt>
          </div>

          {messages.checkoutTermsAndCondition && (
            <div className='mt-[16px] mb-[16px]'>
              <div
                className=' text-rose-600 mb-[10px]'
                dangerouslySetInnerHTML={{
                  __html: messages.checkoutTermsAndCondition,
                }}
              ></div>
            </div>
          )}

          <div className='mt-[16px] mb-[16px]'>
            <button
              className={`btn btn-lg !w-full text-center btn-primary mb-[8px] ${
                currentpage !== checkoutPages.reviewOrder ? 'opacity-5' : ''
              }`}
              disabled={
                currentpage !== checkoutPages.reviewOrder ? true : false
              }
              onClick={() => placeOrder(selectedShipModel)}
            >
              {__pagesText.CheckoutPage.placeOrder}
            </button>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default OrderSummary;
