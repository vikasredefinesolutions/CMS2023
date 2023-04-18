interface _Store {
  code: string;
  favicon: string;
  logoUrl: string;
  blobUrl: string;
  storeId: null | number;
  blobRootDirectory: string;
  storeTypeId: null | number;
  isAttributeSaparateProduct: boolean;
  companyId: number;
  set: (
    pair:
      | _StoreId
      | _StoreCode
      | _StoreType
      | _StoreBlobUrl
      | _StoreFavicon
      | _StoreLogoUrl
      | _StoreBlobRootDirectory
      | _isAttributeSaparateProduct
      | _CompanyId,
  ) => void;
}

export let _globalStore: _Store = {
  storeId: null,
  code: '',
  favicon: '',
  blobUrl: 'https://redefinecommerce.blob.core.windows.net',
  logoUrl: '',
  storeTypeId: null,
  blobRootDirectory: 'rdcbeta',
  isAttributeSaparateProduct: false,
  companyId: 1,
  set: (pair) => {
    _globalStore = { ..._globalStore, [pair.key]: pair.value };
  },
};

interface _StoreId {
  key: 'storeId';
  value: number;
}

interface _StoreCode {
  key: 'code';
  value: string;
}

interface _CompanyId {
  key: 'companyId';
  value: number;
}

interface _StoreType {
  key: 'storeTypeId';
  value: number | null;
}

interface _StoreFavicon {
  key: 'favicon';
  value: string;
}
interface _StoreLogoUrl {
  key: 'logoUrl';
  value: string;
}
interface _StoreBlobUrl {
  key: 'blobUrl';
  value: string;
}

interface _StoreBlobRootDirectory {
  key: 'blobUrlRootDirectory';
  value: string;
}

interface _isAttributeSaparateProduct {
  key: 'isAttributeSaparateProduct';
  value: boolean;
}
