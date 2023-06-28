import NxtImage from '@appComponents/reUsable/Image';
import Price from '@appComponents/reUsable/Price';
import { CYXTERA_CODE, UCA, UNITI_CODE } from '@constants/global.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';

import { _ProductsRecentlyViewedResponse } from '@templates/ProductDetails/productDetailsTypes/productDetail.res';
import Link from 'next/link';
import React, { useState } from 'react';
interface props {
  product: _ProductsRecentlyViewedResponse;
}
const ProductCardType3: React.FC<props> = ({ product }) => {
  const [productimg, setProductImg] = useState(product.image);
  const { id: storeId, mediaBaseUrl } = useTypedSelector_v2(
    (state) => state.store,
  );
  const [currentProductId, setcurrentProductId] = useState(
    product.getProductImageOptionList[0].id,
  );
  const store = useTypedSelector_v2((state) => state.store);
  return (
    <>
      <div key={product.id} className='swiper-slide group'>
        <div
          className={`flex flex-col border border-transparent group-hover:border-gray-border p-[5px]`}
        >
          {/* <div className='flex text-center lg:w-auto mb-6'> */}
          {/* <div className='relative pb-4 w-full'> */}
          <div className='flex-shrink-0 overflow-hidden cursor-pointer '>
            <Link
              key={product.id}
              href={`${encodeURIComponent(
                product.seName,
              )}.html?v=product-detail&altview=1`}
            >
              <div className='relative'>
                <NxtImage
                  title={product.name}
                  src={productimg ? productimg : product.image}
                  alt={product.name}
                  className='h-auto w-screen object-cover'
                />
              </div>
            </Link>
          </div>
          <div className='w-full pt-[25px] h-full text-center z-10'>
            <Link
              key={product.id}
              href={`${encodeURIComponent(
                product.seName,
              )}.html?v=product-detail&altview=1`}
            >
              <div className='mb-[10px] mt-[10px] text-medium-text  h-[46px]'>
                <span className='relative text-tertiary hover:tertiary-hover'>
                  {product.name}
                </span>
              </div>
            </Link>

            <div className={'mb-[12px] text-sub-text'}>
              <span className={' text-primary'}>
                MSRP
                <Price value={product.msrp} />
              </span>
            </div>
            <ul className='flex items-center my-[10px] justify-center space-x-1'>
              {product.getProductImageOptionList.map((res: any) => {
                return (
                  <li
                    className={`w-[30px] h-[30px] p-[1px] border-2  hover:border-secondary cursor-pointer ${
                      currentProductId == res.id ? 'border-secondary' : ''
                    } `}
                    onClick={() => {
                      setcurrentProductId(res.id);
                      setProductImg(`${mediaBaseUrl}${res.imageName}`);
                    }}
                  >
                    <img
                      src={`${mediaBaseUrl}${res.imageName}`}
                      alt={res.colorName}
                      title={res.colorName}
                      className='w-full object-center object-cover cursor-pointer max-h-full'
                    />
                  </li>
                );
              })}
            </ul>

            <div className='gird-item-hover mt-[15px] mb-[15px]'>
              {' '}
              <div className='flex justify-center mx-auto'>
                <a
                  className='btn btn-secondary'
                  href={`${encodeURIComponent(
                    product.seName,
                  )}.html?v=product-detail&altview=1`}
                  title=''
                >
                  {store.code === CYXTERA_CODE ||
                  store.code === UCA ||
                  store.code ||
                  UNITI_CODE ? (
                    <i className='fa-solid fa-basket-shopping'></i>
                  ) : (
                    <span className='material-icons text-sm'>local_mall</span>
                  )}
                  <span className='ml-[5px]'>ADD TO CART</span>
                </a>
              </div>
            </div>
          </div>
          {/* </div> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default ProductCardType3;
