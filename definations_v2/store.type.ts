export interface _StoreReturnType {
  storeId: null | number;
  layout: null | string;
  pageType: string;
  storeTypeId: null | number;
  pathName: string;
  code: string;
  storeName: string | null;
  isAttributeSaparateProduct: boolean;
  cartCharges: null | {
    isSmallRun: boolean;
    smallRunLimit: number;
    smallRunFeesCharges: number;
    isLogoSetupCharges: boolean;
    logoSetupCharges: number;
  };
  urls: {
    logo: string;
    favicon: string;
  };
  mediaBaseUrl: string;
  sewOutCharges: number;
  firstLineCharges: number;
  secondLineCharges: number;
  imageFolderPath: string;
  isSewOutEnable: boolean;
  shippingChargeType: number;
}

export interface _FetchStoreConfigurations {
  id: number;
  status: string;
  store_id: number;
  config_name: string;
  created_at: null | string;
  updated_at: null | string;
  config_value: null | string;
}
export type StoreConfigurationConfigs =
  | 'footer'
  | 'customScript'
  | 'customHomeScript'
  | 'customGlobalBodyScript'
  | 'header_config'
  | 'googleTags';
