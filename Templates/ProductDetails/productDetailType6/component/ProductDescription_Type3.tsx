import { _ProductDetails } from '@definations/APIs/productDetail.res';
import React from 'react';

interface _props {
  product: _ProductDetails | null;
}

const ProductDescription_Type3: React.FC<_props> = ({ product }) => {
  return (
    <div className='bg-white pt-[40px] px-[20px]'>
      <div className='bg-secondary py-[10px] px-[15px] text-white inline-block rounded-t-md'>
        DESCRIPTION
      </div>
      <div
        className='text-sm tracking-widest p-[20px] border border-gray-border'
        dangerouslySetInnerHTML={{ __html: product?.description || '' }}
      ></div>
    </div>
  );
};

export default ProductDescription_Type3;
