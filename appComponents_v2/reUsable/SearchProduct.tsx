import NxtImage from '@appComponents/reUsable/Image';
import Price from '@appComponents/reUsable/Price';
import {
  BOSTONBEAR,
  HEALTHYPOINTS,
  SIMPLI_SAFE_CODE,
  UCA,
  UNITI_CODE,
  _Store_CODES,
} from '@constants/global.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { searchproduct } from '@services/product.service.type';

import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

interface props {
  product: searchproduct;
}
const SearchProductCard: React.FC<props> = ({ product }) => {
  const router = useRouter();
  const storeCode = useTypedSelector_v2((state) => state.store.code);
  const [mainImageUrl, setMainImageUrl] = useState<any>(
    product ? product.getAttributeImageLists[0] : {},
  );

  return (
    <>
      <div
        key={product.id}
        className={`relative ${
          storeCode === _Store_CODES.USAAHEALTHYPOINTS
            ? 'border border-transparent hover:border-gray-border hover:shadow-md'
            : 'border border-gray-200'
        }  p-[20px]`}
      >
        {/* <div className='flex text-center lg:w-auto mb-6'> */}
        {/* <div className='relative pb-4 w-full'> */}
        <div className='w-full overflow-hidden '>
          <Link
            key={product.id}
            href={`/${encodeURIComponent(product.seName)}.html`}
          >
            <a className='relative'>
              <NxtImage
                title={product.name}
                src={mainImageUrl.attributeImage || null}
                alt={product.name}
                className='m-auto max-h-full'
              />
            </a>
          </Link>
        </div>
        <div
          className={`${
            storeCode !== _Store_CODES.USAAHEALTHYPOINTS && 'mt-[24px]'
          } pl-[8px] pr-[8px]`}
        >
          <div
            className={`  text-anchor hover:text-anchor-hover text-ellipsis overflow-hidden line-clamp-2 ${
              storeCode === _Store_CODES.USAAHEALTHYPOINTS
                ? 'text-extra-small-text mt-[10px]'
                : 'text-medium-text mt-[14px] h-[44px]'
            }`}
          >
            <Link
              key={product.id}
              href={`/${encodeURIComponent(product.seName)}.html`}
            >
              <a className='relative text-anchor hover:text-anchor '>
                {product.name}
              </a>
            </Link>
          </div>

          <div
            className={` text-[#000000] ${
              storeCode === _Store_CODES.USAAHEALTHYPOINTS
                ? 'text-sub-text mt-[5px]'
                : 'text-normal-text mt-[12px]'
            } text-medium-text tracking-wider`}
          >
            <span
              className={`${
                storeCode === _Store_CODES.USAAHEALTHYPOINTS
                  ? 'text-primary'
                  : 'font-semibold'
              }`}
            >
              {storeCode == SIMPLI_SAFE_CODE ||
              storeCode == UCA ||
              storeCode == HEALTHYPOINTS
                ? ''
                : 'MSRP'}
              <Price value={product.msrp} />
            </span>
          </div>

          <ul
            className={`flex items-center ${
              storeCode === _Store_CODES.USAAHEALTHYPOINTS
                ? ' my-[4px]'
                : ' my-[10px]'
            } justify-center space-x-1`}
          >
            {product.getAttributeImageLists.map((res: any) => {
              return (
                <li
                  className={`w-[30px] h-[30px] p-[1px] border-2  hover:border-secondary cursor-pointer ${
                    mainImageUrl.attributeOptionID == res.attributeOptionID
                      ? 'border-secondary'
                      : ''
                  } `}
                  onClick={() => {
                    setMainImageUrl(res);
                  }}
                >
                  <NxtImage
                    src={res.attributeImage}
                    alt={res.colorName}
                    title={res.colorName}
                    className='w-full object-center object-cover cursor-pointer max-h-full'
                  />
                </li>
              );
            })}
          </ul>

          {/* {storeCode == SIMPLI_SAFE_CODE ||
          storeCode == UCA ||
          storeCode == UNITI_CODE ||
          storeCode == BOSTONBEAR ? (
            <ul className='flex flex-wrap items-center mt-[8px] justify-center space-x-1'>
              {product.getAttributeImageLists.map((prod) => (
                <li
                  className={`w-[30px] h-[30px] p-[1px] border hover:border-secondary cursor-pointer`}
                >
                  <NxtImage
                    title={prod.attributeOptionName}
                    src={prod.attributeImage || null}
                    alt={prod.attributeOptionName}
                    className='m-auto max-h-full'
                  />
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )} */}

          {storeCode == UCA ||
          storeCode == UNITI_CODE ||
          storeCode == BOSTONBEAR ? (
            <div className='mt-[10px]'>
              <button
                onClick={() => router.push(`/${product.seName}.html`)}
                className='btn btn-secondary'
              >
                <i className='fa-solid fa-basket-shopping'></i>
                <span>Add To Cart</span>
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>
    </>
  );
};

export default SearchProductCard;
