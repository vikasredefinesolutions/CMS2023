import { _OtherImage } from '@definations/APIs/colors.res';
import { _ProductImgProps } from '@templates/ProductDetails/Components/productDetailsComponents';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import React, { useEffect, useState } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import { _globalStore } from 'store.global';
let mediaBaseUrl = _globalStore.blobUrl; // for server side rendering

const ProductImg: React.FC<_ProductImgProps> = ({ product }) => {
  const { setImage, setImage_2 } = useActions_v2();
  const [wishlistId, setWishlistId] = useState<number>(0);
  const [wishlistPresent, setWishlistPresent] = useState<boolean>(false);

  const brandId = useTypedSelector_v2((state) => state.wishlist.brandId);
  const selectedColor = useTypedSelector_v2(
    (state) => state.product.selected.color,
  );
  const selectedImage = useTypedSelector_v2(
    (state) => state.product.selected.image,
  );
  const wishlist = useTypedSelector_v2((state) => state.wishlist.wishListData);
  const customerId = useTypedSelector_v2((state) => state.user.id);
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
  }, [selectedColor.attributeOptionId, product?.id]);

  useEffect(() => {
    wishlist.forEach((item) => {
      if (item.productId === product?.id) {
        setWishlistPresent(true);
        setWishlistId(item.id);
      }
    });
  }, [customerId, wishlist]);

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
                <img
                  src={`${mediaBaseUrl}${product?.productTagViewModel[0].imagename}`}
                />
              </div>
            ) : (
              <div className='absolute -top-2 -left-2 text-gray-800 p-1 z-5"'>
                <img
                  src={`${mediaBaseUrl}${product?.productTagViewModel[0].imagename}`}
                  width={'60px'}
                  height={'60px'}
                />
              </div>
            ))}
          <InnerImageZoom
            key={selectedImage.imageUrl}
            src={selectedImage?.imageUrl}
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
          {selectedColor.moreImages.length > 1 &&
            selectedColor?.moreImages
              ?.map((img, index) => ({ ...img, id: index }))
              .map((img) => {
                const highlight =
                  img.id === selectedImage.id
                    ? 'border-secondary'
                    : 'border-slate-200';
                return (
                  <div
                    key={img.id + img.imageUrl}
                    className={`md:border hover:border-secondary p-[3px] mt-[5px] mb-[5px] last:mb-0 bg-white cursor-pointer ${highlight}`}
                    onClick={() => selectImgHandler(img)}
                  >
                    <img
                      src={`${mediaBaseUrl}${img.imageUrl}`}
                      alt={img.altTag}
                      className='w-full object-center object-cover'
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
