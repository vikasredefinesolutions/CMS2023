import { default as NxtImage } from '@appComponents/reUsable/Image';
import Price from '@appComponents/reUsable/Price';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { CartObject } from '@services/cart';
import Link from 'next/link';
import { FC } from 'react';
import { _globalStore } from 'store.global';
// import { CI_Props } from './cartItem';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CIlayout2: FC<any> = ({
  cartData,
  isEditable,
  removeCartItem,
  empCustomQtyPrice,
  employeeAmtChangeHandler,
  amtQtyBlurHandler,
  loadProduct,
}) => {
  let mediaBaseUrl = _globalStore.blobUrl; // for server side
  const clientSideMediaBaseUrl = useTypedSelector_v2(
    (state) => state.store.mediaBaseUrl,
  );
  mediaBaseUrl = mediaBaseUrl || clientSideMediaBaseUrl;

  return (
    <ul
      role='list'
      className='overflow-hidden border border-gray-border p-[15px] md:p-[30px]'
    >
      {cartData &&
        cartData.map((item: CartObject, cartItemIndex: number) => (
          <li
            key={item.attributeOptionId}
            className={`border-b border-b-gray-300 ${
              cartItemIndex === 0 ? 'pt-0' : 'pt-10'
            }`}
          >
            <div className='flex flex-wrap pb-[20px] -mx-3'>
              <div className='w-full lg:w-1/4 pl-[12px] pr-[12px] mb-[10px] max-w-[300px] mx-auto'>
                <Link
                  href={`/${item.seName}`}
                  title={item.productName}
                  className='block border border-gray-border'
                >
                  <NxtImage
                    src={`${mediaBaseUrl}${item.colorImage}`}
                    alt="Patagonia Men's Better Sweater Jacket"
                    className='w-full'
                  />
                </Link>
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
                              <div className='flex justify-between items-center pt-[5px] pb-[5px]'>
                                <div className='w-full md:w-1/3 flex flex-wrap items-center gap-2 pl-[5px] pr-[5px] mb-[10px]'>
                                  <div className='text-default-text'>Size</div>
                                  <div className='text-default-text'>
                                    {view.attributeOptionValue}
                                  </div>
                                </div>
                                <div className='w-full md:w-1/3 flex flex-wrap items-center gap-1 pl-[5px] pr-[5px] mb-[10px]'>
                                  <div className='text-default-text'>Qty</div>
                                  <div className='text-default-text'>
                                    <input
                                      className='text-default-text pl-[5px] pr-[5px] pt-[5px] pb-[5px] w-[60px] mr-2 rounded border-[#000000]'
                                      value={view.qty}
                                    />
                                    <button
                                      onClick={() => {}}
                                      className='btn btn-sm btn-primary'
                                    >
                                      UPDATE
                                    </button>
                                  </div>
                                </div>
                                <div className='w-full md:w-1/3 flex flex-wrap items-center justify-between gap-2 pl-[5px] pr-[5px] mb-[10px]'>
                                  <div className='text-default-text'>
                                    <Price value={view.price} />
                                  </div>
                                  <div className='text-default-text'>
                                    <span
                                      className='!text-anchor hover:!text-anchor-hover cursor-pointer'
                                      onClick={() => {}}
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
                                  <div className='text-default-text'>
                                    <span
                                      className='!text-anchor hover:!text-anchor-hover cursor-pointer'
                                      onClick={() => {}}
                                    >
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
                                      <div className=''>${_item.logoPrice}</div>
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
                <button
                  className='btn btn-lg btn-secondary uppercase'
                  onClick={() => {}}
                >
                  {__pagesText.cart.personalizeItem}
                </button>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default CIlayout2;
