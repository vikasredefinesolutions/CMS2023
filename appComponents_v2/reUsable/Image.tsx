import { generateImageUrl } from '@helpers/common.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import NextImage from 'next/image';
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
}) => {
  const clientSideMediaBaseUrl = useTypedSelector_v2(
    (state) => state.store.mediaBaseUrl,
  );
  mediaBaseUrl = mediaBaseUrl || clientSideMediaBaseUrl;
  const imageUrl = generateImageUrl(src, isStatic, mediaBaseUrl);

  if (useNextImage) {
    return (
      <div style={{ width: '100%' }} className={className}>
        <NextImage
          title={title}
          src={imageUrl}
          layout={layout}
          alt={alt || ''}
          key={cKey || 0}
          loading={'eager'}
          width={width || 1}
          height={height || 1}
          objectFit={'contain'}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      {
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl as string} alt={alt || ''} title={title || ''} />
      }
    </div>
  );
};

export default NxtImage;
