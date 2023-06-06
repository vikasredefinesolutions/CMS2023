import { __pagesText } from '@constants/pages.text';
import { _MyAcc_OrderProductDetails } from '@definations/APIs/user.res';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import ThankYouProductTable from '@templates/ThankYou/CommonComponents/ThankYouProductTable';
import Link from 'next/link';
import React from 'react';
import { _globalStore } from 'store.global';

interface _props {
  product: _MyAcc_OrderProductDetails;
}
const ThankYouProduct: React.FC<_props> = ({ product }) => {
  let mediaBaseUrl = _globalStore.blobUrl;
  const store = useTypedSelector_v2((state) => state.store);

  mediaBaseUrl = mediaBaseUrl || store.mediaBaseUrl;
  return (
    <>
      <li className='flex flex-wrap ml-[-15px] mr-[-15px] pb-[50px] pt-[50px]'>
        <div className='w-full lg:w-2/6 pl-[15px] pr-[15px] mb-[30px]'>
          <div className='w-full'>
            <span
              style={{
                boxSizing: 'border-box',
                display: 'block',
                overflow: 'hidden',
                width: 'initial',
                height: 'initial',
                background: 'none',
                opacity: '1',
                border: '0px',
                margin: '0px',
                padding: '0px',
                position: 'relative',
              }}
            >
              <span
                style={{
                  boxSizing: 'border-box',
                  display: 'block',
                  width: 'initial',
                  height: 'initial',
                  background: 'none',
                  opacity: '1',
                  border: '0px',
                  margin: '0px',
                  padding: ' 100% 0px 0px',
                }}
              ></span>
              <Link href={`/${product.seName}.html`}>
                <img
                  alt='products'
                  sizes='100vw'
                  srcSet={mediaBaseUrl + product.colorImage}
                  src={mediaBaseUrl + product.colorImage}
                  decoding='async'
                  data-nimg='responsive'
                  style={{
                    position: 'absolute',
                    inset: '0px',
                    boxSizing: 'border-box',
                    padding: '0px',
                    border: 'none',
                    margin: 'auto',
                    display: 'block',
                    width: '0px',
                    height: '0px',
                    minWidth: ' 100%',
                    maxWidth: '100%',
                    minHeight: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Link>
            </span>
          </div>
        </div>
        <div className='w-full lg:w-4/6 pl-[15px] pr-[15px] flex flex-wrap lg:justify-between'>
          <div className='text-title-text font-semibold mb-[10px]'>
            <Link href={`/${product.seName}.html`}>
              <a className='text-[#000000]'>{product.productName}</a>
            </Link>
          </div>
          <div className='w-full flex flex-wrap mt-[5px]'>
            <div className='lg:w-2/3 w-full'>
              <div className='flex justify-between'>
                <div className='text-normal-text'>
                  <span className='font-semibold'>
                    {' '}
                    {__pagesText.ThankYouPage.TotalSummary.Sku}
                  </span>{' '}
                  {product.sku}
                </div>
              </div>
              <div className='mt-[5px] flex'>
                <div className='text-normal-text'>
                  <span className='font-semibold'>
                    {' '}
                    {__pagesText.ThankYouPage.TotalSummary.Color}
                  </span>
                  {product.attributeOptionValue}
                </div>
              </div>
            </div>
            <div className='lg:w-1/3 w-full'>
              <div className='font-[600] text-normal-text text-right'>
                <span className=''>
                  {__pagesText.ThankYouPage.TotalSummary.ItemTotal}
                </span>
                <span className='pt-[4px] block'>${product.totalPrice}</span>
              </div>
            </div>
          </div>
          <div className='w-full flex flex-wrap'>
            <div className='lg:w-3/4 w-full'>
              <div className='mt-[30px]'>
                <div className='text-normal-text font-semibold border-b pb-[8px] mb-[5px]'>
                  {__pagesText.ThankYouPage.TotalSummary.ItemDetails}
                </div>
                <ThankYouProductTable product={product} />
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default ThankYouProduct;
