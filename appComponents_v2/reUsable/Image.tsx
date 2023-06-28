import { generateImageUrl } from '@helpers/common.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import Image from 'next/image';
import React from 'react';
import { _globalStore } from 'store.global';
import { _Imageprops } from './reUsable.d';
let mediaBaseUrl = _globalStore.blobUrl; // for server side

const NxtImage: React.FC<_Imageprops> = ({
  src,
  alt,
  cKey,
  width,
  title,
  height,
  className,
  isStatic = false,
  useNextImage = true,
  layout = 'responsive',
  extraUrl,
  extraUrlPath,
}) => {
  const clientSideMediaBaseUrl = useTypedSelector_v2(
    (state) => state.store.mediaBaseUrl,
  );
  mediaBaseUrl = mediaBaseUrl || clientSideMediaBaseUrl;
  const imageUrl = generateImageUrl(src, isStatic, mediaBaseUrl);

  if (extraUrlPath) {
    return (

      <Image 
				src={(extraUrlPath + imageUrl) as string}
				alt={alt || ''}
				layout="fill" // we'll talk about this in a little bit
			/>
     
    );
  }
   // <img
      //   itemProp='image'
      //   src={(extraUrlPath + imageUrl) as string}
      //   alt={alt || ''}
      //   title={title || ''}
      //   className={className}
      // />
  return (
    <img
      itemProp='image'
      src={imageUrl as string}
      alt={alt || ''}
      title={title || ''}
      className={className}
    />
  );
};

export default NxtImage;
