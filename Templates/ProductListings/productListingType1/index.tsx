/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
import ContactUs from '@appComponents/reUsable/ContactUs';
import { __pagesText } from '@constants/pages.text';
import React, { Fragment } from 'react';
// import { GetlAllProductList, _ListingProps } from '../productListing';

import { GetlAllProductList, _ListingProps } from '../ProductListingType';
import FilterChips from './components/FilterChips';
import SideFilter from './components/SideFilter';
import TemplateOneFilterBar from './components/TemplateOneFilterBar';
import TemplateOneListing from './components/TemplateOneListing';

const ProductListingType1: React.FC<_ListingProps> = ({
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
        <div className='bg-white'>
          <div className='container mx-auto '>
            <div
              aria-labelledby='products-heading'
              className='mt-8 overflow-hidden'
            >
              <h2 id='products-heading' className='sr-only'>
                Products
              </h2>

              <div className='flex flex-wrap ml-[-16px] mr-[-16px]'>
                <div className={'w-full lg:w-3/12 pl-[16px] pr-[16px]'}>
                  {filters.length > 0 && (
                    <SideFilter
                      filters={filters}
                      handleChange={handleChange}
                      checkedFilters={checkedFilters}
                    />
                  )}
                </div>
                <div className={'w-full lg:w-9/12 pl-[16px] pr-[16px]'}>
                  <TemplateOneFilterBar
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
                  <div className='mt-[32px] relative' id='gridview'>
                    <div className='relative w-full pb-[24px] -mb-6'>
                      <ul
                        role='list'
                        className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mb-[32px]'
                      >
                        {products.map(
                          (product: GetlAllProductList, index: number) => (
                            <Fragment key={index}>
                              <TemplateOneListing
                                brandId={brandId}
                                skuList={skuList}
                                product={product}
                                seType={seType}
                                colorChangeHandler={colorChangeHandler}
                              />
                            </Fragment>
                          ),
                        )}
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
      <ContactUs />
    </>
  );
};

export default ProductListingType1;
