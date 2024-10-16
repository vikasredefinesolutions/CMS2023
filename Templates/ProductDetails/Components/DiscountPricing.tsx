/* eslint-disable no-unused-vars */
import Price from '@appComponents/Price';
import { _Store } from '@configs/page.config';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from 'hooks_v2';
import React, { useState } from 'react';
import AskToLogin from './AskToLogin';
import QtyPriceTable from './PriceTable';
import { _DiscountPricingProps } from './productDetailsComponents';

const DiscountPricing: React.FC<
  _DiscountPricingProps & { storeCode: string }
> = ({
  title,
  price,
  showLogin,
  storeCode,
  showMsrpLine,
  modalHandler,
  isSpecialBrand,
}) => {
  const [showMsg, setShowMsg] = useState(false);
  const code  = useTypedSelector_v2((state) => state.store.code);
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const { minQty } = useTypedSelector_v2((state) => state.product.toCheckout);
  const minimumUnitsTotalPrice = useTypedSelector_v2(
    (state) => state.product.product.discounts?.minimumUnitsTotalPrice,
  );
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.empId,
  );
  const unitUnits = minQty > 1 ? 'units' : 'unit';

  const showMinQuantity = (): boolean => {
    if (isEmployeeLoggedIn) {
      return false;
    }

    return minQty > 0;
  };

  return (
    <>
      <div className=''>
        {/* <div className='bg-primary flex flex-wrap justify-between items-center pl-[10px] pr-[10px] pt-[4px] pb-[5px] mt-[16px] text-default-text'>
          <span className='font-[600] text-[#ffffff] text-sub-text'>
            {title === 'selectsizeandquanity'
              ? __pagesText.productInfo.discountPricing.selectSizeAndQuantity
              : __pagesText.productInfo.discountPricing.exclusivePricing}
          </span>

          {showMinQuantity ? (
            <button
              onClick={() => setShowMsg((show) => !show)}
              className='text-[#ffffff] hover:text-[#ffffff] pt-[6px] pb-[2px] flex flex-wrap uppercase items-center text-small-text '
              id='aMinOrder'
            >
              <span className='inline-block mr-[2px]'>
                {__pagesText.productInfo.discountPricing.minimumOrder}
              </span>
              {` ${minQty} ${unitUnits} per color for $${(
                minQty * price.msrp
              ).toFixed(2)}`}
            </button>
          ) : null}
        </div> */}
        <div
          className={` bg-primary flex flex-wrap justify-between items-center pl-[10px] pr-[10px] pt-[4px] pb-[5px] mt-[16px] text-default-text`}
        >
          <span className={'font-[600] text-[#ffffff] text-sub-text'}>
            {title === 'selectsizeandquanity'
              ? __pagesText.productInfo.discountPricing.selectSizeAndQuantity
              : __pagesText.productInfo.discountPricing.exclusivePricing}
          </span>
          {showMinQuantity() ? (
            <a
              href='javascript:void(0);'
              onClick={() => setShowMsg((show) => !show)}
              className={`${
                storeCode == _Store.type4
                  ? 'text-tertiary hover:text-white pt-[6px] pb-[2px] flex flex-wrap uppercase items-center text-small-text'
                  : 'text-[#ffffff] hover:text-[#ffffff] pt-[6px] pb-[2px] flex flex-wrap uppercase items-center text-small-text '
              }`}
            >
              <span className='mr-1'>
                {__pagesText.productInfo.discountPricing.minimumOrder}
              </span>
              {title === 'selectsizeandquanity'
                ? ` ${minQty} ${unitUnits} per color `
                : ` ${minQty} ${unitUnits} per color for $${
                    minimumUnitsTotalPrice
                      ? minimumUnitsTotalPrice
                      : (minQty * price.msrp).toFixed(2)
                  }`}
            </a>
          ) : null}
        </div>

        {!customerId && isSpecialBrand && (
          <>
            {/* <div className='flex flex-wrap justify-between items-center mt-[18px] text-default-text'>
              <div className='flex items-start'>
                <span className='font-[600] mr-[3px] text-sub-text'>
                  {__pagesText.productInfo.discountPricing.MSRP}
                  <Price
                    value={undefined}
                    prices={{
                      salePrice: price.salePrice,
                      msrp: price.msrp,
                    }}
                  />
                </span>
                {__pagesText.productInfo.discountPricing.perItem}
              </div>

              {showMinQuantity ? (
                <button
                  onClick={() => setShowMsg((show) => !show)}
                  className='uppercase items-center font-[600] text-[#000000] pb-[5px]'
                  id='aMinOrder'
                >
                  {
                    __pagesText.productInfo.discountPricing
                      .exclusivePricingAvailable
                  }
                </button>
              ) : null}
            </div> */}
            <div className='flex flex-wrap justify-between items-center mt-[18px] text-default-text'>
              <div
                className={
                  title === 'selectsizeandquanity' ? '' : 'flex item-start'
                }
              >
                <span
                  className={
                    title === 'selectsizeandquanity'
                      ? `text-medium-text font-[600px]`
                      : `mr-[3px] text-sub-text`
                  }
                >
                  {__pagesText.productInfo.discountPricing.MSRP}
                  <Price
                    value={undefined}
                    prices={{
                      salePrice: price.salePrice,
                      msrp: price.msrp,
                    }}
                  />
                </span>
                {__pagesText.productInfo.discountPricing.perItem}
              </div>
              {(code !== 'PMCG' && showMinQuantity())  ? (
                <a
                  href='javascript:void(0);'
                  className={
                    title === 'selectsizeandquanity'
                      ? `text-medium-text font-[600px]`
                      : `items-center text-[#000000] pb-[5px]`
                  }
                  onClick={() => setShowMsg((show) => !show)}
                >
                  {
                    __pagesText.productInfo.discountPricing
                      .exclusivePricingAvailable
                  }
                </a>
              ) : null}
            </div>
          </>
        )}

        {isSpecialBrand ? (
          customerId !== null ? (
            <QtyPriceTable storeCode={storeCode} />
          ) : (
            <AskToLogin modalHandler={modalHandler} />
          )
        ) : (
          <QtyPriceTable storeCode={storeCode} />
        )}
      </div>

      {showMsg && (
        <div
          className={`${
            storeCode !== _Store.type4
              ? 'text-medium-text'
              : 'text-default-text'
          } pt-[10px] pb-[10px]`}
          id='divMinorder'
        >
          {__pagesText.productInfo.discountPricing.showMsgStartingText + ' '}
          {minQty} {__pagesText.productInfo.discountPricing.showMsgMiddleText}
          <br />
          {__pagesText.productInfo.discountPricing.showMsgLastText}
        </div>
      )}
    </>
  );
};

export default DiscountPricing;
