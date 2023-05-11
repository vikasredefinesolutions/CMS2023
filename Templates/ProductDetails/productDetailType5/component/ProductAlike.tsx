import { __pagesConstant } from '@constants/pages.constant';
// import { _ProductAlikeProps } from '@templates/ProductDetails/components/productDetailsComponents';
import Image from 'appComponents_v2/reUsable/Image';
import Price from 'appComponents_v2/reUsable/Price';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import { _ProductAlikeProps } from './productDetailsComponents';

const ProductAlike: React.FC<_ProductAlikeProps> = ({
  title,
  products: productsData,
}) => {
  const [products] = useState(
    Array.isArray(productsData)
      ? productsData.map((productdata) => ({
          ...productdata,
          selected: productdata.image,
        }))
      : [],
  );

  const sliderRef = useRef<null | Slider>(null);

  const goToNextProduct = () => {
    sliderRef.current?.slickNext();
  };

  const goToPrevProduct = () => {
    sliderRef?.current?.slickPrev();
  };

  return (
    <>
      {products && (
        <section className='mainsection mt-[50px]'>
          <div className='container mx-auto'>
            <div className='w-full text-center font-[600] text-2xl-text font-title text-color-title mb-[16px]'>
              {title}
            </div>

            <div className='relative' id='slider'>
              <div
                className={`${
                  products.length >
                  __pagesConstant._productAlike.carouselCounter
                    ? 'absolute'
                    : 'hidden'
                } inset-y-0 top-1/2 -translate-x-3.5 lg:-translate-x-1/2 -trnaslate-y-1/2 z-10 flex items-center left-0`}
              >
                <button
                  onClick={() => goToPrevProduct()}
                  className='flex justify-center items-center w-6 h-6 focus:outline-none text-black'
                >
                  <span className='chevron-left ml-2 text-base material-symbols-outlined font-semibold '>
                    arrow_back_ios
                  </span>
                </button>
              </div>

              <Slider
                ref={(c) => (sliderRef.current = c)}
                {...__pagesConstant._productDetails.similarProducts
                  .sliderSettings}
              >
                {products.map((product) => {
                  return (
                    <div key={product.id} className='slide-item'>
                      <div className='px-2'>
                        <div className='flex text-center lg:w-auto mb-6'>
                          <div className='relative pb-4 w-full'>
                            <div className='w-full rounded-md overflow-hidden aspect-w-1 aspect-h-1 cursor-pointer'>
                              <Link
                                key={product.id}
                                href={`${encodeURIComponent(
                                  product.seName,
                                )}.html`}
                                className='relative underline min-h-[48px]'
                              >
                                <div>
                                  <Image
                                    title={product.name}
                                    src={product.image}
                                    alt={product.name}
                                    className='w-auto h-auto max-h-max'
                                  />
                                </div>
                              </Link>
                            </div>

                            <div className='mt-6 cursor-pointer'>
                              <Link
                                key={product.id}
                                href={`${encodeURIComponent(
                                  product.seName,
                                )}.html`}
                                className='relative underline min-h-[48px]'
                              >
                                <div
                                  title={product.name}
                                  className='text-anchor hover:text-anchor-hover underline h-11 text-ellipsis overflow-hidden line-clamp-2 text-[13px] tracking-[1.4px]'
                                >
                                  <span className='mt-1 text-anchor underline hover:text-anchor-hover whitespace-normal text-base'>
                                    {product.name}
                                  </span>
                                </div>
                              </Link>

                              <div className='mt-3 text-black text-base tracking-wider'>
                                <span className='font-semibold'>
                                  MSRP <Price value={product.msrp} />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
              <div
                className={`${
                  products.length >
                  __pagesConstant._productAlike.carouselCounter
                    ? 'absolute'
                    : 'hidden'
                } inset-y-0  top-1/2 -translate-x-3.5 lg:-translate-x-1/2 -trnaslate-y-1/2 right-0 z-10 flex items-center`}
              >
                <button
                  onClick={() => goToNextProduct()}
                  className='bg-white w-7 h-7 rounded-full shadow focus:outline-none'
                >
                  <span className='chevron-right -mr-1  text-base material-symbols-outlined font-semibold'>
                    arrow_forward_ios
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductAlike;
