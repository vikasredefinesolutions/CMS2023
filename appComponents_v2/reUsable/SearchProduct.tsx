import NxtImage from '@appComponents/reUsable/Image';
import Price from '@appComponents/reUsable/Price';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { searchproduct } from '@services/product.service.type';

import Link from 'next/link';
import React, { useState } from 'react';
interface props {
  product: searchproduct;
}
const SearchProductCard: React.FC<props> = ({ product }) => {
  const [productimg, setProductImg] = useState(
    product.getAttributeImageLists[0].attributeImage,
  );
  const [currentProductId, setcurrentProductId] = useState(
    product.getAttributeImageLists[0].id,
  );
  const { id: storeId, mediaBaseUrl } = useTypedSelector_v2(
    (state) => state.store,
  );
  const store = useTypedSelector_v2((state) => state.store);
  return (
    <>
      <div
        key={product.id}
        className='relative border border-gray-200 p-[20px]'
      >
        {/* <div className='flex text-center lg:w-auto mb-6'> */}
        {/* <div className='relative pb-4 w-full'> */}
        <div className='w-full overflow-hidden '>
          <Link
            key={product.id}
            href={`/${encodeURIComponent(
              product.seName,
            )}.html?v=product-detail&altview=1`}
          >
            <a className='relative'>
              <NxtImage
                title={product.name}
                src={
                  productimg
                    ? productimg
                    : product.getAttributeImageLists[0].attributeImage
                }
                alt={product.name}
                className='m-auto max-h-full'
              />
            </a>
          </Link>
        </div>
        <div className='mt-[24px] pl-[8px] pr-[8px]'>
          <div className='mt-[14px] text-anchor hover:text-anchor-hover h-[44px] text-ellipsis overflow-hidden line-clamp-2 text-medium-text'>
            <Link
              key={product.id}
              href={`/${encodeURIComponent(
                product.seName,
              )}.html?v=product-detail&altview=1`}
            >
              <a className='relative underline text-[#006cd1]'>
                <span className='absolute inset-0'></span>
                {product.name}
              </a>
            </Link>
          </div>

          <div
            className={
              'mt-[12px] text-[#000000] text-normal-text text-medium-text tracking-wider'
            }
          >
            <span className={'font-semibold'}>
              MSRP
              <Price value={product.msrp} />
            </span>
          </div>
          {/* <ul className='flex items-center my-[10px] justify-center space-x-1'>
              {product.getAttributeImageLists.map((res: any) => {
                return (
                  <li
                    className={`w-[30px] h-[30px] p-[1px] border-2  hover:border-secondary cursor-pointer ${
                      currentProductId == res.id ? 'border-secondary' : ''
                    } `}
                    onClick={() => {
                      setcurrentProductId(res.id);
                      setProductImg(`${mediaBaseUrl}${res.attributeImage}`);
                    }}
                  >
                    <img
                      src={`${mediaBaseUrl}${res.attributeImage}`}
                      alt={res.colorName}
                      title={res.colorName}
                      className='w-full object-center object-cover cursor-pointer max-h-full'
                    />
                  </li>
                );
              })}
            </ul> */}
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>
    </>
  );
};

export default SearchProductCard;
