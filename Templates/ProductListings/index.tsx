import ProductListController from '@controllers/productListController';
import { useActions_v2 } from '@hooks_v2/index';
import React, { useEffect } from 'react';

import {
  _ProductListingProps,
  _ProductListingTemplates,
} from './ProductListingType';
import ProductListingType1 from './productListingType1';
import ProductListingType2 from './productListingType2';
import ProductListingType3 from './productListingType3';
import ProductListingType4 from './productListingType4';

const productListingTemplates: _ProductListingTemplates = {
  type1: ProductListingType1,
  type2: ProductListingType2,
  type3: ProductListingType3,
  type4: ProductListingType4,
};

const ProductListing: React.FC<_ProductListingProps & { id: string }> = ({
  id,
  pageData,
  seType,
  slug,
}) => {
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
  } = ProductListController(pageData, slug, checkedFilters, pageData?.brandId);
  const Component = productListingTemplates[`type2` as 'type2'];
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
    />
  );
};

export default ProductListing;
