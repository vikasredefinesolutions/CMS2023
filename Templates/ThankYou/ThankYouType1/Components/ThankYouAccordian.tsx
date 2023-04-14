import { __pagesText } from '@constants/pages.text';
import { _ThankYouProps } from '@templates/ThankYou/ThankYou';
import React, { Fragment } from 'react';
import ThankYouProduct from './ThankYouProduct';
import ThankYouSubTotal from './ThankYouSubTotal';

const ThankYouAccordian: React.FC<_ThankYouProps> = ({ order }) => {
  return (
    <>
      <div className='accordion w-full mb-[30px]' id='accordionExample'>
        <div className='accordion-item !rounded-none bg-[#ffffff] border border-gray-border'>
          <h2 className='accordion-header mb-0' id='headingOne'>
            <div className='accordion relative flex items-center w-full py-4 px-5 !text-primary text-left bg-white border-0 rounded-none transition focus:outline-none text-2xl '>
              {__pagesText.ThankYouPage.AccordianHeader}
              {order.billing?.id}
            </div>
          </h2>
          <div
            id='collapseOne'
            className='accordion-collapse show'
            aria-labelledby='headingOne'
          >
            <div className='accordion-body pl-[15px] pr-[15px] pb-[15px] pt-[15px]'>
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
              <ThankYouSubTotal billing={order.billing} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThankYouAccordian;
