import { __Console } from './console';

export const __show = {
  all: false,
  services: {
    payload: true,
    response: true,
    error: true,
  },
  serverMethods: false,
  functions: false,
  catch: true,
};

export const __console_v2: __Console = {
  allCatch: true,
  serverMethod: {
    app: false,
    slug: false,
    requestConsultation: false,
  },
  app: {
    service: {
      GetStoreID: true,
      FetchThemeConfigs: false,
    },
  },
  user: {
    service: {
      UpdatePaymentLater: false,
      FetchUserOrderIds: false,
      CheckIfEmailIsAlreadyRegistered: false,
      SignInUser: false,
      FetchOrderIds: false,
      ResetPassword: false,
      CreateNewAccount: false,
      GetStoreCustomer: false,
      FetchOrderDetails: false,
      GetEmailByResetToken: false,
      OrderedBillingDetails: false,
      OrderedProductDetails: false,
      UpdatePasswordForGuestEmail: false,
      GetCustomerUsersByCustomerId: false,
      GetDecryptPass: false,
      GetCityStateCountryWithZip: false,
    },
  },
  product: {
    service: {
      FetchColors: false,
      FetchProductById: false,
      FetchSizeChartById: false,
      FetchInventoryById: false,
      FetchProductsBySKUs: false,
      FetchProductSEOtags: false,
      FetchBrandProductList: false,
      FetchFeaturedProducts: false,
      FetchProductsTagsName: false,
      FetchSimilartProducts: false,
      FetchDiscountTablePrices: false,
      FetchLogoLocationByProductId: false,
      FetchLogoLocationByStoreId: false,
      SumbitRequestConsultationDetails: false,
      SendCompareLinkByEmail: false,
      FetchCustomerQuantityByProductId: false,
      FetchCustomSearch: false,
    },
  },
  general: {
    service: {
      UploadImage: false,
      FetchStatesList: false,
      FetchCountriesList: false,
      FetchIndustriesList: false,
    },
  },
  slug: {
    service: {
      FetchPageType: true,
      FetchPageComponents: false,
    },
  },
  requestConsultation: {
    service: {
      SumbitRequestConsultationDetails: true,
    },
  },

  footer: {
    service: {
      GetStoreConfigurations: false,
    },
  },
  productDetails: {
    service: {
      FetchColors: false,
      FetchProductById: false,
      FetchSizeChartById: false,
      FetchInventoryById: false,
      FetchProductSEOtags: false,
      FetchProductsBySKUs: false,
      FetchBrandProductList: false,
      FetchProductsTagsName: false,
      FetchSimilartProducts: false,
      FetchDiscountTablePrices: false,
      FetchLogoLocationByProductId: false,
      FetchLogoLocationByStoreId: false,
      SumbitRequestConsultationDetails: false,
      FetchFeaturedProducts: false,
      SendCompareLinkByEmail: false,
      FetchCustomerQuantityByProductId: false,
      FetchCustomSearch: false,
    },
  },
  home: {
    service: {
      FetchFeaturedProducts: false,
      getPageComponents: false,
    },
  },
  header: {
    service: {
      FetchCatalog: false,
      FetchBrands: false,
      FetchStoreMenu: false,
      FetchMenuTopics: false,
      FetchBannerDetails: false,
      FetchMenuCategories: false,
    },
  },
  giftCard: {
    service: {
      FetchGiftCardsList: false,
      FetchGiftCardDetailsBySename: false,
    },
  },
  Klaviyo: {
    service: {
      Klaviyo_PlaceOrder: false,
      Klaviyo_BackInStock: false,
    },
  },
  cacheAPIs: {
    service: {
      ClearBrandCache: false,
      ClearCategoryCache: false,
    },
  },
  Logo: {
    service: {
      UploadLogoWithDetails: false,
    },
  },
  Story: {
    service: {
      GetStoriesByCategoryURL: false,
      GetNextStoryByStoryID: false,
      GetStoryList: false,
    },
  },
  storeBuilder: {
    service: {
      FetchSbStoreConfiguration: false,
      FetchSbStoreMessages: false,
      FetchSbStoreFixedFees: false,
      FetchSbStoreFees: false,
      FetchSbCouponRebates: false,
      FetchSbCustomFields: false,
      FetchSbStoreOrderTax: false,
    },
  },
};
