/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
import NxtImage from '@appComponents/reUsable/Image';
import Price from '@appComponents/reUsable/Price';
import { listing_max_showcolors } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
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
import React, { useEffect, useState } from 'react';
// import { GetlAllProductList, _ListingProps } from '../productListing';

import PL1_ProductBoxController from '@templates/ProductListings/ProductListingType1Refactored/Components/PL1_ProductController';
import Link from 'next/link';
import { _globalStore } from 'store.global';

let mediaBaseUrl = _globalStore.blobUrl;

interface _Props {
  product: GetlAllProductList;
  pageId: number;
  seType: string;
}
const PL2_Product: React.FC<_Props> = ({ product, pageId, seType }) => {
  const listingView = useTypedSelector_v2((state) => state.listing.listingView);

  const [wishListId, setWishListId] = useState<number>(0);
  const [wishlistPresent, setWishlistPresent] = useState<boolean>(false);
  let flag: boolean = false;

  const customerId = useTypedSelector_v2((state) => state.user.id);
  const wishListData = useTypedSelector_v2(
    (state) => state.wishlist.wishListData,
  );
  const { isAttributeSaparateProduct } = useTypedSelector_v2(
    (state) => state.store,
  );
  const [skuList, setSkuList] = useState<string[]>([]);
  const store = useTypedSelector_v2((state) => state.store);
  mediaBaseUrl = mediaBaseUrl || store.mediaBaseUrl;

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

  const getProductsColorCount = () => {
    if (isAttributeSaparateProduct && product.splitproductList) {
      return product.splitproductList?.length - listing_max_showcolors + 1;
    } else if (product?.getProductImageOptionList) {
      return product.getProductImageOptionList.length - listing_max_showcolors;
    }
    return '';
  };

  const compareCheckBoxHandler = (sku: string) => {
    if (localStorage) {
      AddRemoveToCompare(sku);
      setSkuList(getSkuList());
    }
  };

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

  return listingView === 'grid' ? (
    <li className='text-center'>
      <div className='flex justify-center w-full border border-gray-border pkhg-product-list-hover'>
        <div className='relative w-full mb-[20px]'>
          <div className='w-full px-[30px] pt-[10px] cursor-pointer'>
            <Link key={product.id} href={`/${product.sename}.html`}>
              <div>
                <a
                  href={`/${product.sename}.html`}
                  title={product.name}
                  style={{ display: 'block' }}
                >
                  <NxtImage
                    src={mainImageUrl}
                    alt={product.name}
                    className='max-h-[348px] !inline-black m-auto cursor-pointer'
                    cKey={currentProduct?.id}
                  />
                </a>
              </div>
            </Link>
            <div className='absolute left-7 top-7 h-8 flex gap-1'>
              <div className='h-8'>
                <NxtImage
                  isStatic={true}
                  className='max-h-full inline-block'
                  src='images/Sale.webp'
                  alt=''
                />
              </div>
            </div>
          </div>
          <div className='mt-[20px] relative md:px-[30px] px-[15px]'>
            <div className='mb-[10px] mt-[10px] h-[46px] text-anchor hover:text-anchor-hover text-medium-text overflow-hidden'>
              <Link
                href={`${origin}/${product.sename}.html`}
                className='relative'
              >
                {product.name}
              </Link>
            </div>
            <div className='mb-[12px] text-[#000000] text-default-text'>
              <span className=''>
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
            <div className='form-group mb-[12px] text-default-text'>
              <label className='checkbox-inline flex justify-center items-center gap-x-2'>
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
                        <span>Compare {skuList.length}</span>
                      </Link>
                    ) : (
                      <>Add to Compare</>
                    )}
                  </>
                }
              </label>
            </div>
            <ul
              role='list'
              className='flex flex-wrap items-center mt-2 justify-center space-x-1'
            >
              {isAttributeSaparateProduct &&
              product.splitproductList &&
              product?.splitproductList?.length > 0 ? (
                <>
                  <li
                    className={`w-[28px] h-[28px] border-2  hover:border-primary cursor-pointer ${
                      currentProduct?.imageName == mainImageUrl
                        ? 'border-primary'
                        : ''
                    }`}
                    onClick={() => setMainImageUrl(currentProduct?.imageName)}
                  >
                    <NxtImage
                      src={currentProduct?.imageName || null}
                      alt=''
                      className='max-h-full m-auto'
                      title={currentProduct?.colorName}
                    />
                  </li>

                  {product?.splitproductList?.map((subRow, index) =>
                    index < listing_max_showcolors - 1 ? (
                      <li
                        className={`w-[28px] h-[28px]  border-2 hover:border-primary cursor-pointer ${
                          subRow.imageurl == mainImageUrl
                            ? 'border-primary'
                            : ''
                        }`}
                        key={`${index}_${subRow.prodcutId}`}
                        onClick={() => setMainImageUrl(subRow.imageurl)}
                        // onMouseLeave={() =>
                        //   setMainImageUrl(
                        //     currentProduct?.imageName
                        //       ? currentProduct?.imageName
                        //       : '',
                        //   )
                        // }
                      >
                        <Link href={`/${subRow.seName}.html`}>
                          <NxtImage
                            src={subRow.imageurl || null}
                            alt=''
                            className='max-h-full m-auto'
                            title={subRow.colorName}
                          />
                        </Link>
                      </li>
                    ) : (
                      <>{(flag = true)}</>
                    ),
                  )}
                </>
              ) : (
                product.getProductImageOptionList &&
                product.getProductImageOptionList.map(
                  (subRow: GetProductImageOptionList, index: number) =>
                    index < listing_max_showcolors ? (
                      <li
                        className={`w-7 h-7 border-2 hover:border-primary cursor-pointer ${
                          subRow.id === currentProduct?.id
                            ? ' border-primary'
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
                          src={subRow.imageName || null}
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
                <Link key={product?.id} href={`/${product?.sename}.html`}>
                  <li className='w-[28px] h-[28px] border-2 border-light-gray hover:border-secondary relative cursor-pointer'>
                    <span
                      className='absolute inset-0 bg-primary text-xs  font-semibold flex items-center justify-center text-[#ffffff]'
                      title={` See Additional ${getProductsColorCount()} Colors`}
                    >
                      +{getProductsColorCount()}
                    </span>
                  </li>
                </Link>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </li>
  ) : (
    <li className=''>
      <div className='w-full border border-gray-border hover:border-gray-border'>
        <div className='relative flex flex-wrap mb-[20px]'>
          <div className='relative overflow-hidden aspect-w-1 aspect-h-1 md:max-w-[300px] max-w-full w-full h-full'>
            <Link
              key={product.id}
              href={`${origin}/${product.sename}.html?v=product-detail&altview=1`}
              className='relative cursor-pointer'
            >
              <NxtImage
                src={mainImageUrl}
                alt=''
                className='max-h-[348px] !inline-black m-auto'
                key={currentProduct?.id}
              />
            </Link>
            <div className='absolute left-7 top-7 h-8 flex gap-1'>
              <div className='h-8'>
                <NxtImage
                  isStatic={true}
                  className='max-h-full inline-block'
                  src='images/Sale.webp'
                  alt=''
                />
              </div>
            </div>
          </div>

          <div className='mt-[20px] relative md:px-[30px] px-[15px] max-w-xl'>
            <div className='mb-[10px] mt-[10px] text-anchor hover:text-anchor-hover text-medium-text cursor-pointer'>
              <Link
                key={product.id}
                href={`${origin}/${product.sename}.html?v=product-detail&altview=1`}
                className='relative'
              >
                {product.name}
              </Link>
            </div>
            <div className='mb-[12px] text-[#000000] text-default-text '>
              <span className=''>
                {customerId ? 'PRICE:' : 'MSRP:'}
                <Price
                  value={undefined}
                  prices={{
                    msrp: customerId ? product?.lowPrice : product.msrp,
                    salePrice: product.salePrice,
                  }}
                />
              </span>
            </div>
            <div className='form-group mb-[12px] text-default-text'>
              <label className='checkbox-inline cursor-pointer flex items-center gap-2'>
                <input
                  checked={skuList.includes(product?.sku ? product.sku : '')}
                  onChange={() =>
                    compareCheckBoxHandler(product?.sku ? product.sku : '')
                  }
                  type='checkbox'
                  className='cursor-pointer'
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
            </div>
            <ul
              role='list'
              className='flex flex-wrap items-center mt-[12px] space-x-1'
            >
              {isAttributeSaparateProduct &&
              product.splitproductList &&
              product?.splitproductList?.length > 0 ? (
                <>
                  <li
                    className={`w-7 h-7 border-2  border-primary 
                      hover:border-primary cursor-pointer`}
                    key={product.id}
                  >
                    <Link key={product.id} href={`/${product.sename}.html`}>
                      <NxtImage
                        src={currentProduct?.imageName || null}
                        alt=''
                        className='max-h-full m-auto'
                        title={product.name}
                      />
                    </Link>
                  </li>

                  {product?.splitproductList?.map((subRow, index) =>
                    index < listing_max_showcolors - 1 ? (
                      <li
                        className={`w-7 h-7 border-2 hover:border-primary cursor-pointer`}
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
                        <Link key={product.id} href={`/${subRow.seName}.html`}>
                          <NxtImage
                            src={subRow.imageurl || null}
                            alt=''
                            className='max-h-full m-auto'
                            title={subRow.colorName}
                          />
                        </Link>
                      </li>
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
                      className={`w-7 h-7 border-2 hover:border-secondary cursor-pointer ${
                        subRow.id === currentProduct?.id
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
                        src={subRow.imageName || null}
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
          </div>
        </div>
      </div>
    </li>
  );
};

export default PL2_Product;
