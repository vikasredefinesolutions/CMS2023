import { __pagesText } from '@constants/pages.text';
import { _TopRatedProductsProps } from '@templates/ProductDetails/Components/productDetailsComponents';
import NxtImage from 'appComponents_v2/reUsable/Image';
import Price from 'appComponents_v2/reUsable/Price';
import Link from 'next/link';
import React from 'react';

const TopRatedProducts: React.FC<_TopRatedProductsProps> = ({
  title,
  suggestedProducts,
}) => {
  return (
    <section className='mainsection mt-10'>
      <div className='container mx-auto'>
        <div className='w-full text-center text-2xl md:text-3xl lg:text-title font-title text-color-title text-color-title mb-4'>
          {title}
        </div>
        <div
          className='relative flex justify-center max-w-full max-h-[50px]'
          id='slider'
        >
          {suggestedProducts.map((product) => {
            return (
              <div
                key={product.sku}
                className='slide-item'
                onClick={() => 'handle click'}
              >
                <div className='px-2'>
                  <div className='flex text-center lg:w-auto mb-6'>
                    <div className='relative pb-4'>
                      <div className='w-full bg-gray-200 rounded-md overflow-hidden aspect-w-1 aspect-h-1'>
                        <Link
                          href={`/${product.seName}.html`}
                          className='relative'
                        >
                          <a>
                            <NxtImage
                              src={product.image}
                              alt={product.name}
                              className='w-auto h-auto max-h-max'
                            />
                          </a>
                        </Link>
                      </div>
                      <div className='mt-6'>
                        <div className='mt-1 text-anchor hover:text-anchor-hover'>
                          <Link
                            href={`/${product.seName}.html`}
                            className='relative underline'
                          >
                            <>
                              <span className='absolute inset-0'></span>
                              {product.name}
                            </>
                          </Link>
                        </div>
                        <div className='mt-3 text-black text-base tracking-wider'>
                          <span className='font-semibold'>
                            {__pagesText.productInfo.msrp}
                            <Price
                              value={undefined}
                              prices={{
                                msrp: +product.msrp,
                                salePrice: +product.salePrice,
                              }}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopRatedProducts;
