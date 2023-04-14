import { _ProductColor } from '@definations/APIs/colors.res';
import {
  _ProductDetails,
  _ProductsAlike,
  _ProductSEO,
} from '@definations/APIs/productDetail.res';
import React from 'react';

export interface _RequestConsultationProps {
  details: _ProductDetails | null;
  color: _ProductColor | null;
  alike: _ProductsAlike[] | null;
  seo: _ProductSEO | null;
}

export interface _RequestConsultationTemplates {
  type1: React.FC<_RequestConsultationProps>;
  type2: React.FC<_RequestConsultationProps>;
}

export type _RequestConsultation = {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  preferedContactMethod: '' | 'MOBILE' | 'EMAIL';
  desiredQty: number;
  inHandDate: string;
  message: string;
};

export interface _SubmitConsultationPayload {
  consultationModel: {
    id: number;
    rowVersion: string;
    location: string;
    ipAddress: string;
    macAddress: string;
    storeId: number;
    productId: number;
    firstname: string;
    lastname: string;
    company: string;
    email: string;
    phone: string;
    contactMethod: number;
    desiredQuantity: number;
    inHandsDate: string;
    logoUrl: string;
    message: string;
    gclid: string;
    productattributeoptionid: number;
    recStatus: 'A';
  };
}
