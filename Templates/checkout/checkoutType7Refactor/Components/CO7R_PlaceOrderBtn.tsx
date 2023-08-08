import { paths } from '@constants/paths.constant';
import {
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';
import { placeOrder } from '@services/checkout.service';

import { UserAddressType } from '@constants/enum';
import { HEALTHYPOINTS, UCA } from '@constants/global.constant';
import { AddressAPIRequest } from '@definations/APIs/address.req';
import getLocation, { _location } from '@helpers/getLocation';
import { CreateUserAddress } from '@services/address.service';
import { Klaviyo_PlaceOrder } from '@services/klaviyo.service';
import { useRouter } from 'next/router';
import React from 'react';
import {
  _CO7R_AddressFields,
  billingFields,
  couponFields,
  decideToAddOrUpdateTheAddress,
  paymentFields,
  shippingFields,
} from '../CO7R_Extras';

interface _Props {
  shippingAddress: _CO7R_AddressFields;
  cost: {
    shippingNhandling: number;
    subTotal: number;
    tax: number;
    couponDiscount: number;
    creditBalance: () => number;
    giftCardAmount: () => number;
    totalToSend: () => number;
  };
}

const CO7_PlaceOrderBtn: React.FC<_Props> = ({ shippingAddress, cost }) => {
  const customerId = GetCustomerId();
  const router = useRouter();
  const { setShowLoader, logoutClearCart, showModal } = useActions_v2();
  const { cart, discount } = useTypedSelector_v2((state) => state.cart);
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const { customer } = useTypedSelector_v2((state) => state.user);
  const { address, payment, user } = useTypedSelector_v2(
    (state) => state.checkout,
  );
  const { code: storeCode } = useTypedSelector_v2((state) => state.store);
  const { shipping: existingShippingAddress, billing: existingBillingAddress } =
    address;

  const userFields = (): {
    firstName: string;
    lastName: string;
    email: string;
  } => {
    return {
      firstName: customer!.firstname,
      lastName: customer!.lastName,
      email: customer!.email,
    };
  };

  const handlePlaceOrderSuccess = async (orderId: string) => {
    await Klaviyo_PlaceOrder({
      orderNumber: orderId,
    });

    // deleteCookie(__Cookie.userId);
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

  const updateBothAddress = async (
    shippingPayload: AddressAPIRequest,
    location: _location,
  ) => {
    const billingPayload: AddressAPIRequest = {
      storeCustomerAddressModel: {
        customerId: +customerId,
        email: customer?.email || '',
        //
        firstname: existingBillingAddress?.firstname || '',
        lastName: existingBillingAddress?.lastName || '',
        address1: existingBillingAddress?.address1 || '',
        address2: existingBillingAddress?.address2 || '',
        city: existingBillingAddress?.city || '',
        state: existingBillingAddress?.state || '',
        postalCode: existingBillingAddress?.postalCode || '',
        phone: existingBillingAddress?.phone || '',
        countryName: existingBillingAddress?.countryName || '',
        countryCode: existingBillingAddress?.countryCode || '',
        // previous
        id: existingBillingAddress?.id || 0,
        rowVersion: existingBillingAddress?.rowVersion || '',
        suite: existingBillingAddress?.suite || '',
        fax: existingBillingAddress?.fax || '',
        companyName: existingBillingAddress?.companyName || '',
        isDefault: existingBillingAddress?.isDefault || true,
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
      decideToAddOrUpdateTheAddress(
        shippingPayload,
        !!existingShippingAddress?.id,
      ),
      decideToAddOrUpdateTheAddress(
        billingPayload,
        !!existingBillingAddress?.id,
      ),
    ]);
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
      decideToAddOrUpdateTheAddress(
        shippingPayload,
        !!existingShippingAddress?.id,
      ),
      CreateUserAddress(billingPayload),
    ]);
  };

  const updateAddresses = async () => {
    const location = await getLocation();
    const shippingPayload: AddressAPIRequest = {
      storeCustomerAddressModel: {
        customerId: +customerId,
        email: customer?.email || '',
        //
        firstname: shippingAddress.firstname,
        lastName: shippingAddress.lastName,
        address1: shippingAddress.address1,
        address2: shippingAddress.address2,
        city: shippingAddress.city,
        state: shippingAddress.state,
        postalCode: shippingAddress.postalCode,
        phone: shippingAddress.phone,
        countryName: shippingAddress.countryName,
        countryCode: shippingAddress.countryCode,
        //
        location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
        ipAddress: location.ip_address,
        // previous data
        id: existingShippingAddress?.id || 0,
        fax: existingShippingAddress?.fax || '',
        suite: existingShippingAddress?.suite || '',
        rowVersion: existingShippingAddress?.rowVersion || '',
        companyName: existingShippingAddress?.companyName || '',
        isDefault: existingShippingAddress?.isDefault || true,
        // Static
        macAddress: '00-00-00-00-00-00',
        recStatus: 'A',
        addressType: UserAddressType.SHIPPINGADDRESS,
      },
    };

    if (address.useShippingAddressForBilling) {
      return await updateShippingAddressAsBillingAddress(shippingPayload);
    }
    return await updateBothAddress(shippingPayload, location);
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
      shippingEmail: customer!.email,
      shippingMethod: '',
      ...shippingFields(shippingAddress),

      // Billing
      billingEmail: customer!.email,
      ...billingFields(
        address.useShippingAddressForBilling,
        shippingAddress,
        address.billing,
      ),

      // Payment
      ...paymentFields(payment),

      // Coupon
      ...couponFields(discount),

      // Prices
      orderSubtotal: cost.subTotal,
      orderShippingCosts: cost.shippingNhandling,
      orderTax: cost.tax,
      orderTotal: cost.totalToSend(),

      // credit
      storeCredit: cost.creditBalance(),
      isCreditLimit: payment.useCreditBalance,

      // GiftCard
      giftCertiSerialNumber: discount?.giftCard || '',
      giftCertificateDiscountAmount: cost.giftCardAmount(),

      //
      orderSmallRunFee: 0,
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

    try {
      await updateAddresses();
      await storeOrderDetails();
    } catch (error) {
      handlePlaceOrderFailed(error);
    }
    setShowLoader(false);
  };

  return (
    <>
      <div className='px-[15px] pb-[15px] '>
        <button
          className={`btn btn-lg ${
            storeCode === UCA ? 'btn-secondary' : 'btn-primary'
          } w-full text-center`}
          onClick={handlePlaceOrder}
        >
          {(storeCode === UCA || storeCode === HEALTHYPOINTS) && (
            <i className='fa-solid fa-lock mr-[4px]'></i>
          )}
          PLACE ORDER NOW
        </button>
      </div>
    </>
  );
};

export default CO7_PlaceOrderBtn;
