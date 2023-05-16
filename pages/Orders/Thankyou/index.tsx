import { _defaultTemplates } from '@configs/template.config';
import { paths } from '@constants/paths.constant';
import {
  _MyAcc_OrderBillingDetails,
  _MyAcc_OrderProductDetails,
} from '@definations/APIs/user.res';
import { Product } from '@definations/productList.type';
import { FetchProductById } from '@services/product.service';
import { FetchOrderDetails } from '@services/user.service';
import ThankYouTemplate from '@templates/ThankYou';

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const ThankYou: React.FC = () => {
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
        .then(async (details) => {
          //Adding missing key brandName and categoryName that is required for GTM event payload
          let productdetails: any = [];
          if (details?.product?.length && details?.billing?.storeID) {
            await Promise.all(
              details?.product?.map(async (item) => {
                const productResponse = await FetchProductById({
                  productId: 0,
                  seName: item.seName || '',
                  storeId: details?.billing?.storeID,
                });
                if (productResponse) productdetails.push(productResponse);
              }),
            );
          }
          if (productdetails?.length) {
            const contructedProduct: _MyAcc_OrderProductDetails[] = details
              ?.product?.length
              ? details?.product?.map((item) => {
                  const currProduct = productdetails?.find(
                    (prod: Product) => `${prod?.id}` === `${item.productId}`,
                  );
                  if (currProduct)
                    return {
                      ...item,
                      categoryName: currProduct?.categoryName,
                      brandName: currProduct?.brandName,
                    };
                  return item;
                })
              : [];
            setOrderDetails({
              billing: details?.billing || null,
              product: contructedProduct,
            });
          } else {
            setOrderDetails(details);
          }
        })
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
