import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React, { Fragment, useEffect } from 'react';
import { _ListingProps } from '../ProductListingType';
import TemplateThreeListing from '../productListingType3/components/TemplateThreeListing';

const ProductListingType6: React.FC<_ListingProps> = ({
  products,
  totalCount,
  productView,
  skuList,
  setShowFilter,
  colorChangeHandler,
  compareCheckBoxHandler,
}) => {
  const view = useTypedSelector_v2((state) => state.store.view);
  useEffect(() => {
    if (view == 'DESKTOP') {
      setShowFilter(true);
    } else {
      setShowFilter(false);
    }
  }, [view]);

  return (
    <>
      {/* <FreeBanner /> */}
      <section id='layout6' className='px-[10px] py-[5px]'>
        <div className='bg-[#ffffff]'>
          <div className='container mx-auto'>
            <div aria-labelledby='products-heading' className='mt-[20px]'>
              <h2 id='products-heading' className='sr-only'>
                {__pagesText.productListing.products}
              </h2>
              <div className='flex flex-wrap lg:ml-[-16px] lg:mr-[-16px]'>
                <div className='w-full lg:pl-[16px] lg:pr-[16px]'>
                  <div className='w-full border-t border-b pt-[15px] pb-[15px]'>
                    <span className='font-600'>
                      {totalCount} {__pagesText.productListing.totalCountresult}
                    </span>
                  </div>
                  <div className='mt-8 relative'>
                    <div className='relative w-full pb-6 -mb-6'>
                      <ul
                        role='list'
                        className={
                          productView === 'grid'
                            ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mb-8'
                            : 'grid grid-cols-1 gap-6 lg:gap-8 mb-8'
                        }
                      >
                        {products.map((product, index) => (
                          <Fragment key={index}>
                            <TemplateThreeListing
                              productView={productView}
                              skuList={skuList}
                              compareCheckBoxHandler={compareCheckBoxHandler}
                              product={product}
                              colorChangeHandler={colorChangeHandler}
                            />
                          </Fragment>
                        ))}
                      </ul>
                    </div>
                    {/* <div className='py-20 border-t border-t-gray-300 text-center'>
                      <div className='mb-8'>
                        You've seen {products.length} Products out of{' '}
                        {totalCount}
                      </div>
                      {totalCount > products.length && (
                        <button
                          type='submit'
                          onClick={loadMore}
                          className='btn btn-lg btn-secondary'
                        >
                          {__pagesText.productListing.loadMoreButton}
                        </button>
                      )}
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <ContactUs /> */}
    </>
  );
};

export default ProductListingType6;
