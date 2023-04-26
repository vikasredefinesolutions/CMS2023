import NxtImage from '@appComponents/reUsable/Image';
import { __pagesText } from '@constants/pages.text';
import { _MyAcc_OrderProductDetails } from '@definations/APIs/user.res';
import Link from 'next/link';
import React from 'react';
import ThankYouProductTable from '../../CommonComponents/ThankYouProductTable';

interface _props {
  product: _MyAcc_OrderProductDetails;
}
const ThankYouProduct: React.FC<_props> = ({ product }) => {
  return (
    <>
      <li className='flex flex-wrap ml-[-15px] mr-[-15px] pb-[50px] pt-[50px]'>
        <div className='w-full lg:w-2/6 pl-[15px] pr-[15px] mb-[30px]'>
          <div className='w-full'>
            <Link href={product.seName == null ? '' : product.seName}>
              <div>
                <NxtImage
                  src={product.colorImage}
                  alt={product.productName}
                  className='rounded-md object-center object-cover'
                />
              </div>
            </Link>
          </div>
        </div>
        <div className='w-full lg:w-4/6 pl-[15px] pr-[15px] flex flex-wrap lg:justify-between'>
          <div className='text-title-text font-semibold mb-[10px]'>
            <Link href={product.seName ? product.seName : ''}>
              <a className='text-black hover:text-anchor-hover'>
                {product.productName}
              </a>
            </Link>
          </div>
          <div className='w-full flex flex-wrap mt-[5px]'>
            <div className='lg:w-2/3 w-full'>
              <div className='flex justify-between'>
                <div className='text-normal-text'>
                  <span className='font-[600]'>
                    {__pagesText.ThankYouPage.TotalSummary.Sku}
                  </span>
                  {product.sku}
                </div>
              </div>
              <div className='mt-[5px] flex'>
                <div className='text-normal-text'>
                  <span className='font-semibold'>
                    {__pagesText.ThankYouPage.TotalSummary.Color}
                  </span>
                  {product.attributeOptionValue}
                </div>
              </div>
            </div>
            <div className='lg:w-1/3 w-full'>
              <div className='font-[600] text-normal-text text-right'>
                <span>{__pagesText.ThankYouPage.TotalSummary.ItemTotal}</span>
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
