import { __SuccessErrorText } from '@constants/successError.text';
import {
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';
import { addPromoCode } from '@services/cart.service';
import { useEffect, useState } from 'react';

const SummarryController = () => {
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const { discount: appliedCoupon, lastUpdate: cartUpdatedAt } =
    useTypedSelector_v2((state) => state.cart);
  const [coupon, setCoupon] = useState<string>('');
  const showTextFor3Sec = useTypedSelector_v2(
    (state) => state.cart.discount?.showTextFor3Sec,
  );
  const customerId = GetCustomerId();
  const successMessage = showTextFor3Sec
    ? __SuccessErrorText.promoCode.valid
    : null;

  const { setShowLoader, cart_promoCode } = useActions_v2();

  const removeCouponCodeHandler = () => {
    cart_promoCode('REMOVE_PROMO_CODE');
  };
  const discountCoupon = localStorage.getItem('discountCoupon');
  const set_Coupon = (couponCode: string) => {
    localStorage.setItem('discountCoupon', couponCode);
  };

  const handleIfCouponIsValid = (details: {
    couponCode: string;
    percentage: string;
    discountAmount: string;
    isFreeShipping: boolean;
    taxCost: string;
    shiipingCost: string;
  }) => {
    cart_promoCode({
      coupon: details.couponCode,
      amount: +details.discountAmount,
      percentage: +details.percentage,
      showTextFor3Sec: true,
    });
    setCoupon('');
  };
  useEffect(() => {
    if (discountCoupon && customerId) {
      applyCouponHandler(discountCoupon);
    }
  }, [discountCoupon, customerId]);
  const handleIfCouponIsNotValid = (errors: { [key: string]: string }) => {
    if (errors) {
      const objToArr = Object?.values(errors);

      if (objToArr.length === 0) return;
      cart_promoCode('REMOVE_PROMO_CODE');

      if ('promotionsModel.CustomerId' in errors) {
        setCoupon(objToArr[0]);
        setTimeout(() => {
          setCoupon('');
        }, 1500);
        return;
      }

      // if No errors matched
      setTimeout(() => {
        setCoupon(objToArr[0]);
      }, 1500);
    }
  };

  const applyCouponHandler = async (couponCode: string) => {
    setShowLoader(true);
    const couponObject = {
      promotionsModel: {
        customerId: +customerId || 0,
        couponCode: couponCode,
        storeId: storeId || 0,
        taxCost: 0,
        shippingCost: 0,
      },
    };

    await addPromoCode(couponObject)
      .then((res) => {
        if ('discountAmount' in res) {
          set_Coupon(couponCode);
          handleIfCouponIsValid(res);
          return;
        }

        handleIfCouponIsNotValid(res);
      })
      .catch((errors) => handleIfCouponIsNotValid(errors))
      .finally(() => setShowLoader(false));
  };

  useEffect(() => {
    if (appliedCoupon?.coupon) {
      applyCouponHandler(appliedCoupon.coupon);
    }
  }, [cartUpdatedAt]);

  useEffect(() => {
    if (showTextFor3Sec) {
      setTimeout(() => {
        cart_promoCode('HIDE_TEXT');
      }, 2000);
    }
  }, [showTextFor3Sec]);

  return {
    coupon,
    successMessage,
    setCoupon,
    applyCouponHandler,
    removeCouponCodeHandler,
  };
};

export default SummarryController;
