import AddOTFItemNo from '@appComponents/modals/addOtfItem';
import StartOrderModal from '@appComponents/modals/startOrderModal/StartOrderModal';
import CartController from '@controllers/cartController';
import { GoogleAnalyticsTrackerForCG } from '@helpers/common.helper';
import {
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';

import { FetchPageThemeConfigs } from '@services/product.service';
import CartTemplate from '@templates/Cart';
import { useEffect, useRef, useState } from 'react';
const Cart = () => {
  const [cartType, setCartType] = useState<number>(1);
  const isCaptured = useRef(false);

  const { setShowLoader, cart_PageClosed, fetchCartDetails } = useActions_v2();
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const {
    removeCartItem,
    showEdit,
    product,
    setShowEdit,
    currentCartProduct,
    loadProduct,
    showAddOtf,
    setShowAddOtf,
  } = CartController();

  // global states
  const { id: customerId } = useTypedSelector_v2((state) => state.user);
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
  const localCustomerId = GetCustomerId();

  // All useEffects
  useEffect(() => {
    if (storeId) {
      setShowLoader(true);
      FetchPageThemeConfigs('' + storeId, 'cartPage')
        .then((res) => {
          if (res.config_value) {
            let type: { cartPageTemplateId: number } = JSON.parse(
              res.config_value,
            );
            setCartType(type.cartPageTemplateId);
          }
        })
        .finally(() => setShowLoader(false));
    }
  }, []);

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
        customerId: localCustomerId,
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
      cart_PageClosed();
    };
  }, []);

  return (
    <>
      <CartTemplate
        {...{
          cartData,
          removeCartItem,
          loadProduct,
          setShowAddOtf,
          cartType,
          showLoaderOrEmptyText: cartApiLoadedOnce.show,
        }}
      />
      {showEdit && product && (
        <StartOrderModal
          modalHandler={() => setShowEdit(false)}
          product={product}
          editDetails={currentCartProduct}
        />
      )}
      {showAddOtf && <AddOTFItemNo closeModal={() => setShowAddOtf(false)} />}
    </>
  );
};

export default Cart;
