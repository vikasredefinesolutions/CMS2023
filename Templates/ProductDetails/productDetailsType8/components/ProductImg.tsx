import NxtImage from '@appComponents/reUsable/Image';
import { _ProductColor } from '@definations/APIs/colors.res';
import { _ProductDetails } from '@definations/APIs/productDetail.res';
import { useTypedSelector_v2 } from 'hooks_v2';
import React, { useState } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import { _globalStore } from 'store.global';
let mediaBaseUrl = _globalStore.blobUrl; // for server side rendering

interface _Props {
  activeColor: _ProductColor;
  details: _ProductDetails;
}

const ProductImg: React.FC<_Props> = ({ details: product, activeColor }) => {
  const clientSideMediaUrl = useTypedSelector_v2(
    (state) => state.store.mediaBaseUrl,
  );
  mediaBaseUrl = mediaBaseUrl || clientSideMediaUrl;
  const [selectedImage, setSelectedImage] = useState<{
    id: number;
    imageUrl: string;
    displayOrder: number;
    altTag: string;
  }>({
    id: 0,
    imageUrl: activeColor.moreImages[0].imageUrl,
    displayOrder: activeColor.moreImages[0].displayOrder,
    altTag: activeColor.moreImages[0].altTag,
  });

  return (
    <div className='col-span-1 grid grid-cols-12 gap-[24px] lg:pr-[15px] pr-[0px] pt-[8px]'>
      <div className='col-span-12 border border-gray-border relative'>
        <div className='main-image max-w-lg mx-auto'>
          {/* TODO :  ADJUST SALE ICON ALIGNMENT IN PRODUCT DETAIL  */}
          {product &&
            product.productTagViewModel &&
            product.productTagViewModel.length > 0 &&
            (product.productTagViewModel[0].productTagName ? (
              <div className='absolute top-1 left-2 text-gray-800 p-1 z-5"'>
                <NxtImage
                  className=''
                  alt=''
                  useNextImage={false}
                  src={product?.productTagViewModel[0].imagename}
                />
              </div>
            ) : (
              <div className='absolute -top-2 -left-2 text-gray-800 p-1 z-5"'>
                <NxtImage
                  src={product?.productTagViewModel[0].imagename || null}
                  width={'60px'}
                  height={'60px'}
                  useNextImage={false}
                  className=''
                  alt=''
                />
              </div>
            ))}
          <InnerImageZoom
            key={selectedImage?.imageUrl}
            src={`${mediaBaseUrl}${selectedImage.imageUrl}`}
            zoomType='hover'
            hideHint={true}
            className='w-full object-center object-cover sm:rounded-lg main_image max-h'
          />
        </div>
        <div
          className={`hidden md:block sub-image absolute left-[10px]  top-[15px] w-[70px] ${
            product && product.productTagViewModel[0]?.productTagName === 'sale'
              ? 'mt-[60px]'
              : ''
          }`}
        >
          {activeColor.moreImages.length > 1 &&
            activeColor?.moreImages
              ?.map((img, index) => ({ ...img, id: index }))
              .map((img) => {
                const highlight =
                  img.id === selectedImage?.id
                    ? 'border-secondary'
                    : 'border-slate-200';
                return (
                  <div
                    key={img.id + img.imageUrl}
                    className={`md:border hover:border-secondary p-[3px] mt-[5px] mb-[5px] last:mb-0 bg-white  w-[70px] max-h-[70px] cursor-pointer ${highlight}`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <NxtImage
                      src={img.imageUrl}
                      alt={img.altTag}
                      useNextImage={false}
                      className='max-h-full m-auto cursor-pointer'
                      title={img.altTag}
                    />
                  </div>
                );
              })}
        </div>
      </div>
      {/* Social Media third Party */}
    </div>
  );
};

export default ProductImg;
