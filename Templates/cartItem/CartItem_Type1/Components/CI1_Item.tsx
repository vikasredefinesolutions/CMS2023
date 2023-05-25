import StartOrderModal from '@appComponents/modals/startOrderModal/StartOrderModal';
import {
  default as Image,
  default as NxtImage,
} from '@appComponents/reUsable/Image';
import Price from '@appComponents/reUsable/Price';
import { _Store } from '@configs/page.config';
import { CustomizeLaterMain } from '@constants/common.constant';
import { cartRemoveConfirmMessage } from '@constants/global.constant';
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
  PersonalizationColor,
  PersonalizationFont,
  PersonalizationLocation,
  ShoppingCartItemDetailsViewModel,
  _CartItem,
} from '@services/cart';
import { deleteItemCart } from '@services/cart.service';
import {
  FetchColors,
  FetchDiscountTablePrices,
  FetchInventoryById,
  FetchProductById,
} from '@services/product.service';
import { _CartLinePersonDetailModel } from '@services/product.service.type';
import Personalizing from '@templates/cartItem/cartItemLayout2.tsx/components/Personalizing';
import Link from 'next/link';
import { useState } from 'react';
import { _globalStore } from 'store.global';

let mediaBaseUrl = _globalStore.blobUrl; // for server side

type _Props = {
  availableFont: [] | PersonalizationFont[];
  availableLocation: [] | PersonalizationLocation[];
  availableColor: [] | PersonalizationColor[];
  cartItemIndex: number;
  isEditable: boolean;
};

const CI1_Item: React.FC<_CartItem & _Props> = (props) => {
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
    code: storeCode,
    mediaBaseUrl: clientSideMediaBaseUrl,
    isAttributeSaparateProduct,
    id: storeId,
  } = useTypedSelector_v2((state) => state.store);
  const isUserLoggedIn = useTypedSelector_v2((state) => !!state.user.id);
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );
  mediaBaseUrl = mediaBaseUrl || clientSideMediaBaseUrl;

  // Local State
  const [productForSOM, setProductForSOM] = useState<_ProductDetails | null>(
    null,
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

  const handleEditItem = async (item: _CartItem) => {
    setShowLoader(true);
    updateCartSlice(item);

    await fetchProductDetails({
      seName: item.seName,
      productId: item.productId,
      unitPrice: item.totalPrice / item.totalQty,
      colorAttributeOptionId: item.attributeOptionId,
    });
  };

  const handleRemoveItem = async (itemId: number) => {
    const userConfirmsToDelete = confirm(cartRemoveConfirmMessage);

    if (userConfirmsToDelete) {
      setShowLoader(true);
      captureRemoveItemEvent(cartData!, itemId, false);
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
    <>
      <li className='flex flex-wrap pl-[20px] pr-[20px] ml-[-15px] mr-[-15px] mb-[40px]'>
        <div className='w-full lg:w-2/6 pl-[15px] pr-[15px]'>
          <div className='w-full'>
            <Image
              src={
                props.colorImage
                  ? props.colorImage
                  : '/assets/images/image_not_available.jpg'
              }
              alt={props.productName}
              className=''
              isStatic={!Boolean(props.colorImage)}
            />
          </div>
        </div>
        <div className='w-full lg:w-4/6 pl-[0px] pr-[0px] flex flex-wrap lg:justify-between'>
          <div className='text-title-text font-semibold mb-[10px]'>
            <Link href={`/${props.seName}`} className='text-[#000000]'>
              {props.productName}
            </Link>
          </div>
          <div className='w-full flex flex-wrap mt-[5px]'>
            <div className='lg:w-2/3 w-full'>
              <div className='flex justify-between'>
                <div className='text-medium-text'>
                  <span className='font-semibold'>SKU :</span>
                  {props.sku}
                </div>
              </div>
              <div className='mt-[4px] flex'>
                <div className='text-medium-text'>
                  <span className='font-semibold'>Color :</span>
                  {props.attributeOptionValue}
                </div>
              </div>
            </div>
            <div className='lg:w-1/3 w-full'>
              <div className='font-[600] text-normal-text text-right'>
                <span className=''>Item Total:</span>
                <span className='pt-[4px] block'>
                  <Price value={props.totalPrice} />
                </span>
              </div>
            </div>
          </div>
          <div className='w-full flex flex-wrap'>
            <div className='lg:w-3/4 w-full'>
              <div className='mt-[30px]'>
                <div className='text-normal-text font-semibold border-b pb-[8px] mb-[5px]'>
                  Item Details
                </div>
                <div className='flex justify-between py-2'>
                  <div className='text-normal-text font-semibold w-28'>
                    Size
                  </div>
                  <div className='text-normal-text font-semibold w-16 text-center'>
                    Qty
                  </div>
                  <div className='text-normal-text font-semibold w-20 text-right'>
                    Price
                  </div>
                </div>
                {props.shoppingCartItemDetailsViewModels.map((view) => {
                  return (
                    <div key={view.id} className='flex justify-between py-2'>
                      <div className='text-normal-text w-28'>
                        {view.attributeOptionValue}
                      </div>
                      <div className='text-normal-text w-16 text-center'>
                        {view.qty}
                      </div>
                      <div className='text-normal-text w-20 text-right'>
                        <Price value={view.price} />
                      </div>
                    </div>
                  );
                })}
                <div className='flex justify-between py-3 border-t border-b'>
                  <div className='text-normal-text w-30'>Product Total:</div>
                  <div className='text-normal-text w-16 text-center'>
                    {props.totalQty}
                  </div>
                  <div className='text-normal-text w-20 text-right'>
                    <Price value={props.productTotal} />
                  </div>
                </div>

                {props.itemNote && (
                  <div className='flex  py-3 border-t border-b'>
                    <div className='text-normal-text w-30 font-bold'>
                      Item Note:
                    </div>
                    <div className='text-normal-text px-3  text-center'>
                      {props.itemNote}
                    </div>
                  </div>
                )}

                {storeCode !== _Store.type4 &&
                  props.shoppingCartLogoPersonViewModels.map(
                    (_item, _index) => {
                      return _item.logoName === CustomizeLaterMain ? (
                        <div className='flex justify-start items-center mt-3'>
                          <div>
                            <span className='material-icons text-[60px] mr-3'>
                              support_agent
                            </span>
                          </div>
                          <div>
                            <div className='text-lg font-semibold'>
                              {CustomizeLaterMain}
                            </div>
                            <div className='text-base'>
                              {__pagesText.CustomizeLater}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          key={`${_item}-${_index}`}
                          className='flex justify-between py-3'
                        >
                          <div className='text-base'>
                            <div className='mb-3 flex'>
                              {_item.logoImagePath === '' ? (
                                <NxtImage
                                  className='w-14 h-12'
                                  src='/assets/images/logo-to-be-submitted.webp'
                                  title=''
                                  alt={_item.logoImagePath}
                                  isStatic={true}
                                />
                              ) : (
                                <NxtImage
                                  className='w-14 h-12'
                                  src={_item.logoImagePath}
                                  title=''
                                  alt={_item.logoImagePath}
                                />
                              )}

                              {_item.logoName === 'Add Logo Later' ? (
                                <span className='font-semibold ml-3'>
                                  Logo to be
                                  <br />
                                  submitted
                                </span>
                              ) : (
                                <span className='font-semibold ml-3 invisible'>
                                  Logo
                                  <br />
                                  submitted
                                </span>
                              )}
                            </div>
                            <div>
                              <span className='font-semibold mr-1'>
                                Location:
                              </span>
                              <span>{_item.logoLocation}</span>
                            </div>
                          </div>
                          <div className='text-base text-right'>
                            <div className='font-semibold'>Logo Price</div>
                            <div>
                              {_index === 0 && _item.logoPrice === 0 ? (
                                'First Logo Free'
                              ) : (
                                <Price value={_item.logoPrice} />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    },
                  )}
              </div>
            </div>
            {props.isEditable && (
              <div className='lg:w-1/4 w-full'>
                <div className='mt-[24px] lg:ml-[20px]'>
                  <button
                    data-modal-toggle='startorderModal'
                    className='btn btn-secondary !w-full !pt-[0px] !pb-[0px] text-center uppercase'
                    onClick={() => handleEditItem(props)}
                  >
                    EDIT ITEM
                  </button>
                </div>
                <div className='mt-[12px] lg:ml-[20px]'>
                  <button
                    onClick={() => handleRemoveItem(props.shoppingCartItemsId)}
                    className='btn btn-primary !w-full !pt-[0px] !pb-[0px] text-center uppercase'
                  >
                    Remove
                  </button>
                </div>
                {isLinepersonalization && (
                  <div className='mt-[12px] lg:ml-[20px] mb-[20px] text-center p-[2px] text-sm cursor-pointer'>
                    <span
                      className='!w-full btn btn-sm btn-secondary uppercase text-md'
                      onClick={(e) => {
                        e.preventDefault();
                        setPersonalizationArray(
                          props.shoppingCartItemDetailsViewModels,
                        );
                        setKeepPersonalizing({
                          show: !keepPersonalizing.show,
                          index: props.cartItemIndex,
                        });
                      }}
                    >
                      {__pagesText.cart.personalize}
                      <br />
                      {__pagesText.cart.yourItem}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {keepPersonalizing.show &&
          keepPersonalizing.index === props.cartItemIndex && (
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
            />
          )}
      </li>

      {productForSOM && (
        <StartOrderModal
          modalHandler={() => setProductForSOM(null)}
          product={productForSOM}
          edit={props}
        />
      )}
    </>
  );
};

export default CI1_Item;
