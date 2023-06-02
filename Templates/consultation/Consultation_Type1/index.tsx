import { formFields } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import {
  __SuccessErrorText,
  storeRequestMessages,
} from '@constants/successError.text';
import { consultationProofMessages } from '@constants/validationMessages';
import { useActions_v2 } from '@hooks_v2/index';
import { createStoreRequests } from '@services/storerequest.service';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import * as Yup from 'yup';
import ConsultationInput from './components/ConsultationInput';

const Consultation_Type1 = () => {
  const { setShowLoader, showModal } = useActions_v2();
  const [captchaVerified, setverifiedRecaptch] = useState<
    'NOT_VALID' | null | 'VALID'
  >(null);

  const captchaHandler = (value: any) => {
    setverifiedRecaptch('VALID');
  };

  // const { resetForm } = useFormikContext();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    organization: '',
    teamSport: '',
    city: '',
    state: '',
    approximateQuantity: '',
    teamLogo: '',
    message: '',
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(
      consultationProofMessages.firstName.required,
    ),
    lastName: Yup.string().required(
      consultationProofMessages.lastName.required,
    ),
    organization: Yup.string().required(
      consultationProofMessages.organization.required,
    ),
    city: Yup.string().required(consultationProofMessages.city.required),
    state: Yup.string().required(consultationProofMessages.state.required),
    approximateQuantity: Yup.string().required(
      consultationProofMessages.approximateQuantity.required,
    ),
    teamSport: Yup.string().required(
      consultationProofMessages.teamSport.required,
    ),
    email: Yup.string()
      .email(consultationProofMessages.email.invalid)
      .required(consultationProofMessages.email.required),
  });

  const handleSubmit = async (values: any) => {
    console.log('values: ', values);
    setShowLoader(true);
    const payload = {
      ggQuoteRequestModel: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        organization: values.organization,
        teamSport: values.teamSport,
        city: values.city,
        state: values.state,
        approximateQuantity: values.approximateQuantity,
        teamLogo: values.teamLogo,
        message: values.message,
      },
    };
    try {
      const res = await createStoreRequests(payload);
      if (res) {
        // resetForm();
        showModal({
          title: 'Success',
          message: storeRequestMessages.requestCreated,
        });
      } else {
        showModal({
          title: 'Error',
          message: __SuccessErrorText.SomethingWentWrong,
        });
      }
      setShowLoader(false);
    } catch (e) {
      setShowLoader(false);
      console.log('api exception---request a quote', e);
    }
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

                  <div className='mb-[15px]'>
                    <ReCAPTCHA
                      className='max-w-xs w-full'
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHASITEKEY || ''}
                      onChange={captchaHandler}
                    />
                    {captchaVerified === 'NOT_VALID' && (
                      <p className='text-rose-500'>
                        {__pagesText.requestConsultation.captchaNotValid}
                      </p>
                    )}
                  </div>

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
