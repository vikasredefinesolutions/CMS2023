import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2, useWindowDimensions_v2 } from '@hooks_v2/index';
import React, { useEffect, useState } from 'react';
import PL5_FilterBar from './components/PL5_FilterBar';
import PL5_FilterChips from './components/PL5_FilterChips';
import FreeBanner from './components/PL5_FreeBanner';
import PL5_SideFilters from './components/PL5_SideFilters';
// import { GetlAllProductList, _ListingProps } from '../productListing';

import { _NameValuePairs } from '@controllers/slug.extras';
import {
  FilterType,
  _CheckedFilter,
  _ListingPageProduct,
} from '../ProductListingType';
import PL5_Listing from './components/PL5_Listing';

interface _Props {
  CMS: {
    component: string | null;
    type: string;
    slug: string;
    pageId: number;
  };
  filters: FilterType;
  list: {
    visible: _ListingPageProduct[];
    allProducts: _ListingPageProduct[];
    jumpBy: number;
    currentPage: number;
    totalAvailable: number;
    filterOptionforfaceteds: _NameValuePairs[];
  };
  checkedFilters: Array<_CheckedFilter>;
}

const PL5_Refactored: React.FC<_Props> = ({
  CMS,
  list,
  filters,
  checkedFilters,
}) => {
  const [showFilter, setShowFilter] = useState(false);

  const view = useTypedSelector_v2((state) => state.store.view);
  const { width } = useWindowDimensions_v2();
  const [isMobile, setIsMobile] = useState(view === 'MOBILE');
  useEffect(() => {
    if (width >= 1024) {
      setShowFilter(true);
      setIsMobile(false);
    } else {
      setShowFilter(false);
      setIsMobile(true);
    }
  }, [width]);

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
              <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
                <div className='w-full lg:w-3/12 pl-[15px] pr-[15px]'>
                  {isMobile && (
                    <div
                      onClick={() => setShowFilter(!showFilter)}
                      className='border-b border-b-neutral-300 p-2 sticky top-0 left-0 bg-primary flex items-center justify-between text-[#ffffff]'
                    >
                      <div className='text-lg font-semibold text-[#ffffff]'>
                        {__pagesText.productListing.Filters}
                      </div>
                      <div>
                        <span
                          className='material-symbols-outlined'
                          // x-html="open == true ? 'remove' : 'add'"
                        >
                          {showFilter ? 'remove' : 'add'}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className='relative lg:block'>
                    {showFilter && (
                      <PL5_SideFilters
                        pageId={CMS.pageId}
                        slug={CMS.slug}
                        filters={filters}
                        checkedFilters={checkedFilters}
                      />
                    )}
                  </div>
                </div>
                <div className='w-full lg:w-9/12 pl-[15px] pr-[15px]'>
                  <PL5_FilterBar length={list.totalAvailable} />
                  <div className=''>
                    <PL5_FilterChips
                      slug={CMS.slug}
                      pageId={CMS.pageId}
                      checkedFilters={checkedFilters}
                    />
                    <PL5_Listing
                      pageId={CMS.pageId}
                      brandOrCategory={CMS.type}
                      list={list}
                    />
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

export default PL5_Refactored;
