import Price from '@appComponents/Price';
import NxtImage from '@appComponents/reUsable/Image';
import { _CartItem } from '@services/cart';
import Link from 'next/link';
import React from 'react';
interface _Props {
  item: _CartItem;
}

const CO7R_Product: React.FC<_Props> = ({ item }) => {
  return (
    <li className='bg-white pt-0 mb-[20px]'>
      <div className='border border-gray-border p-[15px] w-full '>
        <div className='flex flex-wrap -mx-[10px]'>
          <div
            className={` ${
              // // storeCode == _Store.type6
              //   ? 'w-full md:w-7/12 px-[10px]'
              //   : 'w-full lg:w-1/12 pl-[12px] pr-[12px] mb-[10px] max-w-[300px] mx-auto'
              'w-full md:w-7/12 px-[10px]'
            }`}
          >
            <div className='flex flex-wrap mb-[10px] md:mb-[0px] -mx-[10px]'>
              <div className='w-2/6 md:w-1/4 px-[10px]'>
                <Link href={`/${item.seName}.html`}>
                  <a>
                    <NxtImage
                      src={
                        item.colorImage ||
                        '/assets/images/image_not_available.jpg'
                      }
                      alt={item.productName}
                      className='max-h-[348px] !inline-black m-auto'
                      isStatic={!Boolean(item.colorImage)}
                    />
                  </a>
                </Link>
              </div>

              <div className='w-4/6 md:w-3/4 px-[10px]'>
                <div className='text-medium-text  mb-[10px]'>
                  <Link href={`/${item.seName}.html`}>
                    <a className='text-black hover:text-secondary font-semibold'>
                      {item.productName}
                    </a>
                  </Link>
                </div>
                <div className='text-default-text mb-[5px]'>
                  Color:{' '}
                  <span className='font-semibold'>
                    {item.attributeOptionValue}
                  </span>
                </div>
                <div className=''>
                  {item.shoppingCartItemDetailsViewModels.map(
                    (view, viewIndex) => {
                      return (
                        <div
                          key={viewIndex}
                          className='text-default-text mb-[5px] flex items-center flex-wrap gap-y-[5px]'
                        >
                          Size :{' '}
                          <strong className='mx-[2px]'>
                            {view.attributeOptionValue} -
                          </strong>
                          <strong className='mx-[2px]'>{view.qty}</strong>
                          <strong className='mx-[2px]'>Qty</strong>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='w-full flax-wrap md:w-5/12 px-[10px]'>
            <div className='flex justify-between'>
              <div className='text-default-text'>
                <span>
                  <Price value={item.totalPrice / item.totalQty} /> / QTY{' '}
                  {item.totalQty}
                </span>
              </div>
              <div className='text-default-text mb-[10px]'>
                <span className='font-semibold'>
                  Total <Price value={item.totalPrice} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CO7R_Product;
