import SeoHead from '@appComponents/reUsable/SeoHead';
import { SpinnerComponent } from '@appComponents/ui/spinner';
import { _defaultTemplates } from '@configs/template.config';
import { paths } from '@constants/paths.constant';
import {
  _MyAcc_OrderBillingDetails,
  _MyAcc_OrderProductDetails,
} from '@definations/APIs/user.res';
import { FetchPageThemeConfigs } from '@services/product.service';
import { FetchOrderDetails } from '@services/user.service';
import PaylaterTemplate from '@templates/Paylater';
import { handleRedirect } from '@templates/Paylater/PayLater_type1/components/PL1.extras';
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { _globalStore } from 'store.global';

const Checkout: NextPage<{ templateId: number }> = ({ templateId }) => {
  const router = useRouter();
  let orderNumber = router.query.OrderNumber;

  const [orderDetails, setOrderDetails] = useState<{
    billing: _MyAcc_OrderBillingDetails | null;
    product: _MyAcc_OrderProductDetails[] | null;
  } | null>(null);

  const handlePaymentPending = (details: {
    billing: _MyAcc_OrderBillingDetails;
    product: _MyAcc_OrderProductDetails[];
  }) => {
    setOrderDetails(details);
  };

  useEffect(() => {
    if (orderNumber) {
      // Call Order API
      FetchOrderDetails({ orderId: +orderNumber })
        .then((res) => {
          if (!res) {
            handleRedirect('UNEXPECTED_ERROR');
            return;
          }
          if (res.billing.paymentMethod === 'PAYMENTPENDING') {
            handlePaymentPending(res);
            return;
          }
          handleRedirect('PAYMENT_ALREADY_DONE');
        })
        .catch((error) => {
          if ('message' in error) {
            if (error.message === 'NO_DETAILS_FOUND') {
              handleRedirect('UNEXPECTED_ERROR');
            }
          }
        })
        .finally(() => {});
    }

    if (!orderNumber) {
      router.push(paths.HOME);
    }
  }, []);

  if (orderDetails === null) {
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
      <SeoHead title={''} keywords={''} description={''} />
      <div>
        <PaylaterTemplate templateId={1} orderDetails={orderDetails} />
      </div>
    </>
  );
};

export default Checkout;

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<{ templateId: number }>
> => {
  let cartPageTemplateId = _defaultTemplates.cart;

  await FetchPageThemeConfigs('' + _globalStore.storeId, 'cartPage').then(
    (res) => {
      if (res?.config_value) {
        let type: { cartPageTemplateId: number } = JSON.parse(res.config_value);
        cartPageTemplateId = type.cartPageTemplateId;
      }
    },
  );

  return {
    props: {
      templateId: cartPageTemplateId,
    },
  };
};
