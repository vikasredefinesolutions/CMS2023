import NxtImage from '@appComponents/reUsable/Image';
import Price from '@appComponents/reUsable/Price';
import { _Store } from '@configs/page.config';
import { __pagesConstant } from '@constants/pages.constant';
import getLocation from '@helpers/getLocation';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import {
  FetchProductRecentlyViewed,
  InsertProductRecentlyViewed,
} from '@services/product.service';
import { _ProductsRecentlyViewedResponse } from '@templates/ProductDetails/productDetailsTypes/productDetail.res';
import { _ProductRecentlyViewedProps } from '@templates/recentlyViewedProducts/components/recentlyViewedComponents';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';

const RecentlyViewed: React.FC<_ProductRecentlyViewedProps> = ({
  title,
  product,
  storeCode,
}) => {
  const [recentlyViewedProduct, setRecentlyViewedProduct] = useState<
    Array<_ProductsRecentlyViewedResponse>
  >([]);

  const router = useRouter();

  const customerId = useTypedSelector_v2((state) => state.user.id);
  const { id: storeId } = useTypedSelector_v2((state) => state.store);

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
  }, [product?.details]);

  const addRecentlyViewedProduct = async () => {
    const location = await getLocation();
    const pageUrl = router.query;
    let payloadObj = {
      recentViewModel: {
        productId: product?.SEO?.productId || 0,
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
        productId: product?.SEO?.productId || 0,
        storeId: 4,
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
      {products.length ? (
        // This is template for RecentlyViewed product component and need to change design accordingly
        <section className='mainsection mt-10'>
          <div className='container mx-auto'>
            <div className='w-full text-center text-xl md:text-2xl lg:text-sub-title font-sub-title text-color-sub-title pt-5 mb-5'>
              {title}
            </div>
            <div className='relative' id='slider'>
              <div
                className={`${
                  products.length >
                  __pagesConstant._productAlike.carouselCounter
                    ? 'absolute'
                    : 'hidden'
                } inset-y-0 top-1/2 -translate-x-3.5 lg:-translate-x-1/2 -trnaslate-y-1/2 left-0 z-10 flex items-center`}
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
                {...__pagesConstant._productDetails.recentlyViewed
                  .sliderSettings}
              >
                {products.map((product) => {
                  return (
                    <>
                      <div key={product.id} className='slide-item '>
                        <div className={`px-2 border border-transparent p-1`}>
                          <div className='flex text-center lg:w-auto mb-6'>
                            <div className='relative pb-4 w-full'>
                              <div className='w-full  rounded-md overflow-hidden aspect-w-1 aspect-h-1 cursor-pointer '>
                                <Link
                                  key={product.id}
                                  href={`${encodeURIComponent(
                                    product.seName,
                                  )}.html?v=product-detail&altview=1`}
                                  className='relative underline min-h-[48px]'
                                >
                                  <div className='relative'>
                                    <NxtImage
                                      title={product.name}
                                      src={product.selected}
                                      alt={product.name}
                                      className='w-auto h-auto max-h-max'
                                    />
                                  </div>
                                </Link>
                              </div>
                              <div className='mt-6 cursor-pointer'>
                                <Link
                                  key={product.id}
                                  href={`${encodeURIComponent(
                                    product.seName,
                                  )}.html?v=product-detail&altview=1`}
                                  className='relative underline min-h-[48px]'
                                >
                                  <div className='w-full text-xl mb-3 h-14'>
                                    <span className='text-secondary text-xl font-bold cursor-pointer hover:text-anchor-hover'>
                                      {product.name}
                                    </span>
                                  </div>
                                </Link>

                                <div
                                  className={
                                    storeCode === _Store.type23
                                      ? 'text-anchor'
                                      : 'mt-3 text-black text-base tracking-wider'
                                  }
                                >
                                  <span
                                    className={
                                      storeCode === _Store.type23
                                        ? ''
                                        : 'mt-2 text-primary'
                                    }
                                  >
                                    {storeCode === _Store.type27 ? '' : 'MSRP'}
                                    <Price value={product.msrp} />
                                  </span>
                                </div>

                                <div className='flex justify-center mx-auto mt-4'>
                                  <a
                                    className='btn btn-primary'
                                    href={`${encodeURIComponent(
                                      product.seName,
                                    )}.html?v=product-detail&altview=1`}
                                    title=''
                                  >
                                    <span className='material-icons text-sm'>
                                      local_mall
                                    </span>
                                    <span className='ml-1'>ADD TO CART</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </Slider>
              <div
                className={`${
                  products.length >
                  __pagesConstant._productAlike.carouselCounter
                    ? 'absolute'
                    : 'hidden'
                } inset-y-0 top-1/2 -translate-x-3.5 lg:-translate-x-1/2 -trnaslate-y-1/2 right-0 z-10 flex items-center`}
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
        </section>
      ) : (
        ''
      )}
    </>
  );
};

export default RecentlyViewed;
