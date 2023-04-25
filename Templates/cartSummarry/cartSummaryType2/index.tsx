import Price from '@appComponents/reUsable/Price';
import { GetCartTotals, useTypedSelector_v2 } from 'hooks_v2';
import { FC } from 'react';
import { CartSummarryProps } from '../CartSumarry';

const CartSummarryType2: FC<CartSummarryProps> = ({
  couponInputChangeHandler,
  couponSubmitHandler,
  showApplyButton,
  coupon,
}) => {
  const { totalPrice, subTotal, logoSetupCharges, smallRunFee, salesTax } =
    GetCartTotals();
  const couponDetails = useTypedSelector_v2((state) => state.cart.discount);
  return (
    <>
      <div className='border border-gray-border p-[15px]'>
        <div className='w-full text-sub-text pt-[8px] pb-[8px]'>
          Order Summary
        </div>
        <div className='w-full pl-[15px] pr-[15px] border-b border-gray-border mt-[10px] mb-[10px]'></div>
        <dl className='text-default-text'>
          <div className='flex items-center justify-between pt-[15px]'>
            <dt className=''>Merchandise</dt>
            <dd className=''>$870.00</dd>
          </div>
          <div className='flex items-center justify-between pt-[15px]'>
            <dt className=''>Discount</dt>
            <dd className=''>-$90.00</dd>
          </div>
          <div className='w-full pl-[15px] pr-[15px] border-b border-gray-border mt-[10px]'></div>
          <div className='flex items-center justify-between pt-[15px]'>
            <dt className=''>
              <span>Subtotal</span>
            </dt>
            <dd className=''>
              {' '}
              <Price value={subTotal} />
            </dd>
          </div>
          <div className='flex items-center justify-between pt-[15px]'>
            <dt className=''>
              <span>First Logo</span>
            </dt>
            <dd className=''>FREE</dd>
          </div>
          <div className='flex items-center justify-between pt-[15px]'>
            <dt className=''>
              <span>Second Logo</span>
            </dt>
            <dd className=''>$75.00</dd>
          </div>
          <div className='flex items-center justify-between pt-[15px]'>
            <dt className=''>
              <span>Small Run Fee</span>
            </dt>
            <dd className=''>
              {' '}
              <Price value={smallRunFee} />
            </dd>
          </div>
          <div className='w-full pl-[15px] pr-[15px] border-b border-gray-border mt-[10px]'></div>
          <div className='flex items-center justify-between pt-[15px] mb-[30px]'>
            <dt className='font-semibold'>
              <span>Estimated Total</span>
            </dt>
            <dd className='font-semibold'>
              {' '}
              <Price value={totalPrice} />
            </dd>
          </div>
        </dl>
        <div className=''>
          <div className='mt-[16px]'>
            <button
              onClick={() => {}}
              className='btn btn-lg btn-primary w-full !flex flex-wrap justify-center items-center'
            >
              <svg
                className='svg-inline--fa fa-cart-shopping mr-[8px] w-[20px]'
                aria-hidden='true'
                focusable='false'
                data-prefix='fas'
                data-icon='cart-shopping'
                role='img'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 576 512'
                data-fa-i2svg=''
              >
                <path
                  fill='currentColor'
                  d='M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z'
                ></path>
              </svg>
              CHECKOUT NOW
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSummarryType2;
