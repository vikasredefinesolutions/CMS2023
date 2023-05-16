import React from 'react';

export interface _Brand {
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
}

export interface _BrandsTemplates {
  type1: React.FC<_BrandProps>;
  type2: React.FC<_BrandProps>;
  type3: React.FC<_BrandProps>;
}
