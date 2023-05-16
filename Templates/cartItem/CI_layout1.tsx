import {
  default as Image,
  default as NxtImage,
} from '@appComponents/reUsable/Image';
import Price from '@appComponents/reUsable/Price';
import { _Store } from '@configs/page.config';
import { checkoutPages } from '@constants/enum';
import { __pagesText } from '@constants/pages.text';
import CheckoutController from '@controllers/checkoutController';
import { isNumberKey } from '@helpers/common.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { CartObject } from '@services/cart';
import Link from 'next/link';
import { FC } from 'react';
import { _globalStore } from 'store.global';
// import { CI_Props } from './cartItem';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CIlayout1: FC<any> = ({
  cartData,
  isEditable,
  removeCartItem,
  empCustomQtyPrice,
  employeeAmtChangeHandler,
  amtQtyBlurHandler,
  loadProduct,
}) => {
  const { loggedIn: empLoggedIn } = useTypedSelector_v2(
    (state) => state.employee,
  );

  let mediaBaseUrl = _globalStore.blobUrl; // for server side
  const clientSideMediaBaseUrl = useTypedSelector_v2(
    (state) => state.store.mediaBaseUrl,
  );

  const storeCode = useTypedSelector_v2((state) => state.store.code);
  mediaBaseUrl = mediaBaseUrl || clientSideMediaBaseUrl;

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
                      {empLoggedIn && (
                        <div className='text-base font-semibold w-18 text-center'>
                          Unit Price
                        </div>
                      )}
                      <div className='text-normal-text font-semibold w-20 text-right'>
                        Price
                      </div>
                    </div>
                    {item.shoppingCartItemDetailsViewModels.map(
                      (view, viewIndex) => {
                        const viewObject =
                          empCustomQtyPrice && empCustomQtyPrice[cartItemIndex]
                            ? empCustomQtyPrice[cartItemIndex][viewIndex]
                            : null;
                        return (
                          <div
                            key={view.id}
                            className='flex justify-between py-2'
                          >
                            <div className='text-normal-text w-28'>
                              {view.attributeOptionValue}
                            </div>
                            <div className='text-normal-text w-16 text-center'>
                              {empLoggedIn ? (
                                <input
                                  className='block w-full border border-gray-600 shadow-sm text-sm py-1 px-2'
                                  value={viewObject ? viewObject.qty : 0}
                                  name='qty'
                                  disabled={
                                    currentPage === checkoutPages.reviewOrder
                                      ? true
                                      : false
                                  }
                                  onChange={(event) => {
                                    if (isNumberKey(event)) {
                                      employeeAmtChangeHandler(
                                        event,
                                        viewIndex,
                                        cartItemIndex,
                                      );
                                    }
                                  }}
                                  onBlur={() =>
                                    amtQtyBlurHandler(
                                      cartItemIndex,
                                      mediaBaseUrl,
                                    )
                                  }
                                />
                              ) : (
                                view.qty
                              )}
                            </div>
                            {empLoggedIn && (
                              <div className='text-base w-16 text-center'>
                                <input
                                  className='block w-full border border-gray-600 shadow-sm text-sm py-1 px-2'
                                  value={viewObject ? viewObject.price : 0}
                                  name='price'
                                  disabled={
                                    currentPage === checkoutPages.reviewOrder
                                      ? true
                                      : false
                                  }
                                  onChange={(event) => {
                                    if (isNumberKey(event)) {
                                      employeeAmtChangeHandler(
                                        event,
                                        viewIndex,
                                        cartItemIndex,
                                      );
                                    }
                                  }}
                                  onBlur={() =>
                                    amtQtyBlurHandler(
                                      cartItemIndex,
                                      mediaBaseUrl,
                                    )
                                  }
                                />
                              </div>
                            )}
                            <div className='text-normal-text w-20 text-right'>
                              <Price value={view.price} />
                            </div>
                          </div>
                        );
                      },
                    )}
                    <div className='flex justify-between py-3 border-t border-b'>
                      <div className='text-normal-text w-30'>
                        Product Total:
                      </div>
                      <div className='text-normal-text w-16 text-center'>
                        {item.totalQty}
                      </div>
                      {empLoggedIn && (
                        <div className='text-normal-text w-16 text-center'></div>
                      )}
                      <div className='text-normal-text w-20 text-right'>
                        <Price value={item.totalPrice} />
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
                          return _item.logoName === 'Customize Later' ? (
                            <div className='flex justify-start items-center mt-3'>
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
                                    <span className='font-semibold ml-3'>
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
                {isEditable && (
                  <div className='lg:w-1/4 w-full'>
                    {!empLoggedIn && (
                      <div className='mt-[24px] lg:ml-[20px]'>
                        <button
                          data-modal-toggle='startorderModal'
                          className='btn btn-secondary !w-full !pt-[0px] !pb-[0px] text-center uppercase'
                          onClick={() => loadProduct(item)}
                        >
                          EDIT ITEM
                        </button>
                      </div>
                    )}
                    <div className='mt-[12px] lg:ml-[20px]'>
                      <button
                        onClick={() => removeCartItem(item.shoppingCartItemsId)}
                        className='btn btn-primary !w-full !pt-[0px] !pb-[0px] text-center uppercase'
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default CIlayout1;
