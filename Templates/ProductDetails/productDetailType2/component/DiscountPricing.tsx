import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { useState } from 'react';
import QtyPriceTable from './PriceTable';
import { _DiscountPricingProps } from './productDetailsComponents';
const DiscountPricing: React.FC<
  _DiscountPricingProps & { storeCode: string }
> = ({ price, showLogin, storeCode, showMsrpLine, modalHandler }) => {
  const [showMsg, setShowMsg] = useState(false);
  const { isEmpGuest } = useTypedSelector_v2((state) => state.employee);

  const { minQty } = useTypedSelector_v2((state) => state.product.toCheckout);

  const unitUnits = minQty > 1 ? 'units' : 'unit';
  return (
    <>
      <div className='pt-[15px] text-default-text' x-data='{open : false}'>
        {!isEmpGuest && (
          <div
            className='flex flex-wrap items-center cursor-pointer'
            onClick={() => setShowMsg(!showMsg)}
          >
            <span className='material-icons-outlined'>
              {showMsg ? 'remove' : 'add'}
            </span>{' '}
            <span className='font-bold'>
              {__pagesText.productInfo.discountPricing.minimumOrderQuantity}
            </span>
            <span className='pl-[5px]'>
              {' '}
              {/* {` ${minQty ? minQty : 4} ${unitUnits} per color`} */}
              {` 4 ${unitUnits} per color` }
            </span>
          </div>
        )}

        {showMsg ? (
          <div className='text-extra-small-text py-4' x-show='open'>
            {__pagesText.productInfo.discountPricing.startshowMsg}
            {/* {minQty ? minQty : 4} */}
            4
            {__pagesText.productInfo.discountPricing.endShowMsg}
          </div>
        ) : (
          <></>
        )}
      </div>
      <QtyPriceTable storeCode={storeCode} />
    </>
  );
};

export default DiscountPricing;
