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
      <div className='w-full order-1 mt-[24px] flex px-[12px]'>
        <div className='w-full flex h-full bg-[#ffffff] p-[40px]'>
          <Home
            props={{
              pageData: { components: props.accordian },
              pageType: 'Topic',
              slug: 'brands.html',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BrandsType1;
