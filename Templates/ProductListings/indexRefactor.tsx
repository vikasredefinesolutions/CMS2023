import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import React, { useEffect, useRef } from 'react';

import { _NameValuePairs } from '@controllers/slug.extras';
import {
  GoogleAnalyticsTrackerForAllStore,
  GoogleAnalyticsTrackerForCG,
} from '@helpers/common.helper';
import {
  FilterType,
  _CheckedFilter,
  _ListingPageProduct,
  _ProductListingProps,
} from './ProductListingType';
import PL1_Refactored from './ProductListingType1Refactored';
import PL2_Refactored from './productListingType2Refactored';
import PL3_Refactored from './productListingType3Refactored';
import PL4_Refactored from './productListingType4Refactored';
import PL5_Refactored from './productListingType5Refactored';
import PL6_Refactored from './productListingType6Refactored';
import PL8_Refactored from './productListingType8Refactored';
import productListingType9 from './productListingType9';

const Templates: _Templates = {
  type1: PL1_Refactored,
  type2: PL2_Refactored,
  type3: PL3_Refactored,
  type4: PL4_Refactored,
  type5: PL5_Refactored,
  type6: PL6_Refactored,
  type7: PL1_Refactored,
  type8: PL8_Refactored,
  type9: productListingType9,
};

const ProductListingRefactored: React.FC<
  _ProductListingProps & { id: string }
> = ({ id, pageData, CMS }) => {
  const isCaptured = useRef(false);
  const { updateBrandId } = useActions_v2();
  const { id: storeId } = useTypedSelector_v2((state) => state.store);

  useEffect(() => {
    updateBrandId({ brandId: CMS.pageId });
  }, [pageData]);

  useEffect(() => {
    document.body.classList.remove('product_details');
  }, []);

  useEffect(() => {
    if (pageData?.googleTagManagerResponseCommonData && !isCaptured.current) {
      isCaptured.current = true;
      GoogleAnalyticsTrackerForCG(
        '',
        storeId,
        pageData.googleTagManagerResponseCommonData,
      );
      GoogleAnalyticsTrackerForAllStore(
        '',
        storeId,
        pageData.googleTagManagerResponseCommonData,
      );
    }
  }, [pageData?.googleTagManagerResponseCommonData]); // refactored

  ///////////////////////////////////
  /*             VIEW              */
  ///////////////////////////////////
  // Commmented for now need to use hardcode type 9 for petter millar
  const T = Templates[`type${id}` as Types];
  // const T = Templates[`type9`];

  return (
    <T
      CMS={CMS}
      list={pageData.list}
      filters={pageData.filters}
      checkedFilters={pageData.checkedFilters}
    />
  );
};

export default ProductListingRefactored;

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////*             TYPES              */////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

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

type Types =
  | 'type1'
  | 'type2'
  | 'type3'
  | 'type4'
  | 'type5'
  | 'type6'
  | 'type7'
  | 'type8'
  | 'type9';

type _Templates = {
  [key in Types]: React.FC<_Props>;
};
