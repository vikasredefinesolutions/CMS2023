import Image from '@appComponents/reUsable/Image';
import Price from '@appComponents/reUsable/Price';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { WishlistType } from '@services/wishlist';
import Link from 'next/link';
import React from 'react';
import { _globalStore } from 'store.global';
import { _Wishlist } from '../Wishlist';

let mediaBaseUrl = _globalStore.blobUrl;

const WishlistType1: React.FC<_Wishlist> = ({
  wishlist,
  removeWishlistHandler,
}) => {
  const store = useTypedSelector_v2((state) => state.store);
  mediaBaseUrl = mediaBaseUrl || store.mediaBaseUrl;

  return (
    <div className='container mx-auto'>
      <div className='text-2xl-text font-[600] text-center pt-[20px] pb-[10px]'>
        {__pagesText.Wishlist.wishlist}
      </div>
      {wishlist && wishlist?.length ? (
        <div className='flex flex-wrap mx-[-15px] mt-[30px] mb-[30px]'>
          {wishlist.map((list: WishlistType) => (
            <div
              key={`${list.id}`}
              className='w-full sm:w-1/2 lg:w-1/4 px-[15px]'
            >
              <div className='border border-[#f0f0f0] text-default-text mb-[20px]'>
                <div className='pt-[10px] pb-[5px] flex items-center justify-center'>
                  <Link
                    key={list.productId}
                    href={`${origin}/${list.seName}.html?v=product-detail&altview=1`}
                    className='relative underline min-h-[48px]'
                  >
                    <a className='w-full cursor-pointer'>
                      <Image
                        src={
                          mediaBaseUrl + list && list?.colorLogoUrl
                            ? list.colorLogoUrl
                            : ''
                        }
                        className=''
                        alt='wishlist'
                      />
                    </a>
                  </Link>
                </div>
                <div className='px-[15px] text-center'>
                  <div className='mb-[10px]'>
                    <Link
                      key={list.productId}
                      href={`${origin}/${list.seName}.html?v=product-detail&altview=1`}
                    >
                      <a className='text-anchor h-[40px] block overflow-hidden'>
                        {list.productName}
                      </a>
                    </Link>
                  </div>
                  <div className='flex flex-wrap justify-center items-center mt-[5px] mb-[10px]'>
                    <div className=''>{__pagesText.productInfo.price}</div>
                    <div className='font-[600]'>
                      <Price
                        value={undefined}
                        prices={{
                          msrp: list.price,
                          salePrice: list.price,
                        }}
                      />
                    </div>
                  </div>
                  <div className='mb-[10px] flex flex-wrap justify-center items-center gap-2.5'>
                    <Link
                      key={list.productId}
                      href={`${origin}/${list.seName}.html?v=product-detail&altview=1`}
                    >
                      <a className='btn btn-sm btn-secondary'>View</a>
                    </Link>

                    <button
                      title='Remove'
                      className='btn btn-sm btn-secondary'
                      onClick={() => removeWishlistHandler(list.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='py-[30px] lg:py-[100px]'>
          <div className='text-2xl-text'>
            {__pagesText.Wishlist.emptyWishlistEmptyTitle}
          </div>
          <div className='text-title-text mt-[10px]'>
            {__pagesText.Wishlist.emptyWishlistEmptyDescription}
          </div>

          <div className='text-title-text mt-[10px]'>
            {__pagesText.Wishlist.notToWorry}
          </div>
          <div className='mt-[20px]'>
            <Link href='/' passHref>
              <a className='btn btn-md btn-secondary'>
                {__pagesText.Wishlist.startShopping}
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistType1;
