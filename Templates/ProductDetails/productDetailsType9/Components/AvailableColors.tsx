import NxtImage from '@appComponents/reUsable/Image';
import { __pagesConstant } from '@constants/pages.constant';
import { __pagesText } from '@constants/pages.text';
import { _ProductColor } from '@definations/APIs/colors.res';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
const mediaExtraUrlDeatilThumbnail =
  process.env.NEXT_PUBLIC_EXTRA_MEDIA_URL_DETAIL_THUMBNAIL;

const AvailableColors: React.FC = () => {
  const { setColor } = useActions_v2();
  const router = useRouter();
  const selectedColor = useTypedSelector_v2(
    (state) => state.product.selected.color,
  );
  const [showAllColors, setShowAllColors] = useState(false);
  const colors = useTypedSelector_v2((state) => state.product.product.colors);

  const handleChooseColor = (product: _ProductColor) => {
    if (!product.splitproductList) {
      setColor(product);
      return;
    }
    router.push(`${product.productSEName}.html`);
  };

  useEffect(() => {
    if (colors && colors.length > 7) {
      for (let i = 0; i < colors.length; i++) {
        if (
          colors[i].attributeOptionId === selectedColor?.attributeOptionId &&
          i > 6
        ) {
          setShowAllColors(true);
        }
      }
    }
  }, [selectedColor?.attributeOptionId]);

  if (colors === null) return <></>;
  const colorsCount = colors.length;
  const showAllColorsButton =
    colorsCount > __pagesConstant._productDetails.imagesInRow;

  return (
    <div className=''>
      <div className='bg-primary flex flex-wrap justify-between items-center pl-[10px] pr-[10px] pt-[6px] pb-[6px] mt-[13px] mb-[10px] text-default-text'>
        <span className='font-[600] text-[#ffffff] text-sub-text'>
          {__pagesText.productInfo.availableColors.availableColors}
        </span>
      </div>

      <div className='flex flex-wrap text-center available-colors text-default-text'>
        {colors.map((product, index) => {
          const show =
            showAllColors ||
            index < __pagesConstant._productDetails.imagesInRow;
          const highlight =
            product.attributeOptionId === selectedColor?.attributeOptionId
              ? 'border-secondary'
              : 'border-slate-200';

          return (
            <div
              className={`w-20 ${
                show === false && 'sr-only'
              } mx-[10px] mb-[10px]`}
              key={product.attributeOptionId}
              onClick={() => handleChooseColor(product)}
            >
              <div
                className={`w-[80px] h-[80px] mx-auto border-2  hover:border-secondary mb-[6px] cursor-pointer ${highlight}`}
              >
                <NxtImage
                  title={`${product.name}`}
                  src={product.imageUrl}
                  alt={product?.altTag || product?.name || ''}
                  className='max-h-full m-auto'
                  extraUrl={true}
                  extraUrlPath={mediaExtraUrlDeatilThumbnail}
                />
              </div>

              <div className=''>{product.name}</div>
            </div>
          );
        })}
      </div>

      {/* No CSS for this button in HTML files */}
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
  );
};

export default AvailableColors;
