import { _BrandProps, _BrandsTemplates } from '@definations/brand';
import React from 'react';
import BrandsType1 from './Brands_type1';

const brandsTemplates: _BrandsTemplates = {
  type1: BrandsType1,
  type2: BrandsType1,
};

const BrandsListingTemplate: React.FC<_BrandProps & { id: string }> = ({
  id,
  ...rest
}) => {
  const Template = brandsTemplates[`type${id}` as 'type1' | 'type2'];

  return <Template {...rest} />;
};

export default BrandsListingTemplate;
