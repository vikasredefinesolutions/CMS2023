import React, { useEffect, useState } from 'react';

import { _CartItem } from '@services/cart';

import AddOTFItemNo from '@appComponents/modals/addOtfItem';
import { paths } from '@constants/paths.constant';
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
import CartSummarryType2 from '@templates/cartSummarry/cartSummaryType2';
import Link from 'next/link';
import CT2_EL_CartItem from './CT2_EL_CartItem';

interface _Props {
  cartItems: _CartItem[];
}

const CT2_EL_Cart: React.FC<_Props> = ({ cartItems }) => {
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
    <div className='flex-grow-0'>
      <section id='' className='mt-[10px]'>
        <div className='bg-[#ffffff]'>
          <div className='container mx-auto'>
            <div className='flex flex-wrap mt-[-12px] relative mx-[-15px]'>
              <div
                aria-labelledby='cart-heading'
                className='w-full lg:w-8/12 pl-[15px] pr-[15px] mt-[12px]'
              >
                <div className='flex justify-center items-center w-full pl-[16px] pr-[16px] pt-[16px] pb-[16px] mb-[20px] '>
                  <div className='text-2xl mr-3'>
                    <button
                      onClick={() => setShowOTF('OTF')}
                      className='btn btn-lg btn-primary !flex items-center justify-center w-full !p-1 text-sm border-2 border-black'
                    >
                      Add OTF Items
                    </button>
                  </div>
                </div>
                <div className='border border-gray-200'>
                  <ul role='list' className='overflow-hidden'>
                    {cartItems.map((item, index) => (
                      <CT2_EL_CartItem
                        availableFont={availableFont}
                        availableLocation={availableLocation}
                        availableColor={availableColor}
                        key={index}
                        {...item}
                      />
                    ))}
                  </ul>
                </div>
                <div className='mt-[16px] mb-[16px]'>
                  <Link href={paths.HOME}>
                    <a className='btn btn-lg btn-primary cursor-pointer'>
                      CONTINUE SHOPPING
                    </a>
                  </Link>
                </div>
              </div>
              <div
                aria-labelledby='summary-heading'
                className='w-full sticky overflow-auto lg:w-4/12 pl-[12px] pr-[12px] mt-3'
              >
                <CartSummarryType2 selectedShippingModel={selectedShipping} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {showOTF === 'OTF' && (
        <AddOTFItemNo closeModal={() => setShowOTF(null)} />
      )}
    </div>
  );
};

export default CT2_EL_Cart;
