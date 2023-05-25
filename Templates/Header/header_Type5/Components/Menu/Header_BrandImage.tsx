import NxtImage from '@appComponents/reUsable/Image';
import React from 'react';

interface _props {
  url: string;
  alt: string;
  src: string;
}

const BrandImage: React.FC<_props> = ({ url, src, alt }) => {
  // const {
  //   // layout: storeLayout,
  //   view,
  // } = useTypedSelector_v2((state) => state.store);

  return (
    <div className='lg:w-1/4 text-center w-full relative'>
      <div className='pl-[15px] pr-[15px]'>
        <a
          title={alt}
          className='block bg-tertiary pt-[10px] pb-[10px]'
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
  // if (view === 'MOBILE') {
  //   return (
  //     <div className='flex flex-wrap py-3  w-1/2 relative max-w-[140px]'>
  //       <div className='w-1/2 lg:w-1/4 text-center'>
  //         <Link href={`/${url}`} className='block p-2 bg-secondary m-2'>
  //           <a title={alt}>
  //             <Image className='h-14 w-auto brand-logo' src={src} alt={alt} />
  //           </a>
  //         </Link>
  //       </div>
  //     </div>
  //   );
  // }

  // if (view === 'DESKTOP') {
  //   return (
  //     <div className='lg:w-1/4 text-center w-full relative max-w-[140px]'>
  //       <Link
  //         href={`/${url}`}
  //         className='text-anchor hover:text-anchor-hover'
  //       >
  //         <a title={alt}>
  //           <Image className='h-14 w-auto brand-logo' src={src} alt={alt} />
  //         </a>
  //       </Link>
  //     </div>
  //   );
  // }
};

export default BrandImage;
