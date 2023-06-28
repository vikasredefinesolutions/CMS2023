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
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const MyCartIcon: React.FC = () => {
  const { fetchCartDetails } = useActions_v2();
  const [totalCartQty, setTotalCartQty] = useState(0);

  const customerId = GetCustomerId();

  const cartData = useTypedSelector_v2((state) => state.cart.cart);
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );
  const view = useTypedSelector_v2((state) => state.store.view);

  const { totalPrice, totalQty } = GetCartTotals();
  const [Focus, setFocus] = useState(false);

  useEffect(() => {
    if (customerId && (totalQty === 0 || totalQty !== totalCartQty)) {
      fetchCartDetails({
        customerId: customerId,
        isEmployeeLoggedIn,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId, isEmployeeLoggedIn]);

  useEffect(() => {
    setTotalCartQty(totalQty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalQty]);
  return (
    <div
      onMouseOver={() => setFocus(true)}
      onMouseLeave={() => setFocus(false)}
      className='flow-root relative'
      x-data='{ open: false }'
    >
      <Link href={paths.CART}>
        <a className='text-secondary hover:text-[#000000] group flex items-center gap-[5px] relative pr-2'>
          {/* <span className='inline-flex items-center justify-center w-[30px] h-[30px]'> */}
          {/*  img link  */}

          {/* </span>{' '} */}
          {view == 'DESKTOP' && (
            <span className='text-white'>My Cart ({totalCartQty})</span>
          )}
          {view !== 'DESKTOP' && (
            <>
              <span className='material-icons text-[#000000]'>
                shopping_cart
              </span>
              <span className='absolute right-0 -top-2 w-4 h-4 rounded-full flex items-center justify-center bg-gray-200 text-[9px] font-medium text-gray-500'>
                {totalCartQty}
              </span>
            </>
          )}
        </a>
      </Link>
      {Focus && totalCartQty > 0 && (
        <div className='absolute top-full right-0 w-[350px] text-sm shadow'>
          <div
            className='absolute inset-0 top-1/2 bg-white shadow'
            aria-hidden='true'
          ></div>
          <div className='relative bg-gray-100 z-50'>
            <div className='border-t first:border-t-0 border-gray-border py-[15px] px-[15px]'>
              <ul className=''>
                {cartData?.map((cartItem) => (
                  <li
                    key={cartItem.attributeOptionId}
                    className='border-t first:border-t-0 border-gray-border pt-[12px] first:pt-0 pb-[12px] last:pb-0'
                  >
                    <div className='flex flex-wrap -mx-[5px]'>
                      <div className='w-1/4 px-[5px]'>
                        <NxtImage
                          src={cartItem.colorImage}
                          alt='cartItem'
                          className=''
                        />
                      </div>
                      <div className='w-3/4 px-[5px]'>
                        <div className=''>
                          <Link
                            className='inline-block'
                            href={`/${cartItem.seName}.html`}
                          >
                            <a className='inline-block '>
                              {cartItem.productName}
                            </a>
                          </Link>
                        </div>
                        <div className='flex flex-wrap justify-between -mx-[5px] mt-[8px] extra-small-text'>
                          <div className='px-[5px]'>
                            <div className=''>{__pagesText.Headers.qty}</div>
                            <div className=''>{cartItem.totalQty}</div>
                          </div>
                          <div className='px-[5px]'>
                            <div className=''>
                              {__pagesText.Headers.subtotal}
                            </div>
                            <div className=''>
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
            <div className='border-t first:border-t-0 border-gray-border py-[12px] px-[12px]'>
              <div className='mb-3 font-medium text-right'>
                <div className=''>
                  {totalCartQty} {__pagesText.Headers.totalItemInCartMessage}
                </div>
                <div className=''>
                  {__pagesText.Headers.total} <Price value={totalPrice} />
                </div>
              </div>

              <div className=''>
                <Link href={paths.CART} className=''>
                  <a className='btn btn-primary w-full text-center'>
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

export default MyCartIcon;
