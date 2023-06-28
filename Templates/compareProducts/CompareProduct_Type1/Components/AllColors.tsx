import { _ProductColor } from '@definations/APIs/colors.res';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import React, { useEffect } from 'react';
import { _globalStore } from 'store.global';

interface _props {
  color: null | _ProductColor[];
  index: number;
  seName: string;
}
let mediaBaseUrl = _globalStore.blobUrl; // for server side

const AllColors: React.FC<_props> = ({ color, index, seName }) => {
  const { updateCompareDisplayImage } = useActions_v2();

  const clientSideMediaBaseUrl = useTypedSelector_v2(
    (state) => state.store.mediaBaseUrl,
  );

  mediaBaseUrl = mediaBaseUrl || clientSideMediaBaseUrl;

  useEffect(() => {
    if (color !== null) {
      if (typeof color === 'string') {
        updateCompareDisplayImage({
          type: 'ADD',
          data: {
            index,
            label: '',
            url: '-',
            attibuteOptionId: 0,
            seName: '/',
          },
        });
        return;
      }

      updateCompareDisplayImage({
        type: 'ADD',
        data: {
          index: index,
          label: color[0].name,
          url: color[0].imageUrl,
          seName: seName,
          attibuteOptionId: color[0].attributeOptionId,
        },
      });
    }
  }, []);

  if (color === null) {
    return (
      <td key={index} className=''>
        <div className='p-2'>{'-'}</div>
      </td>
    );
  }

  return (
    <td key={index} className=''>
      <div className='p-2 flex flex-wrap gap-2 justify-center'>
        {color.map((color) => (
          <div
            key={index}
            onClick={() =>
              updateCompareDisplayImage({
                type: 'ADD',
                data: {
                  index,
                  label: color.name,
                  url: color.imageUrl,
                  attibuteOptionId: color.attributeOptionId,
                  seName: seName,
                },
              })
            }
            className='w-[40px] h-[40px] border border-gray-border p-1 flex items-center justify-center'
          >
            <img
              className={'m-auto max-h-full'}
              src={mediaBaseUrl + color.imageUrl}
              alt={color.name}
              title={color.name || ''}
            />
          </div>
        ))}
      </div>
    </td>
  );
};

export default AllColors;
