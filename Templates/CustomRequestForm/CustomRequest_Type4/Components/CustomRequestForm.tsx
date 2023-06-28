import {
  phonePattern1,
  phonePattern2,
  phonePattern3,
  phonePattern4,
} from '@constants/global.constant';
import { __ValidationText } from '@constants/validation.text';
import { consultationProofMessages } from '@constants/validationMessages';
import { ErrorMessage, Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

const _initialValues = {
  firstName: '',
  lastName: '',
  organizationName: '',
  phone: '',
  email: '',
  shipFirstName: '',
  shipLastName: '',
  address1: '',
  address2: '',
  city: '',
  zipCode: '',
  countryName: '',
  stateName: '',
  itemName: '',
  itemColor: '',
  sizeQty: '',
  inHandDate: '',
  additionalComments: '',
  item2: '',
  item3: '',
  item4: '',
  item5: '',
  specialRequest: '',
  targetAudience: '',
  giveawayReason: '',
  estimateBudget: '',
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required(__ValidationText.requestConsultation.firstName.required)
    .min(
      consultationProofMessages.firstName.minLength,
      consultationProofMessages.firstName.minValidation,
    ),
  lastName: Yup.string()
    .required(__ValidationText.requestConsultation.lastName.required)
    .min(
      consultationProofMessages.lastName.minLength,
      consultationProofMessages.lastName.minValidation,
    ),

  phone: Yup.string()
    .required(__ValidationText.signUp.storeCustomerAddress.phone.required)
    .test(
      'phone-test',
      __ValidationText.signUp.storeCustomerAddress.phone.valid,
      (value) => {
        if (
          phonePattern1.test(value || '') ||
          phonePattern2.test(value || '') ||
          phonePattern3.test(value || '') ||
          phonePattern4.test(value || '')
        )
          return true;
        return false;
      },
    ),
  email: Yup.string()
    .email()
    .required(__ValidationText.requestConsultation.email.required),
  shipFirstName: Yup.string().required(
    __ValidationText.requestConsultation.firstName.required,
  ),
  shipLastName: Yup.string().required(
    __ValidationText.requestConsultation.lastName.required,
  ),
  address1: Yup.string().required(
    __ValidationText.requestConsultation.address.required,
  ),
  city: Yup.string().required(
    __ValidationText.requestConsultation.city.required,
  ),
  zipCode: Yup.string()
    .required(__ValidationText.signUp.storeCustomerAddress.postalCode.required)
    .max(
      __ValidationText.signUp.storeCustomerAddress.postalCode.maxLength,
      'Postal code must be less than 9',
    ),
  countryName: Yup.string().required(
    __ValidationText.requestConsultation.country.required,
  ),
  stateName: Yup.string().required(
    __ValidationText.requestConsultation.stateName.required,
  ),

  itemColor: Yup.string().required(
    __ValidationText.requestConsultation.itemColor.required,
  ),
  sizeQty: Yup.string().required(
    __ValidationText.requestConsultation.desiredQty.required,
  ),
  additionalComments: Yup.string().required(
    __ValidationText.requestConsultation.additionalComments.required,
  ),
  needByDate: Yup.string().required(
    __ValidationText.requestConsultation.needByDate.required,
  ),
  targetAudience: Yup.string().required(
    __ValidationText.requestConsultation.targetAudience.required,
  ),
  giveawayReason: Yup.string().required(
    __ValidationText.requestConsultation.giveAway.required,
  ),
  estimateBudget: Yup.string().required(
    __ValidationText.requestConsultation.estimateBudget.required,
  ),
});

const CustomRequestForm: React.FC = () => {
  const [initialValues, setInitialValues] = useState(_initialValues);

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, setFieldValue, errors, touched }) => {
          return (
            <Form>
              <div className='flex flex-wrap -mx-[12px] gap-y-[24px] mb-[32px]'>
                <div className='w-full lg:w-1/2 px-[12px]'>
                  <label className='mb-[4px] text-normal-text'>
                    First Name
                  </label>
                </div>
                <div className='mt-[4px]'>
                  <input
                    name='firstName'
                    type='text'
                    className='form-input !w-[calc(100%-40px)]'
                    onChange={handleChange}
                    placeholder=''
                  />
                </div>
                <ErrorMessage
                  className='text-rose-500'
                  component={'span'}
                  name={'firstName'}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
