import Price from '@appComponents/Price';
import NxtImage from '@appComponents/reUsable/Image';
import {
  cartRemoveConfirmMessage,
  SIMPLI_SAFE_CODE,
} from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import {
  __SuccessErrorText,
  commonMessage,
} from '@constants/successError.text';
import { captureRemoveItemEvent } from '@controllers/cartController';
import {
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';
import { _CartItem } from '@services/cart';
import { deleteItemCart, updateCartQuantity } from '@services/cart.service';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useRef, useState } from 'react';
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
  const valueRef = useRef<Record<string, undefined | number>>({});

  const [sizeId, setSizeId] = useState<number[]>([]);
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );

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
  ) => {
    e.preventDefault();
    if (storeCode === SIMPLI_SAFE_CODE && !cQuantity) return;
    if (storeCode === SIMPLI_SAFE_CODE && cQuantity && cQuantity > 1) {
      return showModal({
        message: __pagesText.cart.simpliSafeQtyLimit,
        title: '',
      });
    }
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
        setShowLoader(false);
        showModal({
          message: el[''],
          title: commonMessage.failed,
        });
      });
  };

  mediaBaseUrl = mediaBaseUrl || clientSideMediaBaseUrl;

  return (
    <>
      <ul className='overflow-hidden '>
        {cartData &&
          cartData.map((item: _CartItem, cartItemIndex: number) => {
            return (
              <li
                className='bg-white pt-0 mb-[20px]'
                key={`${item.shoppingCartItemsId}_${cartItemIndex}`}
              >
                <div className='border border-gray-border p-[15px] w-full '>
                  <div className='flex flex-wrap -mx-[10px]'>
                    <div
                      className={` ${
                        // // storeCode == _Store.type6
                        //   ? 'w-full md:w-7/12 px-[10px]'
                        //   : 'w-full lg:w-1/12 pl-[12px] pr-[12px] mb-[10px] max-w-[300px] mx-auto'
                        'w-full md:w-7/12 px-[10px]'
                      }`}
                    >
                      <div className='flex flex-wrap mb-[10px] md:mb-[0px] -mx-[10px]'>
                        <div className='w-2/6 md:w-1/4 px-[10px]'>
                          <Link href={`/${item.seName}.html`}>
                            <NxtImage
                              src={`${mediaBaseUrl}${item.colorImage}`}
                              alt={item.productName}
                              className='max-h-[348px] !inline-black m-auto'
                            />
                          </Link>
                        </div>

                        <div className='w-4/6 md:w-3/4 px-[10px]'>
                          <div className='text-medium-text  mb-[10px]'>
                            <Link href={`/${item.seName}.html`}>
                              <a className='text-black hover:text-secondary font-semibold'>
                                {item.productName}
                              </a>
                            </Link>
                          </div>
                          <div className='text-default-text mb-[5px]'>
                            Color:{' '}
                            <span className='font-semibold'>
                              {item.attributeOptionValue}
                            </span>
                          </div>
                          <div className=''>
                            {item.shoppingCartItemDetailsViewModels.map(
                              (view, viewIndex) => {
                                return (
                                  <>
                                    <div className='text-default-text mb-[5px] flex items-center flex-wrap gap-y-[5px]'>
                                      Size :{' '}
                                      <strong className='mx-[2px]'>
                                        {' '}
                                        {view.attributeOptionValue} -
                                      </strong>
                                      {isEditable ? (
                                        <form className=''>
                                          <input
                                            className='form-input max-w-[100px] mx-[2px]'
                                            defaultValue={view.qty}
                                            data-valueofinput={view.qty}
                                            onChange={(e) => {
                                              valueRef.current = {
                                                ...valueRef.current,
                                                [`${view.id}`]: +e.target.value,
                                              };
                                            }}
                                            onBlur={(e) => {
                                              handleUpdateQuantity(
                                                e,
                                                +item.attributeOptionId,
                                                view.id,
                                                valueRef.current[
                                                  view.id.toString()
                                                ],
                                              );
                                            }}
                                          />
                                        </form>
                                      ) : (
                                        <strong className='mx-[2px]'>
                                          {view.qty}
                                        </strong>
                                      )}
                                      <strong className='mx-[2px]'>Qty</strong>
                                    </div>
                                    <div className='text-default-text'>
                                      <div
                                        onClick={() =>
                                          handleRemoveItem(
                                            item.shoppingCartItemsId,
                                          )
                                        }
                                        className='primary-link hover:hover-primary-link'
                                      >
                                        <strong>Remove Item</strong>
                                      </div>
                                    </div>
                                  </>
                                );
                              },
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='w-full flax-wrap md:w-5/12 px-[10px]'>
                      <div className='flex justify-between'>
                        <div className='text-default-text'>
                          <span>
                            ${(item.totalPrice / item.totalQty).toFixed(2)} /
                            QTY {item.totalQty}
                          </span>
                        </div>
                        <div className='text-default-text mb-[10px]'>
                          <span className='font-semibold'>
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
      {router.pathname !== paths.CHECKOUT && (
        <div className='mt-[20px]'>
          <Link href={'/'}>
            <a className='btn btn-primary '>Continue Shopping</a>
          </Link>
        </div>
      )}
    </>
  );
};

export default CIlayout4;
