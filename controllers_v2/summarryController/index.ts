import {
  __SuccessErrorText,
  commonMessage,
} from '@constants/successError.text';
import {
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';
import { addPromoCode } from '@services/cart.service';
import { useEffect, useState } from 'react';

const SummarryController = () => {
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const [coupon, setCoupon] = useState<string>('');
  const showTextFor3Sec = useTypedSelector_v2(
    (state) => state.cart.discount?.showTextFor3Sec,
  );
  const customerId = GetCustomerId();
  const successMessage = showTextFor3Sec
    ? __SuccessErrorText.promoCode.valid
    : null;

  const { setShowLoader, showModal, cart_promoCode } = useActions_v2();

  const removeCouponCodeHandler = () => {
    cart_promoCode('REMOVE_PROMO_CODE');
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

  const handleIfCouponIsNotValid = (errors: { [key: string]: string }) => {
    const objToArr = Object.values(errors);

    if (objToArr.length === 0) return;
    cart_promoCode('REMOVE_PROMO_CODE');

    if ('promotionsModel.CustomerId' in errors) {
      showModal({
        message: objToArr[0],
        title: commonMessage.failed,
      });
      setCoupon(objToArr[0]);
      setTimeout(() => {
        setCoupon('');
      }, 1500);
      return;
    }

    // if No errors matched
    showModal({
      message: __SuccessErrorText.promoCode.invalid,
      title: commonMessage.failed,
    });
    setCoupon('');
  };

  const applyCouponHandler = async () => {
    setShowLoader(true);
    const couponObject = {
      promotionsModel: {
        customerId: +customerId || 0,
        couponCode: coupon,
        storeId: storeId || 0,
        taxCost: 0,
        shippingCost: 0,
      },
    };

    await addPromoCode(couponObject)
      .then((res) => {
        if ('discountAmount' in res) {
          handleIfCouponIsValid(res);
          return;
        }

        handleIfCouponIsNotValid(res);
      })
      .catch((errors) => handleIfCouponIsNotValid(errors))
      .finally(() => setShowLoader(false));
  };

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
