import { useTypedSelector_v2 } from '@hooks_v2/index';

import React from 'react';
import CO7R_Product from './CO7R_Product';

interface _Props {}

const CO7R_ReviewProducts: React.FC<_Props> = () => {
  const cartItems = useTypedSelector_v2((state) => state.cart.cart);

  if (!cartItems) return null;

  return (
    <div className='bg-light-gray w-full mb-[30px] mt-[10px]'>
      <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px] w-full'>
        <div className='flex flex-wrap items-center justify-between'>
          <div className='pt-[10px] pb-[10px] text-title-text'>
            Order Review
          </div>
        </div>
        <div className='bg-[#fff]'>
          <ul className='overflow-hidden '>
            {cartItems.map((item, index) => {
              return <CO7R_Product key={index} item={item} />;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CO7R_ReviewProducts;
