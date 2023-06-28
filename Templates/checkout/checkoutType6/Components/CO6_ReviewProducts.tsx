import { paths } from '@constants/paths.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import CO6_Product from '@templates/checkout/checkoutType6/Components/CO6_Product';
import { useRouter } from 'next/router';
import React from 'react';

interface _Props {}

const CO6_ReviewProducts: React.FC<_Props> = () => {
  const router = useRouter();
  const enableHomePage = useTypedSelector_v2(
    (state) => state.sbStore.store.isDisplayHome,
  );
  const cartItems = useTypedSelector_v2((state) => state.cart.cart);

  if (!cartItems) return null;

  return (
    <div className='bg-light-gray w-full mb-[30px]' id='OrderReview'>
      <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
        <div className='pt-[10px]'>
          <div className='pb-[10px] text-title-text'>Order Review</div>
        </div>
        <div
          className='border-t border-gray-border mt-[15px]'
          id='OrderReviewInner'
        >
          <div className='bg-[#ffffff] pt-[15px] mt-[15px]'>
            <ul role='list' className='overflow-hidden'>
              {cartItems.map((item, index) => {
                return <CO6_Product key={index} item={item} />;
              })}
            </ul>
            <div className='p-[15px]'>
              <button
                onClick={() => {
                  if (enableHomePage) {
                    router.push(paths.HOME);
                    return;
                  }
                  router.push(paths.SB_PRODUCT_LISTING);
                }}
              >
                <a className='btn btn-quaternary'>Continue Shopping </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CO6_ReviewProducts;
