/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
import NxtImage from '@appComponents/reUsable/Image';
import Price from '@appComponents/reUsable/Price';
import {
  BACARDI,
  CYXTERA_CODE,
  listing_max_showcolors,
  UCA,
  UNITI_CODE,
} from '@constants/global.constant';
import { splitproductList } from '@definations/productList.type';
import { getCompareLink } from '@helpers/compare.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import {
  GetlAllProductList,
  GetProductImageOptionList,
} from '@templates/ProductListings/ProductListingType';
import ProductBoxController from '@templates/ProductListings/productListingType1/components/productBoxController';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { _globalStore } from 'store.global';

let mediaBaseUrl = _globalStore.blobUrl;

const TemplateThreeListing = ({
  product,
  skuList,
  productView,
  colorChangeHandler,
  compareCheckBoxHandler,
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
}) => {
  const { currentProduct, origin, setCurrentProduct } = ProductBoxController({
    product,
    colorChangeHandler,
  });

  const router = useRouter();
  const store = useTypedSelector_v2((state) => state.store);
  // console.log(store, '<-------------store');
  const { isAttributeSaparateProduct } = useTypedSelector_v2(
    (state) => state.store,
  );
  mediaBaseUrl = mediaBaseUrl || store.mediaBaseUrl;

  const { code: storeCode } = useTypedSelector_v2((state) => state.store);

  // let flag:boolean = product.getProductImageOptionList.length > 4 ? true : false;
  // let countImage:Number = product.getProductImageOptionList.length - 4;
  let flag: boolean = false;
  if (!currentProduct) {
    return <></>;
  }

  return productView === 'grid' ? (
    <li className='text-center'>
      <div
        className={`flex justify-center w-full border border-transparent hover:border-gray-border hover:shadow-md`}
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
                className='block'
                href={`${origin}/${product.sename}.html`}
              >
                <NxtImage
                  src={currentProduct?.imageName || null}
                  alt={product.name}
                  className={`${
                    storeCode === BACARDI
                      ? 'w-auto h-auto max-h-max'
                      : 'max-h-[348px] m-auto cursor-pointer'
                  }`}
                  key={currentProduct?.id}
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
                      useNextImage={false}
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
            <div className='mb-[10px] mt-[10px] h-[46px] text-medium-text  overflow-hidden'>
              <Link href={`${origin}/${product.sename}.html`}>
                <a
                  className={`relative ${
                    storeCode === BACARDI
                      ? 'text-default hover:default-hover'
                      : 'text-anchor-hover hover:text-anchor'
                  }`}
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
                  storeCode === BACARDI ? ' text-[#3A5A78]' : 'text-primary'
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
            {storeCode === BACARDI && (
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
                                ? ' hover:border-primary'
                                : 'hover:border-secondary'
                            }  cursor-pointer ${
                              product.id === currentProduct.id
                                ? storeCode === BACARDI
                                  ? 'border-primary'
                                  : 'border-secondary'
                                : ''
                            }`}
                            key={subRow.prodcutId}
                          >
                            <NxtImage
                              src={subRow?.imageurl || null}
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
                          className={`w-[30px] h-[30px] p-[1px] border   ${
                            storeCode === BACARDI
                              ? ' hover:border-primary'
                              : 'hover:border-secondary'
                          } cursor-pointer ${
                            subRow.id === currentProduct.id
                              ? storeCode === BACARDI
                                ? 'border-primary'
                                : 'border-secondary'
                              : ''
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
                            src={subRow?.imageName || null}
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
                        ? ' hover:border-primary'
                        : 'hover:border-secondary'
                    } relative cursor-pointer`}
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
      <div className='w-full border border-gray-border hover:border-gray-border'>
        <div className='w-full flex flex-wrap mb-[20px]'>
          <div className='w-full overflow-hidden aspect-w-1 aspect-h-1 md:max-w-[300px] max-w-full'>
            <Link
              key={product.id}
              href={`${origin}/${product.sename}.html?v=product-detail&altview=1`}
            >
              <a href='' className='cursor-pointer w-full '>
                <NxtImage
                  src={currentProduct?.imageName || null}
                  alt=''
                  className='w-full h-auto max-h-max'
                  key={currentProduct?.id}
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
                    useNextImage={false}
                    alt={''}
                    src={tagsdetails.imagename}
                    className='max-h-full inline-block'
                  />
                </div>
              );
            })}
          </div>

          <div className='mt-[20px] relative md:px-[30px] px-[15px]'>
            <div className='mb-[10px] mt-[10px] h-[46px] text-medium-text cursor-pointer overflow-hidden'>
              <a
                key={product.id}
                href={`${origin}/${product.sename}.html?v=product-detail&altview=1`}
                className='relative text-anchor hover:text-anchor'
              >
                {product.name}
              </a>
            </div>
            <div className='mb-[12px] text-sub-text'>
              <span className='text-primary'>
                <Price
                  value={undefined}
                  prices={{
                    msrp: product.msrp,
                    salePrice: product.salePrice,
                  }}
                />
              </span>
            </div>
            {storeCode === BACARDI && (
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
                      className={`w-[30px] h-[30px] p-[1px] border hover:border-secondary cursor-pointer ${
                        product.id === currentProduct.id
                          ? ' border-secondary'
                          : ''
                      }`}
                      key={product.id}
                    >
                      <NxtImage
                        src={currentProduct.imageName || null}
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
                            product.id === currentProduct.id
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
                  )}
                </>
              ) : (
                product.getProductImageOptionList &&
                product.getProductImageOptionList.map((subRow, index) =>
                  index < listing_max_showcolors ? (
                    <li
                      className={`w-[30px] h-[30px] p-[1px] border  hover:border-secondary cursor-pointer ${
                        subRow.id === currentProduct.id
                          ? 'border-secondary'
                          : ''
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

export default TemplateThreeListing;
