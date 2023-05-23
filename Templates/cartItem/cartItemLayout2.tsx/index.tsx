import { default as NxtImage } from '@appComponents/reUsable/Image';
import Price from '@appComponents/reUsable/Price';
import {
  cartQuantityUpdateConfirmMessage,
  cartRemoveConfirmMessage,
} from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import {
  __SuccessErrorText,
  commonMessage,
} from '@constants/successError.text';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { CartObject, ShoppingCartItemDetailsViewModel } from '@services/cart';
import {
  removeLogo,
  removeParticularSizeProduct,
  updateCartQuantity,
} from '@services/cart.service';
import { _CartLinePersonDetailModel } from '@services/product.service.type';
import Link from 'next/link';
import { FC, useRef, useState } from 'react';
import { _globalStore } from 'store.global';
import Personalizing from './components/Personalizing';
// import { CI_Props } from './cartItem';
// eslint-disable-next-line @typescript-eslint/no-explicit-any

export interface PersonalizationArray {
  attributeOptionId: string;
  attributeOptionValue: string;
  code: string;
  cartLinePersonDetailModel: ShoppingCartItemDetailsViewModel[];
}
const CIlayout2: FC<any> = ({
  cartData,
  removeCartItem,
  empCustomQtyPrice,
  availableColor,
  availableFont,
  availableLocation,
}) => {
  let mediaBaseUrl = _globalStore.blobUrl; // for server side
  const clientSideMediaBaseUrl = useTypedSelector_v2(
    (state) => state.store.mediaBaseUrl,
  );
  const { setShowLoader } = useActions_v2();
  const { showModal, fetchCartDetails } = useActions_v2();
  const valueRef = useRef<Record<string, undefined | number>>({});

  const [sizeId, setSizeId] = useState<number[]>([]);
  const { id } = useTypedSelector_v2((state) => state.user);
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );

  const [keepPersonalizing, setKeepPersonalizing] = useState<{
    show: boolean;
    index: number;
  }>({ show: false, index: 0 });

  const [personalizationArray, setPersonalizationArray] = useState<
    ShoppingCartItemDetailsViewModel[] | []
  >([]);

  const [cartLinePersonModels, setCartLinePersonModels] = useState<
    _CartLinePersonDetailModel[] | []
  >([]);
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
            fetchCartDetails({ customerId: id ? id : 0, isEmployeeLoggedIn });
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
    // console.log('PAYLOAD , sizenumber', updateCartQuantity(payload));
    const confirmRes = confirm(cartQuantityUpdateConfirmMessage);
    if (confirmRes) {
      setShowLoader(true);
      updateCartQuantity(payload)
        .then((res) => {
          if (res) {
            let size = sizeId;
            fetchCartDetails({ customerId: id ? id : 0, isEmployeeLoggedIn });
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
    }
  };

  const handleLogoUpdate = (id: number, shoppingCartId: number) => {
    const payload = {
      deletecartlogopersondetailmodel: {
        cartLogoPersonDetailId: id,
        shoppingCartItemsId: shoppingCartId,
      },
    };
    const confirmRes = confirm(cartQuantityUpdateConfirmMessage);
    if (confirmRes) {
      removeLogo(payload)
        .then((res) => {
          setShowLoader(true);
          if (res) {
            setShowLoader(false);
            fetchCartDetails({
              customerId: id ? id : 0,
              isEmployeeLoggedIn,
            });
            showModal({
              message: commonMessage.removed,
              title: __SuccessErrorText.Success,
            });
          }
        })
        .catch((err) => {
          setShowLoader(false);
          showModal({
            message: commonMessage.somethingWentWrong,
            title: commonMessage.failed,
          });
        });
    }
  };

  mediaBaseUrl = mediaBaseUrl || clientSideMediaBaseUrl;

  return (
    <ul className='overflow-hidden border border-gray-border p-[15px] md:p-[30px]'>
      {cartData &&
        cartData.map((item: CartObject, cartItemIndex: number) => {
          return (
            <li
              key={`${item.shoppingCartItemsId}_${cartItemIndex}`}
              className={`border-b border-b-gray-300 ${
                cartItemIndex === 0 ? 'pt-0' : 'pt-10'
              }`}
            >
              <div className='flex flex-wrap pb-[20px] -mx-3'>
                <div className='w-full lg:w-1/4 pl-[12px] pr-[12px] mb-[10px] max-w-[300px] mx-auto'>
                  <NxtImage
                    src={`${mediaBaseUrl}${item.colorImage}`}
                    alt="Patagonia Men's Better Sweater Jacket"
                    className='w-full'
                  />
                </div>
                <div className='w-full lg:w-3/4 pl-[12px] pr-[12px]'>
                  <div className='flex flex-wrap justify-between items-center'>
                    <div className='text-sub-text font-semibold mb-[10px]'>
                      <Link
                        href={`/${item.seName}`}
                        className='!text-anchor hover:!text-anchor-hover'
                      >
                        {item.productName}
                      </Link>
                    </div>
                    <div className='text-default-text mb-[10px]'>
                      <span className='font-semibold'>
                        Total <Price value={item.totalPrice} />
                      </span>
                    </div>
                  </div>
                  <div className='flex flex-wrap justify-between items-center mb-[20px]'>
                    <div className='text-default-text mb-[10px]'>
                      Color:{' '}
                      <span className='font-semibold'>
                        {item.attributeOptionValue}
                      </span>
                    </div>
                    <div className='text-default-text mb-[10px]'>
                      <span
                        onClick={() => removeCartItem(item.shoppingCartItemsId)}
                        className='text-default-text !text-anchor hover:!text-anchor-hover cursor-pointer text-underline'
                      >
                        {__pagesText.cart.removeItem}
                      </span>
                    </div>
                  </div>
                  <div className='w-full flex flex-wrap'>
                    <div className='w-full'>
                      <div className='text-default-text bg-light-gray border-b border[#dddddd] pt-[10px] pb-[10px] pl-[15px] pr-[15px]'>
                        REGULAR # {item.sku}
                      </div>
                      <div className=''>
                        {item.shoppingCartItemDetailsViewModels.map(
                          (view, viewIndex) => {
                            return (
                              <>
                                <div
                                  className='flex justify-between items-center pt-[5px] pb-[5px]'
                                  key={`${view.attributeOptionId}_${viewIndex}`}
                                >
                                  <div className='w-full md:w-1/3 flex flex-wrap items-center gap-2 pl-[5px] pr-[5px] mb-[10px]'>
                                    <div className='text-default-text'>
                                      Size
                                    </div>
                                    <div className='text-default-text'>
                                      {view.attributeOptionValue}
                                    </div>
                                  </div>
                                  <div className='w-full md:w-1/3 flex flex-wrap items-center gap-1 pl-[5px] pr-[5px] mb-[10px]'>
                                    <div className='text-default-text'>Qty</div>
                                    <form>
                                      <input
                                        className='text-default-text pl-[5px] pr-[5px] pt-[5px] pb-[5px] w-[60px] mr-2 rounded border-[#000000]'
                                        defaultValue={view.qty}
                                        data-valueofinput={view.qty}
                                        onChange={(e) => {
                                          valueRef.current = {
                                            ...valueRef.current,
                                            [`${view.id}`]: +e.target.value,
                                          };
                                        }}
                                        onBlur={(e) => {
                                          handleUpdate(
                                            e.target.value,
                                            view.qty,
                                            view.id,
                                          );
                                        }}
                                      />
                                      {sizeId.find((el) => el === view.id) && (
                                        <button
                                          onClick={(e) => {
                                            handleUpdateQuantity(
                                              e,
                                              +item.attributeOptionId,
                                              view.id,
                                              valueRef.current[
                                                view.id.toString()
                                              ],
                                            );
                                          }}
                                          className='btn btn-sm btn-primary'
                                        >
                                          UPDATE
                                        </button>
                                      )}
                                    </form>
                                  </div>
                                  <div className='w-full md:w-1/3 flex flex-wrap items-center justify-between gap-2 pl-[5px] pr-[5px] mb-[10px]'>
                                    <div className='text-default-text'>
                                      <Price value={view.price} />
                                    </div>
                                    <div className='text-default-text'>
                                      <span
                                        className='!text-anchor hover:!text-anchor-hover cursor-pointer'
                                        onClick={() => {
                                          handleSizeRemove(view, item);
                                        }}
                                      >
                                        {__pagesText.cart.remove}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          },
                        )}

                        {item.shoppingCartLogoPersonViewModels.map(
                          (_item, _index) => {
                            return (
                              <>
                                <div className='pl-[12px] pr-[12px] pt-[12px] pb-[12px] mb-[10px] border border-gray-border'>
                                  <div className='flex flex-wrap items-center gap-2 justify-between'>
                                    <div className='text-default-text'>
                                      Location {_item.logoLocation}
                                    </div>
                                    {item.shoppingCartLogoPersonViewModels
                                      .length > 1 ? (
                                      <div className='text-default-text'>
                                        <span
                                          className='!text-anchor hover:!text-anchor-hover cursor-pointer'
                                          onClick={() => {
                                            handleLogoUpdate(
                                              _item.id,
                                              item.shoppingCartItemsId,
                                            );
                                          }}
                                        >
                                          {__pagesText.cart.remove}
                                        </span>
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className='w-[80px] h-[80px]'>
                                    <NxtImage
                                      src={`${mediaBaseUrl}${_item.logoPositionImage}`}
                                      alt=''
                                      className='max-h-full'
                                    />
                                  </div>
                                  <div className='flex flex-wrap justify-between gap-y-2 mt-[10px]'>
                                    <div className='w-full lg:w-1/2'>
                                      <div className='mb-[4px] text-default-text'>
                                        Logo {_item.logoName}
                                      </div>
                                      <div className='text-default-text'>
                                        <span className='!text-anchor hover:!text-anchor-hover cursor-pointer'>
                                          {__pagesText.cart.remove}
                                        </span>
                                      </div>
                                    </div>
                                    <div className='w-[80px] h-[80px]'>
                                      <NxtImage
                                        src={`${mediaBaseUrl}${_item.logoPositionImage}`}
                                        alt=''
                                        className='max-h-full'
                                      />
                                    </div>
                                    <div className='flex flex-wrap justify-between gap-y-2 mt-[10px]'>
                                      <div className='w-full lg:w-1/2'>
                                        <div className='mb-[4px] text-default-text'>
                                          Logo {_item.logoName}
                                        </div>
                                        <div className='flex flex-wrap items-center gap-2'>
                                          <div className='text-default-text font-semibold'>
                                            Logo {_index + 1} :
                                          </div>
                                          <div className='w-[50px] h-[50px]'>
                                            {_item.logoImagePath !== '' ? (
                                              <NxtImage
                                                src={`${mediaBaseUrl}${_item.logoImagePath}`}
                                                className='max-h-full'
                                                alt=''
                                              />
                                            ) : (
                                              <img
                                                src={
                                                  '/assets/images/logolater.png'
                                                }
                                                className='max-h-full'
                                                alt=''
                                              />
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      <div className='w-full lg:w-1/2'>
                                        <div className='mb-1 text-default-text'>
                                          Price
                                        </div>
                                        <div className='text-default-text font-semibold'>
                                          <div className=''>
                                            ${_item.logoPrice}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
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
                <div className='mt-[20px] mb-[20px] text-center w-full pl-[12px] pr-[12px]'>
                  <span
                    className='btn btn-lg btn-secondary uppercase'
                    onClick={(e) => {
                      e.preventDefault();
                      setPersonalizationArray(
                        item.shoppingCartItemDetailsViewModels,
                      );
                      setKeepPersonalizing({
                        show: !keepPersonalizing.show,
                        index: cartItemIndex,
                      });
                    }}
                  >
                    {__pagesText.cart.personalize}
                    <br />
                    {__pagesText.cart.yourItem}
                  </span>
                </div>
                {keepPersonalizing.show &&
                  keepPersonalizing.index === cartItemIndex && (
                    <Personalizing
                      item={item}
                      setKeepPersonalizing={setKeepPersonalizing}
                      availableLocation={availableLocation}
                      availableFont={availableFont}
                      availableColor={availableColor}
                      personalizationArray={personalizationArray}
                      cartLinePersonModels={cartLinePersonModels}
                      setCartLinePersonModels={setCartLinePersonModels}
                      setPersonalizationArray={setPersonalizationArray}
                      shoppingCartItemsId={item.shoppingCartItemsId}
                    />
                  )}
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default CIlayout2;
