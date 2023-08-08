import NxtImage from '@appComponents/reUsable/Image';
import { _Store } from '@configs/page.config';
import { _OtherImage, _ProductColor } from '@definations/APIs/colors.res';
import { _ProductImgProps } from '@templates/ProductDetails/Components/productDetailsComponents';
import ColorImage from '@templates/ProductDetails/productDetailType2/component/ColorImage';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import { _globalStore } from 'store.global';

let mediaBaseUrl = _globalStore.blobUrl; // for server side rendering

const ProductImg: React.FC<_ProductImgProps> = ({ product }) => {
  const router = useRouter();
  const { setImage, setImage_2 } = useActions_v2();
  const [wishlistId, setWishlistId] = useState<number>(0);
  const [wishlistPresent, setWishlistPresent] = useState<boolean>(false);
  const colors = useTypedSelector_v2((state) => state.product?.product.colors);
  const handleChooseColor = (product: _ProductColor) => {
    if (!product.productSEName || product.productSEName === '') {
      setColor(product);
      return;
    }
    router.push(product.productSEName);
  };
  const brandId = useTypedSelector_v2((state) => state.wishlist.brandId);
  const selectedColor = useTypedSelector_v2(
    (state) => state.product?.selected.color,
  );

  const { setColor } = useActions_v2();
  const selectedImage = useTypedSelector_v2(
    (state) => state.product?.selected.image,
  );
  // const wishlist = useTypedSelector_v2((state) => state.wishlist.wishListData);
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const clientSideMediaUrl = useTypedSelector_v2(
    (state) => state.store.mediaBaseUrl,
  );
  const storeCode = useTypedSelector_v2((state) => state.store.code);
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

  // useEffect(() => {
  //   wishlist.forEach((item) => {
  //     if (item.productId === product?.id) {
  //       setWishlistPresent(true);
  //       setWishlistId(item.id);
  //     }
  //   });
  // }, [customerId, wishlist]);

  return (
    <div className='col-span-1 grid grid-cols-12 gap-[10px] lg:pr-[15px] pr-[0px] pt-[8px]'>
      <div className='col-span-12 border border-gray-border relative'>
        {product?.productTagViewModel?.map((tagsdetails) => {
          return (
            <div
              className={`${tagsdetails.tagPosition}`}
              data-imageUrl={`${tagsdetails.imagename}`}
            >
              <NxtImage
                alt=''
                useNextImage={false}
                src={tagsdetails.imagename}
                className='max-h-full inline-block'
              />
            </div>
          );
        })}
        <div
          className={`main-image max-w-lg mx-auto ${
            storeCode == _Store.type4 ? 'lg:max-h-[700px] overflow-hidden' : ''
          } `}
        >
          <InnerImageZoom
            src={selectedImage?.imageUrl}
            zoomType='hover'
            hideHint={true}
            className='w-full object-center object-cover  main_image max-h'
          />
        </div>
        <div className='hidden md:block sub-image absolute left-[10px] top-[15px] w-[70px]'>
          {selectedColor.moreImages.length > 1 &&
            selectedColor?.moreImages
              ?.map((img, index) => ({ ...img, id: index }))
              .map((img) => {
                const highlight =
                  img.id === selectedImage.id
                    ? 'border-secondary'
                    : 'border-gray-border';
                return (
                  <div
                    className={`md:border hover:border-primary p-[3px] mt-[5px] mb-[5px] last:mb-0 cursor-pointer ${highlight}`}
                    key={img.id + img.imageUrl}
                    onClick={() => selectImgHandler(img)}
                  >
                    <NxtImage
                      src={img.imageUrl}
                      alt={img.altTag}
                      className={`${highlight} max-h-full m-auto ${
                        storeCode == _Store.type4 ? 'w-[70px] h-[70px]' : ''
                      }`}
                      title={img.altTag}
                    />
                  </div>
                );
              })}
        </div>
      </div>
      <div className='col-span-12 text-center pt-[20px]'>
        <div className='text-title-text'>Available Colors:</div>
      </div>
      <div className='col-span-12 flex flex-wrap justify-center'>
        {colors &&
          colors.map((product, index) => {
            return (
              <div>
                <div
                  className={`border-2 hover:border-primary  mx-[5px] mb-[10px] p-[1px] w-[70px] max-h-[70px] ${
                    selectedColor.attributeOptionId == product.attributeOptionId
                      ? 'border-secondary'
                      : 'border-gray-border'
                  }`}
                  onClick={() => setColor(product)}
                  key={product.attributeOptionId}
                >
                  <ColorImage product={product} />
                </div>
                <div className='text-center w-[80px] text-extra-small-text px-[4px]'>
                  {product.name}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductImg;
