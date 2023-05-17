import NxtImage from '@appComponents/reUsable/Image';
import { newFetauredItemResponse } from '@definations/productList.type';
import Link from 'next/link';
import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';

interface _props {
  product: newFetauredItemResponse;
}

const SlugSingleProductListing: React.FC<_props> = ({ product }) => {
  return (
    <>
      <div key={product?.productId} className='slide-item'>
        <div className='px-2'>
          <div className='w-full'>
            <div className='border border-gray-50 px-6 py-6 bg-white relative'>
              <div className='flex justify-center'>
                <Link
                  key={product?.productId}
                  href={`${encodeURIComponent(product?.productSEName)}.html`}
                  className='hrefurl'
                >
                  <NxtImage
                    src={product?.imageUrl}
                    alt={product?.productName}
                    className='w-full mx-auto isinput img-editable alttitle'
                  />
                </Link>
              </div>
              <div className='mt-6'>
                <div className='text-base p-2 text-blue-700 tetx-center isinput overflow-hidden'>
                  <Link
                    key={product.productId}
                    href={`${encodeURIComponent(product.productSEName)}.html`}
                    className='text-anchor hover:text-anchor-hover underline  text-ellipsis line-clamp-2 text-small-text bloc'
                  >
                    {product.productName}
                  </Link>
                </div>
                <div className='mb-2 font-semibold uppercase isinput'>
                  ADD YOUR LOGO
                </div>
                <a
                  style={{
                    marginTop: '1.5rem',
                    backgroundColor: '#ffa400',
                    color: '#000',
                  }}
                  target=''
                  className='btn-lg btn btn-secondary rounded-0 hrefurl changebtn isinput'
                  data-nofollow='N'
                  data-acsb-clickable='true'
                  data-acsb-navigable='true'
                  data-acsb-now-navigable='true'
                >
                  <span
                    className='acsb-sr-only'
                    data-acsb-sr-only='true'
                    data-acsb-force-visible='true'
                    aria-hidden='false'
                    data-acsb-hidden='false'
                  ></span>
                  DETAILS
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlugSingleProductListing;