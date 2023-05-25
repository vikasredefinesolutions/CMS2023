// ** React Imports
import React, { Fragment, useEffect, useState } from 'react';

// ** MUI Imports
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import MuiTab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import { _SelectedTab } from '@templates/ProductDetails/productDetailsTypes/storeDetails.res';
import BrandProductListing from './BrandProducsListing';

interface _props {
  data: _SelectedTab[];
  showBorder: string;
  customMessage: string;
  showProductName: string;
  showSplitProducts: string;
  showButton: string;
  showPrice: string;
  showBrandLogo: string;
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

const ProductsInfoTabs: React.FC<_props> = (props) => {
  const {
    data,
    showBorder,
    customMessage,
    showProductName,
    showSplitProducts,
    showButton,
    showPrice,
    showBrandLogo,
  } = props;

  // ** State
  const [value, setValue] = useState<string>(data[0]?.index);
  const [featuredProducts, setFeaturedProducts] = useState<
    _SelectedTab[] | null
  >(null);

  useEffect(() => {
    setFeaturedProducts(data);
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <div>
        <TabList
          variant='scrollable'
          scrollButtons='auto'
          onChange={handleChange}
          aria-label='forced scroll tabs example'
          sx={{
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            marginBottom: '30px',
          }}
          className='tab-container'
        >
          {featuredProducts &&
            featuredProducts.map((product, index) => {
              return (
                <Tab
                  key={product?.index}
                  className='mr-0.5 md:mr-0 font-semibold py-2 px-2 hover:text-primary hover:border-primary featured_title font-Outfit'
                  value={product.index}
                  label={product?.tabName}
                />
              );
            })}
        </TabList>
      </div>

      <Box sx={{ marginTop: 0 }}>
        {featuredProducts &&
          featuredProducts.map((product: any, index: number) => {
            return (
              <Fragment key={`${product.index}`}>
                <TabPanel sx={{ p: 0 }} value={product.index}>
                  <BrandProductListing
                    customMessage={customMessage}
                    showBorder={showBorder}
                    showProductName={showProductName}
                    showSplitProducts={showSplitProducts}
                    showButton={showButton}
                    showPrice={showPrice}
                    showBrandLogo={showBrandLogo}
                    productsData={product?.data}
                  />
                </TabPanel>
              </Fragment>
            );
          })}
      </Box>
    </TabContext>
  );
};

export default ProductsInfoTabs;
