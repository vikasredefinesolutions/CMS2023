import { __pagesConstant } from '@constants/pages.constant';
import { __pagesText } from '@constants/pages.text';
import { _ProductColor } from '@definations/APIs/colors.res';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ColorImage_Type3 from './ColorImage_Type3';

// import ColorImage from './ColorImage';
const AvailableColors_Type3: React.FC = () => {
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
    router.push(product.productSEName);
  };
  if (colors === null) return <></>;
  const colorsCount = colors.length;
  const showAllColorsButton =
    colorsCount > __pagesConstant._productDetails.imagesInRow;

  return (
    <>
      <div className='flex align-top mb-[15px]'>
        <div className='w-[128px] text-default-text'>
          <span className='text-default-text font-semibold'>
            {' '}
            {__pagesText.productInfo.availableColors.colors}
          </span>
        </div>
        <div className='flex flex-wrap gap-1 text-default-text text-center'>
          {colors.map((product, index) => {
            const show =
              showAllColors ||
              index < __pagesConstant._productDetails.imagesInRow;
            const highlight =
              product.attributeOptionId === selectedColor?.attributeOptionId
                ? 'border-primary'
                : 'border-slate-200';
            return (
              <div
                className='w-[32px]'
                key={product.attributeOptionId}
                onClick={() => handleChooseColor(product)}
              >
                <div
                  className={`border border-gray-border hover:border-secondary p-[1px] cursor-pointer ${highlight}`}
                >
                  <ColorImage_Type3 product={product} />
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
                <span className='span1'>
                  {__pagesText.productInfo.availableColors.showless}
                </span>
              ) : (
                <>
                  <span className='span1'>
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
    </>
  );
};

export default AvailableColors_Type3;
