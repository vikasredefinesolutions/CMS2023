import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import {
  _MyAcc_OrderBillingDetails,
  _MyAcc_OrderProductDetails,
} from '@definations/APIs/user.res';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import {
  FetchOrderDetails,
  FetchOrderIds,
  FetchUserOrderIds,
} from '@services/user.service';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import OL_OrderSummary from './Components/OL_OrderSummary';
import OL_UserOrderSummary from './Components/OL_UserOrderSummary';

export type _OrderDetails = Array<{
  billing: _MyAcc_OrderBillingDetails | null;
  product: _MyAcc_OrderProductDetails[] | null;
} | null>;

const Orders_type1: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<_OrderDetails | null | []>(
    null,
  );
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const userId = useTypedSelector_v2((state) => state.user.id);
  const customerRoleId = useTypedSelector_v2(
    (state) => state.user.customer?.customerRoleId,
  );
  const [showTab, setShowTab] = useState('yourOrder');
  const isAdmin = customerRoleId == 0 || customerRoleId == 2 ? true : false;
  const fetchMultipleOrderDetails = async (ids: number[] | null) => {
    if (ids === null) {
      setOrderDetails([]);
      return;
    }
    let orders: _OrderDetails = [];
    const ordersToFetch = ids.map((id) => FetchOrderDetails({ orderId: id }));

    await Promise.allSettled(ordersToFetch).then((values) => {
      values.map((value: any, index) => {
        orders[index] = value.status === 'fulfilled' ? value.value : null;
      });
    });

    setOrderDetails(orders);
  };

  useEffect(() => {
    setOrderDetails(null);
    if (storeId && userId) {
      if (showTab == 'yourOrder') {
        FetchOrderIds({
          storeId,
          userId,
        })
          .then((ids) => fetchMultipleOrderDetails(ids))
          .catch(() => setOrderDetails([]));
      } else {
        FetchUserOrderIds({
          storeId,
          userId,
        })
          .then((ids) => fetchMultipleOrderDetails(ids))
          .catch(() => setOrderDetails([]));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId, userId, showTab]);

  if (orderDetails === null) {
    return (
      <div id='root'>
        <div className='loader-wrapper'>
          <div className='loader'></div>
        </div>
      </div>
    );
  }

  return (
    <section className='container mx-auto mt-[50px] mb-[50px]'>
      <div className='mx-auto space-y-10 sm:px-4 lg:px-0 pb-2'>
        {isAdmin && (
          <ul className='w-full flex justify-center max-w-4xl mx-auto flex-wrap'>
            <li className=''>
              <button
                onClick={() => setShowTab('yourOrder')}
                className={`tab block bg-secondary hover:bg-secondary-hover text-title-text uppercase font-[600] px-[30px] py-[15px] text-medium-text  ${
                  showTab === 'yourOrder' ? ' !bg-[#f18a00]' : ''
                } `}
                style={{ borderWidth: '0px' }}
              >
                {__pagesText.OrderPage.yourOrder}
              </button>
            </li>
            <li className=''>
              <button
                onClick={() => setShowTab('userOrder')}
                className={`tab block bg-secondary hover:bg-secondary-hover text-title-text uppercase font-[600] px-[30px] py-[15px] text-medium-text  ${
                  showTab === 'userOrder' ? ' !bg-[#f18a00]' : ''
                } `}
                style={{ borderWidth: '0px' }}
              >
                {__pagesText.OrderPage.usersOrder}
              </button>
            </li>
          </ul>
        )}
        {orderDetails?.length === 0 && (
          <div className='text-center text-gray-500 tracking-[1.4px] text-[22px]'>
            <div className='text-2xl md:text-3xl lg:text-title font-title text-color-title mb-2'>
              {__pagesText.OrderPage.emptyOrder}
            </div>
            <div className=''>{__pagesText.OrderPage.emptyOrderMessage1}</div>
            <div className=''>{__pagesText.OrderPage.emptyOrderMessage2}</div>
            <div className='mt-3'>
              <Link href={paths.HOME} className='btn btn-secondary btn-lg'>
                {__pagesText.OrderPage.emptyOrderMessage1}
              </Link>
            </div>
          </div>
        )}
        {showTab === 'yourOrder' &&
          orderDetails.map((order, index) => (
            <OL_OrderSummary
              key={index}
              billing={order!.billing!}
              product={order!.product!}
            />
          ))}
        {showTab === 'userOrder' &&
          orderDetails.map((order, index) => (
            <OL_UserOrderSummary
              key={index}
              billing={order!.billing!}
              product={order!.product!}
            />
          ))}
      </div>
    </section>
  );
};

export default Orders_type1;
