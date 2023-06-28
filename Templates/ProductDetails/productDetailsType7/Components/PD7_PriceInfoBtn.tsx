import Price from '@appComponents/Price';
import { _SbProductAdditionalPrices } from '@services/sb.service';
import React, { useEffect, useState } from 'react';

interface _Props {
  additionalPrices: _SbProductAdditionalPrices[];
}

const PD7_PriceInfoBtn: React.FC<_Props> = ({ additionalPrices }) => {
  const [hideAll, setHideAll] = useState<boolean>(true);
  const [focus, setFocus] = useState<boolean>(false);

  useEffect(() => {
    let skip = false;
    additionalPrices.forEach((item) => {
      if (skip) {
        return;
      }
      if (!item.hideForCustomer) {
        skip = true;
        setHideAll(false);
      }
    });
  }, [additionalPrices]);

  if (hideAll) return null;

  return (
    <div
      className='!text-[#509627]'
      //   x-data='{ open: false }'
      onMouseOver={() => setFocus(true)}
      onMouseLeave={() => setFocus(false)}
      // @mouseenter="open = true" @mouseleave="open = false"
    >
      <button className=''>
        <span className='material-icons ml-2 text-base'>info</span>
      </button>
      <div
        className='z-10 absolute top-full 
      -left-32 transform -translate-x-1/2'
      >
        {focus && (
          <div
            className='bg-[#000000] overflow-hidden p-2  mt-2'
            //   x-show='open'
            //   x-transition:enter='transition ease-out duration-200 transform'
            //   x-transition:enter-start='opacity-0 translate-y-2'
            //   x-transition:enter-end='opacity-100 translate-y-0'
            //   x-transition:leave='transition ease-out duration-200'
            //   x-transition:leave-start='opacity-100'
            //   x-transition:leave-end='opacity-0'
            // style="display: none;"
            onMouseOver={() => setFocus(true)}
            onMouseLeave={() => setFocus(false)}
          >
            <div className='text-extra-small-text text-[#ffffff] font-light whitespace-nowrap w-full text-left px-4 py-4'>
              <span className='w-full pt-1 pb-1 block font-semibold'>
                Here the Price is break down for this product:
              </span>
              {additionalPrices.map((price, index) => {
                if (price.hideForCustomer) {
                  return null;
                }
                return (
                  <span className='w-full pt-1 pb-1 block'>
                    {`${index + 1}) ${price.name},`}{' '}
                    <Price value={price.amount} />{' '}
                    {price.description && `: ${price.description}`}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PD7_PriceInfoBtn;
