import ChangeAddressModal from '@appComponents/modals/ChangeAddressModal';
import AddAddress from '@appComponents/modals/addAddressModal';
import CheckoutController from '@controllers/checkoutController';
import SummarryController from '@controllers/summarryController';
import CheckoutTemplate from '@templates/checkout';

const Checkout = () => {
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
