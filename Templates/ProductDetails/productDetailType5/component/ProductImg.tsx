import NxtImage from '@appComponents/reUsable/Image';
import WishlistButton from '@appComponents/ui/Wishlist';
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
    setImage_2(img);
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
    <div className='lg:col-span-6 grid grid-cols-12 pr-[15px] pt-[8px]'>
      <div className='col-span-12 border border-gray-border relative'>
        {/* <div className='col-span-12 mb-[10px] text-small-text font-medium'>
          <a href='product-listing.html' className='' title=''>
            &lt;&lt; Back
          </a>
        </div> */}
        <div className='main-image max-w-lg mx-auto'>
          <InnerImageZoom
            src={selectedImage?.imageUrl}
            zoomType='hover'
            hideHint={true}
            className='sm:rounded-lg main_image max-h-full'
          />
        </div>
        {/* https://redefinecommerce.blob.core.windows.net/rdcbeta/1/product/attributeimages/attribute_10887_10887_1.jpg */}

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
      </div>
      <div className='col-span-12 hidden md:flex items-center justify-center gap-[5px] sub-image mt-[15px]'>
        {selectedColor?.moreImages
          ?.map((img, index) => ({ ...img, id: index }))
          .map((img) => {
            const highlight =
              img.id === selectedImage.id
                ? 'border-primary'
                : 'border-secondary';
            return (
              <div
                key={img.id + img.imageUrl}
                className={`md:border w-[70px] h-[70px] ${highlight} p-[3px] cursor-pointer`}
                onClick={() => {
                  selectImgHandler(img);
                }}
              >
                <NxtImage
                  src={img.imageUrl}
                  alt={img.altTag}
                  className='max-h-full'
                  title={img.altTag}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductImg_Type3;
