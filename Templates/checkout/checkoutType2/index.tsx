import {
  checkoutPages,
  PaymentMethod,
  paymentMethodCustom as paymentEnum,
  UserAddressType,
} from '@constants/enum';
import { __pagesText } from '@constants/pages.text';
import {
  GetCartTotals,
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';
import CartItem from '@templates/cartItem';
import { FC, useEffect, useState } from 'react';
import * as yup from 'yup';
import OrderSummary from './components/OrderSummary';
import PaymentType from './components/Payment';

import {
  phonePattern1,
  phonePattern2,
  phonePattern3,
  phonePattern4,
  _Store_CODES,
  __Cookie,
  __LocalStorage,
} from '@constants/global.constant';
import { __pagesConstant } from '@constants/pages.constant';
import { paths } from '@constants/paths.constant';
import { AddOrderDefault } from '@constants/payloads/checkout';
import CheckoutController, {
  _shippingMethod,
} from '@controllers/checkoutController';
import { AddressType } from '@controllers/checkoutController/CheckoutAddressForm';
import { CreditCardDetailsType2 } from '@definations/checkout';
import { deleteCookie, setCookie } from '@helpers/common.helper';
import {
  CreateUserAddress,
  GetShippingmethod,
  UpdateUserAddress,
} from '@services/address.service';
import { placeOrder as placeOrderService } from '@services/checkout.service';
import AddressFormPk from './components/Form';

import NxtImage from '@appComponents/reUsable/Image';
import { CheckoutMessage, __ValidationText } from '@constants/validation.text';
import { AddressAPIRequest } from '@definations/APIs/address.req';
import getLocation, { _location } from '@helpers/getLocation';
import { Klaviyo_PlaceOrder } from '@services/klaviyo.service';
import { GetStoreCustomer } from '@services/user.service';
import { maxLengthCalculator } from '@templates/checkout/checkoutType6/CO6_Extras';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { ReferralForm } from './components/ReferralForm';

interface _Props {
  templateId: number;
}

export interface _HandlerProps {
  name: string;
  value: string;
}

const ChekoutType2: FC<_Props> = ({ templateId }) => {
  // placeOrder,
  const { currentPage, setCurrentPage } = CheckoutController();
  const router = useRouter();
  const {
    setShowLoader,
    logoutClearCart,
    showModal,
    updateCustomer,
    updateEmployeeV2,
    product_employeeLogin,
    update_CheckoutAddress,
    logInUser,
  } = useActions_v2();
  const {
    shippingChargeType,
    id: storeId,
    code: storeCode,
    isSewOutEnable,
    gclid,
  } = useTypedSelector_v2((state) => state.store);

  const { useBalance, allowedBalance } = useTypedSelector_v2(
    (state) => state.cart.userCreditBalance,
  );
  const [paymentMethod, setPaymentMethod] = useState(paymentEnum.creditCard);
  const [billingAddress, setBillingAddress] = useState<AddressType | null>(
    null,
  );
  const [shippingAddress, setShippingAddress] = useState<AddressType | null>(
    null,
  );
  const [selectedShipping, setSelectedShipping] = useState<
    _shippingMethod | { name: ''; price: 0 }
  >({ name: '', price: 0 });
  const [showPayment, setshowPayment] = useState<boolean>(false);
  const [showShippingMethod, setShowShippingMethod] = useState<boolean>(true);
  const customerId = GetCustomerId();
  const [referralRecipient, setReferralRecipient] = useState<string>('');
  const [cardDetails, setCardDetails] = useState<CreditCardDetailsType2>({
    cardNumber: '',
    cardVarificationCode: '',
    cardExpirationMonth: '',
    cardExpirationYear: '',
    creditCardHolder: '',
  });
  const [shippingMethod, setShippingMethod] = useState<_shippingMethod[] | []>([
    {
      name: '',
      price: 0,
    },
  ]);
  const [purchaseOrder, setPurchaseOrder] = useState('');

  const paymentFieldUpdateHandler = (e: _HandlerProps) => {
    const { name, value } = e;

    switch (paymentMethod) {
      case paymentEnum.creditCard:
        setPurchaseOrder('');
        if (name == 'cardExpirationYear') {
          setCardDetails((prev) => ({ ...prev, [name]: '20' + value }));
        } else {
          setCardDetails((prev) => ({ ...prev, [name]: value.trim() }));
        }
        break;
      case paymentEnum.purchaseOrder:
        setCardDetails({
          cardNumber: '',
          cardVarificationCode: '',
          cardExpirationMonth: '',
          cardExpirationYear: '',
          creditCardHolder: '',
        });
        setPurchaseOrder(value);
    }
  };

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
              shippingCountry === null
                ? ' '
                : shippingAddress?.countryName || '',
            zipCode: shippingAddress?.postalCode || '',
            customerID: customerId,
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

  const {
    loggedIn: isEmployeeLoggedIn,
    empId,
    guestLoginJustByEmail,
  } = useTypedSelector_v2((state) => state.employee);

  const { el: employeeLogin, charges: checkoutCharges } = useTypedSelector_v2(
    (state) => state.checkout,
  );

  const { customer } = useTypedSelector_v2((state) => state.user);

  useEffect(() => {
    if (!customer) return;

    const billingAddressExist = customer?.customerAddress.find(
      (address) =>
        (address.isDefault &&
          address.addressType == UserAddressType.BILLINGADDRESS) ||
        address.addressType == UserAddressType.BILLINGADDRESS,
    );
    const shippingAddressExist = customer?.customerAddress.find(
      (address) =>
        (address.isDefault &&
          address.addressType == UserAddressType.SHIPPINGADDRESS) ||
        address.addressType == UserAddressType.SHIPPINGADDRESS,
    );
    if (billingAddressExist) {
      setBillingAddress(billingAddressExist);
    }
    if (shippingAddressExist) {
      setShippingAddress(shippingAddressExist);
    }
  }, [customer]);

  const addPaymentDetails = () => {
    if (employeeLogin.isPaymentPending) {
      return {
        paymentMethod: 'PAYMENTPENDING',
        paymentGateway: 'PAYMENTPENDING',
      };
    }

    const card = {
      cardType: detectCardType(),
      cardNumber: cardDetails.cardNumber,
      cardVarificationCode: cardDetails.cardVarificationCode,
      cardExpirationMonth: cardDetails.cardExpirationMonth,
      cardExpirationYear: cardDetails.cardExpirationYear,
      isCreditLimit: false,
      paymentMethod: PaymentMethod.CREDITCARD,
      paymentGateway: PaymentMethod.CHARGELOGIC,
    };

    if (paymentMethod === paymentEnum.creditCard) {
      return card;
    }

    const purchaseOrderObj = {
      AuthorizationPNREF: purchaseOrder,
      isCreditLimit: false,
      paymentMethod: PaymentMethod.PREPAYMENT,
      paymentGateway: PaymentMethod.PREPAYMENT,
    };
    if (paymentMethod === paymentEnum.purchaseOrder) {
      return purchaseOrderObj;
    }

    return {};
  };

  useEffect(() => {
    if (employeeLogin.isPaymentPending) {
      setCardDetails({
        cardNumber: '',
        cardVarificationCode: '',
        cardExpirationMonth: '',
        cardExpirationYear: '',
        creditCardHolder: '',
      });
      setPurchaseOrder('');
    }
  }, [employeeLogin.isPaymentPending]);
  const userID = GetCustomerId();
  const [changeBillingAddress, setChangeBillingAddress] =
    useState<boolean>(false);

  const validationSchema = yup.object({
    firstname: yup
      .string()
      .trim()
      .required('Required field')
      .min(
        CheckoutMessage.firstName.minLength,
        CheckoutMessage.firstName.minValidation,
      ),
    lastName: yup
      .string()
      .trim()
      .required('Required field')
      .min(
        CheckoutMessage.lastName.minLength,
        CheckoutMessage.lastName.minValidation,
      ),
    address1: yup.string().trim().required('Required field'),
    city: yup.string().trim().required('Required field'),
    postalCode: yup.string().trim().required('Required Field'),
    countryName: yup.string().trim().required('Required field'),
    state: yup.string().trim().required('Required field'),
    phone: yup
      .string()
      .trim()
      .required(__ValidationText.signUp.storeCustomerAddress.phone.required)
      .test(
        'phone-test',
        __ValidationText.signUp.storeCustomerAddress.phone.valid,
        (value) => {
          if (
            phonePattern1.test(value || '') ||
            phonePattern2.test(value || '') ||
            phonePattern3.test(value || '') ||
            phonePattern4.test(value || '')
          )
            return true;
          return false;
        },
      ),
  });

  const convertIntoInitials = (address: AddressType | null): AddressType => {
    return {
      firstname: address?.firstname || '',
      lastName: address?.lastName || '',
      address1: address?.address1 || '',
      address2: address?.address2 || '',
      city: address?.city || '',
      state: address?.state || '',
      postalCode: address?.postalCode || '',
      phone: address?.phone || '',
      countryName: address?.countryName || '',
      countryCode: address?.countryCode || '',
      id: address?.id || 0,
      rowVersion: address?.rowVersion || '',
      email: address?.email || '',
      suite: address?.suite || '',
      fax: address?.fax || '',
      isDefault: address?.isDefault || false,
      companyName: address?.companyName || '',
    };
  };

  const Billingformik = useFormik({
    initialValues: convertIntoInitials(billingAddress),
    validationSchema: validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: (values) => {},
  });

  const ShippingFormik = useFormik({
    initialValues: convertIntoInitials(shippingAddress),
    validationSchema: validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: () => {},
  });

  const [useShippingAddress, setUseShippingAddress] = useState<boolean>(false);

  const {
    totalPrice,
    subTotal,
    discount,
    totalLineCharges,
    logoSetupCharges,
    totalLogoCharges,
    smallRunFee,
    creditBalance,
  } = GetCartTotals();

  const logout_EmployeeLogin = (id: string) => {
    updateEmployeeV2('CLEAN_UP');
    product_employeeLogin('MinQtyToOne_CleanUp');
    logoutClearCart();
    logInUser('CLEAN_UP');
    setCookie(__Cookie.userId, '', 'EPOCH');
    deleteCookie(__Cookie.tempCustomerId);
    localStorage.removeItem(__LocalStorage.guestEmailID);
    localStorage.removeItem(__LocalStorage.empData);
    localStorage.removeItem(__LocalStorage.empGuest);
    router.push(`/${paths.THANK_YOU}?orderNumber=${id}`);
  };

  const getNewShippingCost = (shippingCost: number): number => {
    if (isEmployeeLoggedIn) {
      return employeeLogin.shippingPrice;
    }

    return shippingCost;
  };

  const decideEmail = (loggedInCustomerEmail: string) => {
    if (isEmployeeLoggedIn && guestLoginJustByEmail) {
      return guestLoginJustByEmail;
    }

    return loggedInCustomerEmail;
  };

  const getNewSmallRunFee = (smallRunFee: number): number => {
    if (isEmployeeLoggedIn) {
      return employeeLogin.smallRunFee;
    }

    return smallRunFee;
  };

  const placeOrder = async (selectedShippingMOodel: _shippingMethod) => {
    setShowLoader(true);

    if (shippingAddress && billingAddress && customer) {
      const orderModel = {
        ...AddOrderDefault,
        ...addPaymentDetails(),
        cardName: billingAddress.firstname + ' ' + billingAddress?.lastName,
        storeID: storeId,
        customerID: userID,
        firstName: customer?.firstname || billingAddress.firstname,
        lastName: customer?.lastName || billingAddress.lastName,
        email: decideEmail(customer?.email),
        billingEqualsShipping: useShippingAddress,
        billingEmail: billingAddress.email,
        billingFirstName: billingAddress.firstname,
        billingLastName: billingAddress.lastName,
        billingCompany: billingAddress.companyName,
        billingAddress1: billingAddress.address1,
        billingAddress2: billingAddress.address2,
        billingSuite: billingAddress.suite,
        billingCity: billingAddress.city,
        billingState: billingAddress.state,
        billingZip: billingAddress.postalCode,
        billingCountry: billingAddress.countryName,
        billingPhone: billingAddress.phone,
        shippingEmail: decideEmail(customer?.email),
        shippingFirstName: shippingAddress.firstname,
        shippingLastName: shippingAddress.lastName,
        shippingCompany: shippingAddress.companyName,
        shippingAddress1: shippingAddress.address1,
        shippingAddress2: shippingAddress.address2,
        shippingSuite: shippingAddress.suite,
        shippingCity: shippingAddress.city,
        shippingState: shippingAddress.state,
        shippingZip: shippingAddress.postalCode,
        shippingCountry: shippingAddress.countryName,
        shippingPhone: shippingAddress.phone,
        orderSubtotal: subTotal,
        orderTax: checkoutCharges.salesTax,
        orderTotal:
          totalPrice +
          getNewSmallRunFee(smallRunFee) +
          getNewShippingCost(selectedShipping.price) +
          checkoutCharges.salesTax,
        orderNotes: '',
        couponCode: '',
        couponDiscountAmount: discount,
        orderStatus: __pagesConstant.checkoutPage.orderStatus,
        transactionStatus: __pagesConstant.checkoutPage.transactionStatus,
        shippingMethod: selectedShippingMOodel.name,
        endUserName: '',
        logoFinalTotal: totalLogoCharges,
        lineFinalTotal: totalLineCharges,
        orderShippingCosts: getNewShippingCost(selectedShipping.price),
        orderSmallRunFee: getNewSmallRunFee(smallRunFee),
        orderLogoSetupFee: logoSetupCharges,
        sewOut: isSewOutEnable,
        sewOutTotal: 0,
        employeeID: empId || 0,
        empSourceName: employeeLogin.source.label,
        empSourceMedium: employeeLogin.sourceMedium.label,
        empSalesRap: employeeLogin.salesRep.label,
        salesRepName: employeeLogin.salesRep.label,
        salesAgentId: +employeeLogin.salesRep.value,
        isAllowPo: employeeLogin.allowPo,
        referrer: referralRecipient,
        gclid: gclid,
        ...(useBalance && {
          isCreditLimit: true,
          storeCredit: creditBalance,
        }),
        ...(useBalance && {
          paymentMethod: PaymentMethod.PREPAYMENT,
          paymentGateway: PaymentMethod.PREPAYMENT,
          isCreditLimit: true,
          orderTotal: creditBalance + totalPrice,
        }),
      };

      try {
        await placeOrderService({
          orderModel,
        })
          .then(async (res) => {
            if (res?.id) {
              await Klaviyo_PlaceOrder({
                orderNumber: res.id,
              });
              if (isEmployeeLoggedIn) {
                setShowLoader(false);
                logout_EmployeeLogin(res?.id);
                return router.push(`/${paths.THANK_YOU}?orderNumber=${res.id}`);
              }
              setShowLoader(false);
              logoutClearCart();
              router.push(`/${paths.THANK_YOU}?orderNumber=${res.id}`);
              deleteCookie(__Cookie.tempCustomerId);
            } else if (res) {
              setShowLoader(false);
              showModal({
                message: Object.values(res)[0],
                title: 'Error',
              });
            }
          })
          .catch((err) => {
            setShowLoader(false);
            let x = '';
            Object.values(err).forEach((val) => (x = x + val));
            showModal({
              message: x,
              title: 'Failed',
            });
          });
      } catch (error: any) {
        setShowLoader(false);
        let x = '';
        Object.values(error).forEach((val) => (x = x + val));
        showModal({
          message: x,
          title: 'Failed',
        });
      }
    }
  };

  useEffect(() => {
    if (totalPrice) {
      if (shippingAddress?.countryName) {
        fetchShipping(totalPrice);
      } else {
        fetchShipping(totalPrice, null);
      }
    }
  }, [totalPrice, ShippingFormik.values['countryName']]);

  const detectCardType = () => {
    const cc = cardDetails.cardNumber;
    let re = new RegExp('^4');
    if (cc.match(re) != null) return 'VISA';

    if (
      /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
        cc,
      )
    )
      return 'MASTERCARD';

    re = new RegExp('^3[47]');
    if (cc.match(re) != null) return 'AMEX';

    re = new RegExp(
      '^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)',
    );
    if (cc.match(re) != null) return 'DISCOVER';

    return '';
  };

  const decideToAddOrUpdateTheAddress = async (
    payload: AddressAPIRequest,
    updateAddress: boolean,
  ) => {
    if (updateAddress) {
      return UpdateUserAddress(payload);
    }

    return CreateUserAddress(payload);
  };

  const updateShippingAddressAsBillingAddress = async (
    shippingPayload: AddressAPIRequest,
  ) => {
    const billingPayload: AddressAPIRequest = {
      storeCustomerAddressModel: {
        ...shippingPayload.storeCustomerAddressModel,
        id: 0,
        recStatus: 'A',
        rowVersion: '',
        isDefault: false,
        addressType: UserAddressType.BILLINGADDRESS,
      },
    };

    return await Promise.allSettled([
      decideToAddOrUpdateTheAddress(shippingPayload, !!shippingAddress?.id),
      CreateUserAddress(billingPayload),
    ])
      .then(() => GetStoreCustomer(+userID))
      .then((response) => {
        if (response === null) return;
        updateCustomer({ customer: response });
      })
      .catch(() => {})
      .finally(() => {
        setShowLoader(false);
      });
  };

  const updateBothAddress = async (
    shippingPayload: AddressAPIRequest,
    location: _location,
  ) => {
    const billingPayload: AddressAPIRequest = {
      storeCustomerAddressModel: {
        customerId: +userID,
        email: decideEmail(customer?.email || ''),
        //
        firstname: Billingformik.values.firstname,
        lastName: Billingformik.values.lastName,
        address1: Billingformik.values.address1,
        address2: Billingformik.values.address2,
        city: Billingformik.values.city,
        state: Billingformik.values.state,
        postalCode: Billingformik.values.postalCode,
        phone: Billingformik.values.phone,
        countryName: Billingformik.values.countryName,
        countryCode: Billingformik.values.countryCode || '',
        // previous
        id: billingAddress?.id || 0,
        rowVersion: billingAddress?.rowVersion || '',
        suite: billingAddress?.suite || '',
        fax: billingAddress?.fax || '',
        companyName: billingAddress?.companyName || '',
        isDefault: billingAddress?.isDefault || true,
        //
        location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
        ipAddress: location.ip_address,
        // Static
        recStatus: 'A',
        macAddress: '00-00-00-00-00-00',
        addressType: UserAddressType.BILLINGADDRESS,
      },
    };

    return await Promise.allSettled([
      decideToAddOrUpdateTheAddress(shippingPayload, !!shippingAddress?.id),
      decideToAddOrUpdateTheAddress(billingPayload, !!billingAddress?.id),
    ])
      .then(() => GetStoreCustomer(+userID))
      .then((response) => {
        if (response === null) return;
        updateCustomer({ customer: response });
      })
      .catch(() => {})
      .finally(() => {
        setShowLoader(false);
      });
  };

  const reviewOrder = async () => {
    if (!employeeLogin.isPaymentPending) {
      const givenDate = `${cardDetails.cardExpirationYear}${cardDetails.cardExpirationMonth}`;
      const currentYear = new Date().getFullYear().toString();
      const date = new Date();
      const currentMonth =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : `${date.getMonth() + 1}`;
      const currentDate = currentYear + currentMonth.toString();

      if (paymentEnum.creditCard === paymentMethod) {
        if (+currentDate > +givenDate) {
          showModal({
            message:
              'Error in Credit Card Date information. Please verify and try again.',
            title: 'Error',
          });
          return;
        }

        const cardLength = maxLengthCalculator(
          'ccNumber',
          cardDetails.cardNumber,
        );
        if (cardDetails.cardNumber.length !== cardLength) {
          showModal({
            message:
              'Error in Credit Card Number information. Please verify and try again.',
            title: 'Error',
          });
          return;
        }

        const cvcLength = maxLengthCalculator('cvc', cardDetails.cardNumber);
        if (cardDetails.cardVarificationCode.length !== cvcLength) {
          showModal({
            message:
              'Error in Credit Card CVC information. Please verify and try again.',
            title: 'Error',
          });
          return;
        }

        if (cardDetails.creditCardHolder.length < 2) {
          return showModal({
            message:
              'Error in Credit Card Holder Name information. Please verify and try again.',
            title: 'Error',
          });
        }
      }
      if (paymentEnum.purchaseOrder == paymentMethod) {
        if (purchaseOrder.length <= 0) {
          showModal({
            message: 'Invalid Purchase Order Details',
            title: 'Error',
          });
          return;
        }
      }
    }

    setShowLoader(true);
    const location = await getLocation();
    const shippingPayload: AddressAPIRequest = {
      storeCustomerAddressModel: {
        customerId: +userID,
        email: decideEmail(customer?.email || ''),
        //
        firstname: ShippingFormik.values.firstname,
        lastName: ShippingFormik.values.lastName,
        address1: ShippingFormik.values.address1,
        address2: ShippingFormik.values.address2,
        city: ShippingFormik.values.city,
        state: ShippingFormik.values.state,
        postalCode: ShippingFormik.values.postalCode,
        phone: ShippingFormik.values.phone,
        countryName: ShippingFormik.values.countryName,
        countryCode: ShippingFormik.values.countryCode || '',
        //
        location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
        ipAddress: location.ip_address,
        // previous data
        id: shippingAddress?.id || 0,
        fax: shippingAddress?.fax || '',
        suite: shippingAddress?.suite || '',
        rowVersion: shippingAddress?.rowVersion || '',
        companyName: shippingAddress?.companyName || '',
        isDefault: shippingAddress?.isDefault || true,
        // Static
        macAddress: '00-00-00-00-00-00',
        recStatus: 'A',
        addressType: UserAddressType.SHIPPINGADDRESS,
      },
    };

    if (useShippingAddress) {
      await updateShippingAddressAsBillingAddress(shippingPayload);
      setCurrentPage(checkoutPages.reviewOrder);
      return;
    }
    await updateBothAddress(shippingPayload, location);
    setCurrentPage(checkoutPages.reviewOrder);
  };

  useEffect(() => {
    if (billingAddress?.postalCode) {
      update_CheckoutAddress({
        type: 'ZIP_CODE',
        value: billingAddress.postalCode,
      });
    }
  }, [billingAddress, Billingformik.values.postalCode]);

  return (
    <section className='mt-[20px]'>
      <div className='bg-white'>
        <div className='container mx-auto'>
          <div className='flex flex-wrap ml-[-15px] mr-[-15px] -mt-3 checkout-box'>
            {/* Billing Information */}
            <section className='w-full lg:w-8/12 md:w-7/12 pl-[15px] pr-[15px]'>
              <div className='md:flex flex-wrap checkout-box'>
                <div className='bg-light-gray flex-1 w-full md:w-6/12 mt-[15px] mr-[15px] mb-[30px]'>
                  {billingAddress && (
                    <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                      <div className='flex flex-wrap items-center justify-between pt-[10px] border-b border-[#ececec]'>
                        <div className='pb-[10px] text-title-text'>
                          {__pagesText.CheckoutPage.BillingInformation}
                        </div>
                        <div className='text-default-text'>
                          <div
                            onClick={() => {
                              ShippingFormik.submitForm();
                              if (ShippingFormik.isValid) {
                                setChangeBillingAddress(true);
                                if (shippingAddress) {
                                  setShowShippingMethod(false);
                                }

                                setCurrentPage(checkoutPages.address);
                                setshowPayment(true);
                              } else {
                                showModal({
                                  message:
                                    'Some Error Occurred in Shipping Address Form',
                                  title: 'Error',
                                });
                              }
                            }}
                            className='!text-anchor hover:!text-anchor-hover cursor-pointer '
                          >
                            {__pagesText.CheckoutPage.Change}
                          </div>
                        </div>
                      </div>
                      {billingAddress && (
                        <div className='text-default-text mt-[10px]'>
                          {/* {console.log(billingAddress, '<-----billingAddress')} */}
                          {billingAddress?.firstname} {billingAddress?.lastName}
                          {billingAddress?.companyName ? (
                            <>
                              <br />
                              {billingAddress?.companyName}
                              <br />
                            </>
                          ) : null}
                          {billingAddress?.address1},{' '}
                          {billingAddress?.suite &&
                          billingAddress?.suite.trim() != '' ? (
                            <>
                              {/* <br /> */}
                              {billingAddress?.suite}
                            </>
                          ) : null}
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
                  )}
                </div>
                {shippingAddress && (
                  <div className='bg-light-gray flex-1 w-full md:w-6/12 mt-[15px] mr-[15px] mb-[30px]'>
                    <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                      {
                        <div className='flex flex-wrap items-center justify-between pt-[10px] border-b border-[#ececec]'>
                          <div className='pb-[10px] text-title-text'>
                            {__pagesText.CheckoutPage.ShippingMethod}
                          </div>
                          <div className='text-default-text'>
                            <span
                              className='!text-anchor hover:!text-anchor-hover cursor-pointer'
                              onClick={() => {
                                setShowShippingMethod(true);
                                setshowPayment(false);
                                setChangeBillingAddress(false);
                                setCurrentPage(checkoutPages.address);
                              }}
                            >
                              {__pagesText.CheckoutPage.Change}
                            </span>
                          </div>
                        </div>
                      }
                      {
                        <div className='text-default-text mt-[10px] mb-[15px]'>
                          <span>
                            {__pagesText.CheckoutPage.ShippingMethod}
                            {':'}
                            {!_.isEmpty(selectedShipping) && (
                              <span>{`${
                                selectedShipping.name.toLowerCase() ===
                                  'free shipping' &&
                                storeCode === _Store_CODES.PKHG
                                  ? 'FedEX Ground'
                                  : selectedShipping.name
                              } ($${selectedShipping.price.toFixed(2)})`}</span>
                            )}
                          </span>
                        </div>
                      }
                      <div className='flex flex-wrap items-center justify-between pt-[10px] border-b border-[#ececec]'>
                        <div className='pb-[10px] text-title-text'>
                          {__pagesText.CheckoutPage.PaymentMethod}
                        </div>
                        <div className='text-default-text'>
                          <span
                            className='!text-anchor hover:!text-anchor-hover cursor-pointer'
                            onClick={() => {
                              setChangeBillingAddress(false);
                              setCurrentPage(checkoutPages.address);
                              !showShippingMethod && setshowPayment(true);
                            }}
                          >
                            {__pagesText.CheckoutPage.Change}
                          </span>
                        </div>
                      </div>
                      <div className='flex flex-wrap items-center justify-between pt-[10px]'>
                        <div className='pb-[10px] text-default-text'>
                          {!cardDetails &&
                            !purchaseOrder &&
                            __pagesText.CheckoutPage.paymentInfo}
                          {cardDetails.cardNumber && (
                            <>
                              <div className='flex flex-wrap'>
                                <div className='ml-[10px]'>
                                  <p>Payment Method: CREDIT CARD</p>
                                  <p>
                                    Name on card: {cardDetails.creditCardHolder}
                                  </p>
                                  <p>
                                    Card Number:{' '}
                                    {Array.from({
                                      length: cardDetails.cardNumber.length - 4,
                                    }).map(() => 'X')}
                                    {cardDetails.cardNumber.slice(-4)}
                                  </p>
                                </div>
                              </div>
                            </>
                          )}

                          {purchaseOrder && (
                            <>
                              <p>Payment Method: PO</p>
                              <p>PO Number: {purchaseOrder}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
                        <div className='bg-light-gray flex-1 w-full md:w-full mt-[15px] mb-[30px] pl-[15px] pr-[15px]'>
                          <div className='px-[5px] pt-[15px] pb-[15px]'>
                            <div className='flex flex-wrap items-center justify-between pt-[10px] border-b border-[#ececec]'>
                              <div className='pb-[10px] text-title-text'>
                                {__pagesText.CheckoutPage.ShippingAddress}
                              </div>
                            </div>
                            <AddressFormPk
                              addressformik={ShippingFormik}
                              values={ShippingFormik.values}
                              touched={ShippingFormik.touched}
                              errors={ShippingFormik.errors}
                            />
                          </div>
                        </div>
                      </div>
                      {
                        <div className='bg-light-gray w-full mb-[30px] opacity-100'>
                          <div className='bg-light-gray flex-1 w-full md:w-full mt-[15px] mb-[30px] pl-[15px] pr-[15px]'>
                            <div className='px-[5px] pt-[15px] pb-[15px]'>
                              <ReferralForm
                                setReferralRecipient={setReferralRecipient}
                              />
                            </div>
                          </div>
                        </div>
                      }
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
                                        `${
                                          el.name.toLowerCase() ===
                                            'free shipping' &&
                                          storeCode === _Store_CODES.PKHG
                                            ? 'FedEX Ground'
                                            : el.name
                                        }($${el.price.toFixed(2)})`}
                                    </label>
                                  </div>
                                ),
                              )}
                          </div>
                          <div className=''>
                            <button
                              className='btn btn-lg btn-primary'
                              onClick={() => {
                                ShippingFormik.submitForm();
                                if (!ShippingFormik.isValid) {
                                  showModal({
                                    message:
                                      'Some Error Occurred in Shipping Address Form',
                                    title: 'Error',
                                  });
                                  return;
                                }
                                setshowPayment(true);
                              }}
                            >
                              {__pagesText.CheckoutPage.GoToPayment}
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* payment method */}
                  {!showPayment && (
                    <div className='bg-light-gray w-full mb-[30px] opacity-50'>
                      <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                        <div className='flex flex-wrap items-center justify-between'>
                          <div className='pt-[10px] pb-[10px] text-title-text'>
                            {__pagesText.CheckoutPage.PaymentMethod}
                          </div>
                          <div className='pt-[10px] pb-[10px]'>
                            <div className='w-10'>
                              <NxtImage
                                isStatic={true}
                                useNextImage={false}
                                src='/secure-card-hover.png'
                                alt='lockimage'
                                className=''
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

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
                                  isStatic={true}
                                  useNextImage={false}
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
                          updatePaymentMethod={setPaymentMethod}
                          ShippingFormik={ShippingFormik}
                          detectCardType={detectCardType}
                          BillingFormik={Billingformik}
                          changeBillingAddress={changeBillingAddress}
                          setChangeBillingAddress={setChangeBillingAddress}
                          setUseShippingAddress={setUseShippingAddress}
                          useShippingAddress={useShippingAddress}
                          cardDetails={cardDetails}
                          purchaseOrder={purchaseOrder}
                          billingAddress={billingAddress}
                          setBillingAddress={setBillingAddress}
                        />
                        <div className='max-w-[278px]'>
                          <button
                            className='btn btn-lg !w-full text-center btn-primary mb-[8px]'
                            id='btn-review-order'
                            onClick={() => {
                              ShippingFormik.submitForm();
                              if (!ShippingFormik.isValid) {
                                setShowShippingMethod(true);
                                setChangeBillingAddress(false);
                                setshowPayment(false);
                                showModal({
                                  message:
                                    'Some Error Occurred in Shipping Address Form',
                                  title: 'Error',
                                });
                                return;
                              }

                              Billingformik.submitForm();
                              if (!Billingformik.isValid) {
                                setChangeBillingAddress(true);
                                setshowPayment(true);
                                showModal({
                                  message:
                                    'Some Error Occurred in Billing Address Form',
                                  title: 'Error',
                                });
                                return;
                              }

                              setBillingAddress(Billingformik.values);
                              reviewOrder();
                            }}
                          >
                            {__pagesText.CheckoutPage.GotoReview}
                          </button>
                        </div>
                      </div>

                      <div className='bg-[#d4d4d4] w-full mb-[30px]'>
                        <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px] text-center'>
                          <div className='w-28 mx-auto'>
                            <NxtImage
                              isStatic={true}
                              useNextImage={false}
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
              placeOrder={placeOrder}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChekoutType2;
