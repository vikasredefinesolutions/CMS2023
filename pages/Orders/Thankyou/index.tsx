import { SpinnerComponent } from '@appComponents/ui/spinner';
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

  const [order, setOrderDetails] = useState<{
    billing: _MyAcc_OrderBillingDetails | null;
    product: _MyAcc_OrderProductDetails[] | null;
  } | null>(null);
  // const showThankYou = useTypedSelector_v2((state) => state.cart.showThankYou);

  useEffect(() => {
    if (orderId && order === null) {
      FetchOrderDetails({ orderId: +orderId })
        .then((details) => setOrderDetails(details))
        .catch(() => router.push(paths.HOME));
      return;
    }

    if (!orderId) {
      router.push(paths.HOME);
    }
  }, [orderId, order]);

  // if (!showThankYou) {
  //   return <></>;
  // }

  if (order === null) {
    return (
      <div className=''>
        <section className='container mx-auto text-center'>
          <div className='py-[12%]'>
            <div className='text-2xl-text'>
              <SpinnerComponent />
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <>
      <ThankYouTemplate order={order} id={_defaultTemplates.thankYou} />
    </>
  );
};

export default ThankYou;
