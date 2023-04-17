import Price from '@appComponents/Price';
import NxtImage from '@appComponents/reUsable/Image';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
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
    <li className='p-4 sm:p-6 border-b border-[#d2d2d2] last:border-0'>
      <div className='flex flex-wrap justify-between -mx-3'>
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
        <div className='flex-1 sm:mt-0 mt-6 text-default-text text-center sm:text-left px-3'>
          <div className='mb-6 font-bold text-sub-text cursor-pointer'>
            {item.productName}
          </div>
          <div className='mb-6'>
            <span className='font-[600] inline-block'>
              {__pagesText.OrderPage.sku} :
            </span>
            <span>{item.sku}</span>
          </div>
          <div className='mb-6'>
            <span className='font-[600]'>{__pagesText.OrderPage.size} :</span>{' '}
            {mergeAllSizes(item.shoppingCartItemDetailsViewModels)}
          </div>
          <div className='mb-6 pb-6 border-b border-[#d2d2d2]'>
            <span className='font-[600]'>{__pagesText.OrderPage.color} :</span>
            {item.attributeOptionValue}
          </div>
          {item.shoppingCartItemDetailsViewModels.map((product, index) => (
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
          ))}

          <div className='mt-4 pt-4 flex flex-wrap md:justify-between border-t border-[#d2d2d2] lg:justify-start -mx-3'>
            <div className='w-full md:w-1/3 lg:w-1/4 px-3'>
              <div className='font-[600] mb-4'>
                {' '}
                {__pagesText.OrderPage.unitTotal}
              </div>
              <div className='mb-4'>
                <Price value={item.totalPrice} />
              </div>
            </div>
            <div className='w-full md:w-1/3 lg:w-1/4 px-3'>
              <div className='font-[600] mb-4'>
                {' '}
                {__pagesText.OrderPage.estimatedPrice}
              </div>
              <div className='mb-4'>
                <Price value={item.totalPrice} />
              </div>
            </div>
          </div>
        </div>
        <div className='!text-anchor !hover:text-anchor'>
          <Link
            href={`${paths.WRITE_A_REVIEW}?ProductId=${item.productId}&attributeId=${item.attributeOptionId}`}
            title='Write A Review'
            className='btn btn-secondary btn-sm'
          >
            {__pagesText.OrderPage.writeaReview}
          </Link>
        </div>
      </div>
    </li>
  );
};

export default OL_ItemDetails;
