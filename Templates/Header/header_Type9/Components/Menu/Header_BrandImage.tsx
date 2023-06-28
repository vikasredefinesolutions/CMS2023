import NxtImage from '@appComponents/reUsable/Image';
import React from 'react';

interface _props {
  url: string;
  alt: string;
  src: string;
}

const BrandImage: React.FC<_props> = ({ url, src, alt }) => {
  return (
    <div className='lg:w-1/4 text-center w-full relative'>
      <div className=''>
        <a
          title={alt}
          className='inline-block hover:bg-white hover:shadow'
          href={`/${url}`}
        >
          <div className='brand-logo'>
            <NxtImage
              className='max-h-full'
              src={src}
              alt={alt}
              useNextImage={false}
              title={alt}
            />
          </div>
        </a>
      </div>
    </div>
  );
};

export default BrandImage;
