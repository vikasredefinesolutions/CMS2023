import { __pagesText } from '@constants/pages.text';
import { useWindowDimensions_v2 } from '@hooks_v2/index';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import ProductCard from './ProductCard';
import { _TemplateProps } from './youMayAlsoLike';

interface _carouselProps {
  sliderSettings: {
    dots: boolean;
    infinite: boolean;
    speed: number;
    slidesToShow: number;
    slidesToScroll: number;
    arrows: boolean;
  };
  carouselCounter: number;
}

const YouMayAlsoLikeType2: React.FC<_TemplateProps> = ({ productsData }) => {
  const sliderRef = useRef<null | Slider>(null);

  const { width } = useWindowDimensions_v2();
  const Settings = {
    sliderSettings: {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: width <= 418 ? 1 : width <= 768 ? 2 : width <= 1024 ? 3 : 5,
      slidesToScroll: 1,
      arrows: false,
    },
    carouselCounter:
      width <= 418 ? 1 : width <= 768 ? 2 : width <= 1024 ? 3 : 5,
  };

  const [featuredProductCarouselSetting, setFeaturedProductCarouselSetting] =
    useState<_carouselProps>(Settings);

  // useEffect(() => {
  //   if (productsData && productsData?.length < 5 && width >= 1024) {
  //     setFeaturedProductCarouselSetting({
  //       sliderSettings: {
  //         ...featuredProductCarouselSetting?.sliderSettings,
  //         infinite: false,
  //       },
  //       carouselCounter: featuredProductCarouselSetting?.carouselCounter,
  //     });
  //   } else {
  //     setFeaturedProductCarouselSetting({
  //       sliderSettings: {
  //         ...featuredProductCarouselSetting?.sliderSettings,
  //         infinite: true,
  //       },
  //       carouselCounter: featuredProductCarouselSetting?.carouselCounter,
  //     });
  //   }
  // }, [productsData, width]);

  useEffect(() => {
    if (width <= 480) {
      setFeaturedProductCarouselSetting({
        sliderSettings: {
          ...featuredProductCarouselSetting?.sliderSettings,
          slidesToShow: 1,
          infinite: true,
        },
        carouselCounter: 1,
      });
    } else if (width <= 768) {
      setFeaturedProductCarouselSetting({
        sliderSettings: {
          ...featuredProductCarouselSetting?.sliderSettings,
          slidesToShow: 2,
          infinite: true,
        },
        carouselCounter: 2,
      });
    } else if (width <= 1024) {
      setFeaturedProductCarouselSetting({
        sliderSettings: {
          ...featuredProductCarouselSetting?.sliderSettings,
          slidesToShow: 3,
          infinite: true,
        },
        carouselCounter: 3,
      });
    } else if (productsData && productsData?.length < 5 && width >= 1024) {
      setFeaturedProductCarouselSetting({
        sliderSettings: {
          ...featuredProductCarouselSetting?.sliderSettings,
          slidesToShow: 5,
          infinite: false,
        },
        carouselCounter: 5,
      });
    } else {
      setFeaturedProductCarouselSetting({
        sliderSettings: {
          ...featuredProductCarouselSetting?.sliderSettings,
          slidesToShow: 5,
          infinite: true,
        },
        carouselCounter: 5,
      });
    }
  }, [width, productsData]);

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
        <section
          className={`mainsection mt-10 ${
            productsData?.length <= 5 && width >= 1024
              ? 'you-may-also-like-slider-2'
              : ''
          }`}
        >
          <div className='container mx-auto'>
            <div
              className={
                'pkhg-featured-title w-full text-center font-[600] text-2xl-text font-title text-color-title mb-[35px]'
              }
            >
              <span>{__pagesText.YouMayAlsoLike.YouMayAlsoLike}</span>
            </div>
            <div className='relative'>
              <div className=''>
                <div
                  className={`${
                    productsData.length >
                    featuredProductCarouselSetting?.carouselCounter
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
                  {...featuredProductCarouselSetting.sliderSettings}
                >
                  {productsData.map((product, index) => {
                    return (
                      <Fragment key={product?.id}>
                        <ProductCard product={product} />
                      </Fragment>
                    );
                  })}
                </Slider>
                <div
                  className={`${
                    productsData.length >
                    featuredProductCarouselSetting?.carouselCounter
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

export default YouMayAlsoLikeType2;
