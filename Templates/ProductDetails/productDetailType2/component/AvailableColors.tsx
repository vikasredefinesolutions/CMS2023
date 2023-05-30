import { __pagesConstant } from '@constants/pages.constant';
import { __pagesText } from '@constants/pages.text';
import { _ProductColor } from '@definations/APIs/colors.res';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ColorImage from './ColorImage';
const AvailableColors: React.FC = () => {
  const router = useRouter();
  const { setColor } = useActions_v2();
  const selectedColor = useTypedSelector_v2(
    (state) => state.product.selected.color,
  );
  const [showAllColors, setShowAllColors] = useState(false);
  const colors = useTypedSelector_v2((state) => state.product.product.colors);
  const handleChooseColor = (product: _ProductColor) => {
    if (!product.productSEName || product.productSEName === '') {
      setColor(product);
      return;
    }
    router.push(`${product.productSEName}.html`);
  };
  if (colors === null) return <></>;
  const colorsCount = colors.length;
  const showAllColorsButton =
    colorsCount > __pagesConstant._productDetails.imagesInRow;

  return (
    <>
      <div className='flex flex-wrap items-center pt-[15px]'>
        <div className='text-default-text w-[90px]'>
          <span className=''>
            {' '}
            {__pagesText.productInfo.availableColors.onlycolor}
          </span>
        </div>
        <div className='flex flex-wrap text-center available-colors text-default-text ml-[4px] gap-[5px]'>
          {!showAllColors &&
            colors.map((product, index) => {
              const highlight =
                product.attributeOptionId === selectedColor?.attributeOptionId
                  ? 'border-primary'
                  : 'border-slate-200';
              return index < __pagesConstant._productDetails.imagesInRow - 1 ? (
                <div
                  className=''
                  key={product.attributeOptionId}
                  onClick={() => handleChooseColor(product)}
                >
                  <div
                    className={`w-[32px] h-[32px] p-[1px] border-2  hover:border-primary cursor-pointer ${highlight}`}
                  >
                    <ColorImage product={product} />
                  </div>
                </div>
              ) : (
                <></>
              );
            })}
        </div>
        {/* No CSS for this button in HTML files */}
        {showAllColors &&
          colors.map((product, index) => {
            const highlight =
              product.attributeOptionId === selectedColor?.attributeOptionId
                ? 'border-primary'
                : 'border-slate-200';

            return (
              <div
                className=''
                key={product.attributeOptionId}
                onClick={() => handleChooseColor(product)}
              >
                <div
                  className={`w-[32px] h-[32px] p-[1px] border-2  hover:border-primary cursor-pointer ${highlight}`}
                >
                  <ColorImage product={product} />
                </div>
              </div>
            );
          })}
        {showAllColorsButton && (
          <div className='text-right text-anchor hover:text-anchor-hover'>
            <button
              onClick={() => setShowAllColors((showAll) => !showAll)}
              className=' underline'
            >
              {showAllColors ? (
                <span className='span1 pl-[5px]'>
                  {__pagesText.productInfo.availableColors.showless}
                </span>
              ) : (
                <>
                  <span className='span1 pl-[5px]'>
                    {__pagesText.productInfo.availableColors.seeAll}
                  </span>
                  <span className='span2'> {colorsCount} </span>
                  <span className='span3'>
                    {__pagesText.productInfo.availableColors.colors}
                  </span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <div className='pt-[15px] text-default-text'>
        <span className='inline-block w-[90px]'>Color Name</span> <span>:</span>{' '}
        <span className='ml-[4px]'>{selectedColor.name}</span>
      </div>
    </>
  );
};

export default AvailableColors;
