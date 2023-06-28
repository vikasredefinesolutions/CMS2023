import Price from '@appComponents/Price';
import SummarryController from '@controllers/summarryController';
import { useTypedSelector_v2 } from '@hooks_v2/index';

import React from 'react';
import { _CO7R_AddressFields, _CO7R_Screens } from '../CO7R_Extras';
import CO7_PlaceOrderBtn from './CO7R_PlaceOrderBtn';

interface _Props {
  showPlaceOrder: boolean;
  shippingAddress: _CO7R_AddressFields;
  screenToShow: _CO7R_Screens;
}

const CO7_OrderSummary: React.FC<_Props> = ({
  showPlaceOrder,
  shippingAddress,
  screenToShow,
}) => {
  const {
    coupon,
    successMessage,
    setCoupon,
    applyCouponHandler,
    removeCouponCodeHandler,
  } = SummarryController();

  const { charges, shippingMethod, user, payment } = useTypedSelector_v2(
    (state) => state.checkout,
  );

  const couponDetails = useTypedSelector_v2((state) => state.cart.discount);
  const { currentPage, id: storeId } = useTypedSelector_v2(
    (state) => state.store,
  );
  const cartItems = useTypedSelector_v2((state) => state.cart.cart);

  const calculateSubTotal = () => {
    let subTotal = 0;
    if (!cartItems) return 0;

    cartItems.forEach((item) => {
      subTotal += item.totalPrice + item.totalCustomFieldsCharges;
    });

    return subTotal;
  };

  const couponAmt = couponDetails?.amount || 0;
  const addBottomPadding = couponDetails?.amount ? '' : 'pb-[20px]';
  const addTopPadding = () => {
    if (screenToShow === 'addPaymentMethodAndBilling') return 'pt-[15px]';
    if (screenToShow === 'completeOrderDetails') return 'pt-[15px]';

    return '';
  };

  const cost = {
    shippingNhandling: shippingMethod.price,
    subTotal: calculateSubTotal(),
    tax: charges.salesTax,
    couponDiscount: couponAmt,
    creditBalance: payment.useCreditBalance ? user.creditBalance : 0,

    total: function () {
      const toAdd = this.subTotal + this.tax + this.shippingNhandling;
      const toSubtract = this.couponDiscount + this.creditBalance;

      const estimated = toAdd - toSubtract;
      return estimated > 0 ? estimated : 0;
    },
  };

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
    <section
      aria-labelledby='summary-heading'
      className={`w-full lg:w-3/12 md:w-4/12 pl-[10px] pr-[10px] ${addTopPadding()}`}
    >
      <div className='bg-white sticky top-0 pb-[30px]'>
        <div className='border border-gray-border'>
          <div className='bg-light-gray w-full text-sub-text font-medium px-[15px] py-[15px]'>
            Order Summary
          </div>
          <div className='px-[15px] py-[0px]'>
            <dl className='space-y-2'>
              <div className='flex items-center justify-between pt-[10px]'>
                <dt className='text-default-text'>Subtotal</dt>
                <dd className='text-default-text font-medium'>
                  <Price value={cost.subTotal} />
                </dd>
              </div>
              <div
                className={`flex items-center justify-between border-t border-t-gray-border pt-[10px] ${addBottomPadding}`}
              >
                <dt className='text-default-text'>Shipping & Handling</dt>
                <dd className='text-default-text font-medium'>
                  <Price value={cost.shippingNhandling} />
                </dd>
              </div>

              {currentPage === 'CHECKOUT' && (
                <div className='border-t border-t-gray-border pt-[10px] flex items-center justify-between'>
                  <dt className='flex items-center text-default-text'>
                    <span>Tax</span>
                  </dt>
                  <dd className='text-default-text font-medium'>
                    <Price value={cost.tax} />
                  </dd>
                </div>
              )}
              {!!couponDetails?.amount && (
                <div className='flex items-center justify-between border-t border-t-gray-border pt-[10px]'>
                  <dt className='text-default-text'>
                    Promo
                    <span
                      className='text-anchor cursor-pointer'
                      onClick={() => removeCouponCodeHandler()}
                    >
                      (Remove)
                    </span>
                  </dt>
                  <dd className='text-default-text font-medium'>
                    - <Price value={couponDetails?.amount || 0} />
                  </dd>
                </div>
              )}
              <div className='border-t border-gray-200 flex items-center relative pb-3'>
                <dt className='text-base z-0 w-full promocode'>
                  <input
                    name='Promo_code'
                    id='Promo_code'
                    value={decideValue({
                      message: successMessage,
                      currentValue: coupon,
                      active: couponDetails?.amount,
                    })}
                    placeholder='Promo code'
                    autoComplete={'false'}
                    onChange={(e) => setCoupon(e.target.value.trim())}
                    className='text-default-text peer placeholder:opacity-0 block w-full bg-transparent pt-2.5 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200 relative z-10'
                  />
                  <label
                    htmlFor='Promo_code'
                    className='absolute duration-300 -top-3 -z-1 origin-0 text-default-text bg-white peer-focus:-top-3 peer-placeholder-shown:top-2'
                  >
                    Promo code
                  </label>{' '}
                  {showUpdateBtn() ? (
                    <button
                      onClick={() => applyCouponHandler(coupon)}
                      className='coupon-code-Apply text-sm absolute right-0 top-2 curosr-pointer z-40 btn btn-secondary btn-sm '
                    >
                      APPLY
                    </button>
                  ) : (
                    <div className='text-base font-medium absolute right-0 top-2'>
                      {successMessage ? '' : '+'}
                    </div>
                  )}
                </dt>
              </div>
              {cost.creditBalance > 0 && (
                <div className={`flex items-center justify-between`}>
                  <dt className='text-default-text'>Internal Credit</dt>
                  <dd className='text-default-text font-medium'>
                    - <Price value={cost.creditBalance} />
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div className='flex justify-between items-center bg-light-gray w-full text-default-text font-bold px-[15px] py-[5px]'>
            <div>Estimated Total</div>
            <div>
              <Price value={cost.total()} />
            </div>
          </div>
        </div>
        {showPlaceOrder && (
          <CO7_PlaceOrderBtn shippingAddress={shippingAddress} cost={cost} />
        )}
      </div>
    </section>
  );
};

export default CO7_OrderSummary;
