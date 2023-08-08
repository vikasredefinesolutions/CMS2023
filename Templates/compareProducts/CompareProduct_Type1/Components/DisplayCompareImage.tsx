import NxtImage from '@appComponents/reUsable/Image';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React from 'react';

interface _props {
  onRemove: (val: number) => void;
}

const DisplayCompareImage: React.FC<_props> = ({ onRemove }) => {
  const images = useTypedSelector_v2((state) => state.compare.selectedImages);

  return (
    <tr className='divide-x divide-x-gray-border'>
      <td className='relative'>
        <div className='w-96 text-center'>&nbsp;</div>
        {/* to left 1st block empty */}
      </td>

      {images?.map((item, index) => (
        <td key={index} className='relative'>
          <div className='w-96 text-center m-auto'>
            <div
              onClick={() => onRemove(index)}
              className='absolute right-[20px] top-[20px]'
            >
              <span className='material-icons-outlined text-anchor hover:text-anchor-hover cursor-pointer'>
                close
              </span>
            </div>
            <a href={item.seName || '/'}>
              <NxtImage
                src={item.url}
                alt={item.label}
                className='max-h-[348px] m-auto'
                useNextImage={false}
              />
            </a>
          </div>
        </td>
      ))}
    </tr>
  );
};

export default DisplayCompareImage;
