import Price from '@appComponents/Price';
import NxtImage from '@appComponents/reUsable/Image';
import { CustomizeLaterMain } from '@constants/common.constant';
import { logoLocation } from '@constants/enum';
import { CustomizeLater } from '@constants/global.constant';
import { _MyAcc_OrderProductDetails } from '@definations/APIs/user.res';
import { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';

interface _props {
  item: _MyAcc_OrderProductDetails;
  mediaBaseUrl: string;
}

const OrD_InvoiceItem: React.FC<_props> = ({ item, mediaBaseUrl }) => {
  return (
    <div className='flex flex-wrap justify-between -mx-3 gap-y-4'>
      <Link href={`/${item.seName}.html`}>
        <a>
          <div className='px-3 cursor-pointer'>
            <div className='lg:flex-shrink-0 sm:w-52 sm:h-52 w-full h-auto overflow-hidden rounded-lg text-center'>
              <NxtImage
                src={item.colorImage}
                alt={`${item.productName}`}
                className='max-h-full'
              />
            </div>
          </div>
        </a>
      </Link>
      <div className='w-full lg:w-auto lg:flex-1 sm:mt-0 mt-6 text-medium-text text-center sm:text-left px-3'>
        <Link href={`/${item.seName}.html`}>
          <a>
            <div className='font-[700] text-medium-text cursor-pointer'>
              {item.productName}
            </div>
          </a>
        </Link>
        <div className='mt-1'>
          <span className='font-[600] inline-block'>SKU :</span>
          <span>{item.sku}</span>
        </div>
        <div className='mt-1'>
          <span className='font-[600]'>COLOR : </span>
          {item.attributeOptionValue}
        </div>
        <div className='border-t border-b border-[#d2d2d2] my-4 py-4'>
          {item.shoppingCartItemDetailsViewModels.map((product) => (
            <div
              key={product.attributeOptionId}
              className='flex flex-wrap justify-between -mx-3'
            >
              <div className='w-1/3 p-3'>
                <div className='font-[500]'>SIZE</div>
                <div className=''>{product.attributeOptionValue}</div>
              </div>
              <div className='w-1/3 p-3'>
                <div className='font-[600]'>PRICE</div>
                <div className=''>
                  <Price value={product.price} />
                </div>
              </div>
              <div className='w-1/3 p-3'>
                <div className='font-[600]'>QTY</div>
                <div className=''>{product.qty}</div>
              </div>
            </div>
          ))}
        </div>
        <div className='border-b border-[#d2d2d2] my-4 py-4'>
          {item.shoppingCartLogoPersonViewModels.map((logo) => {
            let logoToShow: string | StaticImageData = logo.logoImagePath;

            if (logo.logoName === 'Add Logo Later') {
              logoToShow = '/assets/images/logo-to-be-submitted.webp';
            } else {
              logoToShow = mediaBaseUrl + logo.logoImagePath;
            }

            return (
              <div
                key={logo.logoName}
                className='flex flex-wrap justify-between -mx-3'
              >
                <div
                  className={`${
                    logo.logoName == 'Customize Later' ? 'w-full' : 'w-1/3'
                  } px-3`}
                >
                  <div className='font-[600]'>Logo</div>
                  {logo.logoName === 'Customize Later' ? (
                    <div className='flex justify-start items-center mt-3'>
                      <div>
                        <span className='material-icons text-[60px] mr-3'>
                          support_agent
                        </span>
                      </div>
                      <div>
                        <div className='text-lg font-semibold'>
                          {CustomizeLaterMain}
                        </div>
                        <div className='text-base'>{CustomizeLater}</div>
                      </div>
                    </div>
                  ) : (
                    <div className='w-20 h-20 border flex items-center justify-center'>
                      {logo.logoName === logoLocation.addLater ? (
                        <img
                          className='w-14 h-12'
                          src={`/assets/images/logo-to-be-submitted.webp`}
                          title=''
                          alt={logo.logoLocation}
                        />
                      ) : (
                        <NxtImage
                          className='inline-block max-h-full w-full h-full'
                          src={logoToShow}
                          alt=''
                          width={100}
                          height={100}
                        />
                      )}
                    </div>
                  )}
                </div>
                {logo.logoName !== 'Customize Later' && (
                  <div className='w-1/3 px-3'>
                    <div className='font-[600]'>Location</div>
                    <div className=''>{logo.logoLocation}</div>
                  </div>
                )}
                {logo.logoName !== 'Customize Later' && (
                  <div className='w-1/3 px-3'>
                    <div className='font-[600]'>Price</div>
                    <div className=''>
                      <Price value={logo.logoPrice} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className='flex flex-wrap justify-between -mx-3'>
          <div className='w-1/2 px-3'>
            <div className='font-[600]'>UNIT TOTAL</div>
            <div className=''>
              <Price value={item.totalPrice} />
            </div>
          </div>
          <div className='w-1/2 px-3'>
            <div className='font-[600]'>ESTIMATED PRICE</div>
            <div className=''>
              <Price value={item.totalPrice} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrD_InvoiceItem;
