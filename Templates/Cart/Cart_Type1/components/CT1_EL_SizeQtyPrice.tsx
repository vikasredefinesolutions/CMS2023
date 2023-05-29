import Price from '@appComponents/reUsable/Price';
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { _SetState_Details } from './CT1_EL_Extras';

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
  setDetails: React.Dispatch<React.SetStateAction<_SetState_Details>>;
}

const CT1_EL_SizeQtyPrice: React.FC<_Props> = ({ details, setDetails }) => {
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
            <div className='flex justify-between py-2'>
              <div className='text-normal-text w-16'>{values.size}</div>
              <div className='text-normal-text w-20 text-center'>
                <input
                  className='block w-full border border-gray-600 shadow-sm text-sm py-1 px-2'
                  value={values.qty}
                  name='qty'
                  type='number'
                  onKeyDown={(event) =>
                    ['e', 'E', '+', '-', '.'].includes(event.key) &&
                    event.preventDefault()
                  }
                  min={1}
                  onChange={(event) => {
                    if (!event.target.value.includes('.')) {
                      handleChange(event);
                    }
                  }}
                  onBlur={() => {
                    submitForm();
                  }}
                />
              </div>
              <div className='text-base w-20 text-center'>
                <input
                  className='block w-full border border-gray-600 shadow-sm text-sm py-1 px-2'
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
              </div>
              <div className='text-normal-text w-20 text-right'>
                <Price value={values.qty * +values.unitPrice} />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CT1_EL_SizeQtyPrice;
