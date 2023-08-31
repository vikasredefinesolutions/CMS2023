import {
  BACARDI,
  BOSTONBEAR,
  THD_STORE_CODE,
} from '@constants/global.constant';
import { _ProductDetails } from '@definations/APIs/productDetail.res';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React from 'react';

interface _props {
  product: _ProductDetails | null;
}

const ProductDescription_Type3: React.FC<_props> = ({ product }) => {
  const { code: store_Code } = useTypedSelector_v2((state) => state.store);
  return (
    <div
      className={`${
        store_Code === BOSTONBEAR ? 'tab-content' : ''
      } bg-white pt-[40px] px-[10px] pb-[20px]`}
    >
      <div
        className={`${
          store_Code === THD_STORE_CODE
            ? 'py-[10px] px-[15px] !text-[#555] text-medium-text inline-block border border-gray-border border-b-0 bg-white mb-[-1px] bg-primary !text-white rounded-t-[5px] uppercase'
            : store_Code === BACARDI
            ? 'py-[10px] px-[15px] !text-[#555] text-default-text inline-block rounded-t-md border border-gray-border border-b-0 bg-white mb-[-1px]'
            : 'bg-secondary py-[10px] px-[15px] text-white inline-block rounded-t-md text-xl font-semibold'
        }`}
      >
        Description
      </div>
      <div
        className={`text-sm tracking-widest p-[20px] ${
          store_Code == BACARDI ? 'border-t' : 'border'
        } border-gray-border`}
        dangerouslySetInnerHTML={{ __html: product?.description || '' }}
      ></div>
    </div>
  );
};

export default ProductDescription_Type3;
