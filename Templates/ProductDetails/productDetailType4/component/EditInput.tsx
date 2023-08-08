import { __ValidationText } from '@constants/validation.text';
import { _SelectOrInputProps } from '@templates/ProductDetails/Components/productDetailsComponents';
import { Form, Formik } from 'formik';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(__ValidationText.email.required),
});

const EditInput: React.FC<_SelectOrInputProps> = ({
  qty,
  size,
  price,
  defaultQty,
  sizeAttributeOptionId,
  isSpecialBrand,
}) => {
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );
  const { updateQuantities, updatePrice } = useActions_v2();

  const newprice = useTypedSelector_v2(
    (state) => state.product.toCheckout.price,
  );

  const discount = useTypedSelector_v2(
    (state) => state.product.product.discounts,
  );

  const { multipleQuantity } = useTypedSelector_v2(
    (state) => state.product.selected.color,
  );

  const customerId = useTypedSelector_v2((state) => state.user.id);
  const [editInput, setEditInput] = useState<{
    type: 'input';
    choosedValue: number;
    focus: boolean;
  }>({
    type: 'input',
    choosedValue: defaultQty,
    focus: false,
  });

  const enterQtyHandler = (value: { itemCount: number }) => {
    updateQuantities({
      attributeOptionId: sizeAttributeOptionId,
      size: size,
      qty: Math.ceil(value.itemCount),
      price: newprice,
      sewOutCharges: 0,
    });

    setEditInput({
      type: 'input',
      choosedValue: Math.ceil(value.itemCount),
      focus: false,
    });
  };

  useEffect(() => {
    if (defaultQty > 0) {
      setEditInput({ type: 'input', choosedValue: +defaultQty, focus: false });
      updateQuantities({
        attributeOptionId: sizeAttributeOptionId,
        size: size,
        qty: +defaultQty || 0,
        price: price.msrp,
        sewOutCharges: 0,
      });
    }
  }, [defaultQty]);

  return (
    <div className='px-2 py-2'>
      {editInput.type === 'input' && (
        <Formik
          initialValues={{ itemCount: Math.ceil(editInput.choosedValue) }}
          onSubmit={enterQtyHandler}
          enableReinitialize
        >
          {({ values, handleChange, setFieldValue }) => {
            return (
              <Form>
                <div className='flex items-center justify-center gap-2 flex-wrap'>
                  <input
                    type='number'
                    name='itemCount'
                    onKeyDown={(event) =>
                      ['e', 'E', '+', '-', '.'].includes(event.key) &&
                      event.preventDefault()
                    }
                    min={0}
                    placeholder='0'
                    max={isEmployeeLoggedIn ? '' : qty}
                    value={values.itemCount ? Math.ceil(values.itemCount) : ''}
                    onFocus={(e) =>
                      setEditInput((state) => ({
                        ...state,
                        choosedValue: parseInt(e.target.value),
                        focus: true,
                      }))
                    }
                    onBlur={(e) => {
                      enterQtyHandler({
                        itemCount: +(values.itemCount
                          ? multipleQuantity !== 0 &&
                            values.itemCount % multipleQuantity !== 0 &&
                            multipleQuantity < qty
                            ? Math.ceil(values.itemCount / multipleQuantity) *
                              multipleQuantity
                            : Math.ceil(values.itemCount)
                          : ''),
                      });
                      setFieldValue(
                        'itemCount',
                        +(values.itemCount
                          ? multipleQuantity !== 0 &&
                            values.itemCount % multipleQuantity !== 0 &&
                            multipleQuantity < qty
                            ? Math.ceil(values.itemCount / multipleQuantity) *
                              multipleQuantity
                            : Math.ceil(values.itemCount)
                          : ''),
                      );
                      setEditInput((state) => ({
                        ...state,
                        choosedValue: parseInt(e.target.value),
                        focus: true,
                      }));
                    }}
                    onChange={handleChange}
                    className='form-input !px-[10px] !inline-block max-w-[100px] mx-auto w-full'
                  />

                  {values.itemCount > qty && editInput.focus && (
                    <span className='text-rose-500 text-sm'>
                      Only {qty} Available!
                    </span>
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
      )}
    </div>
  );
};
export default EditInput;
