import { __pagesText } from '@constants/pages.text';
import {
  _MyAcc_OrderBillingDetails,
  _MyAcc_OrderProductDetails,
} from '@definations/APIs/user.res';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { useRouter } from 'next/router';
import React from 'react';
import TY6_Address from './Components/TY6_Address';
import TY6_CostSummary from './Components/TY6_CostSummary';
import TY6_Product from './Components/TY6_Product';

interface _Props {
  order: {
    billing: _MyAcc_OrderBillingDetails | null;
    product: _MyAcc_OrderProductDetails[] | null;
  };
}

const ThankYouType6: React.FC<_Props> = ({ order }) => {
  const { email_address: storeEmail, phone_number: storePhoneNumber } =
    useTypedSelector_v2((state) => state.store);
  const name = useTypedSelector_v2((state) => state.user.customer?.name);
  const messages = useTypedSelector_v2((state) => state.sbStore.messages);
  const router = useRouter();
  const dateTimeInParts = new Date(order.billing?.orderDate as Date);
  return (
    <>
      <section id=''>
        <div className=''>
          <div className='container mx-auto px-[10px]'>
            <div className=' bg-[#ffffff] w-full pt-[20px] pb-[40px] inline-black'>
              <div className='container pl-[15px] pr-[15px] mx-auto mt-[15px]'>
                <div className='text-default-text font-[600] mb-[10px]'>
                  Dear {name},
                </div>
                <div className='text-extra-small-text mb-[10px]'>
                  Thank you for your order from the USAA store. Orders will ship
                  starting early 2023. We ship from RI via United States postal
                  Service First-Class Mail. if you have any questions about your
                  order. please contact us
                  <a
                    href='mailto:customerservice@parsonskellogg.com'
                    className='text-secondary'
                  >
                    {storeEmail}
                  </a>
                  . Your order confirmation is below.
                </div>
                <div className=''>
                  <span className='text-sub-text pb-[8px] block'>
                    Your Order Number Is:
                    <span className='text-secondary'>
                      {order.billing?.id}
                    </span>{' '}
                    - {dateTimeInParts.toLocaleDateString()}{' '}
                    {dateTimeInParts.toLocaleTimeString()}
                  </span>
                  <span className='pb-[8px] text-default-text block'>
                    You will receive a confirmation shortly at{' '}
                    {order.billing?.email}, You can access your account at your
                    account
                  </span>
                  <span className='block text-default-text'>
                    <button
                      onClick={() =>
                        router.push(
                          `/Orders/OrderInvoice?orderNumber=${order.billing?.id}`,
                        )
                      }
                      title='Print Receipt'
                      className='text-secondary'
                    >
                      {__pagesText.ThankYouPage.PrintReciept}
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id=''>
        <div className=''>
          <div className='container mx-auto'>
            <div className='bg-[#ffffff] w-full px-[10px] '>
              <div className='bg-[#ffffff]'>
                <div className='bg-light-gray text-center pt-[25px] pb-[25px] pl-[20px] pr-[20px] tracking-[3px] text-title-text block mb-[30px]'>
                  DETAILED ORDER RECEIPT
                </div>
                <div className=''>
                  <div className='py-[15px]'>
                    <ul
                      role='list'
                      className='border-b border-gray-border divide-y divide-gray-300'
                    >
                      {order.product?.map((product) => {
                        return (
                          <TY6_Product key={product.productId} {...product} />
                        );
                      })}
                    </ul>
                    <div className='flex justify-start text-default-text'>
                      <div className='md:max-w-[500px] w-full'>
                        <div className='flex justify-between pt-[8px]'>
                          <TY6_Address title='Bill' billing={order.billing} />
                          <TY6_Address title='Ship' billing={order.billing} />
                        </div>
                      </div>
                    </div>

                    <div className='flex justify-end text-default-text'>
                      <div className='md:max-w-[400px] w-full'>
                        <TY6_CostSummary billing={order.billing} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ThankYouType6;
