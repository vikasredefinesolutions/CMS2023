import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import React from 'react';

const CO2_EL_PaymentOption: React.FC = () => {
  const { update_checkoutEmployeeLogin } = useActions_v2();
  const { el } = useTypedSelector_v2((state) => state.checkout);

  return (
    <div className='flex py-5 w-[250px]'>
      <label className='w-full flex justify-start cursor-pointer'>
        <input
          type='checkbox'
          name='PAYMENT_PENDING'
          checked={el.isPaymentPending}
          id='PAYMENT_PENDING'
          className='mr-2'
          onChange={() =>
            update_checkoutEmployeeLogin({
              type: 'PAYMENT_PENDING',
              value: !el.isPaymentPending,
            })
          }
        />
        <div className='font-bold'>USE PAYMENT PENDING</div>
      </label>
      <label className='w-full flex justify-start cursor-pointer'>
        <input
          type='checkbox'
          name='ALLOW_PO'
          id='ALLOW_PO'
          className='mr-2'
          checked={el.allowPo}
          onChange={() =>
            update_checkoutEmployeeLogin({
              type: 'ALLOW_PO',
              value: !el.allowPo,
            })
          }
        />
        <div className='font-bold'>ALLOW PO</div>
      </label>
    </div>
  );
};

export default CO2_EL_PaymentOption;
