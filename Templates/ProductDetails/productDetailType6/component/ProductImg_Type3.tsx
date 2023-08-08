import NxtImage from '@appComponents/reUsable/Image';
import WishlistButton from '@appComponents/ui/Wishlist';
import { UNITI_CODE, _Store_CODES } from '@constants/global.constant';
import { _OtherImage, _ProductColor } from '@definations/APIs/colors.res';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import { _globalStore } from 'store.global';
import { _ProductImgProps } from './productDetailsComponents';

let mediaBaseUrl = _globalStore.blobUrl; // for server side rendering

const ProductImg_Type3: React.FC<_ProductImgProps> = ({ product }) => {
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
  const storeCode = useTypedSelector_v2((state) => state.store.code);
  const selectedColor = useTypedSelector_v2(
    (state) => state.product?.selected.color,
  );
  const { setColor } = useActions_v2();
  const selectedImage = useTypedSelector_v2(
    (state) => state.product?.selected.image,
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
  }, [selectedColor?.attributeOptionId, product?.id]);

  useEffect(() => {
    wishlist.forEach((item) => {
      if (item.productId === product?.id) {
        setWishlistPresent(true);
        setWishlistId(item.id);
      }
    });
  }, [customerId, wishlist]);

  return (
    <div className='lg:col-start-2 lg:col-end-7 grid grid-cols-12 gap-6'>
      <div className='col-span-12 relative'>
        <div
          className={`main-image mb-[5px] ${
            storeCode == UNITI_CODE
              ? 'mx-auto lg:max-h-[700px] overflow-hidden'
              : ''
          } `}
        >
          <figure className='iiz w-full object-center object-cover'>
            <div className='h-[700px] flex items-center justify-center overflow-hidden '>
              <InnerImageZoom
                src={selectedImage?.imageUrl}
                zoomType='hover'
                hideHint={true}
                className='max-h-full m-auto'
              />
            </div>
          </figure>
        </div>
        {/* https://redefinecommerce.blob.core.windows.net/rdcbeta/1/product/attributeimages/attribute_10887_10887_1.jpg */}
        <div className='sub-image w-full flex justify-center text-center'>
          {selectedColor?.moreImages
            ?.map((img, index) => ({ ...img, id: index }))
            .map((img) => {
              const highlight =
                img.id === selectedImage.id
                  ? 'border-primary'
                  : 'border-slate-200';
              return (
                <div
                  key={img.id + img.imageUrl}
                  className={`w-[80px] h-[80px] overflow-hidden mr-[5px] mb-[15px] border gray-border hover:border-secondary p-[5px]`}
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
        </div>

        {storeCode !== _Store_CODES.USAAHEALTHYPOINTS && (
          <div className='absolute right-[10px] top-[25px] w-6 h-6'>
            <button className=''>
              <WishlistButton
                {...{
                  productId: product?.id,
                  name: product?.name,
                  color: selectedColor.name,
                  price: product?.salePrice,
                  wishlistId: wishlistId,
                }}
                iswishlist={wishlistPresent}
                brandId={brandId ? brandId : 0}
              />
            </button>
          </div>
        )}
      </div>
      {/* <div className='col-span-12 flex flex-wrap justify-center'>
        {colors &&
          colors.map((product, index) => {
            return (
              <div
                className='border border-gray-border hover:border-secondary mx-[5px] mb-[10px] p-[1px] w-[70px] max-h-[70px] cursor-pointer'
                key={product.attributeOptionId}
                onClick={() => handleChooseColor(product)}
              >
                <ColorImage_Type3 product={product} />
              </div>
            );
          })}
      </div> */}

      {/* {product?.companionProductName !== null ? (
        <ProductCompanion_Type3 product={product} />
      ) : null} */}
    </div>
  );
};

export default ProductImg_Type3;
