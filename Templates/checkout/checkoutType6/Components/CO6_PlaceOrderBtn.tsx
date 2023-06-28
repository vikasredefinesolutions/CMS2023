import { __Cookie } from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import { deleteCookie } from '@helpers/common.helper';
import getLocation, { _location } from '@helpers/getLocation';
import {
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';
import { placeOrder } from '@services/checkout.service';
import {
  SaveSbStoreAdditionalCustomFieldsValue,
  SaveSbStorePlayerInformation,
} from '@services/sb.service';
import {
  _CO6_AddressFields,
  billingFields,
  paymentFields,
  shippingFields,
} from '@templates/checkout/checkoutType6/CO6_Extras';
import { useRouter } from 'next/router';
import React from 'react';

interface _Props {
  shippingAddress: _CO6_AddressFields;
  cost: {
    shippingNhandling: number;
    subTotal: number;
    tax: number;
    couponDiscount: number;
    fixedFee: number;
    cardProcessingFee: number;
    total: () => number;
  };
}

const CO6_PlaceOrderBtn: React.FC<_Props> = ({ shippingAddress, cost }) => {
  const customerId = GetCustomerId();
  const router = useRouter();
  const { setShowLoader, logoutClearCart, showModal } = useActions_v2();
  const { cart, discount } = useTypedSelector_v2((state) => state.cart);
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const {
    user: unregisterdUser,
    address,
    payment,
    playerInformation,
    additionalInformation,
  } = useTypedSelector_v2((state) => state.checkout);

  const userFields = (): {
    firstName: string;
    lastName: string;
    email: string;
  } => {
    // if (registeredCustomer) {
    //   return {
    //     firstName: registeredCustomer.firstname,
    //     lastName: registeredCustomer.lastName,
    //     email: registeredCustomer.email,
    //   };
    // }

    return {
      firstName: shippingAddress.firstname,
      lastName: shippingAddress.lastName,
      email: unregisterdUser.email,
    };
  };

  const couponFields = () => {
    return {
      couponCode: discount?.coupon || '',
      couponDiscountAmount: discount?.amount || 0,
    };
  };

  const handlePlaceOrderSuccess = async (orderId: string) => {
    // await Klaviyo_PlaceOrder({
    //   orderNumber: orderId,
    // });

    deleteCookie(__Cookie.tempCustomerId);
    logoutClearCart();
    router.push(`/${paths.THANK_YOU}?orderNumber=${orderId}`);
  };

  const handlePlaceOrderFailed = (errorResponse: any) => {
    let error = {
      title: '',
      message: '',
    };

    Object.keys(errorResponse).forEach((key, index) => {
      if (index === 0) {
        error.title = 'Failed' || 'Something went wrong!!';
        error.message = errorResponse[key] || 'Try again, later!!!';
      }
    });

    showModal(error);
  };

  const storeAdditionalDetails = async (location: _location) => {
    if (additionalInformation.length === 0) return null;

    return await SaveSbStoreAdditionalCustomFieldsValue({
      sbStoreShoppingCartCustom: additionalInformation.map((info) => ({
        id: 0,
        rowVersion: '',
        location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
        ipAddress: location.ip_address,
        macAddress: '00-00-00-00-00-00',
        shoppingCartId: (cart && cart[0].shoppingCartItemsId) || 0,
        name: info.name,
        type: info.type,
        isRequired: info.isRequired,
        value: info.value,
        storeId: storeId,
        recStatus: '',
      })),
    });
  };

  const storePlayerDetails = async (location: _location) => {
    if (playerInformation.firstName.length === 0) {
      return null;
    }

    return await SaveSbStorePlayerInformation({
      sbStorePlayerDetails: {
        id: 0,
        rowVersion: '',
        location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
        ipAddress: location.ip_address,
        macAddress: '00-00-00-00-00-00',
        shoppingCartId: (cart && cart[0].shoppingCartItemsId) || 0,
        firstName: playerInformation.firstName,
        lastName: playerInformation.lastName,
        playerNo: playerInformation.playerNo,
        recStatus: '',
      },
    });
  };

  const storeOrderDetails = async () => {
    const payload = {
      id: 0,
      isNew: true,
      storeID: storeId,
      shoppingCartID: (cart && cart[0].shoppingCartItemsId) || 0,

      // User
      customerID: +customerId,
      ...userFields(),

      // Shipping
      shippingEmail: unregisterdUser.email,
      shippingMethod: '',
      ...shippingFields(shippingAddress),

      // Billing
      billingEmail: unregisterdUser.email,
      ...billingFields(
        address.useShippingAddressForBilling,
        shippingAddress,
        address.billing,
      ),

      // Payment
      ...paymentFields(payment),

      // Coupon
      ...couponFields(),

      // Prices
      orderSubtotal: cost.subTotal,
      orderShippingCosts: cost.shippingNhandling,
      orderTax: cost.tax,
      orderTotal: cost.total(),

      // credit
      isCreditLimit: false,
      storeCredit: 0,

      //
      orderSmallRunFee: 0,
      giftCertificateDiscountAmount: 0,
      quantityDiscountAmount: 0,
      levelDiscountPercent: 0,
      levelDiscountAmount: 0,
      customDiscount: 0,
      sewoutTotal: 0,
      digitalTotal: 0,
      logoFinalTotal: 0,
      lineFinalTotal: 0,
      giftWrapPrice: 0,
      orderLogoSetupFee: 0,
      shipPromotionDiscount: 0,
      giftWrapAmt: 0,
      refundedAmount: 0,
      chargeAmount: 0,
      authorizedAmount: 0,
      adjustmentAmount: 0,

      // personalization
      sewout: true,

      // Employee
      empSourceName: '',
      empSourceMedium: '',
      employeeID: 0,
      isAllowPo: false,
      salesAgentId: 0,
      salesRepName: '',
      empSalesRap: '',

      // user tracking
      gclid: '',

      // Static
      orderStatus: 'New',
      endUserName: '',
      orderCheckoutNote: '',
      orderNotes: '',

      // Never touched
      notes: '',
      okToEmail: true,
      lastIPAddress: '',
      giftCertiSerialNumber: '',
      authorizationCode: '',
      authorizationResult: '',
      transactionCommand: '',
      transactionStatus: '',
      avsResult: '',
      captureTxCommand: '',
      captureTXResult: '',
      deleted: true,
      referrer: '',
      isGiftWrap: true,
      authorizedOn: new Date(),
      capturedOn: new Date(),
      orderDate: new Date(),
      inventoryWasReduced: true,
      refOrderID: '',
      isMobileOrder: true,
      batchId: 0,
      shippingLabelCost: 0,
      shippingLabelWeight1: 0,
      shippingLabelPackageHeight: 0,
      shippingLabelPackageWidth: 0,
      shippingLabelPackageLength: 0,
      noOfLabels: 0,
      isApproved: true,
      dimensionValue: 0,
      isFullFillment: true,
      isAmazonuplaod: true,
      cvvResult: '',
      isExport: true,
      chargeHostedPaymentID: '',
      isPayLater: true,
      isMailSend: true,
      shippedByStamps: true,
      formId: '',
      inHandDate: new Date(),
      decorationDate: new Date(),
    };

    await placeOrder({
      orderModel: payload,
    }).then((response) => {
      if (!response) throw new Error('Something went wrong');

      if ('id' in response) {
        handlePlaceOrderSuccess(response.id);
        return;
      }

      handlePlaceOrderFailed(response);
    });
  };

  const handlePlaceOrder = async () => {
    setShowLoader(true);

    const location = await getLocation();
    try {
      await storeAdditionalDetails(location);
      await storePlayerDetails(location);
      await storeOrderDetails();
    } catch (error) {
      handlePlaceOrderFailed(error);
    }

    setShowLoader(false);
  };

  return (
    <div className=''>
      <div className='mt-[16px] mb-[16px]'>
        <button
          className='btn btn-lg btn-primary w-full text-center'
          onClick={handlePlaceOrder}
        >
          PLACE ORDER NOW
        </button>
      </div>
      <div className='mb-[16px]'>
        <div className='text-[#ff0000] mb-[10px] text-default-text font-semibold text-center'>
          Note: Please do not click "Place Order Now" multiple times.
        </div>
      </div>
    </div>
  );
};

export default CO6_PlaceOrderBtn;
