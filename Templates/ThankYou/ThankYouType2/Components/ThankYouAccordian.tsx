import Price from '@appComponents/Price';
import { PORSCHE } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { _ThankYouProps } from '@templates/ThankYou/ThankYou';
import React, { Fragment } from 'react';
import ThankYouProduct from './ThankYouProduct';

const ThankYouAccordian: React.FC<_ThankYouProps> = ({ order }) => {
  const { code: storeCode } = useTypedSelector_v2((state) => state.store);
  return (
    <>
      <div className='bg-[#ffffff] pt-[20px] pb-[20px] px-[15px]'>
        <div className='w-full' x-data='{open : false}'>
          <div className='border border-gray-border'>
            <div className='mb-0 bg-light-gray p-[10px] text-title-text text-center'>
              Detailed Order Reciept
            </div>
            <div className=''>
              <div className='pl-[15px] pr-[15px] pb-[15px] pt-[15px]'>
                <ul
                  role='list'
                  className='border-b border-gray-border divide-y divide-gray-300'
                >
                  {order.product?.map((prod, index) => (
                    <Fragment key={index}>
                      <ThankYouProduct product={prod} />
                    </Fragment>
                  ))}
                </ul>
                <div className='flex flex-wrap justify-between text-medium-text'>
                  <div className='lg:max-w-[500px] md:w-1/2 md:pr-[10px] w-full'>
                    <div className='flex justify-between pt-[8px]'>
                      <div>
                        <div className='font-[600] pt-[15px]'>
                          {__pagesText.ThankYouPage.Billing.BillTo}
                        </div>
                        <div className='pt-[8px]'>
                          {order?.billing?.billingFirstName}{' '}
                          {order?.billing?.billingLastName}
                          <br />
                          {order?.billing?.billingAddress1}{' '}
                          {order?.billing?.billingAddress2},
                          <br />
                          {order?.billing?.billingCity}{' '}
                          {order?.billing?.billingState},
                          <br />
                          {order?.billing?.billingZip}
                        </div>
                      </div>

                      <div>
                        <div className='font-[600] pt-[15px]'>
                          {__pagesText.ThankYouPage.Billing.ShipTo}
                        </div>
                        <div className='pt-[8px]'>
                          {order?.billing?.shippingFirstName}{' '}
                          {order?.billing?.shippingLastName}
                          <br />
                          {order?.billing?.shippingAddress1}{' '}
                          {order?.billing?.shippingAddress2},
                          <br />
                          {order?.billing?.shippingCity}
                          {''}
                          {order?.billing?.shippingState},
                          <br />
                          {order?.billing?.shippingZip}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='lg:max-w-[400px] md:pl-[10px] md:w-1/2 w-full'>
                    <dl className='pt-[15px]'>
                      <div className='flex justify-between pt-[8px]'>
                        <dt className='font-[600]'>
                          {__pagesText.ThankYouPage.TotalSummary.SubTotal}
                        </dt>
                        <dd className=''>
                          <Price value={order?.billing?.orderSubtotal} />
                        </dd>
                      </div>
                      <div className='flex justify-between pt-[8px]'>
                        <dt className=''>
                          {
                            __pagesText.ThankYouPage.TotalSummary
                              .ShippingHandling
                          }
                        </dt>
                        <dd className=''>
                          <Price value={order?.billing?.orderShippingCosts} />
                        </dd>
                      </div>
                      <div className='flex justify-between pt-[8px]'>
                        <dt className=''>
                          {__pagesText.ThankYouPage.TotalSummary.Tax}
                        </dt>
                        <dd className=''>
                          <Price value={order?.billing?.orderTax} />
                        </dd>
                      </div>
                      {storeCode !== PORSCHE && (
                        <div className='flex justify-between pt-[8px]'>
                          <dt className=''>
                            {
                              __pagesText.ThankYouPage.TotalSummary
                                .InternalCredit
                            }
                          </dt>
                          <dd className=''>$0.00</dd>
                        </div>
                      )}
                      <div className='flex justify-between border-t mt-[8px] border-gray-border pt-[8px]'>
                        <dt className='font-[600] pt-[8px]'>
                          {__pagesText.ThankYouPage.TotalSummary.Total}
                        </dt>
                        <dd className='font-[600] pt-[8px]'>
                          <Price value={order?.billing?.orderTotal} />
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThankYouAccordian;
