import NxtImage from '@appComponents/reUsable/Image';
import Price from '@appComponents/reUsable/Price';
import {
  BOSTONBEAR,
  CYXTERA_CODE,
  UCA,
  UNITI_CODE,
  _Store_CODES,
} from '@constants/global.constant';
import { _ProductImageOption } from '@definations/APIs/colors.res';
import { useTypedSelector_v2 } from '@hooks_v2/index';

import { _ProductsRecentlyViewedResponse } from '@templates/ProductDetails/productDetailsTypes/productDetail.res';
import Link from 'next/link';
import React, { useState } from 'react';
interface props {
  product: _ProductsRecentlyViewedResponse;
}
const ProductCard: React.FC<props> = ({ product }) => {
  const [productimg, setProductImg] = useState(product.image);
  const [currentProductId, setcurrentProductId] = useState(
    product?.getProductImageOptionList[0]?.id,
  );
  const [mainImageUrl, setMainImageUrl] = useState<_ProductImageOption>(
    product.getProductImageOptionList[0],
  );
  const [currentProduct, setCurrentProduct] = useState<_ProductImageOption>(
    product.getProductImageOptionList[0],
  );
  const {
    id: storeId,
    mediaBaseUrl,
    code: storeCode,
  } = useTypedSelector_v2((state) => state.store);
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
              <a
                className='block m-auto max-h-[348px]'
                href={`${encodeURIComponent(
                  product.seName,
                )}.html?v=product-detail&altview=1`}
                title={product.name}
              >
                <NxtImage
                  title={product.name}
                  src={mainImageUrl.imageName}
                  alt={product.name}
                  className='max-h-[348px] m-auto'
                />
              </a>
            </Link>
          </div>
          <div
            className={`w-full pt-[25px] ${
              storeCode == UNITI_CODE ? 'p-[10px]' : ''
            } h-full text-center z-10 `}
          >
            <Link
              key={product.id}
              href={`${encodeURIComponent(
                product.seName,
              )}.html?v=product-detail&altview=1`}
            >
              <div
                className={`mb-[10px] mt-[10px] ${
                  storeCode == UNITI_CODE
                    ? 'text-default-text  h-[44px]'
                    : storeCode == BOSTONBEAR || storeCode == UCA
                    ? ' h-[46px] text-medium-text '
                    : 'mt-[14px] text-anchor hover:text-anchor-hover h-[44px] text-ellipsis overflow-hidden line-clamp-2 text-small-text tracking-[1.4px]'
                }  overflow-hidden `}
              >
                <span
                  className={`relative ${
                    storeCode === _Store_CODES.UNITi
                      ? 'text-anchor hover:text-anchor cursor-pointer'
                      : 'cursor-pointer relative underline text-anchor hover:text-anchor-hover leading-[20px]'
                  }`}
                >
                  {product.name}
                </span>
              </div>
            </Link>

            <div
              className={
                storeCode == BOSTONBEAR
                  ? 'mb-[12px] text-sub-text '
                  : 'mt-[12px] text-medium-text tracking-wider'
              }
            >
              <span
                className={
                  storeCode == BOSTONBEAR
                    ? ' text-primary'
                    : storeCode === _Store_CODES.UNITi
                    ? 'text-quaternary !font-normal'
                    : ' font-semibold'
                }
              >
                {storeCode == _Store_CODES.UNITi ||
                storeCode == BOSTONBEAR ||
                storeCode === UCA
                  ? ''
                  : 'MSRP'}
                <Price value={product.msrp} />
              </span>
            </div>
            <ul className='flex items-center my-[10px] justify-center space-x-1'>
              {product.getProductImageOptionList.map((res: any) => {
                return (
                  <li
                    className={
                      storeCode == BOSTONBEAR
                        ? 'w-[30px] h-[30px] p-[1px] border   hover:border-quaternary cursor-pointer border-quaternary'
                        : `w-7 h-7 border-2 hover:border-light-gray cursor-pointer ${
                            currentProduct.id == res.id
                              ? 'border-secondary'
                              : 'border-light-gray'
                          } `
                    }
                    onMouseOver={() => setMainImageUrl(res)}
                    onMouseLeave={() => setMainImageUrl(currentProduct)}
                    onClick={() => {
                      setCurrentProduct(res);
                    }}
                  >
                    <NxtImage
                      src={res.imageName}
                      useNextImage={false}
                      alt={res.colorName}
                      title={res.colorName}
                      className='max-h-full m-auto'
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
                  store.code === UNITI_CODE ||
                  store.code === BOSTONBEAR ? (
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

export default ProductCard;
