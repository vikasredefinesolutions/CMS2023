import { _templateIds } from '@helpers/app.extras';
import { _StoreMenu } from './header.type';
import {
  _FetchStoreConfigurations,
  _SbStoreConfiguration,
  _StoreReturnType,
} from './store.type';

export type _Expected_AppProps = {
  sbStore: _SbStoreConfiguration | null;
  store: _StoreReturnType;
  menuItems: _StoreMenu[] | null;
  footerHTML: _FetchStoreConfigurations | null;
  headerConfig: _FetchStoreConfigurations | null;
  templateIDs: _templateIds;
};

export type PageResponseType = {
  description: string;
  id: string | number;
  slug: string;
  store_id: number | string;
  type: string;
  name: string;
};

export interface _Country {
  countryCode: string;
  id: number;
  name: string;
}

export interface _State {
  id: number;
  name: string;
}

export interface _Industry {
  id: number;
  name: string;
}
