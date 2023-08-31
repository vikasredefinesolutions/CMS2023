import Price from '@appComponents/Price';
import NxtImage from '@appComponents/reUsable/Image';
import {
  BACARDI,
  BOSTONBEAR,
  HEALTHYPOINTS,
  SIMPLI_SAFE_CODE,
  THD_STORE_CODE,
  UCA,
  _Store_CODES,
  cartRemoveConfirmMessage,
} from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import {
  __SuccessErrorText,
  commonMessage,
} from '@constants/successError.text';
import { captureRemoveItemEvent } from '@controllers/cartController';
import { extractCookies } from '@helpers/common.helper';
import {
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';
import { _CartItem } from '@services/cart';
import {
  deleteItemCart,
  removeParticularSizeProduct,
  updateCartQuantity,
} from '@services/cart.service';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { _globalStore } from 'store.global';
// import { CI_Props } from './cartItem';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CIlayout4: FC<any> = ({ removeCartItem, isEditable = true }) => {
  const cartData = useTypedSelector_v2((state) => state.cart.cart);

  let mediaBaseUrl = _globalStore.blobUrl; // for server side
  const clientSideMediaBaseUrl = useTypedSelector_v2(
    (state) => state.store.mediaBaseUrl,
  );
  const router = useRouter();
  const { setShowLoader } = useActions_v2();
  const { showModal, fetchCartDetails } = useActions_v2();
  const { id: storeId, code: storeCode } = useTypedSelector_v2(
    (state) => state.store,
  );
  const [qtyValues, setQtyValues] = useState<Record<string, string | number>>(
    {},
  );

  const [sizeId, setSizeId] = useState<number[]>([]);
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );

  const selectedBacardiStor = extractCookies(
    'BacardiSelectedStore',
    'browserCookie',
  ).BacardiSelectedStore;

  const customerId = GetCustomerId();

  const refreshCartItems = async () => {
    await fetchCartDetails({
      customerId,
      isEmployeeLoggedIn,
    });
    setShowLoader(false);
  };
  const handleRemoveItem = async (itemId: number) => {
    const userConfirmsToDelete = confirm(cartRemoveConfirmMessage);
    if (userConfirmsToDelete) {
      setShowLoader(true);
      captureRemoveItemEvent(cartData, itemId, customerId, storeId);
      deleteItemCart(itemId)
        .then(() => {
          refreshCartItems();
        })
        .catch(() => {
          setShowLoader(false);
          showModal({
            message: commonMessage.somethingWentWrong,
            title: commonMessage.failed,
          });
        });
    }
  };

  const handleUpdateQuantity = (
    e: any,
    attributeOptionId: string | number,
    cartLogoPersonId: number,
    cQuantity: number | undefined,
    apiQty: number,
  ) => {
    e.preventDefault();
    if (
      (storeCode === SIMPLI_SAFE_CODE ||
        storeCode === _Store_CODES.USAAHEALTHYPOINTS) &&
      !cQuantity
    )
      return;

    if (
      storeCode === _Store_CODES.USAAHEALTHYPOINTS &&
      cQuantity &&
      cQuantity > 1
    )
      return alert(__pagesText.cart.usaaQtyLimit);
    // if (storeCode === SIMPLI_SAFE_CODE && cQuantity && cQuantity > 1) {
    //   return showModal({
    //     message: __pagesText.cart.simpliSafeQtyLimit,
    //     title: '',
    //   });
    // }
    const payload = {
      updateCartLinePersonModel: {
        cartLogoPersonId: cartLogoPersonId,
        quantity: cQuantity,
        attributeOptionId: attributeOptionId,
      },
    };
    // console.log('PAYLOAD , sizenumber', updateCartQuantity(payload));
    setShowLoader(true);
    updateCartQuantity(payload)
      .then((res) => {
        if (res) {
          let size = sizeId;
          fetchCartDetails({ customerId, isEmployeeLoggedIn });
          setSizeId(
            size.filter(
              (id) =>
                id !== payload.updateCartLinePersonModel?.cartLogoPersonId,
            ),
          );
          setShowLoader(false);
          showModal({
            message: commonMessage.updated,
            title: __SuccessErrorText.Success,
          });
        }
      })
      .catch((el) => {
        setQtyValues({
          ...qtyValues,
          [`${cartLogoPersonId}`]: apiQty,
        });
        setShowLoader(false);
        // showModal({
        //   message: el[''],
        //   title: commonMessage.failed,
        // });
        if (el[''] == 'Inventory not available.') {
          showModal({
            message: el[''],
            title: 'Inventory',
          });
        } else {
          showModal({
            message: el[''],
            title: commonMessage.failed,
          });
        }
      });
  };

  mediaBaseUrl = mediaBaseUrl || clientSideMediaBaseUrl;

  const isGiftCardItem = (seName: string) => {
    return seName.toLowerCase().includes('gift');
  };

  const handleSizeRemove = (view: any, item: any) => {
    const payload = {
      deletecartlogopersonmodel: {
        cartLogoPersonId: view.id,
        attributeOptionId: +item.attributeOptionId,
      },
    };

    const confirmRes = confirm(cartRemoveConfirmMessage);
    if (confirmRes) {
      removeParticularSizeProduct(payload)
        .then((res) => {
          setShowLoader(true);
          if (res) {
            setShowLoader(false);
            fetchCartDetails({
              customerId: customerId ? customerId : 0,
              isEmployeeLoggedIn,
            });
            showModal({
              message: commonMessage.removed,
              title: __SuccessErrorText.Success,
            });
          }
        })
        .catch((el) => {
          setShowLoader(false);
          showModal({
            message: el[''],
            title: commonMessage.failed,
          });
        });
    }
  };

  return (
    <>
      <ul
        className={`overflow-hidden ${
          storeCode === THD_STORE_CODE && 'border border-gray-border mb-[20px]'
        }`}
      >
        {cartData &&
          cartData.map((item: _CartItem, cartItemIndex: number) => {
            return (
              <li
                className='bg-white pt-0 mb-[20px]'
                key={`${item.shoppingCartItemsId}_${cartItemIndex}`}
              >
                <div
                  className={`${
                    storeCode === THD_STORE_CODE
                      ? ''
                      : 'border border-gray-border'
                  } p-[15px] w-full `}
                >
                  <div className='flex flex-wrap -mx-[10px]'>
                    <div className='w-full md:w-7/12 px-[10px]'>
                      <div className='flex flex-wrap mb-[10px] md:mb-[0px] -mx-[10px]'>
                        <div className='w-2/6 md:w-1/4 px-[10px]'>
                          <Link
                            href={
                              isGiftCardItem(item.seName)
                                ? `/gift-card/${item.seName}`
                                : `/${item.seName}.html`
                            }
                          >
                            <NxtImage
                              src={item.colorImage}
                              alt={item.productName}
                              className='max-h-[348px] !inline-black m-auto'
                            />
                          </Link>
                        </div>

                        <div className='w-4/6 md:w-3/4 px-[10px]'>
                          <div className='text-medium-text  mb-[10px]'>
                            <Link
                              href={
                                isGiftCardItem(item.seName)
                                  ? `/gift-card/${item.seName}`
                                  : `/${item.seName}.html`
                              }
                            >
                              <a
                                className={`${
                                  storeCode === _Store_CODES.UNITi
                                    ? 'text-anchor hover:text-anchor font-semibold'
                                    : 'text-black  font-semibold'
                                } ${
                                  storeCode === THD_STORE_CODE ||
                                  storeCode === _Store_CODES.UNITi
                                    ? 'hover:text-anchor'
                                    : 'hover:text-secondary'
                                }`}
                              >
                                {item.productName}
                              </a>
                            </Link>
                          </div>
                          {isGiftCardItem(item.seName) ? (
                            <>
                              <div className='text-default-text mb-[5px]'>
                                Name:{' '}
                                <span className='font-semibold'>
                                  {item.attributeOptionValue.split('^')[0]}
                                </span>
                              </div>{' '}
                              <div className='text-default-text mb-[5px]'>
                                Email:{' '}
                                <span className='font-semibold'>
                                  {item.attributeOptionValue.split('^')[1]}
                                </span>
                              </div>
                              <div className='text-default-text mb-[5px]'>
                                Message:{' '}
                                <span className='font-semibold'>
                                  {item?.attributeOptionValue?.split('^')[2] ||
                                    ''}
                                </span>
                              </div>
                              <div className='text-default-text mb-[5px]'>
                                Qty:{' '}
                                <span className='font-semibold'>
                                  {item?.totalQty}
                                </span>
                              </div>
                              <div className='text-default-text'>
                                <div
                                  onClick={() =>
                                    handleRemoveItem(item.shoppingCartItemsId)
                                  }
                                  className={`${
                                    storeCode === _Store_CODES.UNITi
                                      ? 'text-primary'
                                      : 'text-default'
                                  } hover:text-secondary cursor-pointer`}
                                >
                                  <strong>Remove Item</strong>
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className='text-default-text mb-[5px]'>
                              Color:{' '}
                              <span className='font-bold'>
                                {item.attributeOptionValue}
                              </span>
                            </div>
                          )}

                          {!isGiftCardItem(item.seName) && (
                            <div className=''>
                              {item.shoppingCartItemDetailsViewModels.map(
                                (view) => {
                                  return (
                                    <>
                                      <div className='text-default-text mb-[5px] flex items-center flex-wrap gap-y-[5px]'>
                                        Size:{' '}
                                        <strong className='mx-[2px] w-[100px]'>
                                          {' '}
                                          {view.attributeOptionValue} -
                                        </strong>
                                        {isEditable &&
                                        !item.seName
                                          .toLowerCase()
                                          .includes('gift-card') ? (
                                          <form
                                            className=''
                                            onSubmit={(e) => e.preventDefault()}
                                          >
                                            <input
                                              className='form-input max-w-[100px] mx-[2px]'
                                              defaultValue={
                                                qtyValues[view.id.toString()] ||
                                                view.qty
                                              }
                                              type='number'
                                              value={
                                                qtyValues[view.id.toString()]
                                              }
                                              min={1}
                                              onKeyDown={(e) => {
                                                [
                                                  'e',
                                                  'E',
                                                  '+',
                                                  '-',
                                                  '.',
                                                ].includes(e.key) &&
                                                  e.preventDefault();
                                              }}
                                              onChange={(e) => {
                                                if (
                                                  e.target.value.toString() ===
                                                  '0'
                                                ) {
                                                  return setQtyValues({
                                                    ...qtyValues,
                                                    [`${view.id}`]: 1,
                                                  });
                                                }

                                                setQtyValues({
                                                  ...qtyValues,
                                                  [`${view.id}`]:
                                                    e.target.value,
                                                });
                                              }}
                                              onBlur={(e) => {
                                                if (!e.target.value) {
                                                  setQtyValues({
                                                    ...qtyValues,
                                                    [`${view.id}`]: 1,
                                                  });
                                                  return handleUpdateQuantity(
                                                    e,
                                                    +item.attributeOptionId,
                                                    view.id,
                                                    1,
                                                    view.qty,
                                                  );
                                                } else {
                                                  if (
                                                    view.qty != +e.target.value
                                                  )
                                                    return handleUpdateQuantity(
                                                      e,
                                                      +item.attributeOptionId,
                                                      view.id,
                                                      +qtyValues[
                                                        view.id.toString()
                                                      ],
                                                      view.qty,
                                                    );
                                                }
                                              }}
                                            />
                                          </form>
                                        ) : (
                                          <strong className='mx-[2px]'>
                                            {view.qty}
                                          </strong>
                                        )}
                                        <strong className='mx-[2px]'>
                                          Qty
                                        </strong>
                                        {storeCode == BACARDI &&
                                          item.shoppingCartItemDetailsViewModels
                                            .length > 1 && (
                                            <i
                                              onClick={(event) => {
                                                handleSizeRemove(view, item);
                                              }}
                                              className='fa-solid fa-trash-can mx-[5px] cursor-pointer'
                                            ></i>
                                          )}
                                      </div>
                                      {item.shoppingCartItemDetailsViewModels
                                        .length == 1 && (
                                        <div className='text-default-text'>
                                          <div
                                            onClick={() =>
                                              handleRemoveItem(
                                                item.shoppingCartItemsId,
                                              )
                                            }
                                            className={`${
                                              storeCode === _Store_CODES.UNITi
                                                ? 'text-primary'
                                                : 'text-default'
                                            } ${
                                              storeCode === THD_STORE_CODE
                                                ? 'pl-8 hover:text-anchor'
                                                : 'hover:text-secondary'
                                            } cursor-pointer`}
                                          >
                                            <strong>Remove Item</strong>
                                          </div>
                                        </div>
                                      )}
                                    </>
                                  );
                                },
                              )}
                            </div>
                          )}
                          {item.shoppingCartItemDetailsViewModels.length >
                            1 && (
                            <div className='text-default-text'>
                              <div
                                onClick={() =>
                                  handleRemoveItem(item.shoppingCartItemsId)
                                }
                                className={`${
                                  storeCode === _Store_CODES.UNITi
                                    ? 'text-primary'
                                    : 'text-default'
                                } hover:text-secondary cursor-pointer`}
                              >
                                <strong>Remove Item</strong>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='w-full flax-wrap md:w-5/12 px-[10px]'>
                      <div className='flex justify-between'>
                        <div className='text-default-text my-[8px]'>
                          <span>
                            ${(item.totalPrice / item.totalQty).toFixed(2)} /
                            QTY {item.totalQty}
                          </span>
                        </div>
                        <div className='text-default-text my-[8px]'>
                          <span
                            className={`${
                              storeCode === THD_STORE_CODE ||
                              storeCode === _Store_CODES.USAAPUNCHOUT
                                ? 'font-bold'
                                : 'font-semibold'
                            }`}
                          >
                            Total <Price value={item.totalPrice} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
      {storeCode == BOSTONBEAR ? (
        <></>
      ) : (
        router.pathname !== paths.CHECKOUT && (
          <div className=''>
            <Link
              href={
                storeCode == BACARDI
                  ? selectedBacardiStor === 'Bacardi'
                    ? paths.bacardi.bacardi
                    : selectedBacardiStor === 'GreyGoose'
                    ? paths.bacardi.greyGoose
                    : paths.bacardi.bacardi
                  : paths.HOME
              }
            >
              <a
                className={`btn btn-${
                  storeCode == SIMPLI_SAFE_CODE ||
                  storeCode == UCA ||
                  storeCode === HEALTHYPOINTS ||
                  storeCode === BACARDI ||
                  storeCode === _Store_CODES.USAAPUNCHOUT
                    ? 'secondary'
                    : 'primary'
                }`}
              >
                Continue Shopping
              </a>
            </Link>
          </div>
        )
      )}
    </>
  );
};

export default CIlayout4;
