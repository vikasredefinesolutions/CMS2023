import { _BrandProps } from '@definations/brand';
import React from 'react';
import { Br3_Products } from './components';

const BrandsType3: React.FC<_BrandProps> = (props) => {
  return (
    <div className='mb-[40px]'>
      <Br3_Products />
    </div>
  );
};

export default BrandsType3;
