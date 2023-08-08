import NxtImage from '@appComponents/reUsable/Image';
import getLocation from '@helpers/getLocation';
import {
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';

import Price from '@appComponents/reUsable/Price';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  CO7R_addressValidationSchema,
  CO7R_creditCardValidationSchema,
  CO7R_purchaseOrderValidationSchema,
  _CO7R_Screens,
  detectCardIssuer,
} from '../CO7R_Extras';
import CO7_AddAddress from './CO7R_AddAddress';
import CO7_CreditCard from './CO7R_CreditCard';
import CO7R_PurchaseOrder from './CO7R_PurchaseOrder';

interface _Props {
  setScreenToShow: React.Dispatch<React.SetStateAction<_CO7R_Screens>>;
}

const CO7_PaymentMethod: React.FC<_Props> = ({ setScreenToShow }) => {
  const { update_CheckoutAddress, update_PaymentDetails } = useActions_v2();
  const customerId = GetCustomerId();
  const { address, user, payment, shippingMethod, charges } =
    useTypedSelector_v2((state) => state.checkout);
  const { cart: cartItems, discount } = useTypedSelector_v2(
    (state) => state.cart,
  );

  const methodsToShow = useTypedSelector_v2(
    (state) => state.store.storeXPaymetnOptionListViewModels,
  );
  const [paymentMethod, setPaymentMethod] = useState<'PO' | 'CC' | null>(null);
  const convertIntoShippingInitials = () => {
    return {
      firstname: address.billing?.firstname || '',
      lastName: address.billing?.lastName || '',
      address1: address.billing?.address1 || '',
      address2: address.billing?.address2 || '',
      city: address.billing?.city || '',
      state: address.billing?.state || '',
      postalCode: address.billing?.postalCode || '',
      phone: address.billing?.phone || '',
      countryName: address.billing?.countryName || '',
      companyName: address.billing?.companyName || '',
      countryCode: address.billing?.countryCode || '',
    };
  };

  const billingAddress = useFormik({
    initialValues: convertIntoShippingInitials(),
    validationSchema: CO7R_addressValidationSchema,
    // validateOnMount: true,
    // enableReinitialize: true,
    onSubmit: async (values) => {
      const location = await getLocation();

      update_CheckoutAddress({
        type: 'BILLING_ADDRESS',
        address: {
          email: user.email,
          customerId: +customerId,

          //
          firstname: values.firstname,
          lastName: values.lastName,
          address1: values.address1,
          address2: values.address2,
          city: values.city,
          state: values.state,
          postalCode: values.postalCode,
          phone: values.phone,
          countryName: values.countryName,
          countryCode: values.countryCode,

          //
          createdDate: new Date(),
          modifiedDate: new Date(),
          location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
          ipAddress: location.ip_address,

          // based on previous billing data
          isDefault: address.billing?.isDefault || false,
          fax: address.billing?.fax || '',
          rowVersion: address.billing?.rowVersion || '',
          companyName: address.billing?.companyName || '',
          CompanyName: address.billing?.CompanyName || '',
          suite: address.billing?.suite || '',
          id: address.billing?.id || 0,
          // Static
          addressType: 'B',
          macAddress: '00-00-00-00-00-00',
          recStatus: 'A',

          // Empty
          createdBy: '',
          modifiedBy: '',
        },
      });
    },
  });

  const creditCard = useFormik({
    initialValues: {
      nameOnCard: payment.creditCard.nameOnCard,
      ccNumber: payment.creditCard.ccNumber,
      expiryMonth: payment.creditCard.month,
      expiryYear: payment.creditCard.year,
      cvc: payment.creditCard.securityCode,
    },
    validationSchema: CO7R_creditCardValidationSchema,
    // validateOnMount: true,
    // enableReinitialize: true,
    onSubmit: (inputs) => {
      update_PaymentDetails({
        method: 'individual_cards',
        data: {
          cardName: detectCardIssuer(inputs.ccNumber),
          ccNumber: inputs.ccNumber,
          month: inputs.expiryMonth,
          year: inputs.expiryYear,
          nameOnCard: inputs.nameOnCard,
          securityCode: inputs.cvc,
        },
      });
    },
  });

  const purchaseOrder = useFormik({
    initialValues: { poNumber: '' },
    validationSchema: CO7R_purchaseOrderValidationSchema,
    // validateOnMount: true,
    // enableReinitialize: true,
    onSubmit: (inputs) => {
      update_PaymentDetails({
        method: 'bulk_payment',
        poNumber: inputs.poNumber,
      });
    },
  });

  const handleGoToOrderReviewBtn = () => {
    billingAddress.submitForm();

    if (!address.useShippingAddressForBilling) {
      billingAddress.submitForm();
      if (!billingAddress.isValid) return;
    }

    if (!payment.paymentRequired) {
      setScreenToShow('completeOrderDetails');
      return;
    }

    if (paymentMethod === null) {
      return;
    }

    if (paymentMethod === 'CC') {
      if (!creditCard.dirty && creditCard.values.nameOnCard.length === 0) {
        creditCard.submitForm();
        return;
      }
      creditCard.submitForm();
      if (!creditCard.isValid) return;
    }

    if (paymentMethod === 'PO') {
      if (!purchaseOrder.dirty && purchaseOrder.values.poNumber.length === 0) {
        purchaseOrder.submitForm();
        return;
      }
      purchaseOrder.submitForm();
      if (!purchaseOrder.isValid) return;
    }

    setScreenToShow('completeOrderDetails');
  };

  const setInitialPaymentMethod = ({
    paymentOptionId,
  }: {
    paymentOptionId: number;
    paymentOptionName: string;
  }) => {
    if (paymentOptionId === 3) {
      setPaymentMethod('CC');
      return;
    }

    if (paymentOptionId === 2) {
      setPaymentMethod('PO');
      return;
    }

    if (paymentOptionId === 1) {
      setPaymentMethod('CC');
      return;
    }
  };

  const itemsTotal = () => {
    let subTotal = 0;
    if (!cartItems) return 0;

    cartItems.forEach((item) => {
      subTotal += item.totalPrice + item.totalCustomFieldsCharges;
    });

    return subTotal;
  };

  const isPaymentMethodRequired = (useCreditBalance: boolean) => {
    if (useCreditBalance) {
      const subTotal = itemsTotal() + shippingMethod.price + charges.salesTax;
      const credits =
        user.creditBalance +
        (discount?.amount || 0) +
        (discount?.giftCardAmt || 0);

      //
      if (subTotal > credits) return true;
      return false;
    }

    return true;
  };

  const handleCreditCheck = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const useCreditBalance = (event.target as _AdditionalEvent).checked;

    update_PaymentDetails({
      method: 'PAYMENT_REQUIRED',
      value: isPaymentMethodRequired(useCreditBalance),
    });

    update_PaymentDetails({
      method: 'USE_CREDIT_BALANCE',
      value: useCreditBalance,
    });
  };

  useEffect(() => {
    if (methodsToShow.length > 0) setInitialPaymentMethod(methodsToShow[0]);
  }, []);

  return (
    <div id='PaymentMethod' className=''>
      <div id='PaymentMethodInner'>
        <div className='bg-[#d4d4d4] w-full'>
          <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
            <div className='flex flex-wrap items-center justify-between pt-[10px] mb-[10px] border-b border-[#ececec]'>
              <div className='pb-[10px] text-title-text'>Payment Method</div>
              <div className='pb-[10px]'>
                <NxtImage
                  isStatic
                  className='w-full h-full'
                  alt=''
                  src='/assets/images/secure-card.png'
                />
              </div>
            </div>
            <div className='text-right text-default-text'>
              This is a secure 128-bit SSL encrypted method
            </div>
          </div>
        </div>
        <div className='bg-light-gray w-full'>
          <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
            <div className='flex flex-wrap items-center justify-between pt-[10px] mb-[20px]'>
              <div className='pb-[10px] text-default-text'>
                All fields marked with * are required fields.
              </div>
              <div className='pb-[10px]'>
                <NxtImage
                  isStatic
                  alt=''
                  src='/assets/images/norton.png'
                  className='inline-block'
                />
              </div>
            </div>
            <div className='mb-[20px] ' id='BillingShippingAddress'>
              <input
                type='checkbox'
                onChange={() =>
                  update_CheckoutAddress({
                    type: 'USE_SHIPPING_ADDRESS_FOR_BILLING',
                    value: !address.useShippingAddressForBilling,
                  })
                }
                checked={address.useShippingAddressForBilling}
                id='BillingShippingAddressChk'
                name=''
              />{' '}
              <label className='' htmlFor='BillingShippingAddressChk'>
                Billing & Shipping Address is the same
              </label>
            </div>
            <div id='BillingAddress'>
              {!address.useShippingAddressForBilling && (
                <CO7_AddAddress
                  addressType={'BILL'}
                  values={billingAddress.values}
                  errors={billingAddress.errors}
                  touched={billingAddress.touched}
                  setValues={billingAddress.setValues}
                  handleBlur={billingAddress.handleBlur}
                  handleChange={billingAddress.handleChange}
                  setFieldError={billingAddress.setFieldError}
                  setFieldValue={billingAddress.setFieldValue}
                  setFieldTouched={billingAddress.setFieldTouched}
                />
              )}

              {user.creditBalance > 0 && (
                <div className='flex flex-wrap ml-[-15px] mr-[-15px] mb-[30px]'>
                  <div className='mb-[20px] pl-[15px] pr-[15px]'>
                    <input
                      onClick={handleCreditCheck}
                      type='checkbox'
                      checked={payment.useCreditBalance}
                      id='CreditChk'
                      name=''
                    />{' '}
                    <label
                      className='font-bold text-green-600'
                      htmlFor='CreditChk'
                    >
                      Use Credit ? Available credit amount:{' '}
                      {user.creditBalance.toFixed(2)} credits (
                      {<Price value={user.creditBalance} />})
                    </label>
                  </div>
                </div>
              )}

              {payment.paymentRequired &&
                methodsToShow.map((method) => {
                  if (method.paymentOptionId === 1) {
                    return null;
                  }

                  if (method.paymentOptionId === 2) {
                    return (
                      <div className='mb-[15px] max-w-[278px]'>
                        <button
                          id='SelectPurchaseOrderBtn'
                          onClick={() => setPaymentMethod('PO')}
                          className='bg-[#ffffff] font-semibold text-normal-text pl-[10px] pr-[10px] pb-[10px] pt-[10px] text-center border border-[#000000] block'
                        >
                          <span>SELECT PURCHASE ORDER</span>
                        </button>
                      </div>
                    );
                  }

                  if (method.paymentOptionId === 3) {
                    return (
                      <div className='mb-[15px] max-w-[278px]'>
                        <button
                          id='SelectCreditCardBtn'
                          onClick={() => setPaymentMethod('CC')}
                          className='bg-[#ffffff] flex flex-wrap items-center font-semibold text-normal-text pl-[10px] pr-[10px] pb-[10px] pt-[10px] border border-[#000000]'
                        >
                          <span className='mr-[10px]'>
                            <NxtImage
                              className=''
                              alt=''
                              src='/assets/images/cards.jpg'
                              isStatic
                            />
                          </span>
                          <span>SELECT CREDIT CARD</span>
                        </button>
                      </div>
                    );
                  }
                  return null;
                })}
              {payment.paymentRequired && paymentMethod == 'CC' && (
                <CO7_CreditCard
                  values={creditCard.values}
                  errors={creditCard.errors}
                  touched={creditCard.touched}
                  handleBlur={creditCard.handleBlur}
                  handleChange={creditCard.handleChange}
                  setFieldValue={creditCard.setFieldValue}
                  setFieldTouched={creditCard.setFieldTouched}
                  setFieldError={creditCard.setFieldError}
                />
              )}
              {payment.paymentRequired && paymentMethod == 'PO' && (
                <CO7R_PurchaseOrder
                  values={purchaseOrder.values}
                  errors={purchaseOrder.errors}
                  touched={purchaseOrder.touched}
                  handleBlur={purchaseOrder.handleBlur}
                  handleChange={purchaseOrder.handleChange}
                />
              )}
            </div>
            <div className='max-w-[278px]'>
              <button
                onClick={handleGoToOrderReviewBtn}
                id='GoToReviewOrderbtn'
                className='btn btn-lg btn-secondary w-full text-center'
              >
                GO TO REVIEW ORDER
              </button>
            </div>
          </div>
        </div>
        <div className='bg-[#d4d4d4] w-full mb-[30px]'>
          <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px] text-center'>
            <div className=''>
              <NxtImage
                isStatic
                alt=''
                src='/assets/images/secure-btm.jpg'
                className='inline-block'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CO7_PaymentMethod;

export interface _AdditionalEvent extends EventTarget {
  checked: boolean;
}
