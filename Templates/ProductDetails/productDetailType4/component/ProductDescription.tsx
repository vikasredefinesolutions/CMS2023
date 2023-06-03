import { _Store } from '@configs/page.config';
import { _ProductDetails } from '@definations/APIs/productDetail.res';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React from 'react';

interface _props {
  product: _ProductDetails | null;
}

const ProductDescription: React.FC<_props> = ({ product }) => {
  const { code: storeCode } = useTypedSelector_v2((state) => state.store);
  return (
    <div className='mt-[30px]'>
      <div className='text-center text-2xl-text pb-[20px] description-title'>
        {storeCode == _Store.type4 ? 'DESCRIPTION' : 'INFORMATION'}
      </div>
      <div
        className='text-default-text description-details'
        dangerouslySetInnerHTML={{ __html: product?.description || '' }}
      ></div>
    </div>
  );
};

export default ProductDescription;
