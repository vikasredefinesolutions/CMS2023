/* eslint-disable react-hooks/exhaustive-deps */
import { __pagesConstant } from '@constants/pages.constant';
import { __pagesText } from '@constants/pages.text';
import { __ValidationText } from '@constants/validation.text';
import { Klaviyo_BackInStock } from '@services/klaviyo.service';
import { _SelectOrInputProps } from '@templates/ProductDetails/Components/productDetailsComponents';
import { ErrorMessage, Form, Formik } from 'formik';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(__ValidationText.email.required),
});

const SelectOrInput: React.FC<_SelectOrInputProps> = ({
  qty,
  size,
  price,
  defaultQty,
  sizeAttributeOptionId,
}) => {
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );
  const { updateQuantities, updatePrice } = useActions_v2();
  const { attributeOptionId } = useTypedSelector_v2(
    (state) => state.product.selected.color,
  );

  const [email, setEmail] = useState<string>('');
  const [inputOrSelect, setInputOrSelect] = useState<{
    type: 'input' | 'select' | 'saved';
    choosedValue: number;
    focus: boolean;
  }>({
    type: defaultQty > 10 ? 'input' : 'select',
    choosedValue: defaultQty,
    focus: false,
  });

  const selectQtyHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === '10+') {
      setInputOrSelect((input) => ({
        ...input,
        type: 'input',
        focus: true,
      }));
      return;
    }

    updateQuantities({
      attributeOptionId: sizeAttributeOptionId,
      size: size,
      qty: +event.target.value,
      price: price.msrp,
    });
    setInputOrSelect((input) => ({
      ...input,
      choosedValue: +event.target.value,
    }));
  };

  const enterQtyHandler = (value: { itemCount: number }) => {
    if (value.itemCount < 10) {
      updateQuantities({
        attributeOptionId: sizeAttributeOptionId,
        size: size,
        qty: Math.ceil(value.itemCount),
        price: price.msrp,
      });
      setInputOrSelect({
        type: 'select',
        choosedValue: Math.ceil(value.itemCount),
        focus: false,
      });
      return;
    }

    updateQuantities({
      attributeOptionId: sizeAttributeOptionId,
      size: size,
      qty: Math.ceil(value.itemCount),
      price: price.msrp,
    });

    setInputOrSelect({
      type: 'input',
      choosedValue: Math.ceil(value.itemCount),
      focus: false,
    });
  };

  const sendEmailHandler = async (values: { email: string }) => {
    await Klaviyo_BackInStock({
      email: values.email,
      a: __pagesConstant._document.klaviyoKey,
      variant: '' + attributeOptionId,
      platform: 'api',
    }).then((res) => {
      if (res.success) {
        setEmail('SENT');
      }
    });
  };

  useEffect(() => {
    updatePrice({ price: price.msrp });
  }, []);

  useEffect(() => {
    if (defaultQty > 0) {
      updateQuantities({
        attributeOptionId: sizeAttributeOptionId,
        size: size,
        qty: +defaultQty || 0,
        price: price.msrp,
      });
    }
  }, [defaultQty]);

  if (qty <= 0 && !isEmployeeLoggedIn) {
    return (
      <>
        {email === 'SENT' ? (
          <td className='px-2 py-4'>
            <div className='text-left'>
              {
                __pagesText.productInfo.startOrderModal.sizePriceQty
                  .selectOrInput.thanksForSigningUp
              }
            </div>
          </td>
        ) : (
          <td className='px-2 py-4'>
            <div className='text-left text-extra-small-text'>
              <div className='flex flex-wrap items-center'>
                {
                  __pagesText.productInfo.startOrderModal.sizePriceQty
                    .selectOrInput.outOfStockGetInventoryAlert
                }
                <span className='material-icons-outlined text-xs'>
                  {
                    __pagesText.productInfo.startOrderModal.sizePriceQty
                      .selectOrInput.email
                  }
                </span>
              </div>
              <Formik
                initialValues={{ email: '' }}
                onSubmit={sendEmailHandler}
                validationSchema={validationSchema}
              >
                {({ values, handleChange }) => {
                  return (
                    <Form className='flex flex-wrap mt-[2px]'>
                      <input
                        type='text'
                        name='email'
                        autoComplete='off'
                        value={values.email}
                        onChange={handleChange}
                        className='grow border border-gray-600 shadow-sm text-sm py-1 px-2'
                      />

                      <button
                        type='submit'
                        className='btn btn-sm btn-quaternary whitespace-nowrap'
                      >
                        {
                          __pagesText.productInfo.startOrderModal.sizePriceQty
                            .selectOrInput.notify
                        }
                      </button>

                      <ErrorMessage
                        name={'email'}
                        className='text-rose-500'
                        component={'p'}
                      />
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </td>
        )}
      </>
    );
  }

  return (
    <td className='px-2 py-4'>
      {inputOrSelect.type === 'select' && (
        <div className=''>
          <select
            className='block w-full border border-gray-600 shadow-sm py-1 px-2 pr-10 text-default-text max-w-[100px]'
            value={inputOrSelect.choosedValue}
            name={size}
            onChange={selectQtyHandler}
          >
            <option value='0'>0</option>
            {new Array(9).fill('').map((_, index) =>
              qty > index || isEmployeeLoggedIn ? (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ) : (
                ''
              ),
            )}

            {qty > 9 || isEmployeeLoggedIn ? (
              <option value='10+'>{__pagesText.productInfo.tenPlus}</option>
            ) : (
              ''
            )}
          </select>
        </div>
      )}

      {inputOrSelect.type === 'input' && (
        <Formik
          initialValues={{ itemCount: inputOrSelect.choosedValue }}
          onSubmit={enterQtyHandler}
        >
          {({ values, handleChange }) => {
            return (
              <Form>
                <div className='flex items-center gap-2 flex-wrap'>
                  <input
                    type='number'
                    name='itemCount'
                    onKeyDown={(e) => {
                      if (/[^0-9]+/.test(e.currentTarget.value)) {
                        e.currentTarget.value = e.currentTarget.value.replace(
                          /[^0-9]*/g,
                          '',
                        );
                      }
                    }}
                    max={isEmployeeLoggedIn ? '' : qty}
                    value={Math.ceil(values.itemCount)}
                    onFocus={() =>
                      setInputOrSelect((state) => ({
                        ...state,
                        focus: true,
                      }))
                    }
                    onChange={handleChange}
                    className='block w-full border border-gray-600 shadow-sm py-1 px-2 text-default-text max-w-[100px]'
                  />
                  {inputOrSelect.focus && (
                    <>
                      <button
                        type='submit'
                        className='btn btn-sm btn-secondary'
                      >
                        {
                          __pagesText.productInfo.startOrderModal.sizePriceQty
                            .selectOrInput.save
                        }
                      </button>
                      <button
                        onClick={() =>
                          setInputOrSelect({
                            type: 'select',
                            choosedValue: 0,
                            focus: false,
                          })
                        }
                        className='btn btn-sm btn-primary'
                      >
                        {
                          __pagesText.productInfo.startOrderModal.sizePriceQty
                            .selectOrInput.clear
                        }
                      </button>
                    </>
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
      )}
    </td>
  );
};

export default SelectOrInput;
