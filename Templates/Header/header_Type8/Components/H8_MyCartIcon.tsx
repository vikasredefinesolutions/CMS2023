// Husain - Added Static Values for now - 20-3-23
import { paths } from '@constants/paths.constant';
import {
  GetCartTotals,
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from 'hooks_v2';
// import { useActions_v2, useTypedSelector_v2 } from '@src/hooks';
import NxtImage from '@appComponents/reUsable/Image';
import Price from '@appComponents/reUsable/Price';
import { __pagesText } from '@constants/pages.text';
import { FetchSbStoreCartDetails } from '@services/sb.service';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const H8_MyCartIcon: React.FC = () => {
  const customerId = GetCustomerId();
  const router = useRouter();
  const { cart_UpdateItems, setShowLoader } = useActions_v2();

  const cartData = useTypedSelector_v2((state) => state.cart.cart);
  const { totalPrice, totalQty } = GetCartTotals();
  const [Focus, setFocus] = useState(false);

  const fetchCartDetails = async () => {
    return await FetchSbStoreCartDetails(+customerId).then((response) => {
      if (!response) return;

      cart_UpdateItems({ items: response });
    });
  };

  useEffect(() => {
    setShowLoader(true);
    fetchCartDetails().finally(() => {
      setShowLoader(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      onMouseOver={() => setFocus(true)}
      onMouseLeave={() => setFocus(false)}
      className='flow-root relative'
    >
      <div className='flow-root relative pl-[15px]'>
        <button
          onClick={() => {
            if (totalQty > 0) router.push(paths.CHECKOUT);
          }}
        >
          <a className='text-primary hover:text-secondary group flex items-center relative pt-[8px] pb-[8px]'>
            {/* <span className='mr-[8px] text-[14px] hidden xl:inline-block whitespace-nowrap tracking-[1px]'>
              {__pagesText.Headers.mycart}
            </span>{' '} */}
            <span className='material-icons text-primary'>
              {__pagesText.Headers.shoppingCartIcon}
            </span>
            <span className='absolute right-[-7px] top-[-4px] rounded-full flex items-center justify-center bg-[#dddddd] text-[9px] text-[#000000] pl-[6px] pr-[4px] pt-[2px] pb-[2px]'>
              {totalQty}
            </span>
          </a>
        </button>
      </div>
      {Focus && totalQty > 0 && (
        <div className='z-20 absolute top-full right-0 w-80 text-sm shadow-[0_0px_5px_rgb(0,0,0,0.5)] border border-[#f4ede6] tracking-[1px]'>
          <div className='absolute inset-0 top-1/2 bg-white shadow'></div>
          <div className='relative bg-white z-50 text-[12px] leading-normal p-[15px]'>
            <div className='border-t first:border-t-0 border-[#758592] pt-[15px] first:pt-[0px]'>
              <ul className=''>
                {cartData?.map((cartItem, index) => (
                  <li
                    key={`${cartItem.attributeOptionId}${index}`}
                    className='border-t first:border-t-0 border-[#758592] py-2.5 first:pt-0'
                  >
                    <div className='flex flex-wrap'>
                      <div className='w-1/4 px-[5px]'>
                        <NxtImage
                          src={cartItem.colorImage}
                          alt='cartItem'
                          className=''
                        />
                      </div>
                      <div className='w-3/4 px-2.5'>
                        <div className=''>
                          <Link
                            className='inline-block'
                            href={`/${cartItem.seName}.html`}
                          >
                            <a className='inline-block text-[13px] text-[#000000] hover:text-anchor-hover'>
                              {cartItem.productName}
                            </a>
                          </Link>
                        </div>
                        <div className='flex flex-wrap mt-[5px] text-center leading-none'>
                          <div className=''>
                            <div className='text-gray-600'>
                              {__pagesText.Headers.qty}
                            </div>
                            <div className='mt-[3px]'>{cartItem.totalQty}</div>
                          </div>
                          <div className='pl-[15px]'>
                            <div className='text-gray-600'>
                              {__pagesText.Headers.subtotal}
                            </div>
                            <div className='mt-[3px]'>
                              <Price value={cartItem.totalPrice} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className='border-t first:border-t-0 border-[#758592] pt-[15px] first:pt-[0px]'>
              <div className='mb-3 font-medium text-right'>
                <div className='text-gray-600'>
                  {totalQty} {__pagesText.Headers.totalItemInCartMessage}
                </div>
                <div className='text-[16px]'>
                  {__pagesText.Headers.total} <Price value={totalPrice} />
                </div>
              </div>
              <div className=''>
                <Link href={paths.CHECKOUT} className=''>
                  <a className='btn btn-secondary w-full text-center'>
                    {__pagesText.Headers.checkoutNow}
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default H8_MyCartIcon;
