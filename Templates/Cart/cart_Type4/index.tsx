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
import CartItem from '@templates/cartItem';
import CartSummary from '@templates/cartSummarry';
import React, { useEffect, useState } from 'react';
import { _CartProps } from '../Cart';
import EmptyCart from '../components/emptyCart';

const CartType4: React.FC<_CartProps> = ({
  cartData,
  removeCartItem,
  loadProduct,
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
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );
  if (!cartData || cartData.length === 0) {
    return <EmptyCart />;
  }

  return (
    <>
      <section id='' className=''>
        <div className='"container mx-auto'>
          <div className='bg-white p-[10px]'>
            <form className='flex flex-wrap -mx-[10px] -mt-[10px] cart-box'>
              <section
                aria-labelledby='cart-heading'
                className='w-full lg:w-9/12 px-[10px] mt-[15px]'
              >
                <CartItem
                  {...{
                    isRemovable: true,
                    cartData,
                    isEditable: true,
                    removeCartItem,
                    loadProduct,
                    cartType,
                  }}
                />
              </section>
              <section
                aria-labelledby='summary-heading'
                className='w-full lg:w-3/12 px-[10px] mt-[15px]'
              >
                <CartSummary />
              </section>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartType4;
