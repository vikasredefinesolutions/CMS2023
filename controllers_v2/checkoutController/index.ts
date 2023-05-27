import {
  checkoutPages,
  paymentMethodCustom as paymentEnum,
  PaymentMethod,
  UserAddressType,
} from '@constants/enum';
import {
  __Cookie,
  __Cookie_Expiry,
  __LocalStorage,
  __UserMessages,
  CG_STORE_CODE,
} from '@constants/global.constant';
import { paths } from '@constants/paths.constant';

import { addAddress, AddOrderDefault } from '@constants/payloads/checkout';
import { signup_payload } from '@constants/payloads/signup';
import { commonMessage } from '@constants/successError.text';
import { CreditCardDetailsType } from '@definations/checkout';
import {
  deleteCookie,
  extractCookies,
  GoogleAnalyticsTrackerForAllStore,
  GoogleAnalyticsTrackerForCG,
  KlaviyoScriptTag,
  setCookie,
} from '@helpers/common.helper';
import getLocation from '@helpers/getLocation';
import {
  GetCartTotals,
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';
import {
  checkCustomerAlreadyExist,
  placeOrder as placeOrderService,
} from '@services/checkout.service';
import { CreateNewAccount, GetStoreCustomer } from '@services/user.service';

import {
  CreateUserAddress,
  GetShippingmethod,
  UpdateUserAddress,
} from '@services/address.service';
import { updateCartByNewUserId } from '@services/cart.service';
import { signInUser } from '@services/user.service';
import { getWishlist } from '@services/wishlist.service';
import _ from 'lodash';
import { ChangeEvent, useEffect, useState } from 'react';

import { __pagesConstant } from '@constants/pages.constant';
import { PaymentOptions } from '@definations/APIs/cart.req';
import { _ProductDetails } from '@definations/APIs/productDetail.res';
import { CustomerAddress } from '@definations/APIs/user.res';
import { _CartItem } from '@services/cart';
import { Klaviyo_PlaceOrder } from '@services/klaviyo.service';
import {
  getCustomerAllowBalance,
  getPaymentOption,
} from '@services/payment.service';
import { FetchProductById } from '@services/product.service';
import { _ProductPolicy } from '@templates/ProductDetails/productDetailsTypes/productDetail.res';
import { useRouter } from 'next/router';
import CheckoutAddressForm, {
  AddressFormRefType,
  AddressType,
} from './CheckoutAddressForm';

export interface _shippingMethod {
  name: string;
  price: number;
}
[];

const CheckoutController = () => {
  const [endUserNameS, setEndUserName] = useState<string>('');
  const [endUserDisplay, setEndUserDisplay] = useState<boolean>(false);
  const [productPolicy, setproductPolicy] = useState<_ProductPolicy[]>();

  const [currentPage, setCurrentPage] = useState(checkoutPages.login);
  const [allowGuest, setAllowGuest] = useState(true);
  const [customerEmail, setCustomerEmail] = useState('');
  const [createAccountPassword, setCreateAccountPassword] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showAddAddress, setShowAddAddress] = useState(true);
  const [useShippingAddress, setShippingAddress] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(paymentEnum.creditCard);
  const [cardDetails, setCardDetails] = useState<CreditCardDetailsType>({
    cardNumber: '',
    cardVarificationCode: '',
    cardExpirationMonth: '',
    cardExpirationYear: '',
  });
  const [allowedBalance, setAllowedBalance] = useState(0);
  const [purchaseOrder, setPurchaseOrder] = useState('');
  const [shippingAdress, setShippingAdress] = useState<AddressType | null>({
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
  });

  const [paymentOptions, setPaymentOption] = useState<PaymentOptions | null>(
    null,
  );
  const [orderNote, setorderNotes] = useState<string>('');
  const [billingAdress, setBillingAdress] = useState<AddressType | null>(null);
  const [billAddress, setBillAddress] = useState<AddressType | null>(null);
  const [addressType, setAddressType] = useState<
    null | UserAddressType.SHIPPINGADDRESS | UserAddressType.BILLINGADDRESS
  >(null);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [addressEditData, setAddressEditData] =
    useState<CustomerAddress | null>(null);
  const router = useRouter();

  const [shippingMethod, setShippingMethod] = useState<_shippingMethod[] | []>([
    {
      name: '',
      price: 0,
    },
  ]);
  const [selectedShipping, setSelectedShipping] = useState<
    _shippingMethod | { name: ''; price: 0 }
  >({ name: '', price: 0 });
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const {
    showModal,
    fetchCartDetails,
    setShowLoader,
    logoutClearCart,
    logInUser,
    updateCustomer,
    updateWishListData,
    getStoreCustomer,
    update_checkoutEmployeeLogin,
    customerCreditBalanceUpdate,
    updateEmployeeV2,
    product_employeeLogin,
  } = useActions_v2();
  const user = useTypedSelector_v2((state) => state.user);
  const cartData = useTypedSelector_v2((state) => state.cart.cart);
  const { discount: cartDiscountDetails } = useTypedSelector_v2(
    (state) => state.cart,
  );

  const cartCharges = useTypedSelector_v2((state) => state.store.cartCharges);
  const { loggedIn: isEmployeeLoggedIn, isLoadingComplete } =
    useTypedSelector_v2((state) => state.employee);
  const useBalance = useTypedSelector_v2(
    (state) => state.cart.userCreditBalance.useBalance,
  );
  const customer = user.customer;
  const userId = GetCustomerId();
  const customerId = GetCustomerId();
  const couponCode = useTypedSelector_v2(
    (state) => state.cart.discount?.coupon,
  );
  const { el: employeeLogin } = useTypedSelector_v2((state) => state.checkout);
  const {
    totalPrice,
    subTotal,
    salesTax,
    discount,
    creditBalance,
    totalLineCharges,
    totalLogoCharges,
  } = GetCartTotals();

  const billingForm = CheckoutAddressForm({});
  const shippingForm = CheckoutAddressForm({});
  const isLoggedIn = Boolean(user.id);
  const [isguestLogin, setIsguestLogin] = useState<boolean>(false);
  useEffect(() => {
    if (isLoggedIn) {
      setCurrentPage(checkoutPages.address);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!cartData && isLoadingComplete) {
      fetchCartDetails({
        customerId,
        isEmployeeLoggedIn,
      });
      setShowLoader(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartData, isLoadingComplete]);
  useEffect(() => {
    if (useShippingAddress && customer) {
      setBillingAdress(shippingAdress);
    } else {
      if (customer?.customerAddress) {
        for (
          let index = 0;
          index < customer?.customerAddress?.length;
          index++
        ) {
          if (
            customer?.customerAddress[index].isDefault == true &&
            customer?.customerAddress[index].addressType ==
              UserAddressType.BILLINGADDRESS
          ) {
            setBillingAdress(customer?.customerAddress[index]);
            break;
          } else if (
            customer?.customerAddress[index].addressType ==
            UserAddressType.BILLINGADDRESS
          ) {
            setBillingAdress(customer?.customerAddress[index]);
          }
        }
      }
    }
  }, [shippingAdress, useShippingAddress]);

  useEffect(() => {
    if (storeId) {
      getPaymentOption({ storeId }).then((payment) =>
        setPaymentOption(payment),
      );
    }
  }, [storeId]);

  useEffect(() => {
    if (isLoggedIn && user.customer) {
      if (user.customer.customerAddress.length > 0) {
        if (customer && customer.customerAddress) {
          if (!shippingAdress) {
            setShowAddAddress(true);
          } else {
            setShowAddAddress(false);
          }
          customer.customerAddress.map((res) => {
            if (
              res.addressType == UserAddressType.SHIPPINGADDRESS &&
              res.isDefault
            ) {
              setShippingAdress(res as AddressType);
            } else if (
              res.addressType == UserAddressType.BILLINGADDRESS &&
              res.isDefault
            ) {
              setBillingAdress(res as AddressType);
              billAddress && setBillingAdress(billAddress);
            }
          });
          (!shippingAdress || !billingAdress) &&
            customer.customerAddress.map((res) => {
              if (res.addressType == UserAddressType.SHIPPINGADDRESS) {
                setShippingAdress(res as AddressType);
              } else if (res.addressType == UserAddressType.BILLINGADDRESS) {
                setBillingAdress(res as AddressType);
                billAddress && setBillingAdress(billAddress);
              }
            });
        }
      }
    }
  }, [user]);

  useEffect(() => {
    let c_id: string | null | number;

    if (customer?.id) {
      c_id = customer?.id;
      getCustomerAllowBalance(+customer?.id).then((res) => {
        if (res && typeof res === 'number') {
          setAllowedBalance(res);
        }
      });
    }
  }, [customer]);

  const blockInvalidChar = (e: any) =>
    ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault();

  const checkEmail = async (values: { email: string }) => {
    const response = await checkCustomerAlreadyExist(values.email, storeId);
    if (response) {
      setCustomerEmail(values.email);
      if (response.isCustomerExist) {
        setCurrentPage(checkoutPages.password);
      } else if (!response.isCustomerExist) {
        setCurrentPage(checkoutPages.createAccount);
      }
      if (response.isGuestCustomer) {
        setAllowGuest(false);
      }
    }
  };

  const getPolicyDetails = (cartProducts: _CartItem[]) => {
    let flag = false;
    let policydetailsArray: _ProductPolicy[] = [];
    cartProducts?.map((product) => {
      if (storeId) {
        FetchProductById({
          seName: product.seName,
          storeId: storeId,
          productId: 0,
        }).then((resp) => {
          if (resp) {
            const res = resp as _ProductDetails;
            const PolicyDetails: _ProductPolicy = {
              storeId: res.storeId,
              brandID: res.brandID,
              brandName: res.brandName,
              isBrandOnline: res.isBrandOnline,
              isPolicywithcheckbox: res.isPolicywithcheckbox,
              policyMessage: res.policyMessage,
              isEnduserDisplay: res.isEnduserDisplay,
            };
            policydetailsArray.push(PolicyDetails);
            const policybrandarray = policydetailsArray.map((item) =>
              JSON.stringify(item),
            );
            const uniquePolicyProduct = new Set(policybrandarray);
            const PolicyProduct = Array.from(uniquePolicyProduct).map((item) =>
              JSON.parse(item),
            );
            if (res.isEnduserDisplay) {
              setEndUserDisplay(true);
            }
            setproductPolicy([...PolicyProduct]);
          }
        });
      }
    });
  };
  const checkHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const useBalance = e.target.checked;
    customerCreditBalanceUpdate({
      useBalance,
      allowedBalance,
    });
  };

  const continueAsGuest = () => {
    setIsguestLogin(true);
    setCurrentPage(checkoutPages.address);
  };

  const createAccountHandler = (arg: {
    password: string;
    confirmPassword: string;
  }) => {
    setCreateAccountPassword(arg);
    setCurrentPage(checkoutPages.address);
  };

  const loginCustomer = async ({ password }: { password: string }) => {
    const loginResponse = await signInUser({
      userName: customerEmail,
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
            updateCartByNewUserId(~~tempCustomerId, res.id);
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

  const logout_EmployeeLogin = () => {
    updateEmployeeV2('CLEAN_UP');
    product_employeeLogin('MinQtyToOne_CleanUp');
    logoutClearCart();
    logInUser('CLEAN_UP');

    setCookie(__Cookie.userId, '', 'EPOCH');
    deleteCookie(__Cookie.tempCustomerId);
    localStorage.removeItem(__LocalStorage.empData);
  };

  const checkPayment = () => {
    if (employeeLogin.isPaymentPending) {
      // don't check payment details if employee is logged IN and selected payment pending .
      return true;
    }

    let { totalPrice } = { totalPrice: 200 };
    if (totalPrice > 0) {
      if (paymentEnum.creditCard === paymentMethod) {
        setPurchaseOrder('');
        if (
          (cardDetails &&
            Object.values(cardDetails).some((x) => x === null || x === '')) ||
          cardDetails.cardNumber.length !== 16
        ) {
          if (cardDetails.cardNumber.length < 16) {
            showModal({
              message: 'Please enter valid card number',
              title: 'Warning',
            });
            return;
          }
          showModal({ message: 'Invalid Card Details', title: 'Warning' });
          return;
        }
      } else if (paymentEnum.purchaseOrder === paymentMethod) {
        setCardDetails({
          cardNumber: '',
          cardVarificationCode: '',
          cardExpirationMonth: '',
          cardExpirationYear: '',
        });

        if (purchaseOrder.length <= 0) {
          showModal({
            message: 'Invalid Purchase Order Details',
            title: 'Warning',
          });
          return;
        } else if (purchaseOrder.length > 0) {
          return true;
        }
      } else {
        showModal({
          message: 'Please select a valid payment method',
          title: 'Warning',
        });
        return false;
      }
    }
    return true;
  };

  const checkForms = async (form: AddressFormRefType) => {
    const errors = await form.validateForm();
    form.submitForm();
    if (!_.isEmpty(errors)) {
      return false;
    }
    return true;
  };

  // GTM event for "add_shipping_info" and "add_payment_info’"
  const addShippingPaymentInfoEventHandle = (eventName: string) => {
    const eventPayload = {
      storeId: storeId,
      customerId: customerId,
      ...(eventName === 'GoogleAddShippingInfoScript'
        ? { shippingTier: 'Free Shipping' }
        : { paymentType: paymentMethod }),
      ...(storeId !== CG_STORE_CODE
        ? { value: '', coupon: couponCode || '' }
        : {}),
      shoppingCartItemsModel: cartData?.map((item) => ({
        productId: item.productId,
        productName: item?.productName,
        colorVariants: item?.attributeOptionValue,
        price: item.totalPrice,
        quantity: item.totalQty,
      })),
    };
    GoogleAnalyticsTrackerForCG(eventName, storeId, eventPayload);
    GoogleAnalyticsTrackerForAllStore(eventName, storeId, eventPayload);
  };

  const reviewOrder = async () => {
    if (!employeeLogin.isPaymentPending) {
      const givenDate = `${cardDetails.cardExpirationYear}${cardDetails.cardExpirationMonth}`;
      const currentYear = new Date().getFullYear().toString();
      const currentMonth = new Date().getMonth() + 1;
      const currentDate = currentYear + currentMonth.toString();
      // console.log('card ---------', cardDetails, +givenDate, +currentDate);
      if (paymentEnum.creditCard === paymentMethod) {
        if (+currentDate > +givenDate) {
          showModal({
            message: 'Invalid Expiration Date',
            title: 'Warning',
          });
          return;
        }
      }
    }
    if (showAddAddress) {
      let isValid = true;
      if (shippingForm) {
        isValid = await checkForms(shippingForm);
      }
      if (!useShippingAddress && !billingAdress && billingForm) {
        isValid = await checkForms(billingForm);
      }

      if (isValid) {
        if (checkPayment()) {
          const data = await getLocation();
          {
            const data = await getLocation();
            const obj = {
              storeCustomerAddressModel: {
                id: 0,
                rowVersion: '',
                location: `${data.city}, ${data.region}, ${data.country}, ${data.postal_code}`,
                ipAddress: data.ip_address,
                macAddress: '00-00-00-00-00-00',
                customerId: +userId || +customerId || 0,
                firstname: shippingForm.values.firstname,
                lastName: shippingForm.values.lastName,
                email: customer?.email || customerEmail,
                address1: shippingForm.values.address1,
                address2: shippingForm.values.address2 || ' ',
                suite: ' ',
                city: shippingForm.values.city,
                state: shippingForm.values.state,
                postalCode: shippingForm.values.postalCode,
                phone: shippingForm.values.phone,
                fax: shippingForm.values.fax ? shippingForm.values.fax : '',
                countryName: shippingForm.values.countryName,
                countryCode: shippingForm.values.countryCode || '',
                addressType: UserAddressType.SHIPPINGADDRESS,
                isDefault: shippingForm.values.isDefault,
                recStatus: 'A',
                companyName: shippingForm.values.companyName || ' ',
              },
            };

            obj.storeCustomerAddressModel.email &&
              (await CreateUserAddress(obj)
                .then(() => {
                  GetStoreCustomer(+userId).then((res) => {
                    if (res === null) return;
                    updateCustomer({ customer: res });
                  });
                })
                .catch((error) => console.log(error)));
          }

          setShippingAdress(shippingForm.values);
          if (!useShippingAddress) {
            !billingAdress && setBillingAdress(billingForm.values);
          } else {
            setBillAddress(shippingForm.values);
            setBillingAdress(shippingForm.values);
          }
          addShippingPaymentInfoEventHandle('GoogleAddShippingInfoScript');
          addShippingPaymentInfoEventHandle('GoogleAddPaymentInfoScript');

          setCurrentPage(checkoutPages.reviewOrder);
        }
      }
    } else {
      if (shippingAdress && billingAdress && checkPayment()) {
        if (useShippingAddress) {
          setBillAddress(shippingAdress);

          setBillingAdress(shippingAdress);
        }
        addShippingPaymentInfoEventHandle('GoogleAddShippingInfoScript');
        addShippingPaymentInfoEventHandle('GoogleAddPaymentInfoScript');
        setCurrentPage(checkoutPages.reviewOrder);
      }
    }
  };
  const { shippingChargeType } = useTypedSelector_v2((state) => state.store);

  const fetchShipping = async (totalPrice: number) => {
    try {
      if (storeId && shippingChargeType) {
        const data = await GetShippingmethod({
          shippingMethodModel: {
            city: shippingAdress?.city,
            state: shippingAdress?.state,
            country: shippingAdress?.countryName,
            zipCode: shippingAdress?.postalCode,
            customerID: userId,
            storeId: storeId,
            ordertotalwithoutshipppingcharge: totalPrice,
            shippingType: shippingChargeType,
          },
        });
        if (data) {
          setShippingMethod(data);
          setSelectedShipping(data[0]);

          if (data && data.length > 0 && data[0]?.price) {
            update_checkoutEmployeeLogin({
              type: 'SHIPPING_PRICE',
              value: data[0].price,
            });
          }
        }
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const getNewShippingCost = (shippingCost: number): number => {
    if (isEmployeeLoggedIn) {
      return employeeLogin.shippingPrice;
    }

    return shippingCost;
  };

  const placeOrder = async (selectedShippingMOodel: _shippingMethod) => {
    // const shippingData = await fetchShipping(price);
    let userNewId = 0;
    setShowLoader(true);
    if (createAccountPassword.password && billingAdress && shippingAdress) {
      const location = await getLocation();

      const addAccount = {
        storeCustomerModel: {
          ...signup_payload,
          firstname: billingAdress.firstname,
          lastName: billingAdress.lastName,
          email: customerEmail,
          password: createAccountPassword.password,
          confirmPassword: createAccountPassword.confirmPassword,
          companyName: billingAdress.companyName,
          location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
          ipAddress: location.ip_address,
          storeId: storeId,
          memberFrom: 0,
          memberTo: 0,
          organizationId: 0,
          primaryColor: '',
          mascotId: '',
          teamGender: '',
          timeOfYearPurchase: '',
          position: '',
          navCustomerId: '',
          organizationName: '',

          storeCustomerAddress: [
            {
              ...addAddress,
              ...shippingAdress,
              email: customerEmail,
              addressType: UserAddressType.SHIPPINGADDRESS,
            },
            {
              ...addAddress,
              ...billingAdress,
              email: customerEmail,
              addressType: UserAddressType.BILLINGADDRESS,
            },
          ],
        },
      };
      const userDetail = await CreateNewAccount(addAccount);
      if (userDetail == null) {
        showModal({
          message: userDetail || __UserMessages.signUpPage.SomethingWentWrong,
          title: 'Error',
        });
        return;
      } else {
        userNewId = userDetail.item1.id;
        await updateCartByNewUserId(~~customerId, userNewId);
      }
    }
    if (billingAdress && shippingAdress) {
      const orderModel = {
        ...AddOrderDefault,
        ...addPaymentDetails(),
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
        customerID: userNewId != 0 ? +userNewId : +customerId,
        firstName: customer?.firstname || billingAdress.firstname,
        lastName: customer?.lastName || billingAdress.lastName,
        email: customer?.email || customerEmail,
        billingEqualsShipping: useShippingAddress,
        billingEmail: billingAdress.email || customerEmail,
        billingFirstName: billingAdress.firstname,
        billingLastName: billingAdress.lastName,
        billingCompany: billingAdress.companyName,
        billingAddress1: billingAdress.address1,
        billingAddress2: billingAdress.address2,
        billingSuite: billingAdress.suite,
        billingCity: billingAdress.city,
        billingState: billingAdress.state,
        billingZip: billingAdress.postalCode,
        billingCountry: billingAdress.countryName,
        billingPhone: billingAdress.phone,
        shippingEmail: customer?.email || customerEmail,
        shippingFirstName: shippingAdress.firstname,
        shippingLastName: shippingAdress.lastName,
        shippingCompany: shippingAdress.companyName,
        shippingAddress1: shippingAdress.address1,
        shippingAddress2: shippingAdress.address2,
        shippingSuite: shippingAdress.suite,
        shippingCity: shippingAdress.city,
        shippingState: shippingAdress.state,
        shippingZip: shippingAdress.postalCode,
        shippingCountry: shippingAdress.countryName,
        shippingPhone: shippingAdress.phone,
        orderSubtotal: subTotal,
        orderTax: salesTax,
        orderTotal:
          totalPrice + getNewShippingCost(selectedShippingMOodel.price),
        orderNotes: orderNote,
        couponCode: couponCode || '',
        couponDiscountAmount: discount,
        orderStatus: __pagesConstant.checkoutPage.orderStatus,
        transactionStatus: __pagesConstant.checkoutPage.transactionStatus,
        shippingMethod: selectedShippingMOodel.name,
        endUserName: endUserNameS,
        logoFinalTotal: totalLogoCharges,
        lineFinalTotal: totalLineCharges,
        orderShippingCosts: getNewShippingCost(selectedShippingMOodel.price),
        orderSmallRunFee: cartCharges?.smallRunFeesCharges
          ? cartCharges.smallRunFeesCharges
          : 0,
        orderLogoSetupFee: cartCharges?.logoSetupCharges
          ? cartCharges.logoSetupCharges
          : 0,

        // EMPLOYEE LOGIN SPECIFIC
        empSourceName: employeeLogin.source.value,
        empSourceMedium: employeeLogin.sourceMedium.value,
        empSalesRap: employeeLogin.salesRep.label,
        salesRepName: employeeLogin.salesRep.label,
        salesAgentId: +employeeLogin.salesRep.value,
        isExport: employeeLogin.allowPo, // ALLOW PO Value
      };

      try {
        logoutClearCart();
        deleteCookie(__Cookie.tempCustomerId);

        const res = await placeOrderService({
          orderModel,
        });
        if (res) {
          await Klaviyo_PlaceOrder({
            orderNumber: res.id,
          });

          if (isEmployeeLoggedIn) {
            logout_EmployeeLogin();
          }

          router.push(`${paths.THANK_YOU}?orderNumber=${res.id}`);
          // window.location.assign(`${paths.THANK_YOU}?orderNumber=${res.id}`);
        }
      } catch (error) {
        setShowLoader(false);
        showModal({
          title: commonMessage.failed,
          message: commonMessage.somethingWentWrong,
        });
      }
    }
    createAccountPassword;
  };

  const paymentFieldUpdateHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    // if (name == 'cardExpirationMonth' && Number(value) < date) {
    //   setCardDetails((prev) => ({ ...prev, [name]: '' }));
    // } else {
    switch (paymentMethod) {
      case paymentEnum.creditCard:
        setCardDetails((prev) => ({ ...prev, [name]: value }));
        break;
      case paymentEnum.purchaseOrder:
        setPurchaseOrder(value);
    }

    // }
  };

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

  const changeAddresHandler = (address: AddressType) => {
    addressType === UserAddressType.SHIPPINGADDRESS
      ? setShippingAdress(address)
      : setBillingAdress(address);
    setAddressType(null);
  };

  const AddUpdateAddressSubmitHandler = async (values: AddressType) => {
    const data = await getLocation();
    const obj = {
      storeCustomerAddressModel: {
        id: addressEditData?.id || 0,
        rowVersion: addressEditData?.rowVersion || '',
        location: `${data.city}, ${data.region}, ${data.country}, ${data.postal_code}`,
        ipAddress: data.ip_address,
        macAddress: '00-00-00-00-00-00',
        customerId: +customerId || 0,
        firstname: values.firstname,
        lastName: values.lastName,
        email: customer?.email || customerEmail,
        address1: values.address1,
        address2: values.address2 || ' ',
        suite: values.suite || ' ',
        city: values.city,
        state: values.state,
        postalCode: values.postalCode,
        phone: values.phone,
        fax: values.fax,
        countryName: values.countryName,
        countryCode: values.countryCode || '',
        addressType: addressType || '',
        isDefault: values.isDefault,
        recStatus: 'A',
        companyName: values.companyName || ' ',
        organizationName: '',
      },
    };
    if (addressEditData) {
      await UpdateUserAddress(obj).then(() => setAddressEditData(null));
    } else {
      await CreateUserAddress(obj);
    }
    await getStoreCustomer(user.id || 0);
    setShowAddAddressModal(false);
  };

  return {
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
    updatePaymentMethod: setPaymentMethod,
    detectCardType,
    shippingAdress,
    billingAdress,
    addressType,
    addressArray: customer?.customerAddress || [],
    changeAddresHandler,
    setAddressType,
    showAddAddressModal,
    setShowAddAddressModal,
    AddUpdateAddressSubmitHandler,
    addressEditData,
    setAddressEditData,
    setShippingMethod,
    shippingMethod,
    paymentOptions,
    allowedBalance,
    checkHandler,
    setEndUserName,
    endUserDisplay,
    productPolicy,
    endUserNameS,
    cardDetails,
    purchaseOrder,
    orderNote,
    setorderNotes,
    setCurrentPage,
    setShowAddAddress,
    setShippingAdress,
    setBillingAdress,
    blockInvalidChar,
    fetchShipping,
    selectedShipping,
    setSelectedShipping,
  };
};

export default CheckoutController;
