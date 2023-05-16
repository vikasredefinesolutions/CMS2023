/* eslint-disable no-unused-vars */
import Price from '@appComponents/Price';
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

  const customerId = useTypedSelector_v2((state) => state.user.id);
  const { minQty } = useTypedSelector_v2((state) => state.product.toCheckout);

  const showMinQuantity = minQty > 0;
  const unitUnits = minQty > 1 ? 'units' : 'unit';

  return (
    <>
      <div>
        <div className='bg-primary flex flex-wrap justify-between items-center pl-[10px] pr-[10px] pt-[4px] pb-[5px] mt-[16px] text-default-text'>
          <span className='font-[600] text-[#ffffff] text-sub-text'>
            {title === 'selectsizeandquanity'
              ? __pagesText.productInfo.discountPricing.selectSizeAndQuantity
              : __pagesText.productInfo.discountPricing.exclusivePricing}
          </span>

          {showMinQuantity ? (
            <button
              onClick={() => setShowMsg((show) => !show)}
              className='text-[#ffffff] hover:text-[#ffffff] pt-[6px] pb-[2px] flex flex-wrap font-[600] uppercase items-center text-small-text'
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
        </div>

        {!customerId && isSpecialBrand && (
          <div className='flex flex-wrap justify-between items-center mt-[18px] text-default-text'>
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
          </div>
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
        <div className='text-lg  p-3 pb-0 leading-8' id='divMinorder'>
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
