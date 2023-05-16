import { newFetauredItemResponse } from '@definations/productList.type';
import { useTypedSelector_v2, useWindowDimensions_v2 } from '@hooks_v2/index';
import React, { useRef, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import Slider from 'react-slick';
import SingleProductListing from './SingleProductListing';

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
  const [currentProduct, setCurrentProduct] = useState<
    newFetauredItemResponse | undefined | null
  >(productsData?.length > 0 ? productsData[0] : null);
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

  const store = useTypedSelector_v2((state) => state.store);

  const { width } = useWindowDimensions_v2();

  // useEffect(() => {
  //   console.log(width, 'widthhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
  //   if (width == 768) {
  //     setFeaturedProductCarouselSetting({
  //       ...featuredProductCarouselSetting,
  //       sliderSettings: {
  //         ...featuredProductCarouselSetting?.sliderSettings,
  //         slidesToShow: 2,
  //       },
  //     });
  //   } else if (width == 480) {
  //     setFeaturedProductCarouselSetting({
  //       ...featuredProductCarouselSetting,
  //       sliderSettings: {
  //         ...featuredProductCarouselSetting?.sliderSettings,
  //         slidesToShow: 1,
  //       },
  //     });
  //   }
  // }, [width]);

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
                  {...featuredProductCarouselSetting}
                >
                  {productsData.map((product) => {
                    return (
                      <div key={product.productId} className='slide-item'>
                        <SingleProductListing
                          product={product}
                          productsData={productsData}
                        />
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
