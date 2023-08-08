import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import React from 'react';

const CT1_EL_PaymentOption: React.FC = () => {
  const { update_CheckoutEmployeeLogin } = useActions_v2();
  const { el } = useTypedSelector_v2((state) => state.checkout);

  return (
    <div className='w-full flex flex-wrap'>
      <label className='w-full flex justify-end cursor-pointer pt-[5px]'>
        <input
          type='checkbox'
          name='PAYMENT_PENDING'
          checked={el.isPaymentPending}
          id='PAYMENT_PENDING'
          className='mr-2'
          onChange={() =>
            update_CheckoutEmployeeLogin({
              type: 'PAYMENT_PENDING',
              value: !el.isPaymentPending,
            })
          }
        />
        <div className=''>USE PAYMENT PENDING</div>
      </label>
      <label className='w-full flex justify-end cursor-pointer pt-[5px]'>
        <input
          type='checkbox'
          name='ALLOW_PO'
          id='ALLOW_PO'
          className='mr-2'
          checked={el.allowPo}
          onChange={() =>
            update_CheckoutEmployeeLogin({
              type: 'ALLOW_PO',
              value: !el.allowPo,
            })
          }
        />
        <div className=''>ALLOW PO</div>
      </label>
    </div>
  );
};

export default CT1_EL_PaymentOption;
