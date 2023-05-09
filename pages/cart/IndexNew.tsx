import AddOTFItemNo from '@appComponents/modals/addOtfItem';
import StartOrderModal from '@appComponents/modals/startOrderModal/StartOrderModal';
import CartController from '@controllers/cartController';
import SummarryController from '@controllers/summarryController';
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

  return (
    <>
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
