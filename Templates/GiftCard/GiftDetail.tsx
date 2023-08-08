import Price from '@appComponents/Price';
import NxtImage from '@appComponents/reUsable/Image';
import { __pagesText } from '@constants/pages.text';
import { giftCardValidation } from '@constants/validationMessages';
import { _GiftDetailsProps } from '@definations/product.type';
import getLocation from '@helpers/getLocation';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { addToCart } from '@services/cart.service';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const GiftDetail: React.FC<_GiftDetailsProps> = ({ giftData }) => {
  const { setShowLoader, showModal, fetchCartDetails } = useActions_v2();
  const { id: customerId } = useTypedSelector_v2((state) => state.user);
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const initialValues = {
    recipientName: '',
    recipientEmail: '',
    message: '',
  };

  const validationSchema = Yup.object().shape({
    recipientName: Yup.string()
      .trim()
      .required(giftCardValidation.name.required),
    recipientEmail: Yup.string()
      .trim()
      .email(giftCardValidation.email.invalid)
      .required(giftCardValidation.email.required),
    message: Yup.string().trim().required(giftCardValidation.message.required),
  });

  const handleSubmit = async (values: FormikValues) => {
    try {
      setShowLoader(true);
      const cartObject = {
        addToCartModel: {
          customerId: customerId || 0,
          productId: giftData.id,
          storeId: storeId,
          shoppingCartItemsDetailModels: [
            {
              attributeOptionName: `Name^Email^Message`,
              attributeOptionValue: `${values.recipientName}^${values.recipientEmail}^${values.message}`,
              attributeOptionId: 0,
            },
          ],
          isempLogin: false,
          ipAddress: (await getLocation()).ip_address,
          isForm: false,
          shoppingCartItemModel: {
            id: 0,
            price: +giftData.salePrice,
            quantity: 1,
            weight: 0,
            productType: 0,
            discountPrice: 0,
            logoTitle: giftData.name,
            logogImagePath: giftData.imageName,
            perQuantity: 0,
            appQuantity: 0,
            status: 2,
            discountPercentage: 0,
            productCustomizationId: 0,
            itemNotes: '',
            isEmployeeLoginPrice: false,
          },
          cartLogoPersonModel: [
            {
              id: 0,
              attributeOptionId: 0,
              attributeOptionValue: `${values.recipientName}^${values.recipientEmail}^${values.message}`,
              code: '',
              price: +giftData.salePrice,
              quantity: 1,
              estimateDate: new Date(),
              isEmployeeLoginPrice: 0,
            },
          ],
          cartLogoPersonDetailModels: [
            {
              id: 0,
              logoPrice: 0,
              logoQty: 0,
              logoFile: '',
              logoLocation: '',
              logoTotal: 0,
              colorImagePath: '',
              logoUniqueId: '',
              price: 0,
              logoColors: '',
              logoNotes: '',
              logoDate: new Date(),
              logoNames: '',
              digitalPrice: 0,
              logoPositionImage: '',
              oldFilePath: '',
              originalLogoFilePath: '',
              isSewOut: false,
              sewOutAmount: 0,
              reUsableCustomerLogo: 0,
            },
          ],
        },
      };
      await addToCart(cartObject);
      showModal({
        message: __pagesText.cart.successMessage,
        title: 'Success',
      });
      await fetchCartDetails({
        customerId: customerId || 0,
        isEmployeeLoggedIn,
      });
      setShowLoader(false);
    } catch (error) {
      showModal({
        message: __pagesText.review.someThingWrong,
        title: 'Error',
      });
      setShowLoader(false);
    }
  };
  return (
    <>
      <section className=''>
        <div className='container mx-auto'>
          <div className='bg-[#ffffff]'>
            <div className='lg:grid lg:grid-cols-12 lg:items-start px-[10px]'>
              <div className='lg:col-start-2 lg:col-end-7 grid grid-cols-12 gap-6'>
                <div className='col-span-12 relative'>
                  <div className='main-image mb-[5px]'>
                    <NxtImage
                      src={giftData?.imageName}
                      className='w-full object-center object-cover'
                      alt={giftData?.name}
                    />
                  </div>
                </div>
              </div>
              <div className='lg:col-end-13 lg:col-span-5 mt-[15px] md:mt-[40px] px-0 lg:px-[15px] sm:px-0 sm:mt-[64px] lg:mt-0'>
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values) => handleSubmit(values)}
                  validationSchema={validationSchema}
                >
                  {({ values, handleChange, handleBlur }) => (
                    <Form>
                      <div className='mb-[15px] border-b border-b-gray-border'>
                        <div className='text-title-text'>Gift Card</div>
                      </div>
                      <div className='flex flex-wrap mb-[15px] items-center text-small-text'>
                        <div className='w-full md:w-2/6'>
                          <span className='font-semibold'>
                            Recipient's Name:
                          </span>
                        </div>
                        <div className='w-full md:w-4/6'>
                          <input
                            className='form-input'
                            id='recipientName'
                            name='recipientName'
                            value={values.recipientName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage name='recipientName'>
                            {(msg) => (
                              <p className='text-red-500 text-xs mt-1'>{msg}</p>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>
                      <div className='flex flex-wrap mb-[15px] items-center text-small-text'>
                        <div className='w-full md:w-2/6'>
                          <span className='font-semibold'>
                            Recipient's Email:
                          </span>
                        </div>
                        <div className='w-full md:w-4/6'>
                          <input
                            className='form-input'
                            id='recipientEmail'
                            name='recipientEmail'
                            value={values.recipientEmail}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage name='recipientEmail'>
                            {(msg) => (
                              <p className='text-red-500 text-xs mt-1'>{msg}</p>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>
                      <div className='flex flex-wrap mb-[15px] items-center text-small-text'>
                        <div className='w-full md:w-2/6'>
                          <span className='font-semibold'>Message:</span>
                        </div>
                        <div className='w-full md:w-4/6'>
                          <textarea
                            className='form-input'
                            rows={4}
                            id='message'
                            name='message'
                            value={values.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          ></textarea>
                          <ErrorMessage name='message'>
                            {(msg) => (
                              <p className='text-red-500 text-xs mt-1'>{msg}</p>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>
                      <div>
                        <div className='mt-[15px] bg-light-gray p-[20px]'>
                          <div className='text-sm flex flex-wrap items-center'>
                            <div className='w-[112px]'>
                              <span className=''>You Pay</span>
                            </div>
                            <div className=''>
                              <span className='text-2xl tracking-wider'>
                                <Price value={giftData?.salePrice} />
                              </span>
                            </div>
                          </div>
                          <div className='w-full text-left flex justify-end mt-[20px]'>
                            <button
                              type='submit'
                              className='btn btn-secondary w-full text-center'
                            >
                              BUY NOW
                            </button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>

      {giftData?.description && (
        <section className=''>
          <div className='container mx-auto'>
            <div className='bg-white pt-[40px] px-[10px] pb-[30px]'>
              <div className=''>
                <div className='bg-secondary py-[10px] px-[15px] text-white inline-block rounded-t-md'>
                  Description
                </div>
              </div>
              <div
                className='text-sm tracking-widest p-[20px] border border-gray-border'
                dangerouslySetInnerHTML={{ __html: giftData?.description }}
              ></div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default GiftDetail;
