import React from 'react';

export interface _Brand {
  catalogdetails: any;
  id: number;
  brandName: string;
  seName: string;
  brandColorImageUrl: string;
  brandCollectionUrl: null;
  brandBlackColorImageUrl: string;
  isBrandOnline: boolean;
}

export interface _BrandProps {
  brands: _Brand[] | null;
  alphabets: string[];
  accordian: any;
  metaData: any;
  featuredItems: any;
}

export interface _BrandsTemplates {
  type1: React.FC<_BrandProps>;
  type2: React.FC<_BrandProps>;
  type3: React.FC<_BrandProps>;
  type4: React.FC<_BrandProps>;
}
