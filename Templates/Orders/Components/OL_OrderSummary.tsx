import Price from '@appComponents/Price';
import { __pagesConstant } from '@constants/pages.constant';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react';

import {
  _MyAcc_OrderBillingDetails,
  _MyAcc_OrderProductDetails,
} from '@definations/APIs/user.res';
import OL_ItemDetails from './OL_ItemDetails';

interface _props {
  billing: _MyAcc_OrderBillingDetails;
  product: _MyAcc_OrderProductDetails[];
}

const OL_OrderSummary: React.FC<_props> = (order) => {
  const router = useRouter();
  const viewDetailsHandler = (orderId: number | undefined) => {
    if (!orderId) {
      return;
    }
    router.push(`${paths.myAccount.order_details}?ordernumber=${orderId}`);
  };

  return (
    <div className='bg-[#ffffff] border-t border-b border-[#d2d2d2] sm:border'>
      <div className='flex items-center p-4 border-b border-[#d2d2d2] sm:p-6 sm:grid sm:grid-cols-4 sm:gap-x-6 bg-gray-50'>
        <div className='flex-1 grid grid-cols-2 gap-x-6 text-default-text sm:col-span-4 sm:grid-cols-4 lg:col-span-2'>
          <div>
            <dt className='text-sub-text font-[600] uppercase'>
              {__pagesText.OrderPage.orderNumber}
            </dt>
            <dd className='mt-2 text-default-text'>{order.billing?.id}</dd>
          </div>
          <div className='hidden sm:block'>
            <dt className='text-sub-text font-[600] uppercase'>
              {__pagesText.OrderPage.dateOfOrder}
            </dt>
            <dd className='mt-2 text-default-text'>
              <time>
                {moment(order.billing?.orderDate).format(
                  __pagesConstant._myAccount.ordersSection.dateFormat,
                )}
              </time>
            </dd>
          </div>
          <div>
            <dt className='text-sub-text font-[600] uppercase'>
              {' '}
              {__pagesText.OrderPage.totalPrice}
            </dt>
            <dd className='mt-2 font-[600] text-default-text'>
              <Price value={order.billing?.orderTotal} />
            </dd>
          </div>
          <div>
            <dt className='text-sub-text font-[600] uppercase'>
              {__pagesText.OrderPage.orderStatus}
            </dt>
            <dd className='mt-2 text-default-text'>
              {order.billing?.orderStatus}
            </dd>
          </div>
        </div>
        <div className='hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4'>
          <button
            onClick={() => viewDetailsHandler(order.billing.id)}
            className='btn btn-secondary btn-md'
          >
            <span>{__pagesText.OrderPage.viewOrderDetails}</span>
          </button>
        </div>
      </div>
      <ul role='list' className='divide-y divide-gray-200'>
        {order.product.map((item, index) => {
          return <OL_ItemDetails key={index} item={item} />;
        })}
      </ul>
    </div>
  );
};

export default OL_OrderSummary;
