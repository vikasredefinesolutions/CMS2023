import { paths } from '@constants/paths.constant';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { _CR5_Payload } from '@services/product';
import { CustomerProductOrder } from '@services/product.service';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import CSR5_FormSection from './Components/CSR5_FormSection';
import {
  CR5_InitialValues,
  CR5_ValidationSchema,
  description,
  formFields,
} from './CustomRequestType_5_Extras';

const CustomRequestForm_type5: React.FC = () => {
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const { setShowLoader, showModal } = useActions_v2();
  const [verifiedRecaptch, setverifiedRecaptch] = useState(false);
  const router = useRouter();

  const submitHandler = (values: any) => {
    setShowLoader(true);
    const payload: _CR5_Payload = {
      customerProductRequestModel: {
        id: 0,
        storeID: storeId!,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        inHandDate: new Date(values.inHandDate),
        shipFirstName: values.shipFirstName,
        shipLastName: values.shipLastName,
        shipAddress1: values.shipAddress1,
        shipZipCode: values.shipZipCode,
        shipCity: values.shipCity,
        shipStateId: Number(values.shipStateId),
        shipCountryId: Number(values.shipCountryId),
        requestGiveAway: values.requestGiveAway.toLowerCase() === 'true',
        targetAudience: values.targetAudience,
        budget: values.budget,
        quantity: Number(values.quantity),
        color: values.color,
        ideas: values.ideas,
        item2: values.item2,
        item3: values.item3,
        item4: values.item4,
        item5: values.item5,
        logo: values.logo,
        specialRequest: values.specialRequest,
        ...(values.beforeInHandDate && {
          beforeInHandDate: new Date(values.beforeInHandDate),
        }),
        shipAddress2: values.shipAddress2,
        reasonForGiveAwayPurpose: values.reasonForGiveAwayPurpose,
        isBeforeInHand: values.isBeforeInHand.toLowerCase() === 'true',
        // empty
        message: '',
        sport: '',
        reason: '',
        brandPreference: '',
        organizationName: '',
        itemName: '',
        additionalCommentsOrRequest: '',
        ideasParticularItemsOfInterest: '',
      },
    };
    setShowLoader(false);
    CustomerProductOrder(payload)
      .then(() => {
        router.push(paths.REQUEST_THANKYOU);
      })
      .catch(() => {
        showModal({
          message: `Something went wrong !!!`,
          title: 'Error',
        });
      })
      .finally(() => setShowLoader(false));
  };

  function onChange(value: string | null) {
    setverifiedRecaptch(value ? true : false);
  }

  return (
    <>
      <Formik
        initialValues={CR5_InitialValues}
        onSubmit={submitHandler}
        validationSchema={CR5_ValidationSchema}
        enableReinitialize={true}
      >
        {() => (
          <Form>
            <section className='pt-[40px] mb-[30px]'>
              <div className='container mx-auto'>
                <div className='text-large-text text-center uppercase font-semibold text-[#415364]'>
                  CUSTOM PROMOTIONAL PRODUCT REQUEST FORM
                </div>
              </div>
            </section>
            <section className='container mx-auto'>
              <div className='w-full mx-auto px-[40px] pb-[40px]'>
                <div className='text-[16px] leading-[22px] pb-[40px]'>
                  <p className=''>{description}</p>
                </div>
                {Object.entries(formFields).map((entry) => (
                  <CSR5_FormSection
                    type={entry[0]}
                    title={entry[0]}
                    fields={entry[1]}
                  />
                ))}
                <div className='w-full px-[15px]'>
                  <ReCAPTCHA
                    className='max-w-xs'
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHASITEKEY || ''}
                    onChange={onChange}
                  />
                </div>

                <div className='w-full lg:w-full px-[12px] text-center'>
                  <button
                    type='submit'
                    className={`btn btn-primary ${
                      verifiedRecaptch ? '' : 'opacity-50'
                    }  `}
                    disabled={!verifiedRecaptch}
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </section>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CustomRequestForm_type5;
