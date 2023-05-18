import BrandsByCategories from '@appComponents/common/BrandsByCategoriesType1';
import { _BrandProps } from '@definations/brand';
import Home from '@templates/Home';
import React from 'react';
import { Br_Alphabets, Br_Banner, Br_Faq } from './components';

const BrandsType1: React.FC<_BrandProps> = (props) => {
  return (
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
      />
    </div>
  );
};

export default BrandsType1;
