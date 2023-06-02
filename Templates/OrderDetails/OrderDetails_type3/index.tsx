import MyAccountTabsType3 from '@appComponents/common/MyAccountTabsType3';
import Price from '@appComponents/Price';
import {
  _MyAcc_OrderBillingDetails,
  _MyAcc_OrderProductDetails,
} from '@definations/APIs/user.res';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { FetchOrderDetails } from '@services/user.service';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ShippingAddress } from '../orderDetailsFunctions';
import { Ord_InvoiceModal, OrD_ItemDetails } from './Components';
interface _calculatedData {
  totalMechandaiseCost: number;
  discountPrice: number;
  discountPercent: number;
}

const OrderDetails_type3: React.FC = () => {
  const { query } = useRouter();
  const orderId = query.ordernumber;

  const [order, setOrderDetails] = useState<{
    billing: _MyAcc_OrderBillingDetails;
    product: _MyAcc_OrderProductDetails[];
  } | null>(null);
  const [showModal, setShowModal] = useState<'invoice' | null | 'uploadImage'>(
    null,
  );
  const [discountCal, setdiscountCal] = useState<_calculatedData>();
  const { logoUrl, mediaBaseUrl } = useTypedSelector_v2((state) => state.store);
  const getOrderDetails = () => {
    if (orderId) {
      FetchOrderDetails({ orderId: +orderId }).then((details) => {
        setOrderDetails(details);
      });
    }
  };
  let totalMechandaiseCost = 0;

  const getDiscount = (orderSubtotal: number) => {
    order?.product.map((product) => {
      totalMechandaiseCost =
        totalMechandaiseCost + product.totalQty * product.msrp;
    });
    const discountPrice = totalMechandaiseCost - orderSubtotal;

    const discountPercent = (discountPrice / totalMechandaiseCost) * 100;
    const calculatedData = {
      totalMechandaiseCost: totalMechandaiseCost,
      discountPrice: discountPrice,
      discountPercent: discountPercent,
    };
    return calculatedData;
  };

  useEffect(() => {
    getOrderDetails();
  }, []);
  useEffect(() => {
    if (order?.billing.orderSubtotal) {
      const data = getDiscount(order?.billing.orderSubtotal);
      setdiscountCal(data);
    }
  }, [order]);

  return (
    <>
      <MyAccountTabsType3 />
      {order === null ? (
        <div id='root'>
          <div className='loader-wrapper'>
            <div className='loader'></div>
          </div>
        </div>
      ) : (
        <section className='container mx-auto mt-[50px] mb-[50px]'>
          <div className='w-full'>
            <div className='border border-gray-border'>
              <div className='p-[15px] border border-gray-border'>
                <div className='flex flex-wrap justify-between items-center mx-[-15px]'>
                  <div className='sm:w-1/2 w-full my-[10px] px-[15px]'>
                    <div className='text-normal-text mb-[10px]'>
                      ORDER NUMBER: {order.billing.id}
                    </div>
                    <div className='hidden sm:block'>
                      <div className='text-title-text font-semibold'>
                        Order Date:
                        <time>
                          {moment(order?.billing?.orderDate).format(
                            'MMMM D, YYYY',
                          )}
                        </time>
                      </div>
                    </div>
                  </div>
                  {/* <div>
                    <dt className='text-sub-text font-[600] uppercase'>
                      TOTAL PRICE
                    </dt>
                    <dd className='mt-2 text-sub-text'>
                      <Price value={order.billing?.orderTotal} />
                    </dd>
                  </div> */}
                  <div className='sm:w-1/2 w-full my-[10px] text-right px-[15px]'>
                    <button
                      onClick={() => setShowModal('invoice')}
                      className='btn btn-primary btn-lg uppercase'
                    >
                      <span>View Invoice</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className='p-[15px]'>
                <div className='flex flex-wrap mx-[-15px]'>
                  <div className='lg:w-9/12 md:w-8/12 w-full my-[10px] px-[15px]'>
                    <div className='mb-[30px]'>
                      {ShippingAddress(order.billing, '3')}
                    </div>
                    <div className='[mb-30px]'>
                      <div className=''>
                        <span className='font-[600]'>Payment Method:</span>
                        {order?.billing?.paymentMethod}
                      </div>
                    </div>
                    <ul
                      role='list'
                      className='border-b border-gray-border divide-y divide-gray-300'
                    >
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
                  <section
                    aria-labelledby='summary-heading'
                    className='w-full lg:w-3/12 md:w-4/12 px-[15px] mt-[15px]'
                  >
                    <div className='bg-gray-200 w-full text-normal-text p-[15px] mb-[15px]'>
                      Order Summary
                    </div>
                    <div className='bg-light-gray'>
                      <div className='px-[15px] py-[10px]'>
                        <dl className='space-y-2'>
                          <div className='text-extra-small-text mb-[10px]'>
                            Products Price
                          </div>
                          <div className='flex items-center justify-between pb-[5px]'>
                            <dt className='text-small-text'>Merchandise</dt>
                            <dd className='text-small-text font-medium'>
                              $ {discountCal?.totalMechandaiseCost}
                            </dd>
                          </div>
                          <div className='flex items-center justify-between pb-[5px]'>
                            <dt className='text-small-text'>
                              Discount ({discountCal?.discountPercent} Off)
                            </dt>
                            <dd className='text-small-text font-medium'>
                              -${order.billing.orderSubtotal}
                            </dd>
                          </div>
                          <div className='flex items-center justify-between border-t border-gray-border pt-[15px]'>
                            <dt className='text-small-text'>Subtotal</dt>
                            <dd className='text-small-text font-medium'>
                              ${order.billing.orderSubtotal}
                            </dd>
                          </div>
                          <div className='border-t border-gray-border pt-[15px]'></div>
                          <div className='text-extra-small-text pb-[10px]'>
                            Estimated Shipping
                          </div>
                          <div className='flex items-center justify-between pb-[5px]'>
                            <dt className='flex items-center text-small-text'>
                              <span>SHIPPING</span>
                            </dt>
                            <dd className='text-small-text font-medium'>
                              ${order.billing.orderShippingCosts}
                            </dd>
                          </div>
                          <div className='flex items-center justify-between border-t border-gray-border pt-[15px]'>
                            <dt className='text-small-text'>Subtotal</dt>
                            <dd className='text-small-text font-medium'>
                              ${order.billing.orderShippingCosts}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                    <div className='bg-gray-200 text-normal-text p-[15px] mb-[15px]'>
                      <dl className='space-y-2'>
                        <div className='text-extra-small-text pb-[10px]'>
                          Total Savings
                        </div>
                        <div className='flex items-center justify-between pb-[5px]'>
                          <dt className='flex items-center text-small-text'>
                            <span>
                              Qty Discount ({discountCal?.discountPercent} Off)
                            </span>
                          </dt>
                          <dd className='text-small-text font-medium'>
                            ${discountCal?.discountPrice}
                          </dd>
                        </div>

                        <div className='flex items-center justify-between border-t border-white pt-[15px]'>
                          <dt className='text-small-text'>Subtotal</dt>
                          <dd className='text-small-text font-medium'>
                            ${order.billing.orderSubtotal}
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <div className='flex justify-between items-center bg-gray-100 w-full font-[700] uppercase px-4 py-4'>
                      <dt className='text-small-text'>Estimated Total:</dt>
                      <dd className='text-small-text font-medium'>
                        <Price value={order?.billing?.orderTotal || 0} />
                      </dd>
                    </div>
                  </section>
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
                logoUrl={logoUrl ? logoUrl : ''}
                mediaBaseUrl={mediaBaseUrl}
              />
            </>
          )}
        </section>
      )}
    </>
  );
};

export default OrderDetails_type3;
