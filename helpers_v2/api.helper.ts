import { _RedefineAppServices } from '@services/app.service';
import { _CacheApiServices } from '@services/cache.service';
import { _GeneralService } from '@services/general.service';
import { _GiftCardService } from '@services/gift.service';
import { _HeaderServices } from '@services/header.service';
import { _HomeServices } from '@services/home.service';
import { _KlaviyoServices } from '@services/klaviyo.service';
import { _LogoApiService } from '@services/logo.service';
import { _ProductDetailService_V2 } from '@services/product.service';
import { _SlugService_V2 } from '@services/slug.service';
import { _StoreRequestService_V2 } from '@services/storerequest.service';
import { _StoryService_V2 } from '@services/story.service';
import { _UserServices_V2 } from '@services/user.service';
import { SendAsync } from '@utils/axios.util';
import { _GET, _POST } from './helpers';

interface _cAxiosResponse<T> {
  success: boolean;
  data: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
}

export const CallAPI_v2 = async <T>({
  request,
  name,
}: {
  name:
    | _ProductDetailService_V2
    | _UserServices_V2
    | _GeneralService
    | _SlugService_V2
    | _HeaderServices
    | _RedefineAppServices
    | _GiftCardService
    | _KlaviyoServices
    | _CacheApiServices
    | _HomeServices
    | _LogoApiService
    | _StoreRequestService_V2
    | _StoryService_V2;
  request: _GET | _POST;
}) => {
  // conditionalLog_V2({
  //   data: request,
  //   name: name.api,
  //   type: 'API-PAYLOAD',
  //   // @ts-ignore: Unreachable code error
  //   show: __console_v2[name.service].service[name.api],
  // });
  try {
    const res = await SendAsync<T>(request);
    // conditionalLog_V2({
    //   data: res,
    //   name: `${name.service} - ${name.api}`,
    //   type: 'API-RESPONSE',
    //   // @ts-ignore: Unreachable code error
    //   show: __console_v2[name.service].service[name.api],
    // });
    return res;
  } catch (error) {
    // conditionalLog_V2({
    //   data: error,
    //   name: `${name.service} - ${name.api}`,
    //   type: 'API-ERROR',
    //   // @ts-ignore: Unreachable code error
    //   show: __console_v2[name.service].service[name.api],
    // });
    return null;
  }
};
