import { __Cookie, __Cookie_Expiry } from '@constants/global.constant';
import { getServerSideProps } from '@controllers/getServerSideProps';
import { _SlugServerSideProps } from '@definations/slug.type';
import {
  deleteCookie,
  extractCookies,
  KlaviyoScriptTag,
  setCookie,
} from '@helpers/common.helper';
import { useActions_v2 } from '@hooks_v2/index';
import { updateCartByNewUserId } from '@services/cart.service';
import { FetchSAMPLProfile } from '@services/saml.service';
import { GetStoreCustomer } from '@services/user.service';
import { getWishlist } from '@services/wishlist.service';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SSOLoginPage: NextPage<_SlugServerSideProps> = (props) => {
  const { pageMetaData, page, _store } = props;
  const [showErroMsg, setErrorMsg] = useState<null | string>(null);
  const storeId = pageMetaData?.storeId;
  const router = useRouter();
  const query = router.query;
  const { logInUser, setShowLoader, updateCustomer, updateWishListData } =
    useActions_v2();
  useEffect(() => {
    setShowLoader(true);
    if (storeId && query.token) {
      FetchSAMPLProfile({
        storeId,
        base64SAMLResponse: typeof query.token == 'string' ? query.token : '',
      })
        .then((user) => {
          if (user.credentials === 'INVALID' && user.message) {
            setErrorMsg(user.message);
          }
          if (user.credentials === 'VALID' && user.id) {
            // modalHandler(null);
            logInUser({
              id: +user.id,
            });
            setCookie(__Cookie.userId, user.id, __Cookie_Expiry.userId);

            GetStoreCustomer(+user.id).then((res) => {
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
            });
          }
        })
        .finally(() => {
          setShowLoader(false);
        });
    }
  }, [query]);

  return (
    <div className=''>
      <section className='container mx-auto text-center'>
        <div className='pt-[60px] pb-[30px] flex flex-col justify-center items-center '>
          <div className='text-center mb-[40px]'></div>
          <div className='mb-[30px] mt-[15px]'>
            <div className='text-2xl-text mb-[20px] font-bold border-rose-600'>
              {showErroMsg ? showErroMsg : <>Saml login sucessfull</>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default SSOLoginPage;

export { getServerSideProps };
