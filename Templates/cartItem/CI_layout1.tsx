import {
  default as Image,
  default as NxtImage,
} from '@appComponents/reUsable/Image';
import Price from '@appComponents/reUsable/Price';
import { _Store } from '@configs/page.config';
import { CustomizeLaterMain } from '@constants/common.constant';
import { __pagesText } from '@constants/pages.text';
import CheckoutController from '@controllers/checkoutController';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import {
  CartObject,
  ShoppingCartItemDetailsViewModel,
  displayLineAtrributeOptions,
} from '@services/cart';
import { _CartLinePersonDetailModel } from '@services/product.service.type';
import Link from 'next/link';
import { FC, useState } from 'react';
import { _globalStore } from 'store.global';
import Personalizing from './cartItemLayout2.tsx/components/Personalizing';
// import { CI_Props } from './cartItem';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CIlayout1: FC<any> = ({
  cartData,
  isEditable,
  removeCartItem,
  loadProduct,
  availableFont,
  availableLocation,
  availableColor,
}) => {
  const { isLinepersonalization } = useTypedSelector_v2((state) => state.store);
  const { setShowLoader } = useActions_v2();

  let mediaBaseUrl = _globalStore.blobUrl; // for server side
  const clientSideMediaBaseUrl = useTypedSelector_v2(
    (state) => state.store.mediaBaseUrl,
  );

  const storeCode = useTypedSelector_v2((state) => state.store.code);
  mediaBaseUrl = mediaBaseUrl || clientSideMediaBaseUrl;

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

  const customer = useTypedSelector_v2((state) => state.user.customer);
  // const linesAvailable = (item: any) => {
  //   let show = false;
  //   item.forEach((lineModel: any) => {
  //     if (lineModel.linePersonalizeDetails.length > 0) {
  //       show = true;
  //       return;
  //     }
  //   });
  //   return show;
  // };

  const { currentPage } = CheckoutController();

  return (
    <ul role='list' className='overflow-hidden'>
      {cartData &&
        cartData.map((item: CartObject, cartItemIndex: number) => (
          <li
            key={`${item.attributeOptionId}${cartItemIndex}`}
            className='flex flex-wrap pl-[20px] pr-[20px] ml-[-15px] mr-[-15px] mb-[40px]'
          >
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
                <Link href={`/${item.seName}`} className='text-[#000000]'>
                  {item.productName}
                </Link>
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
                      <Price value={item.totalPrice} />
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
                    {item.shoppingCartItemDetailsViewModels.map((view) => {
                      return (
                        <div
                          key={view.id}
                          className='flex justify-between py-2'
                        >
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
                      <div className='text-normal-text w-30'>
                        Product Total:
                      </div>
                      <div className='text-normal-text w-16 text-center'>
                        {item.totalQty}
                      </div>
                      <div className='text-normal-text w-20 text-right'>
                        <Price value={item.productTotal} />
                      </div>
                    </div>

                    {item.itemNote && (
                      <div className='flex  py-3 border-t border-b'>
                        <div className='text-normal-text w-30 font-bold'>
                          Item Note:
                        </div>
                        <div className='text-normal-text px-3  text-center'>
                          {item.itemNote}
                        </div>
                      </div>
                    )}

                    {storeCode !== _Store.type4 &&
                      item.shoppingCartLogoPersonViewModels.map(
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
                    {/* {item.shoppingCartItemDetailsViewModels.map(
                      (_item, index) => (
                        <>
                          <div className='w-full flex justify-between'>
                            <span className='font-bold'>Size:</span>
                            <span className='font-bold'>
                              {_item.attributeOptionValue}
                            </span>
                          </div>
                          {_item.shoppingCartLineOnePersonViewModel.map(
                            (line, ind) => {
                              if (line.linetext !== '') {
                                return (
                                  <>
                                    <div className='w-full flex justify-between'>
                                      <span className='font-bold'>Line1</span>
                                      <span>{line.linetext}</span>
                                    </div>

                                    {item.shoppingCartItemDetailsViewModels[
                                      index
                                    ].shoppingCartLineTwoPersonViewModel[ind]
                                      .linetext !== '' && (
                                      <div className='w-full flex justify-between'>
                                        <span className='font-bold'>Line2</span>
                                        <span>
                                          {
                                            item
                                              .shoppingCartItemDetailsViewModels[
                                              index
                                            ]
                                              .shoppingCartLineTwoPersonViewModel[
                                              ind
                                            ].linetext
                                          }
                                        </span>
                                      </div>
                                    )}
                                  </>
                                );
                              }
                            },
                          )}
                          <hr />
                        </>
                      ),
                    )} */}
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
                          (
                            Lineitem: displayLineAtrributeOptions,
                            index: number,
                          ) => {
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
                {isEditable && (
                  <div className='lg:w-1/4 w-full'>
                    <div className='mt-[24px] lg:ml-[20px]'>
                      <button
                        data-modal-toggle='startorderModal'
                        className='btn btn-secondary !w-full !pt-[0px] !pb-[0px] text-center uppercase'
                        onClick={() => {
                          setShowLoader(true);
                          loadProduct(item);
                        }}
                      >
                        EDIT ITEM
                      </button>
                    </div>
                    <div className='mt-[12px] lg:ml-[20px]'>
                      <button
                        onClick={() => removeCartItem(item.shoppingCartItemsId)}
                        className='btn btn-primary !w-full !pt-[0px] !pb-[0px] text-center uppercase'
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
                      )}
                  </div>
                )}
              </div>
            </div>
            {keepPersonalizing.show &&
              keepPersonalizing.index === cartItemIndex && (
                <Personalizing
                  item={item}
                  setKeepPersonalizing={setKeepPersonalizing}
                  availableLocation={availableLocation}
                  availableFont={availableFont}
                  availableColor={availableColor}
                  earlierSelectedLocation={
                    item.displayLineAttributeOptions.length > 0
                      ? item.displayLineAttributeOptions[0]
                          .linePersonalizeDetails[0].location
                      : ''
                  }
                  earlierSelectedFont={
                    item.displayLineAttributeOptions.length > 0
                      ? item.displayLineAttributeOptions[0]
                          .linePersonalizeDetails[0].font
                      : ''
                  }
                  earlierSelectedColor={
                    item.displayLineAttributeOptions.length > 0
                      ? item.displayLineAttributeOptions[0]
                          .linePersonalizeDetails[0].color
                      : ''
                  }
                  personalizationArray={personalizationArray}
                  cartLinePersonModels={cartLinePersonModels}
                  setCartLinePersonModels={setCartLinePersonModels}
                  setPersonalizationArray={setPersonalizationArray}
                  shoppingCartItemsId={item.shoppingCartItemsId}
                />
              )}
          </li>
        ))}
    </ul>
  );
};

export default CIlayout1;
