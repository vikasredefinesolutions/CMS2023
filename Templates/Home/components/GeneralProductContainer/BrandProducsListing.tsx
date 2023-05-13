import Price from '@appComponents/Price';
import NxtImage from '@appComponents/reUsable/Image';
import { __pagesConstant } from '@constants/pages.constant';
import { newFetauredItemResponse } from '@definations/productList.type';
import Link from 'next/link';
import React, { useRef } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import Slider from 'react-slick';

interface _props {
  productsData: newFetauredItemResponse[];
}

const BrandProductListing: React.FC<_props> = ({ productsData }) => {
  console.log(productsData, 'productsData');
  const sliderRef = useRef<null | Slider>(null);

  const goToNextProduct = () => {
    sliderRef.current?.slickNext();
  };

  const goToPrevProduct = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <>
      {productsData === null ? (
        <></>
      ) : (
        <section className='mainsection mt-10'>
          <div className='container mx-auto'>
            <div className='relative'>
              <div className=''>
                <div
                  className={`${
                    productsData?.length >
                    __pagesConstant?.featuredProductCarousel?.carouselCounter
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
                  {...__pagesConstant?.featuredProductCarousel?.sliderSettings}
                >
                  {productsData.map((product) => {
                    return (
                      <div key={product.productId} className='slide-item'>
                        <div className='px-2'>
                          <div className='flex text-center lg:w-auto mb-6'>
                            <div className='relative pb-4 w-full'>
                              <div className='w-full rounded-md overflow-hidden aspect-w-1 aspect-h-1'>
                                <Link
                                  key={product.productId}
                                  href={`${encodeURIComponent(
                                    product.productSEName,
                                  )}.html`}
                                  className='relative'
                                >
                                  <div>
                                    {/* Issue: Using functional components as child of <Link/> causes ref-warnings */}
                                    <NxtImage
                                      src={product.imageUrl}
                                      alt={product.productName}
                                      className='w-auto h-auto max-h-max'
                                    />
                                  </div>
                                </Link>
                              </div>
                              <div className='mt-6'>
                                <div className='mt-1 text-anchor hover:text-anchor-hover h-[42px]'>
                                  <Link
                                    key={product.productId}
                                    href={`${encodeURIComponent(
                                      product.productSEName,
                                    )}.html`}
                                    className='text-anchor hover:text-anchor-hover underline  text-ellipsis overflow-hidden line-clamp-2 text-small-text bloc'
                                  >
                                    {product.productName}
                                  </Link>
                                </div>
                                <div className='mt-3 text-[#000000] text-base tracking-wider'>
                                  <span className='font-[600]'>
                                    {' '}
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
                    productsData.length >
                    __pagesConstant?.featuredProductCarousel?.carouselCounter
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
          </div>
        </section>
      )}
    </>
  );
};

export default BrandProductListing;
