import { __Cookie, __Cookie_Expiry } from '@constants/global.constant';
import { _Invalid, _Valid } from '@definations/APIs/user.res';
import {
  KlaviyoScriptTag,
  deleteCookie,
  extractCookies,
  setCookie,
} from '@helpers/common.helper';
import { useActions_v2 } from '@hooks_v2/index';
import { updateCartByNewUserId } from '@services/cart.service';
import { FetchSAMPLProfile } from '@services/saml.service';
import { GetStoreCustomer } from '@services/user.service';
import { getWishlist } from '@services/wishlist.service';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import getRawBody from 'raw-body';
import { useEffect, useState } from 'react';
import { _globalStore } from 'store.global';
interface _Props {
  userIdInfo: _Valid | _Invalid;
  paramsData: {
    samlResponse: string | null;
  };
}
const SSOLoginPage: NextPage<_Props> = ({ userIdInfo, paramsData }) => {
  const [showErroMsg, setErrorMsg] = useState<null | string>(null);
  const [login, setlogin] = useState<null | boolean>(false);
  const query = paramsData.samlResponse;
  const { logInUser, setShowLoader, updateCustomer, updateWishListData } =
    useActions_v2();
  const router = useRouter();
  useEffect(() => {
    if (userIdInfo) {
      if (userIdInfo.credentials === 'INVALID' && userIdInfo.message) {
        setErrorMsg(userIdInfo.message);
      }
      if (userIdInfo.credentials === 'VALID' && userIdInfo.id) {
        logInUser({
          id: +userIdInfo.id,
        });
        setlogin(true);
        setCookie(__Cookie.userId, userIdInfo.id, __Cookie_Expiry.userId);
        setShowLoader(true);
        GetStoreCustomer(+userIdInfo.id)
          .then((res) => {
            if (res === null) return;
            if (localStorage) {
              const tempCustomerId = extractCookies(
                __Cookie.tempCustomerId,
                'browserCookie',
              ).tempCustomerId;

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
      }
    } else {
      setErrorMsg('login failed');
    }
  }, [query]);

  return (
    <div className=''>
      <section className='container mx-auto text-center'>
        <div className='pt-[60px] pb-[30px] flex flex-col justify-center items-center '>
          <div className='text-center mb-[40px]'></div>
          <div className='mb-[30px] mt-[15px]'>
            <div className='text-2xl-text mb-[20px] font-bold border-rose-600'>
              {login ? (
                <>Saml login sucessfull</>
              ) : (
                <>{showErroMsg ? showErroMsg : <>Saml login failed</>}</>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let userIdInfo = {};
  const body = await getRawBody(context?.req);
  const params = new URLSearchParams(body.toString());
  let paramsData: { samlResponse: string | null } = { samlResponse: '' };
  paramsData = {
    samlResponse: params.get('SAMLResponse'),
  };
  let store = {
    storeCode: _globalStore.code,
    storeTypeId: _globalStore.storeTypeId,
    storeId: _globalStore.storeId,
  };
  if (store.storeId && paramsData?.samlResponse) {
    const payload = {
      profileModel: {
        storeId: store.storeId,
        base64SAMLResponse: paramsData.samlResponse,
      },
    };
    userIdInfo = await FetchSAMPLProfile(payload);
  }
  // console.log(obj, 'object');

  return {
    props: {
      userIdInfo: userIdInfo,
      paramsData: paramsData,
      storeId: store.storeId,
    },
  };
};
export default SSOLoginPage;
