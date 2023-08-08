import Price from '@appComponents/Price';
import NxtImage from '@appComponents/reUsable/Image';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2, useWindowDimensions_v2 } from '@hooks_v2/index';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
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

const YouMayAlsoLikeType5: React.FC<_TemplateProps> = ({ productsData }) => {
  const sliderRef = useRef<null | Slider>(null);
  const customerId = useTypedSelector_v2((state) => state.user.id);

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
    } else if (width <= 1024) {
      setFeaturedProductCarouselSetting({
        sliderSettings: {
          ...featuredProductCarouselSetting?.sliderSettings,
          slidesToShow: 3,
          infinite: true,
        },
        carouselCounter: 3,
      });
    } else if (productsData && productsData?.length <= 5 && width >= 1024) {
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
                  {productsData.map((product) => {
                    return (
                      <div key={product.id} className='slide-item'>
                        <div className='px-2'>
                          <div className='flex text-center lg:w-auto mb-6'>
                            <div className='relative pb-4 w-full'>
                              <div>
                                <Link
                                  key={product.id}
                                  href={`${encodeURIComponent(
                                    product.seName,
                                  )}.html`}
                                  className='relative'
                                >
                                  {/* Issue: Using functional components as child of <Link/> causes ref-warnings */}
                                  <a className='block'>
                                    <NxtImage
                                      src={product.image}
                                      alt={product.name}
                                      useNextImage={false}
                                      className='max-h-[348px] m-auto'
                                    />
                                  </a>
                                </Link>
                              </div>
                              <div>
                                <div className='mt-[10px] text-center hover:text-anchor-hover h-[50px] overflow-hidden line-clamp-2 block !font-bold text-sub-text mb-[10px]'>
                                  <Link
                                    key={product.id}
                                    href={`${encodeURIComponent(
                                      product.seName,
                                    )}.html`}
                                  >
                                    {product.name}
                                  </Link>
                                </div>
                                <div className='mt-[10px] text-small-text text-center'>
                                  <span className='font-semibold'>
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

export default YouMayAlsoLikeType5;
