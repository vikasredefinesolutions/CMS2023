import NxtImage from '@appComponents/reUsable/Image';
import { __pagesText } from '@constants/pages.text';
import { _MyAcc_OrderProductDetails } from '@definations/APIs/user.res';
import ThankYouProductTable from '@templates/ThankYou/CommonComponents/ThankYouProductTable';
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
      <li className='flex pt-[20px] pb-[20px] flex-wrap md:pl-[15px] md:pr-[15px]'>
        <div className='w-full lg:w-4/12 px-[15px] mt-[15px]'>
          <Link href={product.seName == null ? '' : product.seName}>
            <div>
              <NxtImage
                src={product.colorImage}
                alt={product.productName}
                className='rounded-md object-center object-cover'
              />
            </div>
          </Link>
        </div>
        <div className='w-full lg:w-8/12 md:pl-[15px] md:pr-[15px] mt-[15px]'>
          <div className='text-sub-text font-[600]'>
            <Link href={product.seName ? product.seName : ''}>
              <a className='text-black hover:text-anchor-hover'>
                {product.productName}
              </a>
            </Link>
          </div>
          <div className='w-full flex flex-wrap text-default-text'>
            <div className='sm:w-2/3 mt-[8px]'>
              <div className='flex justify-between'>
                <div>
                  <span className='font-[600]'>
                    {__pagesText.ThankYouPage.TotalSummary.Sku}
                  </span>
                  {product.sku}
                </div>
              </div>
              <div className='mt-[4px] flex'>
                <div>
                  <span className='font-[600]'>
                    {__pagesText.ThankYouPage.TotalSummary.Color}
                  </span>
                  {product.attributeOptionValue}
                </div>
              </div>
            </div>
            <div className='mt-[8px] sm:w-1/3'>
              <div className='bold text-sub-text text-right'>
                {__pagesText.ThankYouPage.TotalSummary.ItemTotal}
              </div>
            </div>
            <div className='mt-[40px] mb-[40] w-full'>
              <div className='font-[600] border-b pb-[8px]'>
                {__pagesText.ThankYouPage.TotalSummary.ItemDetails}
              </div>

              <ThankYouProductTable product={product} />
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default ThankYouProduct;
