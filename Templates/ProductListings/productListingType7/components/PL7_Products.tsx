import Price from '@appComponents/Price';
import NxtImage from '@appComponents/reUsable/Image';
import { listing_max_showcolors } from '@constants/global.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { GetlAllProductList } from '@templates/ProductListings/ProductListingType';
import Link from 'next/link';
import { useState } from 'react';

const PL7_Products = ({ product }: { product: GetlAllProductList }) => {
  let flag: boolean = false;
  const { mediaBaseUrl } = useTypedSelector_v2((state) => state.store);

  const [currentImage, setCurrentImage] = useState<string>(
    product?.getProductImageOptionList?.length > 0
      ? product.getProductImageOptionList[0].imageName
      : '',
  );

  return (
    <li className='text-center'>
      <div className='flex justify-center w-full border border-gray-border rounded-lg'>
        <div className='relative w-full mb-[30px]'>
          <div className='w-full px-[15px] pt-[10px]'>
            <Link
              key={product.id}
              href={`/${product.sename}.html`}
              className='relative'
            >
              <a
                className='h-[348px] flex items-center justify-center mb-[10px]'
                href={`/${product.sename}.html`}
                title={product.name}
              >
                <NxtImage
                  src={currentImage || null}
                  alt={product.name}
                  title={product.name}
                  className='max-h-[348px] m-auto cursor-pointer'
                />
              </a>
            </Link>
            <div className='border-b border-gray-border mb-[10px]'></div>
          </div>
          <div className='mt-[20px] relative md:px-[30px] px-[15px]'>
            <div className='mb-[10px] mt-[10px] h-[46px] text-medium-text overflow-hidden'>
              <Link
                href={`/${product.sename}.html`}
                className='relative text-primary hover:text-primary-hover uppercase text-medium-text'
              >
                <a>
                  <h3>{product.name.toUpperCase()}</h3>
                </a>
              </Link>
            </div>
            <div className='mb-[12px] text-sub-text'>
              <span className='text-primary font-normal'>
                <Price
                  value={product?.salePrice || product?.msrp || 0}
                  // prices={{ }}
                />
              </span>
            </div>
            <ul
              role='list'
              className='flex flex-wrap mt-[8px] justify-center space-x-1 h-[80px] overflow-hidden'
            >
              {product?.getProductImageOptionList?.length && (
                <div className='w-full h-12'>
                  <ul
                    role='list'
                    className='flex items-center mt-[15px] justify-center space-x-1 testlayoutclass w-full'
                  >
                    {product.getProductImageOptionList.map((subRow, index) =>
                      index < listing_max_showcolors ? (
                        <li
                          className={`border-2 overflow-hidden ml-2 rounded-full ${
                            subRow.imageName === currentImage
                              ? ' border-secondary'
                              : ''
                          }`}
                          onClick={() => {
                            setCurrentImage(subRow.imageName);
                          }}
                          key={subRow.id}
                        >
                          <div className='w-[30px] h-[30px] p-[2px] flex items-center justify-center cursor-pointer'>
                            <a
                              href='javascript:void(0)'
                              title={`${subRow.alttag}`}
                              onClick={() => {
                                setCurrentImage(subRow.imageName);
                              }}
                            >
                              <NxtImage
                                src={subRow.imageName}
                                useNextImage={false}
                                alt={`${subRow.alttag}`}
                                className='m-auto max-h-full'
                              />
                            </a>
                          </div>
                        </li>
                      ) : (
                        <>{(flag = true)}</>
                      ),
                    )}
                    {flag ? (
                      <Link key={product.id} href={`/${product.sename}.html`}>
                        <li className='extra w-7 h-7 text-center border-2 hover:border-secondary inset-0 bg-primary text-xs font-semibold flex items-center justify-center text-white cursor-pointer'>
                          <span> +</span>
                          {product.getProductImageOptionList &&
                            product.getProductImageOptionList.length -
                              listing_max_showcolors}
                        </li>
                      </Link>
                    ) : null}
                  </ul>
                </div>
              )}
            </ul>
            <div className='my-[10px]'>
              <Link key={product.id} href={`/${product.sename}.html`}>
                <a href='javascript:void(0);' className='btn btn-primary'>
                  <span className='material-symbols-outlined align-middle text-[20px]'>
                    shopping_basket
                  </span>
                  <span className='align-middle ml-[5px]'>BUY NOW</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PL7_Products;
