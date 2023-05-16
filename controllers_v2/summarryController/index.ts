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
import { useState } from 'react';

const SummarryController = () => {
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const [coupon, setCoupon] = useState<string>('');
  const customerId = GetCustomerId();

  const {
    setShowLoader,
    showModal,
    addPromoCode: addPromoCodeRedux,
  } = useActions_v2();

  const handleIfCouponIsValid = (details: {
    couponCode: string;
    percentage: string;
    discountAmount: string;
    isFreeShipping: boolean;
    taxCost: string;
    shiipingCost: string;
  }) => {
    addPromoCodeRedux({
      coupon: details.couponCode,
      amount: details.discountAmount,
      percentage: details.percentage,
    });
  };

  const handleIfCouponIsNotValid = (errors: { [key: string]: string }) => {
    const objToArr = Object.values(errors);

    if (objToArr.length === 0) return;

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
      message: __SuccessErrorText.SomethingWentWrong,
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

  return {
    coupon,
    setCoupon,
    applyCouponHandler,
  };
};

export default SummarryController;
