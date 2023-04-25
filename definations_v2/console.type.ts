import { _RedefineAppAPIs } from '@services/app.service';
import { _CacheAPIs } from '@services/cache.service';
import { _ShoppingCartAPIs } from '@services/cart.service';
import { _FileUploadAPIs } from '@services/file.service';
import { _GiftCardAPIs } from '@services/gift.service';
import { _HeaderAPIs } from '@services/header.service';
import { _HomeAPIs } from '@services/home.service';
import { _KlaviyoAPIs } from '@services/klaviyo.service';
import { _LogoAPIs } from '@services/logo.service';
import { _ProducDetailAPIs_V2 } from '@services/product.service';
import { _SlugAPIs_V2 } from '@services/slug.service';
import { _UserAPIs_V2 } from '@services/user.service';

export interface __Console {
  allCatch: boolean;
  requestConsultation: {
    controller: boolean;
    page: boolean;
    serverMethod: boolean;
    service: {
      SumbitRequestConsultationDetails: boolean;
    };
  };
  slug: {
    serverMethod: boolean;
    page: boolean;
    service: Record<_SlugAPIs_V2, boolean>;
  };
  files: {
    service: Record<_FileUploadAPIs, boolean>;
  };
  user: {
    service: Record<_UserAPIs_V2, boolean>;
  };
  app: {
    controller: boolean;
    serverMethod: boolean;
    page: boolean;
    service: Record<_RedefineAppAPIs, boolean>;
  };
  header: {
    service: Record<_HeaderAPIs, boolean>;
  };
  productDetails: {
    service: Record<_ProducDetailAPIs_V2, boolean>;
    controller: boolean;
    components: {
      similarProducts: boolean;
    };
    serverMethod: boolean;
    page: boolean;
  };
  compare: {
    controller: boolean;
    serverMethod: boolean;
    page: boolean;
  };
  home: {
    controller: boolean;
    component: {
      featuredItems: boolean;
    };
    service: Record<_HomeAPIs, boolean>;
  };
  giftCard: {
    serverMethod: false;
    controller: boolean;
    component: {
      details: boolean;
      list: boolean;
    };
    service: Record<_GiftCardAPIs, boolean>;
  };
  cacheAPIs: {
    service: Record<_CacheAPIs, boolean>;
  };
  ShoppingCart: {
    service: Record<_ShoppingCartAPIs, boolean>;
  };
  Logo: { service: Record<_LogoAPIs, boolean> };
  Klaviyo: {
    service: Record<_KlaviyoAPIs, boolean>;
  };
}
