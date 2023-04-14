import { useTypedSelector_v2 } from 'hooks_v2';
import React from 'react';
import { _NextLogoButtonProps } from './productDetailsComponents';

const NextLogoButton: React.FC<_NextLogoButtonProps> = ({
  cIndex,
  arrayHelpers,
}) => {
  const { allowNextLogo } = useTypedSelector_v2(
    (state) => state.product.som_logos,
  );
  const { currency } = useTypedSelector_v2((state) => state.store);

  const showPrice = (price: 'FREE' | number) => {
    if (price === 'FREE') return `FREE`;
    return `${currency}${price}`;
  };

  return (
    <>
      {allowNextLogo && (
        <div className=''>
          <button
            className='text-indigo-600 font-semibold'
            onClick={() => {
              arrayHelpers.push('');
            }}
            type='button'
          >
            {`+ Add ${cIndex.label} Logo`}
          </button>

          {` (Additional ${showPrice(cIndex.price)} per item)`}
        </div>
      )}
    </>
  );
};

export default NextLogoButton;
