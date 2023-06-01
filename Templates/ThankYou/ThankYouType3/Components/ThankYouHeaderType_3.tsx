import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { _ThankYouProps } from '@templates/ThankYou/ThankYou';
import React from 'react';
const ThankYouHeaderType_3: React.FC<_ThankYouProps> = ({ order }) => {
  const storeEmail = useTypedSelector_v2((state) => state.store.email_address);
  const storePhoneNumber = useTypedSelector_v2(
    (state) => state.store.phone_number,
  );
  return (
    <section id='mt-[20px]'>
      <div className='bg-[#ffffff]'>
        <div className='container mx-auto'>
          <div className='w-full mt-[20px] mb-[20px]'>
            <div className='pl-[15px] pr-[15px] pb-[15px] pt-[15px] w-full'>
              <div className='text-center'>
                <span className='block text-primary text-large-text pt-[8px] pb-[8px]'>
                  {__pagesText.ThankYouPage.ThankYouLabel}
                  {order?.billing?.billingFirstName}
                </span>
                <span className='block text-primary text-medium-text pt-[8px] pb-[8px]'>
                  {__pagesText.ThankYouPage.ForYourOrder}
                </span>
              </div>
              <div className='md:flex md:justify-between md:items-center text-center md:text-left'>
                <div className='pt-[8px]'>
                  <span className='text-title-text pb-[8px] block text-primary'>
                    {__pagesText.ThankYouPage.OrderNumber} {order.billing?.id}
                  </span>{' '}
                  <span className='pb-[8px] text-default-text text-primary block md:pr-[20px]'>
                    We will email you a tracking number when your order ships.
                    When you receive the goods, be sure to count and review
                    everything before distributing out. Any discrepancies or
                    issues must be reported to our sales support team within 10
                    days.{' '}
                  </span>
                  <span className='text-primary block text-default-text pb-[8px]'>
                    <a
                      href='javascript:void(0)'
                      title='Print Reciept'
                      className='text-primary underline hover:no-underline'
                      onClick={() => window.print()}
                    >
                      Print Reciept
                    </a>
                  </span>
                </div>
                <div className='pt-[8px]'>
                  <span className='text-title-text pb-[8px] block text-primary'>
                    {__pagesText.ThankYouPage.Questions}
                  </span>{' '}
                  <span className='pb-[8px] text-default-text text-primary block'>
                    {__pagesText.ThankYouPage.CallUs}
                    <a
                      href={`tel:${storePhoneNumber}`}
                      className='text-primary underline hover:no-underline'
                    >
                      {storePhoneNumber}
                    </a>
                  </span>{' '}
                  <span className='text-primary block text-default-text pb-[8px]'>
                    Email:{' '}
                    <a
                      href={`mailto:${storeEmail}`}
                      className='text-primary underline hover:no-underline'
                    >
                      {storeEmail}
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ThankYouHeaderType_3;
