import AddAddressModal from '@appComponents/modals/addAddressModal';
import ChangeAddressModal from '@appComponents/modals/ChangeAddressModal';
import NxtImage from '@appComponents/reUsable/Image';
import { cardType } from '@constants/common.constant';
import {
  checkoutPages,
  paymentMethodCustom as paymentEnum,
  PaymentMethod,
  UserAddressType,
} from '@constants/enum';
import {
  __Cookie,
  __LocalStorage,
  CG_STORE_CODE,
} from '@constants/global.constant';
import { __pagesConstant } from '@constants/pages.constant';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { AddOrderDefault } from '@constants/payloads/checkout';
import CheckoutController, {
  _shippingMethod,
} from '@controllers/checkoutController';
import CheckoutAddressForm, {
  AddressFormRefType,
  AddressType,
} from '@controllers/checkoutController/CheckoutAddressForm';
import { CustomerAddress } from '@definations/APIs/user.res';
import { CreditCardDetailsType } from '@definations/checkout';
import {
  deleteCookie,
  GoogleAnalyticsTrackerForAllStore,
  GoogleAnalyticsTrackerForCG,
  remove_EnduserName,
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
  CreateUserAddress,
  GetShippingmethod,
  UpdateUserAddress,
} from '@services/address.service';
import { placeOrder as placeOrderService } from '@services/checkout.service';
import { Klaviyo_PlaceOrder } from '@services/klaviyo.service';
import { GetStoreCustomer } from '@services/user.service';
import CartItem from '@templates/cartItem';
import CartSummarryType5 from '@templates/cartSummarry/cartSummaryType5';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import AddAddress from './components/AddAddressType1';
import CheckoutAddress from './components/AddressType1';
import CT1_EL_Dropdowns from './components/CO1_EL_Dropdowns';
import PaymentType1 from './components/PaymentType1';
import PurchaseOrderType1 from './components/PaymentType1/components/PurchaseOrderType1';

interface _Props {
  templateId: number;
}

const ChekoutType5: React.FC<_Props> = ({ templateId }) => {
  const router = useRouter();
  const { currentPage, setCurrentPage } = CheckoutController();
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [addressEditData, setAddressEditData] =
    useState<CustomerAddress | null>(null);
  const [addressType, setAddressType] = useState<
    null | UserAddressType.SHIPPINGADDRESS | UserAddressType.BILLINGADDRESS
  >(null);
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
  const [endUserNameS, setEndUserName] = useState<string>('');
  const [useShippingAddress, setShippingAddress] = useState(true);
  const [orderNote, setorderNotes] = useState<string>('');
  const [purchaseOrder, setPurchaseOrder] = useState('');
  const [cardDetails, setCardDetails] = useState<CreditCardDetailsType>({
    cardNumber: '',
    cardVarificationCode: '',
    cardExpirationMonth: '',
    cardExpirationYear: '',
  });
  const [selectedShipping, setSelectedShipping] = useState<
    _shippingMethod | { name: ''; price: 0 }
  >({ name: '', price: 0 });
  const [shippingMethod, setShippingMethod] = useState<_shippingMethod[] | []>([
    {
      name: '',
      price: 0,
    },
  ]);
  const [showAddAddress, setShowAddAddress] = useState(true);
  const [shippingAdress, setShippingAdress] = useState<AddressType | null>(
    null,
  );
  const [billingAdress, setBillingAdress] = useState<AddressType | null>(null);
  const [billAddress, setBillAddress] = useState<AddressType | null>(null);
  const userId = useTypedSelector_v2((state) => state.user.id);
  const isLoggedIn = Boolean(userId);

  const storeId = useTypedSelector_v2((state) => state.store.id);
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => !!state.employee.empId,
  );
  const cartCharges = useTypedSelector_v2((state) => state.store.cartCharges);
  const { el: employeeLogin } = useTypedSelector_v2((state) => state.checkout);
  const billingForm = CheckoutAddressForm({});
  const shippingForm = CheckoutAddressForm({});
  const [paymentMethod, setPaymentMethod] = useState(paymentEnum.creditCard);
  const customer = useTypedSelector_v2((state) => state.user.customer);
  const addressArray = customer?.customerAddress || [];
  const { shippingChargeType } = useTypedSelector_v2((state) => state.store);
  const customerId = GetCustomerId();
  const couponCode = useTypedSelector_v2(
    (state) => state.cart.discount?.coupon,
  );
  const cartData = useTypedSelector_v2((state) => state.cart.cart);
  const useBalance = useTypedSelector_v2(
    (state) => state.cart.userCreditBalance.useBalance,
  );
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

  const {
    totalPrice,
    subTotal,
    salesTax,
    discount,
    creditBalance,
    totalLineCharges,
    totalLogoCharges,
  } = GetCartTotals();

  const handlePurchase = (purchaseNumber: string) => {
    setPurchaseOrder(purchaseNumber);
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
        email: customer?.email || '',
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
    await getStoreCustomer(userId || 0);
    setShowAddAddressModal(false);
  };

  const checkForms = async (form: AddressFormRefType) => {
    const errors = await form.validateForm();
    form.submitForm();
    if (!_.isEmpty(errors)) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (!shippingAdress) {
      setShowAddAddress(true);
    } else {
      setShowAddAddress(false);
    }
  }, [shippingAdress]);

  useEffect(() => {
    if (totalPrice) {
      if (shippingAdress?.countryName) {
        fetchShipping(totalPrice);
      } else {
        fetchShipping(totalPrice, null);
      }
    }
  }, [totalPrice, shippingAdress]);
  useEffect(() => {
    if (isLoggedIn && customer) {
      if (customer.customerAddress.length > 0) {
        if (customer && customer.customerAddress) {
          if (!shippingAdress) {
            setShowAddAddress(true);
          } else {
            setShowAddAddress(false);
          }

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
              setShippingAdress(customer.customerAddress[index] as AddressType);
              useShippingAddress &&
                setBillingAdress(customer.customerAddress[index]);
              break;
            } else if (
              customer.customerAddress[index].addressType ==
              UserAddressType.SHIPPINGADDRESS
            ) {
              setShippingAdress(customer.customerAddress[index] as AddressType);
              useShippingAddress &&
                setBillingAdress(customer.customerAddress[index]);
            }
          }
          if (!useShippingAddress) {
            for (
              let index = 0;
              index < customer.customerAddress.length;
              index++
            ) {
              if (
                customer.customerAddress[index].addressType ==
                  UserAddressType.BILLINGADDRESS &&
                customer.customerAddress[index].isDefault
              ) {
                setBillingAdress(
                  customer.customerAddress[index] as AddressType,
                );
                // billAddress && setBillingAdress(billAddress);
                break;
              } else {
                setBillingAdress(
                  customer.customerAddress[index] as AddressType,
                );
                // billAddress && setBillingAdress(billAddress);
              }
            }
          }
        }
      }
    }
  }, [userId]);
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

  const checkPayment = () => {
    if (employeeLogin.isPaymentPending) {
      // don't check payment details if employee is logged IN and selected payment pending .
      return true;
    }

    let { totalPrice } = { totalPrice: 200 };
    if (totalPrice > 0) {
      if (paymentEnum.creditCard === paymentMethod) {
        if (
          (cardDetails &&
            Object.values(cardDetails).some((x) => x === null || x === '')) ||
          cardDetails.cardNumber.length !== 16
        ) {
          if (cardDetails.cardNumber.length < 16) {
            showModal({
              message: 'Please enter valid card number',
              title: 'Error',
            });
            return;
          }
          showModal({
            message:
              'Error in Credit Card information. Please verify and try again.',
            title: 'Error',
          });
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
      } else if (paymentEnum.netNumber == paymentMethod) {
        return true;
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

  const fetchShipping = async (
    totalPrice: number,
    shippingCountry?: string | null,
  ) => {
    try {
      if (storeId && shippingChargeType) {
        const data = await GetShippingmethod({
          shippingMethodModel: {
            city: shippingAdress?.city || '',
            state: shippingAdress?.state || '',
            country:
              shippingCountry === null ? ' ' : shippingAdress?.countryName,
            zipCode: shippingAdress?.postalCode || '',
            customerID: userId || 0,
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
      if (paymentEnum.netNumber == paymentMethod) {
        setCardDetails({
          cardNumber: '',
          cardVarificationCode: '',
          cardExpirationMonth: '',
          cardExpirationYear: '',
        });
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
          const obj = {
            storeCustomerAddressModel: {
              id: 0,
              rowVersion: '',
              location: `${data.city}, ${data.region}, ${data.country}, ${data.postal_code}`,
              ipAddress: data.ip_address,
              macAddress: '00-00-00-00-00-00',
              customerId: +customerId,
              firstname: shippingForm.values.firstname,
              lastName: shippingForm.values.lastName,
              email: customer?.email || '',
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
                GetStoreCustomer(+customerId).then((res) => {
                  if (res === null) return;
                  updateCustomer({ customer: res });
                });
              })
              .catch((error) => console.log(error)));

          setShippingAdress(shippingForm.values);
          await fetchShipping(totalPrice);
          if (!useShippingAddress) {
            !billingAdress && setBillingAdress(billingForm.values);
          } else {
            // setBillAddress(shippingForm.values);
            setBillingAdress(shippingForm.values);
          }

          addShippingPaymentInfoEventHandle('GoogleAddShippingInfoScript');
          addShippingPaymentInfoEventHandle('GoogleAddPaymentInfoScript');

          setCurrentPage(checkoutPages.reviewOrder);
        }
      } else {
        setCurrentPage(checkoutPages.reviewOrder);
      }
    } else {
      if (shippingAdress && billingAdress && checkPayment()) {
        if (useShippingAddress) {
          // setBillAddress(shippingAdress);

          setBillingAdress(shippingAdress);
        }

        addShippingPaymentInfoEventHandle('GoogleAddShippingInfoScript');
        addShippingPaymentInfoEventHandle('GoogleAddPaymentInfoScript');
        setCurrentPage(checkoutPages.reviewOrder);
      }
    }
  };

  const addPaymentDetails = () => {
    if (employeeLogin.isPaymentPending) {
      return {
        paymentMethod: 'PAYMENTPENDING',
      };
    }

    const purchaseOrderObj = {
      AuthorizationPNREF: purchaseOrder,
      isCreditLimit: false,
    };

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
      // console.log('purchase order', purchaseOrder);

      return { ...card, AuthorizationPNREF: purchaseOrder };
    }

    if (paymentMethod === paymentEnum.netNumber) {
      return {
        ...purchaseOrderObj,
        paymentMethod: 'netpayment',
        paymentGateway: PaymentMethod.PREPAYMENT,
      };
    }

    return {};
  };

  const getNewShippingCost = (shippingCost: number | undefined = 0): number => {
    if (isEmployeeLoggedIn) {
      return employeeLogin.shippingPrice;
    }

    return shippingCost;
  };

  const logout_EmployeeLogin = (id: string) => {
    updateEmployeeV2('CLEAN_UP');
    product_employeeLogin('MinQtyToOne_CleanUp');
    logoutClearCart();
    logInUser('CLEAN_UP');
    router.push(`/${paths.THANK_YOU}?orderNumber=${id}`);

    setCookie(__Cookie.userId, '', 'EPOCH');
    deleteCookie(__Cookie.tempCustomerId);
    localStorage.removeItem(__LocalStorage.empData);
  };

  const placeOrder = async (selectedShippingMOodel: _shippingMethod) => {
    // const shippingData = await fetchShipping(price);
    // console.log('selected shipping', selectedShippingMOodel);

    let userNewId = 0;
    setShowLoader(true);

    if (billingAdress && shippingAdress) {
      const orderModel = {
        ...AddOrderDefault,
        ...addPaymentDetails(),
        cardName: billingAdress.firstname + ' ' + billingAdress?.lastName,
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
        email: customer?.email || '',
        billingEqualsShipping: useShippingAddress,
        billingEmail: billingAdress.email || customer?.email || '',
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
        shippingEmail: customer?.email || '',
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
          totalPrice + getNewShippingCost(selectedShippingMOodel?.price),
        orderNotes: orderNote,
        couponCode: couponCode || '',
        couponDiscountAmount: discount,
        orderStatus: __pagesConstant.checkoutPage.orderStatus,
        transactionStatus: __pagesConstant.checkoutPage.transactionStatus,
        shippingMethod: selectedShippingMOodel
          ? selectedShippingMOodel.name
          : '',
        endUserName: endUserNameS,
        logoFinalTotal: totalLogoCharges,
        lineFinalTotal: totalLineCharges,
        orderShippingCosts: getNewShippingCost(selectedShippingMOodel?.price),
        orderSmallRunFee: cartCharges?.smallRunFeesCharges
          ? cartCharges.smallRunFeesCharges
          : 0,
        orderLogoSetupFee: cartCharges?.logoSetupCharges
          ? cartCharges.logoSetupCharges
          : 0,

        // EMPLOYEE LOGIN SPECIFIC
        empSourceName: employeeLogin.source.label,
        empSourceMedium: employeeLogin.sourceMedium.label,
        empSalesRap: employeeLogin.salesRep.label,
        salesRepName: employeeLogin.salesRep.label,
        salesAgentId: +employeeLogin.salesRep.value,
        isAllowPo: employeeLogin.allowPo,
      };

      // console.log('payload', orderModel);

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
                logout_EmployeeLogin(res.id);
              }
              setShowLoader(false);
              router.push(`/${paths.THANK_YOU}?orderNumber=${res.id}`);
              logoutClearCart();
              deleteCookie(__Cookie.tempCustomerId);
            } else if (res) {
              setShowLoader(false);
              showModal({
                message: JSON.stringify(Object.values(res)[0]),
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

  const paymentFieldUpdateHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    switch (paymentMethod) {
      case paymentEnum.creditCard:
        if (name == 'EnterPONumber') {
          setPurchaseOrder(value);
        } else {
          setCardDetails((prev) => ({ ...prev, [name]: value }));
        }
        break;
    }
  };

  const disablePlaceOrder = (): boolean => {
    let disable = false;
    if (isEmployeeLoggedIn) {
      disable = !!!employeeLogin.salesRep.value;
    }

    return disable;
  };

  useEffect(() => {
    const valuesEnduser = localStorage.getItem('endusername');
    if (valuesEnduser) {
      setEndUserName(valuesEnduser);
      remove_EnduserName('endusername');
    }
  }, []);

  // console.log('purchase porder', purchaseOrder);

  return (
    <>
      {' '}
      <div className='container mx-auto pl-[15px] pr-[15px] mt-[20px] mb-[50px] '>
        <div className='flex flex-wrap justify-between -mx-[15px]'>
          <div className='w-full md:w-8/12 lg:w-[72%] pl-[15px] pr-[15px] checkoutpage'>
            {currentPage === checkoutPages.reviewOrder ? (
              <div id='OrderReview'>
                <section className='w-full'>
                  <div className='bg-light-gray p-4 text-2xl font-bold font-semibold'>
                    {__pagesText.CheckoutPage.OrderReview}
                  </div>
                  <div className='flex flex-wrap checkout-box ml-[-15px] mr-[-15px]'>
                    <div className='flex-1 w-full md:w-6/12 mt-[15px] ml-[15px] mr-[15px] mb-[30px]'>
                      <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                        <div className='flex flex-wrap items-center  pt-[10px] border-b border-[#ececec]'>
                          <div className='pb-[10px] text-title-text'>
                            {__pagesText.CheckoutPage.ShippingAddress}
                          </div>
                          <div className='text-default-text ml-4'>
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
                        <PurchaseOrderType1
                          changeHandler={paymentFieldUpdateHandler}
                          updatePaymentMethod={setPaymentMethod}
                          purchaseOrder={purchaseOrder}
                        />
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
                            {paymentEnum.netNumber == paymentMethod && (
                              <>
                                <div className='text-default-text'>
                                  Using Net
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className='flex flex-wrap items-center justify-between pt-[10px]'>
                          <div className='pb-[10px] text-default-text'>
                            {shippingMethod.length > 0 &&
                              shippingMethod[0].name !== '' &&
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
                                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2'
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
                          {!useShippingAddress && (
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
                          )}
                        </div>
                        <div className='mb-3 font-semibold text-lg'>
                          <div className='flex items-center'>
                            <div className='input_checkbox'>
                              <input
                                type='checkbox'
                                id='UseShippingAddress3'
                                name='UseShippingAddress'
                                className='checkbox'
                                data-modal-toggle='billingaddressModal'
                                checked={useShippingAddress}
                                onChange={(e) => {
                                  if (!userId) {
                                    setShippingAddress(false);
                                    setShowAddAddress(true);
                                    setBillingAdress(null);
                                    useShippingAddress &&
                                      setCurrentPage(checkoutPages.address);
                                  }
                                  setShippingAddress(!useShippingAddress);
                                  useShippingAddress &&
                                    setShippingAddress &&
                                    setShippingAddress(e.target.checked);
                                  userId &&
                                    !e.target.checked &&
                                    setAddressType &&
                                    setAddressType(
                                      UserAddressType.BILLINGADDRESS,
                                    );
                                }}
                              />
                            </div>
                            <label
                              htmlFor='UseShippingAddress3'
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
                  isRemovable={true}
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
                            setBillingAdress={setBillingAdress}
                            setAddressType={setAddressType}
                            address={shippingAdress}
                            addressType={1}
                            changeClickHandler={() =>
                              setAddressType(UserAddressType.SHIPPINGADDRESS)
                            }
                          />
                        )}
                      </div>
                      <div className='w-full lg:w-1/2 pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                        <PurchaseOrderType1
                          changeHandler={paymentFieldUpdateHandler}
                          updatePaymentMethod={setPaymentMethod}
                          purchaseOrder={purchaseOrder}
                          setPurchaseOrder={handlePurchase}
                        />
                        <PaymentType1
                          changeHandler={paymentFieldUpdateHandler}
                          updatePaymentMethod={setPaymentMethod}
                          purchaseOrder={purchaseOrder}
                          paymentMethod={paymentMethod}
                          detectCardType={detectCardType}
                          cardDetails={cardDetails}
                        />
                        {showAddAddress && !billingAdress ? (
                          <AddAddress
                            setAddressType={setAddressType}
                            refrence={billingForm}
                            title={'Billing Address'}
                            setShippingAddress={setShippingAddress}
                            useShippingAddress={useShippingAddress}
                            isBillingForm={true}
                            billingAddress={billingAdress}
                          />
                        ) : (
                          <CheckoutAddress
                            setAddressType={setAddressType}
                            setBillingAdress={setBillingAdress}
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
            <CartSummarryType5 selectedShippingModel={selectedShipping} />
            {isEmployeeLoggedIn && <CT1_EL_Dropdowns />}

            <div className='text-medium-text font-semibold mb-[20px]'>
              <div className='text-rose-500'>{__pagesText.dicheckoutNote}</div>
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

export default ChekoutType5;
