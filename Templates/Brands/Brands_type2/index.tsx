import BrandsByCategoriesType2 from '@appComponents/common/BrandsByCategoriesType2';
import { _BrandProps } from '@definations/brand';
import Home from '@templates/Home';
import React from 'react';

const BrandsType2: React.FC<_BrandProps> = (props) => {
  return (
    <div className='mb-[40px]'>
      <BrandsByCategoriesType2 brands={props.brands!} />
      
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

export default BrandsType2;
