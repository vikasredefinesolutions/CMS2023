// ** React Imports
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React, { useEffect, useState } from 'react';

// ** MUI Imports
import {
  fallbackStoreId,
  maximumItemsForFetch,
} from '@constants/global.constant';
import { _SelectedBrands } from '@definations/APIs/storeDetails.res';
import { newFetauredItemResponse } from '@definations/productList.type';
import MuiTab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import { FetchDataByBrand } from '@services/brand.service';
import ProductListing from './ProductListing';

interface _props {
  dataArr: _SelectedBrands;
}

// ** Styled Tab component
const Tab = styled(MuiTab)(({ theme }) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(3),
  },
}));

const ProductsInfo: React.FC<_props> = ({ dataArr }) => {
  // ** State

  const [brandsData, setBrandsData] = useState<newFetauredItemResponse[] | []>(
    [],
  );
  const storeId = useTypedSelector_v2((state) => state.store.id);

  const fetchBrandData = async () => {
    let body = {
      brandId: +dataArr?.featuredproducts_selected_brands?.value[0]?.value,
      storeId: storeId ?? fallbackStoreId,
      maximumItemsForFetch:
        dataArr.featuredproducts_product_count?.value ?? maximumItemsForFetch,
      tagName: 'featured',
    };
    const data = await FetchDataByBrand(body);
    setBrandsData(data);
  };

  // Fetching products by brand
  useEffect(() => {
    fetchBrandData();
  }, [dataArr, storeId]);

  return (
    <>
      <ProductListing
        brandId={+dataArr?.featuredproducts_selected_brands?.value[0]?.value}
        brandsData={brandsData}
      />
    </>
  );
};

export default ProductsInfo;
