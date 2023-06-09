/* eslint-disable no-unused-vars */
import NxtImage from '@appComponents/reUsable/Image';
import { SIMPLI_SAFE_CODE } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { _ThankYouProps } from '@templates/ThankYou/ThankYou';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import ThankYouCreatePassword from './ThankYouCreatePassword';

const ThankYouHeader: React.FC<_ThankYouProps> = ({ order }) => {
  const { email_address: storeEmail, code: storeCode } = useTypedSelector_v2(
    (state) => state.store,
  );
  const storePhoneNumber = useTypedSelector_v2(
    (state) => state.store.phone_number,
  );
  const isLoggedIn = useTypedSelector_v2((state) => state.user.id);
  const isGuestCustomer = useTypedSelector_v2(
    (state) => state.cart.isGuestCustomer,
  );
  const router = useRouter();
  const orderId = router.query.orderNumber;

  return (
    <>
      <section id=''>
        <div className='bg-[#ffffff]'>
          <div className='container mx-auto'>
            <div className='bg-primary w-full mt-[20px] mb-[20px]'>
              <div className='pl-[15px] pr-[15px] pb-[15px] pt-[15px] w-full '>
                <div className='text-center'>
                  <div className='mx-auto w-[50px]'>
                    <NxtImage
                      src='/assets/images/thank-you-icon.png'
                      isStatic
                      alt=''
                      className='mx-auto border-2 rounded-full pl-[15px] pr-[15px] pb-[15px] pt-[15px]'
                    />
                  </div>
                  <span className='block text-[#ffffff] text-large-text pt-[8px] pb-[8px]'>
                    {__pagesText.ThankYouPage.ThankYouLabel}{' '}
                    {order.billing?.firstName}
                  </span>
                  <span className='block text-[#ffffff] text-medium-text pt-[8px] pb-[8px]'>
                    {__pagesText.ThankYouPage.ForYourOrder}
                  </span>
                </div>
                <div className='md:flex md:justify-between md:items-center text-center md:text-left'>
                  <div className='pt-[8px]'>
                    <span className='text-title-text pb-[8px] block text-[#ffffff]'>
                      {__pagesText.ThankYouPage.OrderNumber} {order.billing?.id}
                    </span>
                    {isGuestCustomer && !isLoggedIn && (
                      <ThankYouCreatePassword />
                    )}
                    <span className='pb-[8px] text-default-text text-[#ffffff] block pr-[20px]'>
                      {__pagesText.ThankYouPage.FirstEmailMessage}
                      {order.billing?.email}
                      {__pagesText.ThankYouPage.LastEmailMessage}
                    </span>
                    <span className='text-[#ffffff] block text-default-text pb-[8px] hidden'>
                      <button
                        onClick={() =>
                          router.push(
                            `/Orders/OrderInvoice?orderNumber=${orderId}`,
                          )
                        }
                        title='Print Receipt'
                        className='underline hover:no-underline'
                      >
                        {__pagesText.ThankYouPage.PrintReciept}
                      </button>
                    </span>
                  </div>
                  {storeCode !== SIMPLI_SAFE_CODE && (
                    <div className='pt-[8px]'>
                      <span className='text-title-text pb-[8px] block text-[#ffffff]'>
                        {__pagesText.ThankYouPage.Questions}
                      </span>
                      <span className='pb-[8px] text-default-text text-[#ffffff] block'>
                        {__pagesText.ThankYouPage.CallUs} {storePhoneNumber}
                      </span>
                      <span className='pb-[8px] text-default-text text-[#ffffff] block'>
                      {__pagesText.ThankYouPage.Email}:{' '}
                      <Link href={''}>
                        <a className='text-[#ffffff] underline hover:no-underline' href={`mailto:${storeEmail}`}>
                           {storeEmail}
                        </a>
                      </Link>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ThankYouHeader;
