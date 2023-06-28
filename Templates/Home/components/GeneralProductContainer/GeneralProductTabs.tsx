// ** React Imports
import React, { Fragment, useEffect, useState } from 'react';

// ** MUI Imports
import { __pagesConstant } from '@constants/pages.constant';
import { newFetauredItemResponse } from '@definations/productList.type';
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
  footerTabing: string;
  productToDisplay: string;
  featuredItems: { [x: string]: newFetauredItemResponse[] };
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
    footerTabing,
    productToDisplay,
    featuredItems,
  } = props;

  // ** State
  const [value, setValue] = useState<string>(data[0]?.index);
  const [featuredProducts, setFeaturedProducts] = useState<
    _SelectedTab[] | null
  >(null);
  const [footerTabColorName, setFooterTabColorName] = useState<string>('');

  useEffect(() => {
    setFeaturedProducts(data);
    setFooterTabColorName(data[0]?.footerTabColorName);
  }, []);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: string,
    footerTabColorName: string,
  ) => {
    setValue(newValue);
    setFooterTabColorName(footerTabColorName);
  };

  return (
    <TabContext value={value}>
      <ul className='w-full flex justify-center max-w-4xl mx-auto flex-wrap'>
        <li className=''>
          <div
            className={`inline-block bg-[${footerTabColorName}] h-[8px] w-[96px] mt-[8px] mb-[8px]`}
          />
        </li>
      </ul>
      <div>
        <TabList
          variant='scrollable'
          scrollButtons='auto'
          aria-label='forced scroll tabs example'
          sx={{
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            marginBottom: '30px',
          }}
          className='tab-container'
        >
          {featuredProducts &&
            featuredProducts.map((product, index) => {
              const activeClass =
                value === product.index
                  ? 'text-anchor hover:text-anchor-hover border-[#006CD1] border-b-[2px]'
                  : 'rounded-sm';

              return (
                <div
                  key={product?.index}
                  className='mr-[2px] md:mr-0 font-[600]'
                >
                  <button
                    onClick={(event) =>
                      handleChange(
                        event,
                        product.index,
                        product?.footerTabColorName,
                      )
                    }
                    className={
                      `tab pt-[8px] pb-[8px] pl-[8px] pr-[8px] mr-[4px] block hover:text-anchor focus:outline-none font-[600] border-anchor ` +
                      activeClass
                    }
                  >
                    {product?.tabName}
                  </button>
                </div>
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
                    featuredItems={featuredItems}
                    showBorder={showBorder}
                    showProductName={showProductName}
                    showSplitProducts={showSplitProducts}
                    showButton={showButton}
                    showPrice={showPrice}
                    showBrandLogo={showBrandLogo}
                    productsData={product}
                    productToDisplay={productToDisplay}
                  />
                </TabPanel>
              </Fragment>
            );
          })}
      </Box>
      {footerTabing == __pagesConstant?.show?.No ? (
        ''
      ) : (
        <div className='pt-5'>
          <TabList
            variant='scrollable'
            scrollButtons='auto'
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
                  <div key={index} className='lg:w-1/5 w-full'>
                    <button
                      className={`bg-[${product?.footerTabColorName}] hover:bg-[#ffffff] block pt-[16px] pb-[16px] pl-[40px] pr-[40px] text-center text-white font-[600] hover:text-[#ffffff] w-full`}
                      onClick={(event) =>
                        handleChange(
                          event,
                          product.index,
                          product?.footerTabColorName,
                        )
                      }
                    >
                      {product?.tabName}
                    </button>
                  </div>
                );
              })}
          </TabList>
        </div>
      )}
    </TabContext>
  );
};

export default ProductsInfoTabs;
