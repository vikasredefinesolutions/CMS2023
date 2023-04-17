import { __pagesText } from '@constants/pages.text';
import { OTFItemValidation } from '@constants/validationMessages';
import { OTFItemNoList } from '@definations/otfItem.res';
import { getAddToCartObject } from '@helpers/common.helper';
import {
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';
import { addToCart } from '@services/cart.service';
import { UploadImage } from '@services/file.service';
import {
  addOtfItem,
  getOtfItemNo,
  getOtfItemVariant,
} from '@services/otfItems.service';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

const AddOTFItemNo = ({ closeModal }: { closeModal: () => void }) => {
  const [otfItemNo, setOtfItemNo] = useState<OTFItemNoList | null>(null);
  const [otfItemVariant, setOtfItemVariant] = useState<OTFItemNoList | null>(
    null,
  );
  const [fileUrl, setFileUrl] = useState('');

  const { id: storeId, imageFolderPath } = useTypedSelector_v2(
    (state) => state.store,
  );
  const userId = GetCustomerId();
  const { fetchCartDetails, setShowLoader } = useActions_v2();
  useEffect(() => {
    (async () => {
      const itmes = await getOtfItemNo();
      setOtfItemNo(itmes);
      const variants = await getOtfItemVariant();
      setOtfItemVariant(variants);
    })();
  }, []);

  const fileReader = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget?.files === null) return;
    setShowLoader(true);

    try {
      // const file = {
      //   name: event.currentTarget.files[0].name,
      //   type: event.currentTarget.files[0].type,
      //   previewURL: URL.createObjectURL(event.currentTarget.files[0]),
      // };

      const logoFileURL: string | null = await UploadImage({
        folderPath: imageFolderPath,
        files: event.currentTarget?.files[0],
      });
      if (logoFileURL) {
        setFileUrl(logoFileURL);
      }
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
      console.log(error);
    }
  };

  const initialValues = {
    otfItemNo: '',
    otfItemVariant: '',
    ourSKU: '',
    name: '',
    color: '',
    size: '',
    price: '',
    qty: '',
  };

  const validationSchema = Yup.object().shape({
    otfItemNo: Yup.string().required(OTFItemValidation.otfItemNo.required),
    otfItemVariant: Yup.string().required(
      OTFItemValidation.otfItemVariant.required,
    ),
    ourSKU: Yup.string().required(OTFItemValidation.ourSKU.required),
    name: Yup.string().required(OTFItemValidation.name.required),
    color: Yup.string().required(OTFItemValidation.color.required),
    size: Yup.string().required(OTFItemValidation.size.required),
    price: Yup.number().required(OTFItemValidation.price.required),
    qty: Yup.string().required(OTFItemValidation.qty.required),
  });

  const submitHandler = async (values: typeof initialValues) => {
    try {
      const size = values.size.split(',');
      const qty = values.qty.split(',');
      const res = await addOtfItem({
        addOTFItemModel: {
          id: 0,
          otfItemNo: values.otfItemNo,
          otfItemVariant: values.otfItemVariant,
          ourSKU: values.ourSKU,
          name: values.name,
          color: values.color,
          colorOptionId: 0,
          size: size.map((res) => ({ attributeOptionId: 0, name: res.trim() })),
          price: values.price,
          qty: qty.map((res) => res.trim()),
          storeId: storeId,
          imagePath: fileUrl,
        },
      });

      const productDetails = {
        productId: res?.id || 0,
        image: {
          id: 0,
          imageUrl: fileUrl,
          altTag: res.name,
        },
        color: {
          altTag: res.color,
          imageUrl: fileUrl,
          name: res.color,
          attributeOptionId: res.colorOptionId,
        },
        inventory: null,
      };
      const totalQty = ~~qty.reduce((prev: string, newQty: string) =>
        (~~prev + ~~newQty).toString(),
      );
      const price = res.price * totalQty;
      const cartModel = await getAddToCartObject({
        userId: +userId,
        note: '',
        sizeQtys: res.size.map((optn, index) => {
          const qtySize = +qty[index].trim();
          console.log(price, qtySize);
          if (qtySize) {
            return {
              attributeOptionId: optn.attributeOptionId,
              price: qtySize * res.price,
              qty: qtySize,
              size: optn.name,
            };
          }
          return null;
        }),
        productDetails,
        total: {
          totalPrice: price,
          totalQty: totalQty,
        },

        storeId: storeId,
        isEmployeeLoggedIn: true,
        logos: [],
      });
      setFileUrl('');
      await addToCart(cartModel);
      fetchCartDetails({ customerId: userId, isEmployeeLoggedIn: true });
      closeModal();
    } catch (error: any) {
      const err = JSON.parse(error.message);
      for (const key in err) {
        setFieldError(
          key.replace('addOTFItemModel.', '').toLowerCase(),
          err[key],
        );
      }
    }
  };

  const otfForm = useFormik({
    validationSchema,
    initialValues,
    onSubmit: submitHandler,
  });

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldError,
  } = otfForm;
  return (
    <div
      id='adduserModal'
      aria-hidden='true'
      className='overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal h-full inset-0'
    >
      <div className='w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
        <div className='relative px-4 w-full max-w-2xl h-fullborder border-neutral-200 inline-block h-auto'>
          <div className='relative bg-white rounded-lg shadow max-h-screen overflow-y-auto'>
            <div className='flex justify-between items-center p-5 rounded-t border-b sticky top-0 left-0 bg-white'>
              <div className='text-xl font-semibold text-gray-900 lg:text-2xl login-top-title dark:text-white'>
                Add OTF Item
              </div>
              <div className='flex items-center gap-x-2'>
                <button
                  onClick={closeModal}
                  className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                  data-modal-toggle='adduserModal'
                >
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className='p-6'>
                <div className='flex flex-wrap'>
                  <div className='w-full lg:w-1/3 mt-4'>
                    <label
                      htmlFor='First Name'
                      className='block text-base font-medium text-gray-700'
                    >
                      OTF Item No.
                    </label>
                  </div>
                  <div className='w-full lg:w-1/2'>
                    <div className='mt-2'>
                      <select
                        value={values.otfItemNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='form-input'
                        name='otfItemNo'
                      >
                        <option
                          disabled={Boolean(values.otfItemNo)}
                          selected={true}
                        >
                          Select OTF Item No
                        </option>
                        {otfItemNo &&
                          otfItemNo.map((itemNo) => (
                            <option key={itemNo.value} value={itemNo.value}>
                              {itemNo.label}
                            </option>
                          ))}
                      </select>
                    </div>
                    {touched.otfItemNo && errors.otfItemNo && (
                      <p className='text-red-500 text-xs mt-1'>
                        {errors.otfItemNo}
                      </p>
                    )}
                  </div>
                </div>
                <div className='flex flex-wrap'>
                  <div className='w-full lg:w-1/3 mt-4'>
                    <label
                      htmlFor='First Name'
                      className='block text-base font-medium text-gray-700 align-middle '
                    >
                      OTF Variant Code
                    </label>
                  </div>
                  <div className='w-full lg:w-1/2'>
                    <div className='mt-2'>
                      <select
                        value={values.otfItemVariant}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='form-input'
                        name='otfItemVariant'
                      >
                        <option
                          selected={true}
                          disabled={Boolean(values.otfItemVariant)}
                        >
                          Select OTF Item Variant
                        </option>
                        {otfItemVariant &&
                          otfItemVariant.map((variant) => (
                            <option key={variant.value} value={variant.value}>
                              {variant.label}
                            </option>
                          ))}
                      </select>
                    </div>
                    {touched.otfItemVariant && errors.otfItemVariant && (
                      <p className='text-red-500 text-xs mt-1'>
                        {errors.otfItemVariant}
                      </p>
                    )}
                  </div>
                </div>
                <div className='flex flex-wrap'>
                  <div className='w-full lg:w-1/3 mt-4'>
                    <label
                      htmlFor='First Name'
                      className='block text-base font-medium text-gray-700'
                    >
                      SKU
                    </label>
                  </div>
                  <div className='w-full lg:w-1/2'>
                    <div className='mt-2'>
                      <input
                        type='text'
                        id='SKU'
                        name='ourSKU'
                        autoComplete='SKU'
                        placeholder='SKU'
                        className='form-input'
                        value={values.ourSKU}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {touched.ourSKU && errors.ourSKU && (
                      <p className='text-red-500 text-xs mt-1'>
                        {errors.ourSKU}
                      </p>
                    )}
                  </div>
                </div>
                <div className='flex flex-wrap'>
                  <div className='w-full lg:w-1/3 mt-4'>
                    <label
                      htmlFor='First Name'
                      className='block text-base font-medium text-gray-700'
                    >
                      Name
                    </label>
                  </div>
                  <div className='w-full lg:w-1/2'>
                    <div className='mt-2'>
                      <input
                        type='text'
                        id='Name'
                        name='name'
                        autoComplete='Name'
                        placeholder='Name'
                        className='form-input'
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {touched.name && errors.name && (
                      <p className='text-red-500 text-xs mt-1'>{errors.name}</p>
                    )}
                  </div>
                </div>
                <div className='flex flex-wrap'>
                  <div className='w-full lg:w-1/3 mt-4'>
                    <label
                      htmlFor='First Name'
                      className='block text-base font-medium text-gray-700'
                    >
                      Color
                    </label>
                  </div>
                  <div className='w-full lg:w-1/2'>
                    <div className='mt-2'>
                      <input
                        type='text'
                        id='Color'
                        name='color'
                        autoComplete='Color'
                        placeholder='Color'
                        className='form-input'
                        value={values.color}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {touched.color && errors.color && (
                      <p className='text-red-500 text-xs mt-1'>
                        {errors.color}
                      </p>
                    )}
                  </div>
                </div>
                <div className='flex flex-wrap'>
                  <div className='w-full lg:w-1/3 mt-4'>
                    <label
                      htmlFor='First Name'
                      className='block text-base font-medium text-gray-700'
                    >
                      Size
                    </label>
                  </div>
                  <div className='w-full lg:w-1/2'>
                    <div className='mt-2'>
                      <input
                        type='text'
                        id='Size'
                        name='size'
                        autoComplete='Size'
                        placeholder='Size'
                        className='form-input'
                        value={values.size}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {touched.size && errors.size && (
                      <p className='text-red-500 text-xs mt-1'>{errors.size}</p>
                    )}
                  </div>
                </div>
                <div className='flex flex-wrap'>
                  <div className='lg:w-1/3 mt-4'>
                    <label
                      htmlFor='First Name'
                      className='block text-base font-medium text-gray-700'
                    >
                      Qty
                    </label>
                  </div>
                  <div className='w-full lg:w-1/2'>
                    <div className='mt-2'>
                      <input
                        type='text'
                        id='Qty'
                        name='qty'
                        autoComplete='Qty'
                        placeholder='Qty'
                        className='form-input'
                        value={values.qty}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {touched.qty && errors.qty && (
                      <p className='text-red-500 text-xs mt-1'>{errors.qty}</p>
                    )}
                  </div>
                </div>
                <div className='flex flex-wrap'>
                  <div className='w-full lg:w-1/3 mt-4'>
                    <label
                      htmlFor='First Name'
                      className='block text-base font-medium text-gray-700'
                    >
                      Price
                    </label>
                  </div>
                  <div className='w-full lg:w-1/2'>
                    <div className='mt-2'>
                      <input
                        type='text'
                        id='Price'
                        name='price'
                        autoComplete='Price'
                        placeholder='Price'
                        className='form-input'
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    {touched.price && errors.price && (
                      <p className='text-red-500 text-xs mt-1'>
                        {errors.price}
                      </p>
                    )}
                  </div>
                </div>
                <div className='flex flex-wrap mt-2'>
                  <div className='w-full lg:w-1/3 mt-4'>
                    <label
                      htmlFor='First Name'
                      className='block text-base font-medium text-gray-700'
                    >
                      Upload Image
                    </label>
                  </div>
                  <div className='w-full lg:w-1/2'>
                    <div className='flex flex-wrap items-center justify-between border border-gray-300 text-sm p-1'>
                      {<div className=''></div>}

                      <div className=''>
                        <label
                          htmlFor={'id'}
                          className='cursor-pointer inline-block bg-indigo-600 border-0 py-2 px-3 text-white'
                        >
                          {__pagesText.productInfo.somLogoOption.upload}
                        </label>
                        <input
                          type='file'
                          name={'id'}
                          id={'id'}
                          onChange={fileReader}
                          value={''}
                          className='sr-only'
                          // onChange={fileReader}
                          accept={'image/*'}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600'>
                <button
                  data-modal-toggle='adduserModal'
                  type='submit'
                  className='btn btn-primary'
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOTFItemNo;
