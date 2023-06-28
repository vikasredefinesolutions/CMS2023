import React from 'react';
import BannerType1 from './bannerType1';
import BannerType2 from './bannerType2';
import BannerType3 from './bannerType3';
import BannerType4 from './bannerType4';
import BannerType5 from './bannerType5';
import BannerType6 from './bannerType6';

const bannerTemplates: _BannerTemplates = {
  type1: BannerType1,
  type2: BannerType2,
  type3: BannerType3,
  type4: BannerType4,
  type5: BannerType5,
  type6: BannerType6,
};

const Banner: React.FC<{
  typeId: _BrandTypes;
  storeId: number;
  content: _Banner[] | null;
}> = ({ typeId, storeId, content }) => {
  const Component = bannerTemplates[typeId];

  return <Component content={content} storeId={storeId} />;
};

export default Banner;

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
///////////////////                                 TYPES
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

export type _BrandTypes =
  | 'type1'
  | 'type2'
  | 'type3'
  | 'type4'
  | 'type5'
  | 'type6';

export interface _Banner {
  name: string | undefined;
  h1: string;
  h2: string;
  id: number;
  brandLogo: string | null;
  bannerImagePath?: string;
  description: string;
  banner: string;
  seTitle: null;
  seKeyWords: null;
  seDescription: null;
  // collection url
  customSEName: string | null;
  brandImage: string | null;
}

export interface _Props {
  content: _Banner[] | null;
  storeId: number;
}

export interface _BannerTemplates {
  type1: React.FC<_Props>;
  type2: React.FC<_Props>;
  type3: React.FC<_Props>;
  type4: React.FC<_Props>;
  type5: React.FC<_Props>;
  type6: React.FC<_Props>;
}
