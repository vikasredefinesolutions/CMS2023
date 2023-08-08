import NxtImage from '@appComponents/reUsable/Image';
import getLocation from '@helpers/getLocation';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import unitNameTag from '@images/UnitiNameTag.png';
import { createNameTags } from '@services/general.service';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import * as Yup from 'yup';

const NameTags = () => {
  const { setShowLoader, showModal } = useActions_v2();
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const initialValues = {
    firstName: '',
    lastName: '',
    qty: 0,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().trim().required('Enter your First name.'),
    lastName: Yup.string().trim().required('Enter your Last name.'),
    qty: Yup.number()
      .required('Tag Qty Must Be Greater Than Zero.')
      .min(1, 'Tag Qty Must Be Greater Than Zero.'),
  });
  const handleSubmit = async (values: FormikValues, resetForm: () => void) => {
    try {
      const location = await getLocation();
      setShowLoader(true);
      const payload = {
        nameTagsModel: {
          rowVersion: '',
          location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
          ipAddress: location.ip_address,
          macAddress: '00-00-00-00-00-00',
          id: 0,
          storeId: storeId,
          firstName: values.firstName,
          lastName: values.lastName,
          quantity: values.qty,
          recStatus: 'A',
        },
      };
      await createNameTags(payload);
      resetForm();
      showModal({
        message: 'Request submitted successfully.',
        title: 'Success',
      });
      setShowLoader(false);
    } catch (error: any) {
      const mesaage = error
        ? error[Object.keys(error)[0]]
        : 'Something went wrong';
      showModal({
        message: mesaage,
        title: 'Error',
      });
      setShowLoader(false);
    }
  };
  return (
    <section className=''>
      <div className='container mx-auto'>
        <div className='bg-[#ffffff]'>
          <div className='text-center text-title-text  mb-[20px] uppercase'>
            <h1>Name Tags</h1>
          </div>
          <div className='lg:grid lg:grid-cols-12 lg:items-start px-[10px]'>
            <div className='lg:col-start-2 lg:col-end-7 grid grid-cols-12 gap-6'>
              <div className='col-span-12 relative'>
                <div className='main-image mb-[5px]'>
                  {/* TEST: Image src*/}
                  <NxtImage
                    src={unitNameTag.src}
                    className='w-full object-center object-cover'
                    alt='uniti name tag'
                    isStatic={true}
                  />
                </div>
              </div>
            </div>
            <div className='lg:col-end-13 lg:col-span-5 mt-[15px] md:mt-[40px] px-0 lg:px-[15px] sm:px-0 sm:mt-[64px] lg:mt-0'>
              <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={(values, { resetForm }) =>
                  handleSubmit(values, resetForm)
                }
                validationSchema={validationSchema}
              >
                {({ values, handleChange, handleBlur }) => (
                  <Form>
                    <div className='flex flex-wrap mb-[15px] items-center text-small-text'>
                      <div className='w-full mb-[10px]'>
                        <span className='font-semibold'>
                          First Name <span className='text-rose-500'>*</span>:
                        </span>
                      </div>
                      <div className='w-full mb-[10px]'>
                        <input
                          className='form-input'
                          id='firstName'
                          name='firstName'
                          value={values.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name='firstName'>
                          {(msg) => <p className='text-red-500 '>{msg}</p>}
                        </ErrorMessage>
                      </div>
                    </div>
                    <div className='flex flex-wrap mb-[15px] items-center text-small-text'>
                      <div className='w-full mb-[10px]'>
                        <span className='font-semibold'>
                          Last Name <span className='text-rose-500'>*</span>:
                        </span>
                      </div>
                      <div className='w-full mb-[10px]'>
                        <input
                          className='form-input'
                          id='lastName'
                          name='lastName'
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name='lastName'>
                          {(msg) => <p className='text-red-500 '>{msg}</p>}
                        </ErrorMessage>
                      </div>
                    </div>
                    <div className='flex flex-wrap mb-[15px] items-center text-small-text'>
                      <div className='w-full mb-[10px]'>
                        <span className='font-semibold'>
                          Name Tag Qty <span className='text-rose-500'>*</span>:
                        </span>
                      </div>
                      <div className='w-full mb-[10px]'>
                        <input
                          className='form-input'
                          type='number'
                          id='qty'
                          name='qty'
                          onKeyDown={(e) =>
                            ['e', 'E', '+', '-', '.'].includes(e.key) &&
                            e.preventDefault()
                          }
                          min={1}
                          value={values.qty}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name='qty'>
                          {(msg) => <p className='text-red-500 '>{msg}</p>}
                        </ErrorMessage>
                      </div>
                    </div>
                    <div>
                      <p>
                        Name Tags will be processed as a custom order. Please
                        fill out this form and your information will be sent to
                        your sales representative Kylie Bernard who will work
                        with you to process the remainder of your order.
                      </p>
                      <div className='mt-[15px]'>
                        <div className='w-full text-left flex justify-center mt-[20px]'>
                          <button
                            type='submit'
                            className='btn btn-secondary text-center'
                          >
                            Submit
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
  );
};

export default NameTags;
