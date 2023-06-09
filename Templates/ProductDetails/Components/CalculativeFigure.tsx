import { _Store } from '@configs/page.config';
import { __pagesText } from '@constants/pages.text';
import Price from 'appComponents_v2/reUsable/Price';
import { useTypedSelector_v2 } from 'hooks_v2';
import React from 'react';

const CalculativeFigure: React.FC = () => {
  const {
    totalPrice,
    totalQty,
    price,
    logo,
    firstLogoPrice,
    additionalLogoCharge,
    additionalSewOutCharges,
  } = useTypedSelector_v2((state) => state.product.toCheckout);
  const storeCode = useTypedSelector_v2((state) => state.store.code);

  const getPriceByStore = () => {
    if (storeCode === _Store.type4) {
      return totalPrice / totalQty;
    }

    return price;
  };
  return (
    <div className='bg-gray-100 p-[15px] flex flex-wrap items-end justify-between gap-2 mb-[10px] text-default-text'>
      <div className=''>
        <div className='py-[7px]'>
          <span className='inline-block w-40'>
            {' '}
            {
              __pagesText.productInfo.startOrderModal.calculativeFigure
                .quantitySelected
            }
          </span>
          <span className='font-[600] text-sub-text'>{totalQty}</span>
        </div>
        <div className='py-[7px]'>
          <span className='inline-block w-40'>
            {
              __pagesText.productInfo.startOrderModal.calculativeFigure
                .pricePerItem
            }
          </span>
          <span className='font-[600] text-sub-text'>
            {' '}
            <Price value={getPriceByStore()} />
          </span>
        </div>
        {storeCode != _Store.type4 ? (
          <>
            <div className='py-[7px]'>
              <span className='inline-block w-40'>
                {' '}
                {
                  __pagesText.productInfo.startOrderModal.calculativeFigure
                    .firstLogo
                }
              </span>
              <span className='font-[600] text-sub-text'>
                {' '}
                {`${
                  firstLogoPrice === 0
                    ? 'FREE'
                    : `$${firstLogoPrice.toFixed(2)}`
                }`}
              </span>
            </div>
            <div className='py-[7px]'>
              <span className='inline-block w-40'>
                {' '}
                {
                  __pagesText.productInfo.startOrderModal.calculativeFigure
                    .additionalLogos
                }
              </span>
              <span className='font-[600] text-sub-text'>
                {' '}
                <Price value={additionalLogoCharge} />
              </span>
            </div>
            <div className='py-[7px]'>
              <span className='inline-block w-40'>
                {' '}
                {
                  __pagesText.productInfo.startOrderModal.calculativeFigure
                    .additionalSewOutCharges
                }
              </span>
              <span className='font-[600] text-sub-text'>
                {' '}
                <Price value={additionalSewOutCharges} />
              </span>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className='text-medium-text'>
        <span className='inline-block mb-2 w-40 sm:text-right'>
          {__pagesText.productInfo.startOrderModal.calculativeFigure.subTotal}
        </span>
        <span className='font-[600] text-2xl-text'>
          {' '}
          <Price value={totalQty * price} />
        </span>
      </div>
    </div>
  );
};

export default CalculativeFigure;
