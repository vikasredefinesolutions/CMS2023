import { __pagesText } from '@constants/pages.text';
import { _ThankYouProps } from '@templates/ThankYou/ThankYou';
import React, { Fragment } from 'react';
import ThankYouSubTotal from '../../CommonComponents/ThankYouSubTotal';
import ThankYouProduct from './ThankYouProduct';

const ThankYouAccordian: React.FC<_ThankYouProps> = ({ order }) => {
  return (
    <>
      <div className='accordion w-full mb-[30px]' id='accordionExample'>
        <div className='accordion-item !rounded-none bg-[#ffffff] border border-gray-border'>
          <h2 className='accordion-header mb-0' id='headingOne'>
            <button
              className='accordion relative flex items-center w-full py-4 px-5 !text-primary text-left bg-white border rounded-none transition focus:outline-none text-2xl '
              type='button'
            >
              {__pagesText.ThankYouPage.AccordianHeader}
              {order.billing?.id}
            </button>
          </h2>
          <div
            id='collapseOne'
            className='accordion-collapse'
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
