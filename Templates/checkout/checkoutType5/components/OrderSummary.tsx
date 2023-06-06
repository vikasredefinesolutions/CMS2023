import Price from '@appComponents/reUsable/Price';

import { __pagesText } from '@constants/pages.text';

import { _shippingMethod } from '@controllers/checkoutController';

import SummarryController from '@controllers/summarryController';

import { FetchSalesTax } from '@services/checkout.service';

import { Form, Formik } from 'formik';

import { GetCartTotals, useActions_v2, useTypedSelector_v2 } from 'hooks_v2';

import { FC, useEffect, useState } from 'react';

interface _props {
  placeOrder: (args: _shippingMethod) => void;

  currentpage: number;

  selectedShipModel: _shippingMethod;

  billingAddressCode: string;

  salesTax: number;

  setSalesTax: (args: number) => void;
}

const OrderSummaryType5: FC<_props> = ({
  placeOrder,

  currentpage,

  selectedShipModel,

  setSalesTax,

  salesTax,

  billingAddressCode,
}) => {
  const { update_checkoutEmployeeLogin } = useActions_v2();

  const couponDetails = useTypedSelector_v2((state) => state.cart.discount);

  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => !!state.employee.empId,
  );

  const currentPage = useTypedSelector_v2((state) => state.store.currentPage);

  const { el: employeeLogin } = useTypedSelector_v2((state) => state.checkout);

  const [textOrNumber, setTextOrNumber] = useState<'number' | 'text'>('text');

  // Functions

  const {
    coupon,

    successMessage,

    setCoupon,

    applyCouponHandler,

    removeCouponCodeHandler,
  } = SummarryController();

  const {
    totalPrice,

    subTotal,

    logoSetupCharges,

    smallRunFee,

    totalLogoCharges,

    totalLineCharges,
  } = GetCartTotals();

  const { id: customerID } = useTypedSelector_v2((state) => state.user);

  useEffect(() => {
    FetchSalesTax({
      customerId: customerID,

      zipCode: billingAddressCode,

      logoTotal: totalLogoCharges.toFixed(2),

      lineTotal: totalLineCharges.toFixed(2),

      logoSetupCharge: logoSetupCharges?.toFixed(2),

      shippingCharges: selectedShipModel.price?.toFixed(2),

      smallRunFee: smallRunFee.toFixed(2),
    }).then((res) => setSalesTax(res));
  }, [billingAddressCode]);

  const ShippingHTML = (userShippingPrice: number) => {
    if (isEmployeeLoggedIn && currentPage === 'CHECKOUT') {
      const price =
        textOrNumber === 'text' && employeeLogin.shippingPrice === 0
          ? 'FREE'
          : employeeLogin.shippingPrice.toFixed(2);

      return (
        <div className='border-t border-gray-200 flex items-center justify-between pt-[10px] pb-[10px]'>
          <dt className='text-normal-text flex items-center tracking-normal pb-[10px]'>
            <span>Shipping</span>
          </dt>

          <dd className='text-normal-text tracking-normal'>
            <div className='form-group m-b-10 pl-[15px] relative max-w-[100px]'>
              <span className='absolute left-[0px] top-[12px] text-normal-text flex items-center tracking-normal'>
                $
              </span>

              <Formik
                initialValues={{ shipping: price }}
                onSubmit={(values) => {
                  const price =
                    values.shipping === 'FREE' ? 0 : values.shipping;

                  update_checkoutEmployeeLogin({
                    type: 'SHIPPING_PRICE',

                    value: +(+price).toFixed(2),
                  });
                }}
                enableReinitialize
              >
                {({ handleChange, values, setFieldValue, submitForm }) => {
                  return (
                    <Form>
                      <input
                        className='border border-gray-border text-right focus:border-gray-border rounded w-full px-2 py-2'
                        value={values.shipping}
                        name={'shipping'}
                        type={textOrNumber}
                        onChange={(event) => {
                          if (textOrNumber === 'text') {
                            setTextOrNumber('number');
                          }

                          if ('FREE'.includes(event.target.value[0])) {
                            setFieldValue('number', '0');

                            return;
                          }

                          handleChange(event);
                        }}
                        onBlur={() => {
                          setTextOrNumber('text');

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
      <div className='border-t border-gray-200 flex items-center justify-between pt-[10px] pb-[10px]'>
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

  const addBottomPadding = couponDetails?.amount ? '' : 'pb-[20px]';

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
    <div className='border border-slate-400 bg-[#ffffff] mb-[20px]'>
      <div className='bg-light-gray w-full text-sub-text font-semibold pl-[16px] pr-[16px] pt-[8px] pb-[8px]'>
        {__pagesText.CheckoutPage.orderSummary.cartSummary}
      </div>

      <div className='px-[15px] py-[15px]'>
        <dl className=''>
          <div className='font-[600] text-medium-text'>Products Price</div>

          <div className='flex items-center justify-between pt-[15px] pb-[20px]'>
            <dt className='text-normal-text'>Subtotal:</dt>

            <dd className='text-normal-text'>
              <Price value={subTotal} />
            </dd>
          </div>

          {/* {totalLineCharges > 0 && (

            <div className='flex items-center justify-between pt-[10px]'>

              <dt className='text-base'>Line Charges</dt>

              <dd className='text-base font-medium text-gray-900'>

                <Price value={totalLineCharges} />

              </dd>

            </div>

          )}

          {sewOutTotal > 0 && (

            <div className='flex items-center justify-between pt-[10px]'>

              <dt className='text-base'>Sew Out Charges</dt>

              <dd className='text-base font-medium text-gray-900'>

                <Price value={sewOutTotal} />

              </dd>

            </div>

          )}

          {smallRunFee > 0 && (

            <div className='flex items-center justify-between pt-[10px]'>

              <dt className='text-base'>Small Run Fee</dt>

              <dd className='text-base font-medium text-gray-900'>

                <Price value={smallRunFee} />

              </dd>

            </div>

          )}

          {logoSetupCharges > 0 && (

            <div

              className={`flex items-center justify-between pt-[10px] ${addBottomPadding}`}

            >

              <dt className='text-base'>Logo Setup Charges</dt>

              <dd className='text-base font-medium text-gray-900'>

                <Price value={logoSetupCharges} />

              </dd>

            </div>

          )} */}

          {!!couponDetails?.amount && (
            <div className='flex items-center justify-between pt-[10px] pb-[20px]'>
              <dt className='text-base'>
                Promo{' '}
                <span
                  className='text-anchor cursor-pointer'
                  onClick={() => removeCouponCodeHandler()}
                >
                  (Remove)
                </span>
              </dt>

              <dd className='text-base font-medium text-gray-900 '>
                - <Price value={couponDetails?.amount || 0} />
              </dd>
            </div>
          )}

          <div className='border-t border-gray-200 flex items-center pt-[10px] pb-[10px] checkoutpage'>
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
                className='peer placeholder:opacity-0 block w-full bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200 pr-10 relative z-10'
              />
              <label
                htmlFor='Promo_code'
                className='absolute duration-300 top-[-10px] left-[0px] peer-focus:left-[0px] pr-2 -z-1 origin-0 text-base bg-[#ffffff] peer-focus:top-[-10px] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2'
              >
                PROMO CODE
              </label>{' '}
              {showUpdateBtn() ? (
                <button
                  onClick={() => applyCouponHandler(coupon)}
                  className='coupon-code-Apply text-sm absolute right-0 top-0 curosr-pointer z-40 btn btn-secondary btn-sm  '
                >
                  UPDATE
                </button>
              ) : (
                <div className='"text-base font-medium absolute right-0 top-1/2 -translate-y-1/2'>
                  {successMessage ? '' : '+'}
                </div>
              )}
            </dt>
          </div>

          {ShippingHTML(selectedShipModel?.price)}

          {currentPage === 'CHECKOUT' && salesTax != 0 && (
            <div className='border-t border-gray-200 flex items-center justify-between pt-[10px]'>
              <dt className='text-normal-text flex items-center'>
                <span>{__pagesText.CheckoutPage.orderSummary.tax}</span>
              </dt>

              <dd className='text-normal-text'>
                <Price value={salesTax} />
              </dd>
            </div>
          )}
        </dl>
      </div>

      <div className='flex justify-between items-center bg-light-gray w-full text-sub-text font-[600] pl-[16px] pr-[16px] pt-[8px] pb-[8px]'>
        <div>Total:</div>

        <div>
          <Price value={totalPrice + selectedShipModel.price + salesTax} />
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryType5;
