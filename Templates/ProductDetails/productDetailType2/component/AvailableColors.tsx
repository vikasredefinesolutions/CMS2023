import NxtImage from '@appComponents/reUsable/Image';
import { __pagesConstant } from '@constants/pages.constant';
import { __pagesText } from '@constants/pages.text';
import { _ProductColor } from '@definations/APIs/colors.res';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
const AvailableColors: React.FC = () => {
  const router = useRouter();
  const { setColor, clearToCheckout } = useActions_v2();
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
    clearToCheckout();
    router.push(`${product.productSEName}.html`);
  };

  useEffect(() => {
    if (colors && colors.length > 7) {
      for (let i = 0; i < colors.length; i++) {
        if (
          colors[i].attributeOptionId === selectedColor.attributeOptionId &&
          i > 6
        ) {
          setShowAllColors(true);
        }
      }
    }
  }, [selectedColor.attributeOptionId]);
  if (colors === null) return <></>;
  const colorsCount = colors.length;
  const showAllColorsButton =
    colorsCount > __pagesConstant._productDetails.imagesInRow;

  return (
    <>
      <div className='flex pt-[15px]'>
        <div className='text-default-text w-[90px]'>
          <span className='mr-[5px]'>
            {' '}
            {__pagesText.productInfo.availableColors.onlycolor}
          </span>
          <span>:</span>
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
                    <NxtImage
                      title={`${product.name}`}
                      src={product.imageUrl}
                      alt={product.altTag}
                      className='max-h-full m-auto'
                    />
                  </div>
                </div>
              ) : (
                <></>
              );
            })}
        </div>
        {/* No CSS for this button in HTML files */}
        <div className='flex flex-wrap text-center available-colors text-default-text ml-[4px] gap-[5px]'>
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
                    {/* <ColorImage product={product} /> */}
                    <NxtImage
                      title={`${product.name}`}
                      src={product.imageUrl}
                      alt={product.altTag}
                      className='max-h-full m-auto'
                    />
                  </div>
                </div>
              );
            })}
        </div>
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
