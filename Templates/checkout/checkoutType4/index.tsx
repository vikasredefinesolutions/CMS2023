import { paths } from '@constants/paths.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import CO4_BillingAddress from './Components/CO4_BillingAddress';
import CO4_OrderReview from './Components/CO4_OrderReview';
import CO4_OrderSummary from './Components/CO4_OrderSummary';
import CO4_PaymentMethods from './Components/CO4_PaymentMethods';
import CO4_ShippingAddress from './Components/CO4_ShippingAddress';

interface _Props {
  templateId: number;
}

const CheckoutType4: React.FC<_Props> = ({ templateId }) => {
  const sbStore = useTypedSelector_v2((state) => state.sbStore);
  const { billingAddress, shippingAddress, payment } = useTypedSelector_v2(
    (state) => state.checkout,
  );

  const [placeOrReviewBtn, setPlaceOrReviewBtn] = useState<
    'reviewBtn' | 'placeOrder'
  >('reviewBtn');

  const enableReviewOrder =
    !!billingAddress && !!shippingAddress && payment.valid;

  useEffect(() => {
    if (!enableReviewOrder) {
      setPlaceOrReviewBtn('reviewBtn');
    }
  }, [enableReviewOrder]);

  return (
    <div className='container mx-auto pl-[15px] pr-[15px] mt-[60px] mb-[50px]'>
      <div className='flex flex-wrap justify-between -mx-[15px]'>
        <div className='w-full md:w-8/12 lg:w-[72%] pl-[15px] pr-[15px]'>
          <div className='flex justify-between items-center bg-light-gray w-full pl-[15px] pr-[15px] pt-[17px] pb-[17px] mb-[20px]'>
            <div className='text-title-text mr-[15px] font-semibold'>
              Checkout
            </div>
            <div className='text-[#8b0520] text-medium-text tracking-normal'>
              All fields marked * are required.
            </div>
          </div>
          {/* {orgOrUserShippingAddress === 'orgAddress' && <CO4_Login />} */}
          <div id='ShippingPaymentMain'>
            <div className='flex flex-wrap -mx-[15px] -mt-[21px]'>
              <div className='w-full lg:w-1/2 pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                <CO4_ShippingAddress />
              </div>
              <div className='w-full lg:w-1/2 pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
                <CO4_PaymentMethods methods={'bulk_payment'} />
                <CO4_BillingAddress />
              </div>
            </div>
          </div>
          {placeOrReviewBtn === 'placeOrder' && <CO4_OrderReview />}
        </div>
        <div className='w-full md:w-4/12 lg:w-[27%] pl-[15px] pr-[15px]'>
          <CO4_OrderSummary />
          <div className=''>
            {placeOrReviewBtn === 'reviewBtn' && (
              <button
                className='btn btn-lg !w-full text-center btn-secondary mb-[8px]'
                id='btn-review-order'
                disabled={!enableReviewOrder}
                onClick={() => setPlaceOrReviewBtn('placeOrder')}
              >
                REVIEW ORDER
              </button>
            )}
            {placeOrReviewBtn === 'placeOrder' && (
              <Link
                href={paths.ThankYou}
                className='btn btn-lg !w-full text-center btn-secondary mb-[8px]'
                id='btn-place-order'
              >
                PLACE ORDER
              </Link>
            )}
          </div>
          <div className='bg-light-gray pl-[15px] pr-[15px] pt-[15px] pb-[15px] text-center mb-[15px]'>
            <div className='text-2xl font-medium mb-4 align-middle'>
              <span className='material-icons !text-anchor align-middle'>
                verified{' '}
              </span>
              <span className='align-middle text-title-text font-semibold tracking-normal'>
                Order Risk-Free!
              </span>
            </div>
            <div className='text-medium-text font-semibold tracking-normal'>
              Cancel your order without penalty anytime before your proof is
              approved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutType4;
