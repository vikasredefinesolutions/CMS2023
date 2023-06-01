import NxtImage from '@appComponents/reUsable/Image';
import { __pagesText } from '@constants/pages.text';
import {
  ShoppingCartItemDetailsViewModel,
  _MyAcc_OrderProductDetails,
} from '@definations/APIs/user.res';
import Link from 'next/link';
import React from 'react';

interface _props {
  item: _MyAcc_OrderProductDetails;
}

const OL_ItemDetails: React.FC<_props> = ({ item }) => {
  function removeDuplicates(arr: string[]) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }

  const mergeAllSizes = (items: ShoppingCartItemDetailsViewModel[]) => {
    let sizes = '';
    const sizesList = removeDuplicates(
      items.map((product) => product.attributeOptionValue),
    );

    sizesList.forEach((size, index, workingArr) => {
      if (index === workingArr.length - 1) {
        sizes += `${size} `;
        return;
      }
      sizes += `${size}, `;
    });

    return sizes;
  };

  return (
    <li className='flex flex-wrap ml-[-15px] mr-[-15px] pb-[15px] mb-[15px]'>
      {/* <div className='flex flex-wrap justify-between -mx-3'> */}
      <div className='w-full lg:w-2/6 pl-[15px] pr-[15px]'>
        <div className='w-full'>
          <Link href={`/${item.seName}.html`}>
            <a>
              <div className='px-3 cursor-pointer'>
                <div className='lg:flex-shrink-0 sm:w-52 sm:h-52 w-full h-auto overflow-hidden rounded-lg text-center'>
                  <NxtImage
                    src={item.colorImage}
                    alt={item.productName}
                    className='max-h-full'
                  />
                </div>
              </div>
            </a>
          </Link>
        </div>
      </div>
      <div className='w-full lg:w-4/6 pl-[15px] pr-[15px]'>
        <div className='text-title-text font-semibold mb-[10px]'>
          <Link href={`/${item.seName}.html`}>
            <a className='text-[#000000]'>{item.productName}</a>
          </Link>
        </div>
        <div className='w-full flex flex-wrap mt-[5px]'>
          <div className='lg:w-2/3 w-full'>
            <div className='flex justify-between'>
              <span className='text-normal-text'>
                <span className='font-semibold'>
                  {__pagesText.OrderPage.sku} :
                </span>
                {item.sku}
              </span>{' '}
            </div>
            <div className='mt-[5px] flex'>
              <div className='text-normal-text'>
                <span className='font-semibold'>
                  {__pagesText.OrderPage.size} :
                </span>{' '}
                {mergeAllSizes(item.shoppingCartItemDetailsViewModels)}
              </div>
            </div>
            <div className='mt-[5px] flex'>
              <div className='text-normal-text'>
                <span className='font-semibold'>
                  {__pagesText.OrderPage.color} :
                </span>
                {item.attributeOptionValue}
              </div>
            </div>
          </div>
        </div>
        {/* {item.shoppingCartItemDetailsViewModels.map((product, index) => (
          <div
            key={index}
            className='mt-4 flex flex-wrap md:justify-between lg:justify-start -mx-3'
          >
            <div className='w-full md:w-1/3 lg:w-1/4 px-3'>
              <div className='font-[600] mb-4'>
                {__pagesText.OrderPage.size}
              </div>
              <div className='mb-4'>{product.attributeOptionValue}</div>
            </div>
            <div className='w-full md:w-1/3 lg:w-1/4 px-3'>
              <div className='font-[600] mb-4'>
                {__pagesText.OrderPage.price}
              </div>
              <div className='mb-4'>
                <Price value={product.price} />
              </div>
            </div>
            <div className='w-full md:w-1/3 lg:w-1/4 px-3'>
              <div className='font-[600] mb-4'>
                {' '}
                {__pagesText.OrderPage.qty}
              </div>
              <div className='mb-4'>{product.qty}</div>
            </div>
          </div>
        ))} */}

        {/* <div className='mt-4 pt-4 flex flex-wrap md:justify-between border-t border-[#d2d2d2] lg:justify-start -mx-3'>
          <div className='w-full md:w-1/3 lg:w-1/4 px-3'>
            <div className='font-[600] mb-4'>
              {' '}
              {__pagesText.OrderPage.unitTotal}
            </div>
            <div className='mb-4'>
              <Price value={item.productTotal} />
            </div>
          </div>
          <div className='w-full md:w-1/3 lg:w-1/4 px-3'>
            <div className='font-[600] mb-4'>
              {' '}
              {__pagesText.OrderPage.estimatedPrice}
            </div>
            <div className='mb-4'>
              <Price value={item.productTotal} />
            </div>
          </div>
        </div> */}
      </div>
      {/* <div className='!text-anchor !hover:text-anchor'>
        <Link
          href={`${paths.WRITE_A_REVIEW}?ProductId=${item.productId}&attributeId=${item.attributeOptionId}`}
          title='Write A Review'
          className='btn btn-secondary btn-sm'
        >
          {__pagesText.OrderPage.writeaReview}
        </Link>
      </div> */}
      {/* </div> */}
    </li>
  );
};

export default OL_ItemDetails;
