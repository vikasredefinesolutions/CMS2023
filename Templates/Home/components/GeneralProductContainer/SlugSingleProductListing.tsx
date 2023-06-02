import { default as ImageComponent } from '@appComponents/reUsable/Image';
import Price from '@appComponents/reUsable/Price';
import { showcolors } from '@constants/global.constant';
import { __pagesConstant } from '@constants/pages.constant';
import { __pagesText } from '@constants/pages.text';
import {
  newFetauredItemResponse,
  splitproductList,
} from '@definations/productList.type';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import Link from 'next/link';
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
  footerTabing: string;
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
    footerTabing,
    showBorder,
  } = props;
  const customerId = useTypedSelector_v2((state) => state.user.id);

  const store = useTypedSelector_v2((state) => state.store);
  const [mainImageUrl, setMainImageUrl] = useState<string>('');
  const [currentProduct, setCurrentProduct] = useState<
    newFetauredItemResponse | undefined | null
  >(null);
  useEffect(() => {
    setCurrentProduct(product);
    setMainImageUrl(product?.imageUrl);
  }, []);
  let flag: boolean = false;
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
                  <a style={{ display: 'block' }}>
                    <ImageComponent
                      src={store.mediaBaseUrl + mainImageUrl}
                      alt={product?.productName}
                      title={product?.productName}
                      className='w-auto h-auto m-auto max-h-[348px]'
                      height={350}
                      width={350}
                      key={currentProduct?.productId}
                    />
                  </a>
                </Link>
              </div>
              <div className=''>
                {showBrandLogo == __pagesConstant?.show?.No ? (
                  ''
                ) : (
                  <div className='text-center h-auto cursor-pointer'>
                    <img
                      className='!inline-block'
                      src={store.mediaBaseUrl + product?.productBrandLogo}
                      alt=''
                    />
                  </div>
                )}
                {showProductName == __pagesConstant?.show.No ? (
                  ''
                ) : (
                  <div className='text-base p-2 text-blue-700 tetx-center isinput overflow-hidden'>
                    <Link
                      key={product.productId}
                      href={`${encodeURIComponent(product.productSEName)}.html`}
                    >
                      <a
                        className='h-[46px] overflow-hidden'
                        title={product.productName}
                      >
                        {product.productName}
                      </a>
                    </Link>
                  </div>
                )}
                {showPrice == __pagesConstant?.show?.No ? (
                  ''
                ) : (
                  <div className='mt-3 text-[#000000] text-base tracking-wider'>
                    <span className='font-[600]'>
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
                <div className='mb-2 font-semibold uppercase isinput'>
                  {customMessage ?? ''}
                </div>
                {showSplitProducts == __pagesConstant?.show?.No ? (
                  ''
                ) : (
                  <ul className='flex items-center justify-center mt-2 list-none'>
                    <Link
                      key={product.productId}
                      href={`/${product.productSEName}.html`}
                    >
                      <li
                        className={`w-7 h-7 border-2 border-secondary
                     hover:border-secondary cursor-pointer`}
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
                          title={product?.moreImages[0].attributeOptionName}
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
                    {flag ? (
                      <Link href={`/${product.productSEName}.html`}>
                        <li className='extra w-7 h-7 text-center border-2 hover:border-secondary inset-0 bg-primary text-xs font-semibold flex items-center justify-center text-white cursor-pointer'>
                          <span>+</span>
                          {product &&
                            product?.splitproductList &&
                            product?.splitproductList.length - showcolors + 1}
                        </li>
                      </Link>
                    ) : null}
                  </ul>
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
