import Price from '@appComponents/Price';
import { __pagesText } from '@constants/pages.text';
import { _MyAcc_OrderBillingDetails } from '@definations/APIs/user.res';
import React from 'react';

interface _props {
  billing: _MyAcc_OrderBillingDetails | null;
}

const ThankYouSubTotal: React.FC<_props> = ({ billing }) => {
  return (
    <>
      <div className='flex justify-end text-medium-text'>
        <div className='md:max-w-[400px] w-full'>
          <dl className=''>
            <div className='flex justify-between pt-[8px]'>
              <dt className='font-[600]'>
                {__pagesText.ThankYouPage.TotalSummary.SubTotal}
              </dt>
              <dd>
                <Price value={billing?.orderSubtotal} />
              </dd>
            </div>
            <div className='flex justify-between pt-[8px]'>
              <dt className='font-[600]'>
                {__pagesText.ThankYouPage.TotalSummary.Shipping}
              </dt>
              <dd>
                <Price value={billing?.orderShippingCosts} />
              </dd>
            </div>
            <div className='flex justify-between border-t mt-[8px] border-gray-border pt-[8px]'>
              <dt className='font-[600] pt-[8px]'>
                {__pagesText.ThankYouPage.TotalSummary.GrandTotal}
              </dt>
              <dd className='font-[600] pt-[8px]'>
                <Price value={billing?.orderTotal} />
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default ThankYouSubTotal;
