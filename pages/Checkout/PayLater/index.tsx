import SeoHead from '@appComponents/reUsable/SeoHead';
import { SpinnerComponent } from '@appComponents/ui/spinner';
import { _defaultTemplates } from '@configs/template.config';
import { __Cookie, __Cookie_Expiry } from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import {
  UserType,
  _MyAcc_OrderBillingDetails,
  _MyAcc_OrderProductDetails,
} from '@definations/APIs/user.res';
import { WishlistType } from '@definations/wishlist.type';
import { setCookie } from '@helpers/common.helper';
import { useActions_v2 } from '@hooks_v2/index';
import { FetchPageThemeConfigs } from '@services/product.service';
import { FetchOrderDetails, GetStoreCustomer } from '@services/user.service';
import { getWishlist } from '@services/wishlist.service';
import PaylaterTemplate from '@templates/Paylater';
import { handleRedirect } from '@templates/Paylater/PayLater_type1/components/PL1.extras';
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { _globalStore } from 'store.global';

const Checkout: NextPage<{ templateId: number }> = ({ templateId }) => {
  const router = useRouter();
  let orderNumber = router.query.OrderNumber;
  const { logInUser, updateCustomer, updateWishListData } = useActions_v2();

  const [orderDetails, setOrderDetails] = useState<
    | {
        billing: _MyAcc_OrderBillingDetails | null;
        product: _MyAcc_OrderProductDetails[] | null;
      }
    | null
    | 'SOMETHING_WENT_WRONG'
  >(null);

  const handlePaymentPending = (details: {
    billing: _MyAcc_OrderBillingDetails;
    product: _MyAcc_OrderProductDetails[];
  }) => {
    setOrderDetails(details);
  };

  const logginUserWithId = async (customerId: number) => {
    logInUser({
      id: customerId,
    });
    setCookie(__Cookie.userId, `${customerId}`, __Cookie_Expiry.userId);

    await Promise.allSettled([
      GetStoreCustomer(customerId),
      getWishlist(customerId),
    ]).then((values) => {
      const customerDetails: UserType | null =
        values[0].status === 'fulfilled' ? values[0].value : null;

      const wishlist: WishlistType | null =
        values[1].status === 'fulfilled' ? values[1].value : null;

      if (customerDetails) {
        updateCustomer({ customer: customerDetails });
      }

      if (wishlist) {
        updateWishListData(wishlist);
      }
    });
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
          logginUserWithId(res.billing.customerID);

          if (res.billing.paymentMethod === 'PAYMENTPENDING') {
            handlePaymentPending(res);
            return;
          }
          handleRedirect('PAYMENT_ALREADY_DONE');
        })
        .catch((error) => {
          console.log('error ===>', error);
          setOrderDetails('SOMETHING_WENT_WRONG');
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

  if (orderDetails === 'SOMETHING_WENT_WRONG') {
    return (
      <section id=''>
        <div className='bg-[#ffffff]'>
          <div className='h-80 flex items-center justify-center'>
            <div className='text-2xl-text'>Something Went Wrong!!!</div>
          </div>
        </div>
      </section>
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
