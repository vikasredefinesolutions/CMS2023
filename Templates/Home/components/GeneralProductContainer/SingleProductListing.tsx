import { default as ImageComponent } from '@appComponents/reUsable/Image';
import Price from '@appComponents/reUsable/Price';
import { showcolors } from '@constants/global.constant';
import {
  newFetauredItemResponse,
  splitproductList,
} from '@definations/productList.type';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
import { _globalStore } from 'store.global';

interface _props {
  product: newFetauredItemResponse;
}
let mediaBaseUrl = _globalStore.blobUrl;

const SingleProductListing: React.FC<_props> = (props) => {
  const { product } = props;

  const [mainImageUrl, setMainImageUrl] = useState<string>('');
  const [currentProduct, setCurrentProduct] = useState<
    newFetauredItemResponse | undefined | null
  >(null);

  const store = useTypedSelector_v2((state) => state.store);

  useEffect(() => {
    setCurrentProduct(product);
    setMainImageUrl(product?.imageUrl);
  }, []);

  let flag: boolean = false;
  return (
    <>
      <div className='px-4'>
        <div
          className='flex text-center border border-gray-200 bg-white border-solid p-5'
          style={{ margin: '30px 0 0' }}
        >
          <div className='relative pb-4 w-full cat-pro-list'>
            <div className='w-full rounded-md overflow-hidden aspect-w-1 aspect-h-1'>
              <Link
                href={`${encodeURIComponent(product.productSEName)}.html`}
                className='relative'
              >
                <div className='w-full overflow-hidden aspect-w-1 aspect-h-1'>
                  <ImageComponent
                    src={store.mediaBaseUrl + mainImageUrl}
                    alt='no image'
                    className='w-auto h-auto m-auto max-h-[348px]'
                    height={350}
                    width={350}
                    key={currentProduct?.productId}
                  />
                </div>
              </Link>
            </div>
            <div className='mt-6'>
              <div className='mt-1 text-anchor hover:text-anchor-hover h-[42px] text-color-[#006cd1] overflow-hidden'>
                <Link
                  key={product.productId}
                  href={`${encodeURIComponent(product.productSEName)}.html`}
                  className='text-anchor hover:text-anchor-hover underline  text-ellipsis line-clamp-2 text-small-text bloc text-color-[#006cd1]'
                >
                  <a className='underline'>{product.productName}</a>
                </Link>
              </div>
              <div className='mt-3 text-[#000000] text-base tracking-wider'>
                <span className='font-[600]'>
                  {' '}
                  MSRP <Price value={product.msrp} />
                </span>
              </div>
            </div>
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
                          onMouseOver={() => setMainImageUrl(option.imageurl)}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProductListing;
