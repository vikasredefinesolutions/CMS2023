/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
import Price from '@appComponents/Price';
import NxtImage from '@appComponents/reUsable/Image';
import { listing_max_showcolors } from '@constants/global.constant';
import { getCompareLink } from '@helpers/compare.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { GetlAllProductList } from '@templates/ProductListings/ProductListingType';
import ProductBoxController from '@templates/ProductListings/productListingType1/components/productBoxController';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { _globalStore } from 'store.global';

let mediaBaseUrl = _globalStore.blobUrl;

const TemplateFourListing = ({
  product,
  skuList,
  productView,
  colorChangeHandler,
  compareCheckBoxHandler,
  index,
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
  index: number | string;
}) => {
  let flag: boolean = false;
  const { currentProduct, origin, setCurrentProduct } = ProductBoxController({
    product,
    colorChangeHandler,
  });
  const store = useTypedSelector_v2((state) => state.store);
  const { isAttributeSaparateProduct } = useTypedSelector_v2(
    (state) => state.store,
  );
  const [mainImageUrl, setMainImageUrl] = useState<string>(
    currentProduct?.imageName ? currentProduct.imageName : '',
  );
  mediaBaseUrl = mediaBaseUrl || store.mediaBaseUrl;
  // let flag:boolean = product.getProductImageOptionList.length > 4 ? true : false;
  // let countImage:Number = product.getProductImageOptionList.length - 4;

  useEffect(() => {
    setCurrentProduct(
      product.getProductImageOptionList && product.getProductImageOptionList[0],
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  if (!currentProduct) {
    return <></>;
  }

  return (
    <li className='text-center'>
      <div className='flex justify-center w-full border border-gray-border h-full'>
        <div className='relative w-full mb-[20px]'>
          <div className='w-full px-[20px] pt-[10px]'>
            <Link
              href={`${origin}/${product.sename}.html`}
              className='relative'
            >
              <a
                href={`/${product.sename}.html`}
                title={product.name}
                className='block'
              >
                <NxtImage
                  src={mainImageUrl}
                  alt={product.name}
                  className='max-h-[348px] !inline-black m-auto'
                  key={currentProduct?.id}
                />
              </a>
            </Link>
            {/* {product?.productTagViewModel?.length !== 0 ? (
              <div className='absolute right-[10px] top-[10px] tanish'>
                <div className='h-8'>
                  <NxtImage
                    src={`${mediaBaseUrl}${product?.productTagViewModel[0]?.imagename}`}
                    className='max-h-full inline-block'
                  ></img>
                </div>
              </div>
            ) : null} */}
            {product?.productTagViewModel?.map((tagsdetails) => {
              return (
                <div
                  className={`${tagsdetails.tagPosition}`}
                  data-imageUrl={`${tagsdetails.imagename}`}
                >
                  <NxtImage
                    alt=''
                    useNextImage={false}
                    src={tagsdetails.imagename}
                    className='max-h-full inline-block'
                  />
                </div>
              );
            })}
          </div>
          <div className='mt-[20px] relative px-[15px]'>
            {product?.isonlinebrand ? (
              <div className='mb-[10px] text-sm'>
                <span className='w-[10px] h-[10px] bg-lime-500 inline-block rounded-full mr-1'></span>{' '}
                Available Online
              </div>
            ) : (
              <div className='mb-[10px] text-sm'>&nbsp;</div>
            )}

            <div className='mb-[10px] text-center'>
              <Link href={product.brandUrl}>
                <NxtImage
                  className='inline-block max-h-full'
                  src={product.productBrandlogo}
                  useNextImage={false}
                  alt={product.brandName}
                  title={product.brandName || ''}
                />
              </Link>
            </div>
            <div className='mb-[10px] mt-[10px] h-[46px] text-anchor hover:text-anchor-hover text-medium-text overflow-hidden'>
              <Link
                href={`${origin}/${product.sename}.html`}
                className='relative'
              >
                {product.name}
              </Link>
            </div>
            <div className='mb-[12px] text-normal-text'>
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
                      <Link href={getCompareLink()}>
                        <span>Compare ({skuList.length})</span>
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
              className='flex flex-wrap items-center mt-[12px] justify-center space-x-1'
            >
              {isAttributeSaparateProduct &&
              product.splitproductList &&
              product?.splitproductList?.length > 0 ? (
                <>
                  <Link key={product.id} href={`/${product.sename}.html`}>
                    <li
                      className={`w-7 h-7 border-2  border-secondary hover:border-secondary cursor-pointer`}
                      key={product.id}
                    >
                      <NxtImage
                        src={currentProduct?.imageName || null}
                        alt=''
                        className='w-auto h-auto max-h-max cursor-pointer flex items-center'
                        title={product.name}
                      />
                    </li>
                  </Link>

                  {product?.splitproductList?.map((subRow, index) =>
                    index < listing_max_showcolors - 1 ? (
                      <Link key={product.id} href={`/${subRow.seName}.html`}>
                        <li
                          className={`w-7 h-7 border-2 hover:border-secondary cursor-pointer`}
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
                      className={`w-7 h-7 border-2 hover:border-primary cursor-pointer  ${
                        subRow.id === currentProduct.id
                          ? ' border-secondary'
                          : 'border-light-gray'
                      }`}
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
                      key={subRow.id}
                    >
                      <NxtImage
                        src={subRow?.imageName || null}
                        alt=''
                        className='max-h-full m-auto'
                        useNextImage={false}
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

export default TemplateFourListing;
