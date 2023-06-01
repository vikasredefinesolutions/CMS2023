/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
import { __pagesText } from '@constants/pages.text';
import React, { Fragment, useEffect, useRef } from 'react';
// import { GetlAllProductList, _ListingProps } from '../productListing';

import Home from '@templates/Home';
import { GetlAllProductList, _ListingProps } from '../ProductListingType';
import FilterChips from './components/FilterChips';
import FreeBanner from './components/FreeBanner';
import SideFilter from './components/SideFilter';
import TemplateOneFilterBar from './components/TemplateOneFilterBar';
import TemplateOneListing from './components/TemplateOneListing';

const ProductListingType1: React.FC<_ListingProps> = ({
  slug,
  filters,
  products,
  CMS,
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
  clearFilterSection,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  // useEffect(() => {
  //   buttonRef.current.addEventListener('click', clickHandler);
  // }, []);
   const handleScroll = () => {
    if (typeof window !== 'undefined') {
      // if(document.body.classList.contains('index-page') || storeCode === 'DI')
      // {
      let x = document.querySelector('#loadmore');
      if (x instanceof HTMLElement) 
      {
        // alert(x)
       
          if ((window.pageYOffset + document.documentElement.clientHeight) >= x?.offsetTop) {
            if(buttonRef.current)
             {
              buttonRef?.current.click();
             } 
          }
  
      }
      
      //}
    }
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      <FreeBanner />
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
                      clearFilterSection={clearFilterSection}
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
                            <Fragment key={product.id}>
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
                        <button id="loadmore" ref={buttonRef}
                          onClick={loadMore}
                          type='submit'
                          className='mt-[16px] btn btn-md btn-secondary tracking-[1.4px] font-normal w-full max-w-[550px] mx-auto focus:outline-none focus:ring-2 mb-[30px] '
                          style={{ opacity: 0}}
                       >
                          <span className='inline-block w-[20px] h-[20px]'>
                            <img
                              className='max-h-full'
                              src='assets/images/load-more-arrow.webp'
                              alt=''
                            />
                          </span>
                          <span className='text-normal font-normal text-xl'>
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
              {CMS.component && (
                <div className='flex flex-wrap ml-[-16px] mr-[-16px]'>
                  <Home
                    props={{
                      pageData: { components: CMS.component },
                      pageType: CMS.type,
                      slug: CMS.slug,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductListingType1;
