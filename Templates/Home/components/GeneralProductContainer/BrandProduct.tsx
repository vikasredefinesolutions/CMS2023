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
import ProductBoxController from './ProductBox.controller';

interface _props {
  brandId: number;
  product: newFetauredItemResponse;
  colorChangeHandler: (
    productId: number | undefined,
    seName: string | undefined,
    color: string | undefined | null,
  ) => void;
  style?: 'Flex' | null;
}
let mediaBaseUrl = _globalStore.blobUrl;

const BrandProduct: React.FC<_props> = (props) => {
  const { product, colorChangeHandler, style } = props;
  const { currentProduct, origin, setCurrentProduct } = ProductBoxController({
    product,
    colorChangeHandler,
  });
  const [mainImageUrl, setMainImageUrl] = useState<string>('');
  const store = useTypedSelector_v2((state) => state.store);
  mediaBaseUrl = mediaBaseUrl || store.mediaBaseUrl;
  const customerId = useTypedSelector_v2((state) => state.user.id);
  let flag: boolean = false;
  useEffect(() => {
    if (currentProduct && currentProduct?.imageUrl) {
      setMainImageUrl(currentProduct.imageUrl);
    }
  }, []);
  return (
    <li
      className={`w-full ${
        style === 'Flex' ? '' : 'lg:w-3/12'
      } relative  text-center`}
      data-id={product.productId}
    >
      <div className='border border-gray-200 bg-white border-solid p-5'>
        <Link
          href={`${origin}/${product.productSEName}.html?v=product-detail&altview=1`}
          className='relative'
        >
          <div className='w-full overflow-hidden aspect-w-1 aspect-h-1'>
            <ImageComponent
              src={store.mediaBaseUrl + mainImageUrl}
              alt='no image'
              className='w-auto h-auto m-auto max-h-[348px]'
              height={350}
              width={350}
              key={currentProduct?.id}
            />
          </div>
        </Link>
        <div className='mt-2.5'>
          <div className='hover:text-primary text-lg test'>
            <Link
              href={`${origin}/${product.productSEName}.html?v=product-detail&altview=1`}
            >
              <a className='relative text-sm h-11'>{product.productName}</a>
            </Link>
          </div>
          <div className='mt-3 text-gray-900'>
            <span className='font-bold'>
              {customerId && product.isSpecialBrand ? 'Price' : 'MSRP'}
              <Price
                value={undefined}
                prices={{
                  msrp: product.msrp,
                  salePrice: product.salePrice,
                }}
              />
            </span>
          </div>
          <ul role='list' className='flex items-center justify-center mt-2'>
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
                        key={index}
                        className={`border-2  w-7 h-7 text-center overflow-hidden  hover:border-secondary ml-1 cursor-pointer`}
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
    </li>
  );
};

export default BrandProduct;
