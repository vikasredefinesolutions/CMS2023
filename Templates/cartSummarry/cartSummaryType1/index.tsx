import Price from '@appComponents/reUsable/Price';
import { __pagesText } from '@constants/pages.text';
import SummarryController from '@controllers/summarryController';
import { GetCartTotals, useTypedSelector_v2 } from 'hooks_v2';
import { FC } from 'react';

const CartSummarryType1: FC = () => {
  const couponDetails = useTypedSelector_v2((state) => state.cart.discount);

  // Functions
  const {
    coupon,
    successMessage,
    setCoupon,
    applyCouponHandler,
    removeCouponCodeHandler,
  } = SummarryController();
  const { totalPrice, subTotal, logoSetupCharges, smallRunFee, salesTax } =
    GetCartTotals();

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
      <div className='bg-light-gray w-full text-sub-text font-medium pl-[16px] pr-[16px] pt-[8px] pb-[8px]'>
        {__pagesText.CheckoutPage.orderSummary.OrderSummary}
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
          )}

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

          <div className='border-t border-gray-200 flex items-center pt-[10px] pb-[20px]'>
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

          <div className='border-t border-gray-200 flex items-center justify-between pt-[10px] pb-[10px]'>
            <dt className='text-normal-text flex items-center'>
              <span>Shipping</span>
            </dt>
            <dd className='text-normal-text'>FREE</dd>
          </div>
          <div className='border-t border-gray-200 flex items-center justify-between pt-[10px]'>
            <dt className='text-normal-text flex items-center'>
              <span>{__pagesText.CheckoutPage.orderSummary.tax}</span>
            </dt>
            <dd className='text-normal-text'>
              <Price value={salesTax} />
            </dd>
          </div>
        </dl>
      </div>
      <div className='flex justify-between items-center bg-light-gray w-full text-sub-text font-[600] pl-[16px] pr-[16px] pt-[8px] pb-[8px]'>
        <div>Total:</div>
        <div>
          <Price value={totalPrice} />
        </div>
      </div>
    </div>
  );
};

export default CartSummarryType1;
