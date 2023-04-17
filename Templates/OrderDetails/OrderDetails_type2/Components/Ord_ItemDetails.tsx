import Price from '@appComponents/Price';
import NxtImage from '@appComponents/reUsable/Image';
import { _MyAcc_OrderProductDetails } from '@definations/APIs/user.res';
import Link from 'next/link';
import React from 'react';

interface _Props {
  item: _MyAcc_OrderProductDetails;
}

const OrD_ItemDetails: React.FC<_Props> = ({ item }) => {
  return (
    <li className='border-b border-b-gray-300'>
      <div className='flex flex-wrap pb-[20px] -mx-3'>
        <div className='w-full lg:w-1/4 pl-[12px] pr-[12px] mb-[10px] max-w-[300px] mx-auto'>
          <Link
            href='product-page.html'
            title=''
            className='block border border-gray-border'
          >
            <a>
              {' '}
              <NxtImage
                src={item.colorImage}
                alt={item.productName}
                className='w-full'
              />
            </a>
          </Link>
        </div>
        <div className='w-full lg:w-3/4 pl-[12px] pr-[12px]'>
          <div className='flex flex-wrap justify-between items-center'>
            <div className='text-sub-text font-semibold mb-[10px]'>
              <Link
                href={'/'}
                className='!text-anchor hover:!text-anchor-hover'
              >
                {item.productName}
              </Link>
            </div>
            <div className='text-default-text mb-[10px]'>
              <span className='font-semibold'>
                Total <Price value={item.totalPrice} />
              </span>
            </div>
          </div>
          <div className='flex flex-wrap justify-between items-center mb-[20px]'>
            <div className='text-default-text mb-[10px]'>
              Color:{' '}
              <span className='font-semibold'>{item.attributeOptionValue}</span>
            </div>
          </div>
          <div className='w-full flex flex-wrap'>
            <div className='w-full'>
              <div className='text-default-text bg-light-gray border-b border[#dddddd] pt-[10px] pb-[10px] pl-[15px] pr-[15px]'>
                REGULAR # {item.sku}
              </div>
              <div className=''>
                {item.shoppingCartItemDetailsViewModels.map(
                  (product, index) => {
                    return (
                      <div
                        key={index}
                        className='flex justify-between items-center pt-[5px] pb-[5px]'
                      >
                        <div className='w-full md:w-1/3 flex flex-wrap items-center gap-2 pl-[5px] pr-[5px] mb-[10px]'>
                          <div className='text-default-text'>Size</div>
                          <div className='text-default-text'>
                            {product.attributeOptionValue}
                          </div>
                        </div>
                        <div className='w-full md:w-1/3 flex flex-wrap items-center gap-1 pl-[5px] pr-[5px] mb-[10px]'>
                          <div className='text-default-text'>Qty</div>
                          <div className='text-default-text'>{product.qty}</div>
                        </div>
                        <div className='w-full md:w-1/3 flex flex-wrap items-center justify-between gap-2 pl-[5px] pr-[5px] mb-[10px]'>
                          <div className='text-default-text'>
                            <Price value={product.price} />
                          </div>
                        </div>
                      </div>
                    );
                  },
                )}
                {item.shoppingCartLogoPersonViewModels.map((logo, index) => {
                  return (
                    <div
                      key={logo.id}
                      className='pl-[12px] pr-[12px] pt-[12px] pb-[12px] mb-[10px] border border-gray-border'
                    >
                      <div className='flex flex-wrap items-center gap-2 justify-between'>
                        <div className='text-default-text'>
                          {`Location ${logo.logoLocation}`}
                        </div>
                      </div>
                      <div className='w-[80px] h-[80px]'>
                        <NxtImage
                          src={logo.logoPositionImage}
                          alt={logo.name}
                          className='w-full'
                        />
                      </div>
                      <div className='flex flex-wrap justify-between gap-y-2 mt-[10px]'>
                        <div className='w-full lg:w-1/2'>
                          <div className='mb-[4px] text-default-text'>
                            Logo #{logo.name}
                          </div>
                          <div className='flex flex-wrap items-center gap-2'>
                            <div className='text-default-text font-semibold'>
                              {`Logo ${index + 1} :`}
                            </div>
                            <div className='h-[50px] w-auto'>
                              <NxtImage
                                src={logo.logoImagePath}
                                alt={logo.logoLocation}
                                className='w-auto h-[50px]'
                              />
                            </div>
                          </div>
                        </div>
                        <div className='w-full lg:w-1/2'>
                          <div className='mb-1 text-default-text'>Price</div>
                          <div className='text-default-text font-semibold'>
                            <div className=''>
                              <Price value={logo.logoPrice} />
                            </div>
                            {/* <div className=''>First Logo Free</div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default OrD_ItemDetails;
