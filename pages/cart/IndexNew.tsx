import AddOTFItemNo from '@appComponents/modals/addOtfItem';
import StartOrderModal from '@appComponents/modals/startOrderModal/StartOrderModal';
import CartController from '@controllers/cartController';
import { TrackGTMEvent } from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { FetchPageThemeConfigs } from '@services/product.service';
import CartTemplate from '@templates/Cart';
import { useEffect, useState } from 'react';
const Cart = () => {
  const [cartType, setCartType] = useState<number>(1);
  const { setShowLoader } = useActions_v2();
  const { id } = useTypedSelector_v2((state) => state.store);
  const {
    cartData,
    removeCartItem,
    empCustomQtyPrice,
    employeeAmtChangeHandler,
    amtQtyBlurHandler,
    showEdit,
    product,
    setShowEdit,
    currentCartProduct,
    loadProduct,
    showAddOtf,
    setShowAddOtf,
    showLoaderOrEmptyText,
  } = CartController();
  const { id: customerId } = useTypedSelector_v2((state) => state.user);

  useEffect(() => {
    if (id) {
      setShowLoader(true);
      FetchPageThemeConfigs('' + id, 'cartPage')
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
  }, [id]);

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

  return (
    <>
      <CartTemplate
        {...{
          cartData,
          removeCartItem,
          empCustomQtyPrice,
          employeeAmtChangeHandler,
          amtQtyBlurHandler,
          loadProduct,
          setShowAddOtf,
          cartType,
          showLoaderOrEmptyText,
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
