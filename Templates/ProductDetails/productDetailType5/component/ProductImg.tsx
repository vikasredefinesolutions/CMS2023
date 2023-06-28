import WishlistButton from '@appComponents/ui/Wishlist';
import { _OtherImage } from '@definations/APIs/colors.res';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import { _globalStore } from 'store.global';
import ColorImage from './ColorImage';
import { _ProductImgProps } from './productDetailsComponents';

let mediaBaseUrl = _globalStore.blobUrl; // for server side rendering

const ProductImg_Type3: React.FC<_ProductImgProps> = ({ product }) => {
  const router = useRouter();
  const { setImage, setImage_2 } = useActions_v2();
  const [wishlistId, setWishlistId] = useState<number>(0);
  const [wishlistPresent, setWishlistPresent] = useState<boolean>(false);
  const colors = useTypedSelector_v2((state) => state.product?.product.colors);
  // const handleChooseColor = (product: _ProductColor) => {
  //   if (!product.productSEName || product.productSEName === '') {
  //     setColor(product);
  //     return;
  //   }
  //   router.push(product.productSEName);
  // };
  const brandId = useTypedSelector_v2((state) => state.wishlist.brandId);
  const selectedColor = useTypedSelector_v2(
    (state) => state.product?.selected.color,
  );

  const selectedColor2 = useTypedSelector_v2(
    (state) => state.product?.selected,
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
    <div className='lg:col-span-6 grid grid-cols-12 lg:pr-[15px] pr-[0px] pt-[8px] lg:my-[30px]'>
      <div className='lg:hidden col-span-12'>
        <div className='text-title-text !font-bold pb-[10px]'>
          {' '}
          Carhartt Men's Rugged Professional Series Long Sleeve Shirt{' '}
        </div>
      </div>
      <span className='col-span-12 mb-[10px] text-small-text font-medium'>
        <a
          href='javascript:history.back(-1)'
          className='text-[#051c2c] font-bold'
          title='Back'
        >
          &lt;&lt; Back
        </a>
      </span>
      <div className='col-span-12 border border-gray-border relative'>
        <div className='main-image max-w-lg mx-auto'>
          <InnerImageZoom
            src={selectedImage?.imageUrl}
            zoomType='hover'
            hideHint={true}
            className='main_image max-h-full'
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
      {/* <div className='col-span-12 hidden md:flex items-center justify-center gap-[5px] sub-image mt-[15px]'>
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
      </div> */}
      <div className='col-span-12 flex flex-wrap justify-center m-[10px]'>
        {colors &&
          colors.map((product, index) => {
            const highlight =
              product.attributeOptionId === selectedColor?.attributeOptionId
                ? 'border-primary'
                : 'border-secondary';
            return (
              <div
                className={`border-2 mx-[5px] mb-[10px] p-[1px] w-[70px] max-h-[70px] ${highlight}`}
                onClick={() => setColor(product)}
                key={product.attributeOptionId}
              >
                <ColorImage product={product} />
              </div>
            );
          })}
      </div>
      <div className='text-center p-[15px] col-span-12 flex flex-wrap justify-center m-[10px]'>
        <p
          className='max-width-sm'
          style={{ margin: '0 auto', maxWidth: '400px' }}
        >
          This product is subject to order minimum and maximum quantity
          requirements
        </p>
      </div>
    </div>
  );
};

export default ProductImg_Type3;
