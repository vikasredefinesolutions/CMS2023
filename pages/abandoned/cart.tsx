import { __Cookie } from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import {
  KlaviyoScriptTag,
  deleteCookie,
  extractCookies,
} from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { styled } from '@mui/material';
import { updateCartByNewUserId } from '@services/cart.service';
import { getCustomerAllowBalance } from '@services/payment.service';
import { GetStoreCustomer } from '@services/user.service';
import { getWishlist } from '@services/wishlist.service';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const MessageT = styled('h2')({
  fontSize: '50px',
  textAlign: 'center',
  margin: '80px 0',
});

const AbandonedCart: React.FC = () => {
  const router = useRouter();
  const cid = router.query.cid;
  const { code: storeCode } = useTypedSelector_v2((state) => state.store);

  const {
    updateWishListData,
    updateCustomer,
    customerCreditBalanceUpdate,
    customerUseCreditBalance,
    setShowLoader,
    logInUser,
  } = useActions_v2();

  const getCustomerDetail = async (id: any) => {
    let redirectPath = '/';
    setShowLoader(true);
    await GetStoreCustomer(id)
      .then((res) => {
        if (res === null) return;

        logInUser({
          id: id,
        });

        document.cookie = `userId=${id}; path=/`;

        redirectPath = paths.CART;
        if (localStorage) {
          const tempCustomerId = extractCookies(
            __Cookie.tempCustomerId,
            'browserCookie',
          ).tempCustomerId;
          if (tempCustomerId) {
            if (storeCode !== 'PKHG') {
              updateCartByNewUserId(~~tempCustomerId, res.id);
            }
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
        if (res.id) {
          getCustomerAllowBalance(res.id)
            .then((response) => {
              if (response && typeof response === 'number') {
                customerCreditBalanceUpdate(response);
                customerUseCreditBalance(true);
              }
            })
            .finally(() => {
              router.push(redirectPath);
            });
        }
      })
      .finally(() => {
        setShowLoader(false);
        // CartController();
      });
  };

  useEffect(() => {
    if (cid) {
      getCustomerDetail(cid);
    }
  }, []);

  return <MessageT>Please Wait Validating URL ...</MessageT>;
};

export default AbandonedCart;
