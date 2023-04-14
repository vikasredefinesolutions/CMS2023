import { commonMessage } from '@constants/successError.text';
import { extractAPIErrors } from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { addPromoCode } from '@services/cart.service';
import { useState } from 'react';

const SummarryController = () => {
  const [coupon, setCoupon] = useState<string>('');

  const stateUserId = useTypedSelector_v2((state) => state.user.id);
  const storeId = useTypedSelector_v2((state) => state.store.id);

  const { showModal, addPromoCode: addPromoCodeRedux } = useActions_v2();

  const couponSubmitHandler = async () => {
    const couponObject = {
      promotionsModel: {
        customerId: stateUserId || 0,
        couponCode: coupon,
        storeId: storeId || 0,
        taxCost: 0,
        shippingCost: 0,
      },
    };

    const res = await addPromoCode(couponObject);
    if (res.success) {
      addPromoCodeRedux({
        coupon: res.data.couponCode,
        amount: res.data.discountAmount,
        percentage: res.data.percentage,
      });
    } else {
      const errors = extractAPIErrors(res.errors);
      if (errors.length > 0) {
        if (errors.length > 1) {
          showModal({
            message: errors.toString(),
            title: commonMessage.failed,
          });
        } else {
          setCoupon(errors[0]);
          setTimeout(() => {
            setCoupon('');
          }, 3000);
        }
      }
    }
  };

  return {
    couponInputChangeHandler: setCoupon,
    couponSubmitHandler,
    showApplyButton: Boolean(coupon),
    coupon,
  };
};

export default SummarryController;
