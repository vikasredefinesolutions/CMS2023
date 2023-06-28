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

import {
  CYXTERA_CODE,
  SIMPLI_SAFE_CODE,
  UNITI_CODE,
  __Cookie,
  __Cookie_Expiry,
  __LocalStorage,
  phonePattern1,
  phonePattern2,
  phonePattern3,
  phonePattern4,
} from '@constants/global.constant';
import { __pagesConstant } from '@constants/pages.constant';
import { paths } from '@constants/paths.constant';
import { AddOrderDefault } from '@constants/payloads/checkout';
import CheckoutController, {
  _shippingMethod,
} from '@controllers/checkoutController';
import { AddressType } from '@controllers/checkoutController/CheckoutAddressForm';
import { CreditCardDetailsType2 } from '@definations/checkout';
import {
  KlaviyoScriptTag,
  deleteCookie,
  extractCookies,
  setCookie,
} from '@helpers/common.helper';
import {
  CreateUserAddress,
  GetShippingmethod,
} from '@services/address.service';
import { placeOrder as placeOrderService } from '@services/checkout.service';
import AddressFormPk from './components/Form';

import Input from '@appComponents/ui/switch/Input';
import { _Store } from '@configs/page.config';
import { __messages } from '@constants/form.config';
import { commonMessage } from '@constants/successError.text';
import { __ValidationText } from '@constants/validation.text';
import getLocation from '@helpers/getLocation';
import { fetchCartDetails } from '@redux/asyncActions/cart.async';
import { updateCartByNewUserId } from '@services/cart.service';
import { Klaviyo_PlaceOrder } from '@services/klaviyo.service';
import { GetStoreCustomer, signInUser } from '@services/user.service';
import { getWishlist } from '@services/wishlist.service';
import { Form, Formik, useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PaymentType from './components/Payment';

export interface _CO2_AddressFields {
  firstname: string;
  lastName: string;
  email: string;
  address1: string;
  address2: string;
  suite: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  fax: string;
  countryName: string;
  isDefault: boolean;
  companyName: string;
  countryCode: string;
}

const CO2_AddressFields = {
  firstname: '',
  lastName: '',
  email: '',
  address1: '',
  address2: '',
  suite: '',
  city: '',
  state: '',
  postalCode: '',
  phone: '',
  fax: '',
  countryName: '',
  isDefault: true,
  companyName: '',
  countryCode: '',
};
interface _Props {
  templateId: number;
}

const ChekoutType7: FC<_Props> = ({ templateId }) => {
  const validationSchemaLogin = yup.object().shape({
    email: yup
      .string()
      .email(__messages.email.validRequest)
      .required(__messages.email.required)
      .nullable(),
    password: yup.string().required(__messages.password.required).nullable(),
  });
  const checkCustomEmail = (email: string, domain: 'usaa' | 'simplisafe') => {
    const result = new RegExp("^\\w+([-+.']w+)*@" + domain + '.com$').test(
      email.trim(),
    );
    if (
      !result &&
      (storeCode == _Store.type5 || storeCode == SIMPLI_SAFE_CODE)
    ) {
      return setErrorMsg(`Please enter ${domain} email address.`);
    }
    return setErrorMsg('');
  };

  const loginCustomer = async ({
    password,
    email,
  }: {
    password: string;
    email: string;
  }) => {
    if (!!showErroMsg) return;
    const loginResponse = await signInUser({
      userName: email,
      storeId: storeId,
      password: password,
    });

    if (loginResponse.credentials === 'VALID') {
      logInUser({
        id: +loginResponse.id,
      });
      setCookie(__Cookie.userId, loginResponse.id, __Cookie_Expiry.userId);

      GetStoreCustomer(+loginResponse.id).then((res) => {
        if (res === null) return;
        if (localStorage) {
          const tempCustomerId = extractCookies(
            __Cookie.tempCustomerId,
            'browserCookie',
          ).tempCustomerId;

          if (tempCustomerId) {
            updateCartByNewUserId(~~tempCustomerId, res.id).then(() => {
              fetchCartDetails({
                customerId: res.id,
                isEmployeeLoggedIn: isEmployeeLoggedIn,
              });
            });
            deleteCookie(__Cookie.tempCustomerId);
          }
        }

        const userInfo = {
          $email: res.email,
          $first_name: res.firstname,
          $last_name: res.lastName,
          $phone_number: '',
          $organization: res.companyName,
          $title: 'title',
          $timestamp: new Date(),
        };

        KlaviyoScriptTag(['identify', userInfo]);
        updateCustomer({ customer: res });
        getWishlist(res.id).then((wishListResponse) => {
          updateWishListData(wishListResponse);
        });
      });
      // setCurrentPage(checkoutPages.address);
    } else if (loginResponse.credentials === 'INVALID') {
      showModal({
        message: loginResponse.message,
        title: commonMessage.failed,
      });
    } else {
      showModal({
        message: commonMessage.somethingWentWrong,
        title: commonMessage.failed,
      });
    }
  };
  const { currentPage, setCurrentPage } = CheckoutController();
  const [shippingMethods, setShippingMethods] = useState<_shippingMethod[]>([]);
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
    updateWishListData,
  } = useActions_v2();
  const {
    shippingChargeType,
    id: storeId,
    isSewOutEnable,
    gclid,
  } = useTypedSelector_v2((state) => state.store);
  const { useBalance, allowedBalance } = useTypedSelector_v2(
    (state) => state.cart.userCreditBalance,
  );
  const [paymentMethod, setPaymentMethod] = useState(paymentEnum.creditCard);

  const customerId = GetCustomerId();

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
        if (name == 'cardExpirationYear') {
          setCardDetails((prev) => ({ ...prev, [name]: '20' + value }));
        } else {
          setCardDetails((prev) => ({ ...prev, [name]: value }));
        }
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
    shippingState?: string,
    shippingCity?: string,
  ) => {
    try {
      if (storeId && shippingChargeType) {
        const data = await GetShippingmethod({
          shippingMethodModel: {
            city: shippingAddress?.city || ShippingFormik.values.city,
            state: shippingAddress?.state || ShippingFormik.values.state,
            country:
              shippingCountry === null
                ? ' '
                : shippingAddress?.countryName ||
                  ShippingFormik.values.countryName,
            zipCode:
              shippingAddress?.postalCode || ShippingFormik.values.postalCode,
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

  const [shippingMethod, setShippingMethod] = useState<_shippingMethod[] | []>([
    {
      name: '',
      price: 0,
    },
  ]);

  const {
    loggedIn: isEmployeeLoggedIn,
    isLoadingComplete,
    empId,
    guestLoginJustByEmail,
  } = useTypedSelector_v2((state) => state.employee);

  const { el: employeeLogin, charges: checkoutCharges } = useTypedSelector_v2(
    (state) => state.checkout,
  );

  const { customer } = useTypedSelector_v2((state) => state.user);

  const [billingAddress, setBillingAddress] = useState<AddressType | null>(
    null,
  );

  const [shippingAddress, setShippingAddress] = useState<AddressType | null>(
    null,
  );

  const [initialShippingValues, setShippingInitial] =
    useState<_CO2_AddressFields>(CO2_AddressFields);
  const [initialBillingValues, setBillingInitial] =
    useState<_CO2_AddressFields>(CO2_AddressFields);

  useEffect(() => {
    if (customer) {
      const userAccBilling = customer?.customerAddress.find(
        (el) =>
          (el.isDefault && el.addressType == UserAddressType.BILLINGADDRESS) ||
          el.addressType == UserAddressType.BILLINGADDRESS ||
          (el.isDefault &&
            (storeCode === SIMPLI_SAFE_CODE || storeCode === _Store.type5)),
      );
      const userAccShipping = customer?.customerAddress.find(
        (el) =>
          (el.isDefault && el.addressType == UserAddressType.SHIPPINGADDRESS) ||
          el.addressType == UserAddressType.SHIPPINGADDRESS ||
          (el.isDefault &&
            (storeCode === SIMPLI_SAFE_CODE || storeCode === _Store.type5)),
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
          phone: userAccBilling ? userAccBilling?.phone : '',
          fax: userAccBilling ? userAccBilling?.fax : '',
          countryName: userAccBilling ? userAccBilling?.countryName : '',
          isDefault: true,
          companyName: userAccBilling ? userAccBilling?.companyName : '',
          countryCode: userAccBilling ? userAccBilling?.countryCode : '',
        });
      }
      if (userAccShipping) {
        setShippingAddress(userAccShipping);
        setShippingInitial({
          firstname: userAccShipping ? userAccShipping?.firstname : '',
          lastName: userAccShipping ? userAccShipping?.lastName : '',
          email: userAccShipping ? userAccShipping?.email : '',
          address1: userAccShipping ? userAccShipping?.address1 : '',
          address2: userAccShipping ? userAccShipping?.address2 : '',
          suite: userAccShipping ? userAccShipping?.suite : '',
          city: userAccShipping ? userAccShipping?.city : '',
          state: userAccShipping ? userAccShipping?.state : '',
          postalCode: userAccShipping ? userAccShipping?.postalCode : '',
          phone: userAccShipping ? userAccShipping?.phone : '',
          fax: userAccShipping ? userAccShipping?.fax : '',
          countryName: userAccShipping ? userAccShipping?.countryName : '',
          isDefault: true,
          companyName: userAccShipping ? userAccShipping?.companyName : '',
          countryCode: userAccShipping ? userAccShipping?.countryCode : '',
        });
      }
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
    firstname: yup.string().trim().required('Required field'),
    lastName: yup.string().trim().required('Required field'),
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
    creditBalance,
  } = GetCartTotals();
  const [showPayment, setshowPayment] = useState<boolean>(false);
  const [showCardinfo, setshowCardinfo] = useState<boolean>(false);
  const [showShippingMethod, setShowShippingMethod] = useState<boolean>(true);

  const logout_EmployeeLogin = (id: string) => {
    updateEmployeeV2('CLEAN_UP');
    product_employeeLogin('MinQtyToOne_CleanUp');
    logoutClearCart();
    logInUser('CLEAN_UP');

    setCookie(__Cookie.userId, '', 'EPOCH');
    deleteCookie(__Cookie.tempCustomerId);
    localStorage.removeItem(__LocalStorage.guestEmailID);
    localStorage.removeItem(__LocalStorage.empGuest);
    localStorage.removeItem(__LocalStorage.empData);
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

        // EMPLOYEE LOGIN SPECIFIC
        employeeID: empId || 0,
        empSourceName: employeeLogin.source.label,
        empSourceMedium: employeeLogin.sourceMedium.label,
        empSalesRap: employeeLogin.salesRep.label,
        salesRepName: employeeLogin.salesRep.label,
        salesAgentId: +employeeLogin.salesRep.value,
        isAllowPo: employeeLogin.allowPo,

        gclid: gclid,
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
                logout_EmployeeLogin(res?.id);
                setShowLoader(false);
                return deleteCookie(__Cookie.tempCustomerId);
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
      fetchShipping(totalPrice);
    }
  }, [totalPrice]);
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
    }

    const data = await getLocation();
    if (useShippingAddress) {
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
          email: decideEmail(customer?.email || ''),
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
          firstname: ShippingFormik.values.firstname,
          lastName: ShippingFormik.values.lastName,
          email: decideEmail(customer?.email || ''),
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
          email: decideEmail(customer?.email || ''),
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
          email: decideEmail(customer?.email || ''),
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
  };

  useEffect(() => {
    if (billingAddress?.postalCode) {
      update_CheckoutAddress({
        type: 'ZIP_CODE',
        value: billingAddress.postalCode,
      });
    }
  }, [billingAddress, Billingformik.values.postalCode]);

  useEffect(() => {
    if (storeCode === CYXTERA_CODE || storeCode === UNITI_CODE) {
      if (totalPrice === 0) {
        setCurrentPage(checkoutPages.reviewOrder);
      }
    }
  }, [allowedBalance]);
  const { store } = useTypedSelector_v2((state) => state);
  const state = useTypedSelector_v2((state) => state);

  useEffect(() => {
    if (store.storeXPaymetnOptionListViewModels.length !== 0) {
      if (
        store.storeXPaymetnOptionListViewModels[0].paymentOptionName === 'None'
      ) {
        setPaymentMethod(paymentEnum.noPayemnt);
      } else {
        setPaymentMethod(paymentEnum.creditCard);
      }
    } else {
      setPaymentMethod(paymentEnum.noPayemnt);
    }
  }, [store.storeXPaymetnOptionListViewModels]);
  const [showErroMsg, setErrorMsg] = useState<null | string>(null);

  const handleGoToPayment = () => {
    if (storeCode !== SIMPLI_SAFE_CODE && storeCode !== _Store.type5) {
      ShippingFormik.submitForm();
      if (!ShippingFormik.isValid) return;
    }
    if (paymentMethod !== paymentEnum.noPayemnt) {
      setshowCardinfo(true);
    } else {
      addShipping();
      setCurrentPage(checkoutPages.reviewOrder);
    }
  };

  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setShow(!show);
  }, [
    shippingMethod,
    selectedShipping,
    ShippingFormik.values.postalCode,
    ShippingFormik.values.countryName,
  ]);

  const addShipping = async () => {
    const data = await getLocation();
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
        email: decideEmail(customer?.email || ''),
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
    const ShippingADD = await CreateUserAddress(objShipping);
    if (ShippingADD) {
      GetStoreCustomer(+userID).then((res) => {
        if (res === null) return;
        updateCustomer({ customer: res });
      });
    }
  };

  const storeCode = useTypedSelector_v2((state) => state.store.code);

  useEffect(() => {
    console.log(
      'ShippingFormik.values.postalCode',
      ShippingFormik.values.postalCode,
    );
  }, []);

  return (
    <section className='mt-[20px]'>
      <div className='bg-white'>
        <div className='container mx-auto'>
          <div className='flex flex-wrap ml-[-15px] mr-[-15px] -mt-3 checkout-box'>
            {currentPage === checkoutPages.login && (
              <>
                <div className='w-full lg:w-6/12 md:w-6/12 pl-[15px] pr-[15px]'>
                  <div className='p-[15px] bg-light-gray'>
                    <div className='pb-[10px] text-title-text text-center'>
                      {__pagesText.productInfo.loginModal.signIn}
                    </div>
                    <Formik
                      initialValues={{
                        email: '',
                        password: '',
                        keepMeLoggedIn: false,
                      }}
                      onSubmit={loginCustomer}
                      validationSchema={validationSchemaLogin}
                    >
                      {({ values, handleChange, handleSubmit }) => {
                        return (
                          <>
                            <Form
                              onSubmit={handleSubmit}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleSubmit();
                                }
                              }}
                            >
                              <div className='Login-Main'>
                                {showErroMsg && (
                                  <span className='mb-1 text-rose-500'>
                                    {showErroMsg}
                                  </span>
                                )}
                                <Input
                                  label={''}
                                  id='email-address0'
                                  placeHolder={
                                    __pagesText.productInfo.loginModal
                                      .emailPlaceHolder
                                  }
                                  name={'email'}
                                  value={values.email}
                                  onChange={(ev) => {
                                    handleChange(ev);
                                  }}
                                  type={'email'}
                                  required={false}
                                  onBlur={(e) =>
                                    checkCustomEmail(
                                      e.target.value,
                                      storeCode == SIMPLI_SAFE_CODE
                                        ? 'simplisafe'
                                        : 'usaa',
                                    )
                                  }
                                />

                                <Input
                                  label={''}
                                  placeHolder={
                                    __pagesText.productInfo.loginModal
                                      .passwordPlaceHolder
                                  }
                                  id='password'
                                  name={'password'}
                                  value={values.password}
                                  onChange={(ev) => {
                                    handleChange(ev);
                                  }}
                                  type={'password'}
                                  required={false}
                                />

                                <div className='mb-[20px]'>
                                  <button
                                    className={`btn ${
                                      storeCode == _Store.type4
                                        ? 'btn-primary'
                                        : 'btn-md btn-secondary'
                                    }   w-full pk-hg-primary`}
                                    type='submit'
                                    onClick={() => {
                                      handleSubmit();
                                    }}
                                  >
                                    {__pagesText.productInfo.loginModal.shopNow}
                                  </button>
                                </div>

                                <div className='flex justify-between items-center pb-[10px]'>
                                  <div className='mb-[10px] flex items-center gap-1'>
                                    <input
                                      onChange={(ev) => {
                                        handleChange(ev);
                                      }}
                                      type='checkbox'
                                      id='ChkKeepMeLogged'
                                      name='keepMeLoggedIn'
                                    />
                                    <label htmlFor='ChkKeepMeLogged'>
                                      {
                                        __pagesText.productInfo.loginModal
                                          .keepMeLoggedIn
                                      }
                                    </label>
                                  </div>

                                  <div className='mb-[10px] hidden'>
                                    <button className='text-anchor'>
                                      {
                                        __pagesText.productInfo.loginModal
                                          .forgotPassword
                                      }
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Form>
                          </>
                        );
                      }}
                    </Formik>
                    <div className='mt-[10px] text-extra-small-text text-center hidden'>
                      {__pagesText.productInfo.loginModal.clickMessage}{' '}
                      <Link
                        href={`${
                          storeCode == _Store.type3
                            ? paths.PKHGTERMS_OF_USE
                            : paths.TERMS_OF_USE
                        }`}
                      >
                        <a className='text-anchor'>
                          {__pagesText.productInfo.loginModal.termsOfUse}
                        </a>
                      </Link>{' '}
                      {__pagesText.productInfo.loginModal.and}{' '}
                      <a href={paths?.PRIVACY_POLICY} className='text-anchor'>
                        {__pagesText.productInfo.loginModal.privacyPolicy}
                      </a>
                    </div>
                  </div>
                </div>
                <div className='w-full lg:w-6/12 md:w-6/12 pl-[15px] pr-[15px]'>
                  <div className='p-[15px] bg-light-gray'>
                    <div className='pb-[10px] text-title-text text-center'>
                      {__pagesText.productInfo.loginModal.signUp}
                    </div>
                    <div className='mb-[20px]'>
                      <Link href={paths.SIGN_UP}>
                        <a
                          className={`btn ${
                            storeCode == _Store.type4
                              ? 'btn-primary'
                              : 'btn-md btn-secondary'
                          }   w-full pk-hg-primary text-center`}
                        >
                          {__pagesText.productInfo.loginModal.createNewAccount}
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {currentPage !== checkoutPages.login && (
            <div className='flex flex-wrap ml-[-15px] mr-[-15px] -mt-3 checkout-box'>
              {/* Billing Information */}
              <section className='w-full lg:w-8/12 md:w-7/12 pl-[15px] pr-[15px]'>
                <div className='md:flex flex-wrap checkout-box'>
                  <div
                    className={`${
                      storeCode == CYXTERA_CODE || storeCode == UNITI_CODE
                        ? 'md:w-6/12'
                        : 'w-full'
                    } 'bg-light-gray flex-1  mt-[15px] mr-[15px] mb-[30px] ml-[15px] pl-[15px] pr-[15px]'`}
                  >
                    {shippingAddress && !showPayment && (
                      <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                        <div className='flex flex-wrap items-center justify-between pt-[10px] border-b border-[#ececec]'>
                          <div className='pb-[10px] text-title-text'>
                            {__pagesText.CheckoutPage.ShippingAddress}
                          </div>
                          <div className='text-default-text'>
                            <div
                              onClick={() => {
                                setChangeBillingAddress(true);
                                setCurrentPage(checkoutPages.address);
                                setshowPayment(true);
                              }}
                              className='!text-anchor hover:!text-anchor-hover cursor-pointer '
                            >
                              {__pagesText.CheckoutPage.Change}
                            </div>
                          </div>
                        </div>
                        {shippingAddress && (
                          <>
                            <div className='text-default-text mt-[10px]'>
                              {shippingAddress?.firstname}{' '}
                              {shippingAddress?.lastName}
                              <br />
                              {shippingAddress?.companyName}
                              {shippingAddress?.companyName && <br />}
                              {shippingAddress?.address1}
                              <br />
                              {[
                                shippingAddress?.city,
                                shippingAddress?.state,
                                shippingAddress?.postalCode,
                              ].join(', ')}
                              <br />
                              {shippingAddress?.countryName}
                              <br />
                              {shippingAddress?.phone}
                            </div>
                            {selectedShipping?.name && (
                              <div className=''>
                                Shipping Methods:
                                {`${
                                  selectedShipping?.name
                                }($${selectedShipping?.price.toFixed(2)})`}
                              </div>
                            )}
                          </>
                        )}
                        <div className=''>
                          {(storeCode == CYXTERA_CODE ||
                            storeCode == UNITI_CODE) && (
                            <div className='text-default-text mt-[10px] mb-[15px]'>
                              <span>
                                {__pagesText.CheckoutPage.ShippingMethod}
                                {':'}
                                {!_.isEmpty(selectedShipping) && (
                                  <span>{`${
                                    selectedShipping.name
                                  } ($${selectedShipping.price.toFixed(
                                    2,
                                  )})`}</span>
                                )}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {showPayment && (
                      <div className=''>
                        <div className='pt-[10px] border-b border-[#ececec]'>
                          <div className='pb-[10px] text-title-text'>
                            Shipping Address
                          </div>
                        </div>
                        <AddressFormPk
                          addressformik={ShippingFormik}
                          setShippingMethod={setShippingMethod}
                          setSelectedShipping={setSelectedShipping}
                          values={ShippingFormik.values}
                          touched={ShippingFormik.touched}
                          errors={ShippingFormik.errors}
                        />
                      </div>
                    )}

                    {!shippingAddress && !showPayment && (
                      <div className=''>
                        <div className='pt-[10px] border-b border-[#ececec]'>
                          <div className='pb-[10px] text-title-text'>
                            Shipping Address
                          </div>
                        </div>
                        <AddressFormPk
                          addressformik={ShippingFormik}
                          values={ShippingFormik.values}
                          touched={ShippingFormik.touched}
                          errors={ShippingFormik.errors}
                          setShippingMethod={setShippingMethod}
                          setSelectedShipping={setSelectedShipping}
                        />
                      </div>
                    )}
                  </div>

                  {(storeCode == CYXTERA_CODE || storeCode == UNITI_CODE) && (
                    <div className='bg-light-gray flex-1 w-full md:w-6/12 mt-[15px] ml-[15px] mr-[15px] mb-[30px]'>
                      <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                        <div className='flex flex-wrap items-center justify-between pt-[10px] border-b border-[#ececec]'>
                          <div className='pb-[10px] text-title-text'>
                            {__pagesText.CheckoutPage.PaymentMethod}
                          </div>
                          <div className='text-default-text'>
                            <div className='!text-anchor hover:!text-anchor-hover cursor-pointer '>
                              Change
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {currentPage === checkoutPages.reviewOrder ? (
                  <div className='bg-light-gray w-full mb-[30px] m-[15px]'>
                    <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px] w-full'>
                      <div className='flex flex-wrap items-center justify-between'>
                        <div className='pt-[10px] pb-[10px] text-title-text'>
                          {__pagesText.CheckoutPage.OrderReview}
                        </div>
                      </div>
                      <div className='bg-[#fff]'>
                        <CartItem
                          isRemovable={false}
                          isEditable={false}
                          availableFont={[]}
                          availableLocation={[]}
                          availableColor={[]}
                          templateId={4}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {storeCode !== CYXTERA_CODE &&
                      storeCode !== UNITI_CODE &&
                      showShippingMethod && (
                        <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
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
                                          onChange={() =>
                                            setSelectedShipping(el)
                                          }
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
                                            `${el.name}($${el.price.toFixed(
                                              2,
                                            )})`}
                                        </label>
                                      </div>
                                    ),
                                  )}
                              </div>
                              <div className=''>
                                <button
                                  className='btn btn-lg btn-primary'
                                  onClick={() => handleGoToPayment()}
                                >
                                  {__pagesText.CheckoutPage.GoToPayment}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                    {paymentMethod !== paymentEnum.noPayemnt && (
                      <>
                        {!showCardinfo && (
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

                        {showCardinfo && (
                          <div className='PaymentMethodInne bg-light-gray'>
                            <div className='bg-[#d4d4d4] w-full'>
                              <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                                <div className='flex flex-wrap items-center justify-between pt-[10px] mb-[10px] border-b border-[#ececec]'>
                                  <div className='pb-[10px] text-title-text'>
                                    {__pagesText.CheckoutPage.PaymentMethod}
                                  </div>
                                  <div className='pt-[10px] pb-[10px]'>
                                    <div className='w-10'>
                                      <img
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

                            <div
                              id='usecredit'
                              className='mb-[20px] pl-[15px] pr-[15px]'
                            ></div>

                            <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                              <PaymentType
                                changeHandler={paymentFieldUpdateHandler}
                                paymentMethod={paymentMethod}
                                updatePaymentMethod={setPaymentMethod}
                                detectCardType={detectCardType}
                                BillingFormik={Billingformik}
                                changeBillingAddress={changeBillingAddress}
                                setChangeBillingAddress={
                                  setChangeBillingAddress
                                }
                                setUseShippingAddress={setUseShippingAddress}
                                useShippingAddress={useShippingAddress}
                                cardDetails={cardDetails}
                                purchaseOrder={purchaseOrder}
                              />
                              <div className='max-w-[278px]'>
                                <button
                                  className='btn btn-lg !w-full text-center btn-primary mb-[8px]'
                                  id='btn-review-order'
                                  onClick={() => {
                                    ShippingFormik.submitForm();
                                    Billingformik.submitForm();

                                    if (!Billingformik.isValid) return;
                                    if (
                                      !useShippingAddress &&
                                      !ShippingFormik.isValid
                                    )
                                      return;

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
                      </>
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
          )}
        </div>
      </div>
    </section>
  );
};

export default ChekoutType7;
