import { useActions_v2 } from '@hooks_v2/index';
import { useState } from 'react';

const PL1_PurchaseOrder: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const { update_PaymentDetails } = useActions_v2();

  return (
    <div id='PurchaseOrder'>
      <div className='flex justify-between items-center mt-[12px] mb-[12px] pb-[18px] border-b border-gray-border'>
        <div className='text-title-text font-semibold tracking-normal'>
          Payment
        </div>
        <div>
          <div className='w-full flex justify-end'>
            <button
              className='!text-anchor hover:!text-anchor-hover underline'
              id='btn-use-credit-card'
              onClick={() =>
                update_PaymentDetails({
                  method: 'CHANGED',
                  type: 'CREDIT_CARD',
                })
              }
            >
              Use Credit Card
            </button>
          </div>
        </div>
      </div>
      <div
        className={`relative z-0 w-full mb-[20px] border border-gray-border rounded `}
      >
        <input
          onChange={(event) => {
            const poNumber = event.target.value.trim();
            setValue(poNumber);
          }}
          name='EnterPONumber'
          placeholder=' '
          onBlur={() => {
            update_PaymentDetails({
              method: 'bulk_payment',
              poNumber: value,
            });
          }}
          required={true}
          maxLength={10}
          className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
        />
        <label
          htmlFor='EnterPONumber'
          className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
        >
          Enter PO Number *
        </label>
      </div>
      <div className={`text-base `}>
        Please enter your PO Number. We will contact you to confirm details of
        your payment.
      </div>
    </div>
  );
};

export default PL1_PurchaseOrder;
