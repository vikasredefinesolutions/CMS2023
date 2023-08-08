import { _NameValuePairs } from '@controllers/slug.extras';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React, { useEffect, useState } from 'react';
import {
  FilterType,
  _CheckedFilter,
  _ListingPageProduct,
} from '../ProductListingType';
import PL2_FilterBar from './components/PL2_FilterBar';
import PL2_FilterChips from './components/PL2_FilterChips';
import PL2_FreeBanner from './components/PL2_FreeBanner';
import PL2_Listing from './components/PL2_Listing';
import PL2_SideFilters from './components/PL2_SideFilters';

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
    currentPage: number;
    allProducts: _ListingPageProduct[];

    totalAvailable: number;
    filterOptionforfaceteds: _NameValuePairs[];
  };
  checkedFilters: Array<_CheckedFilter>;
}

const PL2_Refactored: React.FC<_Props> = ({
  CMS,
  list,
  filters,
  checkedFilters,
}) => {
  const [showFilter, setShowFilter] = useState(false);

  const view = useTypedSelector_v2((state) => state.store.view);
  const [isMobile, setIsMobile] = useState(view === 'MOBILE');
  useEffect(() => {
    if (view == 'DESKTOP') {
      setShowFilter(true);
      setIsMobile(false);
    } else if (view === 'MOBILE') {
      setShowFilter(false);
      setIsMobile(true);
    }
  }, [view]);

  return (
    <>
      <PL2_FreeBanner />

      <section id='layout3' className=''>
        <div className='bg-[#ffffff]'>
          <div className='container mx-auto'>
            <div aria-labelledby='products-heading' className='mt-[20px]'>
              <h2 id='products-heading' className='sr-only'>
                Products
              </h2>
              <div className='flex flex-wrap lg:ml-[-16px] lg:mr-[-16px]'>
                <div className='w-full xl:w-2/12 lg:w-3/12 lg:pl-[16px] lg:pr-[16px]'>
                  {isMobile && (
                    <div
                      onClick={() => setShowFilter(!showFilter)}
                      className=' border-b border-b-neutral-300 p-2 sticky top-0 left-0 bg-primary flex items-center justify-between text-[#ffffff] z-1'
                    >
                      <div className='text-lg font-semibold text-[#ffffff]'>
                        Filters
                      </div>
                      <a href='javascript:void(0);' className='inline-flex'>
                        <span
                          className='material-symbols-outlined flex text-white'
                          // x-html="open == true ? 'remove' : 'add'"
                        >
                          {showFilter ? 'remove' : 'add'}
                        </span>
                      </a>
                    </div>
                  )}

                  <div className='relative lg:block'>
                    {showFilter && (
                      <PL2_SideFilters
                        pageId={CMS.pageId}
                        slug={CMS.slug}
                        filters={filters}
                        checkedFilters={checkedFilters}
                      />
                    )}
                  </div>
                </div>
                <div className='w-full xl:w-10/12 lg:w-9/12 lg:pl-[16px] lg:pr-[16px]'>
                  <PL2_FilterBar length={list.totalAvailable} />
                  <div className=''>
                    <PL2_FilterChips
                      slug={CMS.slug}
                      pageId={CMS.pageId}
                      checkedFilters={checkedFilters}
                    />
                  </div>
                  <PL2_Listing
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

export default PL2_Refactored;
