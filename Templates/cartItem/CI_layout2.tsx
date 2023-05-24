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

  loadProduct,
}) => {
  const { loggedIn: empLoggedIn } = useTypedSelector_v2(
    (state) => state.employee,
  );

  let mediaBaseUrl = _globalStore.blobUrl; // for server side
  const clientSideMediaBaseUrl = useTypedSelector_v2(
    (state) => state.store.mediaBaseUrl,
  );
  mediaBaseUrl = mediaBaseUrl || clientSideMediaBaseUrl;

  return (
    <>
      <div className='bg-light-gray w-full mb-[30px]'>
        <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
          <div className='pt-[10px]'>
            <div className='pb-[10px] text-title-text'>
              {__pagesText.CheckoutPage.OrderReview}
            </div>
          </div>
          <div className='border-t border-[#ececec] mt-[15px]'>
            <div className='bg-[#ffffff] pl-[15px] pr-[15px] pt-[15px] pb-[15px] mt-[15px]'>
              <ul className='overflow-hidden border border-gray-border p-[15px] md:p-[30px]'>
                {cartData &&
                  cartData.map((item: CartObject, cartItemIndex: number) => (
                    <li
                      key={item.attributeOptionId}
                      className='border-b border-b-gray-300 mb-[30px]'
                    >
                      <div className='flex flex-wrap pb-[20px] -mx-3'>
                        <div className='w-full lg:w-1/4 pl-[12px] pr-[12px] mb-[10px] max-w-[300px] mx-auto'>
                          <Link href={item.seName}>
                            <a className='block border border-gray-border'>
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
                            </a>
                          </Link>
                        </div>
                        <div className='w-full lg:w-3/4 pl-[12px] pr-[12px]'>
                          <div className='flex flex-wrap justify-between items-center'>
                            <div className='text-sub-text font-semibold mb-[10px]'>
                              <Link href={item.seName}>
                                <a>{item.productName}</a>
                              </Link>
                            </div>
                            <div className='text-default-text mb-[10px]'>
                              <span className='font-semibold'>
                                Total {item.totalPrice}
                              </span>
                            </div>
                          </div>
                          <div className='flex flex-wrap justify-between items-center mb-[20px]'>
                            <div className='text-default-text mb-[10px]'>
                              Color:
                              <span>{item.attributeOptionValue}</span>
                            </div>
                          </div>
                          <div className='w-full flex flex-wrap'>
                            <div className='w-full'>
                              <div className='text-default-text bg-light-gray border-b border[#dddddd] pt-[10px] pb-[10px] pl-[15px] pr-[15px]'>
                                Regular {item.sku}
                              </div>
                            </div>
                          </div>
                          <div className=''>
                            {item.shoppingCartItemDetailsViewModels.map(
                              (view, viewIndex) => {
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
                              },
                            )}
                          </div>
                          <div>
                            {item.shoppingCartLogoPersonViewModels.map(
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
                                    className='flex justify-between py-3 w-full pl-[12px] pr-[12px] pt-[12px] pb-[12px] mb-[10px] border border-gray-border'
                                  >
                                    <div className='text-base w-full'>
                                      <div className='text-default-text'>
                                        Location: {_item.logoLocation}
                                      </div>

                                      <div className='w-[80px] h-[80px]'>
                                        <NxtImage
                                          alt=''
                                          src={_item.logoPositionImage}
                                          className=''
                                        />
                                      </div>

                                      <div className='flex flex-wrap justify-between gap-y-2 mt-[10px]'>
                                        <div className='w-full lg:w-1/2'>
                                          <div className='mb-[4px] text-default-text'>
                                            Logo # {_item.name}
                                          </div>
                                          <div className='flex flex-wrap items-center gap-2'>
                                            <div className='text-default-text font-semibold'>
                                              Logo {_index} :
                                            </div>
                                            <div className='h-[50px] w-[70px] overflow-hidden'>
                                              {_item.logoImagePath === '' ? (
                                                <NxtImage
                                                  className=''
                                                  src='/assets/images/logo-to-be-submitted.webp'
                                                  title=''
                                                  alt={_item.logoImagePath}
                                                  isStatic={true}
                                                />
                                              ) : (
                                                <NxtImage
                                                  className=''
                                                  src={_item.logoImagePath}
                                                  title=''
                                                  alt={_item.logoImagePath}
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
                                            {_index === 0 &&
                                            _item.logoPrice === 0 ? (
                                              'First Logo Free'
                                            ) : (
                                              <Price value={_item.logoPrice} />
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              },
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CIlayout2;
