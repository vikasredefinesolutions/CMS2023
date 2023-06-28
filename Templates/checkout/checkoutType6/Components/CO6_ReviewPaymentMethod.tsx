import { useTypedSelector_v2 } from '@hooks_v2/index';
import { _CO6_Screens } from '@templates/checkout/checkoutType6/CO6_Extras';
import React from 'react';

interface _Props {
  setScreenToShow: (value: React.SetStateAction<_CO6_Screens>) => void;
  isMethodSelected: boolean;
}
const CO6_ReviewPaymentMethod: React.FC<_Props> = ({ setScreenToShow }) => {
  const { payment, shippingMethod } = useTypedSelector_v2(
    (state) => state.checkout,
  );
  const { currency } = useTypedSelector_v2((state) => state.store);

  const showShippingMethodReview = () => {
    if (shippingMethod.name || shippingMethod.price > 0) return true;
    return false;
  };

  const paymentMethodAdded =
    !!payment.poNumber || !!payment.creditCard.nameOnCard;

  return (
    <div className='bg-light-gray flex-1 w-full md:w-6/12 mt-[15px] ml-[15px] mr-[15px] mb-[30px]'>
      {showShippingMethodReview() && (
        <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
          <div className='flex flex-wrap items-center justify-between pt-[10px] border-b border-[#ececec]'>
            <div className='pb-[10px] text-title-text'>Shipping Method</div>
            <div className='text-default-text'>
              <button
                className='!text-anchor hover:!text-anchor-hover'
                onClick={() => setScreenToShow('addShipping')}
                disabled={!paymentMethodAdded}
              >
                Change
              </button>
            </div>
          </div>

          <div className='text-default-text mt-[10px] mb-[15px]'>
            {`Shipping Method:${
              shippingMethod.name
            }(${currency}${shippingMethod.price.toFixed(2)})`}
          </div>
        </div>
      )}
      <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
        <div className='flex flex-wrap items-center justify-between pt-[10px] border-b border-[#ececec]'>
          <div className='pb-[10px] text-title-text'>Payment Method</div>
          <div className='text-default-text'>
            <button
              className='!text-anchor hover:!text-anchor-hover'
              onClick={() => setScreenToShow('addPaymentMethodAndBilling')}
              disabled={!paymentMethodAdded}
            >
              Change
            </button>
          </div>
        </div>
        {!paymentMethodAdded && (
          <div className='text-default-text mt-[10px] mb-[15px]'>
            Provide payment details below
          </div>
        )}

        {paymentMethodAdded && payment.method === 'CREDIT_CARD' && (
          <>
            <div className='text-default-text mt-[10px] mb-[15px]'>
              Payment Method: CREDIT CARD
            </div>
            <div className='text-default-text mt-[10px] mb-[15px]'>
              Name on card: {payment.creditCard.nameOnCard}
            </div>
            <div className='text-default-text mt-[10px] mb-[15px]'>
              Card Number: Card Ending in{' '}
              {payment.creditCard.ccNumber.slice(-4)}
            </div>
          </>
        )}
        {paymentMethodAdded && payment.method === 'PURCHASE_ORDER' && (
          <>
            <div className='text-default-text mt-[10px] mb-[15px]'>
              Payment Method: PO
            </div>
            <div className='text-default-text mt-[10px] mb-[15px]'>
              PO Number: {payment.poNumber}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CO6_ReviewPaymentMethod;
