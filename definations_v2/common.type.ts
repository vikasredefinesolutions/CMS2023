export type _RedefineAppAPIs = 'GetStoreID' | 'FetchThemeConfigs';

export interface _RedefineAppServices {
  service: 'app';
  api: _RedefineAppAPIs;
}

export type _CacheAPIs = 'ClearCategoryCache' | 'ClearBrandCache';

export interface _CacheApiServices {
  service: 'cacheAPIs';
  api: _CacheAPIs;
}

export type _FooterAPIs = 'FetchFooter';

export type _FooterServices = {
  service: 'footer';
  api: _FooterAPIs;
};

export type _GiftCardAPIs =
  | 'FetchGiftCardsList'
  | 'FetchGiftCardDetailsBySename';

export type _GiftCardService = {
  service: 'giftCard';
  api: _GiftCardAPIs;
};

export type _HomeAPIs = 'FetchFeaturedProducts' | 'getPageComponents';

export interface _HomeServices {
  service: 'home';
  api: _HomeAPIs;
}

export type _KlaviyoAPIs = 'Klaviyo_PlaceOrder' | 'Klaviyo_BackInStock';

export interface _KlaviyoServices {
  service: 'Klaviyo';
  api: _KlaviyoAPIs;
}

export type _ProducDetailAPIs =
  | 'FetchProductsBySKUs'
  | 'FetchSizeChartById'
  | 'FetchDiscountTablePrices'
  | 'FetchSimilartProducts'
  | 'FetchProductSEOtags'
  | 'FetchColors'
  | 'FetchProductById'
  | 'FetchInventoryById'
  | 'FetchBrandProductList'
  | 'FetchProductsTagsName'
  | 'FetchLogoLocationByProductId';

export type _ProductDetailService = {
  service: 'productDetails';
  api: _ProducDetailAPIs;
};

export type _RequestConsultationAPIs = 'SumbitRequestConsultationDetails';

export type _RequestConsultationService = {
  service: 'requestConsultation';
  api: _RequestConsultationAPIs;
};

export type _SlugAPIs = 'getPageType';

export interface _SlugServices {
  service: 'slug';
  api: _SlugAPIs;
}

export type _UserAPIs =
  | 'signInUser'
  | 'CreateNewAccount'
  | 'OrderedBillingDetails'
  | 'OrderedProductDetails'
  | 'FetchOrderIds'
  | 'GetStoreCustomer'
  | 'FetchOrderDetails'
  | 'UpdatePasswordForGuestEmail'
  | 'GetEmailByResetToken'
  | 'ResetPassword'
  | 'FetchUserOrderIds';
export interface _UserServices {
  service: 'user';
  api: _UserAPIs;
}

export type _ShoppingCartAPIs = 'FetchCartDetails';

export type _ShoppingCartService = {
  service: 'ShoppingCart';
  api: _ShoppingCartAPIs;
};
