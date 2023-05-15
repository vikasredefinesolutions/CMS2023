import AddOTFItemNo from '@appComponents/modals/addOtfItem';
import StartOrderModal from '@appComponents/modals/startOrderModal/StartOrderModal';
import CartController from '@controllers/cartController';
import SummarryController from '@controllers/summarryController';
import { TrackGTMEvent } from '@helpers/common.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { FetchPageThemeConfigs } from '@services/product.service';
import CartTemplate from '@templates/Cart';
import { useEffect, useState } from 'react';
const Cart = () => {
  const [cartType, setCartType] = useState<number>(1);
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
  } = CartController();

  const {
    couponInputChangeHandler,
    couponSubmitHandler,
    showApplyButton,
    coupon,
  } = SummarryController();
  const { id: customerId } = useTypedSelector_v2((state) => state.user);

  useEffect(() => {
    if (id) {
      FetchPageThemeConfigs('' + id, 'cartPage').then((res) => {
        if (res.config_value) {
          let type: { cartPageTemplateId: number } = JSON.parse(
            res.config_value,
          );
          setCartType(type.cartPageTemplateId);
        }
      });
    }
  }, [id]);

  useEffect(() => {
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
          item_brand: '', //Not available in cart
          item_category: '', //Not available in cart
          item_variant: item.attributeOptionValue,
          index: item?.productId,
          quantity: item?.totalQty,
          item_list_name: '', //Not available in cart
          item_list_id: item?.productId,
          price: item.totalPrice,
        })),
      },
    };
    TrackGTMEvent('view_cart', viewCartEventPayload);
  }, []);

  return (
    <>
      <div className='checkoutpage'>
        <CartTemplate
          {...{
            cartData,
            removeCartItem,
            couponInputChangeHandler,
            couponSubmitHandler,
            showApplyButton,
            coupon,
            empCustomQtyPrice,
            employeeAmtChangeHandler,
            amtQtyBlurHandler,
            loadProduct,
            setShowAddOtf,
            cartType,
          }}
        />
      </div>
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
