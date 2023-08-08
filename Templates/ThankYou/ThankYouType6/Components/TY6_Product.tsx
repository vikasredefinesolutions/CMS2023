import NxtImage from '@appComponents/reUsable/Image';
import { _MyAcc_OrderProductDetails } from '@definations/APIs/user.res';
import Link from 'next/link';
import React from 'react';

type _Props = _MyAcc_OrderProductDetails;

const TY6_Product: React.FC<_Props> = (product) => {
  return (
    <>
      <li className='flex pt-[20px] pb-[20px] flex-wrap'>
        <div className='p-[15px] w-full'>
          <div className='flex flex-wrap -mx-[10px]'>
            <div className='w-full md:w-7/12 px-[10px]'>
              <div className='flex flex-wrap mb-[10px] md:mb-[0px] -mx-[10px]'>
                <div className='w-2/6 md:w-1/4 px-[10px]'>
                  <Link href={`/${product.seName}.html`} title=''>
                    <a>
                      <NxtImage
                        src={product.colorImage}
                        alt={product.productName}
                        className=''
                      />
                    </a>
                  </Link>
                </div>
                <div className='w-4/6 md:w-3/4 px-[10px]'>
                  <div className='text-medium-text mb-[10px]'>
                    <Link
                      href={`/${product.seName}.html`}
                      className='text-black hover:text-secondary font-semibold'
                    >
                      <a>{product.productName}</a>
                    </Link>
                  </div>
                  <div className='text-default-text mb-[5px]'>
                    Color:
                    <span className='font-semibold'>
                      {product.attributeOptionValue}
                    </span>
                  </div>
                  <div className=''>
                    <div className='text-default-text mb-[5px] flex items-center flex-wrap gap-y-[5px]'>
                      Size :
                      <strong className='mx-[2px]'>
                        {
                          product.shoppingCartItemDetailsViewModels[0]
                            .attributeOptionValue
                        }{' '}
                        -
                      </strong>
                      <strong className='mx-[2px]'>
                        {product.shoppingCartItemDetailsViewModels[0].qty}
                      </strong>
                      <strong className='mx-[2px]'>Qty</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full flax-wrap md:w-5/12 px-[10px]'>
              <div className='flex justify-between'>
                <div className='text-default-text'>
                  <span>
                    {product.shoppingCartItemDetailsViewModels[0].price} / QTY{' '}
                    {product.shoppingCartItemDetailsViewModels[0].price}{' '}
                  </span>
                </div>
                <div className='text-default-text mb-[10px]'>
                  <span className='font-semibold'>
                    Total {product.shoppingCartItemDetailsViewModels[0].price}{' '}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default TY6_Product;
