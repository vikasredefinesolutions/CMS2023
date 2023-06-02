import NxtImage from '@appComponents/reUsable/Image';
import {
  PaymentMethod,
  UserAddressType,
  checkoutPages,
  paymentMethodCustom as paymentEnum,
} from '@constants/enum';
import { __pagesText } from '@constants/pages.text';
import {
  GetCartTotals,
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';
import CartItem from '@templates/cartItem';
import _ from 'lodash';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import * as yup from 'yup';
import OrderSummary from './components/OrderSummary';
import PaymentType from './components/Payment';

import { __Cookie } from '@constants/global.constant';
import { __pagesConstant } from '@constants/pages.constant';
import { paths } from '@constants/paths.constant';
import { AddOrderDefault } from '@constants/payloads/checkout';
import CheckoutController, {
  _shippingMethod,
} from '@controllers/checkoutController';
import { AddressType } from '@controllers/checkoutController/CheckoutAddressForm';
import { CreditCardDetailsType2 } from '@definations/checkout';
import { deleteCookie } from '@helpers/common.helper';
import {
  CreateUserAddress,
  GetShippingmethod,
} from '@services/address.service';
import { placeOrder as placeOrderService } from '@services/checkout.service';
import AddressFormPk from './components/Form';

import getLocation from '@helpers/getLocation';
import { Klaviyo_PlaceOrder } from '@services/klaviyo.service';
import { GetStoreCustomer } from '@services/user.service';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
interface _Props {
  templateId: number;
}

const ChekoutType2: FC<_Props> = ({ templateId }) => {
  // placeOrder,
  const { currentPage, setCurrentPage } = CheckoutController();
  const router = useRouter();
  const { setShowLoader, logoutClearCart, showModal, updateCustomer } =
    useActions_v2();
  const { shippingChargeType, id: storeId } = useTypedSelector_v2(
    (state) => state.store,
  );
  const useBalance = useTypedSelector_v2(
    (state) => state.cart.userCreditBalance.useBalance,
  );
  const [paymentMethod, setPaymentMethod] = useState(paymentEnum.creditCard);

  const [cardDetails, setCardDetails] = useState<CreditCardDetailsType2>({
    cardNumber: '',
    cardVarificationCode: '',
    cardExpirationMonth: '',
    cardExpirationYear: '',
    creditCardHolder: '',
  });
  const [purchaseOrder, setPurchaseOrder] = useState('');

  const paymentFieldUpdateHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    switch (paymentMethod) {
      case paymentEnum.creditCard:
        setCardDetails((prev) => ({ ...prev, [name]: value }));
        break;
      case paymentEnum.purchaseOrder:
        setPurchaseOrder(value);
    }
  };
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

  const { loggedIn: isEmployeeLoggedIn, isLoadingComplete } =
    useTypedSelector_v2((state) => state.employee);

  const { el: employeeLogin } = useTypedSelector_v2((state) => state.checkout);

  const { loggedIn, customer, id } = useTypedSelector_v2((state) => state.user);

  const [billingAddress, setBillingAddress] = useState<AddressType | null>(
    null,
  );

  const [shippingAddress, setShippingAddress] = useState<AddressType | null>(
    null,
  );

  const [initialShippingValues, setShippingInitial] = useState<any>({});
  const [initialBillingValues, setBillingInitial] = useState<any>({});

  useEffect(() => {
    if (customer) {
      const userAccBilling = customer?.customerAddress.find(
        (el) =>
          (el.isDefault && el.addressType == UserAddressType.BILLINGADDRESS) ||
          el.addressType == UserAddressType.BILLINGADDRESS,
      );
      const userAccShipping = customer?.customerAddress.find(
        (el) =>
          (el.isDefault && el.addressType == UserAddressType.SHIPPINGADDRESS) ||
          el.addressType == UserAddressType.SHIPPINGADDRESS,
      );
      if (userAccBilling) {
        setBillingAddress(userAccBilling);
        setBillingInitial({
          firstname: userAccBilling ? userAccBilling?.firstname : '',
          lastName: userAccBilling ? userAccBilling?.lastName : '',
          email: userAccBilling ? userAccBilling?.email : '',
          address1: userAccBilling ? userAccBilling?.address1 : '',
          address2: userAccBilling ? userAccBilling?.address2 : '',
          suite: userAccBilling ? userAccBilling?.suite : '',
          city: userAccBilling ? userAccBilling?.city : '',
          state: userAccBilling ? userAccBilling?.state : '',
          postalCode: userAccBilling ? userAccBilling?.postalCode : '',
          Phone: userAccBilling ? userAccBilling?.phone : '',
          fax: userAccBilling ? userAccBilling?.fax : '',
          CountryName: userAccBilling ? userAccBilling?.countryName : '',
          isDefault: true,
          companyName: userAccBilling ? userAccBilling?.companyName : '',
          countryCode: userAccBilling ? userAccBilling?.countryCode : '',
        });
      }
      if (userAccShipping) {
        setShippingAddress(userAccShipping);
        setShippingInitial({
          firstname: shippingAddress ? shippingAddress?.firstname : '',
          lastName: shippingAddress ? shippingAddress?.lastName : '',
          email: shippingAddress ? shippingAddress?.email : '',
          address1: shippingAddress ? shippingAddress?.address1 : '',
          address2: shippingAddress ? shippingAddress?.address2 : '',
          suite: shippingAddress ? shippingAddress?.suite : '',
          city: shippingAddress ? shippingAddress?.city : '',
          state: shippingAddress ? shippingAddress?.state : '',
          postalCode: shippingAddress ? shippingAddress?.postalCode : '',
          Phone: shippingAddress ? shippingAddress?.phone : '',
          fax: shippingAddress ? shippingAddress?.fax : '',
          CountryName: shippingAddress ? shippingAddress?.countryName : '',
          isDefault: true,
          companyName: shippingAddress ? shippingAddress?.companyName : '',
          countryCode: shippingAddress ? shippingAddress?.countryCode : '',
        });
      }
    }
  }, [customer]);

  const addPaymentDetails = () => {
    if (employeeLogin.isPaymentPending) {
      return {
        paymentMethod: 'PAYMENTPENDING',
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

  const userID = GetCustomerId();
  const [changeBillingAddress, setChangeBillingAddress] =
    useState<boolean>(false);

  const validationSchema = yup.object({
    firstName: yup.string().required('Required field'),
    lastName: yup.string().required('Required field'),
    streetAddress: yup.string().required('Required field'),
    city: yup.string().required('Required field'),
    zipCode: yup.string().required('Required Field'),
    country: yup.string().required('Required field'),
    state: yup.string().required('Required field'),
    phone: yup.number().required('Required field'),
  });

  const Billingformik = useFormik({
    initialValues: initialBillingValues,
    validationSchema: validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: (values) => {},
  });

  const ShippingFormik = useFormik({
    initialValues: initialShippingValues,
    validationSchema: validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: (values) => {},
  });

  const [useShippingAddress, setUseShippingAddress] = useState<boolean>(true);

  const {
    totalPrice,
    subTotal,
    discount,
    totalLineCharges,
    logoSetupCharges,
    totalLogoCharges,
    smallRunFee,
    salesTax,
    sewOutTotal,
    creditBalance,
  } = GetCartTotals();
  const [showPayment, setshowPayment] = useState<boolean>(false);
  const [showShippingMethod, setShowShippingMethod] = useState<boolean>(true);

  const placeOrder = async (selectedShippingMOodel: _shippingMethod) => {
    let userNewId = 0;
    setShowLoader(true);

    if (shippingAddress && billingAddress && customer) {
      const orderModel = {
        ...AddOrderDefault,
        ...addPaymentDetails(),
        cardName: billingAddress.firstname + ' ' + billingAddress?.lastName,
        ...(useBalance
          ? {
              isCreditLimit: true,
              storeCredit: creditBalance,
            }
          : {}),
        ...(useBalance && totalPrice === creditBalance
          ? {
              paymentMethod: PaymentMethod.PREPAYMENT,
              paymentGateway: PaymentMethod.PREPAYMENT,
            }
          : {}),
        storeID: storeId,
        customerID: userID,
        firstName: customer?.firstname || billingAddress.firstname,
        lastName: customer?.lastName || billingAddress.lastName,
        email: customer?.email,
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
        shippingEmail: customer?.email,
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
        orderTax: salesTax,
        orderTotal: totalPrice + selectedShippingMOodel.price,
        orderNotes: '',
        couponCode: '',
        couponDiscountAmount: discount,
        orderStatus: __pagesConstant.checkoutPage.orderStatus,
        transactionStatus: __pagesConstant.checkoutPage.transactionStatus,
        shippingMethod: selectedShippingMOodel.name,
        endUserName: '',
        logoFinalTotal: totalLogoCharges,
        lineFinalTotal: totalLineCharges,
        orderShippingCosts: selectedShipping.price,
        orderSmallRunFee: smallRunFee,
        orderLogoSetupFee: logoSetupCharges,

        // EMPLOYEE LOGIN SPECIFIC
        // empSourceName: employeeLogin.source.value,
        // empSourceMedium: employeeLogin.sourceMedium.value,
        // empSalesRap: employeeLogin.salesRep.label,
        // salesRepName: employeeLogin.salesRep.label,
        // salesAgentId: +employeeLogin.salesRep.value,
        // isAllowPo: employeeLogin.allowPo,
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
              // if (isEmployeeLoggedIn) {
              //   logout_EmployeeLogin();
              // }
              setShowLoader(false);
              router.push(`/${paths.THANK_YOU}?orderNumber=${res.id}`);
              logoutClearCart();
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
  }, [totalPrice, shippingAddress]);

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
  const reviewOrder = async () => {
    if (!employeeLogin.isPaymentPending) {
      const yearFull =
        cardDetails.cardExpirationYear.length == 2
          ? `20${cardDetails.cardExpirationYear}`
          : cardDetails.cardExpirationYear;
      const givenDate = `${yearFull}${cardDetails.cardExpirationMonth}`;
      const currentYear = new Date().getFullYear().toString();
      const currentMonth = new Date().getMonth() + 1;
      const currentDate = currentYear + currentMonth.toString();
      if (paymentEnum.creditCard === paymentMethod) {
        if (+currentDate > +givenDate) {
          showModal({
            message:
              'Error in Credit Card information. Please verify and try again.',
            title: 'Error',
          });
          return;
        }
        if (cardDetails.cardVarificationCode.length !== 3) {
          showModal({
            message:
              'Error in Credit Card information. Please verify and try again.',
            title: 'Error',
          });
          return;
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

      const data = await getLocation();
      if (useShippingAddress) {
        console.log(
          'we are in same',
          ShippingFormik.values,
          Billingformik.values,
        );

        const objShipping = {
          storeCustomerAddressModel: {
            id: 0,
            rowVersion: '',
            location: `${data.city}, ${data.region}, ${data.country}, ${data.postal_code}`,
            ipAddress: data.ip_address,
            macAddress: '00-00-00-00-00-00',
            customerId: ~~userID,
            firstname: ShippingFormik.values.firstname,
            lastName: ShippingFormik.values.lastName,
            email: customer?.email || '',
            address1: ShippingFormik.values.address1,
            address2: ShippingFormik.values.address2 || ' ',
            suite: ' ',
            city: ShippingFormik.values.city,
            state: ShippingFormik.values.state,
            postalCode: ShippingFormik.values.postalCode,
            phone: ShippingFormik.values.Phone,
            fax: ShippingFormik.values.fax ? ShippingFormik.values.fax : '',
            countryName: ShippingFormik.values.CountryName,
            countryCode: ShippingFormik.values.countryCode || '',
            addressType: UserAddressType.SHIPPINGADDRESS,
            isDefault: true,
            recStatus: 'A',
            companyName: ShippingFormik.values.companyName || ' ',
          },
        };

        const objBilling = {
          storeCustomerAddressModel: {
            id: 0,
            rowVersion: '',
            location: `${data.city}, ${data.region}, ${data.country}, ${data.postal_code}`,
            ipAddress: data.ip_address,
            macAddress: '00-00-00-00-00-00',
            customerId: ~~userID,
            firstname: ShippingFormik.values.firstname,
            lastName: ShippingFormik.values.lastName,
            email: customer?.email || '',
            address1: ShippingFormik.values.address1,
            address2: ShippingFormik.values.address2 || ' ',
            suite: ' ',
            city: ShippingFormik.values.city,
            state: ShippingFormik.values.state,
            postalCode: ShippingFormik.values.postalCode,
            phone: ShippingFormik.values.Phone,
            fax: ShippingFormik.values.fax ? ShippingFormik.values.fax : '',
            countryName: ShippingFormik.values.CountryName,
            countryCode: ShippingFormik.values.countryCode || '',
            addressType: UserAddressType.BILLINGADDRESS,
            isDefault: true,
            recStatus: 'A',
            companyName: ShippingFormik.values.companyName || ' ',
          },
        };
        const ShippingADD = await CreateUserAddress(objShipping);
        const BillingADD = await CreateUserAddress(objBilling);

        if (ShippingADD && BillingADD) {
          GetStoreCustomer(+userID).then((res) => {
            if (res === null) return;
            updateCustomer({ customer: res });
          });
        }
      } else {
        console.log('we are in else', ShippingFormik, Billingformik);

        const objShipping = {
          storeCustomerAddressModel: {
            id: 0,
            rowVersion: '',
            location: `${data.city}, ${data.region}, ${data.country}, ${data.postal_code}`,
            ipAddress: data.ip_address,
            macAddress: '00-00-00-00-00-00',
            customerId: ~~userID,
            firstname: ShippingFormik.values.firstname,
            lastName: ShippingFormik.values.lastName,
            email: customer?.email || '',
            address1: ShippingFormik.values.address1,
            address2: ShippingFormik.values.address2 || ' ',
            suite: ' ',
            city: ShippingFormik.values.city,
            state: ShippingFormik.values.state,
            postalCode: ShippingFormik.values.postalCode,
            phone: ShippingFormik.values.phone,
            fax: ShippingFormik.values.fax ? ShippingFormik.values.fax : '',
            countryName: ShippingFormik.values.countryName,
            countryCode: ShippingFormik.values.countryCode || '',
            addressType: UserAddressType.SHIPPINGADDRESS,
            isDefault: true,
            recStatus: 'A',
            companyName: ShippingFormik.values.companyName || ' ',
          },
        };

        const objBilling = {
          storeCustomerAddressModel: {
            id: 0,
            rowVersion: '',
            location: `${data.city}, ${data.region}, ${data.country}, ${data.postal_code}`,
            ipAddress: data.ip_address,
            macAddress: '00-00-00-00-00-00',
            customerId: ~~userID,
            firstname: Billingformik.values.firstname,
            lastName: Billingformik.values.lastName,
            email: customer?.email || '',
            address1: Billingformik.values.address1,
            address2: Billingformik.values.address2 || ' ',
            suite: ' ',
            city: Billingformik.values.city,
            state: Billingformik.values.state,
            postalCode: Billingformik.values.postalCode,
            phone: Billingformik.values.phone,
            fax: Billingformik.values.fax ? Billingformik.values.fax : '',
            countryName: Billingformik.values.countryName,
            countryCode: Billingformik.values.countryCode || '',
            addressType: UserAddressType.BILLINGADDRESS,
            isDefault: true,
            recStatus: 'A',
            companyName: Billingformik.values.companyName || ' ',
          },
        };
        const ShippingADD = await CreateUserAddress(objShipping);
        const BillingADD = await CreateUserAddress(objBilling);

        if (ShippingADD && BillingADD) {
          GetStoreCustomer(+userID).then((res) => {
            if (res === null) return;
            updateCustomer({ customer: res });
          });
        }
      }

      setCurrentPage(checkoutPages.reviewOrder);
    }
  };

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
                            setCurrentPage(checkoutPages.address);
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
                          } ($${selectedShipping.price.toFixed(2)})`}</span>
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
                            setCurrentPage(checkoutPages.address);
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
                            <AddressFormPk addressformik={ShippingFormik} />
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
                                        `${el.name}($${el.price.toFixed(2)})`}
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
                  {!showPayment && (
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
                          detectCardType={detectCardType}
                          BillingFormik={Billingformik}
                          changeBillingAddress={changeBillingAddress}
                          setChangeBillingAddress={setChangeBillingAddress}
                          setUseShippingAddress={setUseShippingAddress}
                          useShippingAddress={useShippingAddress}
                          cardDetails={cardDetails}
                          purchaseOrder={purchaseOrder}
                        />
                        <div className='max-w-[278px]'>
                          <button
                            className='btn btn-lg !w-full text-center btn-secondary mb-[8px]'
                            id='btn-review-order'
                            onClick={() => {
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
                          {__pagesText.CheckoutPage.OrderReview} test
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
