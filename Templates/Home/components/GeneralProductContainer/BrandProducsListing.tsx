import { newFetauredItemResponse } from '@definations/productList.type';
import { useWindowDimensions_v2 } from '@hooks_v2/index';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import Slider from 'react-slick';
import SingleProductListing from './SingleProductListing';
import SlugSingleProductListing from './SlugSingleProductListing';

interface _props {
  productsData: newFetauredItemResponse[];
}
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

const BrandProductListing: React.FC<_props> = ({ productsData }) => {
  const [featuredProductCarouselSetting, setFeaturedProductCarouselSetting] =
    useState<_carouselProps>({
      sliderSettings: {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
      },
      carouselCounter: 4,
    });
  const router = useRouter();

  const { width } = useWindowDimensions_v2();

  useEffect(() => {
    if (width <= 480) {
      setFeaturedProductCarouselSetting({
        sliderSettings: {
          ...featuredProductCarouselSetting?.sliderSettings,
          slidesToShow: 1,
        },
        carouselCounter: 1,
      });
    } else if (width <= 768) {
      setFeaturedProductCarouselSetting({
        sliderSettings: {
          ...featuredProductCarouselSetting?.sliderSettings,
          slidesToShow: 2,
        },
        carouselCounter: 2,
      });
    } else if (width <= 1024) {
      setFeaturedProductCarouselSetting({
        sliderSettings: {
          ...featuredProductCarouselSetting?.sliderSettings,
          slidesToShow: 3,
        },
        carouselCounter: 3,
      });
    } else {
      setFeaturedProductCarouselSetting({
        sliderSettings: {
          ...featuredProductCarouselSetting?.sliderSettings,
          slidesToShow: 4,
        },
        carouselCounter: 4,
      });
    }
  }, [width]);

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
                    featuredProductCarouselSetting?.carouselCounter
                      ? 'absolute'
                      : 'hidden'
                  } inset-y-10 left-0 z-10 flex items-center`}
                >
                  <button
                    onClick={() => goToPrevProduct()}
                    className='bg-white -ml-2 lg:-ml-4 flex justify-center items-center w-10 h-10 rounded-full shadow focus:outline-none'
                  >
                    <span className='chevron-left mr-1 text-base material-symbols-outlined font-semibold '>
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
                      <>
                        {router?.query?.slug == 'adidas-collection.html' ? (
                          <div key={product.productId} className='slide-item'>
                            <SlugSingleProductListing product={product} />
                          </div>
                        ) : (
                          <div key={product.productId} className='slide-item'>
                            <SingleProductListing product={product} />
                          </div>
                        )}
                      </>
                    );
                  })}
                </Slider>
                <div
                  className={`${
                    productsData.length >
                    featuredProductCarouselSetting?.carouselCounter
                      ? 'absolute'
                      : 'hidden'
                  } inset-y-0 right-0 z-10 flex items-center`}
                >
                  <button
                    onClick={() => goToNextProduct()}
                    className='bg-white -mr-2 lg:-mr-4 flex justify-center items-center w-10 h-10 rounded-full shadow focus:outline-none'
                  >
                    <span className='chevron-right ml-1  text-base material-symbols-outlined font-semibold'>
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
