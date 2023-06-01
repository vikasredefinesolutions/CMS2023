import { formFields } from '@constants/global.constant';
import { consultationProofMessages } from '@constants/validationMessages';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import ConsultationInput from './components/ConsultationInput';

const Consultation_Type1 = () => {
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const { setShowLoader } = useActions_v2();
  const initialValues = {
    // id: 0,
    // rowVersion: '',
    location: 'string',
    ipAddress: '192.168.1.1',
    macAddress: '00-00-00-00-00-00',
    storeId,
    productId: 0,
    firstname: '',
    lastname: '',
    company: '',
    email: '',
    city: '',
    state: '',
    phone: '',
    teamSport: '',
    contactMethod: 0,
    desiredQuantity: '',
    inHandsDate: '2023-06-01T04:54:06.932Z',
    logoUrl: '',
    message: '',
    recStatus: 'A',
    gclid: '',
    productattributeoptionid: 0,
    status: '',
    customerId: 0,
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required(
      consultationProofMessages.firstname.required,
    ),
    lastname: Yup.string().required(
      consultationProofMessages.lastname.required,
    ),
    company: Yup.string().required(consultationProofMessages.company.required),
    city: Yup.string().required(consultationProofMessages.city.required),
    state: Yup.string().required(consultationProofMessages.state.required),
    desiredQuantity: Yup.string().required(
      consultationProofMessages.desiredQuantity.required,
    ),
    teamSport: Yup.string().required(
      consultationProofMessages.teamSport.required,
    ),
    email: Yup.string()
      .email(consultationProofMessages.email.invalid)
      .required(consultationProofMessages.email.required),
  });

  const handleSubmit = async (values: any) => {
    setShowLoader(true);
    console.log('values: ', values);
    setShowLoader(false);
  };

  return (
    <section className='container pl-[15px] pr-[15px] mx-auto'>
      <div className='text-2xl-text font-[600] text-center pt-[20px] pb-[10px] mb-[30px]'>
        Request A Quote
      </div>
      <div className='pt-[12px] pb-[12px]'>
        <div className='flex flex-wrap'>
          <div className='w-full pl-[15px] pr-[15px] mb-[30px] text-center text-default-text'>
            <p>
              Not finding an item of interest on our site, or looking for
              further customization? Please complete the below fields and one of
              our sales professionals will contact you to review options.
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors }) => (
              <Form className='w-full pl-[15px] pr-[15px] mb-[30px]'>
                <div className='flex flex-wrap justify-center gap-y-4 mx-[-15px]'>
                  {formFields.map((field: any) => (
                    <ConsultationInput
                      key={field.name}
                      name={field.name}
                      label={field.label}
                      placeholder={field.placeholder}
                      isRequired={field.isRequired}
                      type={field.type}
                      options={field.options}
                    />
                  ))}

                  <div className='w-full px-[15px] text-center'>
                    <button
                      type='submit'
                      className='btn btn-md btn-secondary mb-[15px]'
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default Consultation_Type1;
