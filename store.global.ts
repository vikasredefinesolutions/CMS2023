interface _Store {
  code: string;
  favicon: string;
  logoUrl: string;
  blobUrl: string;
  companyId: number;
  customGoogleVerification: string;
  customFooterScript: string;
  googleFonts: string;
  storeId: null | number;
  customHeadScript: string;
  blobRootDirectory: string;
  storeTypeId: null | number;
  customGlobalBodyScript: string;
  isAttributeSaparateProduct: boolean;
  googleTags: _GoogleTags;
  set: (
    pair:
      | _StoreId
      | _CompanyId
      | _StoreCode
      | _StoreType
      | _StoreBlobUrl
      | _StoreFavicon
      | _StoreLogoUrl
      | _CustomGoogleVerification
      | _CustomFooterScript
      | _GoogleFonts
      | _CustomHeadScript
      | _CustomGlobalBodyScript
      | _StoreBlobRootDirectory
      | _isAttributeSaparateProduct
      | _GoogleTag
  ) => void;
}

interface _GoogleTags {
  twitterTags: {
    twitterTagRadio: boolean;
    twitterTagTextArea: string;
  };
  dcTags: {
    dcTagRadio: boolean;
    dcTagTextArea: string;
  };
}

export let _globalStore: _Store = {
  storeId: null,
  code: '',
  favicon: '',
  blobUrl: 'https://redefinecommerce.blob.core.windows.net',
  logoUrl: '',
  storeTypeId: null,
  blobRootDirectory: 'rdcstaging',
  isAttributeSaparateProduct: false,
  companyId: 0,
  set: (pair) => {
    _globalStore = { ..._globalStore, [pair.key]: pair.value };
  },
  customGlobalBodyScript: '',
  customHeadScript: '',
  googleFonts: '',
  customGoogleVerification: '',
  customFooterScript: '',
  googleTags: {
    twitterTags: {
      twitterTagRadio: false,
      twitterTagTextArea: '',
    },
    dcTags: {
      dcTagRadio: false,
      dcTagTextArea: '',
    },
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

interface _GoogleFonts {
  key: 'googleFonts';
  value: string;
}
interface _GoogleTag {
  key: 'googleTags';
  value: _GoogleTag;
}

interface _CustomHeadScript {
  key: 'customHeadScript';
  value: boolean;
}

interface _CustomGoogleVerification {
  key: 'customGoogleVerification';
  value: string;
}

interface _CustomFooterScript {
  key: 'customFooterScript';
  value: string;
}
interface _CustomGlobalBodyScript {
  key: 'customGlobalBodyScript';
  value: boolean;
}

interface _StoreBlobRootDirectory {
  key: 'blobUrlRootDirectory';
  value: string;
}

interface _isAttributeSaparateProduct {
  key: 'isAttributeSaparateProduct';
  value: boolean;
}
