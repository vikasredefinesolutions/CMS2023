import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import React from 'react';

const CO2_EL_PaymentOption: React.FC = () => {
  const { update_CheckoutEmployeeLogin } = useActions_v2();
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
          onChange={(event) => {
            update_CheckoutEmployeeLogin({
              type: 'PAYMENT_PENDING',
              value: !el.isPaymentPending,
            });
            if (!event.target.checked && el.allowPo) {
              update_CheckoutEmployeeLogin({
                type: 'ALLOW_PO',
                value: !el.allowPo,
              });
            }
          }}
        />
        <div className='font-bold'>USE PAYMENT PENDING</div>
      </label>
      <label className='w-full flex justify-start cursor-pointer'>
        <input
          type='checkbox'
          name='ALLOW_PO'
          id='ALLOW_PO'
          className='mr-2 disabled:text-slate-200 disabled:cursor-not-allowed'
          checked={el.allowPo}
          disabled={!el.isPaymentPending}
          onChange={() =>
            update_CheckoutEmployeeLogin({
              type: 'ALLOW_PO',
              value: !el.allowPo,
            })
          }
        />
        <div
          className={`font-bold ${
            !el.isPaymentPending ? 'cursor-not-allowed' : ''
          }`}
        >
          ALLOW PO
        </div>
      </label>
    </div>
  );
};

export default CO2_EL_PaymentOption;
