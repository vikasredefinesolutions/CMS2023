import RequestInput from '@appComponents/AdaAccessiblityRequestConsultation/RequestInput';
import { __pagesText } from '@constants/pages.text';
import { CommanMessage } from '@constants/successErrorMessages.constant';
import { __ValidationText } from '@constants/validation.text';
import { _ContactRequest } from '@definations/contactRequest.type';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { SendAsync } from '@utils/axios.util';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

export const RequestContactForm = () => {
  const { setShowLoader, showModal } = useActions_v2();
  const router = useRouter();

  const storeId = useTypedSelector_v2((state) => state.store.id);
  const { user } = useTypedSelector_v2((state) => state);

  const [initialValues, setinitialValues] = useState({
    name: user.customer ? user.customer.name : '',
    companyName: user.customer ? user.customer.companyName : '',
    email: user.customer ? user.customer.email : '',
    comment: router.query.name ? router.query.name : '',
  });

  useEffect(() => {
    if (user.customer) {
      setinitialValues({
        ...initialValues,
        name: user.customer.name,
        companyName: user.customer.companyName,
        email: user.customer.email,
      });
    }
  }, [user.customer]);

  const _ContactRequestSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required(__ValidationText.contactRequest.name.required)
      .min(__ValidationText.contactRequest.name.minLength)
      .max(__ValidationText.contactRequest.name.maxLength),
    companyName: Yup.string()
      .trim()
      .required(__ValidationText.contactRequest.companyName.required)
      .min(__ValidationText.contactRequest.companyName.minLength)
      .max(__ValidationText.contactRequest.companyName.maxLength),
    email: Yup.string()
      .trim()
      .email(__ValidationText.contactRequest.email.validRequest)
      .required(__ValidationText.contactRequest.email.required),
    comment: Yup.string()
      .trim()
      .required(__ValidationText.contactRequest.message.required)
      .min(__ValidationText.contactRequest.message.minLength),
  });

  const submitHandler = async (value: any) => {
    // setShowLoader(true);
    const payload: _ContactRequest = {
      contactUsModel: {
        id: 0,
        rowVersion: ' ',
        location: ' ',
        ipAddress: '192.168.1.1',
        macAddress: '00-00-00-00-00-00',
        name: value?.name,
        email: value.email,
        subject: ' ',
        companyName: value?.companyName,
        address: ' ',
        city: ' ',
        county: ' ',
        state: ' ',
        zipCode: ' ',
        phone: '',
        comment: value.comment,
        storeId: storeId,
        recStatus: ' ',
      },
    };

    const createContactUs = async (payload: _ContactRequest) => {
      setShowLoader(true);

      const url = `/ContactUs/CreateContactUs.json`;
      const res = await SendAsync({
        url: url,
        method: 'POST',
        data: payload,
      })
        .then((res) => {
          if (res) {
            showModal({
              message:
                'A dedicated member of our team will be in touch regarding your request within 2 business days.',
              title: 'THANK YOU',
            });
            window.location.reload();
          }
        })
        .catch((err) => {
          showModal({ message: CommanMessage.Failed, title: 'Failed' });
        })
        .finally(() => {
          setShowLoader(false);
        });
      return res;
    };
    createContactUs(payload);
  };

  return (
    <>
      <section className='container pl-[15px] pr-[15px] mx-auto'>
        {' '}
        <div className='max-w-6 mx-auto'>
          {/* {__pagesText.requestConsultation.heading} */}
          <div className='text-center pb-[20px]'>
            <div className='pt-[12px] pb-[12px] mx-[15px]'>
              <div className='flex flex-wrap bg-light-gray py-[15px] px-[15px]'>
                <div className='w-full pt-[15px] pl-[15px] pr-[15px] mb-[30px] text-default-text text-left'>
                  {/* //TODO:CHECK TO FETCH THIS TEXT */}
                  <p>
                    Please enter all information below and click "submit" to
                    send us your request.Someone will contact you ASAP with
                    information.
                  </p>
                  <p>
                    Driving Impressions is a leading supplier working directly
                    with ASI and PPAI distributors, along with contract print
                    and embroidery shops and other promotional product
                    resellers. We are located in East Providence, RI and have
                    full warehousing and decorating capabilities - including 18
                    heads of embroidery and heat transfer presses.
                  </p>
                  <p>If you have any questions, contact us at 888.737.4864</p>
                </div>
                <Formik
                  initialValues={initialValues}
                  onSubmit={submitHandler}
                  validationSchema={_ContactRequestSchema}
                >
                  {({ values, handleChange, setFieldValue }) => {
                    return (
                      <Form>
                        <div className=''>
                          <div className='container mx-auto'>
                            <div className='flex items-stretch flex-wrap'>
                              <div className='w-full text-left'>
                                <div className='flex flex-wrap gap-y-4'>
                                  <div className='w-full bg-light-gray text-base font-medium text-gray-700'>
                                    {' '}
                                    {
                                      __pagesText.requestConsultation
                                        .contactInformation
                                    }{' '}
                                  </div>
                                  <div className='w-full'>
                                    <label
                                      htmlFor='Your Name'
                                      className='block text-base font-medium text-gray-700'
                                    >
                                      {' '}
                                      Your Name{' '}
                                      <span className='text-red-500'>
                                        *
                                      </span>{' '}
                                    </label>
                                    <div className='w-full md:w-[50%]'>
                                      <RequestInput
                                        placeHolder={'Your Name'}
                                        name={'name'}
                                        value={values.name}
                                        onChange={handleChange}
                                        type={'text'}
                                        required={true}
                                        className='form-input'
                                      />
                                    </div>
                                  </div>
                                  <div className='w-full'>
                                    <label
                                      htmlFor='Your Email'
                                      className='block text-base font-medium text-gray-700'
                                    >
                                      {' '}
                                      Your Email{' '}
                                      <span className='text-red-500'>
                                        *
                                      </span>{' '}
                                    </label>
                                    <div className='w-full md:w-[50%]'>
                                      <RequestInput
                                        placeHolder={'Email'}
                                        name={'email'}
                                        value={values.email}
                                        onChange={handleChange}
                                        type={'text'}
                                        required={true}
                                        className={'form-input'}
                                      />
                                    </div>
                                  </div>
                                  <div className='w-full'>
                                    <label
                                      htmlFor='Company Name / ASI# or PPAI#:'
                                      className='block text-base font-medium text-gray-700'
                                    >
                                      {' '}
                                      Company Name / ASI# or PPAI#:{' '}
                                      <span className='text-red-500'>
                                        *
                                      </span>{' '}
                                    </label>
                                    <div className='w-full md:w-[50%]'>
                                      <RequestInput
                                        placeHolder={'Company'}
                                        name={'companyName'}
                                        value={values.companyName}
                                        onChange={handleChange}
                                        type={'text'}
                                        required={true}
                                        className={
                                          'text-medium-text border border-[#ababab] rounded pt-[12px] pb-[12px] pl-[12px] pr-[12px] w-full'
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className='w-full'>
                                    <label
                                      htmlFor='Message'
                                      className='block text-base font-medium text-gray-700'
                                    >
                                      {' '}
                                      Message:{' '}
                                      <span className='text-red-500'>
                                        *
                                      </span>{' '}
                                    </label>
                                    <div className='w-full'>
                                      <textarea
                                        placeholder='Message here'
                                        className='text-medium-text border border-[#ababab] rounded pt-[12px] pb-[12px] pl-[12px] pr-[12px] w-full'
                                        name={'comment'}
                                        value={values.comment}
                                        onChange={handleChange}
                                        rows={5}
                                      ></textarea>
                                    </div>
                                  </div>
                                  <div className='w-full text-left'>
                                    <button
                                      type='submit'
                                      className={'btn btn-primary mb-[15px]'}
                                    >
                                      {' '}
                                      SUBMIT{' '}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
