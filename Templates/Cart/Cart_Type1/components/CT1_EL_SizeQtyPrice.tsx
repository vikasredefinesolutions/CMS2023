import Price from '@appComponents/reUsable/Price';
import { isNumberKey } from '@helpers/common.helper';
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { _SetState_Details } from './CT1_EL_Extras';

const _QtyNUnitPriceYupSchema = Yup.object().shape({
  unitPrice: Yup.number().required(),
  qty: Yup.number().required(),
});

interface _Props {
  details: {
    id: number;
    size: string;
    qty: number;
    unitPrice: number;
    totalPrice: number;
  };
  setDetails: React.Dispatch<React.SetStateAction<_SetState_Details>>;
}

const CT1_EL_SizeQtyPrice: React.FC<_Props> = ({ details, setDetails }) => {
  const handleQtyPriceUpdate = (inputs: _Props['details']) => {
    const newQty = +inputs.qty;
    const newUnitPrice = +inputs.unitPrice;

    if (details.qty !== newQty || details.unitPrice !== newUnitPrice) {
      setDetails((prev) => {
        let updateTotalPrice = 0;
        let udpateTotalQty = 0;
        let updateSizeWithPriceNQty: _SetState_Details['sizesWithPriceNQty'] =
          prev.sizesWithPriceNQty;

        if (newQty === 0) {
          updateSizeWithPriceNQty = prev.sizesWithPriceNQty.filter(
            (item) => item.id !== +inputs.id,
          );
        }

        if (newQty > 0) {
          updateSizeWithPriceNQty = prev.sizesWithPriceNQty.map((item) => {
            const idOfUpdatedQtyOrPrice = +inputs.id;
            if (item.id === idOfUpdatedQtyOrPrice) {
              const totalPriceForSingleSize = newQty * newUnitPrice;
              updateTotalPrice += totalPriceForSingleSize;
              udpateTotalQty += newQty;
              return {
                id: idOfUpdatedQtyOrPrice,
                unitPrice: newUnitPrice,
                qty: newQty,
                totalPrice: totalPriceForSingleSize,
                size: item.size,
                attributeOptionId: item.attributeOptionId,
              };
            }

            updateTotalPrice += item.totalPrice;
            udpateTotalQty += item.qty;
            return item;
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
      initialValues={details}
      onSubmit={handleQtyPriceUpdate}
      validationSchema={_QtyNUnitPriceYupSchema}
      enableReinitialize
    >
      {({ handleChange, submitForm, values }) => {
        return (
          <Form>
            {' '}
            <div className='flex justify-between py-2'>
              <div className='text-normal-text w-28'>{values.size}</div>
              <div className='text-normal-text w-16 text-center'>
                <input
                  className='block w-full border border-gray-600 shadow-sm text-sm py-1 px-2'
                  value={values.qty}
                  name='qty'
                  onChange={(event) => {
                    if (isNumberKey(event)) {
                      handleChange(event);
                    }
                  }}
                  onBlur={() => {
                    submitForm();
                  }}
                />
              </div>
              <div className='text-base w-16 text-center'>
                <input
                  className='block w-full border border-gray-600 shadow-sm text-sm py-1 px-2'
                  value={values.unitPrice}
                  name='unitPrice'
                  onChange={(event) => {
                    if (isNumberKey(event)) {
                      handleChange(event);
                    }
                  }}
                  onBlur={() => {
                    submitForm();
                  }}
                />
              </div>
              <div className='text-normal-text w-20 text-right'>
                <Price value={values.qty * values.unitPrice} />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CT1_EL_SizeQtyPrice;
