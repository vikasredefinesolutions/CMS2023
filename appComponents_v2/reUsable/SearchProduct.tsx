import NxtImage from '@appComponents/reUsable/Image';
import Price from '@appComponents/reUsable/Price';
import {
  BACARDI,
  BOSTONBEAR,
  HEALTHYPOINTS,
  SIMPLI_SAFE_CODE,
  THD_STORE_CODE,
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
          storeCode === _Store_CODES.USAAHEALTHYPOINTS ||
          storeCode === THD_STORE_CODE ||
          storeCode === _Store_CODES.USAAALPHAHEALTHYPOINTS
            ? 'border border-transparent hover:border-gray-border hover:shadow-md'
            : storeCode == BACARDI
            ? ''
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
                title={product?.name}
                src={mainImageUrl?.attributeImage || null}
                alt={product?.name}
                className='m-auto max-h-full'
              />
            </a>
          </Link>
        </div>
        <div
          className={`${
            storeCode !== _Store_CODES.USAAHEALTHYPOINTS &&
            storeCode !== _Store_CODES.USAAALPHAHEALTHYPOINTS &&
            'mt-[24px]'
          } pl-[8px] pr-[8px]`}
        >
          <div
            className={`  text-anchor hover:text-anchor-hover text-ellipsis overflow-hidden line-clamp-2 ${
              storeCode === _Store_CODES.USAAHEALTHYPOINTS ||
              storeCode === _Store_CODES.USAAALPHAHEALTHYPOINTS
                ? 'text-extra-small-text mt-[10px]'
                : storeCode === THD_STORE_CODE
                ? 'text-default-text mt-[14px] h-[44px]'
                : 'text-medium-text mt-[14px] h-[44px]'
            }`}
          >
            <Link
              key={product.id}
              href={`/${encodeURIComponent(product.seName)}.html`}
            >
              <a
                className={` relative text-anchor hover:text-anchor ${
                  storeCode === _Store_CODES.USAAPUNCHOUT ? 'font-semibold' : ''
                }`}
              >
                {product.name}
              </a>
            </Link>
          </div>

          <div
            className={
              storeCode === _Store_CODES.USAAPUNCHOUT
                ? ' mb-[12px] text-sub-text'
                : ` text-[#000000] ${
                    storeCode === _Store_CODES.USAAHEALTHYPOINTS ||
                    storeCode === _Store_CODES.USAAALPHAHEALTHYPOINTS
                      ? 'text-sub-text mt-[5px]'
                      : 'text-normal-text mt-[12px]'
                  } text-medium-text tracking-wider ${
                    storeCode === THD_STORE_CODE
                      ? 'flex flex-wrap items-center justify-center gap-x-1'
                      : ''
                  } `
            }
          >
            <span
              className={`${
                storeCode === _Store_CODES.USAAHEALTHYPOINTS ||
                storeCode === _Store_CODES.USAAALPHAHEALTHYPOINTS ||
                storeCode === _Store_CODES.USAAPUNCHOUT
                  ? 'text-primary'
                  : storeCode === THD_STORE_CODE
                  ? 'flex items-center'
                  : 'font-semibold'
              }`}
            >
              {storeCode == SIMPLI_SAFE_CODE ||
              storeCode == UCA ||
              storeCode == HEALTHYPOINTS ||
              storeCode == _Store_CODES.USAAALPHAHEALTHYPOINTS ||
              storeCode == BACARDI ||
              storeCode == BOSTONBEAR ||
              storeCode == _Store_CODES.USAAPUNCHOUT
                ? ''
                : storeCode === THD_STORE_CODE
                ? 'STARTING '
                : 'MSRP '}
              <span
                className={`font-semibold ${
                  storeCode === BACARDI
                    ? 'text-sub-text text-secondary !font-bold'
                    : 'text-primary text-sub-text'
                } ${storeCode === THD_STORE_CODE ? ' ml-[10px]' : ''}`}
              >
                <Price value={product.msrp} />
              </span>
            </span>
          </div>

          <ul
            className={`flex items-center ${
              storeCode === _Store_CODES.USAAHEALTHYPOINTS ||
              storeCode === _Store_CODES.USAAALPHAHEALTHYPOINTS
                ? ' my-[4px]'
                : ' my-[10px]'
            } justify-center space-x-1`}
          >
            {product.getAttributeImageLists.map((res: any) => {
              return (
                <li
                  className={`w-[30px] h-[30px] p-[1px] ${
                    storeCode == BACARDI || storeCode == BOSTONBEAR
                      ? 'border'
                      : 'border-2'
                  } ${
                    storeCode !== THD_STORE_CODE
                      ? storeCode == BOSTONBEAR
                        ? ' hover:border-quaternary'
                        : 'hover:border-secondary'
                      : ''
                  } 
                  
                  cursor-pointer ${
                    mainImageUrl.attributeOptionID == res.attributeOptionID
                      ? storeCode == BACARDI
                        ? 'border-default'
                        : storeCode == BOSTONBEAR
                        ? ' border-quaternary'
                        : 'border-secondary'
                      : ''
                  } `}
                  onClick={() => {
                    setMainImageUrl(res);
                  }}
                  onMouseEnter={() => {
                    setMainImageUrl(res);
                  }}
                  onMouseLeave={() => {
                    setMainImageUrl(product.getAttributeImageLists[0]);
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
