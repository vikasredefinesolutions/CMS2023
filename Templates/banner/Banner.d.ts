/* eslint-disable no-unused-vars */
import React from 'react';

export interface _BannerTemplates {
  type1: React.FC<_BannerComponentProps>;
  type2: React.FC<_BannerComponentProps>;
  type3: React.FC<_BannerComponentProps>;
  type4: React.FC<_BannerComponentProps>;
}

export interface _BannerComponentProps {
  userId: number | null;
  showModal: string | null;
  banner: _BannerRes[] | null;
  setShowModal: (showModal: string | null) => void;
}

export interface _BannerProps {
  storeId: number;
  slug: string;
  seType: string;
}

export interface Welcome {
  success: boolean;
  data: _BannerRes[];
  errors: Errors;
  otherData: null;
}

export interface _BannerRes {
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
}

export interface Errors {}
