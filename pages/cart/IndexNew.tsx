import AddOTFItemNo from '@appComponents/modals/addOtfItem';
import StartOrderModal from '@appComponents/modals/startOrderModal/StartOrderModal';
import CartController from '@controllers/cartController';
import SummarryController from '@controllers/summarryController';
import CartTemplate from '@templates/Cart';

const Cart = () => {
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
