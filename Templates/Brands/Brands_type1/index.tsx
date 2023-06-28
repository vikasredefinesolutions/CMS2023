import BrandsByCategories from '@appComponents/common/BrandsByCategoriesType1';
import SeoHead from '@appComponents/reUsable/SeoHead';
import { _BrandProps } from '@definations/brand';
import Home from '@templates/Home';
import React from 'react';
import { Br_Alphabets, Br_Banner, Br_Faq } from './components';

const BrandsType1: React.FC<_BrandProps> = (props) => {
  return (
    <>
      <SeoHead
        title={props?.metaData?.meta_Title}
        description={props?.metaData?.meta_Description}
        keywords={props?.metaData?.meta_Keywords}
      />
      <div className='mb-[40px]'>
        <Br_Banner />
        <BrandsByCategories brands={props.brands!} />
        <Br_Alphabets {...props} />
        <Br_Faq />
        <Home
          props={{
            pageData: { components: props.accordian },
            pageType: 'Topic',
            slug: 'brands.html',
          }}
          featuredItems={{
            products: props?.featuredItems,
            brands: null,
          }}
        />
      </div>
    </>
  );
};

export default BrandsType1;
