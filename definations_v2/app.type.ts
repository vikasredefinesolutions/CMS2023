import { _MenuItems } from './header.type';
import {
  _FetchStoreConfigurations,
  _SbStoreConfiguration,
  _StoreReturnType,
} from './store.type';

export type _Expected_AppProps = {
  sbStore: _SbStoreConfiguration | null;
  store: _StoreReturnType;
  menuItems: _MenuItems | null;
  configs: Array<_FetchStoreConfigurations | null>;
  blobUrlRootDirectory: string;
  companyId: number;
};

export type PageResponseType = {
  id: string | number;
  slug: string;
  store_id: number | string;
  type: string;
  name: string;
};

export interface _Country {
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
