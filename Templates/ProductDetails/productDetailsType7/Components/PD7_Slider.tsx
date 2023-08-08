import Price from '@appComponents/Price';
import NxtImage from '@appComponents/reUsable/Image';
import { _ProductsAlike } from '@definations/APIs/productDetail.res';
import { useWindowDimensions_v2 } from '@hooks_v2/index';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';

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

interface _Props {
  products: _ProductsAlike[] | null;
}

const PD7_Slider: React.FC<_Props> = ({ products }) => {
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
    } else if (products && products?.length <= 5 && width >= 768) {
      setFeaturedProductCarouselSetting({
        sliderSettings: {
          ...featuredProductCarouselSetting?.sliderSettings,
          slidesToShow: 5,
          infinite: false,
        },
        carouselCounter: 5,
      });
    } else if (products && products?.length >= 5 && width <= 1024) {
      setFeaturedProductCarouselSetting({
        sliderSettings: {
          ...featuredProductCarouselSetting?.sliderSettings,
          slidesToShow: 3,
          infinite: true,
        },
        carouselCounter: 3,
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
  }, [width, products]);

  const goToNextProduct = () => {
    sliderRef.current?.slickNext();
  };

  const goToPrevProduct = () => {
    sliderRef.current?.slickPrev();
  };

  if (!products || products.length === 0) return null;

  return (
    <section
      className={`mainsection mt-10 ${
        products?.length <= 5 && width >= 768
          ? 'you-may-also-like-slider-2'
          : ''
      }`}
    >
      <div className='container mx-auto'>
        <div className='text-center text-sub-text pb-[20px] uppercase font-bold'>
          Related Products
        </div>
        <div className='relative'>
          <div className=''>
            <div
              className={`${
                products.length >
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
              {products.map((item) => {
                return (
                  <div key={item.id} className='slide-item'>
                    <div className='px-2'>
                      <div className='relative text-center w-full mb-[20px]'>
                        <div className='w-full p-[10px]'>
                          <Link
                            href={`/${item.seName}.html`}
                            className='relative'
                          >
                            <a
                              className='block'
                              title={item.name}
                              href={`/${item.seName}.html`}
                            >
                              <NxtImage
                                src={item.image}
                                alt={item.name}
                                className='max-h-[348px] m-auto cursor-pointer'
                              />
                            </a>
                          </Link>
                        </div>
                        <div className='relative px-[15px]'>
                          <div className='mb-[10px] mt-[10px] h-[46px] text-anchor hover:text-anchor-hover text-default-text'>
                            <Link
                              href={`/${item.seName}.html`}
                              className='relative'
                            >
                              <a className='!font-bold uppercase'>
                                {item.name}
                              </a>
                            </Link>
                          </div>
                          <div className='mb-[12px] text-medium-text'>
                            <span className=''>
                              <Price value={item.msrp} />
                            </span>
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
  );
};

export default PD7_Slider;
