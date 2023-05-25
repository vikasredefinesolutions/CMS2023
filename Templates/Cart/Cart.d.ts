/* eslint-disable no-unused-vars */
import { NextPage } from 'next';

export interface _CartProps {
  templateId: number;
  showLoaderOrEmptyText: null | 'loader' | 'emptyCart' | 'dataFound';
}

export interface _CartTemplates {
  type1: NextPage<_CartProps, _CartProps>;
  type2: NextPage<_CartProps, _CartProps>;
  type3: NextPage<_CartProps, _CartProps>;
  type4: NextPage<_CartProps, _CartProps>;
}
