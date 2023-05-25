import { SpinnerComponent } from '@appComponents/ui/spinner';
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
  showLoaderOrEmptyText,
  templateId,
}) => {
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const cartData = useTypedSelector_v2((state) => state.cart.cart);
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
                  isRemovable={true}
                  isEditable={true}
                  availableFont={availableFont}
                  availableLocation={availableLocation}
                  availableColor={availableColor}
                  templateId={templateId}
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
