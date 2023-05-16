import { paths } from '@constants/paths.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';
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
import CartSummarry from '@templates/cartSummarry';
import CartItem from 'Templates/cartItem';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { _CartProps } from '../Cart';
import EmptyCart from '../components/emptyCart';

const CartType2: React.FC<_CartProps> = ({
  cartData,
  removeCartItem,
  empCustomQtyPrice,
  employeeAmtChangeHandler,
  amtQtyBlurHandler,
  loadProduct,
  setShowAddOtf,
  cartType,
}) => {
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const [availableFont, setAvailableFont] = useState<
    PersonalizationFont[] | []
  >([]);
  const [availableLocation, setAvailableLocation] = useState<
    PersonalizationLocation[] | []
  >([]);
  const [availableColor, setAvailableColor] = useState<
    PersonalizationColor[] | []
  >([]);
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

  if (!cartData || cartData.length === 0) {
    return <EmptyCart />;
  }

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
                  setAvailableColor,
                  availableFont,
                  availableLocation,
                  availableColor,
                  cartType,
                }}
              />
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
              <CartSummarry />
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartType2;
