export type _CategorySiteMap = {
  id: number;
  name: string;
  parentCategoryId: number;
  sename: string;
  storeId: number;
  subRows: [];
};
export type _BrandsSiteMap = {
  items: { dataType: string; brands: [] };
  seName: string;
  brandName: string;
  type: string;
};

import { _Brand } from '@definations/brand';
import React from 'react';

export interface _siteMapProps {
  id: string;
  store: {
    storeId: null | number;
    storeCode: null | string;
    storeTypeId: null | number;
  } | null;
}
export interface _siteMapstore {
  store: {
    storeId: null | number;
    storeCode: null | string;
    storeTypeId: null | number;
  } | null;
}
export interface _siteMapTemplates {
  type1: React.FC<_Sitemap_ExpectedProps>;
}

export interface _Sitemap_ExpectedProps {
  brandItems: _Brand[] | null | undefined;
  categories: _CategorySiteMap[] | null | undefined;
}
