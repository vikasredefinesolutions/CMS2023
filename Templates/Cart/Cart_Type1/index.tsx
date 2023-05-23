import { SpinnerComponent } from '@appComponents/ui/spinner';
import { paths } from '@constants/paths.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import CartSummarry from '@templates/cartSummarry';
import CartItem from 'Templates/cartItem';
import Link from 'next/link';
import React from 'react';
import { _CartProps } from '../Cart';
import EmptyCart from '../components/emptyCart';
import CT1_EmployeeLoginCart from './Components/CT1_EL_Cart';

const CartType1: React.FC<_CartProps> = ({
  cartData,
  removeCartItem,
  empCustomQtyPrice,
  employeeAmtChangeHandler,
  amtQtyBlurHandler,
  loadProduct,
  setShowAddOtf,
  cartType,
  showLoaderOrEmptyText,
}) => {
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );

  if (showLoaderOrEmptyText === 'loader') {
    return (
      <div className=''>
        <section className='container mx-auto text-center'>
          <div className='py-[12%]'>
            <div className='text-2xl-text'>
              <SpinnerComponent />
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (showLoaderOrEmptyText === 'emptyCart' || !cartData) {
    return <EmptyCart />;
  }

  if (isEmployeeLoggedIn) {
    return <CT1_EmployeeLoginCart cartItems={cartData} />;
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
                className='w-full lg:w-4/12 pl-[12px] pr-[12px] mt-3'
              >
                <div className='sticky top-32'>
                  <CartSummarry />
                  <div className='mt-4'>
                    <Link className='' href={paths.CHECKOUT}>
                      <a className='btn btn-lg btn-secondary !flex items-center justify-center w-full'>
                        <span className='material-icons text-lg mr-[2px]'>
                          shopping_cart
                        </span>
                        CHECKOUT NOW
                      </a>
                    </Link>
                  </div>
                  <div className='mt-[20px] bg-light-gray px-4 py-4'>
                    <div className='flex items-center justify-center mb-[15px]'>
                      <img
                        src='/order-risk-free-icon.jpg'
                        alt=''
                        className='mr-2 w-5 h-5'
                      />
                      <span className='text-title-text font-semibold'>
                        Order Risk-Free!
                      </span>
                    </div>
                    <div className='flex items-center justify-center text-medium-text font-[600] leading-normal text-center mb-[10px]'>
                      Cancel your order without penalty anytime before your
                      proof is approved.
                    </div>
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
