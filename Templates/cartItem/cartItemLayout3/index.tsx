import NxtImage from '@appComponents/reUsable/Image';
import Price from '@appComponents/reUsable/Price';
import {
  cartQuantityUpdateConfirmMessage,
  cartRemoveConfirmMessage,
} from '@constants/global.constant';
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
import { FC, useState } from 'react';
import { _globalStore } from 'store.global';
// import { CI_Props } from './cartItem';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CIlayout3: FC<any> = ({ isEditable, removeCartItem, loadProduct }) => {
  const { loggedIn: empLoggedIn } = useTypedSelector_v2(
    (state) => state.employee,
  );
  const cartData = useTypedSelector_v2((state) => state.cart.cart);
  const { setShowLoader, showModal, fetchCartDetails } = useActions_v2();
  const [qtyValues, setQtyValues] = useState<Record<string, string | number>>(
    {},
  );
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );
  const customerId = GetCustomerId();

  const { id: storeId, code: storeCode } = useTypedSelector_v2(
    (state) => state.store,
  );

  const [sizeId, setSizeId] = useState<number[]>([]);

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
  const handleUpdate = (e: string, qty: any, itemId: any) => {
    if (+e !== qty) {
      setSizeId((prev) => [...prev, itemId]);
    } else {
      let size = sizeId;
      setSizeId(size.filter((id) => id !== itemId));
    }
  };
  const handleUpdateQuantity = (
    e: any,
    attributeOptionId: string | number,
    cartLogoPersonId: number,
    cQuantity: number | undefined,
  ) => {
    e.preventDefault();
    const payload = {
      updateCartLinePersonModel: {
        cartLogoPersonId: cartLogoPersonId,
        quantity: cQuantity,
        attributeOptionId: attributeOptionId,
      },
    };

    const confirmRes = confirm(cartQuantityUpdateConfirmMessage);
    if (confirmRes) {
      setShowLoader(true);
      updateCartQuantity(payload)
        .then((res) => {
          if (res) {
            let size = sizeId;
            fetchCartDetails({ customerId: customerId, isEmployeeLoggedIn });
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
            document.location.reload();
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
  let mediaBaseUrl = _globalStore.blobUrl; // for server side
  const clientSideMediaBaseUrl = useTypedSelector_v2(
    (state) => state.store.mediaBaseUrl,
  );
  mediaBaseUrl = mediaBaseUrl || clientSideMediaBaseUrl;
  return (
    <ul role='list' className='overflow-hidden'>
      {cartData &&
        cartData.map((item: _CartItem, cartItemIndex: number) => (
          <li
            key={item.attributeOptionId}
            className='flex flex-wrap py-[20px] -mx-[10px]'
          >
            <div className='w-full lg:w-1/4 px-[10px]'>
              {/* <div className='w-full'> */}
              <Link href={`/${item.seName}`}>
                <a>
                  <NxtImage
                    src={
                      item.colorImage ||
                      '/assets/images/image_not_available.jpg'
                    }
                    alt={item.productName}
                    className='max-h-64 m-auto'
                    isStatic={!item.colorImage}
                  />
                </a>
              </Link>
              {/* </div> */}
            </div>
            <div className='w-full lg:w-3/4 px-[10px] flex flex-wrap lg:justify-between'>
              <div className='text-sub-text font-semibold flex justify-between w-full'>
                <div>
                  <Link href={`/${item.seName}`}>
                    <a className='text-black hover:text-secondary'>
                      {item.productName}
                    </a>
                  </Link>
                </div>

                <div className='text-default-text'>
                  <div
                    onClick={() => handleRemoveItem(item.shoppingCartItemsId)}
                    className='primary-link hover:hover-primary-link cursor-pointer'
                  >
                    <strong>Remove Item</strong>
                  </div>
                </div>
              </div>
              <div className='w-full flex flex-wrap'>
                <div className='lg:w-2/3 w-full mt-[10px]'>
                  <div className='flex justify-between'>
                    <div className='text-medium-text'>
                      <span className='font-semibold'>SKU :</span>
                      {item.sku}
                    </div>
                  </div>
                  <div className='mt-[5px] flex'>
                    <div className='text-default-text'>
                      <span className='font-semibold'>Color :</span>
                      {item.attributeOptionValue}
                    </div>
                  </div>
                  <div className='mt-[40px]'>
                    <div className='text-default-text font-semibold border-b border-b-gray-border pb-[10px]'>
                      Item Details
                    </div>
                    <div className='flex justify-between py-[10px]'>
                      <div className='text-default-text font-semibold w-28'>
                        Size
                      </div>
                      <div className='text-default-text font-semibold w-28 text-center'>
                        Qty
                      </div>
                      {empLoggedIn && (
                        <div className='text-base font-semibold w-28 text-center'>
                          Unit Price
                        </div>
                      )}
                      <div className='text-default-text font-semibold w-28 text-right'>
                        Price
                      </div>
                    </div>
                    {item.shoppingCartItemDetailsViewModels.map(
                      (view, viewIndex) => {
                        return (
                          <div
                            key={view.id}
                            className='flex justify-between py-[10px]'
                          >
                            <div className='text-default-text w-28'>
                              {view.attributeOptionValue}
                            </div>
                            <div className='text-default-text w-28 text-center'>
                              {isEditable ? (
                                <form>
                                  <div className='flex'>
                                    <input
                                      className='text-default-text pl-[5px] pr-[5px] pt-[5px] pb-[5px] w-[60px] mr-2 rounded border-[#000000]'
                                      defaultValue={
                                        qtyValues[view.id.toString()] ||
                                        view.qty
                                      }
                                      type='number'
                                      value={qtyValues[view.id.toString()]}
                                      min={1}
                                      onKeyDown={(e) => {
                                        ['e', 'E', '+', '-', '.'].includes(
                                          e.key,
                                        ) && e.preventDefault();
                                      }}
                                      onChange={(e) => {
                                        if (e.target.value.toString() === '0') {
                                          return setQtyValues({
                                            ...qtyValues,
                                            [`${view.id}`]: 1,
                                          });
                                        }

                                        setQtyValues({
                                          ...qtyValues,
                                          [`${view.id}`]: e.target.value,
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
                                          );
                                        } else {
                                          return handleUpdateQuantity(
                                            e,
                                            +item.attributeOptionId,
                                            view.id,
                                            +qtyValues[view.id.toString()],
                                          );
                                        }
                                      }}
                                    />
                                    {sizeId.find((el) => el === view.id) && (
                                      <button
                                        onClick={(e) => {
                                          handleUpdateQuantity(
                                            e,
                                            +item.attributeOptionId,
                                            view.id,
                                            +qtyValues[view.id.toString()],
                                          );
                                        }}
                                        className='btn btn-sm btn-primary'
                                      >
                                        UPDATE
                                      </button>
                                    )}
                                  </div>
                                </form>
                              ) : (
                                view.qty
                              )}
                            </div>
                            <div className='text-default-text w-28 text-right'>
                              <Price value={view.price} />
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
                <div className='mt-[10px] lg:w-1/3 w-full'>
                  <div className='font-bold text-medium-text text-right'>
                    <div className='font-semibold mb-2'>Item Total:</div>
                    <span className='font-semibold'>
                      <Price value={item.totalPrice} />
                    </span>
                  </div>

                  {removeCartItem && (
                    <div className={`mt-[15px] lg:ml-[40px]`}>
                      <a
                        onClick={() => removeCartItem(item.shoppingCartItemsId)}
                        className='btn btn-primary !w-full !py-[5px] text-center'
                      >
                        Remove
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default CIlayout3;
