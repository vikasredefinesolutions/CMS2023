import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import {
  FetchSbStoreAdditionalCustomFields,
  _SbStoreCustomFields,
} from '@services/sb.service';
import {
  CO6_AddressFields,
  CO6_addressValidationSchema,
  CO6_playerInformationValdiationSchema,
  _CO6_Screens,
  convertIntoInitialValues,
  convertIntoValidtionSchema,
  showOrderBillingAndPayment,
  showOrderReview,
  showPlayerInformation,
} from '@templates/checkout/checkoutType6/CO6_Extras';
import CO6_AddAddress from '@templates/checkout/checkoutType6/Components/CO6_AddAddress';
import CO6_ChooseShippingMethods from '@templates/checkout/checkoutType6/Components/CO6_ChooseShippingMethods';
import CO6_CustomFields from '@templates/checkout/checkoutType6/Components/CO6_CustomFields';
import CO6_LoginMenu from '@templates/checkout/checkoutType6/Components/CO6_LoginMenu';
import CO6_OrderSummary from '@templates/checkout/checkoutType6/Components/CO6_OrderSummary';
import CO6_PaymentMethod from '@templates/checkout/checkoutType6/Components/CO6_PaymentMethod';
import CO6_PlayerInformation from '@templates/checkout/checkoutType6/Components/CO6_PlayerInformation';
import CO6_ReviewShippingMethod from '@templates/checkout/checkoutType6/Components/CO6_ReviewPaymentMethod';
import CO6_ReviewProducts from '@templates/checkout/checkoutType6/Components/CO6_ReviewProducts';
import CO6_ReviewShippingInformation from '@templates/checkout/checkoutType6/Components/CO6_ReviewShippingInformation';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';

interface _Props {}

const CheckoutType6: React.FC<_Props> = ({}) => {
  const [screenToShow, setScreenToShow] =
    useState<_CO6_Screens>('enterEmailAddress');
  const { update_CheckoutCustomInformation } = useActions_v2();
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const [customFields, setCustomFields] = useState<
    _SbStoreCustomFields[] | null
  >(null);
  const messages = useTypedSelector_v2((state) => state.sbStore.messages);

  const shippingAddress = useFormik({
    initialValues: CO6_AddressFields,
    validationSchema: CO6_addressValidationSchema,
    // validateOnMount: true,
    // enableReinitialize: true,
    onSubmit: (values) => {},
  });

  const playerInformation = useFormik({
    initialValues: { firstName: '', lastName: '', number: '' },
    validationSchema: CO6_playerInformationValdiationSchema,
    // validateOnMount: true,
    // enableReinitialize: true,
    onSubmit: (values) => {
      update_CheckoutCustomInformation({
        type: 'PLAYER',
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          playerNo: +values.number,
        },
      });
    },
  });

  const additionalInfoSubmitHanlder = (values: Record<string, string>) => {
    const customPayload: {
      name: string;
      type: string;
      isRequired: boolean;
      value: string;
    }[] = [];

    customFields?.forEach((customField) => {
      customPayload.push({
        name: customField.name,
        type: customField.type,
        isRequired: customField.isRequired,
        value: values[customField.name],
      });
    });

    update_CheckoutCustomInformation({
      type: 'ADDITIONAL',
      data: customPayload,
    });
  };

  const additionalInformation = useFormik({
    initialValues: convertIntoInitialValues(customFields),
    validationSchema: convertIntoValidtionSchema(customFields),
    // validateOnMount: true,
    enableReinitialize: true,
    onSubmit: additionalInfoSubmitHanlder,
  });

  const handleGoToPaymentScreen = async () => {
    shippingAddress.submitForm();
    // playerInformation.submitForm();
    // additionalInformation.submitForm();

    // if (!playerInformation.isValid) return;
    // if (!additionalInformation.isValid) return;
    if (!shippingAddress.isValid) return;
    //
    setScreenToShow('addPaymentMethodAndBilling');
  };

  const fetchCustomFields = () => {
    FetchSbStoreAdditionalCustomFields({ storeId: storeId })
      .then((response) => {
        setCustomFields(response);
      })
      .catch(() => {})
      .finally(() => {});
  };

  useEffect(() => {
    fetchCustomFields();
  }, []);

  return (
    <section>
      <div className='container mx-auto'>
        <div className='bg-white'>
          <div className='pt-[20px] pb-[20px] text-title-text'>Checkout</div>
          <div className='flex flex-wrap mx-[-10px] checkout-box'>
            <section
              aria-labelledby='cart-heading'
              className='w-full lg:w-9/12 md:w-8/12 pl-[10px] pr-[10px]'
            >
              {messages.checkOutMessage && (
                <div className='w-full mb-[30px] message_box'>
                  <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                    <div className='flex flex-wrap items-center justify-between'>
                      <div
                        className='pt-[10px] pb-[10px] text-default-text'
                        dangerouslySetInnerHTML={{
                          __html: messages.checkOutMessage,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              {showOrderReview(screenToShow) && <CO6_ReviewProducts />}
              {showOrderBillingAndPayment(screenToShow) && (
                <div className='flex flex-wrap checkout-box ml-[-15px] mr-[-15px]'>
                  <CO6_ReviewShippingInformation
                    setScreenToShow={setScreenToShow}
                    address={shippingAddress.values}
                  />
                  <CO6_ReviewShippingMethod
                    setScreenToShow={setScreenToShow}
                    isMethodSelected={false}
                  />
                </div>
              )}

              {/* SCREEN 1 */}
              {screenToShow === 'enterEmailAddress' && (
                <CO6_LoginMenu setScreenToShow={setScreenToShow} />
              )}

              {showPlayerInformation(screenToShow) && (
                <CO6_PlayerInformation
                  values={playerInformation.values}
                  handleBlur={playerInformation.handleBlur}
                  errors={playerInformation.errors}
                  touched={playerInformation.touched}
                  readOnly={screenToShow === 'completeOrderDetails'}
                  handleChange={playerInformation.handleChange}
                />
              )}

              {customFields && customFields.length > 0 && (
                <CO6_CustomFields
                  handleBlur={additionalInformation.handleBlur}
                  errors={additionalInformation.errors}
                  touched={additionalInformation.touched}
                  handleChange={additionalInformation.handleChange}
                  customFields={customFields}
                  readOnly={screenToShow === 'completeOrderDetails'}
                  values={additionalInformation.values}
                />
              )}

              {/* {screenToShow === 'enterEmailAddress' && (
                <>
                  <div className='bg-light-gray w-full mb-[30px] opacity-50'>
                    <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                      <div className='flex flex-wrap items-center justify-between'>
                        <div className='pt-[10px] pb-[10px] text-title-text'>
                          Shipping Address
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='bg-light-gray w-full mb-[30px] opacity-50'>
                    <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                      <div className='flex flex-wrap items-center justify-between'>
                        <div className='pt-[10px] pb-[10px] text-title-text'></div>
                      </div>
                    </div>
                  </div>
                </>
              )} */}

              {/* SCREEN 2 */}
              {screenToShow === 'addShipping' && (
                <>
                  <div
                    className='bg-light-gray w-full mb-[30px] opacity-100'
                    id='ShippingAddress'
                  >
                    <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                      <CO6_AddAddress
                        addressType={'SHIP'}
                        values={shippingAddress.values}
                        errors={shippingAddress.errors}
                        touched={shippingAddress.touched}
                        setValues={shippingAddress.setValues}
                        handleBlur={shippingAddress.handleBlur}
                        handleChange={shippingAddress.handleChange}
                        setFieldValue={shippingAddress.setFieldValue}
                        setFieldTouched={shippingAddress.setFieldTouched}
                        setFieldError={shippingAddress.setFieldError}
                      />
                    </div>
                  </div>
                  <CO6_ChooseShippingMethods
                    postalCode={shippingAddress.values.postalCode}
                    setScreenToShow={setScreenToShow}
                    city={shippingAddress.values.city}
                    state={shippingAddress.values.state}
                    countryName={shippingAddress.values.countryName}
                  />
                  <div className='bg-light-gray w-full mb-[30px]'>
                    <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                      <div className='flex flex-wrap items-center justify-between'>
                        <button
                          className='pt-[10px] pb-[10px] btn btn-quaternary'
                          onClick={handleGoToPaymentScreen}
                        >
                          Go to Payment Details
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* {showPaymentMethodOpaque(screenToShow) && (
                <div
                  className='bg-light-gray w-full mb-[30px] opacity-50'
                  id='PaymentMethodTop'
                >
                  <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                    <div className='flex flex-wrap items-center justify-between'>
                      <div className='pt-[10px] pb-[10px] text-title-text'>
                        Payment Method
                      </div>
                      <div className='pt-[10px] pb-[10px]'>
                        <NxtImage
                          isStatic
                          src='/assets/images/secure-card-hover.png'
                          className=''
                          alt={'secured payment symbol'}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )} */}
              {screenToShow === 'addPaymentMethodAndBilling' && (
                <CO6_PaymentMethod
                  setScreenToShow={setScreenToShow}
                  validatePlayerInformation={playerInformation.submitForm}
                  validateAdditionalInformation={
                    additionalInformation.submitForm
                  }
                  isPlayerInformationValid={playerInformation.isValid}
                  isAdditionalInformationValid={additionalInformation.isValid}
                />
              )}
            </section>
            <CO6_OrderSummary
              showPlaceOrder={screenToShow === 'completeOrderDetails'}
              shippingAddress={shippingAddress.values}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutType6;
