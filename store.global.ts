import { _GetPageType } from '@definations/slug.type';

interface _Store {
  newTab: boolean;
  // Store
  code: string;
  favicon: string;
  logoUrl: string;
  storeId: number;
  storeTypeId: number;
  isAttributeSaparateProduct: boolean;
  domain: string;
  // Store Builder
  showHomePage: boolean;
  filters: boolean;

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
  bacardiSelectedStore: string | null;

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

  //GTM scripts
  topHeaderScriptGTM: string;
  bottomHeaderScriptGTM: string;
  topBodySnippetGTM: string;
  homePageScriptGTM: string;

  //Klaviyo Key
  klaviyoKey: string;
  klaviyoKeyApi: string;

  // Page Details
  pageMetaData: _GetPageType | null;

  set: (
    pair:
      | _NewTab

      // Store
      | _StoreId
      | _StoreCode
      | _StoreTypeId
      | _StoreFavicon

      // Store Builder
      | _StoreLogoUrl
      | _ShowHomePage
      | _ShowFilters

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
      | _GoogleTags
      | _TopHeaderGTMScript
      | _BottomHeaderGTMScript
      | _TopBodySnippetGTM
      | _HomePageGTMScript
      | _KlaviyoKey
      | _KlaviyoKeyApi
      | _domain
      | _BacardiSelectedStore

      // Page Details
      | _PageMetaData,
  ) => void;
}

export let _globalStore: _Store = {
  newTab: true,
  // Store
  code: '',
  storeId: 0,
  favicon: '',
  logoUrl: '',
  storeTypeId: 0,
  domain: '',
  isAttributeSaparateProduct: false,

  // Store Builder
  showHomePage: true,
  filters: false,

  // Admin Configs
  blobUrl: '',
  companyId: 0,
  blobUrlRootDirectory: '',
  bacardiSelectedStore: '',

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

  //GTM scripts
  topHeaderScriptGTM: '',
  bottomHeaderScriptGTM: '',
  topBodySnippetGTM: '',
  homePageScriptGTM: '',

  //Klaviyo key
  klaviyoKey: '',
  klaviyoKeyApi: '',

  // Page Details
  pageMetaData: null,

  set: (pair) => {
    _globalStore = { ..._globalStore, [pair.key]: pair.value };
  },
};

interface _NewTab {
  key: 'newTab';
  value: boolean;
}

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

// -------------------------------- Store Builder

interface _ShowHomePage {
  key: 'showHomePage';
  value: boolean;
}

interface _ShowFilters {
  key: 'filters';
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

interface _TopHeaderGTMScript {
  key: 'topHeaderScriptGTM';
  value: string | null;
}

interface _BottomHeaderGTMScript {
  key: 'bottomHeaderScriptGTM';
  value: string | null;
}

interface _TopBodySnippetGTM {
  key: 'topBodySnippetGTM';
  value: string | null;
}

interface _HomePageGTMScript {
  key: 'homePageScriptGTM';
  value: string | null;
}

interface _KlaviyoKey {
  key: 'klaviyoKey';
  value: string | null;
}

interface _KlaviyoKeyApi {
  key: 'klaviyoKeyApi';
  value: string | null;
}

interface _domain {
  key: 'domain';
  value: string;
}

interface _BacardiSelectedStore {
  key: 'bacardiSelectedStore';
  value: string | null;
}

interface _PageMetaData {
  key: 'pageMetaData';
  value: _GetPageType | null;
}
