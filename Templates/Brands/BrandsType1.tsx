import BrandsByCategories from '@appComponents/common/BrandsByCategories';
import { _BrandProps } from '@definations/brand';
import React from 'react';
import Br_Alphabets from './components/Br_Alphabets';
import Br_Banner from './components/Br_Banner';
import Br_Faq from './components/Br_Faq';

const BrandsType1: React.FC<_BrandProps> = (props) => {
  return (
    <div className='mb-[40px]'>
      <Br_Banner />
      <BrandsByCategories brands={props.brands!} />
      <Br_Alphabets {...props} />
      <Br_Faq />
    </div>
  );
};

export default BrandsType1;
