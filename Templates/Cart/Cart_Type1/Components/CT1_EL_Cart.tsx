import React, { useEffect, useState } from 'react';

import AddOTFItemNo from '@appComponents/modals/addOtfItem';
import { paths } from '@constants/paths.constant';
import { _CartItem } from '@services/cart';
import Link from 'next/link';

import CheckoutController from '@controllers/checkoutController';
import { GetCartTotals, useTypedSelector_v2 } from '@hooks_v2/index';
import {
  PersonalizationColor,
  PersonalizationFont,
  PersonalizationLocation,
} from '@services/cart';
import {
  getPersonalizationColor,
  getPersonalizationFont,
  getPersonalizationLocation,
} from '@services/cart.service';
import CartSummary from '@templates/cartSummarry';
import CT1_EL_Item from './CT1_EL_Item';

interface _Props {
  cartItems: _CartItem[];
}

const CT1_EmployeeLoginCart: React.FC<_Props> = ({ cartItems }) => {
  const [showOTF, setShowOTF] = useState<'OTF' | null>(null);
  const { totalPrice } = GetCartTotals();
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const { fetchShipping, shippingAdress, selectedShipping, shippingMethod } =
    CheckoutController();

  const [availableFont, setAvailableFont] = useState<
    PersonalizationFont[] | []
  >([]);
  const [availableLocation, setAvailableLocation] = useState<
    PersonalizationLocation[] | []
  >([]);
  const [availableColor, setAvailableColor] = useState<
    PersonalizationColor[] | []
  >([]);

  // All useEffects
  useEffect(() => {
    if (storeId) {
      getPersonalizationFont(storeId).then((res) => {
        setAvailableFont(res);
      });
      getPersonalizationColor(storeId).then((res) => {
        setAvailableColor(res);
      });
      getPersonalizationLocation(storeId).then((res) => {
        setAvailableLocation(res);
      });
    }
  }, [storeId]);

  useEffect(() => {
    if (totalPrice) {
      fetchShipping(totalPrice);
    }
  }, [totalPrice, shippingAdress]);
  return (
    <>
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
                    <div className='text-2xl mr-3'>
                      <button
                        onClick={() => setShowOTF('OTF')}
                        className='btn btn-lg btn-secondary !flex items-center justify-center w-full !p-1 text-sm border-2 border-black'
                      >
                        Add OTF Items
                      </button>
                    </div>
                    <div className='text-default-text'>
                      {cartItems ? cartItems.length : 0} Item(s)
                      <span> in cart</span>
                    </div>
                  </div>
                  <ul role='list' className='overflow-hidden'>
                    {cartItems.map((item, index) => (
                      <CT1_EL_Item
                        availableFont={availableFont}
                        availableLocation={availableLocation}
                        availableColor={availableColor}
                        key={index}
                        {...item}
                      />
                    ))}
                  </ul>
                </div>
                <div
                  aria-labelledby='summary-heading'
                  className='w-full sticky overflow-auto lg:w-4/12 pl-[12px] pr-[12px] mt-3'
                >
                  <CartSummary selectedShippingModel={selectedShipping} />
                  <div className='mt-4'>
                    <Link href={paths.CHECKOUT}>
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
                      Cancel your order without penalty anytime before your
                      proof is approved.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {showOTF === 'OTF' && (
        <AddOTFItemNo closeModal={() => setShowOTF(null)} />
      )}
    </>
  );
};

export default CT1_EmployeeLoginCart;
