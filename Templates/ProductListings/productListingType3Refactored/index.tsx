import {
  CYXTERA_CODE,
  SIMPLI_SAFE_CODE,
  UCA,
  UNITI_CODE,
  _Store_CODES,
} from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { _NameValuePairs } from '@controllers/slug.extras';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FilterType,
  _CheckedFilter,
  _ListingPageProduct,
} from '../ProductListingType';
import PL3_FilterBar from './components/PL3_FilterBar';
import PL3_FilterChips from './components/PL3_FilterChips';
import PL3_Listing from './components/PL3_Listing';
import PL3_SideFilters from './components/PL3_SideFilters';

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

const PL3_Refactored: React.FC<_Props> = ({
  CMS,
  list,
  filters,
  checkedFilters,
}) => {
  const [showFilter, setShowFilter] = useState(false);

  const {
    view,
    code: storeCode,
    pageType,
  } = useTypedSelector_v2((state) => state.store);
  useEffect(() => {
    if (view == 'DESKTOP') {
      setShowFilter(true);
    } else {
      setShowFilter(false);
    }
  }, [view]);

  const renderDescription = useCallback(() => {
    if (storeCode !== _Store_CODES.UNITi) return null;
    if (pageType.slug === 'ships-in-2-days')
      return __pagesText.productListing
        .Uinit_Shipping_In_2_Days_Header_Description;
    if (pageType.slug === 'minimums' || pageType.slug === 'bulk-orders')
      return __pagesText.productListing.Uniti_Minimum_Bulk_Header_Description;
    return null;
  }, [pageType.slug]);

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
                  storeCode == CYXTERA_CODE ||
                  storeCode == UNITI_CODE ||
                  storeCode == _Store_CODES.USAAHEALTHYPOINTS ||
                  storeCode == SIMPLI_SAFE_CODE ||
                  storeCode == UCA
                    ? `text-center ${
                        storeCode == UNITI_CODE
                          ? `text-title-text`
                          : storeCode == _Store_CODES.USAAHEALTHYPOINTS
                          ? 'text-title-text'
                          : 'text-2xl'
                      }  mb-[20px] uppercase`
                    : 'sr-only'
                }`}
              >
                {storeCode == CYXTERA_CODE ||
                storeCode == UNITI_CODE ||
                storeCode == UCA ||
                storeCode == SIMPLI_SAFE_CODE ||
                storeCode == _Store_CODES.USAAHEALTHYPOINTS
                  ? pageType.name
                  : null}{' '}
                {/* {__pagesText.productListing.apparel} */}
              </h2>
              {renderDescription() && (
                <div className='pt-[20px] pb-[20px] text-subtitle-text px-[10px] text-center text-rose-500 !font-bold'>
                  {renderDescription()}
                </div>
              )}

              <div className='flex flex-wrap'>
                {storeCode !== SIMPLI_SAFE_CODE &&
                  storeCode !== _Store_CODES.USAAHEALTHYPOINTS && (
                    <div className='w-full xl:w-2/12 lg:w-3/12'>
                      <div className='lg:hidden border-b border-b-gray-border p-[10px] sticky top-0 left-0 bg-primary flex items-center justify-between text-[#ffffff] z-1'>
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
                          <PL3_SideFilters
                            pageId={CMS.pageId}
                            slug={CMS.slug}
                            filters={filters}
                            checkedFilters={checkedFilters}
                          />
                        )}
                      </div>
                    </div>
                  )}
                <div
                  className={`${
                    storeCode === _Store_CODES.USAAHEALTHYPOINTS ||
                    storeCode === SIMPLI_SAFE_CODE
                      ? 'w-full'
                      : 'w-full xl:w-10/12 lg:w-9/12 lg:pl-[0px]'
                  }`}
                >
                  <PL3_FilterBar length={list.totalAvailable} />
                  <PL3_FilterChips
                    slug={CMS.slug}
                    pageId={CMS.pageId}
                    checkedFilters={checkedFilters}
                  />
                  <PL3_Listing
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
      {/* <ContactUs /> */}
    </>
  );
};

export default PL3_Refactored;
