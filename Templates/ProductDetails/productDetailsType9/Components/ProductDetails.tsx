import Price from '@appComponents/Price';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { useRouter } from 'next/router';
import React from 'react';
import ProductImg from './ProductImg';
import ProductInfo from './ProductInfo';
import { _ProductDetailsProps } from './productDetailsComponents';

const ProductDetails: React.FC<_ProductDetailsProps> = ({
  product,
  storeCode,
}) => {
  const color = useTypedSelector_v2((state) => state.product.selected.color);
  const consultationURL = `${paths.REQUEST_CONSULTATION}?productid=${product.id}&title=Request%20Consultation%20%26%20Proof&Color=${color?.name}`;
  const router = useRouter();
  return (
    <div
      className='container pl-[15px] pr-[15px] mx-auto mt-[15px]'
      itemType='https://schema.org/Product'
      itemScope
    >
      <div className='lg:grid lg:grid-cols-2 lg:items-start'>
        <div className='flex md:hidden flex-wrap'>
          <div className='w-full md:w-2/3'>
            <div className='font-[600] text-large-text'>{product.name}</div>

            <div className='pt-[3px] text-default-text'>
              <span className='font-[600] inline-block w-[43px]'>
                {__pagesText.productInfo.sku}:
              </span>
              <span className='ml-[4px]'> {product.sku}</span>
            </div>

            <div className='text-black text-sm'>
              <span className='font-[600] inline-block w-[43px]'>
                {__pagesText.productInfo.msrp}:
              </span>
              <span className='ml-[4px]'>
                <Price
                  value={undefined}
                  prices={{ msrp: product.msrp, salePrice: product.salePrice }}
                  addColon={false}
                />
              </span>
            </div>
          </div>

          <div className='w-full md:w-1/3 mt-[10px] md:text-right'>
            <div className='inline-flex items-center'>
              <a
                href={consultationURL}
                title={__pagesText.productInfo.requestConsultaionProof}
                // onClick={() => router.push(consultationURL)}
                className='text-anchor hover:!text-anchor-hover text-small-text pr-[1px] font-[600] underline '
              >
                {__pagesText.productInfo.requestConsultaionProof}
              </a>
              <span className='material-icons-outlined leading-none text-[20px] font-[600] w-[15px] text-anchor hover:text-anchor-hover !no-underline'>
                chevron_right
              </span>
            </div>
          </div>
        </div>
        <ProductImg product={product} />
        <ProductInfo product={product} storeCode={storeCode} />
      </div>
    </div>
  );
};

export default ProductDetails;
