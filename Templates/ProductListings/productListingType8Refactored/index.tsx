/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
import React from 'react';
// import { GetlAllProductList, _ListingProps } from '../productListing';

import Home from '@templates/Home';
import FilterChips from './components/PL8_FilterChips';

import { _NameValuePairs } from '@controllers/slug.extras';
import {
  FilterType,
  _CheckedFilter,
  _ListingPageProduct,
} from '../ProductListingType';
import PL8_FilterBar from './components/PL8_FilterBar';
import PL8_Listing from './components/PL8_Listing';
import PL8_SideFilters from './components/PL8_SideFilter';

interface _Props {
  CMS: {
    component: string | null;
    type: string;
    slug: string;
    pageId: number;
  };
  filters: FilterType;
  list: {
    jumpBy: number;
    currentPage: number;
    totalAvailable: number;
    visible: _ListingPageProduct[];
    allProducts: _ListingPageProduct[];
    filterOptionforfaceteds: _NameValuePairs[];
  };
  checkedFilters: Array<_CheckedFilter>;
}

const PL8_Refactored: React.FC<_Props> = ({
  CMS,
  list,
  filters,
  checkedFilters,
}) => {
  return (
    <>
      <section id=''>
        <div className=''>
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
                    <PL8_SideFilters
                      pageId={CMS.pageId}
                      slug={CMS.slug}
                      filters={filters}
                      checkedFilters={checkedFilters}
                    />
                  )}
                </div>
                <div className={'w-full lg:w-9/12 pl-[16px] pr-[16px]'}>
                  <PL8_FilterBar />

                  <FilterChips
                    slug={CMS.slug}
                    pageId={CMS.pageId}
                    checkedFilters={checkedFilters}
                  />
                  <PL8_Listing
                    pageId={CMS.pageId}
                    brandOrCategory={CMS.type}
                    list={list}
                  />
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

export default PL8_Refactored;
