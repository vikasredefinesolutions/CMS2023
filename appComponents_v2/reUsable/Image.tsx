import { generateImageUrl } from '@helpers/common.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React from 'react';
import { _globalStore } from 'store.global';
import { _Imageprops } from './reUsable.d';
let mediaBaseUrl = _globalStore.blobUrl; // for server side

const NxtImage: React.FC<_Imageprops> = ({
  role = 'none',
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
  decoding,
  extraUrlPath,
  sizes = '',
}) => {
  const clientSideMediaBaseUrl = useTypedSelector_v2(
    (state) => state.store.mediaBaseUrl,
  );
  mediaBaseUrl = mediaBaseUrl || clientSideMediaBaseUrl;
  const imageUrl = generateImageUrl(src as string, mediaBaseUrl, isStatic);
  return (
    isStatic ? <img
    width={width}
    src={src as string}
    height={height}
    alt={alt || ''}
    itemProp='image'
    title={title || ''}
    className={className}
    role={role}
    decoding={decoding}
    sizes={sizes}
  /> : <img
      width={width}
      src={imageUrl}
      height={height}
      alt={alt || ''}
      itemProp='image'
      title={title || ''}
      className={className}
      role={role}
      decoding={decoding}
      sizes={sizes}
    />
  );
  /*if (isStatic) {
    if (typeof src !== 'string') {
      return (
        <img
          width={width}
          src={src?.src}
          height={height}
          alt={alt || ''}
          itemProp='image'
          title={title || ''}
          className={className}
          role={role}
          decoding={decoding}
          sizes={sizes}
        />
      );
    }

    if (typeof src === 'string') {
      return (
        <img
          width={width}
          src={src}
          height={height}
          sizes={sizes}
          alt={alt || ''}
          itemProp='image'
          title={title || ''}
          className={className}
        />
      );
    }
  }

  //const imageUrl = generateImageUrl(src as string, mediaBaseUrl);

  if (useNextImage) {
    return (
      <div className={className}>
        <NextImage
          title={title}
          src={imageUrl}
          layout={layout}
          alt={alt || ''}
          key={cKey || 0}
          loading={'eager'}
          width={width || 1}
          height={height || 1}
          sizes={sizes}
        />
      </div>
    );
  }

  if (extraUrlPath) {
    return (
      <img
        src={(extraUrlPath + imageUrl) as string}
        alt={alt || ''}
        title={title || ''}
        className={className}
        sizes={sizes}
      />
    );
  }

  return (
    <img
      itemProp='image'
      src={imageUrl as string}
      alt={alt || ''}
      sizes={sizes}
      title={title || ''}
      className={className}
    />
  );*/
};

export default NxtImage;
