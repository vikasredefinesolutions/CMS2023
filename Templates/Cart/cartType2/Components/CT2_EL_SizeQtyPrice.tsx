import Price from '@appComponents/reUsable/Price';
import { cartRemoveConfirmMessage } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import {
  __SuccessErrorText,
  commonMessage,
} from '@constants/successError.text';
import { captureRemoveItemEvent } from '@controllers/cartController';
import {
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';
import { fetchCartDetails } from '@redux/asyncActions/cart.async';
import { _CartItem } from '@services/cart';
import {
  deleteItemCart,
  removeParticularSizeProduct,
} from '@services/cart.service';
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { _SetState_Details } from './CT2_EL_Extras';

const _QtyNUnitPriceYupSchema = Yup.object().shape({
  unitPrice: Yup.number().required().min(0),
  qty: Yup.number().required().min(1),
});

interface _Props {
  details: {
    id: number;
    size: string;
    qty: number;
    unitPrice: string;
    totalPrice: number;
  };
  item: _CartItem;
  setDetails: React.Dispatch<React.SetStateAction<_SetState_Details>>;
}

const CT2_EL_SizeQtyPrice: React.FC<_Props> = ({
  details,
  setDetails,
  item,
}) => {
  const { showModal, setShowLoader } = useActions_v2();

  const customerId = GetCustomerId();

  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );

  const storeId = useTypedSelector_v2((state) => state.store.id);
  const cartData = useTypedSelector_v2((state) => state.cart.cart);

  const handleRemoveItem = (itemId: number) => {
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

  const refreshCartItems = async () => {
    await fetchCartDetails({
      customerId,
      isEmployeeLoggedIn,
    });
    setShowLoader(false);
  };
  const handleSizeRemove = async (view: any, item: any) => {
    if (item.shoppingCartItemDetailsViewModels.length === 1) {
      return handleRemoveItem(item.shoppingCartItemsId);
    }
    const payload = {
      deletecartlogopersonmodel: {
        cartLogoPersonId: view,
        attributeOptionId: +item.attributeOptionId,
      },
    };
    const confirmRes = confirm(cartRemoveConfirmMessage);
    if (confirmRes) {
      setShowLoader(true);
      removeParticularSizeProduct(payload)
        .then((res) => {
          if (res) {
            setShowLoader(false);
            refreshCartItems();
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

  const handleQtyPriceUpdate = (inputs: _Props['details']) => {
    const newOrOldQty = +inputs.qty;
    const newUnitPrice = inputs.unitPrice;

    if (details.qty !== newOrOldQty || details.unitPrice !== newUnitPrice) {
      setDetails((prev) => {
        let updateTotalPrice = 0;
        let udpateTotalQty = 0;
        let updateSizeWithPriceNQty: _SetState_Details['sizesWithPriceNQty'] =
          prev.sizesWithPriceNQty;

        if (newOrOldQty === 0) {
          updateSizeWithPriceNQty = prev.sizesWithPriceNQty.filter((item) => {
            if (item.id !== +inputs.id) {
              updateTotalPrice += item.totalPrice;
              udpateTotalQty += item.qty;
              return true;
            }

            if (item.id === inputs.id) return false;
          });
        }

        if (newOrOldQty > 0) {
          updateSizeWithPriceNQty = prev.sizesWithPriceNQty.map((item) => {
            const idOfUpdatedQtyOrPrice = +inputs.id;
            if (item.id === idOfUpdatedQtyOrPrice) {
              const totalPriceForSingleSize = newOrOldQty * +newUnitPrice;
              updateTotalPrice += totalPriceForSingleSize;
              udpateTotalQty += newOrOldQty;
              return {
                id: idOfUpdatedQtyOrPrice,
                unitPrice: (+newUnitPrice).toFixed(2),
                qty: newOrOldQty,
                totalPrice: totalPriceForSingleSize,
                size: item.size,
                attributeOptionId: item.attributeOptionId,
              };
            }

            updateTotalPrice += item.totalPrice;
            udpateTotalQty += item.qty;
            return { ...item, unitPrice: (+newUnitPrice).toFixed(2) };
          });
        }

        return {
          totalQty: udpateTotalQty,
          totalPrice: updateTotalPrice,
          sizesWithPriceNQty: updateSizeWithPriceNQty,
          updateCart: true,
          lastUpdate: prev.lastUpdate,
        };
      });
    }
  };

  return (
    <Formik
      initialValues={{ ...details }}
      onSubmit={handleQtyPriceUpdate}
      validationSchema={_QtyNUnitPriceYupSchema}
      enableReinitialize
    >
      {({ handleChange, submitForm, setFieldValue, values }) => {
        return (
          <Form>
            <div className='flex'>
              <div className='w-full md:w-1/3 flex flex-wrap items-center gap-2 pl-[5px] pr-[5px] mb-[10px]'>
                <div className='text-default-text'>Size</div>
                <div className='text-default-text'>{values.size}</div>
              </div>
              <div className='w-full md:w-1/3 flex flex-wrap items-center gap-1 pl-[5px] pr-[5px] mb-[10px]'>
                <div className='text-default-text'>Qty</div>
                <form>
                  <input
                    className='block w-[60px] border border-gray-600 shadow-sm text-sm py-1 px-2'
                    value={values.qty}
                    name='qty'
                    type='number'
                    onKeyDown={(event) =>
                      ['e', 'E', '+', '-', '.'].includes(event.key) &&
                      event.preventDefault()
                    }
                    min={1}
                    onChange={(event) => {
                      if (event.target.value.toString() === '0') {
                        // handleChange(event);
                        return setFieldValue('qty', 1);
                      }
                      if (!event.target.value.includes('.')) {
                        handleChange(event);
                      }
                    }}
                    onBlur={(event) => {
                      if (!event.target.value) setFieldValue('qty', 1);
                      submitForm();
                    }}
                  />
                </form>
              </div>
              <div className='w-full md:w-1/3 flex flex-wrap items-center gap-1 pl-[5px] pr-[5px] mb-[10px]'>
                <div className='text-default-text'>$</div>
                <form>
                  <input
                    className='block w-20 border border-gray-600 shadow-sm text-sm py-1 px-2'
                    value={values.unitPrice}
                    type='number'
                    name='unitPrice'
                    min={0.1}
                    size={0.1}
                    onKeyDown={(event) =>
                      ['e', 'E', '+', '-'].includes(event.key) &&
                      event.preventDefault()
                    }
                    onChange={(event) => {
                      if (+event.target.value === 0) {
                        setFieldValue('unitPrice', 1);
                        return;
                      }
                      handleChange(event);
                    }}
                    onBlur={() => {
                      submitForm();
                    }}
                  />
                </form>
              </div>
              <div className='w-full md:w-1/3 flex flex-wrap items-center justify-between gap-2 pl-[5px] pr-[5px] mb-[10px]'>
                <div className='text-default-text'>
                  <Price value={values.qty * +values.unitPrice} />
                </div>
                <div className='text-default-text'>
                  <span
                    className='!text-anchor hover:!text-anchor-hover cursor-pointer'
                    onClick={() => {
                      handleSizeRemove(details.id, item);
                    }}
                  >
                    {__pagesText.cart.remove}
                  </span>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CT2_EL_SizeQtyPrice;
