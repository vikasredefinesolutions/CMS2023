import { _Store } from '@configs/page.config';
import { _BrandProps, _BrandsTemplates } from '@definations/brand';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React from 'react';
import BrandsType1 from './Brands_type1';
import BrandsType2 from './Brands_type2';
import BrandsType3 from './Brands_type3';
import BrandsType4 from './Brands_type4';

const brandsTemplates: _BrandsTemplates = {
  type1: BrandsType1,
  type2: BrandsType2,
  type3: BrandsType3,
  type4: BrandsType4,
};

const BrandsListingTemplate: React.FC<
  _BrandProps & { id: 'type1' | 'type2' | 'type3' | 'type4' }
> = ({ id, ...rest }) => {
  const storeCode = useTypedSelector_v2((state) => state.store.code);
  if (storeCode == _Store.type4) {
    id = 'type4';
  } else if (storeCode == 'PKHG') {
    id = 'type2';
  } else {
    id = 'type1';
  }
  const Template = brandsTemplates[id];
  return <Template {...rest} />;
};

export default BrandsListingTemplate;
