import Price from '@appComponents/Price';
import MyAccountTabsType6 from '@appComponents/common/MyAccountTabsType6';
import { __pagesConstant } from '@constants/pages.constant';
import { paths } from '@constants/paths.constant';
import {
  _MyAcc_OrderBillingDetails,
  _MyAcc_OrderProductDetails,
} from '@definations/APIs/user.res';
import { FetchOrderDetails } from '@services/user.service';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';
import { BillingAddress, ShippingAddress } from '../orderDetailsFunctions';
import { OrD_ItemDetails } from './Components';

const OrderDetails_type6: React.FC = () => {
  const { query } = useRouter();
  const orderId = query.ordernumber;

  const [order, setOrderDetails] = useState<{
    billing: _MyAcc_OrderBillingDetails;
    product: _MyAcc_OrderProductDetails[];
  } | null>(null);

  const PricesHTML = (billing: _MyAcc_OrderBillingDetails): ReactNode => {
    const logoTotal = billing?.logoFinalTotal || 0;
    const lineTotal = billing?.lineFinalTotal || 0;
    const shipPromotionDiscount = billing?.shipPromotionDiscount || 0;
    const couponDiscountAmount = billing?.couponDiscountAmount || 0;
    const giftCertificateDiscountAmount =
      billing?.giftCertificateDiscountAmount || 0;
    const quantityDiscountAmount = billing?.quantityDiscountAmount || 0;
    const levelDiscountAmount = billing?.levelDiscountAmount || 0;
    const customDiscount = billing?.customDiscount || 0;
    const shippingLabelCost = billing?.shippingLabelCost || 0;
    const orderShippingCosts = billing?.orderShippingCosts || 0;
    const shippingPromotionDiscount = billing?.shipPromotionDiscount || 0;
    const sewOutTotal = billing?.sewoutTotal || 0;
    const orderTaxTotal = billing?.orderTax || 0;
    const giftWrapPrice = billing?.giftWrapPrice || 0;
    const giftWrapAmt = billing?.giftWrapAmt || 0;
    const productsTotal = billing?.orderSubtotal || 0;

    const totalShippingCost =
      shippingLabelCost + orderShippingCosts - shippingPromotionDiscount;

    return (
      <>
        <div className='flex justify-between pt-[8px]'>
          <dt className='font-[600]'>Sub Total:</dt>
          <dd className=''>
            <Price value={productsTotal} />
          </dd>
        </div>
        <div className='flex justify-between pt-[8px]'>
          <dt className=''>Line Personalization</dt>
          <dd className=''>
            <Price value={lineTotal} />
          </dd>
        </div>
        <div className='flex justify-between pt-[8px]'>
          <dt className=''>Additional Logo Costs:</dt>
          <dd className=''>
            <Price value={logoTotal} />
          </dd>
        </div>
        <div className='flex justify-between pt-[8px]'>
          <dt className=''>Shipping:</dt>
          <dd className=''>
            <Price value={totalShippingCost} />
          </dd>
        </div>
        <div className='flex justify-between pt-[8px]'>
          <dt className=''>Tax:</dt>
          <dd className=''>
            <Price value={orderTaxTotal} />
          </dd>
        </div>
        <div className='flex justify-between pt-[8px]'>
          <dt className=''>Sew Out:</dt>
          <dd className=''>
            <Price value={sewOutTotal} />
          </dd>
        </div>
      </>
    );
  };

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
    <MyAccountTabsType6>
      {order === null ? (
        <div id='root'>
          <div className='loader-wrapper'>
            <div className='loader'></div>
          </div>
        </div>
      ) : (
        <section className='container mx-auto  mb-[50px]'>
          <div className='block lg:flex lg:space-x-10'>
            <div className='w-4/4 lg:w-4/5'>
              <div className='bg-[#ffffff]'>
                <div className='mb-[20px]'>
                  <Link href={paths.myAccount.orders} title=''>
                    <a className='!text-anchor !text-anchor-hover'>
                      &lt; Go Back to all orders
                    </a>
                  </Link>
                </div>
                <div className='mb-[20px] text-[16px] border-b border-black pb-[20px]'>
                  {`Order: # ${order.billing.id} placed on ${moment(
                    order?.billing?.orderDate,
                  ).format(
                    __pagesConstant._myAccount.orderDetails.dateFormat,
                  )}`}
                </div>
                <ul
                  role='list'
                  className='overflow-hidden p-[15px] md:p-[30px]'
                >
                  {order.product.map((item, index) => {
                    return <OrD_ItemDetails key={index} item={item} />;
                  })}
                  <div className='flex justify-start text-default-text'>
                    <div className='md:max-w-[500px] w-full'>
                      <div className='flex justify-between pt-[15px]'>
                        {BillingAddress(order.billing, '2')}
                        {ShippingAddress(order.billing, '2')}
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-end text-default-text'>
                    <div className='md:max-w-[400px] w-full'>
                      <dl className='pt-[15px]'>
                        {PricesHTML(order.billing)}
                        <div className='flex justify-between border-t mt-[8px] mb-[15px] border-gray-border pt-[8px]'>
                          <dt className='font-[600] pt-[8px]'>Grand Total:</dt>
                          <dd className='font-[600] pt-[8px]'>
                            <Price value={order.billing.orderTotal} />
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}
    </MyAccountTabsType6>
  );
};

export default OrderDetails_type6;
