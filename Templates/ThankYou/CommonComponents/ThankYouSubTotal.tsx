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
          <dl className='pt-[15px]'>
            <div className='flex justify-between pt-[8px]'>
              <dt className='font-[600]'>
                {__pagesText.ThankYouPage.TotalSummary.SubTotal}
              </dt>
              <dd>
                <Price value={billing?.orderSubtotal} />
              </dd>
            </div>
            {billing?.couponDiscountAmount &&
            billing?.couponDiscountAmount > 0 ? (
              <div className='flex justify-between pt-[8px]'>
                <dt className='font-[600]'>
                  {__pagesText.ThankYouPage.TotalSummary.couponDiscountAmount}
                </dt>
                <dd>
                  -<Price value={billing?.couponDiscountAmount} />
                </dd>
              </div>
            ) : null}

            <div className='flex justify-between pt-[8px]'>
              <dt className='font-[600]'>
                {__pagesText.ThankYouPage.TotalSummary.LinePersonalization}
              </dt>
              <dd>
                <Price value={billing?.lineFinalTotal} />
              </dd>
            </div>
            <div className='flex justify-between pt-[8px]'>
              <dt className='font-[600]'>
                {__pagesText.ThankYouPage.TotalSummary.LogoCost}
              </dt>
              <dd>
                <Price value={billing?.logoFinalTotal} />
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
            <div className='flex justify-between pt-[8px]'>
              <dt className='font-[600]'>
                {__pagesText.ThankYouPage.TotalSummary.Tax}
              </dt>
              <dd>
                <Price value={billing?.orderTax} />
              </dd>
            </div>
            <div className='flex justify-between pt-[8px]'>
              <dt className='font-[600]'>
                {__pagesText.ThankYouPage.TotalSummary.SewOut}
              </dt>
              <dd>
                <Price value={billing?.sewoutTotal} />
              </dd>
            </div>
            {billing?.orderSmallRunFee && billing?.orderSmallRunFee > 0 ? (
              <div className='flex justify-between pt-[8px]'>
                <dt className='font-[600]'>
                  {__pagesText.ThankYouPage.TotalSummary.smallRunningFee}
                </dt>
                <dd>
                  <Price value={billing?.orderSmallRunFee} />
                </dd>
              </div>
            ) : null}
            {billing?.orderLogoSetupFee && billing?.orderLogoSetupFee > 0 ? (
              <div className='flex justify-between pt-[8px]'>
                <dt className='font-[600]'>
                  {__pagesText.ThankYouPage.TotalSummary.orderLogoSetupFee}
                </dt>
                <dd>
                  <Price value={billing?.orderLogoSetupFee} />
                </dd>
              </div>
            ) : null}

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
