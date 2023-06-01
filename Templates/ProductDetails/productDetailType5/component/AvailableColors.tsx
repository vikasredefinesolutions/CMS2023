import { _ModalProps } from '@appComponents/modals/modal';
import { __pagesConstant } from '@constants/pages.constant';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ColorImage from './ColorImage';
const AvailableColors: React.FC<_ModalProps> = ({ modalHandler }) => {
  const router = useRouter();
  const { setColor } = useActions_v2();
  const selectedColor = useTypedSelector_v2(
    (state) => state.product.selected.color,
  );
  const [showAllColors] = useState(false);
  const colors = useTypedSelector_v2((state) => state.product.product.colors);
  const { inventory } = useTypedSelector_v2((state) => state.product.product);
  // const handleChooseColor = (product: _ProductColor) => {
  //   if (!product.productSEName || product.productSEName === '') {
  //     setColor(product);
  //     return;
  //   }
  //   router.push(product.productSEName);
  // };

  if (colors === null) return <></>;
  const colorsCount = colors.length;
  const showAllColorsButton =
    colorsCount > __pagesConstant._productDetails.imagesInRow;

  return (
    <>
      {' '}
      <div className='pt-[15px] flex items-center text-default-text'>
        <span className='inline-block w-[130px] !font-bold'>Color Name</span>
        <span>:</span> <span className='ml-[8px]'>{selectedColor.name}</span>
      </div>
      <div className='pt-[15px] flex flex-wrap items-end justify-between'>
        <div className='flex flex-wrap items-center'>
          <div className='flex flex-wrap items-center'>
            <div className='text-default-text w-[130px] !font-bold'>
              <span className=''>Select Color</span>
            </div>
            <span>:</span>
          </div>
          <div className='flex flex-wrap text-center available-colors text-default-text ml-[8px] gap-[3px]'>
            {colors.map((product, index) => {
              // const show =
              //   showAllColors ||
              //   index < __pagesConstant._productDetails.imagesInRow;
              const highlight =
                product.attributeOptionId === selectedColor?.attributeOptionId
                  ? 'border-primary'
                  : 'border-secondary';
              return (
                <div
                  className=''
                  key={product.attributeOptionId}
                  onClick={() => setColor(product)}
                >
                  <div
                    className={`w-[32px] h-[32px] p-[1px] border-2 hover:border-tertiary cursor-pointer ${highlight}`}
                  >
                    {/* <NxtImage
                      title={`${product.name}`}
                      src={product.imageUrl}
                      alt={product.altTag}
                      className='w-full object-center object-cover cursor-pointer'
                    /> */}
                    <ColorImage product={product} />
                  </div>
                </div>
              );
            })}
          </div>
          {/* {showAllColorsButton && (
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
            )} */}
        </div>
        {inventory?.inventory[0]?.name.toLowerCase() !==
          __pagesConstant?._productDetails?.Misc && (
          <div className='pt-[15px] text-default-text text-right'>
            <a
              className='text-anchor hover:text-anchor-hover'
              data-modal-toggle='FitandSize'
              onClick={() => modalHandler('sizeChart')}
            >
              <img src={'/assets/images/size-chart.jpg'} alt={'Fit and Size'} />
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default AvailableColors;
