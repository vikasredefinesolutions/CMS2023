import ContactUs from '@appComponents/reUsable/ContactUs';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React, { Fragment, useEffect } from 'react';
import { _ListingProps } from '../ProductListingType';
import FilterBarTypeTwo from './components/FilterBarTypeTwo';
import FilterChipsTypeTwo from './components/FilterChipsTypeTwo';
import FreeBanner from './components/FreeBanner';
import SideFiltersTypeTwo from './components/SideFiltersTypeTwo';
import TemplateTwoListing from './components/TemplateTwoListing';
const ProductListingType2: React.FC<_ListingProps> = ({
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
      <FreeBanner />
      <section id='layout3' className=''>
        <div className='bg-[#ffffff]'>
          <div className='container mx-auto'>
            <div aria-labelledby='products-heading' className='mt-[20px]'>
              <h2 id='products-heading' className='sr-only'>
                Products
              </h2>
              <div className='flex flex-wrap lg:ml-[-16px] lg:mr-[-16px]'>
                <div className='w-full xl:w-2/12 lg:w-3/12 lg:pl-[16px] lg:pr-[16px]'>
                  <div
                    onClick={() => {}}
                    className='lg:hidden border-b border-b-neutral-300 p-2 sticky top-0 left-0 bg-primary flex items-center justify-between text-[#ffffff] z-1'
                  >
                    <div className='text-lg font-semibold text-[#ffffff]'>
                      Filters
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
                      <SideFiltersTypeTwo
                        filters={filters}
                        handleChange={handleChange}
                        checkedFilters={checkedFilters}
                      />
                    )}
                  </div>
                </div>
                <div className='w-full xl:w-10/12 lg:w-9/12 lg:pl-[16px] lg:pr-[16px]'>
                  <FilterBarTypeTwo
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
                  <div className=''>
                    <FilterChipsTypeTwo
                      {...{ clearFilters, checkedFilters, handleChange }}
                    />
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
                            <TemplateTwoListing
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

export default ProductListingType2;
