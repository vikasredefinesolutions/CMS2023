import { __Cookie_Expiry } from '@constants/common.constant';
import { __Cookie } from '@constants/global.constant';
import { thirdPartyLoginService } from '@constants/pages.constant';
import { WishlistType } from '@definations/wishlist.type';
import {
  deleteCookie,
  extractCookies,
  KlaviyoScriptTag,
  setCookie,
} from '@helpers/common.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { updateCartByNewUserId } from '@services/cart.service';
import { PunchoutPostApi } from '@services/punchout.service';
import { GetStoreCustomer, punchoutLogin } from '@services/user.service';
import { getWishlist } from '@services/wishlist.service';
import { useRouter } from 'next/router';
import getRawBody from 'raw-body';
import { useEffect } from 'react';

const Punchout = (props: any) => {
  const router = useRouter();
  const { id: storeId } = useTypedSelector_v2((state) => state.store);

  function parseXmlToJson(xml: any) {
    const json: any = {};
    for (const res of xml.matchAll(
      /(?:<(\w*)(?:\s[^>]*)*>)((?:(?!<\1).)*)(?:<\/\1>)|<(\w*)(?:\s*)*\/>/gm,
    )) {
      const key = res[1] || res[3];
      const value = res[2] && parseXmlToJson(res[2]);
      json[key] = (value && Object.keys(value).length ? value : res[2]) || null;
    }
    return json;
  }

  useEffect(() => {
    if (storeId) {
      (async () => {
        const params = new URLSearchParams(props.body);
        let obj: Record<string, any> = {
          pos: params.get('pos'),
          return_url: params.get('return_url'),
          params: JSON.parse(params.get('params') || ''),
          payloadID:
            '200308221150.1061578208432.5888140454604746680@punchout2go.com',
          timestamp: '2003-08-22T11:50:27',
          lang: 'en-US',
        };

        let a = `${JSON.stringify(obj)}`;
        const b = await PunchoutPostApi(a);
        const xml = b
          .toString()
          .replace('###StoreUrl###', `https://${props.returnUrl}`);
        const xmlJson = parseXmlToJson(xml);
        const url = `${
          xmlJson.cXML.Response.PunchOutSetupResponse.StartPage.URL
        }&returnUrl=${btoa(obj.return_url)}`;
        const urlSearch = new URLSearchParams(
          xmlJson.cXML.Response.PunchOutSetupResponse.StartPage.URL,
        );
        localStorage.setItem('returnUrl', obj.return_url);

        const sessionid = urlSearch.get('sessionid');
        console.log(sessionid);
        if (sessionid && storeId) {
          const punchoutLoginPayload = {
            sessionId: sessionid,
            storeId: storeId,
            customerId: 0,
            browserInfo: 'Chrome',
          };
          punchoutLogin(punchoutLoginPayload).then((customerId) => {
            logInUser({
              id: +customerId,
            });
            setCookie(__Cookie.userId, customerId, __Cookie_Expiry.userId);
            setShowLoader(true);
            GetStoreCustomer(+customerId)
              .then((res) => {
                if (res === null) return;
                if (localStorage) {
                  const tempCustomerId = extractCookies(
                    __Cookie.tempCustomerId,
                    'browserCookie',
                  ).tempCustomerId;
                  localStorage.setItem(
                    'thirdPartyServices',
                    thirdPartyLoginService.punchoutLogin,
                  );
                  localStorage.setItem('P_SID', btoa(sessionid.toString()));
                  if (tempCustomerId) {
                    updateCartByNewUserId(~~tempCustomerId, res.id);
                    deleteCookie(__Cookie.tempCustomerId);
                  }
                }

                const userInfo = {
                  $email: res.email,
                  $first_name: res.firstname,
                  $last_name: res.lastName,
                  $phone_number: '',
                  $organization: res.companyName,
                  $title: 'title',
                  $timestamp: new Date(),
                };

                KlaviyoScriptTag(['identify', userInfo]);
                updateCustomer({ customer: res });
                getWishlist(res.id).then((wishListResponse) => {
                  updateWishListData(wishListResponse);
                });
              })
              .finally(() => {
                setShowLoader(false);
                setTimeout(() => router.push('/'), 2000);
              });
          });
        }

        // window.open(url);
      })();
    }
  }, [storeId]);

  return <>This page exists and getting response</>;
};

export default Punchout;

export const getServerSideProps = async (context: any) => {
  const body = await getRawBody(context?.req);
  return {
    props: { body: body.toString(), returnUrl: context.req.headers.host },
  };
};
function logInUser(arg0: { id: number }) {
  throw new Error('Function not implemented.');
}

function setShowLoader(arg0: boolean) {
  throw new Error('Function not implemented.');
}

function updateCustomer(arg0: {
  customer: import('../../../../definations_v2/APIs/user.res').UserType;
}) {
  throw new Error('Function not implemented.');
}

function updateWishListData(wishListResponse: WishlistType) {
  throw new Error('Function not implemented.');
}
