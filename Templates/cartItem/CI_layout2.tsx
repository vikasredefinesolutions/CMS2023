import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { _CartItem } from '@services/cart';
import { FC } from 'react';
import { _CartProps } from './cartItem';
import CL2_Item from './cartItemLayout2.tsx/components/Cl2_Item';
// import { CI_Props } from './cartItem';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CIlayout2: FC<_CartProps> = (props) => {
  const cartData = useTypedSelector_v2((state) => state.cart.cart);

  return (
    <>
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
                {cartData &&
                  cartData.map((item: _CartItem, cartItemIndex: number) => (
                    <CL2_Item
                      {...item}
                      {...props}
                      cartItemIndex={cartItemIndex}
                    />
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CIlayout2;
