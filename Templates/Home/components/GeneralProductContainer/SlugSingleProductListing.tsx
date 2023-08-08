import NxtImage, {
  default as ImageComponent,
} from '@appComponents/reUsable/Image';
import Price from '@appComponents/reUsable/Price';
import { showcolors } from '@constants/global.constant';
import { __pagesConstant } from '@constants/pages.constant';
import { __pagesText } from '@constants/pages.text';
import {
  moreImages,
  newFetauredItemResponse,
  splitproductList,
} from '@definations/productList.type';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';

interface _props {
  product: newFetauredItemResponse;
  customMessage: string;
  showProductName: string;
  showSplitProducts: string;
  showButton: string;
  showPrice: string;
  showBrandLogo: string;
  showBorder: string;
}

const SlugSingleProductListing: React.FC<_props> = (props) => {
  const {
    product,
    customMessage,
    showProductName,
    showSplitProducts,
    showButton,
    showPrice,
    showBrandLogo,
    showBorder,
  } = props;

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
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const store = useTypedSelector_v2((state) => state.store);
  const [mainImageUrl, setMainImageUrl] = useState<string>('');
  const [currentProduct, setCurrentProduct] = useState<moreImages | null>(null);
  useEffect(() => {
    setCurrentProduct(product.moreImages[0]);
    setMainImageUrl(product?.imageUrl);
  }, []);

  const getProductsColorCount = () => {
    if (showSplitProducts === 'Yes' && product.splitproductList) {
      return product?.splitproductList?.length - showcolors + 1;
    } else {
      return product?.getProductImageOptionList?.length - showcolors;
    }
  };
  let flag: boolean = false;
  const router = useRouter();
  return (
    <>
      <div key={product?.productId} className='slide-item'>
        <div className='px-2'>
          <div className='w-full'>
            <div
              className={`${
                showBorder == __pagesConstant?.show.Yes
                  ? 'border border-gray-200 bg-white border-solid p-5'
                  : 'border border-gray-50'
              } px-6 py-6 bg-white relative`}
            >
              <div className=''>
                <Link
                  key={product?.productId}
                  href={`${encodeURIComponent(product?.productSEName)}.html`}
                  className='hrefurl'
                >
                  <a
                    style={{ display: 'block' }}
                    className='w-auto h-auto m-auto max-h-[348px]'
                  >
                    <ImageComponent
                      src={store.mediaBaseUrl + mainImageUrl}
                      alt={product?.productName}
                      title={product?.productName}
                      className='max-h-[348px] !inline-black m-auto'
                      key={product?.productId}
                    />
                  </a>
                </Link>
              </div>
              <div className='mt-[24px] pl-[8px] pr-[8px]'>
                {showBrandLogo == __pagesConstant?.show?.No ? (
                  ''
                ) : (
                  <div className='mt-[4px] text-center h-[35px] cursor-pointer'>
                    <NxtImage
                      className='!inline-block max-h-full'
                      useNextImage={false}
                      src={product?.productBrandLogo}
                      alt=''
                    />
                  </div>
                )}
                {showProductName == __pagesConstant?.show.No ? (
                  ''
                ) : (
                  <div className='mt-[14px] text-anchor hover:text-anchor-hover h-[44px] text-ellipsis overflow-hidden line-clamp-2 text-small-text tracking-[1.4px]'>
                    <Link
                      key={product.productId}
                      href={`${encodeURIComponent(product.productSEName)}.html`}
                    >
                      <a
                        className='relative underline text-anchor hover:text-anchor-hover leading-[20px]'
                        title={product.productName}
                      >
                        {product.productName}
                      </a>
                    </Link>
                  </div>
                )}
                <div className='mb-2 font-semibold uppercase isinput'>
                  {customMessage ?? ''}
                </div>
                {showPrice == __pagesConstant?.show?.No ? (
                  ''
                ) : (
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
                )}
                {showSplitProducts === __pagesConstant?.show?.Yes ? (
                  <ul className='flex items-center justify-center mt-2 list-none'>
                    {product.splitproductList ? (
                      <>
                        <Link
                          key={product.productId}
                          href={`/${product.productSEName}.html`}
                        >
                          <li
                            className={`w-7 h-7 border-2 border-secondary mr-1
                       hover:border-light-gray cursor-pointer`}
                          >
                            <ImageComponent
                              src={
                                store.mediaBaseUrl + currentProduct &&
                                currentProduct?.imageUrl
                                  ? currentProduct.imageUrl
                                  : ''
                              }
                              alt='no image'
                              className='max-h-full m-auto'
                              title={product.productName}
                            />
                          </li>
                        </Link>
                        {product?.splitproductList &&
                          product?.splitproductList.map(
                            (option: splitproductList, index: number) =>
                              index < showcolors - 1 ? (
                                <Link
                                  key={option.prodcutId}
                                  href={`/${option.seName}.html`}
                                >
                                  <li
                                    key={option.prodcutId}
                                    className={`border-2 w-7 h-7 text-center overflow-hidden  hover:border-secondary ml-1 cursor-pointer`}
                                    onMouseOver={() =>
                                      setMainImageUrl(option.imageurl)
                                    }
                                    onMouseLeave={() =>
                                      setMainImageUrl(
                                        currentProduct?.imageUrl
                                          ? currentProduct?.imageUrl
                                          : '',
                                      )
                                    }
                                  >
                                    <ImageComponent
                                      src={store.mediaBaseUrl + option.imageurl}
                                      alt='no image'
                                      className='max-h-full m-auto'
                                      title={option.colorName}
                                    />
                                  </li>
                                </Link>
                              ) : (
                                <Fragment key={index}>{(flag = true)}</Fragment>
                              ),
                          )}
                      </>
                    ) : (
                      product.moreImages.map((option: moreImages, index) =>
                        index < showcolors ? (
                          <li
                            className={`w-7 h-7 border-2 hover:border-secondary cursor-pointer ${
                              option.attributeOptionID ===
                              currentProduct?.attributeOptionID
                                ? ' border-secondary'
                                : 'border-light-gray'
                            }`}
                            onMouseOver={() => setMainImageUrl(option.imageUrl)}
                            onMouseLeave={() =>
                              setMainImageUrl(
                                currentProduct?.imageUrl
                                  ? currentProduct?.imageUrl
                                  : '',
                              )
                            }
                            onClick={() => setCurrentProduct(option)}
                            key={`${index}_${option.id}`}
                          >
                            <NxtImage
                              src={option.imageUrl}
                              alt=''
                              className='max-h-full m-auto'
                              title={option.attributeOptionName}
                            />
                          </li>
                        ) : (
                          <>{(flag = true)}</>
                        ),
                      )
                    )}

                    {flag ? (
                      <Link
                        key={product.productId}
                        href={`/${product.productSEName}.html`}
                      >
                        <li className='w-[28px] mr-1 h-[28px] border-2 border-light-gray hover:border-light-gray relative cursor-pointer'>
                          <span
                            className='absolute inset-0 bg-primary text-xs bg-[#003a70] font-semibold flex items-center justify-center text-[#ffffff]'
                            title={` See Additional Colors +${getProductsColorCount()}`}
                          >
                            +{getProductsColorCount()}
                          </span>
                        </li>
                      </Link>
                    ) : null}
                  </ul>
                ) : (
                  <></>
                )}
                {showButton && showButton == __pagesConstant?.show?.Yes ? (
                  <Link
                    href={`${encodeURIComponent(product.productSEName)}.html`}
                  >
                    <a
                      style={{
                        marginTop: '1.5rem',
                        backgroundColor: '#ffa400',
                        color: '#000',
                      }}
                      className='btn-lg btn btn-secondary rounded-0 hrefurl changebtn isinput'
                      data-nofollow='N'
                      data-acsb-clickable='true'
                      data-acsb-navigable='true'
                      data-acsb-now-navigable='true'
                    >
                      <span
                        className='acsb-sr-only'
                        data-acsb-sr-only='true'
                        data-acsb-force-visible='true'
                        aria-hidden='false'
                        data-acsb-hidden='false'
                      ></span>
                      DETAILS
                    </a>
                  </Link>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlugSingleProductListing;
