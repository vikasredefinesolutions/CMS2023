import {
  _MyAcc_OrderBillingDetails,
  _MyAcc_OrderProductDetails,
} from '@definations/APIs/user.res';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React from 'react';
import TY5_Address from './Components/TY5_Address';
import TY5_CostSummary from './Components/TY5_CostSummary';
import TY5_Product from './Components/TY5_Product';

interface _Props {
  order: {
    billing: _MyAcc_OrderBillingDetails | null;
    product: _MyAcc_OrderProductDetails[] | null;
  };
}

const ThankYouType5: React.FC<_Props> = ({ order }) => {
  const { email_address: storeEmail, phone_number: storePhoneNumber } =
    useTypedSelector_v2((state) => state.store);
  const messages = useTypedSelector_v2((state) => state.sbStore.messages);

  return (
    <>
      <section id=''>
        <div className='container mx-auto'>
          <div className='bg-[#ffffff] pt-[10px]'>
            <div className='px-[10px]'>
              <div className='bg-secondary w-full pt-[20px] pb-[20px]'>
                <div className='pl-[15px] pr-[15px] pb-[15px] pt-[15px] w-full'>
                  <div className='text-center'>
                    <img
                      src='images/thank-you-icon.png'
                      alt='Thank you'
                      className='mx-auto border-2 rounded-full pl-[15px] pr-[15px] pb-[15px] pt-[15px]'
                    />
                    <span className='block text-[#ffffff] text-large-text pt-[8px] pb-[8px]'>
                      Thank You, {order.billing?.firstName}
                    </span>
                    <span className='block text-[#ffffff] text-medium-text pt-[8px] pb-[8px]'>
                      FOR YOUR ORDER
                    </span>
                  </div>
                  <div className='md:flex md:justify-between md:items-center text-center md:text-left'>
                    <div className='pt-[8px]'>
                      {messages.orderSuccessMessage && (
                        <span className='text-title-text pb-[8px] block text-[#ffffff]'>
                          {messages.orderSuccessMessage}
                        </span>
                      )}
                      <span className='text-title-text pb-[8px] block text-[#ffffff]'>
                        YOUR ORDER NUMBER IS: {order.billing?.id}
                      </span>
                      <span className='pb-[8px] text-default-text text-[#ffffff] block md:pr-[20px]'>
                        You will receive a confirmation shortly at
                        {order.billing?.email}, You can access your account at
                        your account
                      </span>
                      {/* <span className='text-[#ffffff] block text-default-text pb-[8px]'>
                        <a
                          href='javascript:void(0)'
                          title='Print Reciept'
                          className='text-[#ffffff] underline hover:no-underline'
                        >
                          Print Reciept
                        </a>
                      </span> */}
                    </div>
                    <div className='pt-[8px]'>
                      {/* <span className='text-title-text pb-[8px] block text-[#ffffff]'>
                        Questions?
                      </span>
                      <span className='pb-[8px] text-default-text text-[#ffffff] block'>
                        Call Us:&nbsp; {storePhoneNumber}
                      </span>
                      <span className='text-[#ffffff] block text-default-text pb-[8px]'>
                        <Link href=''>
                          <a
                            title='Email'
                            className='text-[#ffffff] underline hover:no-underline'
                          >
                            {storeEmail}
                          </a>
                        </Link>
                      </span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id=''>
        <div className='container mx-auto'>
          <div className='bg-[#ffffff] pt-[20px] pb-[20px] px-[10px]'>
            <div
              className='w-full'
              // x-data='{open : false}'
            >
              <div className='border border-gray-border'>
                <div className='mb-0'>
                  <button
                    className='relative flex justify-between items-center w-full py-[15px] px-[20px] !text-primary text-left bg-[#ffffff] border-0 rounded-none transition focus:outline-none text-title-text'
                    type='button'
                    //  @click="open = !open"
                  >
                    Detailed Order Reciept : {order.billing?.id}
                    <span className='material-icons-outlined'>expand_more</span>
                  </button>
                </div>
                <div
                  className=''
                  // x-show='open'
                >
                  <div className='pl-[15px] pr-[15px] pb-[15px] pt-[15px]'>
                    <ul
                      role='list'
                      className='border-b border-gray-border divide-y divide-gray-300'
                    >
                      {order.product?.map((product) => {
                        return (
                          <TY5_Product key={product.productId} {...product} />
                        );
                      })}
                    </ul>
                    <div className='flex flex-wrap justify-between text-medium-text'>
                      <div className='lg:max-w-[500px] md:w-1/2 md:pr-[10px] w-full'>
                        <div className='flex justify-between pt-[8px]'>
                          <TY5_Address title='Bill' billing={order.billing} />
                          <TY5_Address title='Ship' billing={order.billing} />
                        </div>
                      </div>
                      <TY5_CostSummary billing={order.billing} />
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

export default ThankYouType5;
