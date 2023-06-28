import ProductListController from '@controllers/productListController';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import React, { useEffect, useRef } from 'react';

import { __pagesText } from '@constants/pages.text';
import {
  GoogleAnalyticsTrackerForAllStore,
  GoogleAnalyticsTrackerForCG,
} from '@helpers/common.helper';
import {
  _ProductListingProps,
  _ProductListingTemplates,
} from './ProductListingType';
import ProductListingType1 from './productListingType1';
import ProductListingType2 from './productListingType2';
import ProductListingType3 from './productListingType3';
import ProductListingType4 from './productListingType4';
import ProductListingType5 from './productListingType5';
import ProductListingType6 from './productListingType6';
import ProductListingType8 from './productListingType8';

const productListingTemplates: _ProductListingTemplates = {
  type1: ProductListingType1,
  type2: ProductListingType2,
  type3: ProductListingType3,
  type4: ProductListingType4,
  type5: ProductListingType5,
  type6: ProductListingType6,
  type7: ProductListingType1, // Store Builders (if showFilters is true)
  type8: ProductListingType8,
};

const ProductListing: React.FC<_ProductListingProps & { id: string }> = ({
  id,
  pageData,
  seType,
  CMS,
  slug,
}) => {
  const isCaptured = useRef(false);
  const { updateBrandId } = useActions_v2();

  useEffect(() => {
    updateBrandId({ brandId: pageData?.brandId });
  }, [pageData]);
  const { checkedFilters } = pageData;
  const {
    filters,
    product,
    totalCount,
    productView,
    showFilter,
    showSortMenu,
    skuList,
    compareCheckBoxHandler,
    handleChange,
    colorChangeHandler,
    loadMore,
    sortProductJson,
    setShowSortMenu,
    setProductView,
    setShowFilter,
    clearFilters,
    sorting,
    clearFilterSection,
  } = ProductListController(pageData, slug, checkedFilters, pageData?.brandId);
  const { id: storeId } = useTypedSelector_v2((state) => state.store);

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
  }, [pageData?.googleTagManagerResponseCommonData]);

  const Component =
    productListingTemplates[
      (`type${id}` as 'type1') || 'type2' || 'type3' || 'type4' || 'type6'
    ];

  if (product.length === 0 && !pageData.product.length) {
    return (
      <section id=''>
        <div className='bg-[#ffffff]'>
          <div className='h-80 flex items-center justify-center'>
            <div className='text-2xl-text'>
              {__pagesText.productListing.noProductsFound}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <Component
      showSortMenu={showSortMenu}
      filters={filters}
      products={product}
      checkedFilters={checkedFilters}
      totalCount={totalCount}
      productView={productView}
      showFilter={showFilter}
      skuList={skuList}
      colorChangeHandler={colorChangeHandler}
      handleChange={handleChange}
      loadMore={loadMore}
      sortProductJson={sortProductJson}
      setShowSortMenu={setShowSortMenu}
      setProductView={setProductView}
      setShowFilter={setShowFilter}
      clearFilters={clearFilters}
      compareCheckBoxHandler={compareCheckBoxHandler}
      slug={slug}
      seType={seType}
      brandId={pageData?.brandId}
      sortingType={sorting}
      clearFilterSection={clearFilterSection}
      CMS={CMS}
    />
  );
};

export default ProductListing;
