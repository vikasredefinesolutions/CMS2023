import { newFetauredItemResponse } from '@definations/productList.type';

export interface Welcome {
  success: boolean;
  data: _StoreDetails;
  errors: Errors;
  otherData: null;
}

export interface _StoreDetails {
  storeXPaymetnOptionListViewModels: any[];
  id: number;
  storeTypeId: number;
  storeType: StoreType;
  name: string;
  code: string;
  url: string;
  navCode: string;
  prefix: string;
  logoUrl: string;
  isLandingPage: boolean;
  isBlogPage: boolean;
  isReviewMaster: boolean;
  isSeoMarketing: boolean;
  isAttributeSaparateProduct: boolean;
  attributeid: number;
  isQuantityDiscount: boolean;
  isFirstLogoFree: boolean;
  isLinepersonalization: boolean;
  firstLineCharges: number;
  secondLineCharges: number;
  isProductReadinessAllow: boolean;
  isSeoReadinessAllow: boolean;
  isShippingCharge: boolean;
  isFreeShipping: boolean;
  generalAmount: number;
  punchoutMessage: string;
  checkOutRequiredThirdPartyLogin: boolean;
  domainBasedLogin: boolean;
  domainBasedLoginDesc: string;
  generalLogin: boolean;
  thirdPartyLogin: boolean;
  bothLogin: boolean;
  onlyGuestLogin: boolean;
  isBrandStore: boolean;
  storeBrandId: number;
  parentstoreid: number;
  billToCustomer: null;
  favicon: string | null;
  recStatus: string;
  createdDate: Date;
  createdBy: number;
  modifiedDate: Date;
  modifiedBy: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
  isSmallRun: boolean;
  smallRunLimit: number;
  smallRunFeesCharges: number;
  isLogoSetupCharges: boolean;
  logoSetupCharges: number;
}

export interface StoreType {
  id: number;
  name: string;
  recStatus: string;
  createdDate: Date;
  createdBy: number;
  modifiedDate: null;
  modifiedBy: null;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
}

export interface _SelectedBrands {
  bg?: _Value;
  sectionTitle?: _Value;
  sectionTitle_final_class?: _Value;
  featuredproducts_tabing_display: _Value;
  featuredproducts_section_title: _Value;
  featuredproducts_footer_tabing_display: _Value;
  featuredproducts_product_to_display: _Value;
  featuredproducts_show_border: _Value;
  featuredproducts_custom_message: _Value;
  featuredproducts_show_product_name: _Value;
  featuredproducts_show_price: _Value;
  featuredproducts_show_button: _Value;
  featuredproducts_show_brand_logo: _Value;
  featuredproducts_show_split_products: _Value;
  featuredproducts: {
    type: string;
    value: {
      data: newFetauredItemResponse[];
      displayMethod: string;
      footerTabColorName: string;
      index: string;
      productCount: number;
      selectedProducts: any;
      tabName: string;
      tabing: string;
      proudctType?: string;
      selectedBrands: { value: string; label: string }[];
      label: string;
    }[];
  };
}

export interface _Value {
  type: string;
  value: string;
}

export interface _FeaturedProduct {
  productId: number;
  productName: string;
  productSEName: string;
  ourCost: string;
  msrp: string;
  imap: string;
  salePrice: string;
  productDisplayOrder: number;
  imageUrl: string;
  moreImages: _FeaturedMoreImages[];
}

export interface _FeaturedMoreImages {
  id: number;
  attributeOptionID: number;
  attributeOptionName: string;
  imageUrl: string;
  displayOrder: number;
  altTag: string;
}

export interface Errors {}
