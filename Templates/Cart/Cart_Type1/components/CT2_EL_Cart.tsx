import React, { useEffect, useState } from 'react';

import { paths } from '@constants/paths.constant';
import { _CartItem } from '@services/cart';
import Link from 'next/link';

import AddOTFItemNo from '@appComponents/modals/addOtfItem';
import { __pagesText } from '@constants/pages.text';
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
import CT1_EL_Item from './CT1_EL_Item';

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
    <section id='' className='mt-[20px]'>
      <div className='bg-white'>
        <div className='container mx-auto'>
          <div className='flex flex-wrap -mx-3 -mt-3 cart-box'>
            <section
              aria-labelledby='cart-heading'
              className='w-full lg:w-8/12 md:w-7/12 pl-[15px] pr-[15px] mt-[15px]'
            >
              <h2 id='cart-heading' className='sr-only'>
                Items in your shopping cart
              </h2>
              <div className='bg-light-gray w-full mb-[30px]'>
                <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                  <div className='pt-[10px]'>
                    <div className='pb-[10px] text-title-text'>
                      {__pagesText.CheckoutPage.OrderReview}
                    </div>
                  </div>
                  <div className='border-t border-[#ececec] mt-[15px]'>
                    <div className='bg-[#ffffff] pl-[15px] pr-[15px] pt-[15px] pb-[15px] mt-[15px]'>
                      <ul className='overflow-hidden border border-gray-border p-[15px] md:p-[30px]'>
                        {cartItems &&
                          cartItems.map((item: _CartItem, index: number) => (
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
                  </div>
                </div>
              </div>
              <div className='mt-[16px] mb-[16px]'>
                <Link href={paths.HOME}>
                  <a className='btn btn-lg btn-secondary'>KEEP SHOPPING</a>
                </Link>
              </div>
            </section>
            <section
              aria-labelledby='summary-heading'
              className='w-full lg:w-4/12 md:w-5/12 pl-[15px] pr-[15px] mt-[15px]'
            >
              <CartSummarryType2 selectedShippingModel={selectedShipping} />
            </section>
          </div>
        </div>
      </div>
      {showOTF === 'OTF' && (
        <AddOTFItemNo closeModal={() => setShowOTF(null)} />
      )}
    </section>
  );
};

export default CT2_EL_Cart;
