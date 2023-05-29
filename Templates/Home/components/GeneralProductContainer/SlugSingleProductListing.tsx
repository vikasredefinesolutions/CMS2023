import NxtImage from '@appComponents/reUsable/Image';
import Price from '@appComponents/reUsable/Price';
import { __pagesConstant } from '@constants/pages.constant';
import { __pagesText } from '@constants/pages.text';
import { newFetauredItemResponse } from '@definations/productList.type';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import Link from 'next/link';
import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';

interface _props {
  product: newFetauredItemResponse;
  customMessage: string;
  showProductName: string;
  showSplitProducts: string;
  showButton: string;
  showPrice: string;
  showBrandLogo: string;
  footerTabing: string;
}

const SlugSingleProductListing: React.FC<_props> = (props) => {
  const {
    product,
    customMessage,
    showProductName,
    showSplitProducts,
    showButton,
    showPrice,
    showBrandLogo,
    footerTabing,
  } = props;
  const customerId = useTypedSelector_v2((state) => state.user.id);

  const store = useTypedSelector_v2((state) => state.store);

  return (
    <>
      <div key={product?.productId} className='slide-item'>
        <div className='px-2'>
          <div className='w-full'>
            <div className='border border-gray-50 px-6 py-6 bg-white relative'>
              <div className=''>
                <Link
                  key={product?.productId}
                  href={`${encodeURIComponent(product?.productSEName)}.html`}
                  className='hrefurl'
                >
                  <a style={{ display: 'block' }}>
                    <NxtImage
                      src={product?.imageUrl}
                      alt={product?.productName}
                      title={product?.productName}
                      className='w-full mx-auto isinput img-editable alttitle'
                    />
                  </a>
                </Link>
              </div>
              <div className='mt-6'>
                {showBrandLogo == __pagesConstant?.show?.No ? (
                  ''
                ) : (
                  <div className='mt-[4px] text-center h-[35px] cursor-pointer'>
                    <img
                      className='!inline-block'
                      src={store.mediaBaseUrl + product?.productBrandLogo}
                      alt=''
                    />
                  </div>
                )}
                {showProductName == __pagesConstant?.show.No ? (
                  ''
                ) : (
                  <div className='text-base p-2 text-blue-700 tetx-center isinput overflow-hidden'>
                    <Link
                      key={product.productId}
                      href={`${encodeURIComponent(product.productSEName)}.html`}
                    >
                      <a
                        className='h-[46px] overflow-hidden'
                        title={product.productName}
                      >
                        {product.productName}
                      </a>
                    </Link>
                  </div>
                )}
                {showPrice == __pagesConstant?.show?.No ? (
                  ''
                ) : (
                  <div className='mt-3 text-[#000000] text-base tracking-wider'>
                    <span className='font-[600]'>
                      {customerId
                        ? __pagesText.productListing.PRICE
                        : __pagesText.productListing.MSRP}
                      <Price
                        value={undefined}
                        prices={{
                          msrp: customerId ? product?.lowPrice : product.msrp,
                          salePrice: product.salePrice,
                        }}
                      />
                    </span>
                  </div>
                )}
                <div className='mb-2 font-semibold uppercase isinput'>
                  {customMessage ?? ''}
                </div>
                {showButton == __pagesConstant?.show?.No ? (
                  ''
                ) : (
                  <Link
                    href={`${encodeURIComponent(product.productSEName)}.html`}
                  >
                    <a
                      style={{
                        marginTop: '1.5rem',
                        backgroundColor: '#ffa400',
                        color: '#000',
                      }}
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
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlugSingleProductListing;
