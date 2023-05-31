import NxtImage from '@appComponents/reUsable/Image';
import { UserAddressType, checkoutPages } from '@constants/enum';
import { __pagesText } from '@constants/pages.text';
import { GetCartTotals, useTypedSelector_v2 } from '@hooks_v2/index';
import CartItem from '@templates/cartItem';
import _ from 'lodash';
import { FC, useEffect, useState } from 'react';
import * as yup from 'yup';
import OrderSummary from './components/OrderSummary';
import PaymentType from './components/Payment';

import CheckoutController, {
  _shippingMethod,
} from '@controllers/checkoutController';
import { AddressType } from '@controllers/checkoutController/CheckoutAddressForm';
import { _Country } from '@definations/app.type';
import { GetShippingmethod } from '@services/address.service';
import { FetchCountriesList } from '@services/general.service';
import { useFormik } from 'formik';

interface _Props {
  templateId: number;
}

const ChekoutType2: FC<_Props> = ({ templateId }) => {
  const {
    currentPage,
    placeOrder,
    paymentFieldUpdateHandler,
    paymentMethod,
    updatePaymentMethod,
    detectCardType,
  } = CheckoutController();

  const { shippingChargeType, id: storeId } = useTypedSelector_v2(
    (state) => state.store,
  );

  const [selectedShipping, setSelectedShipping] = useState<
    _shippingMethod | { name: ''; price: 0 }
  >({ name: '', price: 0 });

  const fetchShipping = async (
    totalPrice: number,
    shippingCountry?: string | null,
  ) => {
    try {
      if (storeId && shippingChargeType) {
        const data = await GetShippingmethod({
          shippingMethodModel: {
            city: shippingAddress?.city || '',
            state: shippingAddress?.state || '',
            country:
              shippingCountry === null ? ' ' : shippingAddress?.countryName,
            zipCode: shippingAddress?.postalCode || '',
            customerID: id,
            storeId: storeId,
            ordertotalwithoutshipppingcharge: totalPrice,
            shippingType: shippingChargeType,
          },
        });
        if (data) {
          setShippingMethod(data);
          setSelectedShipping(data[0]);
        }
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [shippingMethod, setShippingMethod] = useState<_shippingMethod[] | []>([
    {
      name: '',
      price: 0,
    },
  ]);

  const cartData = useTypedSelector_v2((state) => state.cart);
  const [shippingAddress, setShippingAddress] = useState<AddressType | null>(
    null,
  );
  const [billingAddress, setBillingAddress] = useState<AddressType | null>(
    null,
  );

  const { loggedIn, customer, id } = useTypedSelector_v2((state) => state.user);
  const [changeBillingAddress, setChangeBillingAddress] =
    useState<boolean>(false);
  useEffect(() => {
    if (loggedIn && customer) {
      if (customer.customerAddress.length > 0) {
        if (customer && customer.customerAddress) {
          for (
            let index = 0;
            index < customer.customerAddress.length;
            index++
          ) {
            if (
              customer.customerAddress[index].addressType ==
                UserAddressType.SHIPPINGADDRESS &&
              customer.customerAddress[index].isDefault
            ) {
              setShippingAddress(
                customer.customerAddress[index] as AddressType,
              );
            } else if (
              customer.customerAddress[index].addressType ==
                UserAddressType.BILLINGADDRESS &&
              customer.customerAddress[index].isDefault
            ) {
              setBillingAddress(customer.customerAddress[index] as AddressType);
            }
          }
        }
      }
    }
  }, [customer]);

  const validationSchema = yup.object({
    firstName: yup.string().required('Required field'),
    lastName: yup.string().required('Required field'),
    streetAddress: yup.string().required('Required field'),
    city: yup.string().required('Required field'),
    zipCode: yup.string().required('Required Field'),
    country: yup.string().required('Required field'),
    state: yup.string().required('Required field'),
    phone: yup.string().required('Required field'),
  });

  const initialBillingValues = {
    firstName: '',
    lastName: '',
    streetAddress: '',
    aptSuite: '',
    zipCode: '',
    city: '',
    country: '',
    state: '',
    phone: '',
  };

  const initialShippingValues = {
    firstName: shippingAddress ? shippingAddress?.firstname : '',
    lastName: shippingAddress ? shippingAddress.lastName : '',
    streetAddress: shippingAddress ? shippingAddress.address1 : '',
    aptSuite: shippingAddress ? shippingAddress.suite : '',
    zipCode: shippingAddress ? shippingAddress.postalCode : '',
    city: shippingAddress ? shippingAddress.city : '',
    country: shippingAddress ? shippingAddress.countryName : '',
    state: shippingAddress ? shippingAddress.state : '',
    phone: shippingAddress ? shippingAddress.phone : '',
  };

  const Billingformik = useFormik({
    initialValues: initialBillingValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      console.log(values, 'bill');
    },
  });

  const ShippingFormik = useFormik({
    initialValues: initialShippingValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      console.log(values, 'ship');
    },
  });

  // console.log('carddeatils', cardDetails);

  const [showPayment, setshowPayment] = useState<boolean>(false);
  const [showShippingMethod, setShowShippingMethod] = useState<boolean>(true);
  const { totalPrice } = GetCartTotals();
  const [countries, setCountries] = useState<_Country[] | []>([]);

  useEffect(() => {
    FetchCountriesList().then((res) => {
      if (res) {
        setCountries(res);
      }
    });
  }, []);

  useEffect(() => {
    if (totalPrice) {
      fetchShipping(totalPrice);
    }
  }, [totalPrice, shippingAddress]);

  return (
    <section className='mt-[20px]'>
      <div className='bg-white'>
        <div className='container mx-auto'>
          <div className='flex flex-wrap ml-[-15px] mr-[-15px] -mt-3 checkout-box'>
            {/* Billing Information */}
            <section className='w-full lg:w-8/12 md:w-7/12 pl-[15px] pr-[15px]'>
              <div className='flex flex-wrap checkout-box ml-[-15px] mr-[-15px]'>
                <div className='bg-light-gray flex-1 w-full md:w-6/12 mt-[15px] ml-[15px] mr-[15px] mb-[30px]'>
                  <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                    <div className='flex flex-wrap items-center justify-between pt-[10px] border-b border-[#ececec]'>
                      <div className='pb-[10px] text-title-text'>
                        {__pagesText.CheckoutPage.BillingInformation}
                      </div>
                      <div className='text-default-text'>
                        <div
                          onClick={() => {
                            setChangeBillingAddress(true);
                            setShowShippingMethod(false);
                            setshowPayment(true);
                          }}
                          className='!text-anchor hover:!text-anchor-hover cursor-pointer '
                        >
                          {__pagesText.CheckoutPage.Change}
                        </div>
                      </div>
                    </div>
                    {billingAddress && (
                      <div className='text-default-text mt-[10px]'>
                        {billingAddress?.firstname} {billingAddress?.lastName}
                        <br />
                        {billingAddress?.companyName}
                        <br />
                        {billingAddress?.address1}
                        <br />
                        {[
                          billingAddress?.city,
                          billingAddress?.state,
                          billingAddress?.postalCode,
                        ].join(', ')}
                        <br />
                        {billingAddress?.countryName}
                        <br />
                        {billingAddress?.phone}
                      </div>
                    )}
                  </div>
                </div>
                <div className='bg-light-gray flex-1 w-full md:w-6/12 mt-[15px] ml-[15px] mr-[15px] mb-[30px]'>
                  <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                    <div className='flex flex-wrap items-center justify-between pt-[10px] border-b border-[#ececec]'>
                      <div className='pb-[10px] text-title-text'>
                        {__pagesText.CheckoutPage.ShippingMethod}
                      </div>
                      <div className='text-default-text'>
                        <span
                          className='!text-anchor hover:!text-anchor-hover'
                          onClick={() => {
                            setShowShippingMethod(true);
                            setshowPayment(false);
                            setChangeBillingAddress(false);
                          }}
                        >
                          {__pagesText.CheckoutPage.Change}
                        </span>
                      </div>
                    </div>
                    <div className='text-default-text mt-[10px] mb-[15px]'>
                      <span>
                        {__pagesText.CheckoutPage.ShippingMethod}
                        {':'}
                        {!_.isEmpty(selectedShipping) && (
                          <span>{`${
                            selectedShipping.name
                          } $(${selectedShipping.price.toPrecision(2)})`}</span>
                        )}
                      </span>
                    </div>
                    <div className='pt-[10px] border-b border-[#ececec]'>
                      <div className='pb-[10px] text-title-text'>
                        {__pagesText.CheckoutPage.PaymentMethod}
                      </div>
                    </div>
                    <div className='flex flex-wrap items-center justify-between pt-[10px]'>
                      <div className='pb-[10px] text-default-text'>
                        {__pagesText.CheckoutPage.paymentInfo}
                      </div>
                      <div className='text-default-text'>
                        <span
                          className='!text-anchor hover:!text-anchor-hover'
                          onClick={() => {
                            setChangeBillingAddress(false);
                            !showShippingMethod && setshowPayment(true);
                          }}
                        >
                          {__pagesText.CheckoutPage.Change}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {currentPage === checkoutPages.reviewOrder ? (
                <CartItem
                  isRemovable={false}
                  isEditable={false}
                  availableFont={[]}
                  availableLocation={[]}
                  availableColor={[]}
                  templateId={templateId}
                />
              ) : (
                <>
                  {showShippingMethod && (
                    <>
                      <div className='bg-light-gray w-full mb-[30px] opacity-100'>
                        <div className='bg-light-gray flex-1 w-full md:w-full mt-[15px] ml-[15px] mr-[15px] mb-[30px]'>
                          <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                            <div className='flex flex-wrap items-center justify-between pt-[10px] border-b border-[#ececec]'>
                              <div className='pb-[10px] text-title-text'>
                                {__pagesText.CheckoutPage.ShippingAddress}
                              </div>
                            </div>
                            <form>
                              <div id='BillingAddress'>
                                <div className='text-default-text text-[#84694d] mt-[10px] mb-[20px]'>
                                  All Fields marked * are required fields.
                                </div>
                                <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
                                  <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
                                    <label className='mb-[4px] text-normal-text'>
                                      First Name*
                                    </label>
                                    <div className='flex flex-wrap justify-between items-center'>
                                      <input
                                        onBlur={ShippingFormik.handleBlur}
                                        onChange={ShippingFormik.handleChange}
                                        name='firstName'
                                        placeholder=' '
                                        value={ShippingFormik.values.firstName}
                                        className='form-input !w-[calc(100%-40px)]'
                                      />
                                      {ShippingFormik.errors.firstName ? (
                                        <img
                                          className='ml-[5px] '
                                          src='/no.png'
                                        />
                                      ) : (
                                        <img
                                          className='ml-[5px]'
                                          src='/yes.png'
                                        />
                                      )}
                                    </div>
                                  </div>
                                  <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
                                    <label className='mb-[4px] text-normal-text'>
                                      Last Name*
                                    </label>
                                    <div className='flex flex-wrap justify-between items-center'>
                                      <input
                                        onBlur={ShippingFormik.handleBlur}
                                        onChange={ShippingFormik.handleChange}
                                        name='lastName'
                                        placeholder=' '
                                        value={ShippingFormik.values.lastName}
                                        className='form-input !w-[calc(100%-40px)]'
                                      />
                                      {ShippingFormik.errors.lastName ? (
                                        <img
                                          className='ml-[5px] '
                                          src='/no.png'
                                        />
                                      ) : (
                                        <img
                                          className='ml-[5px]'
                                          src='/yes.png'
                                        />
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
                                  <div className='mb-[15px] w-full pl-[15px] pr-[15px]'>
                                    <label className='mb-[4px] text-normal-text'>
                                      Street Address*
                                    </label>
                                    <div className='flex flex-wrap justify-between items-center'>
                                      <input
                                        onBlur={ShippingFormik.handleBlur}
                                        onChange={ShippingFormik.handleChange}
                                        name='streetAddress'
                                        placeholder=' '
                                        value={
                                          ShippingFormik.values.streetAddress
                                        }
                                        className='form-input !w-[calc(100%-40px)]'
                                      />
                                      {ShippingFormik.errors.streetAddress ? (
                                        <img
                                          className='ml-[5px] '
                                          src='/no.png'
                                        />
                                      ) : (
                                        <img
                                          className='ml-[5px]'
                                          src='/yes.png'
                                        />
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
                                  <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
                                    <label className='mb-[4px] text-normal-text'>
                                      Apt, Suite
                                    </label>
                                    <input
                                      onBlur={ShippingFormik.handleBlur}
                                      onChange={ShippingFormik.handleChange}
                                      name='aptSuite'
                                      placeholder=' '
                                      value={ShippingFormik.values.aptSuite}
                                      className='form-input'
                                    />
                                  </div>
                                  <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
                                    <label className='mb-[4px] text-normal-text'>
                                      Zip Code*
                                    </label>
                                    <div className='flex flex-wrap justify-between items-center'>
                                      <input
                                        onBlur={ShippingFormik.handleBlur}
                                        onChange={ShippingFormik.handleChange}
                                        name='zipCode'
                                        placeholder=' '
                                        value={ShippingFormik.values.zipCode}
                                        className='form-input  !w-[calc(100%-40px)]'
                                      />
                                      {ShippingFormik.errors.zipCode ? (
                                        <img
                                          className='ml-[5px] '
                                          src='/no.png'
                                        />
                                      ) : (
                                        <img
                                          className='ml-[5px]'
                                          src='/yes.png'
                                        />
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
                                  <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
                                    <label className='mb-[4px] text-normal-text'>
                                      City*
                                    </label>
                                    <div className='flex flex-wrap justify-between items-center'>
                                      <input
                                        onBlur={ShippingFormik.handleBlur}
                                        onChange={ShippingFormik.handleChange}
                                        name='city'
                                        placeholder=' '
                                        value={ShippingFormik.values.city}
                                        className='form-input  !w-[calc(100%-40px)]'
                                      />
                                      {ShippingFormik.errors.city ? (
                                        <img
                                          className='ml-[5px] '
                                          src='/no.png'
                                        />
                                      ) : (
                                        <img
                                          className='ml-[5px]'
                                          src='/yes.png'
                                        />
                                      )}
                                    </div>
                                  </div>
                                  <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
                                    <label className='mb-[4px] text-normal-text'>
                                      State / Province*
                                    </label>
                                    <div className='flex flex-wrap justify-between items-center'>
                                      <select
                                        className='form-input !w-[calc(100%-40px)]'
                                        placeholder='Select Country'
                                        name='state'
                                        onChange={ShippingFormik.handleChange}
                                        value={ShippingFormik.values.state}
                                      >
                                        <option value='1'>United States</option>
                                      </select>
                                      <img
                                        className='ml-[5px]'
                                        src='/yes.png'
                                      />
                                      <img
                                        className='ml-[5px] '
                                        src='/no.png'
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className='flex flex-wrap ml-[-15px] mr-[-15px] mb-[30px]'>
                                  <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
                                    <label className='mb-[4px] text-normal-text'>
                                      Country*
                                    </label>
                                    <div className='flex flex-wrap justify-between items-center'>
                                      <select
                                        className='form-input !w-[calc(100%-40px)]'
                                        placeholder='Select Country'
                                        name='country'
                                        onChange={ShippingFormik.handleChange}
                                        onSelect={ShippingFormik.handleChange}
                                        value={ShippingFormik.values.country}
                                      >
                                        {countries.map((item) => {
                                          return (
                                            <option value={item.id}>
                                              {item.name}
                                            </option>
                                          );
                                        })}
                                      </select>
                                      {ShippingFormik.errors ? (
                                        <img
                                          className='ml-[5px]'
                                          src='/yes.png'
                                        />
                                      ) : (
                                        <img
                                          className='ml-[5px] '
                                          src='/no.png'
                                        />
                                      )}
                                    </div>
                                  </div>
                                  <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
                                    <label className='mb-[4px] text-normal-text'>
                                      Phone Number*
                                    </label>
                                    <div className='flex flex-wrap justify-between items-center'>
                                      <input
                                        onBlur={ShippingFormik.handleBlur}
                                        onChange={ShippingFormik.handleChange}
                                        name='phone'
                                        placeholder=' '
                                        value={ShippingFormik.values.phone}
                                        className='form-input  !w-[calc(100%-40px)]'
                                      />
                                      {ShippingFormik.errors.phone ? (
                                        <img
                                          className='ml-[5px] '
                                          src='/no.png'
                                        />
                                      ) : (
                                        <img
                                          className='ml-[5px]'
                                          src='/yes.png'
                                        />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>

                      <div
                        className='bg-light-gray w-full mb-[30px]'
                        id='shippingMethod'
                      >
                        <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                          <div className='pt-[10px] border-b border-[#ececec]'>
                            <div className='pb-[10px] text-title-text'>
                              {__pagesText.CheckoutPage.ShippingMethod}
                            </div>
                          </div>
                          <div className='text-default-text mb-[5px] mt-[10px]'>
                            {__pagesText.CheckoutPage.ChooseShippingMethod}
                          </div>
                          <div className='flex items-center flex-wrap mb-[30px]'>
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
                                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 '
                                    />
                                    <label
                                      htmlFor={`shippingMethod${index}`}
                                      className='ml-2 text-default-text'
                                    >
                                      {shippingMethod &&
                                        `${el.name}($${el.price.toPrecision(
                                          2,
                                        )})`}
                                    </label>
                                  </div>
                                ),
                              )}
                          </div>
                          <div className=''>
                            <button
                              className='btn btn-lg btn-secondary'
                              onClick={() => setshowPayment(true)}
                            >
                              {__pagesText.CheckoutPage.GoToPayment}
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* payment method */}
                  <div className='bg-light-gray w-full mb-[30px] opacity-50'>
                    <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                      <div className='flex flex-wrap items-center justify-between'>
                        <div className='pt-[10px] pb-[10px] text-title-text'>
                          {__pagesText.CheckoutPage.PaymentMethod}
                        </div>
                        <div className='pt-[10px] pb-[10px]'>
                          <div className='w-10'>
                            <img
                              src='/secure-card-hover.png'
                              alt='lockimage'
                              className=''
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {showPayment && (
                    <div className='PaymentMethodInne bg-light-gray'>
                      <div className='bg-[#d4d4d4] w-full'>
                        <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                          <div className='flex flex-wrap items-center justify-between pt-[10px] mb-[10px] border-b border-[#ececec]'>
                            <div className='pb-[10px] text-title-text'>
                              {__pagesText.CheckoutPage.PaymentMethod}
                            </div>
                            <div className='pt-[10px] pb-[10px]'>
                              <div className='w-10'>
                                <NxtImage
                                  src='/secure-card.jpg'
                                  alt='lockimage'
                                  className=''
                                />
                              </div>
                            </div>
                          </div>
                          <div className='text-right text-default-text'>
                            {__pagesText.CheckoutPage.secure128}
                          </div>
                        </div>
                      </div>

                      <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                        <PaymentType
                          changeHandler={paymentFieldUpdateHandler}
                          paymentMethod={paymentMethod}
                          updatePaymentMethod={updatePaymentMethod}
                          detectCardType={detectCardType}
                          BillingFormik={Billingformik}
                          changeBillingAddress={changeBillingAddress}
                          setChangeBillingAddress={setChangeBillingAddress}
                        />
                        <div className='max-w-[278px]'>
                          <button
                            className='btn btn-lg !w-full text-center btn-secondary mb-[8px]'
                            id='btn-review-order'
                            onClick={() => {
                              console.log(Billingformik.values);
                              console.log(ShippingFormik.values);
                            }}
                          >
                            {__pagesText.CheckoutPage.GotoReview}
                          </button>
                        </div>
                      </div>

                      <div className='bg-[#d4d4d4] w-full mb-[30px]'>
                        <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px] text-center'>
                          <div>
                            <img
                              src={'/secure-btm.jpg'}
                              alt=''
                              className='w-full max-h-[100px]'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className='bg-light-gray w-full mb-[30px] opacity-50'>
                    <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                      <div className='flex flex-wrap items-center justify-between'>
                        <div className='pt-[10px] pb-[10px] text-title-text'>
                          {__pagesText.CheckoutPage.OrderReview}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </section>
            <OrderSummary
              currentpage={currentPage}
              selectedShipModel={selectedShipping}
              placeorder={() => placeOrder(selectedShipping)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChekoutType2;
