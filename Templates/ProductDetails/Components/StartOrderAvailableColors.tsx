import Image from '@appComponents/reUsable/Image';
import { __pagesText } from '@constants/pages.text';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import React, { useEffect } from 'react';

const StartOrderAvailableColors: React.FC = () => {
  const { colors } = useTypedSelector_v2((state) => state.product.product);
  const { setColor } = useActions_v2();
  const selectedColor = useTypedSelector_v2(
    (state) => state.product.selected.color.name,
  );

  useEffect(() => {
    if (colors === null) return;
    setColor(colors[0]);
  }, []);

  return (
    <div>
      <div className='text-gray-600 bg-primary flex flex-wrap justify-between items-center pl-[10px] pr-[10px] pt-[6px] pb-[6px] mt-[13px] mb-[10px] text-default-text'>
        <span className='font-[600] text-[#ffffff] leading-none text-sub-text'>
          {__pagesText.productInfo.availableColors.selectColor}
        </span>
      </div>

      <div className='flex flex-wrap justify-center text-center pl-[10px] pr-[10px] available-colors text-default-text'>
        {colors?.map((color) => (
          <div
            className='mr-[20px] mb-[10px] w-[80px]'
            key={color.productId}
            onClick={() => setColor(color)}
          >
            <div
              className={`w-[80px] h-[80px] border ${
                selectedColor === color.name
                  ? ' border-secondary'
                  : 'border-[#d8dfe1]'
              } hover:border-secondary mb-[6px]`}
            >
              <Image
                src={color.imageUrl}
                alt={color.altTag}
                className='w-full object-center object-cover'
              />
            </div>

            <div className=''>{color.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartOrderAvailableColors;
