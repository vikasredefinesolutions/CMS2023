import NxtImage, { default as Image } from '@appComponents/reUsable/Image';
import Price from '@appComponents/reUsable/Price';
import { CustomizeLaterMain } from '@constants/common.constant';
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
} from './CT1_EL_Extras';
import CT1_EL_SizeQtyPrice from './CT1_EL_SizeQtyPrice';

interface _Props {
  availableFont: [] | PersonalizationFont[];
  availableLocation: [] | PersonalizationLocation[];
  availableColor: [] | PersonalizationColor[];
}

const CT1_EL_Item: React.FC<_CartItem & _Props> = (item) => {
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
    <li className='flex flex-wrap pl-[20px] pr-[20px] ml-[-15px] mr-[-15px] mb-[40px]'>
      <div className='w-full lg:w-2/6 pl-[15px] pr-[15px]'>
        <div className='w-full'>
          <Image
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
      </div>
      <div className='w-full lg:w-4/6 pl-[0px] pr-[0px] flex flex-wrap lg:justify-between'>
        <div className='text-title-text font-semibold mb-[10px]'>
          {ProductNameHTML(item.seName, item.productName)}
        </div>
        <div className='w-full flex flex-wrap mt-[5px]'>
          <div className='lg:w-2/3 w-full'>
            <div className='flex justify-between'>
              <div className='text-medium-text'>
                <span className='font-semibold'>SKU :</span>
                {item.sku}
              </div>
            </div>
            <div className='mt-[4px] flex'>
              <div className='text-medium-text'>
                <span className='font-semibold'>Color :</span>
                {item.attributeOptionValue}
              </div>
            </div>
          </div>
          <div className='lg:w-1/3 w-full'>
            <div className='font-[600] text-normal-text text-right'>
              <span className=''>Item Total:</span>
              <span className='pt-[4px] block'>
                <Price value={details.totalPrice} />
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
                <div className='text-normal-text font-semibold w-16'>Size</div>
                <div className='text-normal-text font-semibold w-20 text-center'>
                  Qty
                </div>
                <div className='text-normal-text font-semibold w-20 text-center'>
                  Unit Price
                </div>
                <div className='text-normal-text font-semibold w-20 text-right'>
                  Price
                </div>
              </div>
              {details.sizesWithPriceNQty.map((view, viewIndex) => {
                return (
                  <CT1_EL_SizeQtyPrice
                    key={viewIndex}
                    details={view}
                    setDetails={setDetails}
                  />
                );
              })}
              <div className='flex justify-between py-3 border-t border-b'>
                <div className='text-normal-text w-30'>Product Total:</div>
                <div className='text-normal-text w-16 text-center'>
                  {details.totalQty}
                </div>
                <div className='text-normal-text w-16 text-center'></div>
                <div className='text-normal-text w-20 text-right'>
                  <Price value={details.totalPrice} />
                </div>
              </div>
              {item.shoppingCartLogoPersonViewModels.map((logo, index) => {
                if (logo.logoName === 'Customize Later') {
                  return (
                    <div
                      key={index}
                      className='flex justify-start items-center mt-3'
                    >
                      <div>
                        <span className='material-icons text-[60px] mr-3'>
                          support_agent
                        </span>
                      </div>
                      <div>
                        <div className='text-lg font-semibold'>
                          Customize Later
                        </div>
                        <div className='text-base'>
                          {__pagesText.CustomizeLater}
                        </div>
                      </div>
                    </div>
                  );
                }

                if (logo.logoName) {
                  return (
                    <div
                      key={`${logo}-${index}`}
                      className='flex justify-between py-3'
                    >
                      <div className='text-base'>
                        <div className='mb-3 flex'>
                          {logo.logoImagePath === '' ? (
                            <NxtImage
                              className='w-14 h-12'
                              src='/assets/images/logo-to-be-submitted.webp'
                              title=''
                              alt={logo.logoImagePath}
                              isStatic={true}
                            />
                          ) : (
                            <NxtImage
                              className='w-14 h-12'
                              src={logo.logoImagePath}
                              title=''
                              alt={logo.logoImagePath}
                            />
                          )}

                          {logo.logoName === 'Add Logo Later' ? (
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
                          <span className='font-semibold mr-1'>Location:</span>
                          <span>{logo.logoLocation}</span>
                        </div>
                      </div>
                      <div className='text-base text-right'>
                        <div className='font-semibold'>Logo Price</div>
                        <div>
                          {index === 0 && logo.logoPrice === 0 ? (
                            'First Logo Free'
                          ) : (
                            <Price value={logo.logoPrice} />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </div>
          <div className='lg:w-1/4 w-full'>
            <div className='mt-[12px] lg:ml-[20px]'>
              <button
                onClick={() => handleRemoveItem(item.shoppingCartItemsId)}
                className='btn btn-primary !w-full  text-center uppercase'
              >
                Remove
              </button>
            </div>
            {isLinepersonalization &&
              customer?.isCustomerPersonalization &&
              item.shoppingCartLogoPersonViewModels.length >= 1 &&
              item.shoppingCartLogoPersonViewModels[0].logoName !==
                CustomizeLaterMain &&
              item.isBrandPersonalization && (
                <div className='mt-[12px] lg:ml-[20px] mb-[20px] text-center p-[2px] text-sm cursor-pointer'>
                  <span
                    className='!w-full btn btn-sm btn-secondary uppercase text-md'
                    onClick={(e) => {
                      e.preventDefault();
                      setPersonalizationArray(
                        item.shoppingCartItemDetailsViewModels,
                      );
                      setCartLinePersonModels([]);
                      setKeepPersonalizing(!keepPersonalizing);
                    }}
                  >
                    {__pagesText.cart.personalize}
                    <br />
                    {__pagesText.cart.yourItem}
                  </span>
                </div>
              )}
          </div>
        </div>
      </div>

      {keepPersonalizing && (
        <Personalizing
          item={{ ...rest }}
          setKeepPersonalizing={setKeepPersonalizing}
          availableLocation={availableLocation}
          availableFont={availableFont}
          availableColor={availableColor}
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
    </li>
  );
};

export default CT1_EL_Item;
