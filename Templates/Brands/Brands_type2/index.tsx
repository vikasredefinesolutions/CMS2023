import BrandsByCategoriesType2 from '@appComponents/common/BrandsByCategoriesType2';
import { _BrandProps } from '@definations/brand';
import React from 'react';
import { Br2_Products } from './components';

const BrandsType2: React.FC<_BrandProps> = (props) => {
  return (
    <div className='mb-[40px]'>
      <BrandsByCategoriesType2 brands={props.brands!} />
      <Br2_Products />
    </div>
  );
};

export default BrandsType2;
