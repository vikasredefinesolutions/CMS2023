// import React from 'react';
// import { _ListingProps } from '../ProductListingType';

// const ProductListingType4: React.FC<_ListingProps> = () => {
//   return <></>;
// };

// export default ProductListingType4;

/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
import React from 'react';
// import { GetlAllProductList, _ListingProps } from '../productListing';

import { __pagesText } from '@constants/pages.text';

import { _NameValuePairs } from '@controllers/slug.extras';
import {
  FilterType,
  _CheckedFilter,
  _ListingPageProduct,
} from '../ProductListingType';

import PL4_FilterBar from './components/PL4_FilterBar';
import PL4_FilterChips from './components/PL4_FilterChips';
import PL4_Listing from './components/PL4_Listing';
import PL4_SideFilters from './components/PL4_SideFilters';

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
    jumpBy: number;
    allProducts: _ListingPageProduct[];

    currentPage: number;
    totalAvailable: number;
    filterOptionforfaceteds: _NameValuePairs[];
  };
  checkedFilters: Array<_CheckedFilter>;
}

const PL4_Refactored: React.FC<_Props> = ({
  CMS,
  list,
  filters,
  checkedFilters,
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
                  {/* <div className='lg:hidden border-b border-b-neutral-300 p-2 sticky top-0 left-0 bg-primary flex items-center justify-between text-[#ffffff] z-1'>
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
                  </div> */}

                  <div className='relative lg:block'>
                    <PL4_SideFilters
                      pageId={CMS.pageId}
                      slug={CMS.slug}
                      filters={filters}
                      checkedFilters={checkedFilters}
                    />
                  </div>
                </div>
                <div className='w-full lg:w-9/12 lg:pl-[16px] lg:pr-[16px]'>
                  <PL4_FilterBar />
                  <PL4_FilterChips
                    slug={CMS.slug}
                    pageId={CMS.pageId}
                    checkedFilters={checkedFilters}
                  />
                  <PL4_Listing
                    pageId={CMS.pageId}
                    brandOrCategory={CMS.type}
                    list={list}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PL4_Refactored;
