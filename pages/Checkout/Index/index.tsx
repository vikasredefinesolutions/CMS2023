import ChangeAddressModal from '@appComponents/modals/ChangeAddressModal';
import AddAddress from '@appComponents/modals/addAddressModal';
import CheckoutController from '@controllers/checkoutController';
import SummarryController from '@controllers/summarryController';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { FetchConfig } from '@services/product.service';
import CheckoutTemplate from '@templates/checkout';
import { useEffect, useState } from 'react';

const Checkout = () => {
  const [cartType, setCartType] = useState<number>(1);
  const { id } = useTypedSelector_v2((state) => state.store);
  const {
    couponInputChangeHandler,
    couponSubmitHandler,
    showApplyButton,
    coupon,
  } = SummarryController();

  const {
    addressType,
    addressArray,
    changeAddresHandler,
    setAddressType,
    setShowAddAddressModal,
    setAddressEditData,
    showAddAddressModal,
    AddUpdateAddressSubmitHandler,
    addressEditData,
    ...rest
  } = CheckoutController();

  useEffect(() => {
    if (id) {
      FetchConfig('' + id, 'cartPage').then((res) => {
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
      <CheckoutTemplate
        {...{
          couponInputChangeHandler,
          couponSubmitHandler,
          showApplyButton,
          coupon,
          setAddressType,
          ...rest,
          cartType,
        }}
      />
      {addressType && (
        <>
          <ChangeAddressModal
            {...{
              addressType,
              addressArray,
              changeAddresHandler,
              closeModalHandler: () => setAddressType(null),
              addAddressButtonHandler: () => setShowAddAddressModal(true),
              setAddressEditData,
            }}
          />
          {showAddAddressModal && (
            <AddAddress
              closePopupHandler={() => setShowAddAddressModal(false)}
              submitHandler={AddUpdateAddressSubmitHandler}
              editData={addressEditData}
            />
          )}
        </>
      )}
    </>
  );
};

export default Checkout;
