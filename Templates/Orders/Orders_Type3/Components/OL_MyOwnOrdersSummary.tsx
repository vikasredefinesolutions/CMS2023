import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react';

import Price from '@appComponents/Price';
import {
  _MyAcc_OrderBillingDetails,
  _MyAcc_OrderProductDetails,
} from '@definations/APIs/user.res';
import OL_ItemDetails from './OL_ItemDetails';

interface _props {
  billing: _MyAcc_OrderBillingDetails;
  product: _MyAcc_OrderProductDetails[];
}

const OL_MyOwnOrdersSummary: React.FC<_props> = (order) => {
  const router = useRouter();
  const viewDetailsHandler = (orderId: number | undefined) => {
    if (!orderId) {
      return;
    }
    router.push(`${paths.myAccount.order_details}?ordernumber=${orderId}`);
  };

  return (
    <div className='bg-[#ffffff] border-t border-gray-border sm:border'>
      <div className='flex flex-wrap items-center my-[15px] pb-[15px] border-b border-gray-border'>
        <div className='w-full px-[15px] md:w-8/12'>
          <div className='flex flex-wrap items-center'>
            <div className='md:w-1/2 w-full px-[15px] md:mb-[0px] mb-[10px]'>
              <div className='text-normal-text uppercase'>
                {__pagesText.OrderPage.orderNumber}: {order.billing?.id}
              </div>
              <div className='font-[600] mt-[10px] text-sub-text'>
                Order Date:
                <time>
                  {moment(order.billing?.orderDate).format('MMMM D, YYYY')}
                </time>
              </div>
            </div>
            <div className='md:w-1/2 w-full px-[15px] md:mb-[0px] mb-[10px]'>
              <div className='font-[600] mt-[10px] text-sub-text'>
                Price: <Price value={order.billing?.orderTotal} />
              </div>
            </div>
          </div>
        </div>
        <div className='w-full px-[15px] md:w-4/12'>
          <div className='w-full text-right md:mb-[0px] mb-[10px]'>
            <button
              onClick={() => viewDetailsHandler(order.billing.id)}
              className='btn text-center block btn-primary'
            >
              <span>{__pagesText.OrderPage.viewOrderDetails}</span>
            </button>
          </div>
        </div>
      </div>
      <ul role='list' className='overflow-hidden'>
        {order.product.map((item, index) => {
          return <OL_ItemDetails key={index} item={item} />;
        })}
      </ul>
    </div>
  );
};

export default OL_MyOwnOrdersSummary;
