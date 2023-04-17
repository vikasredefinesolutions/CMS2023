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
          <div className='w-96 text-center'>
            <a
              onClick={() => onRemove(index)}
              className='absolute right-[20px] top-[20px]'
            >
              <span className='material-icons-outlined text-sub-text font-[900] text-anchor hover:text-anchor-hover'>
                close
              </span>
            </a>
            <a href={item.seName || '/'}>
              <NxtImage
                src={item.url}
                alt={item.label}
                className='w-full m-auto'
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
