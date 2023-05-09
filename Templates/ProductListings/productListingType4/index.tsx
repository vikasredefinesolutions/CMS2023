// import React from 'react';
// import { _ListingProps } from '../ProductListingType';

// const ProductListingType4: React.FC<_ListingProps> = () => {
//   return <></>;
// };

// export default ProductListingType4;

/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
// import { GetlAllProductList, _ListingProps } from '../productListing';

import { __pagesText } from '@constants/pages.text';
import { _ListingProps } from '../ProductListingType';
import SideFilter from '../productListingType1/components/SideFilter';
import FilterChips from './components/FilterChips';
import TemplateFourFilterBar from './components/TemplateFourFilterBar';
import TemplateFourListing from './components/TemplateFourListing';

const ProductListingType4: React.FC<_ListingProps> = ({
  slug,
  filters,
  products,
  checkedFilters,
  totalCount,
  showFilter,
  showSortMenu,
  productView,
  skuList,
  setShowSortMenu,
  setShowFilter,
  setProductView,
  colorChangeHandler,
  handleChange,
  loadMore,
  sortProductJson,
  clearFilters,
  compareCheckBoxHandler,
  seType,
  brandId,
  sortingType,
}) => {
  return (
    <>
      <section id=''>
        <div className='bg-[#ffffff]'>
          <div className='container mx-auto'>
            <div aria-labelledby='products-heading' className='mt-[20px]'>
              <h2 id='products-heading' className='sr-only'>
                {__pagesText.productListing.products}
              </h2>
              <div
                className='flex flex-wrap lg:ml-[-16px] lg:mr-[-16px]'
                x-data='{ open2 : false }'
              >
                <div
                  className='w-full lg:w-3/12 lg:pl-[16px] lg:pr-[16px]'
                  x-data='{ open: false }'
                >
                  <div className='lg:hidden border-b border-b-neutral-300 p-2 sticky top-0 left-0 bg-primary flex items-center justify-between text-[#ffffff] z-1'>
                    <div className='text-lg font-semibold text-[#ffffff]'>
                      Filters
                    </div>
                    <div>
                      <span
                        className='material-symbols-outlined flex text-white'
                        onClick={() => setShowFilter(!showFilter)}
                      >
                        {showFilter ? 'remove' : 'add'}
                      </span>
                    </div>
                  </div>

                  <div className='relative lg:block'>
                    <SideFilter
                      filters={filters}
                      handleChange={handleChange}
                      checkedFilters={checkedFilters}
                    />
                  </div>
                </div>
                <div className='w-full lg:w-9/12 lg:pl-[16px] lg:pr-[16px]'>
                  <TemplateFourFilterBar
                    {...{
                      totalCount,
                      showSortMenu,
                      sortProductJson,
                      sortOpenHandler: setShowSortMenu,
                      setProductView,
                      productView,
                      setShowFilter,
                      sortingType: sortingType || 0,
                    }}
                  />

                  <FilterChips
                    {...{ clearFilters, checkedFilters, handleChange }}
                  />
                  <div className='mt-[20px] relative'>
                    <div className='relative w-full pb-6 -mb-6'>
                      <ul
                        role='list'
                        className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mb-8'
                      >
                        {products.map((product, index) => (
                          <Fragment key={index}>
                            <TemplateFourListing
                              productView={productView}
                              skuList={skuList}
                              compareCheckBoxHandler={compareCheckBoxHandler}
                              product={product}
                              colorChangeHandler={colorChangeHandler}
                              index={index}
                            />
                          </Fragment>
                        ))}
                      </ul>
                    </div>
                    <div className='pt-[16px] pb-[16px] text-center'>
                      <div className=''>
                        <div className='text-extra-small-text tracking-[1.4px]'>
                          You've viewed {products.length} of {totalCount}{' '}
                          products
                        </div>
                        <div className='h-[2px] w-full max-w-[250px] mx-auto bg-[#808080] mt-2'>
                          <div
                            className='bg-secondary h-full'
                            style={{
                              width: `${(products.length * 100) / totalCount}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      {products.length < totalCount && (
                        <button
                          onClick={loadMore}
                          type='submit'
                          className='mt-[16px] btn btn-md btn-secondary tracking-[1.4px] font-normal w-full max-w-[550px] mx-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 pt-[19px] pb-[19px] md:pl-[70px] md:pr-[70px] pl-[16px] pr-[16px] bg-[#ffa400] hover:bg-[#f18a00]'
                        >
                          <span className='inline-block w-[20px] h-[20px]'>
                            <img
                              className='max-h-full'
                              src='assets/images/load-more-arrow.webp'
                              alt=''
                            />
                          </span>
                          <span className=''>
                            {__pagesText.productListing.loadMoreButton}
                          </span>
                          <span className='inline-block w-[20px] h-[20px]'>
                            <img
                              className='max-h-full'
                              src='assets/images/load-more-arrow.webp'
                              alt=''
                            />
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductListingType4;
