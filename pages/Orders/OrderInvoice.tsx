import { _defaultTemplates } from '@configs/template.config';
import { paths } from '@constants/paths.constant';
import {
  _MyAcc_OrderBillingDetails,
  _MyAcc_OrderProductDetails,
} from '@definations/APIs/user.res';
import { FetchOrderDetails } from '@services/user.service';
import OrderInvoiceTemaplate from '@templates/OrderInvoice';

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const orderInvoice: React.FC = () => {
  const router = useRouter();
  const orderId = router.query.orderNumber;

  const [order, setOrderDetails] = useState<
    | {
        billing: _MyAcc_OrderBillingDetails | null;
        product: _MyAcc_OrderProductDetails[] | null;
      }
    | null
    | 'SOMETHING WENT WRONG'
  >(null);
  // const showThankYou = useTypedSelector_v2((state) => state.cart.showThankYou);

  useEffect(() => {
    if (orderId && order === null) {
      FetchOrderDetails({ orderId: +orderId })
        .then((details) => setOrderDetails(details))
        .catch(() => setOrderDetails('SOMETHING WENT WRONG'));
      return;
    }

    if (!orderId) {
      router.push(paths.HOME);
    }
  }, [orderId, order]);

  if (order === null) {
    return (
      <div id='root'>
        <div className='loader-wrapper'>
          <div className='loader'>null</div>
        </div>
      </div>
    );
  }

  if (order === 'SOMETHING WENT WRONG') {
    return <>Something went wrong!!!</>;
  }

  // console.log('order ouside main', order);

  return (
    <>
      <OrderInvoiceTemaplate order={order} id={_defaultTemplates.thankYou} />
    </>
  );
};

export default orderInvoice;
