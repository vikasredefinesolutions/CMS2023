import Price from '@appComponents/Price';
import NxtImage from '@appComponents/reUsable/Image';
import {
  __SuccessErrorText,
  commonMessage,
} from '@constants/successError.text';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { CartObject } from '@services/cart';
import { updateCartQuantity } from '@services/cart.service';
import Link from 'next/link';
import { FC, useRef, useState } from 'react';
import { _globalStore } from 'store.global';
// import { CI_Props } from './cartItem';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CIlayout4: FC<any> = ({ cartData, removeCartItem }) => {
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
  };

  mediaBaseUrl = mediaBaseUrl || clientSideMediaBaseUrl;
  return (
    <>
      <ul className='overflow-hidden border border-gray-border p-[15px] md:p-[30px]'>
        {cartData &&
          cartData.map((item: CartObject, cartItemIndex: number) => {
            return (
              <li
                className=' pt-0'
                key={`${item.shoppingCartItemsId}_${cartItemIndex}`}
              >
                <div className='flex flex-wrap -mx-3'>
                  <div className='w-full lg:w-1/12 pl-[12px] pr-[12px] mb-[10px] max-w-[300px] mx-auto'>
                    <NxtImage
                      src={`${mediaBaseUrl}${item.colorImage}`}
                      alt="Patagonia Men's Better Sweater Jacket"
                      className='w-full'
                    />
                  </div>
                  <div className='w-full lg:w-11/12 pl-[12px] pr-[12px]'>
                    <div className='flex justify-between'>
                      <div className='text-sub-text font-semibold mb-[10px]'>
                        <Link
                          href={`/${item.seName}`}
                          className='!text-anchor hover:!text-anchor-hover'
                        >
                          {item.productName}
                        </Link>
                      </div>
                      <div className='text-default-text'>
                        <span>
                          ${(item.totalPrice / item.totalQty).toFixed(2)} / QTY{' '}
                          {item.totalQty}
                        </span>
                      </div>
                      <div className='text-default-text mb-[10px]'>
                        <span className='font-semibold'>
                          Total <Price value={item.totalPrice} />
                        </span>
                      </div>
                    </div>
                    <div className='text-default-text mb-[10px]'>
                      Color:{' '}
                      <span className='font-semibold'>
                        {item.attributeOptionValue}
                      </span>
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
                                    Size :{' '}
                                  </div>
                                  <div className='text-default-text flex items-center font-bold'>
                                    {view.attributeOptionValue} -
                                    <form className=''>
                                      <input
                                        className='text-default-text pl-[5px] pr-[5px] pt-[5px] pb-[5px] w-[30px] mx-2 rounded  border border-gray text-center w-12'
                                        defaultValue={view.qty}
                                        data-valueofinput={view.qty}
                                        onChange={(e) => {
                                          valueRef.current = {
                                            ...valueRef.current,
                                            [`${view.id}`]: +e.target.value,
                                          };
                                        }}
                                        onBlur={(e) => {
                                          handleUpdateQuantity(
                                            e,
                                            +item.attributeOptionId,
                                            view.id,
                                            valueRef.current[
                                              view.id.toString()
                                            ],
                                          );
                                        }}
                                      />
                                    </form>
                                    {'QTY'}
                                  </div>
                                  <div className='"mt-[15px] lg:ml-[40px] w-full cursor-pointer'>
                                    <div
                                      onClick={() =>
                                        removeCartItem(item.shoppingCartItemsId)
                                      }
                                      className='!w-full !py-[5px] '
                                    >
                                      Remove Item
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
              </li>
            );
          })}
      </ul>
      <div className='mt-[20px]'>
        <Link href={'/'}>
          <a className='btn btn-primary text-center'>Continue Shopping</a>
        </Link>
      </div>
    </>
  );
};

export default CIlayout4;
