import { paths } from '@constants/paths.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import CartSummarry from '@templates/cartSummarry';
import CartItem from 'Templates/cartItem';
import Link from 'next/link';
import React from 'react';
import { _CartProps } from '../Cart';
import EmptyCart from '../components/emptyCart';

const CartType1: React.FC<_CartProps> = ({
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
  cartType,
}) => {
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );

  if (!cartData || cartData.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className='flex-grow-0'>
      <section id='' className='mt-[10px]'>
        <div className='bg-[#ffffff]'>
          <div className='container mx-auto'>
            <div className='flex flex-wrap mt-[-12px] relative mx-[-15px]'>
              <div
                aria-labelledby='cart-heading'
                className='w-full lg:w-8/12 pl-[15px] pr-[15px] mt-[12px]'
              >
                <div className='flex justify-between items-center w-full pl-[16px] pr-[16px] pt-[16px] pb-[16px] mb-[20px] bg-light-gray'>
                  <div className='text-title-text mr-[12px] font-bold'>
                    Shopping Cart
                  </div>
                  {isEmployeeLoggedIn && (
                    <div className='text-2xl mr-3'>
                      <button
                        onClick={() => setShowAddOtf(true)}
                        className='btn btn-lg btn-secondary !flex items-center justify-center w-full !p-1 text-sm border-2 border-black'
                      >
                        Add OTF Items
                      </button>
                    </div>
                  )}
                  <div className='text-default-text'>
                    {cartData ? cartData.length : 0} Item(s)
                    <span> in cart</span>
                  </div>
                </div>
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
                    cartType,
                  }}
                />
              </div>
              <div
                aria-labelledby='summary-heading'
                className='w-full sticky overflow-auto lg:w-4/12 pl-[12px] pr-[12px] mt-3'
              >
                <CartSummarry
                  couponInputChangeHandler={couponInputChangeHandler}
                  couponSubmitHandler={couponSubmitHandler}
                  showApplyButton={showApplyButton}
                  coupon={coupon}
                />
                <div className='mt-4'>
                  <Link className='' href={paths.CHECKOUT}>
                    <a className='btn btn-lg btn-secondary !flex items-center justify-center w-full'>
                      <span className='material-icons'>shopping_cart</span>
                      CHECKOUT NOW
                    </a>
                  </Link>
                </div>
                <div className='mt-4 bg-light-gray px-4 py-4'>
                  <div className='flex items-center justify-center'>
                    <img
                      src='/order-risk-free-icon.jpg'
                      alt=''
                      className='mr-2 w-5 h-5'
                    />
                    <span className='text-sub-text font-semibold'>
                      Order Risk-Free!
                    </span>
                  </div>
                  <div className='flex items-center justify-center text-sub-text text-center mt-3'>
                    Cancel your order without penalty anytime before your proof
                    is approved.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartType1;
