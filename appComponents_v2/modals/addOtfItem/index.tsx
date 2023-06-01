import { __pagesText } from '@constants/pages.text';
import { __SuccessErrorText } from '@constants/successError.text';
import {
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';
import { CartReq } from '@services/cart';
import { addToCart } from '@services/cart.service';
import { UploadImage } from '@services/file.service';
import {
  FetchOtfItemNumbers,
  FetchOtfItemVariants,
  OTFItem,
  OTFVariant,
} from '@services/otfItems.service';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import {
  OTF_InitialValues,
  OTF_ValidationSchema,
  _OTF_Fields,
  _OTF_InitialValues,
  addOTFItemToStore,
  calculateTotals,
} from './Components/OTF_Extra';
import { OTF_Input, OTF_Select } from './Components/OTF_Input';

const AddOTFItemNo = ({ closeModal }: { closeModal: () => void }) => {
  const { fetchCartDetails, setShowLoader, showModal } = useActions_v2();
  const { id: storeId, imageFolderPath } = useTypedSelector_v2(
    (state) => state.store,
  );
  const mediaBaseUrl = useTypedSelector_v2((state) => state.store.mediaBaseUrl);

  // COMPONENT STATES
  const [otfItemNo, setOtfItemNo] = useState<OTFItem[]>([]);
  const [otfItemVariant, setOtfItemVariant] = useState<OTFVariant[]>([]);
  const [fileToUpload, setFileToUpload] = useState<{
    name: string;
    type: string;
    previewURL: string;
    serverURL: string | null;
  } | null>(null);

  // IMPORTED FUNCTIONS
  const customerId = GetCustomerId();

  // COMPONENT FUNCTIONS
  const fetchOtfItemsNVariants = async () => {
    setShowLoader(true);

    await Promise.allSettled([FetchOtfItemNumbers(), FetchOtfItemVariants()])
      .then((values) => {
        if (values[0].status === 'fulfilled') {
          setOtfItemNo(values[0].value);
        }

        if (values[1].status === 'fulfilled') {
          setOtfItemVariant(values[1].value);
        }
      })
      .catch(() => {})
      .finally(() => {
        setShowLoader(false);
      });
  };

  const fileReader = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget?.files === null) return;
    setShowLoader(true);

    try {
      const file: typeof fileToUpload = {
        name: event.currentTarget.files[0].name,
        type: event.currentTarget.files[0].type,
        previewURL: URL.createObjectURL(event.currentTarget.files[0]),
        serverURL: null,
      };

      const temp_Arr = imageFolderPath.split('/');

      let temp_ImagFolderPath = '';
      temp_Arr.forEach((ele, index) => {
        if (index === 0) {
          return;
        }

        if (index === 1) {
          temp_ImagFolderPath += '/temp';
          return;
        }

        temp_ImagFolderPath += '/' + ele;
      });

      file.serverURL = await UploadImage({
        folderPath: temp_ImagFolderPath,
        files: event.currentTarget?.files[0],
      });

      if (file.serverURL) {
        setFileToUpload(file);
      }
    } catch (error) {
      showModal({
        title: 'Error',
        message: __SuccessErrorText.SomethingWentWrong,
      });
    }
    setShowLoader(false);
  };

  const submitHandler = async (
    values: _OTF_InitialValues,
    actions: FormikHelpers<_OTF_InitialValues>,
  ) => {
    setShowLoader(true);

    const sizes = values.size.split(',').filter((ele) => ele !== '');
    const qtys = values.qty.split(',').filter((ele) => ele !== '');

    if (sizes.length !== qtys.length) {
      confirm('Size and quantity length not matched');
      setShowLoader(false);
      return;
    }

    try {
      const otfResponse = await addOTFItemToStore(
        storeId,
        values,
        fileToUpload?.serverURL || '',
      );

      const { totalPrice, totalQty } = calculateTotals({
        qty: otfResponse.qty,
        responsePrice: otfResponse.price,
      });

      const payload: CartReq = {
        addToCartModel: {
          customerId: +customerId,
          productId: otfResponse.id,
          storeId: storeId,
          isempLogin: true,
          ipAddress: '192.168.1.1',
          isForm: false,
          shoppingCartItemModel: {
            price: totalPrice,
            quantity: totalQty,
            isEmployeeLoginPrice: totalPrice, // Questionable
            logoTitle: otfResponse.name,
            logogImagePath: otfResponse.imagePath,
            // Static
            id: 0,
            status: 2,
            weight: 0,
            itemNotes: '',
            productType: 0,
            appQuantity: 0,
            perQuantity: 0,
            discountPrice: 0,
            discountPercentage: 0,
            productCustomizationId: 0,
          },
          shoppingCartItemsDetailModels: [
            {
              attributeOptionId: otfResponse.colorOptionId,
              attributeOptionName: 'color',
              attributeOptionValue: otfResponse.color,
            },
          ],
          //Sizes info
          cartLogoPersonModel: otfResponse.size.map((item, index) => ({
            attributeOptionId: item.attributeOptionId,
            attributeOptionValue: item.name,
            //
            isEmployeeLoginPrice: otfResponse.price,
            price: otfResponse.price,
            quantity: otfResponse.qty[index],
            // Static
            id: 0,
            code: '', //
            estimateDate: new Date(),
          })),
          // Empty Logos
          cartLogoPersonDetailModels: [],
        },
      };

      await addToCart(payload);
      await fetchCartDetails({
        customerId: customerId,
        isEmployeeLoggedIn: true,
      });
      closeModal();
    } catch (error: any) {
      const err = JSON.parse(error.message);
      for (const key in err) {
        actions.setFieldError(
          key.replace('addOTFItemModel.', '').toLowerCase(),
          err[key],
        );
      }
    }
    setShowLoader(false);
  };

  // ALL UseEffects
  useEffect(() => {
    fetchOtfItemsNVariants();
  }, []);

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
              <div className='text-xl font-semibold text-gray-900 lg:text-2xl login-top-title '>
                Add OTF Item
              </div>
              <div className='flex items-center gap-x-2'>
                <button
                  onClick={closeModal}
                  className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
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

            <Formik
              initialValues={OTF_InitialValues}
              onSubmit={submitHandler}
              validationSchema={OTF_ValidationSchema}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
              }) => {
                return (
                  <Form onSubmit={handleSubmit}>
                    <div className='p-6'>
                      {_OTF_Fields.map((field) => {
                        if (field.type === 'select') {
                          let options: { value: string; label: string }[] = [];

                          switch (field.name) {
                            case 'otfItemNo':
                              options = otfItemNo;
                              break;
                            case 'otfItemVariant':
                              options = otfItemVariant;
                              break;

                            default:
                              options = [];
                              break;
                          }
                          return (
                            <OTF_Select
                              key={field.name}
                              name={field.name}
                              value={values[field.name]}
                              label={field.label}
                              onChange={(ev) => {
                                handleChange(ev);
                              }}
                              placeHolder={field.placeHolder}
                              options={options}
                              setFieldValue={setFieldValue}
                              noOptionText={field.noOptionFound}
                            />
                          );
                        }

                        return (
                          <OTF_Input
                            key={field.name}
                            name={field.name}
                            value={values[field.name]}
                            label={field.label}
                            type={field.type}
                            onChange={handleChange}
                            required={field.required}
                            placeHolder={field.placeHolder}
                            onBlur={handleBlur}
                          />
                        );
                      })}
                      <div className='flex flex-wrap mt-2'>
                        <div className='w-full lg:w-1/3 mt-4'>
                          <label
                            htmlFor='First Name'
                            className='block text-base font-medium text-gray-700'
                          >
                            Upload Image
                          </label>
                        </div>
                        <div className='w-full '>
                          <div className='border border-gray-300 text-sm p-2 bg-light-gray'>
                            <div className='flex flex-wrap items-center justify-between bg-white border border-gray-300 text-sm p-1'>
                              {fileToUpload?.serverURL ? (
                                <>
                                  <img
                                    className='w-14 max-h-14'
                                    src={`${mediaBaseUrl}${fileToUpload?.serverURL}`}
                                    alt={fileToUpload?.name || ''}
                                  />
                                  <button
                                    className='underline font-bold text-base text-[#006cd1]'
                                    onClick={() => {
                                      setFileToUpload({
                                        name: '',
                                        type: '',
                                        previewURL: '',
                                        serverURL: '',
                                      });
                                    }}
                                  >
                                    X Remove
                                  </button>
                                </>
                              ) : null}
                              <>
                                <div>
                                  {/* Just to keep second div at right */}
                                </div>
                                <div className=''>
                                  <label
                                    htmlFor={'id'}
                                    className='cursor-pointer inline-block bg-indigo-600 border-0 py-2 px-3 text-white'
                                  >
                                    {
                                      __pagesText.productInfo.somLogoOption
                                        .upload
                                    }
                                  </label>
                                  <input
                                    type='file'
                                    name={'id'}
                                    id={'id'}
                                    onChange={fileReader}
                                    value={''}
                                    className='sr-only'
                                    accept={'image/*'}
                                  />
                                </div>
                              </>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center justify-between p-6 space-x-2 rounded-b border-t border-gray-200 '>
                      <button
                        data-modal-toggle='adduserModal'
                        type='submit'
                        className='btn btn-secondary'
                      >
                        Add
                      </button>
                      <button
                        data-modal-toggle='adduserModal'
                        onClick={closeModal}
                        className='btn btn-primary'
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOTFItemNo;
