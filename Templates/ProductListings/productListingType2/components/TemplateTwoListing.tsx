/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
import NxtImage from '@appComponents/reUsable/Image';
import Price from '@appComponents/reUsable/Price';
import { listing_max_showcolors } from '@constants/global.constant';
import { splitproductList } from '@definations/productList.type';
import { getCompareLink } from '@helpers/compare.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import {
  GetProductImageOptionList,
  GetlAllProductList,
} from '@templates/ProductListings/ProductListingType';
import ProductBoxController from '@templates/ProductListings/productListingType1/components/productBoxController';
import Link from 'next/link';
import { _globalStore } from 'store.global';

let mediaBaseUrl = _globalStore.blobUrl;

const TemplateTwoListing = ({
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

  return productView === 'grid' ? (
    <li className='text-center'>
      <div className='flex justify-center w-full border border-gray-border hover:border-gray-border hover:shadow-md'>
        <div className='relative w-full mb-[20px]'>
          <div className='w-full px-[30px] pt-[10px] cursor-pointer'>
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
            <div className='absolute left-7 top-7 h-8 flex gap-1'>
              <div className='h-8'>
                <img
                  className='max-h-full inline-block'
                  src='images/Sale.webp'
                  alt=''
                />
              </div>
            </div>
          </div>
          <div className='mt-[20px] relative md:px-[30px] px-[15px]'>
            <div className='mb-[10px] mt-[10px] h-[46px] text-anchor hover:text-anchor-hover text-medium-text'>
              <Link
                href={`${origin}/${product.sename}.html`}
                className='relative'
              >
                {product.name}
              </Link>
            </div>
            <div className='mb-[12px] text-[#000000] text-default-text'>
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
              className='flex flex-wrap items-center mt-2 justify-center space-x-1'
            >
              {isAttributeSaparateProduct
                ? product.splitProductList &&
                  product?.splitProductList.map(
                    (subRow: splitproductList, index: number) =>
                      index < listing_max_showcolors ? (
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
                  )
                : product.getProductImageOptionList &&
                  product.getProductImageOptionList.map(
                    (subRow: GetProductImageOptionList, index: number) =>
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
                src={currentProduct?.imageName ? currentProduct?.imageName : ''}
                alt=''
                className='w-auto h-auto max-h-max'
                key={currentProduct?.id}
              />
            </Link>
            <div className='absolute left-7 top-7 h-8 flex gap-1'>
              <div className='h-8'>
                <img
                  className='max-h-full inline-block'
                  src='images/Sale.webp'
                  alt=''
                />
              </div>
            </div>
          </div>

          <div className='mt-[20px] relative md:px-[30px] px-[15px]'>
            <div className='mb-[10px] mt-[10px] h-[46px] text-anchor hover:text-anchor-hover text-medium-text cursor-pointer'>
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
                MSRP
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
              <label className='checkbox-inline cursor-pointer'>
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
              className='flex flex-wrap items-center mt-2 space-x-1'
            >
              {isAttributeSaparateProduct
                ? product.splitProductList &&
                  product?.splitProductList.map(
                    (subRow: splitproductList, index: number) =>
                      index < listing_max_showcolors ? (
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
                  )
                : product.getProductImageOptionList &&
                  product.getProductImageOptionList.map(
                    (subRow: GetProductImageOptionList, index: number) => (
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
                    ),
                  )}
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
};

export default TemplateTwoListing;
