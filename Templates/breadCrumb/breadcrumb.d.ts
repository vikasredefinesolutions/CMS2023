import { NextPage } from 'next';

export interface _breadCrumbs {
  name: string;
  url: string;
}
export interface _BreadCrumbProps {
  pageType: string | null;
  breadCrumbs: _breadCrumbs[];
}
export interface __BreadCrumbTemplatesProps {
  breadCrumbid: number;
}
export interface _BreadCrumbTemplates {
  type1: NextPage<_BreadCrumbProps>;
  type2: NextPage<_BreadCrumbProps>;
  type3: NextPage<_BreadCrumbProps>;
  //   type4: NextPage<_BreadCrumbProps>;
}
