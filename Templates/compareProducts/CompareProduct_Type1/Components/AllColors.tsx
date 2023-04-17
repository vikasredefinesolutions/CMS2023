import NxtImage from '@appComponents/reUsable/Image';
import { _ProductColor } from '@definations/APIs/colors.res';
import { useActions_v2 } from '@hooks_v2/index';
import React, { useEffect } from 'react';

interface _props {
  color: null | _ProductColor[];
  index: number;
  seName: string;
}

const AllColors: React.FC<_props> = ({ color, index, seName }) => {
  const { updateCompareDisplayImage } = useActions_v2();

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
    return () => {
      updateCompareDisplayImage({
        type: 'REMOVE',
        data: {
          index: index,
        },
      });
    };
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
            <NxtImage
              src={color.imageUrl}
              alt={color.name}
              className={'inline-block max-h-full'}
            />
          </div>
        ))}
      </div>
    </td>
  );
};

export default AllColors;
