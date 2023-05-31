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
import { captureRemoveItemEvent } from '@controllers/cartController';
import { _ProductColor } from '@definations/APIs/colors.res';
import { _ProductDiscountTable } from '@definations/APIs/discountTable.res';
import { _ProductInventoryTransfomed } from '@definations/APIs/inventory.res';
import {
  _ProductDetails,
  _ProductDoNotExist,
} from '@definations/APIs/productDetail.res';
import {
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';
import {
  DisplayLineAttributeOption,
  PersonalizationColor,
  PersonalizationFont,
  PersonalizationLocation,
  ShoppingCartItemDetailsViewModel,
  _CartItem,
} from '@services/cart';
import {
  deleteItemCart,
  removeLogo,
  removeParticularSizeProduct,
  updateCartQuantity,
} from '@services/cart.service';
import {
  FetchColors,
  FetchDiscountTablePrices,
  FetchInventoryById,
  FetchProductById,
} from '@services/product.service';
import { _CartLinePersonDetailModel } from '@services/product.service.type';
import Personalizing from '@templates/cartItem/cartItemLayout2.tsx/components/Personalizing';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { _globalStore } from 'store.global';

let mediaBaseUrl = _globalStore.blobUrl; // for server side

type _Props = {
  availableFont: [] | PersonalizationFont[];
  availableLocation: [] | PersonalizationLocation[];
  availableColor: [] | PersonalizationColor[];
  cartItemIndex: number;
  isEditable: boolean;
};

const CL2_Item: React.FC<_CartItem & _Props> = (props) => {
  const {
    setColor,
    showModal,
    setShowLoader,
    fetchCartDetails,
    product_setValues,
    product_storeData,
    updateCheckoutObject,
    store_productDetails,
  } = useActions_v2();
  const cartData = useTypedSelector_v2((state) => state.cart.cart);

  // Global State

  const {
    isLinepersonalization,
    mediaBaseUrl: clientSideMediaBaseUrl,
    isAttributeSaparateProduct,
    id: storeId,
  } = useTypedSelector_v2((state) => state.store);

  const valueRef = useRef<Record<string, undefined | number>>({});

  const [sizeId, setSizeId] = useState<number[]>([]);
  const { id } = useTypedSelector_v2((state) => state.user);
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );
  const isUserLoggedIn = useTypedSelector_v2((state) => !!state.user.id);
  mediaBaseUrl = mediaBaseUrl || clientSideMediaBaseUrl;

  // Local State
  const [productForSOM, setProductForSOM] = useState<_ProductDetails | null>(
    null,
  );
  const [keepPersonalizing, setKeepPersonalizing] = useState<boolean>(false);
  const [personalizationArray, setPersonalizationArray] = useState<
    ShoppingCartItemDetailsViewModel[] | []
  >([]);
  const [cartLinePersonModels, setCartLinePersonModels] = useState<
    _CartLinePersonDetailModel[] | []
  >([]);

  const customer = useTypedSelector_v2((state) => state.user.customer);

  // Imported Functions
  const customerId = GetCustomerId();

  const refreshCartItems = async () => {
    await fetchCartDetails({
      customerId,
      isEmployeeLoggedIn,
    });
    setShowLoader(false);
  };

  const updateCartSlice = (product: _CartItem) => {
    const obj = {
      totalQty: product.totalQty,
      sizeQtys: product.shoppingCartItemDetailsViewModels.map((res) => ({
        attributeOptionId: res.attributeOptionId,
        size: res.attributeOptionValue,
        qty: res.qty,
        price: res.price,
      })),
      totalPrice: product.totalPrice,
    };

    updateCheckoutObject(obj);
  };

  const updateProductSlice = (
    product: _ProductDetails,
    colors: _ProductColor[],
  ) => {
    store_productDetails({
      brand: {
        id: product.brandID,
        name: product.brandName,
        url: product.brandColorLogoUrl,
        url2: product.brandImage,
        url3: product.productBrandLogo,
        brandSEname: product.brandSEname,
      },
      product: {
        id: product.id,
        name: product.name,
        sizes: product.sizes,
        sizeChart: null,
        colors: colors,
        customization: product.isEnableLogolocation,
        price: {
          msrp: product.msrp,
          ourCost: product.ourCost,
          salePrice: product.salePrice,
        },
      },
    });
  };

  console.log(props.shoppingCartLogoPersonViewModels);

  const fetchProductDetails = async ({
    seName,
    productId,
    unitPrice,
    colorAttributeOptionId,
  }: {
    seName: string;
    unitPrice: number;
    productId: number;
    colorAttributeOptionId: string;
  }) => {
    let product: _ProductDetails | _ProductDoNotExist | null = null;
    let inventory: _ProductInventoryTransfomed | null = null;
    let colors: _ProductColor[] | null = null;
    let discountTable: _ProductDiscountTable | null = null;

    product_setValues({
      type: 'PRICE_ON_EDIT',
      data: { unitPrice: unitPrice },
    });

    await Promise.allSettled([
      FetchProductById({
        seName: seName,
        storeId: storeId,
        productId: 0, // Not required when fetched by seName
      }),
      FetchInventoryById({
        productId: productId,
        attributeOptionId: [+colorAttributeOptionId],
      }),
      FetchColors({
        productId: productId,
        storeId: storeId,
        isAttributeSaparateProduct: isAttributeSaparateProduct,
      }),
      FetchDiscountTablePrices({
        storeId: storeId,
        seName: seName,
        customerId: +customerId,
        attributeOptionId: +colorAttributeOptionId,
      }),
    ])
      .then((values) => {
        product = values[0].status === 'fulfilled' ? values[0].value : null;
        inventory = values[1].status === 'fulfilled' ? values[1].value : null;
        colors = values[2].status === 'fulfilled' ? values[2].value : null;
        discountTable =
          values[3].status === 'fulfilled' ? values[3].value : null;

        if (isUserLoggedIn && discountTable) {
          // Discount table should be updated before updating product details.
          product_storeData({
            type: 'DISOCUNT_TABLE_PRICES',
            data: discountTable,
          });
        }

        if (product && product.id && colors) {
          updateProductSlice(product, colors);
          setProductForSOM(product);
        }

        if (inventory) {
          product_storeData({
            type: 'INVENTORY_LIST',
            data: inventory,
          });
        }

        if (colors) {
          //  selected color
          setColor(colors[0]);
        }
      })
      .catch(() =>
        showModal({
          message: __SuccessErrorText.SomethingWentWrong,
          title: 'error',
        }),
      );
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
      if (props.shoppingCartItemDetailsViewModels.length === 1) {
        return handleRemoveItem(props.shoppingCartItemsId);
      }
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

  const handleLogoUpdate = (itemId: number, shoppingCartId: number) => {
    const payload = {
      deletecartlogopersondetailmodel: {
        cartLogoPersonDetailId: itemId,
        shoppingCartItemsId: shoppingCartId,
      },
    };
    const confirmRes = confirm(cartQuantityUpdateConfirmMessage);
    if (confirmRes) {
      removeLogo(payload)
        .then((res) => {
          setShowLoader(true);
          if (res) {
            fetchCartDetails({ customerId: id ? id : 0, isEmployeeLoggedIn });
            showModal({
              message: commonMessage.removed,
              title: __SuccessErrorText.Success,
            });
            setShowLoader(false);
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

  return (
    <li
      key={`${props.shoppingCartItemsId}`}
      className={`border-b border-b-gray-300 pt-10`}
    >
      <div className='flex flex-wrap pb-[20px] -mx-3'>
        <div className='w-full lg:w-1/4 pl-[12px] pr-[12px] mb-[10px] max-w-[300px] mx-auto'>
          <NxtImage
            src={`${mediaBaseUrl}${props.colorImage}`}
            alt="Patagonia Men's Better Sweater Jacket"
            className='w-full'
          />
        </div>
        <div className='w-full lg:w-3/4 pl-[12px] pr-[12px]'>
          <div className='flex flex-wrap justify-between items-center'>
            <div className='text-sub-text font-semibold mb-[10px]'>
              <Link
                href={`/${props.seName}`}
                className='!text-anchor hover:!text-anchor-hover'
              >
                {props.productName}
              </Link>
            </div>
            <div className='text-default-text mb-[10px]'>
              <span className='font-semibold'>
                Total <Price value={props.totalPrice} />
              </span>
            </div>
          </div>
          <div className='flex flex-wrap justify-between items-center mb-[20px]'>
            <div className='text-default-text mb-[10px]'>
              Color:{' '}
              <span className='font-semibold'>
                {props.attributeOptionValue}
              </span>
            </div>
            <div className='text-default-text mb-[10px]'>
              <span
                onClick={() => handleRemoveItem(props.shoppingCartItemsId)}
                className='text-default-text !text-anchor hover:!text-anchor-hover cursor-pointer text-underline'
              >
                {__pagesText.cart.removeItem}
              </span>
            </div>
          </div>
          <div className='w-full flex flex-wrap'>
            <div className='w-full'>
              <div className='text-default-text bg-light-gray border-b border[#dddddd] pt-[10px] pb-[10px] pl-[15px] pr-[15px]'>
                REGULAR # {props.sku}
              </div>
              <div className=''>
                {props.shoppingCartItemDetailsViewModels.map(
                  (view, viewIndex) => {
                    return (
                      <>
                        <div
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
                                      +props.attributeOptionId,
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
                        </div>
                      </>
                    );
                  },
                )}

                {props.shoppingCartLogoPersonViewModels.map((_item, _index) => {
                  console.log(_item, 'this is item');
                  return (
                    <>
                      <div className='pl-[12px] pr-[12px] pt-[12px] pb-[12px] mb-[10px] border border-gray-border'>
                        <div className='flex flex-wrap items-center gap-2 justify-between'>
                          <div className='text-default-text'>
                            Location {_item.logoLocation}
                          </div>
                          {props.shoppingCartLogoPersonViewModels.length >
                            1 && (
                            <div className='text-default-text'>
                              <span
                                className='!text-anchor hover:!text-anchor-hover cursor-pointer'
                                onClick={() => {
                                  handleLogoUpdate(
                                    _item.id,
                                    props.shoppingCartItemsId,
                                  );
                                }}
                              >
                                {__pagesText.cart.remove}
                              </span>
                            </div>
                          )}
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
                                Logo {_index + 1}:
                              </div>
                              <div className='w-[80px] h-[80px]'>
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
                            <div className='mb-1 text-default-text'>Price</div>
                            <div className='text-default-text font-semibold'>
                              {_item.logoPrice === 0 ? (
                                <>
                                  <div className=''>$0.00</div>
                                  <div className=''>First Logo Free</div>
                                </>
                              ) : (
                                <div className=''>${_item.logoPrice}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className='pl-[12px] pr-[12px] pt-[12px] pb-[12px] mb-[10px] border border-gray-border'>
                        <div className='flex flex-wrap items-center gap-2 justify-between'>
                          <div className='text-default-text'>
                            Location {_item.logoLocation}
                          </div>
                          {props.shoppingCartLogoPersonViewModels.length > 1 ? (
                            <div className='text-default-text'>
                              <span
                                className='!text-anchor hover:!text-anchor-hover cursor-pointer'
                                onClick={() => {
                                  handleLogoUpdate(
                                    _item.id,
                                    props.shoppingCartItemsId,
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
                {props.displayLineAttributeOptions.length > 0 && (
                  <div className='mt-10'>
                    <div className='text-normal-text border-t pt-[10px] mt-[10px] first:mt-0'>
                      <div className='font-semibold'>Personalise Text:</div>
                      <div className='flex justify-between py-1 first:pt-0 last:pb-0'>
                        <div className='font-semibold'>Font</div>
                        <div className='text-right'>
                          {
                            props.displayLineAttributeOptions[0]
                              .linePersonalizeDetails[0].font
                          }
                        </div>
                      </div>
                      <div className='flex justify-between py-1 first:pt-0 last:pb-0'>
                        <div className='font-semibold'>Color</div>
                        <div className='text-right'>
                          {
                            props.displayLineAttributeOptions[0]
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
                            props.displayLineAttributeOptions[0]
                              .linePersonalizeDetails[0].location
                          }
                        </div>
                      </div>
                    </div>
                    {props.displayLineAttributeOptions.map(
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
          props.shoppingCartLogoPersonViewModels.length >= 1 &&
          props.shoppingCartLogoPersonViewModels[0].logoName !==
            CustomizeLaterMain &&
          props.isBrandPersonalization && ( */}
        <div className='mt-[12px] lg:ml-[20px] mb-[20px] text-center p-[2px] text-sm cursor-pointer'>
          <span
            className='!w-full btn btn-sm btn-secondary uppercase text-md'
            onClick={(e) => {
              e.preventDefault();
              e.preventDefault();
              setPersonalizationArray(props.shoppingCartItemDetailsViewModels);
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
            item={props}
            setKeepPersonalizing={setKeepPersonalizing}
            availableLocation={props.availableLocation}
            availableFont={props.availableFont}
            availableColor={props.availableColor}
            personalizationArray={personalizationArray}
            cartLinePersonModels={cartLinePersonModels}
            setCartLinePersonModels={setCartLinePersonModels}
            setPersonalizationArray={setPersonalizationArray}
            shoppingCartItemsId={props.shoppingCartItemsId}
            earlierSelectedColor={
              props.displayLineAttributeOptions[0]
                ? props.displayLineAttributeOptions[0].linePersonalizeDetails[0]
                    .color
                : ''
            }
            earlierSelectedFont={
              props.displayLineAttributeOptions[0]
                ? props.displayLineAttributeOptions[0].linePersonalizeDetails[0]
                    .font
                : ''
            }
            earlierSelectedLocation={
              props.displayLineAttributeOptions[0]
                ? props.displayLineAttributeOptions[0].linePersonalizeDetails[0]
                    .location
                : ''
            }
          />
        )}
      </div>
    </li>
  );
};

export default CL2_Item;
