import { _ProductDetails } from '@definations/startOrderModal';
import React from 'react';

interface _props {
  product: _ProductDetails | null;
}

const ProductDescription: React.FC<_props> = ({ product }) => {
  console.log('product function is ', product);

  return (
    <div className='mt-[30px]'>
      <div className='text-center text-2xl-text pb-[20px]'>INFORMATION</div>
      <div
        className='text-default-text'
        dangerouslySetInnerHTML={{ __html: product?.description || '' }}
      ></div>
    </div>
  );
};

export default ProductDescription;
