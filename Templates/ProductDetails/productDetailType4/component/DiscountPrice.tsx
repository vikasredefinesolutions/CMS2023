import Price from '@appComponents/Price';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React from 'react';

interface _props {
  salePrice: number;
  averagePrice: number;
}

const DiscountPrice: React.FC<_props & { storeCode: string }> = ({
  salePrice,
  averagePrice,
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
      <span className='inline-block w-40'>
        {__pagesText.productInfo.pricePerItem}
      </span>{' '}
      <span className='font-semibold'>
        {' '}
        <Price value={averagePrice} />
      </span>
    </>
  );
};

export default DiscountPrice;
