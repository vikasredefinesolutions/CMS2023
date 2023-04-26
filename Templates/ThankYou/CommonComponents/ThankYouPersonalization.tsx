import { _MyAcc_OrderProductDetails } from '@definations/APIs/user.res';
import React from 'react';

interface _props {
  product: _MyAcc_OrderProductDetails | null;
}

const ThankYouPersonalization: React.FC<_props> = ({ product }) => {
  return (
    <>
      <div className='mb-[15px] mt-[15px] border-b border-gray-border'></div>
      <div className='flex justify-between pt-[8px]'>
        <div className='font-[600] w-4/12'>Size</div>
        <div className='font-[600] w-4/12 text-center'>Line 1</div>
        <div className='font-[600] w-4/12 text-right'>Line 2</div>
      </div>
    </>
  );
};

export default ThankYouPersonalization;
