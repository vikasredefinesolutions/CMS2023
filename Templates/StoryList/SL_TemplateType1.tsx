import BrandsByCategories from '@appComponents/common/BrandsByCategories';
import SL_Story from '@appComponents/common/StoriesList';
import { _Brand } from '@definations/brand';
import { _Story } from '@definations/story';
import React from 'react';
import SL_HeroSection from './components/SL_HeroSection';
import SL_ProductsByCategory from './components/SL_ProductsByCategory';

interface _Props {
  list: _Story[];
  brands: _Brand[];
}

const SL_TemplateType1: React.FC<_Props> = ({ list, brands }) => {
  return (
    <>
      <SL_HeroSection firstTwo={list} />
      {list.length > 2 ? (
        <SL_Story stories={list.slice(2)} showByDefault={6} />
      ) : null}
      <BrandsByCategories brands={brands} />
      <SL_ProductsByCategory />
    </>
  );
};

export default SL_TemplateType1;
