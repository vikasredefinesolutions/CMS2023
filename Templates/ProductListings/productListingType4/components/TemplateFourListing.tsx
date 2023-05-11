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
  const { currentProduct, origin, setCurrentProduct } = ProductBoxController({
    product,
    colorChangeHandler,
  });
  const store = useTypedSelector_v2((state) => state.store);
  const { isAttributeSaparateProduct } = useTypedSelector_v2(
    (state) => state.store,
  );
  mediaBaseUrl = mediaBaseUrl || store.mediaBaseUrl;
  // let flag:boolean = product.getProductImageOptionList.length > 4 ? true : false;
  // let countImage:Number = product.getProductImageOptionList.length - 4;
  let flag: boolean = false;
  if (!currentProduct) {
    return <></>;
  }
  return (
    <li className='text-center'>
      <div className='flex justify-center w-full border border-gray-border'>
        <div className='relative w-full mb-[20px]'>
          <div className='w-full px-[20px] pt-[10px]'>
            <Link
              href={`${origin}/${product.sename}.html`}
              className='relative'
            >
              <NxtImage
                src={currentProduct?.imageName ? currentProduct?.imageName : ''}
                alt=''
                className='w-auto h-auto m-auto max-h-[400px]'
                key={currentProduct?.id}
              />
            </Link>
            {product?.productTagViewModel?.length !== 0 ? (
              <div className='absolute right-[10px] top-[10px] h-8 flex gap-1 tanish'>
                <div className='h-8'>
                  <img
                    src={`${mediaBaseUrl}${product?.productTagViewModel[0]?.imagename}`}
                    className='max-h-full inline-block'
                  ></img>
                </div>
              </div>
            ) : null}
          </div>
          <div className='mt-[20px] relative md:px-[30px] px-[15px]'>
            {product?.isBrandOnline ? (
              <div className='mb-[10px] text-sm'>
                <span className='w-[10px] h-[10px] bg-lime-500 inline-block rounded-full mr-1'></span>
                Available Online
              </div>
            ) : null}

            <div className='mb-[10px] text-center'>
              <Link href={product.brandUrl}>
                <img
                  className='inline-block max-h-full'
                  src={`${mediaBaseUrl}${product.brandlogo}`}
                  alt={product.brandlogo}
                  title={product.brandName || ''}
                />
              </Link>
            </div>
            <div className='mb-[10px] mt-[10px] h-[46px] text-anchor hover:text-anchor-hover text-medium-text'>
              <Link
                href={`${origin}/${product.sename}.html`}
                className='relative'
              >
                {product.name}
              </Link>
            </div>
            <div className='mb-[12px] text-default-text font-semibold'>
              <span className=''>
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
            <div className='form-group mb-[12px] text-default-text'>
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
              className='flex flex-wrap items-center mt-[12px] justify-center space-x-1'
            >
              {isAttributeSaparateProduct &&
              product.splitproductList &&
              product?.splitproductList?.length > 0 ? (
                <div className='flex'>
                  <Link key={product.id} href={`/${product.sename}.html`}>
                    <li
                      className={`w-7 h-7 border-2  border-secondary
                          
           hover:border-secondary cursor-pointer`}
                      key={product.id}
                    >
                      <NxtImage
                        src={`${mediaBaseUrl}${currentProduct.imageName}`}
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
                  )}
                </div>
              ) : (
                product.getProductImageOptionList &&
                product.getProductImageOptionList.map((subRow, index) =>
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
