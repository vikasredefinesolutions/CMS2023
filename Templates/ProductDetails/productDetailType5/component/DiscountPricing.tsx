import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { useState } from 'react';
import { _DiscountPricingProps } from './productDetailsComponents';
const DiscountPricing: React.FC<
  _DiscountPricingProps & { storeCode: string }
> = ({ price, showLogin, storeCode, showMsrpLine, modalHandler }) => {
  const [showMsg, setShowMsg] = useState(false);

  const customerId = useTypedSelector_v2((state) => state.user.id);
  const { minQty } = useTypedSelector_v2((state) => state.product.toCheckout);

  const showMinQuantity = minQty > 0;
  const unitUnits = minQty > 1 ? 'units' : 'unit';
  return (
    <>
      {showMinQuantity ? (
        <div className='pt-[15px] text-default-text' x-data='{open : false}'>
          <div className='flex flex-wrap items-center cursor-pointer text-default-text !font-bold'>
            <span
              className='material-icons-outlined'
              onClick={() => {
                setShowMsg(!showMsg);
              }}
            >
              {showMsg ? 'remove' : 'add'}
            </span>{' '}
            {__pagesText.productInfo.discountPricing.minimumOrder}
            <span className='pl-[5px] !font-normal'>
              {' '}
              {` ${minQty} ${unitUnits} per color`}
            </span>
          </div>
          {showMsg && (
            <div className='text-extra-small-text py-4' x-show='open'>
              {__pagesText.productInfo.discountPricing.firstMsg}
              {''} {minQty} {__pagesText.productInfo.discountPricing.secondMsg}
            </div>
          )}
        </div>
      ) : null}
      {/* <QtyPriceTable storeCode={storeCode} /> */}
      {/* {showLogin && modalHandler && <AskToLogin modalHandler={modalHandler} />} */}
    </>
  );
};

export default DiscountPricing;
