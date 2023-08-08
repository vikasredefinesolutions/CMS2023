import { useTypedSelector_v2 } from '@hooks_v2/index';

import React from 'react';
import { _CO7R_Screens } from '../CO7R_Extras';

interface _Props {
  setScreenToShow: (value: React.SetStateAction<_CO7R_Screens>) => void;
  isMethodSelected: boolean;
}
const CO7R_ReviewPaymentMethod: React.FC<_Props> = ({ setScreenToShow }) => {
  const { payment } = useTypedSelector_v2((state) => state.checkout);
  const paymentMethodAdded =
    !!payment.poNumber || !!payment.creditCard.nameOnCard;

  return (
    <div className='bg-light-gray flex-1 w-full md:w-6/12 mt-[15px] ml-[15px] mr-[15px] mb-[30px]'>
      <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
        <div className='flex flex-wrap items-center justify-between pt-[10px] border-b border-[#ececec]'>
          <div className='pb-[10px] text-title-text'>Payment Method</div>
          <div className='text-default-text'>
            <button
              className='!text-anchor hover:!text-anchor-hover'
              onClick={() => setScreenToShow('addPaymentMethodAndBilling')}
              disabled={!paymentMethodAdded && payment.paymentRequired}
            >
              Change
            </button>
          </div>
        </div>
        {!paymentMethodAdded && payment.paymentRequired && (
          <div className='text-default-text mt-[10px] mb-[15px]'>
            Provide payment details below
          </div>
        )}
        {payment.paymentRequired === false && (
          <div className='text-default-text mt-[10px] mb-[2px]'>
            Payment Method: No Payment Required
          </div>
        )}
        {paymentMethodAdded && payment.method === 'CREDIT_CARD' && (
          <>
            <div className='text-default-text mt-[10px] mb-[2px]'>
              Payment Method: CREDIT CARD
            </div>
            <div className='text-default-text mt-[1px] mb-[2px]'>
              Name on card: {payment.creditCard.nameOnCard}
            </div>
            <div className='text-default-text mt-[1px] mb-[2px]'>
              Card Number: Card Ending in{' '}
              {payment.creditCard.ccNumber.slice(-4)}
            </div>
          </>
        )}
        {paymentMethodAdded && payment.method === 'PURCHASE_ORDER' && (
          <>
            <div className='text-default-text mt-[10px] mb-[2px]'>
              Payment Method: PO
            </div>
            <div className='text-default-text mt-[1px] mb-[2px]'>
              PO Number: {payment.poNumber}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CO7R_ReviewPaymentMethod;
