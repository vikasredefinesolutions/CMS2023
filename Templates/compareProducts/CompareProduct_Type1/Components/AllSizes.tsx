import { useTypedSelector_v2 } from '@hooks_v2/index';
import React from 'react';

interface _props {
  index: number;
  sizes: {
    colorAttributeOptionId: number;
    sizeArr: string[];
  };
}

const AllSizes: React.FC<_props> = ({ sizes, index }) => {
  const selectedImages = useTypedSelector_v2(
    (state) => state.compare.selectedImages,
  );

  if (selectedImages) {
    if (
      sizes.colorAttributeOptionId === selectedImages[index]?.attibuteOptionId
    ) {
      return (
        <td className=''>
          <div className='p-2 flex flex-wrap gap-2 justify-center'>
            {sizes.sizeArr.map((size, index) => (
              <div
                key={index}
                className='w-[30px] h-[30px] border border-gray-border text-small-text font-[600] flex justify-center items-center'
              >
                {size}
              </div>
            ))}
          </div>
        </td>
      );
    }
  }
  return <></>;
};

export default AllSizes;
