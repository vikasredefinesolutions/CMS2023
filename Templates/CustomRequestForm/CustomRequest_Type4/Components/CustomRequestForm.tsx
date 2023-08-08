import {
  phonePattern1,
  phonePattern2,
  phonePattern3,
  phonePattern4,
} from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import { __ValidationText } from '@constants/validation.text';
import { consultationProofMessages } from '@constants/validationMessages';
import { _Country, _State } from '@definations/app.type';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { FetchCountriesList, FetchStatesList } from '@services/general.service';
import { _CustomerOrderPayload } from '@services/product';
import { CustomerProductOrder } from '@services/product.service';
import { getLocationWithZipCode } from '@services/user.service';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

const _initialValues = {
  firstName: '',
  lastName: '',
  organizationName: '',
  phone: '',
  email: '',
  shipFirstName: '',
  shipLastName: '',
  eventName: '',
  address1: '',
  address2: '',
  city: '',
  zipCode: '',
  countryName: 0,
  stateName: 0,
  itemName: '',
  itemColor: '',
  sizeQty: '',
  inHandDate: '',
  additionalComments: '',
  beforeInHandDate: '',
  item2: '',
  item3: '',
  item4: '',
  item5: '',
  specialRequest: '',
  targetAudience: '',
  giveawayReason: '',
  estimateBudget: '',
  checked: [],
  requestForGiveAway: '',
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.firstName.required)
    .min(
      consultationProofMessages.firstName.minLength,
      consultationProofMessages.firstName.minValidation,
    ),
  lastName: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.lastName.required)
    .min(
      consultationProofMessages.lastName.minLength,
      consultationProofMessages.lastName.minValidation,
    ),

  phone: Yup.string()
    .trim()
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
    .trim()
    .email()
    .required(__ValidationText.requestConsultation.email.required),
  shipFirstName: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.firstName.required),
  shipLastName: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.lastName.required),
  address1: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.address.required),
  city: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.city.required),
  zipCode: Yup.string()
    .trim()
    .required(__ValidationText.signUp.storeCustomerAddress.postalCode.required)
    .max(
      __ValidationText.signUp.storeCustomerAddress.postalCode.maxLength,
      'Postal code must be less than 9',
    ),
  countryName: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.country.required),
  stateName: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.stateName.required),

  itemColor: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.itemColor.required),
  sizeQty: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.desiredQty.required),
  additionalComments: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.additionalComments.required),
  needByDate: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.needByDate.required),
  targetAudience: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.targetAudience.required),
  giveawayReason: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.giveAway.required),
  estimateBudget: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.estimateBudget.required),
  requestForGiveAway: Yup.string().trim().required(),
  eventName: Yup.string().when('requestForGiveAway', {
    is: 'yes',
    then: Yup.string()
      .trim()
      .required(__ValidationText.requestConsultation.event.required),
  }),
});

const CustomRequestForm_type4: React.FC = () => {
  const [initialValues, setInitialValues] = useState(_initialValues);
  const [state, setState] = useState<_State[]>([]);
  const [country, setCountry] = useState<_Country[]>([]);
  const [additionalText, showAdditionalText] = useState<boolean>(false);
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const { setShowLoader, showModal } = useActions_v2();

  const router = useRouter();

  useEffect(() => {
    FetchCountriesList().then((res) => {
      setCountry(res ? res : []);
      FetchStatesList(res ? res[0].id : 0).then((res) => {
        setState(res ? res : []);
      });
    });
  }, []);

  const customChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  ) => {
    handleChange(e);
    const countryId = +e.target[e.target.selectedIndex].id;
    FetchStatesList(countryId).then((res) => {
      setState(res ? res : []);
    });
  };

  const customHandleBlur = async (
    e: React.ChangeEvent<HTMLInputElement>,
    handleBlur: any,
    setFieldValue: any,
  ) => {
    e.preventDefault();
    // handleBlur(e);
    const res = await getLocationWithZipCode(e.target.value);
    if (res?.countryId) {
      setFieldValue('stateName', res.stateId);
      setFieldValue('countryName', res.countryId);
      setFieldValue('city', res.cityName);
    }
    return;
  };

  const submitHandler = (values: any) => {
    setShowLoader(true);
    const payload2: _CustomerOrderPayload = {
      customerProductRequestModel: {
        id: 0,
        storeID: storeId!,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        inHandDate: new Date(values.needByDate),
        shipFirstName: values.shipFirstName,
        shipLastName: values.shipLastName,
        shipAddress1: values.address1,
        shipZipCode: values.zipCode,
        shipCity: values.city,
        shipStateId: Number(values.stateName),
        shipCountryId: Number(values.countryName),
        requestGiveAway: values.requestForGiveAway === 'yes' ? true : false,
        eventName: values.requestForGiveAway === 'yes' ? values.eventName : '',
        targetAudience: values.targetAudience,
        reason: '',
        budget: 0,
        quantity: Number(values.sizeQty),
        color: values.itemColor,
        ideas: '',
        item2: values.item2,
        item3: values.item3,
        item4: values.item4,
        item5: values.item5,
        logo: '',
        specialRequest: values.additionalComments,
        itemName: values.itemName,
        beforeInHandDate:
          values.beforeInHandDate === 'Yes' ? new Date(values.beforeDate) : '',
        shipAddress2: values.address2,
        organizationName: '',
        reasonForGiveAwayPurpose: values.giveawayReason,
        ideasParticularItemsOfInterest: values.specialRequest,
        isDesiredBrandingUnitiLogo: false,
        isDesiredBrandingOtherExistingLogo: false,
        isDesiredBrandingNewLogoOrGraphic: false,
        isBeforeInHand: values.beforeInHandDate === 'Yes' ? true : false,
        additionalCommentsOrRequest: '',
        message: '',
        sport: '',
        brandPreference: '',
      },
    };
    // console.log(payload2, 'payload2');
    CustomerProductOrder(payload2)
      .then(() => {
        setInitialValues(_initialValues);
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

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => submitHandler(values)}
        enableReinitialize
        validationSchema={validationSchema}
      >
        {({ values, handleChange, setFieldValue, handleBlur, ...rest }) => {
          // console.log(rest, 'beforeDateVALUEEEEE');
          return (
            <Form>
              <div className='flex flex-wrap -mx-[12px] gap-y-[24px] mb-[32px]'>
                <div className='w-full lg:w-1/2 px-[12px]'>
                  <label className='mb-[4px] text-normal-text'>
                    First Name <span className='text-rose-500'>*</span>
                  </label>
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

                <div className='w-full lg:w-1/2 px-[12px]'>
                  <label className='mb-[4px] text-normal-text'>
                    Last Name <span className='text-rose-500'>*</span>
                  </label>
                  <div className='mt-[4px]'>
                    <input
                      name='lastName'
                      type='text'
                      className='form-input !w-[calc(100%-40px)]'
                      onChange={handleChange}
                      placeholder=''
                    />
                  </div>
                  <ErrorMessage
                    className='text-rose-500'
                    component={'span'}
                    name={'lastName'}
                  />
                </div>

                <div className='w-full lg:w-1/2 px-[12px]'>
                  <label className='mb-[4px] text-normal-text'>
                    Email <span className='text-rose-500'>*</span>
                  </label>
                  <div className='mt-[4px]'>
                    <input
                      name='email'
                      type='email'
                      className='form-input !w-[calc(100%-40px)]'
                      onChange={handleChange}
                      placeholder=''
                    />
                  </div>
                  <ErrorMessage
                    className='text-rose-500'
                    component={'span'}
                    name={'email'}
                  />
                </div>

                <div className='w-full lg:w-1/2 px-[12px]'>
                  <label className='mb-[4px] text-normal-text'>
                    Phone Number <span className='text-rose-500'>*</span>
                  </label>
                  <div className='mt-[4px]'>
                    <input
                      name='phone'
                      type='number'
                      className='form-input !w-[calc(100%-40px)]'
                      onChange={handleChange}
                      placeholder=''
                    />
                  </div>
                  <ErrorMessage
                    className='text-rose-500'
                    component={'span'}
                    name={'phone'}
                  />
                </div>

                <div className='w-full lg:w-1/2 px-[12px]'>
                  <label className='mb-[4px] text-normal-text'>
                    In-hand Date <span className='text-rose-500'>*</span>
                  </label>
                  <div className='mt-[4px]'>
                    <input
                      name='needByDate'
                      type='date'
                      className='form-input !w-[calc(100%-40px)]'
                      onChange={handleChange}
                      placeholder=''
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <ErrorMessage
                    className='text-rose-500'
                    component={'span'}
                    name={'needByDate'}
                  />
                </div>

                <div className='w-full lg:w-1/2 px-[12px]'>
                  <label className='mb-[4px] text-normal-text'>
                    Can this arrive before the in-hand date?
                  </label>
                  <div className='mt-[4px]'>
                    <div className='form-group'>
                      <label className='radio-inline mr-1 last:mr-0'>
                        <input
                          type='radio'
                          name='beforeInHandDate'
                          value='Yes'
                          onChange={handleChange}
                        />{' '}
                        <span>Yes</span>
                      </label>

                      <label className='radio-inline mr-1 last:mr-0'>
                        <input
                          type='radio'
                          name='beforeInHandDate'
                          value='No'
                          onChange={handleChange}
                        />{' '}
                        <span>No</span>
                      </label>
                    </div>
                    <div className='form-group'>
                      <div className='mt-[4px]'>
                        {values.beforeInHandDate === 'Yes' ? (
                          <div className='mt-[4px]'>
                            <input
                              name='beforeDate'
                              type='date'
                              className='form-input !w-[calc(100%-40px)]'
                              onChange={handleChange}
                              placeholder=''
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='text-xl md:text-2xl lg:text-sub-title font-sub-title text-color-sub-title pb-[8px] mb-[16px]'>
                Ship to Address
              </div>

              <div className='flex flex-wrap -mx-[12px] gap-y-[24px] mb-[32px]'>
                <div className='w-full lg:w-1/2 px-[12px]'>
                  <label className='mb-[4px] text-normal-text'>
                    First Name <span className='text-rose-500'>*</span>
                  </label>
                  <div className='mt-[4px]'>
                    <input
                      name='shipFirstName'
                      type='text'
                      className='form-input !w-[calc(100%-40px)]'
                      onChange={handleChange}
                      placeholder=''
                    />
                  </div>
                  <ErrorMessage
                    className='text-rose-500'
                    component={'span'}
                    name={'shipFirstName'}
                  />
                </div>

                <div className='w-full lg:w-1/2 px-[12px]'>
                  <label className='mb-[4px] text-normal-text'>
                    Last Name <span className='text-rose-500'>*</span>
                  </label>
                  <div className='mt-[4px]'>
                    <input
                      name='shipLastName'
                      type='text'
                      className='form-input !w-[calc(100%-40px)]'
                      onChange={handleChange}
                      placeholder=''
                    />
                  </div>
                  <ErrorMessage
                    className='text-rose-500'
                    component={'span'}
                    name={'shipLastName'}
                  />
                </div>

                <div className='w-full lg:w-1/2 px-[12px]'>
                  <label className='mb-[4px] text-normal-text'>
                    Address 1 <span className='text-rose-500'>*</span>
                  </label>
                  <div className='mt-[4px]'>
                    <input
                      name='address1'
                      type='text'
                      className='form-input !w-[calc(100%-40px)]'
                      onChange={handleChange}
                      placeholder=''
                    />
                  </div>
                  <ErrorMessage
                    className='text-rose-500'
                    component={'span'}
                    name={'address1'}
                  />
                </div>

                <div className='w-full lg:w-1/2 px-[12px]'>
                  <label className='mb-[4px] text-normal-text'>Address 2</label>
                  <div className='mt-[4px]'>
                    <input
                      name='address2'
                      type='text'
                      className='form-input !w-[calc(100%-40px)]'
                      onChange={handleChange}
                      placeholder=''
                    />
                  </div>
                </div>

                <div className='w-full lg:w-1/2 px-[12px]'>
                  <label className='mb-[4px] text-normal-text'>
                    Zip Code <span className='text-rose-500'>*</span>
                  </label>
                  <div className='mt-[4px]'>
                    <input
                      name='zipCode'
                      type='text'
                      className='form-input !w-[calc(100%-40px)]'
                      onChange={handleChange}
                      onBlur={(e) => {
                        customHandleBlur(e, handleBlur, setFieldValue);
                      }}
                      placeholder=''
                    />
                  </div>
                  <ErrorMessage
                    className='text-rose-500'
                    component={'span'}
                    name={'zipCode'}
                  />
                </div>

                <div className='w-full lg:w-1/2 px-[12px]'>
                  <label className='mb-[4px] text-normal-text'>
                    City <span className='text-rose-500'>*</span>
                  </label>
                  <div className='mt-[4px]'>
                    <input
                      name='city'
                      type='text'
                      value={values.city}
                      className='form-input !w-[calc(100%-40px)]'
                      onChange={handleChange}
                      placeholder=''
                    />
                  </div>
                  <ErrorMessage
                    className='text-rose-500'
                    component={'span'}
                    name={'city'}
                  />
                </div>

                <div className='w-full lg:w-1/2 px-[12px]'>
                  <label className='mb-[4px] text-normal-text'>
                    Country <span className='text-rose-500'>*</span>
                  </label>
                  <div className='mt-[4px]'>
                    <select
                      name='countryName'
                      className='form-input !w-[calc(100%-40px)]'
                      value={values.countryName}
                      onChange={(e) => customChangeHandler(e, handleChange)}
                    >
                      {country &&
                        country.map((res, index) => (
                          <option
                            key={index}
                            value={res.id}
                            id={res.id.toString()}
                          >
                            {res?.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <ErrorMessage
                    className='text-rose-500'
                    component={'span'}
                    name={'countryName'}
                  />
                </div>

                <div className='w-full lg:w-1/2 px-[12px]'>
                  <label className='mb-[4px] text-normal-text'>
                    State <span className='text-rose-500'>*</span>
                  </label>
                  <div className='mt-[4px]'>
                    <select
                      className='form-input !w-[calc(100%-40px)]'
                      name='stateName'
                      value={values.stateName}
                      onChange={handleChange}
                    >
                      {state &&
                        state.map((res, index) => (
                          <option
                            key={index}
                            id={res.id.toString()}
                            value={res.id}
                          >
                            {res?.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <ErrorMessage
                    className='text-rose-500'
                    component={'span'}
                    name={'stateName'}
                  />
                </div>

                <div className='w-full px-[12px]'>
                  <label className='mb-[4px] text-normal-text'>
                    Desired branding on item(s) (select all that apply) :
                  </label>
                  <div className='mt-[4px]'>
                    <div>
                      <label>
                        <Field
                          type='checkbox'
                          name='checked'
                          value='Uniti logo'
                        />{' '}
                        <span>Uniti logo</span>
                      </label>
                    </div>

                    <div>
                      <label>
                        <Field
                          type='checkbox'
                          name='checked'
                          value='Other existing logo (team logo, etc.)'
                        />{' '}
                        <span>Other existing logo (team logo, etc.)</span>
                      </label>
                    </div>

                    <div>
                      <label>
                        <Field
                          type='checkbox'
                          name='checked'
                          value='A new logo or graphic that has not been created yet.'
                          onClick={() => {
                            showAdditionalText(!additionalText);
                          }}
                        />{' '}
                        <span>
                          A new logo or graphic that has not been created yet.
                        </span>
                      </label>
                    </div>
                  </div>
                  {additionalText && (
                    <p>
                      If you have not done so already, please complete{' '}
                      <a
                        href={`https://nam11.safelinks.protection.outlook.com/?url=https%3A%2F%2Fapp.smartsheet.com%2Fb%2Fform%2F70e289aba0ca47aaa2dd74dbed1ec360&amp;data=05%7C01%7Chclarke%40parsonskellogg.com%7C4475c73711b844837b0b08db62da79e8%7Cc93df08a282d4d69b1893b021ad6218e%7C0%7C0%7C638212462724950344%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000%7C%7C%7C&amp;sdata=PEJaTxvOpZhTtw66pYnKrk%2BVTzU2QLhX%2BhEaI5oEWEE%3D&amp;reserved=0`}
                      >
                        {' '}
                        this creative services form
                      </a>{' '}
                      to initiate the design process.
                    </p>
                  )}
                </div>
              </div>

              <div className='text-xl md:text-2xl lg:text-sub-title font-sub-title text-color-sub-title pb-[8px] mb-[16px]'>
                Item Request
              </div>

              <div className='flex flex-wrap -mx-[12px] gap-y-[24px] mb-[32px]'>
                <div className='w-full lg:w-full px-[12px]'>
                  <label className='mb-[4px] text-normal-text'>
                    Is this request for giveaways associated with an event? :{' '}
                    <span className='text-rose-500'>*</span>
                  </label>
                  <div className='mt-[4px]'>
                    <div className='form-group'>
                      <label className='radio-inline mr-1 last:mr-0'>
                        <input
                          type='radio'
                          name='requestForGiveAway'
                          value={'yes'}
                          onChange={handleChange}
                        />{' '}
                        <span>Yes</span>
                      </label>

                      <label className='radio-inline mr-1 last:mr-0'>
                        <input
                          type='radio'
                          name='requestForGiveAway'
                          onChange={handleChange}
                          value={'no'}
                        />{' '}
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                  <ErrorMessage
                    className='text-rose-500'
                    component={'span'}
                    name={'requestForGiveAway'}
                  />
                </div>
                {values.requestForGiveAway === 'yes' ? (
                  <div className='w-full lg:w-full'>
                    <label className='mb-[4px] text-normal-text lg:w-1/2 px-[12px]'>
                      If yes, please specify the event name:
                      <span className='text-rose-500'>*</span>
                    </label>
                    <div className='mt-[4px] lg:w-1/2 px-[12px]'>
                      <input
                        name='eventName'
                        type='text'
                        className='form-input !w-[calc(100%-40px)]'
                        onChange={handleChange}
                      />
                    </div>
                    <ErrorMessage
                      className='text-rose-500 px-[12px]'
                      component={'span'}
                      name={'eventName'}
                    />
                  </div>
                ) : (
                  ''
                )}

                <div className='w-full lg:w-full'>
                  <label className='mb-[4px] text-normal-text lg:w-1/2 px-[12px]'>
                    Target audience/end user:{' '}
                    <span className='text-rose-500'>*</span>
                  </label>
                  <div className='mt-[4px] lg:w-1/2 px-[12px]'>
                    <input
                      name='targetAudience'
                      type='text'
                      className='form-input !w-[calc(100%-40px)]'
                      onChange={handleChange}
                    />
                  </div>
                  <ErrorMessage
                    className='text-rose-500 px-[12px]'
                    component={'span'}
                    name={'targetAudience'}
                  />
                </div>

                <div className='w-full lg:w-full'>
                  <label className='mb-[4px] text-normal-text lg:w-1/2 px-[12px]'>
                    Reason for order/purpose for giveaways:{' '}
                    <span className='text-rose-500'>*</span>
                  </label>
                  <div className='mt-[4px] lg:w-1/2 px-[12px]'>
                    <input
                      name='giveawayReason'
                      type='text'
                      className='form-input !w-[calc(100%-40px)]'
                      onChange={handleChange}
                    />
                  </div>
                  <ErrorMessage
                    className='text-rose-500 px-[12px]'
                    component={'span'}
                    name={'giveawayReason'}
                  />
                </div>

                <div className='w-full lg:w-1/2 px-[12px]'>
                  <label className='mb-[4px] text-normal-text'>
                    Estimated Budget: <span className='text-rose-500'>*</span>
                  </label>
                  <div className='mt-[4px] '>
                    <input
                      name='estimateBudget'
                      type='number'
                      className='form-input !w-[calc(100%-40px)]'
                      min='0'
                      onKeyDown={(event) =>
                        ['e', 'E', '+', '-', '.'].includes(event.key) &&
                        event.preventDefault()
                      }
                      onChange={handleChange}
                    />
                  </div>
                  <ErrorMessage
                    className='text-rose-500'
                    component={'span'}
                    name={'estimateBudget'}
                  />
                </div>

                <div className='w-full lg:w-1/2 px-[12px]'>
                  <label className='mb-[4px] text-normal-text '>
                    Quantity needed: <span className='text-rose-500'>*</span>
                  </label>
                  <div className='mt-[4px]'>
                    <input
                      name='sizeQty'
                      type='number'
                      className='form-input !w-[calc(100%-40px)]'
                      min='0'
                      onKeyDown={(event) =>
                        ['e', 'E', '+', '-', '.'].includes(event.key) &&
                        event.preventDefault()
                      }
                      onChange={handleChange}
                    />
                  </div>
                  <ErrorMessage
                    className='text-rose-500'
                    component={'span'}
                    name={'sizeQty'}
                  />
                </div>

                <div className='w-full lg:w-1/2 px-[12px]'>
                  <label className='mb-[4px] text-normal-text '>
                    Color preference:
                  </label>
                  <div className='mt-[4px]'>
                    <input
                      name='itemColor'
                      type='text'
                      className='form-input !w-[calc(100%-40px)]'
                      onChange={handleChange}
                    />
                  </div>
                  <div className='mt-[4px] text-rose-500'>
                    Please choose brand colors (whites, greys, blues and black)
                    unless another color has been approved by the brand team.{' '}
                  </div>
                  <ErrorMessage
                    className='text-rose-500'
                    component={'span'}
                    name={'itemColor'}
                  />
                </div>

                <div className='w-full lg:w-full px-[12px]'>
                  <label className='mb-[4px] text-normal-text'>
                    Ideas/particular items of interest:{' '}
                    <span className='text-rose-500'>*</span>
                  </label>
                  <div className='mt-[4px]'>
                    <textarea
                      className='form-input resize-none !px-5 !w-[calc(100%-40px)]'
                      name='additionalComments'
                      placeholder='Additional Comments'
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <ErrorMessage
                  className='text-rose-500 px-[12px]'
                  component={'span'}
                  name={'additionalComments'}
                />
              </div>

              <div className='text-xl md:text-2xl lg:text-sub-title font-sub-title text-color-sub-title pb-[8px] mb-[16px]'>
                Additional Requests
              </div>

              <div className='flex flex-wrap -mx-[12px] gap-y-[24px] mb-[32px]'>
                <div className='w-full lg:w-1/2 px-[12px]'>
                  <label className='mb-[4px] text-normal-text'>Item 2</label>
                  <div className='mt-[4px]'>
                    <input
                      type='text'
                      name='item2'
                      placeholder='Item 2'
                      className='form-input !w-[calc(100%-40px)]'
                    />
                  </div>
                </div>

                <div className='w-full lg:w-1/2 px-[12px]'>
                  <label className='mb-[4px] text-normal-text'>Item 3</label>
                  <div className='mt-[4px]'>
                    <input
                      type='text'
                      name='item3'
                      placeholder='Item 3'
                      className='form-input !w-[calc(100%-40px)]'
                    />
                  </div>
                </div>

                <div className='w-full lg:w-1/2 px-[12px]'>
                  <label className='mb-[4px] text-normal-text'>Item 4</label>
                  <div className='mt-[4px]'>
                    <input
                      type='text'
                      name='item4'
                      placeholder='Item 4'
                      className='form-input !w-[calc(100%-40px)]'
                    />
                  </div>
                </div>

                <div className='w-full lg:w-1/2 px-[12px]'>
                  <label className='mb-[4px] text-normal-text'>Item 5</label>
                  <div className='mt-[4px]'>
                    <input
                      type='text'
                      name='item5'
                      placeholder='Item 5'
                      className='form-input !w-[calc(100%-40px)]'
                    />
                  </div>
                </div>

                <div className='w-full lg:w-1/2 px-[12px]'>
                  <label className='mb-[4px] text-normal-text'>
                    Special request/notes
                  </label>
                  <div className='mt-[4px]'>
                    <input
                      type='text'
                      name='specialRequest'
                      placeholder='Special Request/notes'
                      className='form-input !w-[calc(100%-40px)]'
                    />
                  </div>
                </div>
              </div>

              <div className='w-full lg:w-full px-[12px] text-center'>
                <button type='submit' className='btn btn-secondary btn-md'>
                  Submit
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default CustomRequestForm_type4;
