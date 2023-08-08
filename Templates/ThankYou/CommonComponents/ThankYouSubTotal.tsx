import Price from '@appComponents/Price';
import { _Store_CODES } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { _MyAcc_OrderBillingDetails } from '@definations/APIs/user.res';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React from 'react';

interface _props {
  billing: _MyAcc_OrderBillingDetails | null;
}

const ThankYouSubTotal: React.FC<_props> = ({ billing }) => {
  const { code: storeCode } = useTypedSelector_v2((state) => state.store);
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

            {(storeCode !== 'DI' && storeCode !== 'PMCG') && (
              <div className='flex justify-between pt-[8px]'>
                <dt className='font-[600]'>
                  {__pagesText.ThankYouPage.TotalSummary.LinePersonalization}
                </dt>
                <dd>
                  <Price value={billing?.lineFinalTotal} />
                </dd>
              </div>
            )}
            {(storeCode !== 'DI' && storeCode !== 'PMCG') && (
              <div className='flex justify-between pt-[8px]'>
                <dt className='font-[600]'>
                  {__pagesText.ThankYouPage.TotalSummary.LogoCost}
                </dt>
                <dd>
                  <Price value={billing?.logoFinalTotal} />
                </dd>
              </div>
            )}
            {storeCode === _Store_CODES.PKHG && (
              <div className='flex justify-between pt-[8px]'>
                <dt className='font-[600]'>
                  {__pagesText.ThankYouPage.TotalSummary.smallRunningFee}
                </dt>
                <dd className=''>
                  {billing?.orderSmallRunFee &&
                  billing?.orderSmallRunFee > 0 ? (
                    <Price value={billing?.orderSmallRunFee} />
                  ) : (
                    'FREE'
                  )}
                </dd>
              </div>
            )}
            <div className='flex justify-between pt-[8px]'>
              <dt className='font-[600]'>
                {__pagesText.ThankYouPage.TotalSummary.Shipping}
              </dt>
              <dd>
                <Price value={billing?.orderShippingCosts} />
              </dd>
            </div>
            {storeCode !== 'DI' && (
              <div className='flex justify-between pt-[8px]'>
                <dt className='font-[600]'>
                  {__pagesText.ThankYouPage.TotalSummary.Tax}
                </dt>
                <dd>
                  <Price value={billing?.orderTax} />
                </dd>
              </div>
            )}
            {storeCode !== 'DI' &&
            billing?.sewoutTotal &&
            billing?.sewoutTotal > 0 ? (
              <div className='flex justify-between pt-[8px]'>
                <dt className='font-[600]'>
                  {__pagesText.ThankYouPage.TotalSummary.SewOut}
                </dt>
                <dd>
                  <Price value={billing?.sewoutTotal} />
                </dd>
              </div>
            ) : null}
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
                {__pagesText.ThankYouPage.TotalSummary.GrandTotalPMCG}
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
