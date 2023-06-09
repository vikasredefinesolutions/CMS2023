import Price from '@appComponents/Price';
import NxtImage from '@appComponents/reUsable/Image';
import { __pagesConstant } from '@constants/pages.constant';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import Link from 'next/link';
import React, { useRef } from 'react';
import Slider from 'react-slick';
import { _TemplateProps } from './youMayAlsoLike';

const YouMayAlsoLikeType5: React.FC<_TemplateProps> = ({ productsData }) => {
  const sliderRef = useRef<null | Slider>(null);
  const customerId = useTypedSelector_v2((state) => state.user.id);

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
            <div
              className={
                'w-full text-center font-[600] text-2xl-text font-title text-color-title mb-[16px]'
              }
            >
              {__pagesText.YouMayAlsoLike.YouMayAlsoLike}
            </div>
            <div className='relative'>
              <div className=''>
                <div
                  className={`${
                    productsData.length >
                    __pagesConstant._productAlike.carouselCounter
                      ? 'absolute'
                      : 'hidden'
                  } top-1/2 -translate-y-1/2 z-10 flex items-center left-0`}
                >
                  <button
                    onClick={() => goToPrevProduct()}
                    className='flex justify-center items-center w-6 h-6 focus:outline-none text-black'
                  >
                    <span className='text-3xl leading-none cursor-pointer material-icons-outlined slick-arrow'>
                      arrow_back_ios
                    </span>
                  </button>
                </div>
                <Slider
                  ref={(c) => (sliderRef.current = c)}
                  {...__pagesConstant._productDetails.similarProducts
                    .sliderSettings}
                >
                  {productsData.map((product) => {
                    return (
                      <div key={product.id} className='slide-item'>
                        <div className='px-2'>
                          <div className='flex text-center lg:w-auto mb-6'>
                            <div className='relative pb-4 w-full'>
                              <div className='w-full rounded-md overflow-hidden aspect-w-1 aspect-h-1'>
                                <Link
                                  key={product.id}
                                  href={`${encodeURIComponent(
                                    product.seName,
                                  )}.html`}
                                  className='relative'
                                >
                                  {/* Issue: Using functional components as child of <Link/> causes ref-warnings */}
                                  <a>
                                    <NxtImage
                                      src={product.image}
                                      alt={product.name}
                                      className='w-auto h-auto max-h-max'
                                    />
                                  </a>
                                </Link>
                              </div>
                              <div className='mt-6 mb-[30px]'>
                                <div className='mt-1 text-center hover:text-anchor-hover h-[50px] overflow-hidden line-clamp-2 block !font-bold text-xl mb-[10px]'>
                                  <Link
                                    key={product.id}
                                    href={`${encodeURIComponent(
                                      product.seName,
                                    )}.html`}
                                  >
                                    {product.name}
                                  </Link>
                                </div>
                                <div className='mt-3 text-[#415364] p-[5px] text-center text-base tracking-wider'>
                                  <span className='font-[600]'>
                                    {' '}
                                    {customerId
                                      ? __pagesText.productListing.PRICE
                                      : __pagesText.productListing.MSRP}
                                    <Price
                                      value={
                                        customerId
                                          ? product.lowPrice != 0
                                            ? product?.lowPrice
                                            : product.msrp
                                          : product.msrp
                                      }
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
                </Slider>
                <div
                  className={`${
                    productsData.length >
                    __pagesConstant._productAlike.carouselCounter
                      ? 'absolute'
                      : 'hidden'
                  }  top-1/2 -translate-y-1/2 right-0 z-10 flex items-center`}
                >
                  <button
                    onClick={() => goToNextProduct()}
                    className='flex justify-center items-center w-6 h-6 focus:outline-none text-black'
                  >
                    <span className='chevron-right text-3xl leading-none cursor-pointer material-icons-outlined slick-arrow'>
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

export default YouMayAlsoLikeType5;
