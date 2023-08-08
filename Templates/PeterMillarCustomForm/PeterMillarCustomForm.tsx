import {
  PTML_STORE_CODE,
  phonePattern1,
  phonePattern2,
  phonePattern3,
  phonePattern4,
} from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import {
  addressMessages,
  checkoutNewAccountPasswordMessages,
} from '@constants/successErrorMessages.constant';
import { __ValidationText } from '@constants/validation.text';
import getLocation from '@helpers/getLocation';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import {
  FetchCountriesList,
  FetchStatesList,
  customRequestPetermillar,
} from '@services/general.service';
import { getLocationWithZipCode } from '@services/user.service';
import { Form, Formik, FormikValues } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Input from './Components/Input';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.firstName.required)
    .min(__ValidationText.requestConsultation.firstName.minLength)
    .max(__ValidationText.requestConsultation.firstName.maxLength),
  lastName: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.lastName.required)
    .min(__ValidationText.requestConsultation.lastName.minLength)
    .max(__ValidationText.requestConsultation.lastName.maxLength),
  companyName: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.companyName.required)
    .min(__ValidationText.requestConsultation.companyName.minLength)
    .max(__ValidationText.requestConsultation.companyName.maxLength),
  jobTitle: Yup.string().required(
    __ValidationText.requestConsultation.jobTitle.required,
  ),
  email: Yup.string()
    .trim()
    .email(__ValidationText.requestConsultation.email.validRequest)
    .required(__ValidationText.requestConsultation.email.required),
  password: Yup.string()
    .trim()
    .min(6, checkoutNewAccountPasswordMessages.password.min)
    .required(checkoutNewAccountPasswordMessages.password.required),
  confirmPassword: Yup.string()
    .required(checkoutNewAccountPasswordMessages.passwordConfirmation.required)
    .oneOf(
      [Yup.ref('password'), null],
      checkoutNewAccountPasswordMessages.passwordConfirmation.mustMatch,
    ),
  phone: Yup.string()
    .required(__ValidationText.requestConsultation.phone.required)
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
  address1: Yup.string()
    .trim()
    .required(addressMessages.shippingAddress.required),
  country: Yup.string().trim().required(addressMessages.countryName.required),
  city: Yup.string().trim().required(addressMessages.city.required),
  state: Yup.string().trim().required(addressMessages.state.required),
  zipcode: Yup.string()
    .trim()
    .required(addressMessages.postalCode.required)
    .max(
      __ValidationText.signUp.storeCustomerAddress.postalCode.maxLength,
      'Postal code must be less than 9',
    ),
  inHandDate: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.inHandDate.required),
  purpose: Yup.string().required(
    __ValidationText.requestConsultation.purpose.required,
  ),
});

const PeterMillarCustomForm = () => {
  const [countryList, setCountryList] = useState<
    {
      id: number;
      label: string;
      value: string;
    }[]
  >([]);

  const [stateList, setStateList] = useState<
    {
      id: number;
      label: string;
      value: string;
    }[]
  >([]);

  const router = useRouter();

  const { setShowLoader, showModal } = useActions_v2();
  const { id: customerId } = useTypedSelector_v2((state) => state.user);

  const intrestOptions = [
    { label: 'Quarter Zips & Pullovers', value: 'quarterZipsAndPullovers' },
    { label: 'Polos', value: 'polos' },
    { label: 'Vests', value: 'vests' },
    { label: 'Jackets', value: 'jackets' },
    { label: 'Accessories', value: 'accessories' },
    { label: 'Others', value: 'others' },
  ];
  const initialValues = {
    firstName: '',
    lastName: '',
    companyName: '',
    jobTitle: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    address1: '',
    address2: '',
    zipcode: '',
    city: '',
    state: '',
    country: '',
    purpose: '',
    inHandDate: '',
    styleOfIntrest: [],
    comment: '',
  };

  useEffect(() => {
    FetchCountriesList().then((res) => {
      if (res?.length) {
        setCountryList(
          res.map((value) => ({
            id: value.id,
            label: value.name,
            value: value.name,
          })),
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStates = async (country: string) => {
    const countryId = countryList.find((cntry) => cntry.value === country);
    if (countryId) {
      FetchStatesList(countryId.id).then((res) => {
        if (res?.length) {
          setStateList(
            res.map((value) => ({
              id: value.id,
              label: value.name,
              value: value.name,
            })),
          );
        }
      });
    }
  };

  const postalCodeHandler = (
    zipCode: string,
    setFieldValue: (field: string, value: string) => void,
  ) => {
    if (zipCode.trim().length === 0) return;

    setShowLoader(true);
    getLocationWithZipCode(zipCode)
      .then(async (res) => {
        if (!res) return;
        // City
        if (res.cityName) {
          setFieldValue('city', res.cityName);
        }

        // Country
        if (res.countryId && res.countryName) {
          setFieldValue('country', res.countryName);
        }

        // State
        if (res.stateName) {
          if (!stateList.length) {
            await fetchStates(res.countryName);
          }
          setFieldValue('state', res.stateName);
        }
      })
      .finally(() => setShowLoader(false));
  };

  const handleSubmit = async (values: FormikValues) => {
    try {
      const styleOfIntrest = new Set(values.styleOfIntrest);
      const location = await getLocation();
      setShowLoader(true);
      const payload = {
        customerRequestModel: {
          recStatus: 'A',
          createdDate: new Date(),
          createdBy: 0,
          modifiedDate: new Date(),
          modifiedBy: 0,
          rowVersion: '',
          location: location.country,
          ipAddress: location.ip_address,
          macAddress: '',
          id: 0,
          customerId: customerId || 0,
          storeId: PTML_STORE_CODE,
          firstname: values.firstName,
          lastname: values.lastName,
          companyId: 1,
          jobTitle: values.jobTitle,
          email: values.email,
          phoneNumber: values.phone,
          password: values.password,
          confirmPassword: values.confirmPassword,
          shippingAddress: values.address1,
          shippingAddressLine2: values.address2,
          zipCode: values.zipcode,
          city: values.city,
          state: values.state,
          country: values.country,
          porposeOfOrder: values.purpose,
          inHandDate: new Date(values.inHandDate),
          additionalComments: values.comment,
          quarterZipsAndPullovers: styleOfIntrest.has('quarterZipsAndPullovers')
            ? 'quarterZipsAndPullovers'
            : '',
          polos: styleOfIntrest.has('polos') ? 'polos' : '',
          vests: styleOfIntrest.has('vests') ? 'vests' : '',
          jackets: styleOfIntrest.has('jackets') ? 'jackets' : '',
          accessories: styleOfIntrest.has('accessories') ? 'accessories' : '',
          others: styleOfIntrest.has('others') ? 'others' : '',
        },
      };

      await customRequestPetermillar(payload);
      setShowLoader(false);
      router.push(paths.PETERMILLAR.THANK_YOU);
    } catch (error) {
      setShowLoader(false);
      showModal({
        title: 'Error',
        message: 'Something went wrong.',
      });
    }
  };
  return (
    <section className='pt-[35px] pb-[35px]'>
      <div className='container mx-auto'>
        <div className='max-w-[800px] bg-white mx-auto pt-[35px] pb-[35px] pl-[26px] sm:pl-[44px] lg:pl-[70px] pr-[26px] sm:pr-[44px] lg:pr-[70px]'>
          <div className='w-full text-title-text mb-[20px]'>
            Create Your Corporate Gear Account
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ values, handleChange, setFieldValue }) => {
              return (
                <Form>
                  <div className='flex-wrap grid grid-cols-1 md:grid-cols-2 md:gap-x-[70px] gap-x-[10px] gap-y-[15px]'>
                    <Input
                      label='First Name'
                      isRequired
                      name='firstName'
                      value={values.firstName}
                      onChange={handleChange}
                    />
                    <Input
                      label='Last Name'
                      isRequired
                      name='lastName'
                      value={values.lastName}
                      onChange={handleChange}
                    />
                    <Input
                      label='Company Name'
                      isRequired
                      name='companyName'
                      value={values.companyName}
                      onChange={handleChange}
                    />

                    <Input
                      label='Job Title'
                      isRequired
                      name='jobTitle'
                      value={values.jobTitle}
                      onChange={handleChange}
                    />

                    <Input
                      label='Email'
                      isRequired
                      name='email'
                      value={values.email}
                      onChange={handleChange}
                    />

                    <Input
                      label='Phone Number'
                      isRequired
                      name='phone'
                      value={values.phone}
                      onChange={handleChange}
                    />

                    <Input
                      label='Password'
                      isRequired
                      name='password'
                      value={values.password}
                      onChange={handleChange}
                    />
                    <Input
                      label='Confirm Password'
                      isRequired
                      name='confirmPassword'
                      value={values.confirmPassword}
                      onChange={handleChange}
                    />
                    <Input
                      label='Shipping Address'
                      isRequired
                      name='address1'
                      value={values.address1}
                      onChange={handleChange}
                    />

                    <Input
                      label='Shipping Address Line 2'
                      isRequired={false}
                      name='address2'
                      value={values.address2}
                      onChange={handleChange}
                    />
                    <Input
                      label='Zip Code'
                      isRequired
                      name='zipcode'
                      value={values.zipcode}
                      onChange={handleChange}
                      onBlur={(e) => {
                        postalCodeHandler(e?.target?.value, setFieldValue);
                      }}
                    />

                    <Input
                      label='City'
                      isRequired
                      name='city'
                      value={values.city}
                      onChange={handleChange}
                    />
                    <Input
                      label='State'
                      isRequired
                      name='state'
                      value={values.state}
                      onChange={handleChange}
                      type='select'
                      selectOptions={stateList}
                    />

                    <Input
                      label='Country'
                      isRequired
                      name='country'
                      value={values.country}
                      onChange={(e) => {
                        handleChange(e);
                        fetchStates(e?.target?.value);
                      }}
                      type='select'
                      selectOptions={countryList}
                    />

                    <div className='col-span-1'>
                      <Input
                        label='Purpose of Order'
                        isRequired
                        name='purpose'
                        value={values.purpose}
                        onChange={handleChange}
                        className='mb-[15px]'
                      />

                      <Input
                        label='In-Hand Date'
                        isRequired
                        name='inHandDate'
                        value={values.inHandDate}
                        onChange={handleChange}
                        className='mb-[15px]'
                        placeholder='mm/dd/yyyy'
                        innerClass='flex items-center'
                        type='date'
                        
                      />
                    </div>
                    <Input
                      label='Styles of Interest'
                      isRequired={false}
                      name='styleOfIntrest'
                      value={values.styleOfIntrest}
                      type='options'
                      intrestOptions={intrestOptions}
                      onChange={handleChange}
                    />

                    <Input
                      label='Additional Comments'
                      isRequired={false}
                      name='comment'
                      value={values.comment}
                      onChange={handleChange}
                      type='textarea'
                    />
                    <div className='col-span-1 md:col-span-2'>
                      <button className='btn btn-primary btn-md' type='submit'>
                        SUBMIT
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default PeterMillarCustomForm;
