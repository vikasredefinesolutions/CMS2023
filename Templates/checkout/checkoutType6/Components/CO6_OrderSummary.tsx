import Price from '@appComponents/Price';
import SummarryController from '@controllers/summarryController';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import {
  FetchSbCouponRebates,
  FetchSbStoreFees,
  FetchSbStoreFixedFees,
  _SbStoreCouponRebates,
  _SbStoreFees,
  _SbStoreFixedFees,
} from '@services/sb.service';
import { _CO6_AddressFields } from '@templates/checkout/checkoutType6/CO6_Extras';
import CO6_PlaceOrderBtn from '@templates/checkout/checkoutType6/Components/CO6_PlaceOrderBtn';
import React, { useEffect, useState } from 'react';

interface _Props {
  showPlaceOrder: boolean;
  shippingAddress: _CO6_AddressFields;
}

const CO6_OrderSummary: React.FC<_Props> = ({
  showPlaceOrder,
  shippingAddress,
}) => {
  const {
    coupon,
    successMessage,
    setCoupon,
    applyCouponHandler,
    removeCouponCodeHandler,
  } = SummarryController();

  const { charges, shippingMethod } = useTypedSelector_v2(
    (state) => state.checkout,
  );
  const [fees, setFees] = useState<{
    multipleFees: {
      name: string;
      amount: number;
      type: 'percentage' | 'number';
    }[];
    rebates: {
      name: string;
      amount: number;
      type: 'percentage' | 'number';
      couponCode: string;
    }[];
    fixedFees: number;
    cardFees: number;
  }>({
    multipleFees: [],
    rebates: [],
    fixedFees: 0,
    cardFees: 0,
  });
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
  const addBottomPadding = couponDetails?.amount ? 'pb-10px' : '';

  const cost = {
    shippingNhandling: shippingMethod.price,
    subTotal: calculateSubTotal(),
    tax: charges.salesTax,
    couponDiscount: couponAmt,
    fixedFee: fees.fixedFees,
    cardProcessingFee: fees.cardFees,
    total: function () {
      const rebatesTotal = fees.rebates.reduce((prev, next) => {
        let amount = next.amount;

        if (next.couponCode.length > 0) {
          return prev;
        }
        if (next.type === 'percentage') {
          amount = (this.subTotal * next.amount) / 100;
        }

        return amount + prev;
      }, 0);

      const multipleFeesTotal = fees.multipleFees.reduce((prev, next) => {
        let amount = next.amount;
        if (next.type === 'percentage') {
          amount = (this.subTotal * next.amount) / 100;
        }

        return amount + prev;
      }, 0);

      const toAdd =
        this.subTotal +
        this.tax +
        this.shippingNhandling +
        this.cardProcessingFee +
        this.fixedFee +
        multipleFeesTotal;

      const toSubtract = this.couponDiscount + rebatesTotal;
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

  const handleFees = (rawFees: _SbStoreFees[] | null) => {
    if (!rawFees) return;

    const multipleFees: {
      name: string;
      amount: number;
      type: 'percentage' | 'number';
    }[] = [];
    rawFees.forEach((item) => {
      if (item.type === 1) {
        multipleFees.push({
          name: item.name,
          amount: item.amount,
          type: 'percentage',
        });
        return;
      }

      multipleFees.push({
        name: item.name,
        amount: item.amount,
        type: 'number',
      });
    });
    setFees((prev) => ({
      ...prev,
      multipleFees: multipleFees,
    }));
  };

  const handleRebates = (rawRebates: _SbStoreCouponRebates[] | null) => {
    if (!rawRebates) return;

    const rebates: {
      name: string;
      amount: number;
      couponCode: string;
      type: 'percentage' | 'number';
    }[] = [];

    rawRebates.forEach((item) => {
      if (item.type === 1) {
        rebates.push({
          name: item.name,
          amount: item.amount,
          type: 'percentage',
          couponCode: item.couponCodes,
        });
        return;
      }

      rebates.push({
        name: item.name,
        amount: item.amount,
        type: 'number',
        couponCode: item.couponCodes,
      });
    });
    setFees((prev) => ({
      ...prev,
      rebates: rebates,
    }));
  };

  const handleFixedFees = (fixedFees: _SbStoreFixedFees | null) => {
    if (!fixedFees) return null;

    setFees((prev) => ({
      ...prev,
      fixedFees: fixedFees.fixedCharge || 0,
      cardFees: fixedFees.cardProcessingCharge || 0,
    }));
  };

  const callFeeAPIs = async () => {
    await Promise.allSettled([
      FetchSbStoreFixedFees({ storeId: storeId }),
      FetchSbStoreFees({ storeId: storeId }),
      FetchSbCouponRebates({ storeId: storeId }),
    ])
      .then((values) => {
        if (values[0].status === 'fulfilled') {
          handleFixedFees(values[0].value);
        }
        if (values[1].status === 'fulfilled') {
          handleFees(values[1].value);
        }
        if (values[2].status === 'fulfilled') {
          handleRebates(values[2].value);
        }
      })
      .catch(() => {})
      .finally(() => {});
  };

  useEffect(() => {
    callFeeAPIs();
  }, []);

  return (
    <section
      aria-labelledby='summary-heading'
      className='w-full lg:w-3/12 md:w-4/12 pl-[10px] pr-[10px]'
    >
      <div className='bg-white sticky top-0 pb-[30px]'>
        <div className='border border-gray-border'>
          <div className='bg-light-gray w-full text-sub-text font-medium px-[15px] py-[15px]'>
            Order Summary
          </div>
          <div className='px-[15px] py-[0px]'>
            <dl className=''>
              <div className='flex items-center justify-between pt-[20px]'>
                <dt className='text-default-text'>Subtotal</dt>
                <dd className='text-default-text font-medium'>
                  <Price value={cost.subTotal} />
                </dd>
              </div>
              <div
                className={`flex items-center justify-between border-t border-t-gray-border mt-[10px] pt-[10px]`}
              >
                <dt className='text-default-text'>Shipping & Handling</dt>
                <dd className='text-default-text font-medium'>
                  <Price value={cost.shippingNhandling} />
                </dd>
              </div>
              {fees.multipleFees.map((fee) => {
                let feeToShow = fee.amount;
                if (fee.type === 'percentage') {
                  feeToShow = (cost.subTotal * fee.amount) / 100;
                }

                return (
                  <div
                    className={`flex items-center justify-between pt-[10px] `}
                  >
                    <dt className='text-default-text'>{fee.name}</dt>
                    <dd className='text-default-text font-medium'>
                      <Price value={feeToShow} />
                    </dd>
                  </div>
                );
              })}

              {fees.rebates.map((rebate) => {
                let rebateToShow = rebate.amount;
                if (rebate.type === 'percentage') {
                  rebateToShow = (cost.subTotal * rebate.amount) / 100;
                }

                if (rebate.couponCode.length > 0) {
                  return null;
                }

                return (
                  <div
                    className={`flex items-center justify-between pt-[10px] `}
                  >
                    <dt className='text-default-text'>{rebate.name}</dt>
                    <dd className='text-default-text font-medium'>
                      - <Price value={rebateToShow} />
                    </dd>
                  </div>
                );
              })}

              {currentPage === 'CHECKOUT' && (
                <div
                  className={`flex items-center justify-between border-t border-t-gray-border pt-[10px] mt-[10px] ${addBottomPadding}`}
                >
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
              <div className='border-t border-b border-gray-200 flex items-center pt-[5px] pb-[5px] mt-[10px] mb-[10px]'>
                <dt className='text-base z-0 w-full promocode relative'>
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
                    className='peer placeholder:opacity-0 block w-full bg-transparent pt-1 pb-1 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200 pr-10 relative z-10'
                  />
                  <label
                    htmlFor='Promo_code'
                    className='absolute duration-300 -top-3 -z-1 origin-0 text-sm bg-[#ffffff] peer-focus:-top-3 peer-placeholder-shown:top-2 pr-3'
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
                    <div className='text-base font-medium absolute right-0 top-1'>
                      {successMessage ? '' : '+'}
                    </div>
                  )}
                </dt>
              </div>
              {cost.fixedFee > 0 && (
                <div className={`flex items-center justify-between`}>
                  <dt className='text-default-text'>Fixed Fees</dt>
                  <dd className='text-default-text font-medium'>
                    <Price value={cost.fixedFee} />
                  </dd>
                </div>
              )}
              {cost.cardProcessingFee > 0 && (
                <div className={`flex items-center justify-between pb-[15px]`}>
                  <dt className='text-default-text'>Convenience Fee</dt>
                  <dd className='text-default-text font-medium'>
                    <Price value={cost.cardProcessingFee} />
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
          <CO6_PlaceOrderBtn shippingAddress={shippingAddress} cost={cost} />
        )}
      </div>
    </section>
  );
};

export default CO6_OrderSummary;
