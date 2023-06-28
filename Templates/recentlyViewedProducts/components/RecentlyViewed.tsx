import { __pagesConstant } from '@constants/pages.constant';
import getLocation from '@helpers/getLocation';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import {
  FetchProductRecentlyViewed,
  InsertProductRecentlyViewed,
} from '@services/product.service';
import { _ProductsRecentlyViewedResponse } from '@templates/ProductDetails/productDetailsTypes/productDetail.res';
import { _ProductRecentlyViewedProps } from '@templates/recentlyViewedProducts/components/recentlyViewedComponents';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import ProductCard from './ProductCard';

const RecentlyViewed: React.FC<_ProductRecentlyViewedProps> = ({
  title,
  product,
}) => {
  const [recentlyViewedProduct, setRecentlyViewedProduct] = useState<
    Array<_ProductsRecentlyViewedResponse>
  >([]);

  const router = useRouter();

  const customerId = useTypedSelector_v2((state) => state.user.id);
  const { id: storeId, mediaBaseUrl } = useTypedSelector_v2(
    (state) => state.store,
  );
  const { productId } = useTypedSelector_v2((state) => state.product.selected);
  const [showProductImg, setShowProductImg] = useState();

  const [products] = useState(
    Array.isArray(recentlyViewedProduct)
      ? recentlyViewedProduct.map((productdata) => ({
          ...productdata,
          selected: productdata.image,
        }))
      : [],
  );
  const sliderRef = useRef<null | Slider>(null);

  const goToNextProduct = () => {
    sliderRef?.current?.slickNext();
  };

  const goToPrevProduct = () => {
    sliderRef?.current?.slickPrev();
  };

  useEffect(() => {
    addRecentlyViewedProduct().then((res) => {
      setRecentlyViewedProduct(res);
    });
  }, [productId, storeId]);

  const addRecentlyViewedProduct = async () => {
    const location = await getLocation();
    const pageUrl = router.query;
    let payloadObj = {
      recentViewModel: {
        productId: productId
          ? productId
          : product?.details?.id
          ? product.details.id
          : 0,
        customerId: customerId || 0,
        pageName: 'descriptionPage',
        pageUrl: `${pageUrl.slug}`,
        ipAddress: `${location.ip_address}`,
        recStatus: 'A',
      },
    };
    InsertProductRecentlyViewed(payloadObj);

    if (storeId) {
      let fetchRecentlyViewedPayload = {
        productId: productId
          ? productId
          : product?.details?.id
          ? product.details.id
          : 0,
        storeId: storeId,
        ipAddress: `${location.ip_address}`,
        customerId: customerId || 0,
        maximumItemsForFetch: 10,
      };

      return FetchProductRecentlyViewed(fetchRecentlyViewedPayload);
    }
    return [];
  };

  return (
    <>
      {recentlyViewedProduct?.length ? (
        // This is template for RecentlyViewed product component and need to change design accordingly
        <section className=''>
          <div className='container mx-auto'>
            <div className='bg-white pt-[40px] px-[5px] pb-[40px]'>
              <div className='w-full text-center  text-title-text pt-[20px] mb-[20px] font-bold text-primary'>
                {title}
              </div>
              <div className='relative' id='slider'>
                <div
                  className={`${
                    recentlyViewedProduct.length >
                    __pagesConstant._productAlike.carouselCounter
                      ? 'absolute'
                      : 'hidden'
                  }  top-1/2  -translate-y-1/2 z-10 flex items-center left-0`}
                >
                  <button
                    onClick={() => goToPrevProduct()}
                    className='flex justify-center items-center w-6 h-6 focus:outline-none text-black'
                  >
                    <span className='text-3xl leading-none  z-50 cursor-pointer material-icons-outlined slick-arrow '>
                      arrow_back_ios
                    </span>
                  </button>
                </div>
                <Slider
                  ref={(c) => (sliderRef.current = c)}
                  {...__pagesConstant._productDetails.recentlyViewed
                    .sliderSettings}
                >
                  {recentlyViewedProduct.map((product) => {
                    return <ProductCard product={product} />;
                  })}
                </Slider>
                <div
                  className={`${
                    recentlyViewedProduct.length >
                    __pagesConstant._productAlike.carouselCounter
                      ? 'absolute'
                      : 'hidden'
                  }  top-1/2  -translate-y-1/2 right-0 z-10 flex items-center`}
                >
                  <button
                    onClick={() => goToNextProduct()}
                    className='flex justify-center items-center w-6 h-6 focus:outline-none text-black'
                  >
                    <span className='text-3xl leading-none z-50 cursor-pointer material-icons-outlined slick-arrow'>
                      arrow_forward_ios
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        ''
      )}
    </>
  );
};

export default RecentlyViewed;
