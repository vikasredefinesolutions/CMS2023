import {
  CYXTERA_CODE,
  SIMPLI_SAFE_CODE,
  THD_STORE_CODE,
  UNITI_CODE,
} from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React, { Fragment, useEffect } from 'react';
import { _ListingProps } from '../ProductListingType';
import FilterBarTypeThree from './components/FilterBarTypeThree';
import FilterChipsTypeThree from './components/FilterChipsTypeThree';
import SideFiltersTypeThree from './components/SideFiltersTypeThree';
import TemplateThreeListing from './components/TemplateThreeListing';

const ProductListingType3: React.FC<_ListingProps> = ({
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
  clearFilterSection,
  seType,
  brandId,
  sortingType,
}) => {
  const { view, code: storeCode } = useTypedSelector_v2((state) => state.store);
  useEffect(() => {
    if (view == 'DESKTOP') {
      setShowFilter(true);
    } else {
      setShowFilter(false);
    }
  }, [view]);

  const state = useTypedSelector_v2((state) => state);

  return (
    <>
      {/* <FreeBanner /> */}
      <section id='layout3' className=''>
        <div className='container mx-auto'>
          <div className='bg-[#ffffff]'>
            <div
              aria-labelledby='products-heading'
              className='pt-[20px] px-[15px]'
            >
              <h2
                id='products-heading'
                className={`${
                  storeCode == CYXTERA_CODE || storeCode == UNITI_CODE
                    ? 'text-center text-2xl mb-[20px]'
                    : 'sr-only'
                }`}
              >
                {storeCode == CYXTERA_CODE ||
                storeCode == UNITI_CODE ||
                storeCode == SIMPLI_SAFE_CODE
                  ? state.store.pageType.name
                  : __pagesText.productListing.products}
              </h2>
              <div className='flex flex-wrap'>
                {storeCode !== SIMPLI_SAFE_CODE && (
                  <div className='w-full xl:w-2/12 lg:w-3/12'>
                    <div className='lg:hidden border-b border-b-gray-border p-[10px] sticky top-0 left-0 bg-gray-400 flex items-center justify-between text-[#ffffff] z-1'>
                      <div className='text-sub-text font-semibold text-[#ffffff]'>
                        {__pagesText.productListing.Filters}
                      </div>
                      <div>
                        <span
                          className='material-symbols-outlined flex text-white'
                          // x-html="open == true ? 'remove' : 'add'"
                          onClick={() => setShowFilter(!showFilter)}
                        >
                          {showFilter ? 'remove' : 'add'}
                        </span>
                      </div>
                    </div>

                    <div className='relative lg:block'>
                      {showFilter && (
                        <SideFiltersTypeThree
                          filters={filters}
                          handleChange={handleChange}
                          checkedFilters={checkedFilters}
                        />
                      )}
                    </div>
                  </div>
                )}
                <div className='w-full xl:w-10/12 lg:w-9/12 lg:pl-[10px]'>
                  <FilterBarTypeThree
                    {...{
                      totalCount,
                      showSortMenu,
                      sortProductJson,
                      sortOpenHandler: setShowSortMenu,
                      setProductView,
                      productView,
                      setShowFilter,
                      sortingType,
                    }}
                  />
                  <FilterChipsTypeThree
                    {...{ clearFilters, checkedFilters, handleChange }}
                  />
                  <div className='mt-[32px] relative'>
                    <div className='relative w-full pb-[24px] mb-[-24px]'>
                      <ul
                        role='list'
                        className={
                          productView === 'grid'
                            ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4 mb-[32px]'
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
                    {storeCode !== THD_STORE_CODE &&
                      storeCode !== SIMPLI_SAFE_CODE && (
                        <div className='py-20 border-t border-t-gray-300 text-center'>
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
                        </div>
                      )}
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

export default ProductListingType3;
