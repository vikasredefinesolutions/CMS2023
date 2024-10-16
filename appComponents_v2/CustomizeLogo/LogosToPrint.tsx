import NxtImage from '@appComponents/reUsable/Image';
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
import {
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';
import { _LogoDetail } from '@redux/slices/product.slice.types';
import { addSubStore, addToCart } from '@services/cart.service';

import { useRouter } from 'next/router';
import React from 'react';
interface _props {
  setShowOrSelect: React.Dispatch<React.SetStateAction<'SHOW' | 'SELECT'>>;
  setShowLogoComponent: React.Dispatch<React.SetStateAction<boolean>>;
}
const LogosToPrint: React.FC<_props> = ({
  setShowOrSelect,
  setShowLogoComponent,
}) => {
  const router = useRouter();
  const selectedLogos = useTypedSelector_v2(
    (state) => state.product.toCheckout.logos,
  );
  const { isSewOutEnable, sewOutCharges } = useTypedSelector_v2(
    (state) => state.store,
  );
  const { availableOptions, price: pricePerItem } = useTypedSelector_v2(
    (state) => state.product.toCheckout,
  );
  const { toCheckout, product } = useTypedSelector_v2((state) => state.product);
  const selectedProduct = useTypedSelector_v2(
    (state) => state.product.selected,
  );
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const storeTypeId = useTypedSelector_v2((state) => state.store.storeTypeId);
  const customerId = GetCustomerId();
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );
  const { sbState } = useTypedSelector_v2((state) => state.product.selected);
  const store = useTypedSelector_v2((state) => state.store);

  const { showModal, setShowLoader, fetchCartDetails, clearToCheckout } =
    useActions_v2();

  const resolvePriceIssue = (logos: _LogoDetail[] | null, totalQty: number) => {
    if (!logos) return null;

    const getPrice = (index: number) => {
      if (index === 0) {
        return store.firstLogoCharge;
      }

      return store.secondLogoCharge;
    };

    return logos.map((logo, index) => ({
      ...logo,
      location: {
        ...logo.location,
        // cost: getPrice(index) * totalQty,
        cost: getPrice(index),
        price: getPrice(index),
      },
    }));
  };

  const addToCartHandler = async () => {
    setShowLoader(true);
    const { sizeQtys, totalPrice, totalQty, logos } = toCheckout;
    const location = await getLocation();

    const cartObject = await getAddToCartObject({
      userId: +customerId || 0,
      storeId: storeId || 0,
      isEmployeeLoggedIn,
      note: '',
      sizeQtys: sizeQtys,
      ipAddress: '192.168.1.1',
      isForm: false,
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
      logos: resolvePriceIssue(logos, totalQty),
      isSewOutEnable: isSewOutEnable,
      sewOutCharges: sewOutCharges,
      total: {
        totalPrice,
        totalQty,
      },
      price: toCheckout.price,
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
        customerId: +customerId,
        value: toCheckout?.totalPrice,
        coupon: '',
        shoppingCartItemsModel: [
          {
            productId: product?.id,
            productName: product?.name,
            colorVariants: product?.colors?.length
              ? product?.colors?.find((clr) => clr.productId === product.id)
                  ?.attributeOptionId
              : '',
            price: toCheckout?.totalPrice,
            quantity: toCheckout.totalQty,
          },
        ],
      };
      GoogleAnalyticsTrackerForAllStore(
        'GoogleAddToCartScript',
        storeId,
        payload,
      );

      try {
        let c_id = customerId;
        await addToCart(cartObject)
          .then((res) => {
            setCookie(__Cookie.tempCustomerId, '' + res, 'Session');
            res = c_id;
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
            setShowLogoComponent(false);
            clearToCheckout();

            router.push(paths.CART);
          })
          .catch((err) => {
            setShowLoader(false);
            let x = '';
            Object.values(err).forEach((val) => (x = x + val));
            showModal({
              message: x,
              title: 'Failed',
            });
          });

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
  };
  return (
    <div className='step-2'>
      {selectedLogos?.map((logo, index) => {
        return (
          <div key={logo.no} className='border border-gray-200 p-4 mt-4'>
            <div className=''>Location: {logo.location.name}</div>
            <div className='mt-2 w-32'>
              <NxtImage
                className='inline-block'
                src={logo.location?.image || null}
                alt='No Image'
              />
            </div>
            <div className='mt-2'>
              Logo :{' '}
              {logo.logo.url === '' ? 'Will Be Applied Later' : `Submitted`}
            </div>
            <div className='mt-2 flex gap-2 items-center'>
              <div className='font-semibold'>Logo {index + 1}:</div>
              <div className='w-20 h-20 p-1 inline-flex items-center justify-center border border-gray-200'>
                <NxtImage
                  className='inline-block'
                  useNextImage={false}
                  src={logo?.logo?.url || '/assets/images/logolater.png'}
                  alt='No Image'
                  isStatic={!logo?.logo?.url}
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
            + ADD ANOTHER LOGO
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
          onClick={() => {
            clearToCheckout(pricePerItem);
            setShowLogoComponent(false);
          }}
          className='btn btn-primary w-64'
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default LogosToPrint;
