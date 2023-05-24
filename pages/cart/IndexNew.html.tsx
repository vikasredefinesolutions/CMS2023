import AddOTFItemNo from '@appComponents/modals/addOtfItem';
import StartOrderModal from '@appComponents/modals/startOrderModal/StartOrderModal';
import CartController from '@controllers/cartController';
import { TrackGTMEvent } from '@helpers/common.helper';
import {
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';
import { FetchPageThemeConfigs } from '@services/product.service';
import CartTemplate from '@templates/Cart';
import { useEffect, useState } from 'react';
const Cart = () => {
  const [cartType, setCartType] = useState<number>(1);
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
    const viewCartEventPayload = {
      pageTitle: document?.title || 'Cart',
      pageCategory: 'View cart',
      customProperty1: '',
      visitorType: customerId ? 'high-value' : 'low-value',
      event: 'view_cart',
      ecommerce: {
        items: cartData?.map((item) => ({
          item_name: item?.productName,
          item_id: item?.sku,
          item_brand: item?.brandName,
          item_category: '',
          item_category2: '',
          item_category3: '',
          item_category4: '',
          item_variant: item.attributeOptionValue,
          item_list_name: item?.productName,
          item_list_id: item?.productId,
          index: item?.productId,
          quantity: item?.totalQty,
          price: item.totalPrice,
        })),
      },
    };
    TrackGTMEvent(viewCartEventPayload);
  }, []);

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
