import { storeBuilderTypeId } from '@configs/page.config';
import { __Cookie } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import {
  GoogleAnalyticsTrackerForAllStore,
  getAddToCartObject,
  setCookie,
} from '@helpers/common.helper';
import { highLightError } from '@helpers/console.helper';
import getLocation from '@helpers/getLocation';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { addSubStore, addToCart } from '@services/cart.service';

import { useRouter } from 'next/router';
import React from 'react';
import { _globalStore } from 'store.global';
let mediaBaseURL = _globalStore.blobUrl;
interface _props {
  setShowOrSelect: React.Dispatch<React.SetStateAction<'SHOW' | 'SELECT'>>;
}
const LogosToPrint: React.FC<_props> = ({ setShowOrSelect }) => {
  const router = useRouter();
  const selectedLogos = useTypedSelector_v2(
    (state) => state.product.toCheckout.logos,
  );
  const { isSewOutEnable, sewOutCharges } = useTypedSelector_v2(
    (state) => state.store,
  );
  const cartData = useTypedSelector_v2((state) => state.cart.cart);

  const { availableOptions } = useTypedSelector_v2(
    (state) => state.product.toCheckout,
  );
  const { toCheckout, product } = useTypedSelector_v2((state) => state.product);
  const selectedProduct = useTypedSelector_v2(
    (state) => state.product.selected,
  );
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const storeTypeId = useTypedSelector_v2((state) => state.store.storeTypeId);
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );
  const { sbState } = useTypedSelector_v2((state) => state.product.selected);
  const store = useTypedSelector_v2((state) => state.store);

  const loggedIN_userId = useTypedSelector_v2((state) => state.user.id);

  mediaBaseURL = store.mediaBaseUrl || mediaBaseURL;
  const { showModal, setShowLoader, fetchCartDetails } = useActions_v2();

  const addToCartHandler = async () => {
    setShowLoader(true);
    const { sizeQtys, totalPrice, totalQty, logos } = toCheckout;
    const location = await getLocation();

    const cartObject = await getAddToCartObject({
      userId: customerId || 0,
      storeId: storeId || 0,
      isEmployeeLoggedIn,
      note: '',
      sizeQtys: sizeQtys,
      productDetails: {
        productId: selectedProduct.productId,
        color: {
          altTag: selectedProduct.color.altTag,
          imageUrl: selectedProduct.color.imageUrl,
          name: selectedProduct.color.name,
          attributeOptionId: selectedProduct.color.attributeOptionId,
        },
        inventory: selectedProduct.inventory,
      },
      shoppingCartItemId: 0,
      logos: logos,
      isSewOutEnable: isSewOutEnable,
      sewOutCharges: sewOutCharges,
      total: {
        totalPrice,
        totalQty,
      },
    });

    if (totalQty < toCheckout.minQty) {
      setShowLoader(false);
      showModal({
        message: `The minimum order for this color is ${toCheckout.minQty} pieces. Please increase your quantity and try again.`,
        title: 'Required',
      });

      return;
    }

    // for substroe only start
    // for substroe only end

    if (cartObject) {
      //GTM event for add-to-cart

      const payload = {
        storeId: storeId,
        customerId: loggedIN_userId,
        productId: product?.id,
        productName: product?.name,
        colorName: product?.colors?.length
          ? product?.colors?.find((clr) => clr.productId === product.id)?.name
          : '',
        price: toCheckout?.totalPrice,
        salesPrice: toCheckout?.price,
        sku: product?.sku,
        brandName: product?.brand?.name,
        quantity: toCheckout.totalQty,
      };
      GoogleAnalyticsTrackerForAllStore(
        'GoogleAddToCartScript',
        storeId,
        payload,
      );

      try {
        let c_id = customerId;
        let res;
        await addToCart(cartObject)
          .then((res) => {
            if (res) {
              res = res;
            }
            return res;
          })
          .then((res) => {
            if (storeTypeId === storeBuilderTypeId) {
              const Sbs_constant = {
                id: 0,
                rowVersion: '',
                location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
                ipAddress: location.ip_address,
                macAddress: '00-00-00-00-00-00',
                shoppingCartItemsId: res,
                isRequired: true,
                isExclusive: true,
                isChargePerCharacter: true,
              };
              const payload_sbs = sbState.map((el: any) => {
                return { ...el, ...Sbs_constant };
              });

              addSubStore({ shoppingCartItemsCustomFieldModel: payload_sbs });
            }
            setShowLoader(false);
            showModal({
              message: __pagesText.cart.successMessage,
              title: 'Success',
            });
          })
          .catch((err) => {
            setShowLoader(false);
          });

        if (!customerId && res) {
          c_id = res;
          setCookie(__Cookie.tempCustomerId, '' + res, 'Session');
        }
        if (c_id)
          fetchCartDetails({
            customerId: c_id,
            isEmployeeLoggedIn,
          });
      } catch (error) {
        highLightError({ error, component: 'StartOrderModal' });
      }
    }

    // modalHandler(null);
    router.push(paths.CART);
  };

  const actionHandler = (action: 'CONTINUE' | 'CANCEL') => {
    if (action === 'CANCEL') {
      router.back();
      return;
    }
  };

  return (
    <div className='step-2'>
      {selectedLogos?.map((logo, index) => {
        return (
          <div key={logo.no} className='border border-gray-200 p-4 mt-4'>
            <div className=''>Location: {logo.location.name}</div>
            <div className='mt-2 w-32'>
              <img
                className='inline-block'
                src={`${mediaBaseURL}/${logo.location.image}`}
                alt='No Image'
              />
            </div>
            <div className='mt-2'>
              Logo :{' '}
              {logo.logo.name === '' ? 'Will Be Applied Later' : logo.logo.name}
            </div>
            <div className='mt-2 flex gap-2 items-center'>
              <div className='font-semibold'>Logo {index + 1}:</div>
              <div className='w-20 h-20 p-1 inline-flex items-center justify-center border border-gray-200'>
                <img
                  className='inline-block'
                  src={
                    logo?.logo?.url
                      ? `${mediaBaseURL}${logo?.logo?.url}`
                      : '/assets/images/logolater.png'
                  }
                  alt='No Image'
                />
              </div>
            </div>
            <div className='mt-2'>{__pagesText.logoPrint.Note}</div>
          </div>
        );
      })}

      <div className='mt-4'>
        {availableOptions && availableOptions.length > 0 && (
          <button
            onClick={() => {
              setShowOrSelect('SELECT');
            }}
            className='btn btn-primary w-full text-center '
          >
            ADD ANOTHER LOGO
          </button>
        )}
      </div>
      <div className='mt-3'>
        <button
          onClick={addToCartHandler}
          className='btn btn-primary mr-2 w-64'
        >
          ADD TO CART
        </button>
        <button
          onClick={() => actionHandler('CANCEL')}
          className='btn btn-primary w-64'
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default LogosToPrint;
