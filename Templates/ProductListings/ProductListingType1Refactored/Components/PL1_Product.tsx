/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
import NxtImage from '@appComponents/reUsable/Image';
import Price from '@appComponents/reUsable/Price';
import { zeroValue } from '@constants/common.constant';
import { __LocalStorage } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { GetlAllProductList } from '@templates/ProductListings/ProductListingType';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { _globalStore } from 'store.global';
import PL1_ProductBoxController from './PL1_ProductController';
const WishlistBtn = dynamic(() => import('@appComponents/ui/Wishlist'), {
  ssr: false,
});
const PL1_OtherColors = dynamic(() => import('./PL1_OtherColors'), {
  ssr: false,
});
const mediaExtraUrlListingMain =
  process.env.NEXT_PUBLIC_EXTRA_MEDIA_URL_LISTING_MAIN;
const mediaExtraUrlListingThumbNail =
  process.env.NEXT_PUBLIC_EXTRA_MEDIA_URL_LISTING_THUMBNAIL;

interface _Props {
  product: GetlAllProductList;
  pageId: number;
  seType: string;
}

const PL1_Product: React.FC<_Props> = ({ product, pageId, seType }) => {
  const [wishListId, setWishListId] = useState<number>(0);
  const [wishlistPresent, setWishlistPresent] = useState<boolean>(false);

  const customerId = useTypedSelector_v2((state) => state.user.id);
  const wishListData = useTypedSelector_v2(
    (state) => state.wishlist.wishListData,
  );

  const store = useTypedSelector_v2((state) => state.store);
  const mediaBaseUrl = _globalStore.blobUrl || store.mediaBaseUrl;

  const colorChangeHandler = (
    productId: number | undefined,
    seName: string | undefined,
    color: string | undefined | null,
  ) => {
    const storageString = localStorage.getItem('selectedProducts');
    const selectedProducts: Array<{
      productId: number | undefined;
      seName: string | undefined;
      color: string | undefined | null;
    }> = storageString ? JSON.parse(storageString) : [];
    const index = selectedProducts.findIndex(
      (product) => product.productId === productId,
    );

    const productObject = {
      productId,
      seName,
      color,
    };

    if (index > -1) {
      selectedProducts[index] = productObject;
    } else {
      selectedProducts.push(productObject);
    }
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
  };

  const { currentProduct, origin, setCurrentProduct } =
    PL1_ProductBoxController({
      product,
      colorChangeHandler,
    });
  const [mainImageUrl, setMainImageUrl] = useState<string>(
    currentProduct?.imageName ? currentProduct.imageName : '',
  );
  const isbrand: boolean = seType === 'brand' ? true : false;

  useEffect(() => {
    setCurrentProduct(
      product.getProductImageOptionList && product.getProductImageOptionList[0],
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  useEffect(() => {
    if (customerId) {
      wishListData?.map((item) => {
        if (item.productId === product?.id) {
          setWishlistPresent(true);
          setWishListId(item.id);
        }
      });
    }
  }, [customerId, wishListData]);
  const { code } = useTypedSelector_v2((state) => state.store);
  return (
    <li
      id={product.id?.toString()}
      className='text-center '
      key={product.id}
      onClick={() => {
        localStorage.setItem(__LocalStorage.Productselected, `${product.id}`);
      }}
    >
      <div className=''>
        <div className='flex text-center lg:w-auto'>
          <div className='relative border border-gray-200 pb-[30px] w-full'>
            <div className='w-full rounded-md overflow-hidden aspect-w-1 aspect-h-1'>
              <Link key={product.id} href={`/${product.sename}.html`}>
                <div style={{ height: '340px' }}>
                  <a
                    href={`/${product.sename}.html`}
                    title={product.name}
                    className=''
                    style={{ display: 'block' }}
                  >
                    <NxtImage
                      src={mainImageUrl || null}
                      alt={product.name}
                      className='max-h-[348px] !inline-black m-auto'
                      cKey={currentProduct?.id}
                      extraUrl={true}
                      extraUrlPath={mediaExtraUrlListingMain}
                    />
                  </a>
                </div>
              </Link>

              {code === 'CG' && <div className='absolute top-1 right-1 text-gray-800 p-1 z-5 cursor-pointer'>
                <WishlistBtn
                  {...{
                    productId: product && product?.id ? product?.id : zeroValue,
                    name: product?.name ? product.name : '',
                    color: currentProduct?.colorName
                      ? currentProduct?.colorName
                      : '',
                    price: product.salePrice,
                    wishlistId: wishListId,
                  }}
                  iswishlist={wishlistPresent}
                  brandId={pageId}
                />
              </div>
              }
              
              {product.productTagViewModel &&
                product.productTagViewModel.length > 0 && (
                  <div
                    className={`${product.productTagViewModel[0].tagPosition}`}
                  >
                    <NxtImage
                      src={product?.productTagViewModel[0].imagename}
                      alt={''}
                      className={''}
                    />
                  </div>
                )}
            </div>
            <div className='mt-[24px] pl-[8px] pr-[8px]'>
              <div className='mt-[4px] text-center h-[35px] cursor-pointer'>
                <Link
                  key={product.id}
                  href={
                    !isbrand ? `${product.brandUrl}.html` : 'javascript:void(0)'
                  }
                >
                  <NxtImage
                    className='inline-block max-h-full'
                    src={product?.productBrandlogo}
                    alt={product?.brandName || ''}
                    useNextImage={false}
                    title={product?.brandName || ''}
                  />
                </Link>
              </div>
              <div className='mt-[14px] text-anchor hover:text-anchor-hover h-[44px] text-ellipsis overflow-hidden line-clamp-2 text-small-text tracking-[1.4px]'>
                <Link key={product.id} href={`/${product.sename}.html`}>
                  <a
                    className='relative underline text-anchor hover:text-anchor-hover leading-[20px]'
                    title={product.name}
                  >
                    {product.name}
                  </a>
                </Link>
              </div>
              <div className='mt-[12px] text-medium-text tracking-wider'>
                <span className='font-semibold'>
                  {customerId
                    ? __pagesText.productListing.PRICE
                    : __pagesText.productListing.MSRP}
                  <Price
                    value={undefined}
                    prices={{
                      msrp: customerId ? product?.lowPrice : product.msrp,
                      salePrice: product.salePrice,
                    }}
                  />
                </span>
              </div>
              <PL1_OtherColors
                setMainImageUrl={setMainImageUrl}
                product={product}
                currentProduct={currentProduct}
                setCurrentProduct={setCurrentProduct}
              />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PL1_Product;
