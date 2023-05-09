import AddAddressModal from '@appComponents/modals/addAddressModal';
import { checkoutPages } from '@constants/enum';
import { __pagesText } from '@constants/pages.text';
import CartItem from '@templates/cartItem';
import CartSummarry from '@templates/cartSummarry';
import AddAddress from './components/AddAddressType1';
import CheckoutAddress from './components/AddressType1';
import CreatePassword from './components/CreatePasswprdType1';
import LoginEmail from './components/LoginEmailType1';
import LoginPassword from './components/LoginPasswordType1';
import PaymentType1 from './components/PaymentType1';

import ChangeAddressModal from '@appComponents/modals/ChangeAddressModal';
import CheckoutController from '@controllers/checkoutController';
import SummarryController from '@controllers/summarryController';

interface _Props {
  cartTemplateId: number;
}

const ChekoutType1: React.FC<_Props> = ({ cartTemplateId }) => {
  const {
    couponInputChangeHandler,
    couponSubmitHandler,
    showApplyButton,
    coupon,
  } = SummarryController();

  const {
    currentPage,
    checkEmail,
    continueAsGuest,
    createAccountHandler,
    allowGuest,
    loginCustomer,
    placeOrder,
    showAddAddress,
    reviewOrder,
    setShippingAddress,
    shippingForm,
    billingForm,
    useShippingAddress,
    cartData,
    paymentFieldUpdateHandler,
    paymentMethod,
    updatePaymentMethod,
    detectCardType,
    shippingAdress,
    billingAdress,
    addressType,
    addressArray,
    changeAddresHandler,
    setAddressType,
    showAddAddressModal,
    setShowAddAddressModal,
    AddUpdateAddressSubmitHandler,
    addressEditData,
    setAddressEditData,
  } = CheckoutController();

  return (
    <>
      {' '}
      <div className='container mx-auto pl-[15px] pr-[15px] mt-[20px] mb-[50px]'>
        <div className='flex flex-wrap justify-between -mx-[15px]'>
          <div className='w-full md:w-8/12 lg:w-[72%] pl-[15px] pr-[15px]'>
            {currentPage === checkoutPages.reviewOrder ? (
              <div id='OrderReview'>
                <div className='mb-[12px] mt-[16px]'>
                  <hr />
                </div>
                <CartItem
                  {...{
                    isRemovable: false,
                    cartData: cartData,
                    cartType: cartTemplateId,
                  }}
                />
              </div>
            ) : (
              <>
                <div className='flex justify-between items-center bg-light-gray w-full pl-[15px] pr-[15px] pt-[17px] pb-[17px] mb-[20px]'>
                  <div className='text-title-text mr-[15px] font-semibold'>
                    Checkout
                  </div>
                  <div className='text-[#8b0520] text-medium-text tracking-normal'>
                    All fields marked * are required.
                  </div>
                </div>
                <div id='LoginMain'>
                  {currentPage === checkoutPages.login && (
                    <LoginEmail checkEmail={checkEmail} />
                  )}
                  {currentPage === checkoutPages.createAccount && (
                    <CreatePassword
                      continueAsGuest={continueAsGuest}
                      createAccountHandler={createAccountHandler}
                      allowGuest={allowGuest}
                    />
                  )}
                  {currentPage === checkoutPages.password && (
                    <LoginPassword loginCustomer={loginCustomer} />
                  )}
                </div>
                {currentPage === checkoutPages.address && (
                  <div id='ShippingPaymentMain'>
                    <div className='flex flex-wrap -mx-[15px] -mt-[21px]'>
                      <div className='w-full lg:w-1/2 pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                        {showAddAddress ? (
                          <AddAddress
                            refrence={shippingForm}
                            title={'Shipping Address'}
                            isBillingForm={false}
                          />
                        ) : (
                          <CheckoutAddress
                            address={shippingAdress}
                            addressType={1}
                            changeClickHandler={() => setAddressType('S')}
                          />
                        )}
                      </div>
                      <div className='w-full lg:w-1/2 pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                        <PaymentType1
                          changeHandler={paymentFieldUpdateHandler}
                          paymentMethod={paymentMethod}
                          updatePaymentMethod={updatePaymentMethod}
                          detectCardType={detectCardType}
                        />
                        {showAddAddress ? (
                          <AddAddress
                            refrence={billingForm}
                            title={'Billing Address'}
                            setShippingAddress={setShippingAddress}
                            useShippingAddress={useShippingAddress}
                            isBillingForm={true}
                          />
                        ) : (
                          <CheckoutAddress
                            address={billingAdress}
                            addressType={2}
                            setShippingAddress={setShippingAddress}
                            useShippingAddress={useShippingAddress}
                            changeClickHandler={() => setAddressType('B')}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          <div className='w-full md:w-4/12 lg:w-[27%] pl-[15px] pr-[15px]'>
            <CartSummarry
              {...{
                couponInputChangeHandler,
                couponSubmitHandler,
                showApplyButton,
                coupon,
              }}
            />
            <div id='OrderNoteDiv mt-[20px]'>
              <div className='text-sub-text font-bold &nbsp;trsacking-normal mb-[5px]'>
                <label>Add a note to your order</label>
              </div>
              <div className='form-group mb-[10px]'>
                <textarea
                  className='border border-gray-border rounded pt-[12px] pb-[12px] pl-[12px] pr-[12px] w-full text-sub-text'
                  rows={3}
                  id='txtOrderNotes'
                ></textarea>
              </div>
            </div>
            <div className='text-medium-text text-[#ff0000] font-semibold mb-[20px]'>
              {__pagesText.CheckoutPageCardNote1.note}
            </div>
            <div className='text-medium-text text-[#ff0000] font-semibold mb-[20px]'>
              {__pagesText.CheckoutPageCardNote2.note}
            </div>
            {currentPage === checkoutPages.address && (
              <div className=''>
                <button
                  className='btn btn-lg !w-full text-center btn-secondary mb-[8px]'
                  id='btn-review-order'
                  onClick={reviewOrder}
                >
                  REVIEW ORDER
                </button>{' '}
              </div>
            )}
            {currentPage === checkoutPages.reviewOrder && (
              <div className=''>
                <button
                  className='btn btn-lg !w-full text-center btn-secondary mb-[8px]'
                  id='btn-review-order'
                  onClick={placeOrder}
                >
                  PLACE ORDER
                </button>{' '}
              </div>
            )}
          </div>
        </div>
      </div>
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
            <AddAddressModal
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

export default ChekoutType1;
