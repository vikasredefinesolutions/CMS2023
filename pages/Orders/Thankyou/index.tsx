import { _defaultTemplates } from '@configs/template.config';
import { paths } from '@constants/paths.constant';
import {
  _MyAcc_OrderBillingDetails,
  _MyAcc_OrderProductDetails,
} from '@definations/APIs/user.res';
import { FetchOrderDetails } from '@services/user.service';
import ThankYouTemplate from '@templates/ThankYou';

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const ThankYou: React.FC = () => {
  const router = useRouter();
  const orderId = router.query.orderNumber;
  // console.log('orderId', orderId);

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
  }, []);

  // if (!showThankYou) {
  //   return <></>;
  // }

  if (order === null) {
    return (
      <div id='root'>
        <div className='loader-wrapper'>
          <div className='loader'>null</div>
        </div>
      </div>
    );
  }

  // console.log('order info', order);

  if (order === 'SOMETHING WENT WRONG') {
    return <>Something went wrong!!!</>;
  }

  return (
    <>
      <ThankYouTemplate order={order} id={_defaultTemplates.thankYou} />
    </>
  );
};

export default ThankYou;
