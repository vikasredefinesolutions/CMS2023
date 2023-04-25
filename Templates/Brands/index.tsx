import { _BrandProps, _BrandsTemplates } from '@definations/brand';
import React from 'react';
import BrandsType1 from './Brands_type1';
import BrandsType2 from './Brands_type2';

const brandsTemplates: _BrandsTemplates = {
  type1: BrandsType1,
  type2: BrandsType2,
};

const BrandsListingTemplate: React.FC<_BrandProps & { id: 'type1' }> = ({
  id,
  ...rest
}) => {
  const Template = brandsTemplates[id];

  return <Template {...rest} />;
};

export default BrandsListingTemplate;
