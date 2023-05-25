import SeoHead from '@appComponents/reUsable/SeoHead';
import { _defaultTemplates } from '@configs/template.config';
import { GoogleAnalyticsTrackerForCG } from '@helpers/common.helper';
import {
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';

import { FetchPageThemeConfigs } from '@services/product.service';
import CartTemplate from '@templates/Cart';
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { _globalStore } from 'store.global';
const Cart: NextPage<{ templateId: number }> = ({ templateId }) => {
  const isCaptured = useRef(false);
  const { cart_PageClosed, fetchCartDetails, cleanUp_productSlice } =
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

  // imported Functions
  const customerId = GetCustomerId();

  // All useEffects
  useEffect(() => {
    //GTM event for view_cart
    if (cartData?.length && storeId && !isCaptured.current) {
      isCaptured.current = true;
      const payload = {
        storeId: storeId,
        customerId: customerId,
        shoppingCartItemsModel: cartData?.map((item) => ({
          productId: item.productId,
          productName: item?.productName,
          colorVariants: item?.attributeOptionValue,
          price: item.totalPrice,
          quantity: item.totalQty,
        })),
      };

      GoogleAnalyticsTrackerForCG('GoogleViewCartScript', storeId, payload);
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
      cleanUp_productSlice();
      cart_PageClosed();
    };
  }, []);

  return (
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
      if (res.config_value) {
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
