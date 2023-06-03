import { __pagesText } from '@constants/pages.text';
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
  const { attributeOptionId } = useTypedSelector_v2(
    (state) => state.product.selected.color,
  );

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
  const [email, setEmail] = useState<string>('');
  const [EditInput, setEditInput] = useState<{
    type: 'input';
    choosedValue: number;
    focus: boolean;
  }>({
    type: 'input',
    choosedValue: defaultQty,
    focus: false,
  });

  const enterQtyHandler = (value: { itemCount: number }) => {
    // if (value.itemCount < 10) {
    //   updateQuantities({
    //     attributeOptionId: sizeAttributeOptionId,
    //     size: size,
    //     qty: Math.ceil(value.itemCount),
    //     price: newprice,
    //   });
    //   setEditInput({
    //     type: 'select',
    //     choosedValue: Math.ceil(value.itemCount),
    //     focus: false,
    //   });
    //   return;
    // }

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

  // const sendEmailHandler = async (values: { email: string }) => {
  //   await Klaviyo_BackInStock({
  //     email: values.email,
  //     a: __pagesConstant._document.klaviyoKey,
  //     variant: '' + attributeOptionId,
  //     platform: 'api',
  //   }).then((res) => {
  //     if (res.success) {
  //       setEmail('SENT');
  //     }
  //   });
  // };

  useEffect(() => {
    if (discount?.subRows[0].discountPrice) {
      updatePrice({
        price: isSpecialBrand
          ? customerId
            ? +discount?.subRows[0]?.discountPrice
            : price.msrp
          : +discount?.subRows[0]?.discountPrice,
      });
    } else {
      updatePrice({
        price: price.msrp,
      });
    }
  }, [customerId, discount]);

  useEffect(() => {
    if (defaultQty > 0) {
      updateQuantities({
        attributeOptionId: sizeAttributeOptionId,
        size: size,
        qty: +defaultQty || 0,
        price: price.msrp,
        sewOutCharges: 0,
      });
    }
  }, [defaultQty]);

  // if (qty <= 0 && !isEmployeeLoggedIn) {
  //   return (
  //     <>
  //       {email === 'SENT' ? (
  //         <td className='px-2 py-4'>
  //           <div className='text-left'>
  //             {
  //               __pagesText.productInfo.startOrderModal.sizePriceQty
  //                 .selectOrInput.thanksForSigningUp
  //             }
  //           </div>
  //         </td>
  //       ) : (
  //         <td className='px-2 py-4'>
  //           <div className='text-left text-extra-small-text'>
  //             <div className='flex flex-wrap items-center'>
  //               {
  //                 __pagesText.productInfo.startOrderModal.sizePriceQty
  //                   .selectOrInput.outOfStockGetInventoryAlert
  //               }
  //               <span className='material-icons-outlined text-xs'>
  //                 {
  //                   __pagesText.productInfo.startOrderModal.sizePriceQty
  //                     .selectOrInput.email
  //                 }
  //               </span>
  //             </div>
  //             <Formik
  //               initialValues={{ email: '' }}
  //               onSubmit={sendEmailHandler}
  //               validationSchema={validationSchema}
  //             >
  //               {({ values, handleChange }) => {
  //                 return (
  //                   <Form className='flex flex-wrap mt-[2px]'>
  //                     <input
  //                       type='text'
  //                       name='email'
  //                       autoComplete='off'
  //                       value={values.email}
  //                       onChange={handleChange}
  //                       className='grow border border-gray-600 shadow-sm text-sm py-1 px-2'
  //                     />

  //                     <button
  //                       type='submit'
  //                       className='btn btn-sm btn-quaternary whitespace-nowrap'
  //                     >
  //                       {
  //                         __pagesText.productInfo.startOrderModal.sizePriceQty
  //                           .selectOrInput.notify
  //                       }
  //                     </button>

  //                     <ErrorMessage
  //                       name={'email'}
  //                       className='text-rose-500'
  //                       component={'p'}
  //                     />
  //                   </Form>
  //                 );
  //               }}
  //             </Formik>
  //           </div>
  //         </td>
  //       )}
  //     </>
  //   );
  // }

  return (
    <div className='px-2 py-4'>
      {EditInput.type === 'input' && (
        <Formik
          initialValues={{ itemCount: Math.ceil(EditInput.choosedValue) }}
          onSubmit={enterQtyHandler}
        >
          {({ values, handleChange, setFieldValue }) => {
            return (
              <Form>
                <div className='flex items-center justify-center gap-2 flex-wrap'>
                  <input
                    type='number'
                    name='itemCount'
                    min={0}
                    placeholder='0'
                    max={isEmployeeLoggedIn ? '' : qty}
                    value={values.itemCount ? Math.ceil(values.itemCount) : ''}
                    onBlur={(e) =>
                      setEditInput((state) => ({
                        ...state,
                        choosedValue: parseInt(e.target.value),
                        focus: true,
                      }))
                    }
                    onChange={handleChange}
                    className='block w-full border border-gray-600 shadow-sm py-1 px-2 text-default-text max-w-[100px]'
                  />
                  {EditInput.focus && values.itemCount <= qty && (
                    <>
                      <button
                        onClick={() => {
                          enterQtyHandler({
                            itemCount: +(values.itemCount
                              ? multipleQuantity !== 0 &&
                                values.itemCount % multipleQuantity !== 0 &&
                                multipleQuantity < qty
                                ? Math.ceil(
                                    values.itemCount / multipleQuantity,
                                  ) * multipleQuantity
                                : Math.ceil(values.itemCount)
                              : ''),
                          });
                          setFieldValue(
                            'itemCount',
                            +(values.itemCount
                              ? multipleQuantity !== 0 &&
                                values.itemCount % multipleQuantity !== 0 &&
                                multipleQuantity < qty
                                ? Math.ceil(
                                    values.itemCount / multipleQuantity,
                                  ) * multipleQuantity
                                : Math.ceil(values.itemCount)
                              : ''),
                          );
                        }}
                        className='btn btn-sm btn-secondary'
                      >
                        {
                          __pagesText.productInfo.startOrderModal.sizePriceQty
                            .selectOrInput.save
                        }
                      </button>
                      <button
                        onClick={() => {
                          updateQuantities({
                            attributeOptionId: sizeAttributeOptionId,
                            size: size,
                            qty: 0,
                            price: price.msrp,
                            sewOutCharges: 0,
                          });
                          setEditInput({
                            type: 'input',
                            choosedValue: 0,
                            focus: false,
                          });
                        }}
                        className='btn btn-sm btn-primary'
                      >
                        {
                          __pagesText.productInfo.startOrderModal.sizePriceQty
                            .selectOrInput.clear
                        }
                      </button>
                    </>
                  )}
                  {values.itemCount > qty && EditInput.focus && (
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
