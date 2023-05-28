import { _ProductDetails } from '@definations/APIs/productDetail.res';
import React from 'react';

interface _props {
  product: _ProductDetails | null;
}

const ProductDescription: React.FC<_props> = ({ product }) => {
  return (
    <section>
      <div className='container mx-auto pt-[50px]'>
        <div>
          <div className='text-center font-semibold text-2xl-text pb-[20px]'>
            DESCRIPTION
            <span className='border-b border-black w-[50px] mx-auto h-[1px] block pt-[5px]'></span>
          </div>
          <div
            className='text-default-text pb-[20px] max-w-7xl mx-auto'
            dangerouslySetInnerHTML={{ __html: product?.description || '' }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default ProductDescription;
