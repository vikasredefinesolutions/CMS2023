import { __pagesConstant } from '@constants/pages.constant';
import { __pagesText } from '@constants/pages.text';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import Slider from 'react-slick';
import ProductCardType3 from './ProductCardType3';
import { _TemplateProps } from './youMayAlsoLike';

const YouMayAlsoLikeType3: React.FC<_TemplateProps> = ({ productsData }) => {
  const sliderRef = useRef<null | Slider>(null);

  const router = useRouter();

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
                'w-full text-center text-title-text md:text-sub-text lg:text-title-text pt-[20px] mb-[20px] font-bold text-primary'
              }
            >
              <span>{__pagesText.YouMayAlsoLike.YouMayAlsoLike}</span>
            </div>
            <div className='relative'>
              <div className=''>
                <div
                  className={`${
                    productsData.length >
                    __pagesConstant._productAlike.carouselCounter
                      ? 'absolute'
                      : 'hidden'
                  } top-1/2 -translate-x-3.5 lg:-translate-x-1/2 -trnaslate-y-1/2 z-10 flex items-center left-0`}
                >
                  <button
                    onClick={() => goToPrevProduct()}
                    className='flex justify-center items-center w-6 h-6 focus:outline-none text-black'
                  >
                    <span className='text-3xl leading-none absolute top-1/2 -translate-y-1/2 left-0 z-50 cursor-pointer material-icons-outlined slick-arrow'>
                      arrow_back_ios
                    </span>
                  </button>
                </div>
                <Slider
                  ref={(c) => (sliderRef.current = c)}
                  {...__pagesConstant._productDetails.similarProducts
                    .sliderSettings}
                >
                  {productsData.map((product) => (
                    <ProductCardType3 product={product} key={product.id} />
                  ))}
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
                    <span className='chevron-right text-3xl leading-none absolute top-1/2 -translate-y-1/2 left-0 z-50 cursor-pointer material-icons-outlined slick-arrow'>
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

export default YouMayAlsoLikeType3;
