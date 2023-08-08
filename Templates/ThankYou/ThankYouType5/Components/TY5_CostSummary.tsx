import Price from '@appComponents/Price';
import { _MyAcc_OrderBillingDetails } from '@definations/APIs/user.res';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import {
  FetchSbCouponRebates,
  FetchSbStoreFees,
  FetchSbStoreFixedFees,
  _SbStoreCouponRebates,
  _SbStoreFees,
  _SbStoreFixedFees,
} from '@services/sb.service';
import React, { useEffect, useState } from 'react';

interface _Props {
  billing: _MyAcc_OrderBillingDetails | null;
}

const TY5_CostSummary: React.FC<_Props> = ({ billing }) => {
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const [fees, setFees] = useState<{
    multipleFees: {
      name: string;
      amount: number;
      type: 'percentage' | 'number';
    }[];
    rebates: {
      name: string;
      amount: number;
      type: 'percentage' | 'number';
      couponCode: string;
    }[];
    fixedFees: number;
    cardFees: number;
  }>({
    multipleFees: [],
    rebates: [],
    fixedFees: 0,
    cardFees: 0,
  });

  const handleFees = (rawFees: _SbStoreFees[] | null) => () => {
    if (!rawFees) return;

    const multipleFees: {
      name: string;
      amount: number;
      type: 'percentage' | 'number';
    }[] = [];
    rawFees.forEach((item) => {
      if (item.type === 1) {
        multipleFees.push({
          name: item.name,
          amount: item.amount,
          type: 'percentage',
        });
        return;
      }

      multipleFees.push({
        name: item.name,
        amount: item.amount,
        type: 'number',
      });
    });
    setFees((prev) => ({
      ...prev,
      multipleFees: multipleFees,
    }));
  };

  const handleRebates = (rawRebates: _SbStoreCouponRebates[] | null) => {
    if (!rawRebates) return;

    const rebates: {
      name: string;
      amount: number;
      couponCode: string;
      type: 'percentage' | 'number';
    }[] = [];

    rawRebates.forEach((item) => {
      if (item.type === 1) {
        rebates.push({
          name: item.name,
          amount: item.amount,
          type: 'percentage',
          couponCode: item.couponCodes,
        });
        return;
      }

      rebates.push({
        name: item.name,
        amount: item.amount,
        type: 'number',
        couponCode: item.couponCodes,
      });
    });
    setFees((prev) => ({
      ...prev,
      rebates: rebates,
    }));
  };

  const handleFixedFees = (fixedFees: _SbStoreFixedFees | null) => {
    if (!fixedFees) return null;

    setFees((prev) => ({
      ...prev,
      fixedFees: fixedFees.fixedCharge || 0,
      cardFees: fixedFees.cardProcessingCharge || 0,
    }));
  };

  const callFeeAPIs = async () => {
    await Promise.allSettled([
      FetchSbStoreFixedFees({ storeId: storeId }),
      FetchSbStoreFees({ storeId: storeId }),
      FetchSbCouponRebates({ storeId: storeId }),
    ])
      .then((values) => {
        if (values[0].status === 'fulfilled') {
          handleFixedFees(values[0].value);
        }
        if (values[1].status === 'fulfilled') {
          handleFees(values[1].value);
        }
        if (values[2].status === 'fulfilled') {
          handleRebates(values[2].value);
        }
      })
      .catch(() => {})
      .finally(() => {});
  };

  useEffect(() => {
    callFeeAPIs();
  }, []);

  return (
    <div className='lg:max-w-[400px] md:pl-[10px] md:w-1/2 w-full'>
      <dl className='pt-[15px]'>
        <div className='flex justify-between pt-[8px]'>
          <dt className='font-[600]'>Sub Total:</dt>
          <dd className=''>
            <Price value={billing?.orderSubtotal || 0} />
          </dd>
        </div>
        <div className='flex justify-between pt-[8px]'>
          <dt className=''>Shipping & Handling:</dt>
          <dd className=''>
            <Price value={billing?.orderShippingCosts || 0} />
          </dd>
        </div>
        <div className='flex justify-between pt-[8px]'>
          <dt className=''>Tax:</dt>
          <dd className=''>
            <Price value={billing?.orderTax || 0} />
          </dd>
        </div>
        {fees.multipleFees.map((fee) => {
          let feeToShow = fee.amount;
          if (fee.type === 'percentage') {
            feeToShow = (billing?.orderSubtotal || 0 * fee.amount) / 100;
          }

          return (
            <div className='flex justify-between pt-[8px]'>
              <dt className=''>{fee.name}:</dt>
              <dd className=''>
                <Price value={feeToShow} />
              </dd>
            </div>
          );
        })}
        {fees.rebates.map((rebate) => {
          let rebateToShow = rebate.amount;
          if (rebate.type === 'percentage') {
            rebateToShow = (billing?.orderSubtotal || 0 * rebate.amount) / 100;
          }

          if (rebate.couponCode.length > 0) {
            return null;
          }

          return (
            <div className='flex justify-between pt-[8px]'>
              <dt className=''>{rebate.name}:</dt>
              <dd className=''>
                - <Price value={rebateToShow} />
              </dd>
            </div>
          );
        })}
        {(billing?.couponDiscountAmount || 0) > 0 && (
          <div className='flex justify-between pt-[8px]'>
            <dt className=''>Estimated Total:</dt>
            <dd className=''>
              <Price value={billing?.orderTotal || 0} />
            </dd>
          </div>
        )}
        <div className='flex justify-between pt-[8px]'>
          <dt className=''>Estimated Total:</dt>
          <dd className=''>
            <Price value={billing?.orderTotal || 0} />
          </dd>
        </div>
        <div className='flex justify-between pt-[8px]'>
          <dt className=''>GameDay Gear Fees:</dt>
          <dd className=''>
            <Price value={fees.fixedFees || 0} />
          </dd>
        </div>{' '}
        {fees.cardFees > 0 && (
          <div className='flex justify-between pt-[8px]'>
            <dt className=''>Convenience Fee:</dt>
            <dd className=''>
              <Price value={fees.cardFees || 0} />
            </dd>
          </div>
        )}
        <div className='flex justify-between border-t mt-[8px] border-gray-border pt-[8px]'>
          <dt className='font-[600] pt-[8px]'>Grand Total:</dt>
          <dd className='font-[600] pt-[8px]'>
            <Price value={billing?.orderTotal || 0} />
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default TY5_CostSummary;
