/* eslint-disable no-unused-vars */
// import Price from '@appComponents/Price';
// import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from 'hooks_v2';
import React, { useState } from 'react';
// import QtyPriceTable from './PriceTable';
// import { _DiscountPricingProps } from './productDetailsComponents';

import { __pagesText } from '@constants/pages.text';
import { _DiscountPricingProps } from '@templates/ProductDetails/Components/productDetailsComponents';
import QtyPriceTable from './PriceTable';

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
        <div
          className={`bg-primary text-white flex flex-wrap justify-between items-center p-[5px] md:p-0 md:pl-[10px] mt-[15px]`}
        >
          <span className={'text-default-text font-semibold text-white'}>
            {__pagesText.productInfo.discountPricing.discountPricing}
          </span>
          <a
            href='javascript:void(0);'
            onClick={() => setShowMsg((show) => !show)}
            className='text-tertiary hover:text-white py-[5px] md:px-[10px] flex flex-wrap text-default-text font-semibold uppercase items-center'
          >
            <span className='mr-1'>
              {__pagesText.productInfo.discountPricing.minimumOrder}
            </span>
            {` ${minQty} ${unitUnits} per color `}
          </a>
        </div>

        {/* {!customerId && isSpecialBrand && (
          <>
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
              {showMinQuantity() ? (
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
        )} */}

        {/* {isSpecialBrand ? (
          customerId !== null ? (
            <QtyPriceTable storeCode={storeCode} />
          ) : (
            // <AskToLogin modalHandler={modalHandler} />
          )
        ) : (
          )} */}
        <QtyPriceTable storeCode={storeCode} />
      </div>

      {showMsg && (
        <div className='text-default-text pt-[10px] pb-[10px]' id='divMinorder'>
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
