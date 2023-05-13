import Price from '@appComponents/reUsable/Price';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import CheckoutController from '@controllers/checkoutController';
import { GetCartTotals, useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
import { FC } from 'react';
import { CartSummarryProps } from '../CartSumarry';

const CartSummarryType4: FC<CartSummarryProps> = ({
  couponInputChangeHandler,
  couponSubmitHandler,
  showApplyButton,
  coupon,
}) => {
  const { totalPrice, subTotal, logoSetupCharges, smallRunFee, salesTax } =
    GetCartTotals();
  const { shippingMethod } = CheckoutController();
  const couponDetails = useTypedSelector_v2((state) => state.cart.discount);
  const storeId = useTypedSelector_v2((state) => state.store.id);
  // console.log('store id from cart summary ', storeId);

  return (
    <div className='border border-gray-border bg-white'>
      <div className='bg-light-gray w-full text-sub-text font-medium px-[15px] py-[15px]'>
        Order Summary
      </div>
      <div className='px-[15px] py-[15px]'>
        <dl className=''>
          {/* <div className='font-[600] text-medium-text'>Products Price</div> */}
          <div className='flex items-center justify-between pt-[10px]'>
            <dt className='text-normal-text'>Subtotal:</dt>
            <dd className='text-normal-text font-medium'>
              <Price value={subTotal} />
            </dd>
          </div>

          {storeId !== 11 ? (
            couponDetails?.coupon ? (
              <div className='flex items-center justify-between pt-2'>
                <dt className='text-base'>
                  Promo Code - ({couponDetails.coupon})
                </dt>
                <dd className='text-base font-medium text-gray-900'>
                  - <Price value={couponDetails.amount || 0} />
                </dd>
              </div>
            ) : (
              <div className='border-t border-gray-200 flex items-center pt-[10px] pb-[20px]'>
                <dt className='text-base z-0 w-full promocode relative'>
                  <input
                    name='Promo_code'
                    id='Promo_code'
                    placeholder='Promo code'
                    type='text'
                    value={coupon}
                    onChange={(e) => couponInputChangeHandler(e.target.value)}
                    className='peer placeholder:opacity-0 block w-full bg-transparent pt-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200 pr-10 relative z-10'
                  />
                  <label
                    htmlFor='Promo_code'
                    className='absolute duration-300 -top-3 -z-1 origin-0 text-base bg-[#ffffff] peer-focus:-top-3 peer-placeholder-shown:top-2'
                  >
                    PROMO CODE
                  </label>{' '}
                  {showApplyButton ? (
                    <button
                      onClick={couponSubmitHandler}
                      className='coupon-code-Apply text-sm absolute right-0 top-2 curosr-pointer z-40'
                    >
                      Apply
                    </button>
                  ) : (
                    <div className='text-base font-medium absolute right-0 top-2'>
                      +
                    </div>
                  )}
                </dt>
              </div>
            )
          ) : (
            ''
          )}

          {storeId !== 11 && (
            <div className='border-t border-gray-200 flex items-center justify-between pt-[10px] pb-[10px]'>
              <dt className='text-normal-text flex items-center'>
                <span>Shipping</span>
              </dt>
              <dd className='text-normal-text'>
                <Price value={shippingMethod[0].price && 0} />
              </dd>
            </div>
          )}

          {storeId !== 11 && (
            <div className='border-t border-gray-200 flex items-center justify-between pt-[10px]'>
              <dt className='text-normal-text flex items-center'>
                <span>Estimated Tax:</span>
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
          <Price value={totalPrice} />
        </div>
      </div>

      <div className='p-2'>
        <Link className='' href={paths.CHECKOUT}>
          <a className='btn btn-lg btn-secondary !flex items-center justify-center w-full'>
            {__pagesText.cart.checkOutNow}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CartSummarryType4;
