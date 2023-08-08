import LoginModal from '@appComponents/modals/loginModal';
import ThirdPartyLogin from '@appComponents/modals/loginModal/ThirdPartyLogin';
import SeoHead from '@appComponents/reUsable/SeoHead';
import { _defaultTemplates } from '@configs/template.config';
import { CG_STORE_CODE, _Store_CODES } from '@constants/global.constant';
import { _modals } from '@definations/product.type';
import {
  GoogleAnalyticsTrackerForAllStore,
  GoogleAnalyticsTrackerForCG,
} from '@helpers/common.helper';
import {
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';

import { FetchPageThemeConfigs } from '@services/product.service';
import CartTemplate from '@templates/Cart';
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { _globalStore } from 'store.global';
const Cart: NextPage<{ templateId: number }> = ({ templateId }) => {
  const isCaptured = useRef(false);
  const { cart_PageClosed, fetchCartDetails, update_productDetails } =
    useActions_v2();

  // global states
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const employeeId = useTypedSelector_v2((state) => state.employee.empId);
  const { lastUpdate: lastUpdatedAt, cart: cartData } = useTypedSelector_v2(
    (state) => state.cart,
  );

  // Local states
  const [cartApiLoadedOnce, setCartApiLoadedOnce] = useState<{
    show: null | 'loader' | 'emptyCart' | 'dataFound';
    lastUpdatedAt: number;
  }>({ show: null, lastUpdatedAt: 0 });
  const router = useRouter();
  // imported Functions
  const customerId = GetCustomerId();

  const { id: userID, roles } = useTypedSelector_v2((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const { thirdPartyLogin, code: storeCode } = useTypedSelector_v2(
    (state) => state.store,
  );

  useEffect(() => {
    if (
      (storeCode === _Store_CODES.UNITi ||
        storeCode === _Store_CODES.USAACLAIMS) &&
      !userID &&
      roles.customerId
    ) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [userID, roles]);

  const modalHandler = (arg: _modals | null) => {
    setShowModal(false);
  };
  const closeHandler = () => {
    router.push('/').then(() => setShowModal(false));
  };

  const renderLoginModal = () => {
    return thirdPartyLogin ? (
      <ThirdPartyLogin
        modalHandler={modalHandler}
        closeHandler={closeHandler}
      />
    ) : (
      <LoginModal modalHandler={modalHandler} closeHandler={closeHandler} />
    );
  };

  // All useEffects
  useEffect(() => {
    //GTM event for view_cart
    if (cartData?.length && storeId && !isCaptured.current) {
      isCaptured.current = true;
      const payload = {
        storeId: storeId,
        customerId: customerId || 0,
        ...(storeId !== CG_STORE_CODE ? { value: '', coupon: '' } : {}),
        shoppingCartItemsModel: cartData?.map((item) => ({
          productId: item.productId,
          productName: item?.productName,
          colorVariants: item?.attributeOptionValue,
          price: item.totalPrice,
          quantity: item.totalQty,
        })),
      };

      GoogleAnalyticsTrackerForCG('GoogleViewCartScript', storeId, payload);
      GoogleAnalyticsTrackerForAllStore(
        'GoogleViewCartScript',
        storeId,
        payload,
      );
    }
  }, [cartData]);

  useEffect(() => {
    // to call on initial loading
    if (cartApiLoadedOnce.show === null) {
      setCartApiLoadedOnce({
        show: 'loader',
        lastUpdatedAt: new Date().getTime(),
      });
      fetchCartDetails({
        customerId: customerId,
        isEmployeeLoggedIn: !!employeeId,
      });
      return;
    }

    if (cartData && cartData?.length > 0) {
      setCartApiLoadedOnce({
        show: 'dataFound',
        lastUpdatedAt: lastUpdatedAt,
      });
      return;
    }

    if (lastUpdatedAt > cartApiLoadedOnce.lastUpdatedAt) {
      // to call if Cart API is updated.
      if (cartData && cartData.length === 0) {
        setCartApiLoadedOnce({
          show: 'emptyCart',
          lastUpdatedAt: lastUpdatedAt,
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUpdatedAt]);

  useEffect(() => {
    return () => {
      update_productDetails('CLEAN_UP');
      cart_PageClosed();
    };
  }, []);

  return showModal ? (
    renderLoginModal()
  ) : (
    <>
      <SeoHead title={'Cart'} keywords={''} description={''} />
      <CartTemplate
        templateId={templateId}
        showLoaderOrEmptyText={cartApiLoadedOnce.show}
      />
    </>
  );
};

export default Cart;

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////// SERVER SIDE METHOD ---------------------------------------
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<{ templateId: number }>
> => {
  let cartPageTemplateId = _defaultTemplates.cart;

  await FetchPageThemeConfigs('' + _globalStore.storeId, 'cartPage').then(
    (res) => {
      if (res?.config_value) {
        let type: { cartPageTemplateId: number } = JSON.parse(res.config_value);
        cartPageTemplateId = type.cartPageTemplateId;
      }
    },
  );

  return {
    props: {
      templateId: cartPageTemplateId,
    },
  };
};
