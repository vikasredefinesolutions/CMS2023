import AddAddressModal from '@appComponents/modals/addAddressModal';
import { checkoutPages, UserAddressType } from '@constants/enum';
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
import NxtImage from '@appComponents/reUsable/Image';
import { cardType } from '@constants/common.constant';
import CheckoutController, {
  _shippingMethod,
} from '@controllers/checkoutController';
import { GetCartTotals, useTypedSelector_v2 } from '@hooks_v2/index';
import { useEffect } from 'react';
import CT1_EL_Dropdowns from './components/CO1_EL_Dropdowns';

interface _Props {
  templateId: number;
}

const ChekoutType1: React.FC<_Props> = ({ templateId }) => {
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
    cardDetails,
    purchaseOrder,
    orderNote,
    setorderNotes,
    setCurrentPage,
    setShowAddAddress,
    setShippingAdress,
    setBillingAdress,
    selectedShipping,
    fetchShipping,
    shippingMethod,
    setSelectedShipping,
  } = CheckoutController();
  const userId = useTypedSelector_v2((state) => state.user.id);
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => !!state.employee.empId,
  );
  const { el: employeeLogin } = useTypedSelector_v2((state) => state.checkout);

  const disablePlaceOrder = (): boolean => {
    let disable = false;
    if (isEmployeeLoggedIn) {
      disable = !!!employeeLogin.salesRep.value;
    }

    return disable;
  };

  useEffect(() => {
    if (!shippingAdress) {
      setShowAddAddress(true);
    } else {
      setShowAddAddress(false);
    }
  }, [shippingAdress]);
  const { totalPrice } = GetCartTotals();

  useEffect(() => {
    fetchShipping(totalPrice);
  }, [totalPrice, shippingAdress]);

  return (
    <>
      {' '}
      <div className='container mx-auto pl-[15px] pr-[15px] mt-[20px] mb-[50px] '>
        <div className='flex flex-wrap justify-between -mx-[15px]'>
          <div className='w-full md:w-8/12 lg:w-[72%] pl-[15px] pr-[15px] checkoutpage'>
            {currentPage === checkoutPages.reviewOrder ? (
              <div id='OrderReview'>
                <section className='w-full'>
                  <div className='bg-light-gray p-4 text-2xl font-bold'>
                    {__pagesText.CheckoutPage.OrderReview}
                  </div>
                  <div className='flex flex-wrap checkout-box ml-[-15px] mr-[-15px]'>
                    <div className='flex-1 w-full md:w-6/12 mt-[15px] ml-[15px] mr-[15px] mb-[30px]'>
                      <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                        <div className='flex flex-wrap items-center justify-between pt-[10px] border-b border-[#ececec]'>
                          <div className='pb-[10px] text-title-text'>
                            {__pagesText.CheckoutPage.ShippingAddress}
                          </div>
                          <div className='text-default-text'>
                            <div
                              onClick={() => {
                                if (userId) {
                                  setAddressType(
                                    UserAddressType.SHIPPINGADDRESS,
                                  );
                                } else {
                                  setShippingAdress(null);
                                  setBillingAdress(null);
                                  setCurrentPage(checkoutPages.address);
                                }
                              }}
                              className='!text-anchor hover:!text-anchor-hover '
                            >
                              {__pagesText.CheckoutPage.Edit}
                            </div>
                          </div>
                        </div>
                        {shippingAdress && (
                          <div className='text-default-text mt-[10px]'>
                            {shippingAdress?.firstname}{' '}
                            {shippingAdress?.lastName}
                            <br />
                            {shippingAdress?.companyName}
                            <br />
                            {shippingAdress?.address1}
                            <br />
                            {shippingAdress?.address2 &&
                            shippingAdress?.address2.trim() != '' ? (
                              <>
                                {shippingAdress?.address2}
                                <br />
                              </>
                            ) : (
                              <></>
                            )}
                            {[
                              shippingAdress?.city,
                              shippingAdress?.state,
                              shippingAdress?.postalCode,
                            ].join(', ')}
                            <br />
                            {shippingAdress?.countryName}
                            <br />
                            {shippingAdress?.phone}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className=' flex-1 w-full md:w-6/12 mt-[15px] ml-[15px] mr-[15px] mb-[30px]'>
                      <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px] '>
                        <div className='flex flex-wrap items-center justify-between pt-[10px] border-b border-[#ececec]'>
                          <div className='pb-[10px] text-title-text'>
                            {__pagesText.CheckoutPage.PaymentMethod}
                          </div>
                          <div className='text-default-text'>
                            <div
                              onClick={() =>
                                setCurrentPage(checkoutPages.address)
                              }
                              className='!text-anchor hover:!text-anchor-hover '
                            >
                              {__pagesText.CheckoutPage.Edit}
                            </div>
                          </div>
                        </div>
                        <div className='flex flex-wrap items-center justify-between pt-[10px]'>
                          <div className='pb-[10px] text-default-text'>
                            {/* {__pagesText.CheckoutPage.paymentInfo} */}
                            {cardDetails.cardNumber && (
                              <>
                                <div className='flex flex-wrap'>
                                  <div>
                                    <NxtImage
                                      isStatic={true}
                                      className=''
                                      src={cardType[1].url}
                                      alt=''
                                    />
                                  </div>
                                  <div>
                                    <p>{cardDetails.cardNumber}</p>
                                    <p>{`${cardDetails.cardExpirationMonth}/${cardDetails.cardExpirationYear}`}</p>
                                  </div>
                                </div>
                              </>
                            )}
                            {purchaseOrder && (
                              <>
                                <p>
                                  {`PO: `}
                                  {purchaseOrder}
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                        <div className='flex flex-wrap items-center justify-between pt-[10px] border-b border-[#ececec]'>
                          <div className='pb-[10px] text-title-text'>
                            {__pagesText.CheckoutPage.ShippingMethods}
                          </div>
                        </div>
                        <div className='flex flex-wrap items-center justify-between pt-[10px]'>
                          <div className='pb-[10px] text-default-text'>
                            {shippingMethod &&
                              shippingMethod.map(
                                (el: _shippingMethod, index: number) => (
                                  <div className='w-full block' key={index}>
                                    <input
                                      type='radio'
                                      name='shippingMethod'
                                      id={`shippingMethod${index}`}
                                      onChange={() => setSelectedShipping(el)}
                                      checked={
                                        selectedShipping.name == el.name
                                          ? true
                                          : false
                                      }
                                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                    />
                                    <label
                                      htmlFor={`shippingMethod${index}`}
                                      className='ml-2 text-default-text'
                                    >
                                      {shippingMethod &&
                                        `${el.name}($${el.price.toFixed(2)})`}
                                    </label>
                                  </div>
                                ),
                              )}
                          </div>
                        </div>
                        <div className='flex flex-wrap items-center justify-between pt-[10px] border-b border-[#ececec]'>
                          <div className='pb-[10px] text-title-text'>
                            {__pagesText.CheckoutPage.BillingInformation}
                          </div>
                          <div className='text-default-text'>
                            <div
                              onClick={() => {
                                if (userId) {
                                  setAddressType(
                                    UserAddressType.BILLINGADDRESS,
                                  );
                                } else {
                                  setShippingAddress(false);
                                  setShowAddAddress(true);
                                  setBillingAdress(null);
                                  setCurrentPage(checkoutPages.address);
                                }
                              }}
                              className='!text-anchor hover:!text-anchor-hover '
                            >
                              {__pagesText.CheckoutPage.Edit}
                            </div>
                          </div>
                        </div>
                        <div className='mb-3 font-semibold text-lg'>
                          <div className='flex items-center'>
                            <div className='input_checkbox'>
                              <input
                                type='checkbox'
                                id='UseShippingAddress'
                                name='UseShippingAddress'
                                className='checkbox'
                                data-modal-toggle='billingaddressModal'
                                onChange={(e) => {
                                  if (!userId) {
                                    setShippingAddress(false);
                                    setShowAddAddress(true);
                                    setBillingAdress(null);
                                    useShippingAddress &&
                                      setCurrentPage(checkoutPages.address);
                                  }
                                  setShippingAddress &&
                                    setShippingAddress(e.target.checked);
                                }}
                                checked={useShippingAddress}
                              />
                            </div>
                            <label
                              htmlFor='UseShippingAddress'
                              className='ml-2'
                            >
                              Use Shipping Address
                            </label>
                          </div>
                        </div>
                        {!useShippingAddress && billingAdress && (
                          <div className='text-default-text mt-[10px]'>
                            {billingAdress?.firstname} {billingAdress?.lastName}
                            <br />
                            {billingAdress?.companyName}
                            <br />
                            {billingAdress?.address1}
                            <br />
                            {billingAdress?.address2 &&
                            billingAdress?.address2.trim() != '' ? (
                              <>
                                {billingAdress?.address2}
                                <br />
                              </>
                            ) : (
                              <></>
                            )}
                            {[
                              billingAdress?.city,
                              billingAdress?.state,
                              billingAdress?.postalCode,
                            ].join(', ')}
                            <br />
                            {billingAdress?.countryName}
                            <br />
                            {billingAdress?.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
                <div className='mb-[12px] mt-[16px]'>
                  <hr />
                </div>
                <CartItem
                  isRemovable={false}
                  isEditable={false}
                  availableFont={[]}
                  availableLocation={[]}
                  availableColor={[]}
                  templateId={templateId}
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
                            changeClickHandler={() =>
                              setAddressType(UserAddressType.SHIPPINGADDRESS)
                            }
                          />
                        )}
                      </div>
                      <div className='w-full lg:w-1/2 pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                        <PaymentType1
                          changeHandler={paymentFieldUpdateHandler}
                          paymentMethod={paymentMethod}
                          updatePaymentMethod={updatePaymentMethod}
                          detectCardType={detectCardType}
                          cardDetails={cardDetails}
                          purchaseOrder={purchaseOrder}
                        />
                        {showAddAddress && !billingAdress ? (
                          <AddAddress
                            refrence={billingForm}
                            title={'Billing Address'}
                            setShippingAddress={setShippingAddress}
                            useShippingAddress={useShippingAddress}
                            isBillingForm={true}
                            billingAddress={billingAdress}
                          />
                        ) : (
                          <CheckoutAddress
                            address={billingAdress}
                            addressType={2}
                            setShippingAddress={setShippingAddress}
                            useShippingAddress={useShippingAddress}
                            changeClickHandler={() =>
                              setAddressType(UserAddressType.BILLINGADDRESS)
                            }
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
            <CartSummarry selectedShippingModel={selectedShipping} />
            <div id='OrderNoteDiv mt-[20px]'>
              <div className='text-sub-text font-bold &nbsp;trsacking-normal mb-[5px]'>
                <label>Add a note to your order</label>
              </div>
              <div className='form-group mb-[10px]'>
                <textarea
                  className='border border-gray-border rounded pt-[12px] pb-[12px] pl-[12px] pr-[12px] w-full text-sub-text'
                  rows={3}
                  id='txtOrderNotes'
                  onChange={(e) => setorderNotes(e.target.value)}
                ></textarea>
              </div>
            </div>
            {isEmployeeLoggedIn && <CT1_EL_Dropdowns />}
            <div className='text-medium-text font-semibold mb-[20px]'>
              <div className='text-rose-500'>
                {__pagesText.CheckoutPageCardNote1.note}
              </div>
            </div>
            <div className='text-medium-text font-semibold mb-[20px]'>
              <div className='text-rose-500'>
                {__pagesText.CheckoutPageCardNote2.note}
              </div>
            </div>
            {currentPage === checkoutPages.address && (
              <div className=''>
                <button
                  className='btn btn-lg !w-full text-center btn-secondary mb-[8px]'
                  id='btn-review-order'
                  onClick={() => {
                    reviewOrder();
                  }}
                >
                  REVIEW ORDER
                </button>{' '}
              </div>
            )}
            {currentPage === checkoutPages.reviewOrder && (
              <div className=''>
                <button
                  className={`btn btn-lg !w-full text-center btn-secondary mb-[8px] ${
                    disablePlaceOrder() ? 'opacity-50' : ''
                  }`}
                  id='btn-review-order'
                  disabled={disablePlaceOrder()}
                  onClick={() => placeOrder(selectedShipping)}
                >
                  PLACE ORDER
                </button>{' '}
              </div>
            )}
            <div className='mt-4 bg-light-gray px-4 py-4'>
              <div className='flex items-center justify-center'>
                <img
                  src='/order-risk-free-icon.jpg'
                  alt=''
                  className='mr-2 w-5 h-5'
                />
                <span className='text-2xl font-semibold'>Order Risk-Free!</span>
              </div>
              <div className='flex items-center justify-center text-base text-center mt-3 font-semibold'>
                Cancel your order without penalty anytime before your proof is
                approved.
              </div>
            </div>
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
