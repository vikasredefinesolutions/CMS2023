import NxtImage from '@appComponents/reUsable/Image';
import { _FeaturedMoreImages } from '@definations/APIs/storeDetails.res';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';

import React from 'react';

interface _props {
  images: _FeaturedMoreImages[];
  bIndex: number;
  pIndex: number;
}

const FeaturedImageOptions: React.FC<_props> = ({ images, bIndex, pIndex }) => {
  const { showFeaturedImage } = useActions_v2();
  const { uImgIndex } = useTypedSelector_v2((state) => state.home.selected);

  return (
    <ul role='list' className='flex items-center mt-2 justify-center space-x-1'>
      {images.map((image, imageIndex) => {
        const uIndex = `${bIndex}-${pIndex}-${imageIndex}`;
        return (
          <li
            key={uIndex}
            className={`w-7 h-7 border-2 hover:border-secondary ${
              uIndex === uImgIndex[pIndex] ? 'border-secondary' : ''
            } `}
            onClick={() =>
              showFeaturedImage({
                imageDetails: image,
                uImgIndex: uIndex,
                productIndex: pIndex,
              })
            }
          >
            <NxtImage src={image.imageUrl} alt={image.altTag} className='' />
          </li>
        );
      })}
    </ul>
  );
};

export default FeaturedImageOptions;
