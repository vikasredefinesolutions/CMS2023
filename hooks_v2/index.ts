import allActions from '@redux/actions.redux';
import type { AppState } from '@redux/store.redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { __Cookie } from '@constants/global.constant';
import { extractCookies } from 'helpers_v2/common.helper';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useActions_v2 = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};
export const useTypedSelector_v2: TypedUseSelectorHook<AppState> = useSelector;

function getWindowDimensions() {
  let height = 1920;
  let width = 1080;

  if (typeof window !== 'undefined') {
    height = window.innerHeight;
    width = window.innerWidth;
  }

  return {
    width,
    height,
  };
}

export function useWindowDimensions_v2() {
  const [windowDimensions, setWindowDimensions] = useState<{
    width: number;
    height: number;
  }>(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return windowDimensions;
}

// Funtion to get customer id from state if not then from cookie.
export const GetCustomerId = () => {
  const userId = useTypedSelector_v2((state) => state.user.id);
  if (userId) {
    return userId;
  } else {
    const tempCustomerId = extractCookies(
      __Cookie.tempCustomerId,
      'browserCookie',
    ).tempCustomerId;
    if (tempCustomerId) {
      return tempCustomerId;
    }
  }
  return 0;
};

export const GetCartTotals = () => {
  const cart = useTypedSelector_v2((state) => state.cart.cart);
  const { useBalance, allowedBalance } = useTypedSelector_v2(
    (state) => state.cart.userCreditBalance,
  );
  const store = useTypedSelector_v2((state) => state.store);
  let couponDiscount = 0;
  const discountObj = useTypedSelector_v2((state) => state.cart.discount);
  if (discountObj && discountObj.coupon && discountObj.amount) {
    couponDiscount = discountObj.amount;
  }
  let priceObject = {
    merchandisePrice: 0,
    totalPrice: 0,
    subTotal: 0,
    smallRunFee: 0,
    logoSetupCharges: 0,
    salesTax: 0,
    discount: couponDiscount,
    creditBalance: allowedBalance,
    totalQty: 0,
    totalLineCharges: 0,
    totalLogoCharges: 0,
    sewOutTotal: 0,
    firstLogoPrice: 0,
    secondLogoPrice: 0,
    thirdLogoPrice: 0,
    fourthLogoPrice: 0,
    fifthLogoPrice: 0,
    sixthLogoPrice: 0,
    seventhLogoPrice: 0,
  };
  if (cart && cart.length > 0) {
    cart.forEach((res) => {
      priceObject.totalPrice += res.totalPrice;
      priceObject.subTotal += res.productTotal;
      priceObject.totalQty += res.totalQty;
      priceObject.totalLineCharges += res.lineTotalPrice;
      priceObject.totalLogoCharges += res.logoTotalPrice;
      priceObject.merchandisePrice +=
        res.msrp !== 0 ? res?.msrp * res.totalQty : res.productTotal;
      res?.shoppingCartLogoPersonViewModels.forEach((item, index) => {
        if (index === 0) {
          priceObject.firstLogoPrice += item.logoPrice;
        } else if (index === 1) {
          priceObject.secondLogoPrice += item.logoPrice;
        } else if (index === 2) {
          priceObject.thirdLogoPrice += item.logoPrice;
        } else if (index === 3) {
          priceObject.fourthLogoPrice += item.logoPrice;
        } else if (index === 4) {
          priceObject.fifthLogoPrice += item.logoPrice;
        } else if (index === 5) {
          priceObject.sixthLogoPrice += item.logoPrice;
        } else if (index === 6) {
          priceObject.seventhLogoPrice += item.logoPrice;
        }
      });
    });

    if (store.cartCharges) {
      const {
        isSmallRun,
        smallRunLimit,
        smallRunFeesCharges,
        isLogoSetupCharges,
        logoSetupCharges,
      } = store.cartCharges;
      if (isSmallRun) {
        if (priceObject.totalQty < smallRunLimit) {
          priceObject.totalPrice += smallRunFeesCharges;
          priceObject.smallRunFee = smallRunFeesCharges;
        }
      }
      if (isLogoSetupCharges) {
        priceObject.totalPrice += logoSetupCharges;
        priceObject.logoSetupCharges = logoSetupCharges;
      }
    }
    priceObject.totalPrice -= couponDiscount;
    if (useBalance) {
      if (allowedBalance > priceObject.totalPrice) {
        priceObject.creditBalance = priceObject.totalPrice;
        priceObject.totalPrice = 0;
      } else {
        priceObject.totalPrice -= allowedBalance;
      }
    }
  }
  return priceObject;
};
