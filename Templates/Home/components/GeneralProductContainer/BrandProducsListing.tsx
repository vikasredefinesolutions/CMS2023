import FeaturedSkeleton from '@appComponents/Loading/Skeleton';
import { newFetauredItemResponse } from '@definations/productList.type';
import { useTypedSelector_v2, useWindowDimensions_v2 } from '@hooks_v2/index';
import { _SelectedTab } from '@templates/ProductDetails/productDetailsTypes/storeDetails.res';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import Slider from 'react-slick';
import SlugSingleProductListing from './SlugSingleProductListing';

interface _props {
  productsData: _SelectedTab;
  showBorder: string;
  customMessage: string;
  showProductName: string;
  showSplitProducts: string;
  showButton: string;
  showPrice: string;
  showBrandLogo: string;
  productToDisplay: string;
  featuredItems: { [x: string]: newFetauredItemResponse[] };
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

const BrandProductListing: React.FC<_props> = (props) => {
  const {
    productsData,
    showBorder,
    customMessage,
    showProductName,
    showSplitProducts,
    showButton,
    showPrice,
    showBrandLogo,
    featuredItems,
  } = props;

  const router = useRouter();

  const { width } = useWindowDimensions_v2();
  const Settings = {
    sliderSettings: {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: width <= 418 ? 1 : width <= 768 ? 2 : width <= 1024 ? 3 : 4,
      slidesToScroll: 1,
      arrows: false,
    },
    carouselCounter:
      width <= 418 ? 1 : width <= 768 ? 2 : width <= 1024 ? 3 : 4,
  };

  const [featuredProductCarouselSetting, setFeaturedProductCarouselSetting] =
    useState<_carouselProps>(Settings);

  const [brandsData, setBrandsData] = useState<newFetauredItemResponse[] | []>(
    [],
  );

  const sliderRef = useRef<null | Slider>(null);

  // ** redux
  const storeId = useTypedSelector_v2((state) => state.store.id);

  // Fetching products by brand
  useEffect(() => {
    if (featuredItems && Object.keys(featuredItems).length > 0) {
      setBrandsData(featuredItems[productsData?.tabName]);
    }
  }, [productsData?.tabName, storeId, router?.query['slug-id']]);

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
  }, [width, brandsData]);

  useEffect(() => {
    if (brandsData?.length < 4) {
      setFeaturedProductCarouselSetting({
        sliderSettings: {
          ...featuredProductCarouselSetting?.sliderSettings,
          infinite: false,
        },
        carouselCounter: featuredProductCarouselSetting?.carouselCounter,
      });
    } else {
      setFeaturedProductCarouselSetting({
        sliderSettings: {
          ...featuredProductCarouselSetting?.sliderSettings,
          infinite: true,
        },
        carouselCounter: featuredProductCarouselSetting?.carouselCounter,
      });
    }
  }, [brandsData]);

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
        <section className='mainsection'>
          <div className='container mx-auto'>
            <div className='relative'>
              <div className=''>
                <div
                  className={`${
                    brandsData?.length >
                    featuredProductCarouselSetting?.carouselCounter
                      ? 'absolute'
                      : 'hidden'
                  } inset-y-10 left-0 z-10 flex items-center`}
                >
                  <button
                    onClick={() => goToPrevProduct()}
                    className='bg-white -ml-2 lg:-ml-4 flex justify-center items-center w-10 h-10 rounded-full shadow focus:outline-none'
                  >
                    <span className='chevron-left ml-1 text-base material-symbols-outlined font-semibold '>
                      arrow_back_ios
                    </span>
                  </button>
                </div>
                <Slider
                  ref={(c) => (sliderRef.current = c)}
                  {...featuredProductCarouselSetting.sliderSettings}
                >
                  {brandsData && brandsData?.length
                    ? brandsData?.map((product) => {
                        return (
                          <Fragment key={product?.productId}>
                            <div key={product.productId} className='slide-item'>
                              <SlugSingleProductListing
                                showBorder={showBorder}
                                product={product}
                                customMessage={customMessage}
                                showProductName={showProductName}
                                showSplitProducts={showSplitProducts}
                                showButton={showButton}
                                showPrice={showPrice}
                                showBrandLogo={showBrandLogo}
                              />
                            </div>
                          </Fragment>
                        );
                      })
                    : Array.from(
                        Array(
                          featuredProductCarouselSetting?.sliderSettings
                            ?.slidesToShow,
                        ),
                      ).map((_, index) => {
                        return (
                          <div key={index} className='slide-item'>
                            <div className='px-2'>
                              <div className='w-full'>
                                <div className='text-center relative border border-gray-200 border-solid bg-white relative'>
                                  <FeaturedSkeleton />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                </Slider>
                <div
                  className={`${
                    brandsData?.length >
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
