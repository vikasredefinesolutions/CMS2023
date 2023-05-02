import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import CartSummarry from '@templates/cartSummarry';
import CartItem from 'Templates/cartItem';
import Link from 'next/link';
import React from 'react';
import { _CartProps } from '../Cart';
import EmptyCart from '../components/emptyCart';
const CartType3: React.FC<_CartProps> = ({
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
  if (!cartData || cartData.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section id='' className=''>
      <div className='"container mx-auto'>
        <div className='bg-white p-[10px]'>
          <form className='flex flex-wrap -mx-[10px] -mt-[10px] cart-box'>
            <section
              aria-labelledby='cart-heading'
              className='w-full lg:w-9/12 px-[10px] mt-[15px]'
            >
              <div className='flex justify-between items-center bg-light-gray w-full px-[15px] py-[10px]'>
                <div className='text-2xl mr-[10px]'>
                  {__pagesText.cart.shoppingCart}
                </div>
                <div className='text-default-text'>
                  {cartData ? cartData.length : 0} Item(s)
                  <span> in cart</span>
                </div>
              </div>
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
                  cartType,
                }}
              />
              <div className='my-[10px]'>
                <a href={`${paths.HOME}`} className='btn btn-primary'>
                  {__pagesText.cart.continueShopping}
                </a>
              </div>
            </section>
            <section
              aria-labelledby='summary-heading'
              className='w-full lg:w-3/12 px-[10px] mt-[15px]'
            >
              <CartSummarry
                couponInputChangeHandler={couponInputChangeHandler}
                couponSubmitHandler={couponSubmitHandler}
                showApplyButton={showApplyButton}
                coupon={coupon}
              />
              {/* {isSamllogin ? (
                <div className='mt-[15px]'>
                  <Link className='' href={paths.CHECKOUT}>
                    <a className='btn btn-lg btn-secondary !flex items-center justify-center w-full'>
                    
                      LOGIN VIA SAML
                    </a>
                  </Link>
                </div>
              ) : ( */}
              <Link className='' href={paths.CHECKOUT}>
                <a className='btn btn-lg btn-secondary !flex items-center justify-center w-full'>
                  {/* <i
                      className='fa fa-shopping-cart mr-[10px]'
                      aria-hidden='true'
                    ></i> */}
                  {__pagesText.cart.checkOutNow}
                </a>
              </Link>
              {/* )} */}
            </section>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CartType3;
