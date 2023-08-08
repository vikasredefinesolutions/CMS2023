import Price from '@appComponents/Price';
import NxtImage from '@appComponents/reUsable/Image';
import { __pagesText } from '@constants/pages.text';
import { _MyAcc_OrderProductDetails } from '@definations/APIs/user.res';
import Link from 'next/link';
import React from 'react';

interface _props {
  product: _MyAcc_OrderProductDetails;
}
const ThankYouProduct: React.FC<_props> = ({ product }) => {
  //   const router = useRouter();
  //   const storeLayout = useTypedSelector_v2((state) => state.store.layout);
  //   const navigateTo = (seName: string | null) => {
  //     if (seName === null) {
  //       router.push(paths.HOME);
  //       return;
  //     }

  //     router.push(seName);
  //   };

  return (
    <>
      <li className='flex flex-wrap py-[20px] -mx-[10px] items-start'>
        <div className='w-full md:w-1/4 px-[10px] md:mb-0 mb-[10px] text-center'>
          <Link href={`/${product.seName}.html`}>
            <NxtImage
              src={product?.colorImage || null}
              alt={product.productName}
              className='max-h-[348px] inline-block'
            />
          </Link>
        </div>
        <div className='w-full md:w-3/4 px-[10px] flex flex-wrap lg:justify-between'>
          <div className='text-sub-text font-semibold'>
            <Link href={`/${product.seName}.html`}>
              <a className='text-black hover:text-secondary'>
                {product.productName}
              </a>
            </Link>
          </div>
          <div className='w-full flex flex-wrap'>
            <div className='lg:w-2/3 w-full mt-[10px]'>
              <div className='flex justify-between'>
                <div className='text-default-text'>
                  <span className='font-semibold'>
                    {' '}
                    {__pagesText.ThankYouPage.TotalSummary.Sku}
                  </span>{' '}
                  {product.sku}
                </div>
              </div>
              <div className='mt-[5px] flex'>
                <div className='text-default-text'>
                  <span className='font-semibold'>
                    {__pagesText.ThankYouPage.TotalSummary.Color}
                  </span>
                  {product.attributeOptionValue}
                </div>
              </div>
              <div className='mt-[40px]'>
                <div className='text-default-text font-semibold border-b border-b-gray-border pb-[10px]'>
                  {__pagesText.ThankYouPage.TotalSummary.ItemDetails}
                </div>
                <div className='flex justify-between py-[10px]'>
                  <div className='text-default-text font-semibold w-28'>
                    Size
                  </div>
                  <div className='text-default-text font-semibold w-16 text-center'>
                    Qty
                  </div>
                  <div className='text-default-text font-semibold w-20 text-right'>
                    Price
                  </div>
                </div>

                {product.shoppingCartItemDetailsViewModels.map(
                  (prod, index) => (
                    <div key={index} className='flex justify-between py-[10px]'>
                      <div className='text-base w-28'>
                        {prod.attributeOptionValue}{' '}
                      </div>
                      <div className='text-base w-16 text-center'>
                        {prod.qty}
                      </div>
                      <div className='text-base w-20 text-right'>
                        <Price value={prod.price} />
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className='mt-[10px] lg:w-1/3 w-full'>
              <div className='font-bold text-medium-text text-right'>
                <span className=''>
                  {__pagesText.ThankYouPage.TotalSummary.ItemTotal}
                  <br />
                  <Price value={product.productTotal} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default ThankYouProduct;
