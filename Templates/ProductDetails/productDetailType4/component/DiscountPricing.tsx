import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { _DiscountPricingProps } from '@templates/ProductDetails/Components/productDetailsComponents';
import { useState } from 'react';
import QtyPriceTable from './PriceTable';
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
        <div>
          <div className='pt-[15px] text-default-text'>
            <div className='flex flex-wrap items-center cursor-pointer font-semibold'>
              {__pagesText.productInfo.discountPricing.minimumOrder}
              <span className='pl-[5px]'>{` ${minQty} ${unitUnits} per color`}</span>
            </div>
          </div>
          {/* <div className='text-extra-small-text py-4' x-show='open'>
            {__pagesText.productInfo.discountPricing.showMsg}
          </div> */}
        </div>
      ) : null}
      <QtyPriceTable storeCode={storeCode} />
      {/* {showLogin && modalHandler && <AskToLogin modalHandler={modalHandler} />} */}
    </>
  );
};

export default DiscountPricing;
