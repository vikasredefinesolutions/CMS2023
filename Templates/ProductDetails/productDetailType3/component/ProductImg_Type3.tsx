import NxtImage from '@appComponents/reUsable/Image';
import {
  BACARDI,
  BOSTONBEAR,
  THD_STORE_CODE,
  UCA,
  UNITI_CODE,
  _Store_CODES,
} from '@constants/global.constant';
import { _OtherImage } from '@definations/APIs/colors.res';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { useEffect } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import { _globalStore } from 'store.global';
import { _ProductImgProps } from './productDetailsComponents';

let mediaBaseUrl = _globalStore.blobUrl; // for server side rendering

const ProductImg_Type3: React.FC<_ProductImgProps> = ({ product }) => {
  const { setImage, setImage_2, clearToCheckout } = useActions_v2();
  const colors = useTypedSelector_v2((state) => state.product?.product.colors);
  const selectedColor = useTypedSelector_v2(
    (state) => state.product?.selected.color,
  );
  const storeCode = useTypedSelector_v2((state) => state.store.code);

  const { setColor } = useActions_v2();
  const selectedImage = useTypedSelector_v2(
    (state) => state.product?.selected.image,
  );
  const clientSideMediaUrl = useTypedSelector_v2(
    (state) => state.store.mediaBaseUrl,
  );
  mediaBaseUrl = mediaBaseUrl || clientSideMediaUrl;
  const selectImgHandler = (img: _OtherImage) => {
    setImage_2({ ...img, imageUrl: mediaBaseUrl + img.imageUrl });
  };
  useEffect(() => {
    setImage({
      id: 0,
      imageUrl: mediaBaseUrl + selectedColor.moreImages[0].imageUrl,
      altTag: selectedColor.moreImages[0].altTag,
    });
  }, [selectedColor?.attributeOptionId, product?.id]);

  return (
    <div
      className={`${
        storeCode === THD_STORE_CODE
          ? 'col-span-1 grid grid-cols-12 gap-[24px] pr-[15px] pt-[8px]'
          : 'lg:col-start-2 lg:col-end-7 grid grid-cols-12 gap-6'
      }`}
    >
      {storeCode === _Store_CODES.UNITi && (
        <div className='col-span-12 relative mt-[15px] border-b border-b-gray-border block lg:hidden'>
          <div className='text-large-text md:text-sub-text lg:text-large-text pb-[20px]'>
            {product?.name}
          </div>
        </div>
      )}
      <div className='col-span-12 relative'>
        {storeCode === THD_STORE_CODE &&
          selectedColor.moreImages.length > 0 && (
            <div className='hidden md:block sub-image absolute left-[10px] top-[15px] w-[70px]'>
              {selectedColor.moreImages.map((img, index) => {
                const highlight =
                  index === selectedImage.id ? 'border-secondary' : '';
                return (
                  <div
                    key={img.id + img.imageUrl}
                    className={`md:border hover:border-secondary p-[3px] mt-[5px] mb-[5px] last:mb-0 cursor-pointer ${highlight}`}
                    onClick={() => selectImgHandler(img)}
                  >
                    <NxtImage
                      src={img.imageUrl}
                      alt={img.altTag}
                      className='w-full object-center object-cover'
                      title={img.altTag}
                    />
                  </div>
                );
              })}
            </div>
          )}
        <div
          className={`${
            storeCode === THD_STORE_CODE
              ? 'main-image max-w-lg mx-auto'
              : 'main-image mb-[5px]'
          }`}
        >
          <InnerImageZoom
            src={selectedImage?.imageUrl}
            zoomType='hover'
            hideHint={true}
            className={`w-full object-center object-cover ${
              storeCode == UNITI_CODE ? 'max-h-[700px] m-auto' : ''
            } `}
          />
        </div>
        {/* https://redefinecommerce.blob.core.windows.net/rdcbeta/1/product/attributeimages/attribute_10887_10887_1.jpg */}
        <div className='sub-image w-full flex justify-center text-center'>
          {storeCode === UCA ||
          storeCode === UNITI_CODE ||
          storeCode === BOSTONBEAR ||
          storeCode === THD_STORE_CODE ||
          storeCode == BACARDI ||
          storeCode == _Store_CODES.USAAPUNCHOUT ? (
            <>
              {' '}
              {colors?.map((img, index) => {
                const highlight =
                  img.attributeOptionId === selectedColor?.attributeOptionId
                    ? storeCode == BACARDI
                      ? 'border-default'
                      : 'border-quaternary'
                    : 'border-slate-200';
                return (
                  <div
                    key={img.attributeOptionId + img.imageUrl}
                    className={`w-[80px] h-[80px] overflow-hidden mr-[5px] mb-[15px] border-2 gray-border hover:border-quaternary p-[5px] ${highlight}`}
                    onClick={() => {
                      if (
                        selectedColor.name == img.name &&
                        storeCode == BOSTONBEAR
                      ) {
                        return;
                      }

                      setColor(img);
                      setImage_2({
                        id: img.attributeOptionId,
                        imageUrl: img.imageUrl,
                        altTag: img.altTag,
                        mediaBaseUrl,
                      });
                      clearToCheckout();
                      return;
                    }}
                  >
                    <NxtImage
                      src={img.imageUrl}
                      alt={img.altTag}
                      className='max-h-full m-auto cursor-pointer'
                      title={img.altTag}
                    />
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {' '}
              {selectedColor?.moreImages
                ?.map((img, index) => ({ ...img, id: index }))
                .map((img) => {
                  const highlight =
                    img.id === selectedImage.id
                      ? 'border-quaternary'
                      : 'border-slate-200';
                  return (
                    <div
                      key={img.id + img.imageUrl}
                      className={`w-[80px] h-[80px] overflow-hidden mr-[5px] mb-[15px] border gray-border hover:border-quaternary p-[5px] ${highlight}`}
                      onClick={() => selectImgHandler(img)}
                    >
                      <NxtImage
                        src={img.imageUrl}
                        alt={img.altTag}
                        className='max-h-full m-auto cursor-pointer'
                        title={img.altTag}
                      />
                    </div>
                  );
                })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductImg_Type3;
