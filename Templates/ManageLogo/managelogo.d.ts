import { LogoList } from '@definations/APIs/logo.res';
import { NextPage } from 'next';

export interface _ManageLogoProps {
  logoList: LogoList | null;
  fetchLogoDetails: () => void;
}

export interface _ManageLogoTemplates {
  type1: NextPage<_ManageLogoProps>;
  type2: NextPage<_ManageLogoProps>;
}
