/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
import ProductQuoteRequest from '@appComponents/modals/ProductQuoteRequest';
import NxtImage from '@appComponents/reUsable/Image';
import Price from '@appComponents/reUsable/Price';
import WishlistButton from '@appComponents/ui/Wishlist';
import { listing_max_showcolors, zeroValue } from '@constants/global.constant';
import { _modals } from '@definations/product.type';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { GetlAllProductList } from '@templates/ProductListings/ProductListingType';
import ProductBoxController from '@templates/ProductListings/productListingType1/components/productBoxController';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { _globalStore } from 'store.global';

let mediaBaseUrl = _globalStore.blobUrl;

const TemplateFiveListing = ({
  product,
  skuList,
  productView,
  colorChangeHandler,
  compareCheckBoxHandler,
  brandId,
}: {
  product: GetlAllProductList;
  skuList: string[];
  productView: string;
  colorChangeHandler: (
    productid: number | undefined,
    seName: string | undefined,
    color: string | undefined | null,
  ) => void;
  compareCheckBoxHandler: (sku: string) => void;
  brandId: number | null;
}) => {
  let flag: boolean = false;
  const { currentProduct, origin, setCurrentProduct } = ProductBoxController({
    product,
    colorChangeHandler,
  });
  const store = useTypedSelector_v2((state) => state.store);
  const [wishListId, setWishListId] = useState<number>(0);
  const [wishlistPresent, setWishlistPresent] = useState<boolean>(false);
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const { isAttributeSaparateProduct } = useTypedSelector_v2(
    (state) => state.store,
  );
  const wishListData = useTypedSelector_v2(
    (state) => state.wishlist.wishListData,
  );
  const [openModal, setOpenModal] = useState<null | _modals>(null);
  mediaBaseUrl = mediaBaseUrl || store.mediaBaseUrl;

  const [mainImageUrl, setMainImageUrl] = useState<string>(
    currentProduct?.imageName ? currentProduct.imageName : '',
  );
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

  const modalHandler = (param: null | _modals) => {
    if (param) {
      setOpenModal(param);
      return;
    }
    setOpenModal(null);
  };

  if (!currentProduct) {
    return <></>;
  }

  const getProductsColorCount = () => {
    if (isAttributeSaparateProduct && product.splitproductList) {
      return product.splitproductList?.length - listing_max_showcolors + 1;
    } else if (product?.getProductImageOptionList) {
      return product.getProductImageOptionList.length - listing_max_showcolors;
    }
    return '';
  };

  return (
    <li className='text-center'>
      <div className='h-full'>
        <div className='text-center lg:w-auto h-full'>
          {/* <div className='relative w-full mb-[20px]'> */}
          <div className=' relative border border-gray-border p-[20px]'>
            <div className='w-full rounded-md overflow-hidden'>
              <Link
                href={`${origin}/${product.sename}.html`}
                className='relative cursor-pointer'
              >
                <div>
                  <a title={product.name} style={{ display: 'block' }}>
                    <NxtImage
                      src={mainImageUrl}
                      alt={product.name}
                      className='max-h-full'
                      key={currentProduct?.id}
                    />
                  </a>
                </div>
              </Link>
              <div className='absolute top-2 right-2 text-gray-800 p-1 z-5'>
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
            <div className='mt-[10px] relative'>
              <div className='mb-[10px] text-center'>
                <a
                  className='inline-flex items-center gap-[5px] font-medium tracking-[1px] hover:text-primary-hover'
                  href={`${origin}/${product.sename}.html`}
                >
                  <span>
                    <NxtImage
                      isStatic={true}
                      src='/assets/images/personalize-icon.png'
                      className='max-h-6'
                      alt=''
                    />
                  </span>
                  <span>PERSONALIZE</span>
                </a>
              </div>
              <div className='mb-[10px] '>
                <a
                  href={`${origin}/${product.sename}.html`}
                  className='relative text-sub-text font-bold h-[45px] overflow-hidden inline-block !font-bold'
                  title={product.name}
                >
                  {product.name}
                </a>
              </div>
              <div className='mb-[10px] text-small-text'>
                <span className='font-semibold'>
                  <span className='pr-[3px] inline-block'>MSRP</span>

                  <Price
                    value={undefined}
                    prices={{
                      msrp: product.msrp,
                      salePrice: product.salePrice,
                    }}
                  />
                </span>
              </div>
              {/* <div className='form-group mb-[12px] text-default-text'>
              <label className='checkbox-inline'>
                <input
                  checked={skuList.includes(product?.sku ? product.sku : '')}
                  onChange={() =>
                    compareCheckBoxHandler(product?.sku ? product.sku : '')
                  }
                  type='checkbox'
                />{' '}
                {
                  <>
                    {skuList.length &&
                    skuList.includes(product?.sku ? product.sku : '') ? (
                      <Link href={getCompareLink()}>
                        <a>Compare {skuList.length}</a>
                      </Link>
                    ) : (
                      <>Add to Compare</>
                    )}
                  </>
                }
              </label>
            </div> */}
              {/* <ul
                role='list'
                className='relative inline-flex flex-wrap items-center mt-[5px] justify-center gap-[2px]'
              >
                {isAttributeSaparateProduct
                  ? product.splitproductList &&
                    product.splitproductList?.length > 0 &&
                    product?.splitproductList.map(
                      (subRow: splitproductList, index: number) =>
                        index < listing_max_showcolors ? (
                          <Link
                            key={product.id}
                            href={`/${subRow.seName}.html`}
                          >
                            <li
                              className={`w-7 h-7 border-2 border-primary hover:border-primary`}
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
                  : product.getProductImageOptionList &&
                    product.getProductImageOptionList.map(
                      (subRow: GetProductImageOptionList, index: number) =>
                        index < listing_max_showcolors ? (
                          <li
                            className={`w-7 h-7 border-2 hover:border-primary ${
                              subRow.id === currentProduct.id
                                ? ' border-primary'
                                : 'border-secondary'
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
                    <li className='w-7 h-7 border-2 border-secondary hover:border-primary absolute right-0 top-0 bg-black bg-opacity-50'>
                      <span
                        className='absolute inset-0 text-xs font-semibold flex items-center justify-center text-[#ffffff]'
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
              </ul> */}

              <ul
                role='list'
                className='relative inline-flex flex-wrap items-center mt-[5px] justify-center gap-[2px]'
              >
                {isAttributeSaparateProduct &&
                product.splitproductList &&
                product?.splitproductList?.length > 0 ? (
                  <>
                    <Link key={product.id} href={`/${product.sename}.html`}>
                      <li
                        className={`w-7 h-7 border-2 border-primary hover:border-tertiary`}
                      >
                        <NxtImage
                          src={currentProduct?.imageName || null}
                          alt=''
                          className='max-h-full m-auto'
                          title={currentProduct.colorName}
                        />
                      </li>
                    </Link>

                    {product?.splitproductList?.map((subRow, index) =>
                      index < listing_max_showcolors - 1 ? (
                        <Link href={`/${subRow.seName}.html`}>
                          <li
                            className={`w-7 h-7 border-2 border-primary hover:border-tertiary cursor-pointer`}
                            key={`${index}_${subRow.prodcutId}`}
                            onMouseOver={() => setMainImageUrl(subRow.imageurl)}
                            onMouseLeave={() =>
                              setMainImageUrl(
                                currentProduct?.imageName
                                  ? currentProduct?.imageName
                                  : '',
                              )
                            }
                          >
                            <NxtImage
                              src={subRow?.imageurl || null}
                              alt=''
                              className='max-h-full m-auto'
                              title={subRow.colorName}
                            />
                          </li>
                        </Link>
                      ) : (
                        <>{(flag = true)}</>
                      ),
                    )}
                  </>
                ) : (
                  product.getProductImageOptionList &&
                  product.getProductImageOptionList.map((subRow, index) =>
                    index < listing_max_showcolors ? (
                      <li
                        className={`w-7 h-7 border-2 hover:border-tertiary ${
                          subRow.id === currentProduct.id
                            ? ' border-primary'
                            : 'border-secondary'
                        } cursor-pointer`}
                        onMouseOver={() =>
                          setMainImageUrl(subRow?.imageName ?? '')
                        }
                        onMouseLeave={() =>
                          setMainImageUrl(
                            currentProduct?.imageName
                              ? currentProduct?.imageName
                              : '',
                          )
                        }
                        onClick={() => {
                          colorChangeHandler(
                            product.id,
                            product.sename || '',
                            subRow.colorName,
                          );
                          setCurrentProduct(subRow);
                        }}
                        key={`${index}_${subRow.id}`}
                      >
                        <NxtImage
                          src={subRow?.imageName || null}
                          alt=''
                          className='max-h-full m-auto'
                          title={subRow.colorName}
                        />
                      </li>
                    ) : (
                      <>{(flag = true)}</>
                    ),
                  )
                )}
                {flag ? (
                  <Link key={product.id} href={`/${product.sename}.html`}>
                    <li className='w-[28px] h-[28px] border-2 border-light-gray hover:border-secondary relative cursor-pointer'>
                      <span
                        className='absolute inset-0 bg-primary text-xs bg-[#003a70] font-semibold flex items-center justify-center text-[#ffffff]'
                        title={` See Additional ${getProductsColorCount()} Colors`}
                      >
                        +{getProductsColorCount()}
                      </span>
                    </li>
                  </Link>
                ) : null}
              </ul>
            </div>
            <div className='mt-3'>
              <div
                className='btn btn-tertiary'
                onClick={() => setOpenModal('qouteRequest')}
              >
                CONTACT US
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
        {openModal === 'qouteRequest' && (
          <ProductQuoteRequest
            product={product.name}
            modalHandler={modalHandler}
          />
        )}
      </div>
    </li>
  );
};

export default TemplateFiveListing;
