import Price from '@appComponents/Price';
import NxtImage from '@appComponents/reUsable/Image';
import { paths } from '@constants/paths.constant';
import { numberToOrdinalString } from '@helpers/common.helper';
import { CartObject } from '@services/cart';
import Link from 'next/link';
import React from 'react';

interface _props {
  item: CartObject;
}

const RcOrderSummary: React.FC<_props> = ({ item }) => {
  return (
    <div className='w-full pl-0 pr-[15px]'>
      <div className=''>
        <div className='bg-gray-100 flex flex-wrap items-center justify-between px-3 py-1'>
          <div className='font-bold text-lg'>Order Details</div>
          <Link href={paths.CART} className='text-anchor text-lg font-bold'>
            Edit
          </Link>
        </div>
      </div>
      <div className='mt-[15px] border border-gray-400 text-black text-[15px]'>
        <div className='p-[15px] pb-0'>
          <div className='text-base font-semibold mb-5'>{item.productName}</div>
          <div className='flex flex-wrap justify-between border-b border-b-gray-200 mb-2.5 last:border-b-0 last:mb-0'>
            <div className='w-7/12 mb-[5px]'>Color:</div>
            <div className='w-5/12 mb-[5px] font-semibold text-right'>
              {item.attributeOptionValue}
            </div>
          </div>
          <div className='flex flex-wrap justify-between border-b border-b-gray-200 mb-2.5 last:border-b-0 last:mb-0'>
            <div className='w-7/12 mb-[5px]'>Size:</div>
            <div className='w-5/12 mb-[5px] text-right'>
              {item.shoppingCartItemDetailsViewModels.map((size) => (
                <div
                  key={size.id}
                  className='mb-[5px]'
                >{`${size.attributeOptionValue} - ${size.qty} QTY`}</div>
              ))}
            </div>
          </div>
          <div className='flex flex-wrap justify-between border-b border-b-gray-200 mb-2.5 last:border-b-0 last:mb-0'>
            <div className='w-7/12 mb-[5px]'>Total Quantity:</div>
            <div className='w-5/12 mb-[5px] font-semibold text-right'>
              {item.totalQty}
            </div>
          </div>
          <div className='flex flex-wrap justify-between border-b border-b-gray-200 mb-2.5 last:border-b-0 last:mb-0'>
            <div className='w-7/12 mb-[5px]'>Price Per Item:</div>
            <div className='w-5/12 mb-[5px] font-semibold text-right'>
              <Price value={item.totalPrice / item.totalQty} />
            </div>
          </div>
          <div className='flex flex-wrap justify-between border-b border-b-gray-200 mb-[5px] last:border-b-0 last:mb-0'>
            <div className='w-7/12 mb-[5px]'>Subtotal:</div>
            <div className='w-5/12 mb-[5px] font-semibold text-right'>
              <Price value={item.totalPrice} />
            </div>
          </div>
          {item.shoppingCartLogoPersonViewModels &&
            item?.shoppingCartLogoPersonViewModels.map((el: any, index) => {
              return (
                <div className='flex flex-wrap justify-between border-b last:border-b-0 border-gray-border mb-[10px] last:mb-0 text-normal-text'>
                  <div className='w-7/12 mb-[10px]'>
                    {`${numberToOrdinalString(index + 1)} Logo:`}
                  </div>
                  <div className='w-5/12 mb-[10px] font-semibold text-right'>
                    ${el.logoPrice}
                  </div>
                  <div className='w-full mb-[10px] text-center'>
                    <div className='w-24 h-24 flex items-center justify-center mx-auto'>
                      <img className='inline-block max-h-full' src='' alt='' />
                      <NxtImage
                        className='inline-block max-h-full'
                        src={el?.logoImagePath}
                        title={el?.logoLocation}
                        alt={el.logoLocation}
                      />
                    </div>
                  </div>
                  <div className='w-7/12 mb-[10px]'>Location:</div>
                  <div className='w-5/12 mb-[10px] font-semibold text-right'>
                    {el.logoLocation}
                  </div>
                </div>
              );
            })}

          {/* <div className='flex flex-wrap justify-between border-b border-b-gray-200 mb-2.5 last:border-b-0 last:mb-0'>
            <div className='w-7/12 mb-[5px]'>Shipping:</div>
            <div className='w-5/12 mb-[5px] font-semibold text-right'>FREE</div>
          </div> */}
        </div>
        <div className='bg-gray-100 py-2 flex flex-wrap justify-between text-lg font-bold'>
          <div className='w-1/4 px-[15px]'>Total:</div>
          <div className='w-3/4 px-[15px] text-right'>
            <Price value={item.totalPrice} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RcOrderSummary;
