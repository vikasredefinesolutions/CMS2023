import { UserAddressType } from '@constants/enum';
import {
  __Cookie,
  __Cookie_Expiry,
  __UserMessages,
} from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import { _Industry } from '@definations/app.type';
import {
  KlaviyoScriptTag,
  deleteCookie,
  extractCookies,
  setCookie,
} from '@helpers/common.helper';
import getLocation from '@helpers/getLocation';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { updateCartByNewUserId } from '@services/cart.service';
import {
  FetchCountriesList,
  FetchIndustriesList,
  FetchStatesList,
} from '@services/general.service';
import { _CreateNewAccount_Payload } from '@services/payloads/createNewAccount.payload';
import {
  CreateNewAccount,
  GetStoreCustomer,
  getLocationWithZipCode,
  signInUser,
} from '@services/user.service';
import { getWishlist } from '@services/wishlist.service';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  _SU2_InitialValues,
  _Signup2Schema,
  su2_initialValues,
} from './SU2.extras';

const SignUp_type2: React.FC = () => {
  const router = useRouter();

  const [industries, setIndustries] = useState<_Industry[]>([]);
  const [countries, setCountries] = useState<_Industry[]>([]);
  const [states, setStates] = useState<_Industry[]>([]);
  const [countryChange, setCoutryChange] = useState<number>(0);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const customerId = useTypedSelector_v2((state) => state.user.id);

  const {
    showModal,
    updateWishListData,
    setShowLoader,
    updateCustomer,
    logInUser,
  } = useActions_v2();

  const handleFormikSubmit = async (values: _SU2_InitialValues) => {
    const location = await getLocation();
    const payload: _CreateNewAccount_Payload = {
      storeCustomerModel: {
        id: 0,
        rowVersion: '',
        location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
        ipAddress: `${location.ip_address}`,
        macAddress: '00-00-00-00-00-00',
        firstname: `${values.firstname}`,
        lastName: `${values.lastName}`,
        email: `${values.email}`,
        password: `${values.password}`,
        confirmPassword: `${values.password}`,
        companyName: `${values.organizationName}`,
        jobTitle: `${values.jobTitle}`,
        companyId: 0,
        sharedCustomerId: 0,
        navCustomerId: '',
        customerType: '',
        storeId: storeId,
        isTaxableuser: false,
        storeCustomerAddress: [
          {
            id: 0,
            rowVersion: '',
            location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
            ipAddress: `${location.ip_address}`,
            macAddress: '00-00-00-00-00-00',
            customerId: 0,
            firstname: `${values.firstname}`,
            lastName: `${values.lastName}`,
            companyName: `${values.organizationName}`,
            email: `${values.email}`,
            address1: '',
            address2: '',
            suite: '',
            city: `${values.cityName}`,
            state: `${values.state}`,
            postalCode: `${values.zipCode}`,
            phone: `${values.phoneNumber}`,
            fax: '',
            countryName: `${values.country}`,
            countryCode: '',
            addressType: UserAddressType.BILLINGADDRESS,
            isDefault: false,
            recStatus: 'A',
          },
        ],
        recStatus: 'A',
        industryId: 0,
        gender: '',
        memberFrom: 0,
        memberTo: 0,
        organizationId: 0,
        primaryColor: '',

        mascotId: '',
        teamGender: '',
        timeOfYearPurchase: '',
        position: '',
        organizationName: '',
      },
    };

    CreateNewAccount(payload).then((res: any) => {
      const keyRes = Object.keys(res).find((obj) =>
        obj.includes('storeCustomerModel.'),
      );
      if (res?.data === null) {
        setShowLoader(false);
        showModal({
          message:
            res[keyRes || ''] || __UserMessages.signUpPage.SomethingWentWrong,
          title: 'Error',
        });

        return;
      }
      showModal({
        message: __UserMessages.signUpPage.SuccessFullyAccountCreated,
        title: 'Success',
      });
      signInUser({
        userName: payload.storeCustomerModel.email,
        password: payload.storeCustomerModel.password,
        storeId: storeId!,
      })
        .then((user) => {
          if (user.credentials === 'INVALID') {
            // setErrorMsg(user.message);
          }
          if (user.credentials === 'VALID') {
            logInUser({
              id: +user.id,
            });
            setCookie(__Cookie.userId, user.id, __Cookie_Expiry.userId);

            GetStoreCustomer(+user.id).then((res) => {
              if (res === null) return;
              if (localStorage) {
                const tempCustomerId = extractCookies(
                  __Cookie.tempCustomerId,
                  'browserCookie',
                ).tempCustomerId;

                if (tempCustomerId) {
                  updateCartByNewUserId(~~tempCustomerId, res.id);
                  deleteCookie(__Cookie.tempCustomerId);
                }
              }

              const userInfo = {
                $email: res.email,
                $first_name: res.firstname,
                $last_name: res.lastName,
                $phone_number: '',
                $organization: res.companyName,
                $title: 'title',
                $timestamp: new Date(),
              };

              KlaviyoScriptTag(['identify', userInfo]);
              updateCustomer({ customer: res });
              getWishlist(res.id).then((wishListResponse) => {
                updateWishListData(wishListResponse);
              });
            });
          }
        })
        .finally(() => {
          setShowLoader(false);
          // CartController();
        });
      router.push(paths.HOME);
    });
  };

  const callOptionAPIs = () => {
    FetchIndustriesList().then((res) => res && setIndustries(res));

    FetchCountriesList().then((countriesExist) => {
      if (countriesExist) {
        setCountries(countriesExist);
        FetchStatesList(countriesExist[1].id).then(
          (res) => res && setStates(res),
        );
      }
    });
  };

  const getStateCountry = async (zipCode: string) => {
    const res = await getLocationWithZipCode(zipCode);

    return res;
  };

  const customHandleBlur = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    handleBlur: any,
    setFieldValue: any,
  ) => {
    handleBlur(e);
    getStateCountry(e.target.value).then((res) => {
      if (res?.countryId) {
        setFieldValue('cityName', res.cityName);
        setFieldValue('country', res.countryName);
        FetchStatesList(res.countryId).then((response) => {
          setStates(response ? response : []);

          setFieldValue('state', res.stateName);
        });
      }
    });
  };

  useEffect(() => {
    if (customerId) {
      router.push('/');
    }
  }, [customerId]);

  useEffect(() => {
    callOptionAPIs();
  }, []);

  useEffect(() => {
    FetchStatesList(countryChange).then((res) => res && setStates(res));
  }, [countryChange]);

  return (
    <section className='container mx-auto mt-8 mb-8'>
      <div className=''>
        <div className='w-full mx-auto max-w-7xl'>
          <Formik
            initialValues={su2_initialValues}
            onSubmit={handleFormikSubmit}
            validationSchema={_Signup2Schema}
          >
            {({
              values,
              handleChange,
              handleBlur,
              setFieldValue,
              touched,
              errors,
            }) => {
              return (
                <Form>
                  <div className='flex flex-wrap -mx-3 gap-y-6'>
                    <div className='w-full lg:w-1/2 px-3'>
                      <label className='mb-[4px] text-normal-text'>
                        Industry Type <span className='text-rose-500'>*</span>
                      </label>
                      <div className=''>
                        <select
                          className='form-input !w-[calc(100%-40px)]'
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          name='industryType'
                          value={values.industryType}
                        >
                          {industries.map((res) => (
                            <option key={res.id}>{res.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className='text-red-500 text-s'>
                        {touched.industryType && errors.industryType}
                      </div>
                    </div>

                    <div className='w-full lg:w-1/2 px-3'>
                      <label className='mb-[4px] text-normal-text'>
                        Organization Name
                      </label>
                      <div className=''>
                        <input
                          placeholder=''
                          value={values.organizationName}
                          name='organizationName'
                          className='form-input !w-[calc(100%-40px)]'
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className='text-red-500 text-s'>
                        {touched.organizationName && errors.organizationName}
                      </div>
                    </div>

                    <div className='w-full lg:w-1/2 px-3'>
                      <label className='mb-[4px] text-normal-text'>
                        Department Name
                      </label>
                      <div className=''>
                        <input
                          placeholder=''
                          value={values.departmentName}
                          name='departmentName'
                          className='form-input !w-[calc(100%-40px)]'
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>

                    <div className='w-full lg:w-1/2 px-3'>
                      <label className='mb-[4px] text-normal-text'>
                        Password <span className='text-rose-500'>*</span>
                      </label>
                      <div className=''>
                        <input
                          placeholder=''
                          type={showPassword ? 'text' : 'password'}
                          value={values.password}
                          name='password'
                          className='form-input !w-[calc(100%-40px)]'
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='block w-7 h-7 text-center absolute top-2 right-2'
                      >
                        <span className='material-symbols-outlined text-gray-400 focus:outline-none hover:text-primary transition-colors'>
                          visibility
                        </span>
                      </button>
                      <div className='text-red-500 text-s'>
                        {touched.firstname && errors.firstname}
                      </div>
                    </div>

                    <div className='w-full lg:w-1/2 px-3'>
                      <label className='mb-[4px] text-normal-text'>
                        First Name <span className='text-rose-500'>*</span>
                      </label>
                      <div className=''>
                        <input
                          placeholder=''
                          value={values.firstname}
                          name='firstname'
                          className='form-input !w-[calc(100%-40px)]'
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className='text-red-500 text-s'>
                        {touched.firstname && errors.firstname}
                      </div>
                    </div>

                    <div className='w-full lg:w-1/2 px-3'>
                      <label className='mb-[4px] text-normal-text'>
                        Last Name <span className='text-rose-500'>*</span>
                      </label>
                      <div className=''>
                        <input
                          placeholder=''
                          value={values.lastName}
                          name='lastName'
                          className='form-input !w-[calc(100%-40px)]'
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className='text-red-500 text-s'>
                        {touched.lastName && errors.lastName}
                      </div>
                    </div>

                    <div className='w-full lg:w-1/2 px-3'>
                      <label className='mb-[4px] text-normal-text'>
                        Email <span className='text-rose-500'>*</span>
                      </label>
                      <div className=''>
                        <input
                          placeholder=''
                          type='email'
                          value={values.email}
                          name='email'
                          className='form-input !w-[calc(100%-40px)]'
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className='text-red-500 text-s'>
                        {touched.email && errors.email}
                      </div>
                    </div>

                    <div className='w-full lg:w-1/2 px-3'>
                      <label className='mb-[4px] text-normal-text'>
                        Company Address <span className='text-rose-500'>*</span>
                      </label>
                      <div className=''>
                        <input
                          placeholder=''
                          type='text'
                          value={values.companyAddress}
                          name='companyAddress'
                          className='form-input !w-[calc(100%-40px)]'
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className='text-red-500 text-s'>
                        {touched.companyAddress && errors.companyAddress}
                      </div>
                    </div>

                    <div className='w-full lg:w-1/2 px-3'>
                      <label className='mb-[4px] text-normal-text'>
                        Zip Code
                      </label>
                      <div className=''>
                        <input
                          id=''
                          name='zipCode'
                          placeholder=''
                          value={values.zipCode}
                          onChange={handleChange}
                          onBlur={(e) => {
                            customHandleBlur(e, handleBlur, setFieldValue);
                          }}
                          className='form-input !w-[calc(100%-40px)]'
                        />
                      </div>
                    </div>

                    <div className='w-full lg:w-1/2 px-3'>
                      <label className='mb-[4px] text-normal-text'>City</label>
                      <div className=''>
                        <input
                          id=''
                          name='cityName'
                          placeholder=''
                          value={values.cityName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className='form-input !w-[calc(100%-40px)]'
                        />
                      </div>
                    </div>

                    <div className='w-full lg:w-1/2 px-3'>
                      <label className='mb-[4px] text-normal-text'>State</label>
                      <div className=''>
                        <select
                          className='form-input !w-[calc(100%-40px)]'
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          name='state'
                          value={values.state}
                        >
                          <>
                            {countries.length === 0 ? (
                              <option>No State found</option>
                            ) : (
                              ''
                            )}
                            {states?.map((opt) => (
                              <option id={opt.id.toString()} key={opt.id}>
                                {opt.name}
                              </option>
                            ))}
                          </>
                        </select>
                      </div>
                    </div>

                    <div className='w-full lg:w-1/2 px-3'>
                      <label className='mb-[4px] text-normal-text'>
                        Country
                      </label>
                      <div className=''>
                        <select
                          className='form-input !w-[calc(100%-40px)]'
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                            setCoutryChange(
                              +e.target[e?.target.selectedIndex].id,
                            );
                          }}
                          name='country'
                          value={values.country}
                        >
                          <>
                            {countries.length === 0 ? (
                              <option>No State found</option>
                            ) : (
                              ''
                            )}
                            {countries?.map((opt) => (
                              <option id={opt.id.toString()} key={opt.id}>
                                {opt.name}
                              </option>
                            ))}
                          </>
                        </select>
                      </div>
                    </div>

                    <div className='w-full lg:w-1/2 px-3'>
                      <label className='mb-[4px] text-normal-text'>
                        Phone Number <span className='text-rose-500'>*</span>
                      </label>
                      <div className=''>
                        <input
                          id=''
                          name='phoneNumber'
                          placeholder=''
                          value={values.phoneNumber}
                          className='form-input !w-[calc(100%-40px)]'
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className='text-red-500 text-s'>
                        {touched.phoneNumber && errors.phoneNumber}
                      </div>
                    </div>

                    <div className='w-full lg:w-1/2 px-3'>
                      <label className='mb-[4px] text-normal-text'>
                        Job Title
                      </label>
                      <div className=''>
                        <input
                          id=''
                          name='jobTitle'
                          placeholder=''
                          value={values.jobTitle}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className='form-input !w-[calc(100%-40px)]'
                        />
                      </div>
                    </div>
                    <div className='w-full lg:w-full px-3'>
                      <label className='mb-[4px] text-normal-text'>
                        Please tell us about your company, and how you would
                        like to use the Patagonia co-branded gear
                      </label>
                      <div className=''>
                        <input
                          id=''
                          name='usersMessage'
                          placeholder=''
                          value={values.usersMessage}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className='form-input !w-[calc(100%-40px)]'
                        />
                      </div>
                    </div>

                    <div className='w-full lg:w-full px-3'>
                      <button type='submit' className='btn btn-primary'>
                        Submit
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

export default SignUp_type2;
