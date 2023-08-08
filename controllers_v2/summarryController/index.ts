import { __SuccessErrorText } from '@constants/successError.text';
import {
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';
import { addPromoCode } from '@services/cart.service';
import { ApplyGiftCard } from '@services/gift.service';
import { useEffect, useState } from 'react';

const SummarryController = () => {
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const { discount: appliedCoupon, lastUpdate: cartUpdatedAt } =
    useTypedSelector_v2((state) => state.cart);
  const [coupon, setCoupon] = useState<string>('');
  const [giftCard, setGiftCard] = useState('');

  const showTextFor3Sec = useTypedSelector_v2(
    (state) => state.cart.discount?.showTextFor3Sec,
  );
  const showTextGiftCardFor3Sec = useTypedSelector_v2(
    (state) => state.cart.discount?.showTextGiftCardFor3Sec,
  );
  const customerId = GetCustomerId();
  const customerEmail = useTypedSelector_v2(
    (state) => state.user.customer?.email,
  );
  const successMessage = showTextFor3Sec
    ? __SuccessErrorText.promoCode.valid
    : null;
  const successGiftCardMessage = showTextGiftCardFor3Sec
    ? __SuccessErrorText.giftCardCode.valid
    : null;

  const { setShowLoader, cart_promoCode, cart_giftcard } = useActions_v2();

  const removeCouponCodeHandler = () => {
    localStorage.removeItem('discountCoupon');
    cart_promoCode('REMOVE_PROMO_CODE');
  };
  const set_Coupon = (couponCode: string) => {
    localStorage.setItem('discountCoupon', couponCode);
  };

  const removeGiftCardHandler = () => {
    cart_giftcard('REMOVE_GIFT_CARD');
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
    const discountCoupon = localStorage.getItem('discountCoupon');

    if (discountCoupon && customerId) {
      applyCouponHandler(discountCoupon);
    }
  }, [customerId]);
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
      setTimeout(() => {
        setCoupon('');
      }, 2500);
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

  const applyGiftCardhandler = async (code: string) => {
    setShowLoader(true);
    const payload = {
      giftCardModel: {
        customerID: 0,
        storeId: storeId || 0,
        giftCardSerialNo: code,
        emailId: customerEmail || '',
      },
    };
    try {
      const giftRes = await ApplyGiftCard(payload);
      if (giftRes && giftRes?.giftCardId) {
        cart_giftcard({
          showTextGiftCardFor3Sec: true,
          giftCard: giftRes?.giftCardSerialNo,
          giftCardAmt: +giftRes?.giftCardAmount,
        });
        setGiftCard('');
      }
      setShowLoader(false);
    } catch (errors: any) {
      setShowLoader(false);
      cart_giftcard('REMOVE_GIFT_CARD');
      if (errors?.error) setGiftCard(errors.error);
      setTimeout(() => {
        setGiftCard('');
      }, 3000);
    }
  };

  useEffect(() => {
    if (appliedCoupon?.coupon) {
      applyCouponHandler(appliedCoupon.coupon);
    }
    if (appliedCoupon?.giftCard) applyGiftCardhandler(appliedCoupon.giftCard);
  }, [cartUpdatedAt]);

  useEffect(() => {
    if (showTextFor3Sec) {
      setTimeout(() => {
        cart_promoCode('HIDE_TEXT');
      }, 2000);
    }
  }, [showTextFor3Sec]);

  useEffect(() => {
    if (showTextGiftCardFor3Sec) {
      setTimeout(() => {
        cart_giftcard('HIDE_GIFT_CARD_TEXT');
      }, 2000);
    }
  }, [showTextGiftCardFor3Sec]);

  return {
    coupon,
    successMessage,
    successGiftCardMessage,
    giftCard,
    setCoupon,
    setGiftCard,
    applyCouponHandler,
    removeCouponCodeHandler,
    removeGiftCardHandler,
    applyGiftCardhandler,
  };
};

export default SummarryController;
