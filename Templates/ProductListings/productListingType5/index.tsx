import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { Fragment, useEffect } from 'react';
import { _ListingProps } from '../ProductListingType';
import FilterChipsTypeFive from './components/FilterChipsTypeFive';
import FreeBanner from './components/FreeBanner';
import SideFiltersTypeFive from './components/SideFiltersTypeFive';
import TemplateFiveFilterBar from './components/TemplateFiveFilterBar';
import TemplateFiveListing from './components/TemplateFiveListing';

const ProductListingType5: React.FC<_ListingProps> = ({
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
      <section id='layout5' className=''>
        <div className='bg-[#ffffff]'>
          <div className='container mx-auto'>
            <div>
              <h2 id='products-heading' className='sr-only'>
                {__pagesText.productListing.products}
              </h2>
              <div className='flex flex-wrap ml-[-16px] mr-[-16px]'>
                <div className='w-full lg:w-3/12 pl-[16px] pr-[16px]'>
                  <div
                    onClick={() => {}}
                    className='lg:hidden border-b border-b-neutral-300 p-2 sticky top-0 left-0 bg-primary flex items-center justify-between text-[#ffffff]'
                  >
                    <div className='text-lg font-semibold text-[#ffffff]'>
                      {__pagesText.productListing.Filters}
                    </div>
                    <div>
                      <span
                        className='material-symbols-outlined '
                        // x-html="open == true ? 'remove' : 'add'"
                        onClick={() => setShowFilter(!showFilter)}
                      >
                        {showFilter ? 'remove' : 'add'}
                      </span>
                    </div>
                  </div>
                  <div className='relative lg:block'>
                    {showFilter && (
                      <SideFiltersTypeFive
                        filters={filters}
                        handleChange={handleChange}
                        checkedFilters={checkedFilters}
                      />
                    )}
                  </div>
                </div>
                <div className='w-full lg:w-9/12 pl-[16px] pr-[16px]'>
                  <TemplateFiveFilterBar
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
                  <div className=''>
                    <FilterChipsTypeFive
                      {...{ clearFilters, checkedFilters, handleChange }}
                    />
                  </div>
                  <div className='mt-8 relative'>
                    <div className='relative w-full pb-6 -mb-6'>
                      <ul
                        role='list'
                        className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mb-8`}
                      >
                        {products.map((product, index) => (
                          <Fragment key={index}>
                            <TemplateFiveListing
                              productView={productView}
                              skuList={skuList}
                              compareCheckBoxHandler={compareCheckBoxHandler}
                              product={product}
                              colorChangeHandler={colorChangeHandler}
                              brandId={brandId}
                            />
                          </Fragment>
                        ))}
                      </ul>
                    </div>
                    <div className='py-[30px] text-center'>
                      <div className=''>
                        <div className='mb-[15px]'>
                          You've seen {products.length} Products out of{' '}
                          {totalCount}
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

                      {totalCount > products.length && (
                        <button
                          type='submit'
                          onClick={loadMore}
                          className='mt-[16px] btn btn-lg btn-secondary tracking-[1.4px] font-normal w-full max-w-[550px]'
                        >
                          <span className='inline-block w-[20px] h-[20px]'>
                            <img
                              className='max-h-full'
                              src='/assets/images/load-more-arrow.gif'
                            />
                          </span>
                          <span className='ml-[20px] mr-[20px]'>
                            {__pagesText.productListing.loadMoreButton}
                          </span>{' '}
                          <span className='inline-block w-[20px] h-[20px]'>
                            <img
                              className='max-h-full'
                              src='/assets/images/load-more-arrow.gif'
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
      {/* <ContactUs /> */}
    </>
  );
};

export default ProductListingType5;
