import Price from '@appComponents/Price';
import NxtImage from '@appComponents/reUsable/Image';
import { _Store } from '@configs/page.config';
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

const YouMayAlsoLikeType1: React.FC<_TemplateProps> = ({ productsData }) => {
  const sliderRef = useRef<null | Slider>(null);
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const storeCode = useTypedSelector_v2((state) => state.store.code);

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

  const priceNTextToShow = ({
    msrp,
    lowPrice,
  }: {
    msrp: number;
    lowPrice: number;
  }): { price: number; text: string } => {
    if (storeCode === _Store.type4) {
      return {
        text: __pagesText.productListing.MSRP,
        price: msrp,
      };
    }

    if (customerId) {
      const priceToShow = lowPrice !== 0 ? lowPrice : msrp;

      return {
        text: __pagesText.productListing.PRICE,
        price: priceToShow,
      };
    }

    return { text: __pagesText.productListing.MSRP, price: msrp };
  };

  return (
    <>
      {productsData === null ? (
        <></>
      ) : (
        <section
          className={`mainsection  ${
            productsData?.length <= 5 && width >= 1024
              ? 'you-may-also-like-slider-2'
              : ''
          }`}
        >
          <div
            className={`container mx-auto ${
              storeCode === 'CYX' ? '' : ''
            } `}
          >
            <div className={`${storeCode === 'CYX' ? 'bg-white pt-10' : ''}`}>
              <div
                className={
                  'w-full text-center font-[600] text-2xl-text font-title text-color-title pb-[20px] pt-[20px] description-title bg-[#ffffff]'
                }
              >
                {__pagesText.YouMayAlsoLike.YouMayAlsoLike}
              </div>
              <div className='relative bg-[#ffffff]'>
                <div className=''>
                  <div
                    className={`${
                      productsData.length >
                      featuredProductCarouselSetting?.carouselCounter
                        ? 'absolute'
                        : 'hidden'
                    } top-1/2 -trnaslate-y-1/2 z-10 flex items-center left-0`}
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
                                <div className='w-full rounded-md overflow-hidden aspect-w-1 aspect-h-1'>
                                  <Link
                                    key={product.id}
                                    href={`${encodeURIComponent(
                                      product.seName,
                                    )}.html`}
                                    className='relative'
                                    title={product.name}
                                  >
                                    {/* Issue: Using functional components as child of <Link/> causes ref-warnings */}
                                    <a>
                                      <NxtImage
                                        src={product.image}
                                        alt={product.name}
                                        useNextImage={false}
                                        className='max-h-[348px] !inline-black m-auto'
                                      />
                                    </a>
                                  </Link>
                                </div>
                                <div className='mt-6'>
                                  <div className='mt-1 text-anchor hover:text-anchor-hover h-[42px] underline'>
                                    <Link
                                      key={product.id}
                                      title={product.name}
                                      href={`${encodeURIComponent(
                                        product.seName,
                                      )}.html`}
                                      className='text-anchor hover:text-anchor-hover underline  text-ellipsis overflow-hidden underline line-clamp-2 text-small-text bloc'
                                    >
                                      {product.name}
                                    </Link>
                                  </div>
                                  <div className='mt-3 text-[#000000] text-base tracking-wider'>
                                    <span className='font-[600]'>
                                      {
                                        priceNTextToShow({
                                          msrp: product.msrp,
                                          lowPrice: product.lowPrice,
                                        }).text
                                      }
                                      <Price
                                        value={
                                          priceNTextToShow({
                                            msrp: product.msrp,
                                            lowPrice: product.lowPrice,
                                          }).price
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
                    }  top-1/2 -trnaslate-y-1/2 right-0 z-10 flex items-center`}
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
          </div>
        </section>
      )}
    </>
  );
};

export default YouMayAlsoLikeType1;
