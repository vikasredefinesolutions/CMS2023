import Price from '@appComponents/Price';
import MyAccountTabsType1 from '@appComponents/common/MyAccountTabsType1';
import { __pagesConstant } from '@constants/pages.constant';
import {
  _MyAcc_OrderBillingDetails,
  _MyAcc_OrderProductDetails,
} from '@definations/APIs/user.res';
import { FetchOrderDetails } from '@services/user.service';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  AdditionalCosts,
  BillingAddress,
  CustomizationPrice,
  ProductsPrice,
  ShippingAddress,
  ShippingEstimationPrice,
  TotalSavings,
} from '../orderDetailsFunctions';
import { OrD_ItemDetails, Ord_InvoiceModal } from './Components';

const OrderDetails_type1: React.FC = () => {
  const { query } = useRouter();
  const orderId = query.ordernumber;

  const [order, setOrderDetails] = useState<{
    billing: _MyAcc_OrderBillingDetails;
    product: _MyAcc_OrderProductDetails[];
  } | null>(null);
  const [showModal, setShowModal] = useState<'invoice' | null | 'uploadImage'>(
    null,
  );

  const getOrderDetails = () => {
    if (orderId) {
      FetchOrderDetails({ orderId: +orderId }).then((details) => {
        setOrderDetails(details);
      });
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <>
      <MyAccountTabsType1 />
      {order === null ? (
        <div id='root'>
          <div className='loader-wrapper'>
            <div className='loader'></div>
          </div>
        </div>
      ) : (
        <section className='container mx-auto mt-[50px] mb-[50px]'>
          <div className='mx-auto space-y-10 sm:px-4 lg:px-0 pb-2'>
            <div className='bg-[#ffffff] border-t border-b border-[#d2d2d2] sm:border'>
              <div className='flex items-center p-4 border-b border-[#d2d2d2] sm:p-6 sm:grid sm:grid-cols-4 sm:gap-x-6 bg-gray-50'>
                <div className='flex-1 grid grid-cols-2 gap-x-6 text-sub-text sm:col-span-4 sm:grid-cols-4 lg:col-span-2'>
                  <div>
                    <dt className='text-sub-text font-[600] uppercase'>
                      ORDER NUMBER
                    </dt>
                    <dd className='mt-2 text-default-text'>
                      {order.billing.id}
                    </dd>
                  </div>
                  <div className='hidden sm:block'>
                    <dt className='text-sub-text font-[600] uppercase'>
                      DATE OF ORDER
                    </dt>
                    <dd className='mt-2 text-default-text'>
                      <time>
                        {moment(order?.billing?.orderDate).format(
                          __pagesConstant._myAccount.orderDetails.dateFormat,
                        )}
                      </time>
                    </dd>
                  </div>
                  <div>
                    <dt className='text-sub-text font-[600] uppercase'>
                      TOTAL PRICE
                    </dt>
                    <dd className='mt-2 text-sub-text'>
                      <Price value={order.billing?.orderSubtotal} />
                    </dd>
                  </div>
                </div>
                <div className='hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4'>
                  <button
                    onClick={() => setShowModal('invoice')}
                    className='btn btn-secondary btn-md'
                  >
                    <span>View Invoice</span>
                  </button>
                </div>
              </div>
              <div className='flex flex-wrap'>
                <div className='w-full lg:w-3/4'>
                  <div className='bg-gray-50 border-b border-[#d2d2d2] p-4 text-default-text'>
                    <div className='flex flex-wrap justify-between -mx-2 gap-y-4'>
                      {BillingAddress(order.billing, '1')}
                      {ShippingAddress(order.billing, '1')}
                      <div className='w-full lg:w-1/3 px-2'>
                        <div className='border border-[#d2d2d2] h-full bg-[#ffffff]'>
                          <div className='bg-gray-100 p-4 font-[600]'>
                            PAYMENT METHOD
                          </div>
                          <div className='p-2 leading-5'>
                            {order?.billing?.paymentMethod}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul role='list' className='divide-y divide-gray-200'>
                    {order.product?.map((item, index) => (
                      <OrD_ItemDetails
                        key={index}
                        item={item}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        updateOrderItems={getOrderDetails}
                      />
                    ))}
                  </ul>
                </div>
                <div className='w-full lg:w-1/4'>
                  <div className='lg:border-l lg:border-slate-200 bg-[#ffffff] h-full text-default-text'>
                    <div className='w-full font-[700] bg-gray-100 px-4 py-4 uppercase'>
                      Cart Summary
                    </div>
                    <div className='px-4 text-default-text'>
                      <dl className=''>
                        {ProductsPrice(order.billing)}
                        {CustomizationPrice(order.billing)}
                        {ShippingEstimationPrice(order.billing)}
                        {AdditionalCosts(order.billing)}
                        {TotalSavings(order.billing)}
                      </dl>
                    </div>
                    <div className='flex justify-between items-center bg-gray-100 w-full text-default-text font-[700] uppercase px-4 py-4'>
                      <div>Estimated Total:</div>
                      <div>
                        <Price value={order?.billing?.orderTotal || 0} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showModal === 'invoice' && (
            <>
              <Ord_InvoiceModal
                onClose={() => setShowModal(null)}
                billing={order.billing}
                product={order.product}
              />
            </>
          )}
        </section>
      )}
    </>
  );
};

export default OrderDetails_type1;
