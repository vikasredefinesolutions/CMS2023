import {
  _CacheAPIs,
  _HomeAPIs,
  _KlaviyoAPIs,
  _RedefineAppAPIs,
} from '@definations/common.type';
import { _FooterAPIs } from '@services/footer.service';
import { _GeneralAPIs } from '@services/general.service';
import { _GiftCardAPIs } from '@services/gift.service';
import { _HeaderAPIs } from '@services/header.service';
import { _LogoAPIs } from '@services/logo.service';
import { _ProducDetailAPIs_V2 } from '@services/product.service';
import { _SlugAPIs_V2 } from '@services/slug.service';
import { _StoryAPIs_V2 } from '@services/story.service';
import { _UserAPIs_V2 } from '@services/user.service';

export interface __Console {
  allCatch: boolean;
  serverMethod: {
    app: boolean;
    slug: boolean;
    requestConsultation: boolean;
  };
  app: {
    service: Record<_RedefineAppAPIs, boolean>;
  };
  header: {
    service: Record<_HeaderAPIs, boolean>;
  };
  footer: {
    service: Record<_FooterAPIs, boolean>;
  };
  product: {
    service: Record<_ProducDetailAPIs_V2, boolean>;
  };
  user: {
    service: Record<_UserAPIs_V2, boolean>;
  };
  general: {
    service: Record<_GeneralAPIs, boolean>;
  };
  slug: {
    service: Record<_SlugAPIs_V2, boolean>;
  };
  requestConsultation: {
    service: {
      SumbitRequestConsultationDetails: boolean;
    };
  };
  productDetails: {
    service: Record<_ProducDetailAPIs_V2, boolean>;
  };
  home: {
    service: Record<_HomeAPIs, boolean>;
  };
  giftCard: {
    service: Record<_GiftCardAPIs, boolean>;
  };
  Klaviyo: {
    service: Record<_KlaviyoAPIs, boolean>;
  };
  cacheAPIs: {
    service: Record<_CacheAPIs, boolean>;
  };
  Logo: { service: Record<_LogoAPIs, boolean> };
  Story: {
    service: Record<_StoryAPIs_V2, boolean>;
  };
}
