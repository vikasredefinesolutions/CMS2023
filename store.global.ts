interface _Store {
  // Store
  code: string;
  favicon: string;
  logoUrl: string;
  storeId: number;
  storeTypeId: number;
  isAttributeSaparateProduct: boolean;

  // Admin Configs
  blobUrl: string;
  companyId: number;
  blobUrlRootDirectory: string;

  // Custom Scripts
  googleFonts: string;
  customHeadScript: string;
  customFooterScript: string;
  customGlobalBodyScript: string;
  customGoogleVerification: string;

  // Google Tags
  googleTags: {
    twitterTags: {
      twitterTagRadio: boolean;
      twitterTagTextArea: string;
    };
    dcTags: {
      dcTagRadio: boolean;
      dcTagTextArea: string;
    };
  };
  set: (
    pair: // Store
    | _StoreId
      | _StoreCode
      | _StoreTypeId
      | _StoreFavicon
      | _StoreLogoUrl

      // Admin Configs
      | _CompanyId
      | _StoreBlobUrl
      | _StoreBlobRootDirectory

      // Custom Scripts
      | _GoogleFonts
      | _CustomHeadScript
      | _CustomFooterScript
      | _CustomGlobalBodyScript
      | _CustomGoogleVerification
      | _isAttributeSaparateProduct

      // Google Tags
      | _GoogleTags,
  ) => void;
}

export let _globalStore: _Store = {
  // Store
  code: '',
  storeId: 0,
  favicon: '',
  logoUrl: '',
  storeTypeId: 0,
  isAttributeSaparateProduct: false,

  // Admin Configs
  blobUrl: '',
  companyId: 0,
  blobUrlRootDirectory: '',

  // Custom Scripts
  googleFonts: '',
  customHeadScript: '',
  customFooterScript: '',
  customGlobalBodyScript: '',
  customGoogleVerification: '',

  // Google Tags
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
  set: (pair) => {
    _globalStore = { ..._globalStore, [pair.key]: pair.value };
  },
};

// -----------------------------------Store
interface _StoreId {
  key: 'storeId';
  value: number;
}

interface _StoreCode {
  key: 'code';
  value: string;
}

interface _StoreTypeId {
  key: 'storeTypeId';
  value: number;
}

interface _StoreFavicon {
  key: 'favicon';
  value: string;
}

interface _StoreLogoUrl {
  key: 'logoUrl';
  value: string;
}

interface _isAttributeSaparateProduct {
  key: 'isAttributeSaparateProduct';
  value: boolean;
}

// --------------------------------Admin Configs
interface _CompanyId {
  key: 'companyId';
  value: number;
}

interface _StoreBlobUrl {
  key: 'blobUrl';
  value: string;
}

interface _StoreBlobRootDirectory {
  key: 'blobUrlRootDirectory';
  value: string;
}

// --------------------------------Custom Scripts

interface _GoogleFonts {
  key: 'googleFonts';
  value: string;
}

interface _CustomHeadScript {
  key: 'customHeadScript';
  value: string;
}

interface _CustomFooterScript {
  key: 'customFooterScript';
  value: string;
}

interface _CustomGoogleVerification {
  key: 'customGoogleVerification';
  value: string;
}

interface _CustomGlobalBodyScript {
  key: 'customGlobalBodyScript';
  value: string;
}

// --------------------------------Google Tags
interface _GoogleTags {
  key: 'googleTags';
  value: {
    twitterTags: {
      twitterTagRadio: boolean;
      twitterTagTextArea: string;
    };
    dcTags: {
      dcTagRadio: boolean;
      dcTagTextArea: string;
    };
  };
}
