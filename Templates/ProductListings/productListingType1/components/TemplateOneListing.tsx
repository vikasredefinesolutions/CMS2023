/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
import NxtImage from '@appComponents/reUsable/Image';
import Price from '@appComponents/reUsable/Price';
import WishlistButton from '@appComponents/ui/Wishlist';
import { listing_max_showcolors, zeroValue } from '@constants/common.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { GetlAllProductList } from '@templates/ProductListings/ProductListingType';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { _globalStore } from 'store.global';
import ProductBoxController from './productBoxController';

let mediaBaseUrl = _globalStore.blobUrl;

const TemplateOneListing = ({
  brandId,
  product,
  colorChangeHandler,
  seType,
}: {
  brandId: number | null;
  product: GetlAllProductList;
  skuList: string[];
  colorChangeHandler: (
    productid: number | undefined,
    seName: string | undefined,
    color: string | undefined | null,
  ) => void;
  seType: string;
}) => {
  let flag: boolean = false;
  const [wishListId, setWishListId] = useState<number>(0);
  const [wishlistPresent, setWishlistPresent] = useState<boolean>(false);
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const wishListData = useTypedSelector_v2(
    (state) => state.wishlist.wishListData,
  );
  const { isAttributeSaparateProduct } = useTypedSelector_v2(
    (state) => state.store,
  );

  const store = useTypedSelector_v2((state) => state.store);
  mediaBaseUrl = mediaBaseUrl || store.mediaBaseUrl;
  const { currentProduct, origin, setCurrentProduct } = ProductBoxController({
    product,
    colorChangeHandler,
  });
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

  if (!currentProduct) {
    return <></>;
  }

  return (
    <li className='text-center'>
      <div className=''>
        <div className='flex text-center lg:w-auto'>
          <div className='relative border border-gray-200 pb-[30px] w-full'>
            <div className='w-full rounded-md overflow-hidden aspect-w-1 aspect-h-1'>
              <Link href={`/${product.sename}.html`}>
                <div>
                  <NxtImage
                    src={
                      currentProduct?.imageName ? currentProduct.imageName : ''
                    }
                    alt=''
                    className='w-auto h-auto max-h-max cursor-pointer'
                    cKey={currentProduct.id}
                    title={product.name}
                  />
                </div>
              </Link>

              <div className='absolute top-1 right-1 text-gray-800 p-1 z-5"'>
                <WishlistButton
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
                  brandId={brandId ? brandId : 0}
                />
              </div>
            </div>
            <div className='mt-[24px] pl-[8px] pr-[8px]'>
              <div className='mt-[4px] text-center h-[35px]'>
                <Link href={!isbrand ? product.brandUrl : '#0'}>
                  <img
                    className='inline-block max-h-full'
                    src={`${mediaBaseUrl}${product.brandlogo}`}
                    alt={product.brandlogo}
                    title={product.brandName || ''}
                  />
                </Link>
              </div>
              <div className='mt-[14px] text-anchor hover:text-anchor-hover h-[44px] text-ellipsis overflow-hidden line-clamp-2 text-small-text tracking-[1.4px] leading-5'>
                <Link key={product.id} href={`/${product.sename}.html`}>
                  <a
                    className='relative underline text-[#006cd1]'
                    title={product.name}
                  >
                    {product.name}
                  </a>
                </Link>
              </div>
              <div className='mt-[12px] text-[#000000] text-normal-text text-medium-text tracking-wider'>
                <span className='font-semibold'>
                  MSRP{' '}
                  <Price
                    value={undefined}
                    prices={{
                      msrp: product.msrp,
                      salePrice: product.salePrice,
                    }}
                  />
                </span>
              </div>
              {product.getProductImageOptionList &&
                product.getProductImageOptionList.length && (
                  <ul
                    role='list'
                    className='flex flex-wrap items-center mt-[12px] justify-center space-x-1'
                  >
                    {isAttributeSaparateProduct
                      ? product.splitProductList &&
                        product?.splitProductList.map((subRow, index) =>
                          index < listing_max_showcolors ? (
                            <Link
                              key={product.id}
                              href={`/${subRow.seName}.html`}
                            >
                              <li
                                className={`w-7 h-7 border-2 hover:border-secondary cursor-pointer`}
                                key={subRow.prodcutId}
                              >
                                <NxtImage
                                  src={`${mediaBaseUrl}${subRow.imageurl}`}
                                  alt=''
                                  className=''
                                  title={subRow.colorName}
                                />
                              </li>
                            </Link>
                          ) : (
                            <>{(flag = true)}</>
                          ),
                        )
                      : product.getProductImageOptionList.map((subRow, index) =>
                          index < listing_max_showcolors ? (
                            <li
                              className={`w-7 h-7 border-2 hover:border-secondary cursor-pointer ${
                                subRow.id === currentProduct.id
                                  ? ' border-secondary'
                                  : 'border-light-gray'
                              }`}
                              onClick={() => {
                                colorChangeHandler(
                                  product.id,
                                  product.sename || '',
                                  subRow.colorName,
                                );
                                setCurrentProduct(subRow);
                              }}
                              key={subRow.id}
                            >
                              <NxtImage
                                src={`${mediaBaseUrl}${subRow.imageName}`}
                                alt=''
                                className=''
                                title={subRow.colorName}
                              />
                            </li>
                          ) : (
                            <>{(flag = true)}</>
                          ),
                        )}
                    {flag ? (
                      <Link key={product.id} href={`/${product.sename}.html`}>
                        <li className='w-[28px] h-[28px] border-2 border-light-gray hover:border-secondary relative cursor-pointer'>
                          <span
                            className='absolute inset-0 bg-primary text-xs bg-[#003a70] font-semibold flex items-center justify-center text-[#ffffff]'
                            title={` See Additional ${
                              product.getProductImageOptionList &&
                              product.getProductImageOptionList.length -
                                listing_max_showcolors
                            } Colors`}
                          >
                            {' '}
                            +{' '}
                            {product.getProductImageOptionList &&
                              product.getProductImageOptionList.length -
                                listing_max_showcolors}
                          </span>
                        </li>
                      </Link>
                    ) : null}
                  </ul>
                )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default TemplateOneListing;
