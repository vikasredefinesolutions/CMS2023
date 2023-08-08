import Price from '@appComponents/Price';
import NxtImage from '@appComponents/reUsable/Image';
import { cartRemoveConfirmMessage } from '@constants/global.constant';
import { commonMessage } from '@constants/successError.text';
import { captureRemoveItemEvent } from '@controllers/cartController';
import { isNumberKey } from '@helpers/common.helper';
import {
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';
import { ShoppingCartItemDetailsViewModel, _CartItem } from '@services/cart';
import {
  deleteItemCart,
  removeParticularSizeProduct,
  updateCartQuantity,
} from '@services/cart.service';
import {
  DeleteSbStoreCartProductDetails,
  FetchSbStoreCartDetails,
} from '@services/sb.service';
import Link from 'next/link';
import React, { useState } from 'react';
interface _Props {
  item: _CartItem;
}

const CO6_Product: React.FC<_Props> = ({ item }) => {
  const { setShowLoader, cart_UpdateItems, showModal } = useActions_v2();
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const { cart: cartItems } = useTypedSelector_v2((state) => state.cart);
  const [updatedInput, setUpdatedInput] = useState<{
    attributeOptionId: number;
    newQty: number;
    oldQty: number;
    id: number;
  } | null>(null);

  const customerId = GetCustomerId();

  const updateCart = async () => {
    return await FetchSbStoreCartDetails(+customerId).then((response) => {
      if (!response) throw new Error('Invalid response received from Cart API');

      cart_UpdateItems({ items: response });
    });
  };

  const deleteProductHandler = async (cartItemId: number) => {
    const userConfirmsToDelete = confirm(cartRemoveConfirmMessage);
    if (!userConfirmsToDelete) {
      setUpdatedInput(null);
      return;
    }

    //
    setShowLoader(true);

    const productCustomFieldsExist =
      item.shoppingCartItemsCustomFieldViewModel.length > 0;

    if (productCustomFieldsExist) {
      await DeleteSbStoreCartProductDetails({
        shoppingCartItemsId: cartItemId,
      });
    }

    deleteItemCart(cartItemId)
      .then((response) => {
        if (!response) {
          throw new Error(
            'Invalid response received from delete cart item API',
          );
        }

        captureRemoveItemEvent(cartItems, cartItemId, customerId, storeId);
      })
      .then(() => updateCart())
      .catch(() => {
        showModal({
          message: commonMessage.somethingWentWrong,
          title: commonMessage.failed,
        });
      })
      .finally(() => setShowLoader(false));
  };

  const deleteSizeHandler = (productId: number) => {
    if (item.shoppingCartItemDetailsViewModels.length === 1) {
      deleteProductHandler(item.shoppingCartItemsId);
      return;
    }

    //
    const confirmRes = confirm(cartRemoveConfirmMessage);
    if (!confirmRes) {
      setUpdatedInput(null);
      return;
    }

    //
    setShowLoader(true);
    removeParticularSizeProduct({
      deletecartlogopersonmodel: {
        cartLogoPersonId: productId,
        attributeOptionId: +item.attributeOptionId,
      },
    })
      .then((response) => {
        if (!response) {
          throw new Error(
            'Invalid response received from delete particular size API',
          );
        }
        return updateCart();
      })
      .catch((error) => {
        showModal({
          message: commonMessage.somethingWentWrong,
          title: commonMessage.failed,
        });
      })
      .finally(() => setShowLoader(false));
  };

  const handleQtyUpdate = () => {
    if (!updatedInput) return;

    if (updatedInput.oldQty === updatedInput.newQty) {
      setUpdatedInput(null);
      return;
    }

    if (updatedInput.newQty === 0) {
      deleteSizeHandler(updatedInput.id);
      return;
    }

    //
    setShowLoader(true);
    updateCartQuantity({
      updateCartLinePersonModel: {
        cartLogoPersonId: updatedInput.id,
        quantity: updatedInput.newQty,
        attributeOptionId: item.attributeOptionId,
      },
    })
      .then((response) => {
        if (!response) {
          throw new Error('Invalid response received from updateCartQty API');
        }
        return updateCart();
      })
      .catch((error) => {
        showModal({
          message: commonMessage.somethingWentWrong,
          title: commonMessage.failed,
        });
      })
      .finally(() => {
        setShowLoader(false);
        setUpdatedInput(null);
      });
  };

  const getValue = (product: ShoppingCartItemDetailsViewModel) => {
    if (product.attributeOptionId === updatedInput?.attributeOptionId) {
      return updatedInput.newQty;
    }

    return product.qty;
  };

  return (
    <li className='flex flex-wrap py-[20px] -mx-[10px] items-start'>
      <div className='w-full md:w-1/4 px-[10px] md:mb-0 mb-[10px]'>
        <Link href={`/${item.seName}.html`} title=''>
          <a>
            <NxtImage
              src={item.colorImage || '/assets/images/image_not_available.jpg'}
              alt={item.productName}
              className=''
              useNextImage={false}
              isStatic={!Boolean(item.colorImage)}
            />
          </a>
        </Link>
      </div>
      <div className='w-full md:w-3/4 px-[10px] flex flex-wrap lg:justify-between'>
        <div className='text-sub-text font-semibold'>
          <Link href={`/${item.seName}.html`}>
            <a className='text-black hover:text-secondary'>
              {item.productName}
            </a>
          </Link>
        </div>
        <div className='w-full flex flex-wrap'>
          <div className='lg:w-2/3 w-full mt-[10px]'>
            <div className='flex justify-between'>
              <div className='text-default-text'>
                <span className='font-semibold'>SKU :</span> {item.sku}
              </div>
            </div>
            <div className='mt-[5px] flex'>
              <div className='text-default-text'>
                <span className='font-semibold'>Color :</span>{' '}
                {item.attributeOptionValue}
              </div>
            </div>
            <div className='mt-[20px]'>
              <div className='text-default-text font-semibold border-b border-b-gray-border pb-[10px] mb-[5px]'>
                Item Details
              </div>
              <div className='flex justify-between py-[5px]'>
                <div className='text-default-text font-semibold w-28'>Size</div>
                <div className='text-default-text font-semibold w-16 text-center'>
                  Qty
                </div>
                <div className='text-default-text font-semibold w-20 text-center'>
                  Price
                </div>
                <div className='text-default-text font-semibold w-10 text-right'></div>
              </div>
              {item.shoppingCartItemDetailsViewModels.map((product) => {
                return (
                  <div className='flex items-center justify-between py-[5px]'>
                    <div className='text-default-text w-28'>
                      {product.attributeOptionValue}
                    </div>
                    <div className='text-default-text w-16 text-center'>
                      <input
                        className='form-input h-[30px]'
                        onKeyDown={(event) =>
                          ['.'].includes(event.key) && event.preventDefault()
                        }
                        onChange={(event) => {
                          if (isNumberKey(event)) {
                            setUpdatedInput({
                              attributeOptionId: product.attributeOptionId,
                              newQty: +event.target.value,
                              oldQty: product.qty,
                              id: product.id,
                            });
                          }
                        }}
                        value={getValue(product)}
                      />
                      {updatedInput?.attributeOptionId ===
                        product.attributeOptionId && (
                        <button
                          className='btn btn-sm btn-primary'
                          onClick={() => handleQtyUpdate()}
                        >
                          UPDATE
                        </button>
                      )}
                    </div>
                    <div className='text-default-text w-20 text-center'>
                      <Price value={product.price} />
                    </div>
                    <div className='text-default-text w-10 text-right'>
                      <a
                        href='javascript:void(0)'
                        title='Remove'
                        onClick={() => deleteSizeHandler(product.id)}
                        className=''
                      >
                        <span className='material-icons-outlined'>delete</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='mt-[10px] lg:w-1/3 w-full'>
            <div className='font-bold text-medium-text text-right'>
              <span className=''>
                Item Total:
                <br />
                <Price value={item.totalPrice} />
              </span>
            </div>
            <div className='mt-[15px] lg:ml-[40px]'>
              <button
                onClick={() => deleteProductHandler(item.shoppingCartItemsId)}
                className='btn btn-primary !w-full !py-[5px] text-center'
              >
                REMOVE
              </button>
            </div>
          </div>
          {item.shoppingCartItemsCustomFieldViewModel.length > 0 && (
            <div className='w-full mt-[20px] text-default-text'>
              <div className='font-semibold pb-[10px] text-medium-text text-left'>
                <div className=''>Custom Field</div>
              </div>
              <table className='w-full border border-gray-border border-collapse'>
                <thead>
                  <tr>
                    <th className='border border-gray-border p-[5px]'>
                      Field Name
                    </th>
                    <th className='border border-gray-border p-[5px]'>
                      Field Value
                    </th>
                    <th className='border border-gray-border p-[5px]'>
                      Charge Type
                    </th>
                    <th className='border border-gray-border p-[5px]'>Price</th>
                    <th className='border border-gray-border p-[5px]'>Qty</th>
                    <th className='border border-gray-border p-[5px]'>
                      Sub Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {item.shoppingCartItemsCustomFieldViewModel.map(
                    (custom, index) => {
                      return (
                        <tr key={index}>
                          <td className='border border-gray-border p-[5px]'>
                            {custom.storeProductCustomFieldName}
                          </td>
                          <td className='border border-gray-border p-[5px]'>
                            {custom.storeProductCustomFieldValue}
                          </td>
                          <td className='border border-gray-border p-[5px]'>
                            {custom.isChargePerCharacter
                              ? 'Charge Per Character'
                              : 'Fixed'}
                          </td>
                          <td className='border border-gray-border p-[5px]'>
                            <Price value={custom.subTotal / custom.quantity} />
                          </td>
                          <td className='border border-gray-border p-[5px]'>
                            {custom.quantity}
                          </td>
                          <td className='border border-gray-border p-[5px]'>
                            <Price value={custom.subTotal} />
                          </td>
                        </tr>
                      );
                    },
                  )}
                </tbody>
              </table>
              <div className='font-semibold pt-[10px] text-sub-text text-right'>
                Total :{' '}
                <span className=''>
                  <Price value={item.totalCustomFieldsCharges} />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default CO6_Product;
