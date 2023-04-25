import CartSummarry from '@templates/cartSummarry';
import CartItem from 'Templates/cartItem';
import React from 'react';
import { _CartProps } from '../Cart';
import EmptyCart from './components/emptyCart';

const CartType2: React.FC<_CartProps> = ({
  cartData,
  removeCartItem,
  couponInputChangeHandler,
  couponSubmitHandler,
  showApplyButton,
  coupon,
  empCustomQtyPrice,
  employeeAmtChangeHandler,
  amtQtyBlurHandler,
  loadProduct,
  setShowAddOtf,
}) => {
  if (!cartData || cartData.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section id='' className='mt-[20px]'>
      <div className='bg-white'>
        <div className='container mx-auto'>
          <form className='flex flex-wrap -mx-3 -mt-3 cart-box'>
            <section
              aria-labelledby='cart-heading'
              className='w-full lg:w-8/12 md:w-7/12 pl-[15px] pr-[15px] mt-[15px]'
            >
              <h2 id='cart-heading' className='sr-only'>
                Items in your shopping cart
              </h2>
              <CartItem
                {...{
                  isRemovable: true,
                  cartData,
                  isEditable: true,
                  removeCartItem,
                  empCustomQtyPrice,
                  employeeAmtChangeHandler,
                  amtQtyBlurHandler,
                  loadProduct,
                }}
              />
              <div className='mt-[16px] mb-[16px]'>
                <button className='btn btn-lg btn-secondary'>
                  KEEP SHOPPING
                </button>
              </div>
            </section>
            <section
              aria-labelledby='summary-heading'
              className='w-full lg:w-4/12 md:w-5/12 pl-[15px] pr-[15px] mt-[15px]'
            >
              <CartSummarry
                couponInputChangeHandler={couponInputChangeHandler}
                couponSubmitHandler={couponSubmitHandler}
                showApplyButton={showApplyButton}
                coupon={coupon}
              />
            </section>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CartType2;
