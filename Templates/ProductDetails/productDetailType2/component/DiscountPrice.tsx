import Price from '@appComponents/Price';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React from 'react';

interface _props {
  ourCost: number;
  msrp: number;
  imap: number;
  salePrice: number;
}

const DiscountPrice: React.FC<_props & { storeCode: string }> = ({
  msrp,
  salePrice,
  storeCode,
}) => {
  const loggedIn = useTypedSelector_v2((state) => state.user.id);

  if (!loggedIn) {
    return (
      <>
        <div className=''>{__pagesText.productInfo.pricePerItem}</div>
        <div className='text-title-text'>
          <Price value={salePrice} />
        </div>
      </>
    );
  }

  return (
    <>
      <div className=''>{__pagesText.productInfo.pricePerItem}</div>
      <div className='text-title-text'>
        <Price value={salePrice} />
      </div>
      <div className='line-through'>
        <Price value={msrp} />
      </div>
    </>
  );
};

export default DiscountPrice;
