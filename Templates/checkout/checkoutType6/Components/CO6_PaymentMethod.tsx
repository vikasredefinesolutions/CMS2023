import NxtImage from '@appComponents/reUsable/Image';
import { __error } from '@constants/successError.text';
import getLocation from '@helpers/getLocation';
import {
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';
import CO6_AddAddress from '@templates/checkout/checkoutType6/Components/CO6_AddAddress';
import CO6_CreditCard from '@templates/checkout/checkoutType6/Components/CO6_CreditCard';
import CO6_PurchaseOrder from '@templates/checkout/checkoutType6/Components/CO6_PurchaseOrder';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  CO6_addressValidationSchema,
  CO6_creditCardValidationSchema,
  CO6_purchaseOrderValidationSchema,
  _CO6_Screens,
  detectCardIssuer,
  showCredidCardOption,
  showPoNumberOption,
} from '../CO6_Extras';

interface _Props {
  validatePlayerInformation: () => Promise<any>;
  validateAdditionalInformation: () => Promise<any>;
  isPlayerInformationValid: boolean;
  isAdditionalInformationValid: boolean;
  setScreenToShow: React.Dispatch<React.SetStateAction<_CO6_Screens>>;
}

const CO6_PaymentMethod: React.FC<_Props> = ({
  isPlayerInformationValid,
  isAdditionalInformationValid,
  setScreenToShow,
  validatePlayerInformation,
  validateAdditionalInformation,
}) => {
  const { update_CheckoutAddress, update_PaymentDetails } = useActions_v2();
  const customerId = GetCustomerId();
  const { address, user, payment, playerInformation } = useTypedSelector_v2(
    (state) => state.checkout,
  );
  const sbStore = useTypedSelector_v2((state) => state.sbStore.store);
  const [paymentMethod, setPaymentMethod] = useState<'PO' | 'CC' | null>(null);

  const billingAddress = useFormik({
    initialValues: {
      firstname: address.billing?.firstname || '',
      lastName: address.billing?.lastName || '',
      address1: address.billing?.address1 || '',
      address2: address.billing?.address2 || '',
      city: address.billing?.city || '',
      state: address.billing?.state || '',
      postalCode: address.billing?.postalCode || '',
      phone: address.billing?.phone || '',
      countryName: address.billing?.countryName || '',
      countryCode: address.billing?.countryCode || '',
      companyName: '',
    },
    validationSchema: CO6_addressValidationSchema,
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

          // Static
          id: 0,
          addressType: 'B',
          macAddress: '00-00-00-00-00-00',
          recStatus: 'A',
          isDefault: false,

          // Empty
          fax: '',
          suite: '',
          createdBy: '',
          modifiedBy: '',
          rowVersion: '',
          companyName: '',
          CompanyName: '',
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
    validationSchema: CO6_creditCardValidationSchema,
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

  const showUseShippingForBilling = () => {
    if (sbStore.payBusinessMethodDeliveryOptions === 'one_address')
      return false;

    if (address.shipToSchool) {
      return false;
    }

    return true;
  };

  const purchaseOrder = useFormik({
    initialValues: { poNumber: payment.poNumber },
    validationSchema: CO6_purchaseOrderValidationSchema,
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
    validateAdditionalInformation();

    if (playerInformation.needToValidate) {
      validatePlayerInformation();
      if (!isPlayerInformationValid) return;
    }

    if (!isAdditionalInformationValid) return;

    if (!address.useShippingAddressForBilling) {
      billingAddress.submitForm();
      if (!billingAddress.isValid) return;
    }

    if (paymentMethod === null) {
      return;
    }

    if (paymentMethod === 'CC') {
      if (!creditCard.dirty) {
        creditCard.submitForm();
        return;
      }
      creditCard.submitForm();
      if (!creditCard.isValid) return;
    }

    if (paymentMethod === 'PO') {
      if (!purchaseOrder.dirty) {
        purchaseOrder.submitForm();
        return;
      }
      if (purchaseOrder.values.poNumber !== playerInformation.poNumberToMatch) {
        purchaseOrder.setFieldError('poNumber', __error.invalidPO);
        return;
      }

      purchaseOrder.submitForm();
      if (!purchaseOrder.isValid) return;
    }

    setScreenToShow('completeOrderDetails');
  };

  const setInitialPaymentMethod = (
    availableOption: 'both' | 'bulk_payment' | 'individual_cards',
  ) => {
    if (availableOption === 'both') {
      setPaymentMethod('CC');
      return;
    }
    if (availableOption === 'bulk_payment') {
      setPaymentMethod('PO');
      return;
    }
    if (availableOption === 'individual_cards') {
      setPaymentMethod('CC');
      return;
    }
  };

  useEffect(() => {
    setInitialPaymentMethod(sbStore.payBusinessMethod);
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
                  className=''
                  alt=''
                  isStatic
                  src='/assets/images/norton.png'
                />
              </div>
            </div>
            {showUseShippingForBilling() && (
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
            )}
            <div id='BillingAddress'>
              {!address.useShippingAddressForBilling && (
                <CO6_AddAddress
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
              {showCredidCardOption(sbStore.payBusinessMethod) && (
                <div className='mb-[15px] max-w-[278px]'>
                  <button
                    id='SelectCreditCardBtn'
                    onClick={() => setPaymentMethod('CC')}
                    disabled={sbStore.payBusinessMethod === 'individual_cards'}
                    className={`bg-[#ffffff] flex flex-wrap items-center font-semibold text-normal-text pl-[10px] pr-[10px] pb-[10px] pt-[10px] border ${paymentMethod==='CC' ? 'border-[#000000]' : 'border-gray-border'}`}
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
              )}
              {showPoNumberOption(sbStore.payBusinessMethod) && (
                <div className='mb-[15px] max-w-[278px]'>
                  <button
                    id='SelectPurchaseOrderBtn'
                    onClick={() => setPaymentMethod('PO')}
                    disabled={sbStore.payBusinessMethod === 'bulk_payment'}
                    className={`bg-[#ffffff] font-semibold text-normal-text pl-[10px] pr-[10px] pb-[10px] pt-[10px] text-center border block  ${paymentMethod==='PO' ? 'border-[#000000]' : 'border-gray-border'}`}
                  >
                    <span>SELECT PURCHASE ORDER</span>
                  </button>
                </div>
              )}
              {paymentMethod == 'CC' && (
                <CO6_CreditCard
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
              {paymentMethod == 'PO' && (
                <CO6_PurchaseOrder
                  values={purchaseOrder.values}
                  errors={purchaseOrder.errors}
                  touched={purchaseOrder.touched}
                  handleBlur={purchaseOrder.handleBlur}
                  handleChange={purchaseOrder.handleChange}
                />
              )}
              {/* <div className='flex flex-wrap ml-[-15px] mr-[-15px] mb-[30px]'>
                <div className='mb-[20px] pl-[15px] pr-[15px]' id='CreditChk'>
                  <input type='checkbox' id='CreditChk' name='' />{' '}
                  <label className='' htmlFor='CreditChk'>
                    Use Credit ? Available credit amount: 0 credits ($0)
                  </label>
                </div>
              </div> */}
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
                src='/assets/images/secure-btm.png'
                className='inline-block'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CO6_PaymentMethod;
