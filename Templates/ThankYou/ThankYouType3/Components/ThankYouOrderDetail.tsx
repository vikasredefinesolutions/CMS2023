import { __pagesText } from '@constants/pages.text';
import { _ThankYouProps } from '@templates/ThankYou/ThankYou';
import React, { Fragment } from 'react';
import ThankYouProduct from './ThankYouProduct';
import ThankyouFooterType_3 from './ThankyouFooterType_3';
const ThankYouOrderDetail: React.FC<_ThankYouProps> = ({ order }) => {
  return (
    <>
      <div className='w-full mb-[30px]'>
        <div className='bg-[#ffffff] border border-gray-border'>
          <div className='mb-0'>
            <div className='relative bg-light-gray flex justify-between items-center w-full py-[15px] px-[20px] !text-primary text-left bg-[#ffffff] border-0 rounded-none transition focus:outline-none text-title-text'>
              {__pagesText.ThankYouPage.AccordianHeader}&nbsp;
              {order.billing?.id}
            </div>
          </div>
          <div className=''>
            <div className='pl-[15px] pr-[15px] pb-[15px] pt-[15px]'>
              <ul
                role='list'
                className='border-b border-gray-border divide-y divide-gray-border'
              >
                {order.product?.map((prod, index) => (
                  <Fragment key={index}>
                    <ThankYouProduct product={prod} />
                  </Fragment>
                ))}
              </ul>
              <ThankyouFooterType_3 billing={order.billing} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThankYouOrderDetail;
