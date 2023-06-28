import NxtImage from '@appComponents/reUsable/Image';
import { _ProductColor } from '@definations/APIs/colors.res';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import React, { useEffect } from 'react';
import { _globalStore } from 'store.global';

interface _Props {
  colors: null | _ProductColor[];
  activeColor: _ProductColor | null;
  setActiveColor: React.Dispatch<React.SetStateAction<_ProductColor | null>>;
}

let mediaBaseUrl = _globalStore.blobUrl;
const PD7_ColorInfo: React.FC<_Props> = ({
  colors,
  activeColor,
  setActiveColor,
}) => {
  const { setImage_2 } = useActions_v2();
  const clientSideMediaUrl = useTypedSelector_v2(
    (state) => state.store.mediaBaseUrl,
  );

  mediaBaseUrl = mediaBaseUrl || clientSideMediaUrl;
  useEffect(() => {
    if (colors && colors.length > 0) {
      setActiveColor(colors[0]);
    }
  }, []);

  if (!activeColor || !colors) return null;

  return (
    <>
      <div className='pt-[15px]'>
        <span className='inline-block w-[90px] text-extra-small-text !font-bold'>
          Color Name
        </span>
        <span>:</span>
        <span className='ml-[4px] text-small-text italic'>
          {activeColor?.name}
        </span>
      </div>
      {/* <div className='pt-[5px]'>
        <span className='inline-block w-[90px] text-extra-small-text font-bold'>
          Color Code
        </span>
        <span>:</span>
        <span className='ml-[4px] text-small-text italic'>
          {activeColor?.attributeOptionId}
        </span>
      </div> */}
      <div className='flex flex-wrap items-center pt-[15px]'>
        <div className='w-[90px] text-extra-small-text !font-bold'>
          <span className=''>Select Color</span>
        </div>
        <ul
          role='list'
          className='flex flex-wrap justify-center space-x-1 overflow-hidden'
        >
          {colors?.map((color) => {
            return (
              <li
                onClick={() => {
                  setImage_2({
                    id: 0,
                    altTag: '',
                    imageUrl: mediaBaseUrl + color.imageUrl,
                  });
                  setActiveColor(color);
                }}
                className={`w-[30px] h-[30px] p-[2px] mb-[5px] border-2 border-gray rounded-full overflow-hidden  ${
                  activeColor.attributeOptionId === color.attributeOptionId
                    ? 'border-secondary'
                    : ''
                }`}
              ><a href="javascript:void(0)" title={color.name} onClick={() => {
                setImage_2({
                  id: 0,
                  altTag: '',
                  imageUrl: mediaBaseUrl + color.imageUrl,
                });
                setActiveColor(color);
              }}>
                <NxtImage
                  src={color.imageUrl}
                  alt={color.name}
                  title={color.name}
                  className='max-h-full m-auto cursor-pointer'
                /></a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default PD7_ColorInfo;
