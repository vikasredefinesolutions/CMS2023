/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
import NxtImage from '@appComponents/reUsable/Image';
import Price from '@appComponents/reUsable/Price';
import {
  BACARDI,
  BOSTONBEAR,
  CYXTERA_CODE,
  THD_STORE_CODE,
  UCA,
  UNITI_CODE,
  _Store_CODES,
  listing_max_showcolors,
} from '@constants/global.constant';

import { splitproductList } from '@definations/productList.type';
import {
  AddRemoveToCompare,
  getCompareLink,
  getSkuList,
} from '@helpers/compare.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import {
  GetProductImageOptionList,
  GetlAllProductList,
} from '@templates/ProductListings/ProductListingType';
import ProductBoxController from '@templates/ProductListings/productListingType1/components/productBoxController';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { _globalStore } from 'store.global';

let mediaBaseUrl = _globalStore.blobUrl;

interface _Props {
  product: GetlAllProductList;
  pageId: number;
  seType: string;
  skuList?: string | any[];
  setSkuList?: any;
}

const PL3_Product: React.FC<_Props> = (props) => {
  const { product, skuList, setSkuList } = props;

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

  const { currentProduct, origin, setCurrentProduct } = ProductBoxController({
    product,
    colorChangeHandler,
  });
  const productView = useTypedSelector_v2((state) => state.listing.listingView);

  const router = useRouter();
  const store = useTypedSelector_v2((state) => state.store);
  // console.log(store, '<-------------store');
  const { isAttributeSaparateProduct } = useTypedSelector_v2(
    (state) => state.store,
  );
  mediaBaseUrl = mediaBaseUrl || store.mediaBaseUrl;

  const { code: storeCode } = useTypedSelector_v2((state) => state.store);
  const compareCheckBoxHandler = (sku: string) => {
    if (localStorage) {
      AddRemoveToCompare(sku);
      setSkuList(getSkuList());
    }
  };

  useEffect(() => {
    if (storeCode == BACARDI) {
      setSkuList(getSkuList());
    }
  }, [storeCode]);

  const [mainImageUrl, setMainImageUrl] = useState<string>(
    currentProduct?.imageName ? currentProduct.imageName : '',
  );

  useEffect(() => {
    setCurrentProduct(
      product.getProductImageOptionList && product.getProductImageOptionList[0],
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  let flag: boolean = false;

  return productView === 'grid' ? (
    <li className='text-center'>
      <div
        className={`flex justify-center w-full border border-transparent ${
          storeCode === BACARDI
            ? ''
            : 'hover:border-gray-border hover:shadow-md'
        }`}
      >
        <div className='relative w-full mb-[20px]'>
          <div
            className={`w-full ${
              storeCode === BACARDI
                ? 'px-[5px] pt-[5px]'
                : ' px-[30px] pt-[10px]'
            } cursor-pointer`}
          >
            <Link href={`${origin}/${product.sename}.html`}>
              <a
                title={product.name}
                className='flex justify-center items-center h-[348px]'
                href={`${origin}/${product.sename}.html`}
              >
                <NxtImage
                  src={mainImageUrl || null}
                  alt={product.name}
                  className={`${'max-h-[348px] mx-auto'}`}
                  key={currentProduct?.id}
                  title={product.name}
                />
              </a>
            </Link>
            {product?.productTagViewModel?.map((tagsdetails) => {
              return (
                <div
                  className={`${tagsdetails.tagPosition} h-8 flex gap-1 absolute`}
                  data-imageUrl={`${tagsdetails.imagename}`}
                >
                  <div className='h-8'>
                    <NxtImage
                      alt={''}
                      src={tagsdetails.imagename}
                      className='max-h-full inline-block'
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className={`mt-[20px] relative ${
              storeCode === BACARDI
                ? ' md:px-[10px] px-[5px]'
                : ' md:px-[30px] px-[15px]'
            }`}
          >
            <div
              className={`mb-[10px] mt-[10px] ${
                storeCode == UNITI_CODE ||
                storeCode === _Store_CODES.USAAHEALTHYPOINTS ||
                storeCode === THD_STORE_CODE ||
                storeCode === _Store_CODES.USAAPUNCHOUT
                  ? 'h-[44px] text-default-text'
                  : ' h-[42px] text-medium-text'
              } overflow-hidden `}
            >
              <Link href={`${origin}/${product.sename}.html`}>
                <a
                  className={`relative ${
                    storeCode === BACARDI
                      ? 'text-default hover:text-default'
                      : storeCode === UNITI_CODE
                      ? 'text-anchor hover:text-anchor'
                      : storeCode === THD_STORE_CODE ||
                        storeCode === _Store_CODES.USAAPUNCHOUT
                      ? 'text-anchor hover:text-anchor font-semibold'
                      : 'text-anchor hover:text-anchor'
                  } `}
                  title={product.name}
                >
                  {product.name}
                </a>
              </Link>
            </div>
            <div
              className={`mb-[12px] text-sub-text ${
                storeCode === BACARDI ? ' tracking-widest' : ''
              }`}
            >
              <span
                className={` ${
                  storeCode === BACARDI
                    ? // ? ' text-[#3A5A78] '
                      'text-secondary font-bold'
                    : storeCode === _Store_CODES.UNITi
                    ? 'text-quaternary !font-normal'
                    : 'text-primary'
                }`}
              >
                <Price
                  value={undefined}
                  prices={{
                    msrp: product.msrp,
                    salePrice: product.salePrice,
                  }}
                />
              </span>
            </div>
            {storeCode === BACARDI && skuList && (
              <div className='form-group mb-[12px] text-small-text'>
                <label className='checkbox-inline align-top'>
                  <input
                    checked={skuList.includes(product?.sku ? product.sku : '')}
                    onChange={() =>
                      compareCheckBoxHandler(product?.sku ? product.sku : '')
                    }
                    type='checkbox'
                    className='w-4 h-4 mr-1 align-bottom'
                  />{' '}
                  {
                    <>
                      {skuList.length &&
                      skuList.includes(product?.sku ? product.sku : '') ? (
                        skuList.length === 1 ? (
                          <span>
                            Please select two or more products to Add to Compare
                            to use this feature.
                          </span>
                        ) : (
                          <Link href={getCompareLink()}>
                            <span>Compare ({skuList.length})</span>
                          </Link>
                        )
                      ) : (
                        <>Add to Compare</>
                      )}
                    </>
                  }
                </label>
              </div>
            )}
            <ul
              role='list'
              className='flex flex-wrap items-center mt-[8px] justify-center space-x-1'
            >
              {isAttributeSaparateProduct &&
              product.splitproductList &&
              product.splitproductList?.length > 0
                ? product.splitproductList &&
                  product?.splitproductList.map(
                    (subRow: splitproductList, index: number) =>
                      index < listing_max_showcolors ? (
                        <Link key={product.id} href={`/${subRow.seName}.html`}>
                          <li
                            className={`w-[30px] h-[30px] p-[1px] border ${
                              storeCode === BACARDI
                                ? ' hover:border-default'
                                : storeCode === _Store_CODES.UNITi
                                ? 'hover:border-secondary '
                                : 'hover:border-quaternary'
                            }  cursor-pointer ${
                              product.id === currentProduct?.id
                                ? 'border-secondary'
                                : ''
                            }`}
                            key={subRow.prodcutId}
                          >
                            <NxtImage
                              src={subRow.imageurl || null}
                              alt={subRow.colorName}
                              className='m-auto max-h-full'
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
                          className={`w-[30px] h-[30px] p-[1px] ${
                            storeCode === THD_STORE_CODE ||
                            storeCode === _Store_CODES.USAAPUNCHOUT
                              ? 'border-2'
                              : 'border'
                          } ${
                            (storeCode === THD_STORE_CODE ||
                              storeCode === _Store_CODES.USAAPUNCHOUT) &&
                            subRow.id !== currentProduct.id
                              ? ' hover:border-primary'
                              : ''
                          } ${
                            storeCode === BACARDI
                              ? ' hover:border-quaternary'
                              : storeCode === _Store_CODES.UNITi
                              ? 'hover:border-secondary  '
                              : 'hover:border-quaternary'
                          } cursor-pointer ${
                            subRow.id === currentProduct?.id
                              ? storeCode === BACARDI
                                ? 'border-default'
                                : storeCode === _Store_CODES.UNITi
                                ? 'border-secondary '
                                : storeCode === THD_STORE_CODE ||
                                  storeCode === _Store_CODES.USAAPUNCHOUT
                                ? 'border-secondary'
                                : 'border-quaternary'
                              : ''
                          }`}
                          onMouseOver={() => setMainImageUrl(subRow.imageName)}
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
                            setMainImageUrl(
                              subRow?.imageName ? subRow?.imageName : '',
                            );
                            setCurrentProduct(subRow);
                          }}
                          key={subRow.id}
                        >
                          <NxtImage
                            src={subRow.imageName || null}
                            alt=''
                            className='m-auto max-h-full'
                            title={subRow.colorName}
                          />
                        </li>
                      ) : (
                        <>{(flag = true)}</>
                      ),
                  )}
              {flag ? (
                <Link key={product.id} href={`/${product.sename}.html`}>
                  <li
                    className={`w-[28px] h-[28px] border border-light-gray${
                      storeCode === BACARDI
                        ? ' hover:border-default'
                        : 'hover:border-quaternary'
                    } relative cursor-pointer `}
                  >
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
            {(store.code === CYXTERA_CODE ||
              store.code === UCA ||
              store.code == UNITI_CODE) && (
              <div className='mt-[10px]'>
                <button
                  onClick={() => router.push(`/${product.sename}.html`)}
                  className='btn btn-secondary'
                >
                  <i className='fa-solid fa-basket-shopping'></i>
                  <span>Add To Cart</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  ) : (
    <li className=''>
      <div
        className={`${
          storeCode == BACARDI
            ? ''
            : 'border border-gray-border hover:border-gray-border'
        } w-full `}
      >
        <div className='w-full flex flex-wrap m-[15px]'>
          <div
            className={`${
              storeCode == BACARDI ? 'w-[30%] lg:w-[25%]' : 'w-auto'
            }`}
          >
            <Link
              key={product.id}
              href={`${origin}/${product.sename}.html`}
              passHref
            >
              <a className='cursor-pointer w-full '>
                <NxtImage
                  src={mainImageUrl || null}
                  alt=''
                  className='m-auto cursor-pointer max-h-[348px]'
                  key={currentProduct?.id}
                  title={product.name}
                />
              </a>
            </Link>
            {product?.productTagViewModel?.map((tagsdetails) => {
              return (
                <div
                  className={`${tagsdetails.tagPosition}`}
                  data-imageUrl={`${tagsdetails.imagename}`}
                >
                  <NxtImage
                    alt={''}
                    useNextImage={false}
                    src={tagsdetails.imagename}
                    className='max-h-full inline-block'
                  />
                </div>
              );
            })}
          </div>

          <div
            className={`${
              storeCode == BACARDI
                ? 'md:mt-[20px] relative px-[30px] w-[70%] lg:w-[75%]'
                : 'mt-[20px] relative md:px-[30px]'
            } `}
          >
            <div
              className={`mb-[10px] ${
                storeCode == BACARDI ? 'md:mt-[10px]' : 'mt-[10px]'
              } ${
                storeCode == UNITI_CODE
                  ? 'h-[44px] text-default-text'
                  : `${
                      storeCode == BOSTONBEAR || storeCode === BACARDI
                        ? ''
                        : 'h-[42px]'
                    }${
                      storeCode === THD_STORE_CODE ||
                      storeCode === _Store_CODES.USAAPUNCHOUT
                        ? 'text-default-text'
                        : 'text-medium-text'
                    } `
              } overflow-hidden`}
            >
              <a
                key={product.id}
                href={`${origin}/${product.sename}.html`}
                className={`relative text-anchor hover:text-anchor ${
                  storeCode === THD_STORE_CODE ||
                  storeCode === _Store_CODES.USAAPUNCHOUT
                    ? 'font-semibold'
                    : ''
                }  `}
                title={product.name}
              >
                {product.name}
              </a>
            </div>
            <div className='mb-[12px] text-sub-text'>
              <span
                className={`${
                  storeCode === _Store_CODES.UNITi
                    ? 'text-quaternary !font-normal'
                    : storeCode == BACARDI
                    ? 'text-secondary !font-bold'
                    : 'text-primary'
                }`}
              >
                <Price
                  value={undefined}
                  prices={{
                    msrp: product.msrp,
                    salePrice: product.salePrice,
                  }}
                />
              </span>
            </div>
            {storeCode === BACARDI && skuList && (
              <div className='form-group mb-[12px] text-small-text'>
                <label className='checkbox-inline align-top'>
                  <input
                    checked={skuList.includes(product?.sku ? product.sku : '')}
                    onChange={() =>
                      compareCheckBoxHandler(product?.sku ? product.sku : '')
                    }
                    type='checkbox'
                    className='w-4 h-4 mr-1 align-bottom'
                  />{' '}
                  {
                    <>
                      {skuList.length &&
                      skuList.includes(product?.sku ? product.sku : '') ? (
                        skuList.length === 1 ? (
                          <span>
                            Please select two or more products to Add to Compare
                            to use this feature.
                          </span>
                        ) : (
                          <Link href={getCompareLink()}>
                            <span>Compare ({skuList.length})</span>
                          </Link>
                        )
                      ) : (
                        <>Add to Compare</>
                      )}
                    </>
                  }
                </label>
              </div>
            )}
            <ul
              role='list'
              className='flex flex-wrap items-center mt-[8px] space-x-1'
            >
              {isAttributeSaparateProduct &&
              product.splitproductList &&
              product?.splitproductList?.length > 0 ? (
                <>
                  <Link key={product.id} href={`/${product.sename}.html`}>
                    <li
                      className={`w-[30px] h-[30px] p-[1px] border  hover:border-secondary cursor-pointer ${
                        product.id === currentProduct?.id
                          ? ' border-secondary'
                          : ''
                      }`}
                      key={product.id}
                    >
                      <NxtImage
                        src={currentProduct?.imageName || null}
                        alt=''
                        className='m-auto max-h-full cursor-pointer'
                        title={product.name}
                      />
                    </li>
                  </Link>

                  {product?.splitproductList?.map((subRow, index) =>
                    index < listing_max_showcolors - 1 ? (
                      <Link key={product.id} href={`/${subRow.seName}.html`}>
                        <li
                          className={`w-[30px] h-[30px] p-[1px] border  hover:border-secondary cursor-pointer ${
                            product.id === currentProduct?.id
                              ? 'border-secondary'
                              : ''
                          }`}
                          key={subRow.prodcutId}
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
                            src={subRow.imageurl || null}
                            alt={subRow.colorName}
                            className='m-auto max-h-full'
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
                      className={`w-[30px] h-[30px] p-[1px] ${
                        storeCode === THD_STORE_CODE ||
                        storeCode === _Store_CODES.USAAPUNCHOUT
                          ? 'border-2 hover:border-quaternary'
                          : 'border hover:border-secondary'
                      }   cursor-pointer ${
                        subRow.id === currentProduct?.id
                          ? 'border-secondary'
                          : ''
                      } `}
                      onMouseOver={() => setMainImageUrl(subRow.imageName)}
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
                        setMainImageUrl(
                          subRow?.imageName ? subRow?.imageName : '',
                        );
                        setCurrentProduct(subRow);
                      }}
                      key={subRow.id}
                    >
                      <NxtImage
                        src={subRow.imageName || null}
                        alt=''
                        className='m-auto max-h-full'
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
                  <li className='w-[28px] h-[28px] border border-light-gray hover:border-secondary relative cursor-pointer'>
                    <span
                      className='absolute inset-0 bg-primary text-xs bg-[#003a70] font-semibold flex items-center justify-center text-[#ffffff]'
                      title={` See Additional ${
                        isAttributeSaparateProduct
                          ? product.splitproductList &&
                            product.splitproductList?.length -
                              listing_max_showcolors +
                              1
                          : product.getProductImageOptionList &&
                            product.getProductImageOptionList.length -
                              listing_max_showcolors
                      } Colors`}
                    >
                      +
                      {isAttributeSaparateProduct
                        ? product.splitproductList &&
                          product.splitproductList?.length -
                            listing_max_showcolors +
                            1
                        : product.getProductImageOptionList &&
                          product.getProductImageOptionList.length -
                            listing_max_showcolors}
                    </span>
                  </li>
                </Link>
              ) : null}
            </ul>
            {(store.code === CYXTERA_CODE ||
              store.code === UCA ||
              store.code == UNITI_CODE) && (
              <div className='mt-[10px]'>
                <button
                  onClick={() => router.push(`/${product.sename}.html`)}
                  className='btn btn-secondary'
                >
                  <i className='fa-solid fa-basket-shopping'></i>
                  <span>Add To Cart</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default PL3_Product;
