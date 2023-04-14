import React from 'react';
import ProductInfo from './ProductInfo';
import { _ProductDetailsProps } from './productDetailsComponents';
import ProductImg from './ProductImg';

const ProductDetails: React.FC<_ProductDetailsProps> = ({
  product,
  storeCode,
}) => {
  return (
    <div className='container pl-[15px] pr-[15px] mx-auto mt-[15px]'>
      <div className='lg:grid lg:grid-cols-2 lg:items-start'>
        <ProductImg product={product} />
        <ProductInfo product={product} storeCode={storeCode} />
      </div>
    </div>
  );
};

export default ProductDetails;
