import React from 'react';
// import { GetlAllProductList, _ListingProps } from '../productListing';

import { storeBuilderTypeId } from '@configs/page.config';
import { __pageTypeConstant } from '@constants/global.constant';
import { _NameValuePairs } from '@controllers/slug.extras';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import Home from '@templates/Home';
import {
  FilterType,
  _CheckedFilter,
  _ListingPageProduct,
} from '../ProductListingType';
import FreeBanner from '../productListingType1/components/FreeBanner';
import PL1_FilterBar from './Components/PL1_FilterBar';
import PL1_FilterChips from './Components/PL1_FilterChips';
import PL1_List from './Components/PL1_List';
import PL1_SideFilters from './Components/PL1_SideFilters';

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
    totalAvailable: number;
    allProducts: _ListingPageProduct[];
    filterOptionforfaceteds: _NameValuePairs[];
  };
  checkedFilters: Array<_CheckedFilter>;
}

const PL1_Refactored: React.FC<_Props> = ({
  CMS,
  list,
  filters,
  checkedFilters,
}) => {
  const { storeTypeId, code } = useTypedSelector_v2((state) => state.store);
  const storeBuilder = storeTypeId === storeBuilderTypeId;

  return (
    <>
      {code === 'CG' && <FreeBanner />}
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
                  <PL1_SideFilters
                    pageId={CMS.pageId}
                    slug={CMS.slug}
                    filters={filters}
                    checkedFilters={checkedFilters}
                  />
                </div>
                <div className={'w-full lg:w-9/12 pl-[16px] pr-[16px]'}>
                  <PL1_FilterBar length={list.totalAvailable} />
                  <PL1_FilterChips
                    slug={CMS.slug}
                    pageId={CMS.pageId}
                    checkedFilters={checkedFilters}
                  />
                  <PL1_List
                    pageId={CMS.pageId}
                    brandOrCategory={
                      CMS.type as
                        | __pageTypeConstant.brand
                        | __pageTypeConstant.category
                    }
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

export default PL1_Refactored;
