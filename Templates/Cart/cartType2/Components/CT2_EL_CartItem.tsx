import NxtImage from '@appComponents/reUsable/Image';
import Price from '@appComponents/reUsable/Price';
import { cartRemoveConfirmMessage } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { commonMessage } from '@constants/successError.text';
import {
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';
import {
  CartReq,
  DisplayLineAttributeOption,
  PersonalizationColor,
  PersonalizationFont,
  PersonalizationLocation,
  ShoppingCartItemDetailsViewModel,
  _CartItem,
} from '@services/cart';
import { addToCart, deleteItemCart } from '@services/cart.service';
import { _CartLinePersonDetailModel } from '@services/product.service.type';
import Personalizing from '@templates/cartItem/CartItem_Type1/Components/Personalizing';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  _SetState_Details,
  create_cartLogoPersonDetailModels,
  create_cartLogoPersonModel,
  initialSizeWithPriceNQtyGetter,
} from '../../Cart_Type1/components/CT1_EL_Extras';

interface _Props {
  availableFont: [] | PersonalizationFont[];
  availableLocation: [] | PersonalizationLocation[];
  availableColor: [] | PersonalizationColor[];
}

const CT2_EL_CartItem: React.FC<_CartItem & _Props> = (item) => {
  const { availableLocation, availableFont, availableColor, ...rest } = item;
  const { fetchCartDetails, setShowLoader, showModal } = useActions_v2();
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );
  const {
    isLinepersonalization,
    code: storeCode,
    mediaBaseUrl: clientSideMediaBaseUrl,
    isAttributeSaparateProduct,
    id: storeId,
  } = useTypedSelector_v2((state) => state.store);
  const { lastUpdate } = useTypedSelector_v2((state) => state.cart);

  const [keepPersonalizing, setKeepPersonalizing] = useState<boolean>(false);
  const [personalizationArray, setPersonalizationArray] = useState<
    ShoppingCartItemDetailsViewModel[] | []
  >([]);
  const [cartLinePersonModels, setCartLinePersonModels] = useState<
    _CartLinePersonDetailModel[] | []
  >([]);

  // Component States
  const [details, setDetails] = useState<_SetState_Details>({
    totalQty: item.totalQty,
    totalPrice: item.totalPrice,
    sizesWithPriceNQty: initialSizeWithPriceNQtyGetter(
      item.shoppingCartItemDetailsViewModels,
    ),
    updateCart: false,
    lastUpdate: new Date().getTime(),
  });
  const customer = useTypedSelector_v2((state) => state.user.customer);

  // Imported Functions
  const customerId = GetCustomerId();

  // Component Functions
  const refreshCartItems = async () => {
    await fetchCartDetails({
      customerId,
      isEmployeeLoggedIn,
    });
    setShowLoader(false);
  };

  const updateCartItems = async () => {
    setShowLoader(true);
    const payload: CartReq = {
      addToCartModel: {
        customerId: +customerId,
        productId: item.productId,
        storeId: storeId,
        isempLogin: true,
        ipAddress: '192.168.1.1',
        isForm: false,
        shoppingCartItemModel: {
          id: item.shoppingCartItemsId,
          price: details.totalPrice,
          quantity: details.totalQty,
          discountPrice: item.discountPrice,
          logoTitle: item.productName,
          logogImagePath: item.colorImage,
          isEmployeeLoginPrice: details.totalPrice,

          // Static values
          status: 2,
          weight: 0,
          productType: 0,
          perQuantity: 0,
          appQuantity: 0,
          discountPercentage: 0,
          itemNotes: item.itemNote,
          productCustomizationId: 0,
        },
        shoppingCartItemsDetailModels: [
          {
            attributeOptionId: item.attributeOptionId,
            attributeOptionName: 'color',
            attributeOptionValue: item.attributeOptionValue,
          },
        ],
        cartLogoPersonModel: create_cartLogoPersonModel({
          details: details.sizesWithPriceNQty,
        }),
        cartLogoPersonDetailModels: create_cartLogoPersonDetailModels({
          colorImagePath: item.colorImage,
          totalQtys: details.totalQty,
          details: item.shoppingCartLogoPersonViewModels,
        }),
      },
    };

    await addToCart(payload);
    await refreshCartItems();

    setDetails((prev) => ({ ...prev, updateCart: false }));
  };

  // Event Handlers
  const handleRemoveItem = async (itemId: number) => {
    const userConfirmsToDelete = confirm(cartRemoveConfirmMessage);

    if (userConfirmsToDelete) {
      setShowLoader(true);
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

  // UseEffects

  useEffect(() => {
    if (details.updateCart) {
      if (details.sizesWithPriceNQty.length === 0) {
        handleRemoveItem(item.shoppingCartItemsId);
        return;
      }

      updateCartItems();
    }
  }, [details]);

  useEffect(() => {
    if (lastUpdate > details.lastUpdate) {
      setShowLoader(false);
      setDetails({
        totalQty: item.totalQty,
        totalPrice: item.totalPrice,
        sizesWithPriceNQty: initialSizeWithPriceNQtyGetter(
          item.shoppingCartItemDetailsViewModels,
        ),
        updateCart: false,
        lastUpdate: lastUpdate,
      });
    }
  }, [lastUpdate]);

  const ProductNameHTML = (seName: string | null, name: string) => {
    if (!seName) {
      return <a className='text-[#000000]'>{name}</a>;
    }

    return (
      <Link href={`/${seName}`}>
        <span className='text-[#000000]'>{name}</span>
      </Link>
    );
  };
  return (
    <li
      key={`${item.shoppingCartItemsId}`}
      className={`border-b border-b-gray-300 pt-10`}
    >
      <div className='flex flex-wrap pb-[20px] -mx-3'>
        <div className='w-full lg:w-1/4 pl-[12px] pr-[12px] mb-[10px] max-w-[300px] mx-auto'>
          <NxtImage
            src={
              item.colorImage
                ? item.colorImage
                : '/assets/images/image_not_available.jpg'
            }
            alt={item.productName}
            className=''
            isStatic={!Boolean(item.colorImage)}
          />
        </div>
        <div className='w-full lg:w-3/4 pl-[12px] pr-[12px]'>
          <div className='flex flex-wrap justify-between items-center'>
            <div className='text-sub-text font-semibold mb-[10px]'>
              {ProductNameHTML(item.seName, item.productName)}
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
              <span className='font-semibold'>{item.attributeOptionValue}</span>
            </div>
            <div className='text-default-text mb-[10px]'>
              <span
                onClick={() => handleRemoveItem(item.shoppingCartItemsId)}
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
                        {/* <div
                          className='flex justify-between items-center pt-[5px] pb-[5px]'
                          key={`${view.attributeOptionId}_${viewIndex}`}
                        >
                          <div className='w-full md:w-1/3 flex flex-wrap items-center gap-2 pl-[5px] pr-[5px] mb-[10px]'>
                            <div className='text-default-text'>Size</div>
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
                                      valueRef.current[view.id.toString()],
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
                                  handleSizeRemove(view, props);
                                }}
                              >
                                {__pagesText.cart.remove}
                              </span>
                            </div>
                          </div>
                        </div> */}
                      </>
                    );
                  },
                )}

                {item.shoppingCartLogoPersonViewModels.map((_item, _index) => {
                  return (
                    <>
                      <div className='pl-[12px] pr-[12px] pt-[12px] pb-[12px] mb-[10px] border border-gray-border'>
                        <div className='flex flex-wrap items-center gap-2 justify-between'>
                          <div className='text-default-text'>
                            Location {_item.logoLocation}
                          </div>
                          {item.shoppingCartLogoPersonViewModels.length > 1 && (
                            <div className='text-default-text'>
                              <span
                                className='!text-anchor hover:!text-anchor-hover cursor-pointer'
                                // onClick={() => {
                                //   handleLogoUpdate(
                                //     _item.id,
                                //     item.shoppingCartItemsId,
                                //   );
                                // }}
                              >
                                {__pagesText.cart.remove}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className='w-[80px] h-[80px]'>
                          {/* <NxtImage
                            src={`${mediaBaseUrl}${_item.logoPositionImage}`}
                            alt=''
                            className='max-h-full'
                          /> */}
                          <>Logo Positin image</>
                        </div>
                        <div className='flex flex-wrap justify-between gap-y-2 mt-[10px]'>
                          <div className='w-full lg:w-1/2'>
                            <div className='mb-[4px] text-default-text'>
                              Logo {_item.logoName}
                            </div>
                            <div className='flex flex-wrap items-center gap-2'>
                              <div className='text-default-text font-semibold'>
                                Logo {_index + 1}:
                              </div>
                              <div className='w-[80px] h-[80px]'>
                                {_item.logoImagePath !== '' ? (
                                  //   <NxtImage
                                  //     src={`${mediaBaseUrl}${_item.logoImagePath}`}
                                  //     className='max-h-full'
                                  //     alt=''
                                  //   />
                                  <></>
                                ) : (
                                  <img
                                    src={'/assets/images/logolater.png'}
                                    className='max-h-full'
                                    alt=''
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                          <div className='w-full lg:w-1/2'>
                            <div className='mb-1 text-default-text'>Price</div>
                            <div className='text-default-text font-semibold'>
                              <div className=''>
                                {_item.logoPrice === 0
                                  ? 'Free'
                                  : `$${_item.logoPrice}`}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className='pl-[12px] pr-[12px] pt-[12px] pb-[12px] mb-[10px] border border-gray-border'>
                      <div className='flex flex-wrap items-center gap-2 justify-between'>
                        <div className='text-default-text'>
                          Location {_item.logoLocation}
                        </div>
                        {item.shoppingCartLogoPersonViewModels.length > 1 ? (
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
                                    src={'/assets/images/logolater.png'}
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
                                $
                                {_item.logoPrice === 0
                                  ? 'Free'
                                  : _item.logoPrice}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    </>
                  );
                })}
                {item.displayLineAttributeOptions.length > 0 && (
                  <div className='mt-10'>
                    <div className='text-normal-text border-t pt-[10px] mt-[10px] first:mt-0'>
                      <div className='font-semibold'>Personalise Text:</div>
                      <div className='flex justify-between py-1 first:pt-0 last:pb-0'>
                        <div className='font-semibold'>Font</div>
                        <div className='text-right'>
                          {
                            item.displayLineAttributeOptions[0]
                              .linePersonalizeDetails[0].font
                          }
                        </div>
                      </div>
                      <div className='flex justify-between py-1 first:pt-0 last:pb-0'>
                        <div className='font-semibold'>Color</div>
                        <div className='text-right'>
                          {
                            item.displayLineAttributeOptions[0]
                              .linePersonalizeDetails[0].color
                          }
                        </div>
                      </div>
                      <div className='flex justify-between py-1 first:pt-0 last:pb-0'>
                        <div className='font-semibold'>
                          Personalization Location
                        </div>
                        <div className='text-right'>
                          {
                            item.displayLineAttributeOptions[0]
                              .linePersonalizeDetails[0].location
                          }
                        </div>
                      </div>
                    </div>
                    {item.displayLineAttributeOptions.map(
                      (Lineitem: DisplayLineAttributeOption, index: number) => {
                        return (
                          <>
                            <div className='text-normal-text border-t pt-[10px] mt-[10px] first:mt-0'>
                              <div className='flex justify-between py-1 first:pt-0 last:pb-0'>
                                <div className='font-semibold'>Size</div>
                                <div className='text-right font-bold'>
                                  {Lineitem.attributeOptionName}
                                </div>
                              </div>
                              {Lineitem.linePersonalizeDetails.map(
                                (line: any, ind: number) => (
                                  <>
                                    <div className='flex justify-between py-1 first:pt-0 last:pb-0'>
                                      <div className='font-semibold'>
                                        Line 1
                                      </div>
                                      <div className='text-right'>
                                        {line.line1Text}
                                      </div>
                                    </div>
                                    {line.line2Text &&
                                      line.line2Text !== '' && (
                                        <div className='flex justify-between py-1 first:pt-0 last:pb-0'>
                                          <div className='font-semibold'>
                                            Line 2
                                          </div>
                                          <div className='text-right'>
                                            {line.line2Text}
                                          </div>
                                        </div>
                                      )}
                                  </>
                                ),
                              )}
                            </div>
                          </>
                        );
                      },
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* {isLinepersonalization &&
        customer?.isCustomerPersonalization &&
        item.shoppingCartLogoPersonViewModels.length >= 1 &&
        item.shoppingCartLogoPersonViewModels[0].logoName !==
          CustomizeLaterMain &&
        item.isBrandPersonalization && ( */}
        <div className='mt-[12px] lg:ml-[20px] mb-[20px] text-center p-[2px] text-sm cursor-pointer'>
          <span
            className='!w-full btn btn-sm btn-secondary uppercase text-md'
            onClick={(e) => {
              e.preventDefault();
              e.preventDefault();
              setPersonalizationArray(item.shoppingCartItemDetailsViewModels);
              setCartLinePersonModels([]);
              setKeepPersonalizing(!keepPersonalizing);
            }}
          >
            {__pagesText.cart.personalize}
            <br />
            {__pagesText.cart.yourItem}
          </span>
        </div>

        {keepPersonalizing && (
          <Personalizing
            item={{ ...rest }}
            setKeepPersonalizing={setKeepPersonalizing}
            availableLocation={item.availableLocation}
            availableFont={item.availableFont}
            availableColor={item.availableColor}
            personalizationArray={personalizationArray}
            cartLinePersonModels={cartLinePersonModels}
            setCartLinePersonModels={setCartLinePersonModels}
            setPersonalizationArray={setPersonalizationArray}
            shoppingCartItemsId={item.shoppingCartItemsId}
            earlierSelectedColor={
              item.displayLineAttributeOptions[0]
                ? item.displayLineAttributeOptions[0].linePersonalizeDetails[0]
                    .color
                : ''
            }
            earlierSelectedFont={
              item.displayLineAttributeOptions[0]
                ? item.displayLineAttributeOptions[0].linePersonalizeDetails[0]
                    .font
                : ''
            }
            earlierSelectedLocation={
              item.displayLineAttributeOptions[0]
                ? item.displayLineAttributeOptions[0].linePersonalizeDetails[0]
                    .location
                : ''
            }
          />
        )}
      </div>
    </li>
  );
};

export default CT2_EL_CartItem;
