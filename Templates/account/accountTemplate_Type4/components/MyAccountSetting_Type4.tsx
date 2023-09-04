import { BACARDI, BOSTONBEAR, _Store_CODES } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { __ValidationText } from '@constants/validation.text';
import getLocation from '@helpers/getLocation';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import {
  deleteCustomerAddress,
  udpateIsDefaultAddress,
} from '@services/address.service';
import {
  UpdateUserData,
  UpdateUserPassword,
  getDecryptPassword,
} from '@services/user.service';
import { Form, Formik } from 'formik';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

const initValue = {
  firstName: '',
  lastName: '',
  companyName: '',
  gender: 'Gender',
  birthYear: 'Year',
  birthDay: 'Day',
  birthMonth: 'Month',
  password: '',
};

const initPasswordValue = {
  password: '',
  newPassword: '',
  confirmNewPassword: '',
};

type SettingForm = typeof initValue;
type PasswordForm = typeof initPasswordValue;
const MyAccountSetting_Type6 = () => {
  const { setShowLoader, showModal, updateCustomer, getStoreCustomer } =
    useActions_v2();
  const customer = useTypedSelector_v2((state) => state.user.customer);
  const [activeEditBox, setActiveEditBox] = useState<boolean>(false);
  const [activePasswordChange, setActivePasswordChange] =
    useState<boolean>(false);

  const [showInfo, setShowInfo] = useState<boolean>(false);

  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] =
    useState<boolean>(false);
  const [currentPass, setCurrentPass] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [editPassword, setEditPassword] = useState<string>('');
  const [showPasswordUpdate, setShowPasswordUpdate] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [initialValues, setInitialValues] = useState<SettingForm>(initValue);
  const [passwordInitialValues, setPasswordInitialValues] =
    useState<PasswordForm>(initPasswordValue);
  const [shipAddress, setShipAddress] = useState<any>([]);
  const [billingAddress, setBilingAddress] = useState<any>([]);
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const router = useRouter();
  const { id: storeId, code: storeCode } = useTypedSelector_v2(
    (state) => state.store,
  );

  useEffect(() => {
    if (editPassword && activeEditBox) {
      setShowPasswordUpdate(true);
    } else {
      setShowPasswordUpdate(false);
    }
  }, [editPassword, activeEditBox]);
  useEffect(() => {
    let shippingAddressArr = customer?.customerAddress?.filter(
      (res) => res.addressType === 'S',
    );
    setShipAddress(shippingAddressArr ? shippingAddressArr : []);
    let billingAddressArr = customer?.customerAddress?.filter(
      (res) => res.addressType === 'B',
    );
    setBilingAddress(billingAddressArr ? billingAddressArr : []);
  }, [customer?.customerAddress]);

  useEffect(() => {
    if (shipAddress.length === 1) {
      !shipAddress[0].isDefault && updatePrimaryStatus(shipAddress[0]);
    }

    if (billingAddress.length === 1) {
      !billingAddress[0].isDefault && updatePrimaryStatus(billingAddress[0]);
    }
  }, [shipAddress, billingAddress]);

  const passDecryptFunction = async (pass: string) => {
    const response = await getDecryptPassword({
      password: pass ? pass : '',
    });
    return response;
  };

  const updatePassword = async (values: PasswordForm) => {
    try {
      const res = await UpdateUserPassword({
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword,
        currentPassword: values.password,
        customerId: customer?.id || 0,
      });
      if (res) {
        setInitialValues({ ...initialValues, password: values.newPassword });
        setActivePasswordChange(false);
        showModal({
          message: 'Password Updated Successfully',
          title: 'Updated',
        });
        setActiveEditBox(false);
      } else {
        showModal({
          message: 'Password Update Failed, Try Again!',
          title: 'Failed',
        });
      }
    } catch (error) {
      showModal({ message: 'Error', title: 'Failed' });
    }
  };

  const deleteAddress = async (id: number, rowVersion: string) => {
    const isConfirm = await confirm('Are you sure? You want to delete this.');
    const location = await getLocation();
    if (isConfirm) {
      const obj = {
        args: {
          id: id,
          rowVersion: rowVersion,
          status: 0,
          location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
          ipAddress: location.ip_address,
          macAddress: '00-00-00-00-00-00',
        },
      };
      await deleteCustomerAddress(obj);
      await getStoreCustomer(customerId || 0);
    }
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required(__ValidationText.signUp.firstName.required)
      .min(__ValidationText.signUp.firstName.minLength)
      .max(__ValidationText.signUp.firstName.maxLength),
    lastName: Yup.string()
      .required(__ValidationText.signUp.lastName.required)
      .min(__ValidationText.signUp.lastName.minLength)
      .max(__ValidationText.signUp.lastName.maxLength),
    birthMonth: Yup.string().test(
      'birthMonthtest',
      'Please select Month',
      function (value) {
        const { birthYear, birthDay } = this.parent;
        if (value === 'Month' && (birthDay !== 'Day' || birthYear !== 'Year')) {
          return false;
        } else {
          return true;
        }
      },
    ),
    birthYear: Yup.string().test(
      'birthYeartest',
      'Please select Year',
      function (value) {
        const { birthMonth, birthDay } = this.parent;
        if (
          value === 'Year' &&
          (birthDay !== 'Day' || birthMonth !== 'Month')
        ) {
          return false;
        } else {
          return true;
        }
      },
    ),
    birthDay: Yup.string().test(
      'birthDaytest',
      'Please select Day',
      function (value) {
        const { birthMonth, birthYear } = this.parent;
        if (
          value === 'Day' &&
          (birthMonth !== 'Month' || birthYear !== 'Year')
        ) {
          return false;
        } else {
          return true;
        }
      },
    ),
  });
  const passwordValidationSchema = Yup.object().shape({
    password: Yup.string().required(__ValidationText.signUp.password.required),
    newPassword: Yup.string()
      .required(__ValidationText.signUp.newPassword.required)
      .min(__ValidationText.signUp.newPassword.minLength),
    confirmNewPassword: Yup.string()
      .required(__ValidationText.signUp.confirmNewPassword.required)
      .min(__ValidationText.signUp.confirmNewPassword.minLength),
  });
  useEffect(() => {
    if (customer) {
      passDecryptFunction(customer.password).then((res) => {
        setCurrentPass(res ? res : '');
        setInitialValues({
          firstName: customer.firstname,
          lastName: customer.lastName,
          companyName: customer.companyName,
          gender: customer.gender,
          birthDay: customer.birthDate
            ? customer.birthDate.split('-')[2].slice(0, 2)
            : 'Day',
          birthYear: customer.birthDate
            ? customer.birthDate.split('-')[0]
            : 'Year',
          birthMonth: customer.birthDate
            ? __pagesText.accountPage.monthOption[
                parseInt(customer.birthDate.split('-')[1])
              ]
            : 'Month',
          password: res ? res : '',
        });
      });
    }
  }, [customer]);

  const updatePrimaryStatus = async (ele: any) => {
    setShowLoader(true);
    await udpateIsDefaultAddress({
      isDefault: true,
      addressId: ele.id,
      customerId: ele.customerId,
      addressType: ele.addressType,
    });

    await getStoreCustomer(customerId || 0);

    setShowLoader(false);
  };

  const submitHandler = async (value: SettingForm) => {
    try {
      const payload =
        value.birthDay !== 'Day' &&
        value.birthMonth !== 'Month' &&
        value.birthYear !== 'Year'
          ? {
              firstName: value.firstName,
              lastName: value.lastName,
              companyName: value.companyName,
              password: value.password,
              customerId: customer?.id || 0,
              gender: value.gender === 'Gender' ? '' : value.gender,
              birthDate: new Date(
                `${value.birthYear}/${value.birthDay}/${value.birthMonth}`,
              ),
            }
          : {
              firstName: value.firstName,
              lastName: value.lastName,
              companyName: value.companyName,
              password: value.password,
              customerId: customer?.id || 0,
              gender: value.gender === 'Gender' ? '' : value.gender,
            };
      const res = await UpdateUserData(payload);

      if (res) {
        updateCustomer({
          customer: {
            ...res,
            customerAddress: customer?.customerAddress,
            firstname: res.firstname,
            lastName: res.lastName,
            email: res.email,
            companyName: res.companyName ? res.companyName : value.companyName,
            password: res.password,
            gender: res.gender,
            birthDate: res.birthDate,
          },
        });
        showModal({
          message: 'Updated User Details Successfully',
          title: 'Updated',
        });
        setActiveEditBox(false);
      } else {
        showModal({
          message: 'Your current password is wrong',
          title: 'Error',
        });
      }
    } catch (error) {
      showModal({ message: 'Password Update Failed', title: 'Failed' });
    }
  };
  return (
    <>
      {/* <section className='"pt-[40px]"'>
        <div className='container mx-auto'>
          <div className='text-2xl-text text-center'>MY ACCOUNT</div>
        </div>
      </section> */}
      {/* <section className='container mx-auto mt-[50px] mb-[50px]'> */}
      <div className='w-4/4 lg:w-4/5 lg:px-0 px-[20px]'>
        <div className='w-full'>
          {!activeEditBox && !activePasswordChange && (
            <div className='mb-[15px]'>
              <div className='text-medium-text mb-[10px]'>
                Personal Information
              </div>
              <div className='mb-[10px]'>
                <label className='text-default-text w-full'>
                  <span className='font-[600]'>NAME</span>
                </label>
                <div className='text-default-text'>
                  {initialValues.firstName + ' ' + initialValues.lastName}
                </div>
              </div>
              <div className='mb-[10px]'>
                <label className='text-default-text w-full'>
                  <span className='font-[600]'>EMAIL</span>
                </label>
                <div className='text-default-text'>{customer?.email}</div>
              </div>
              <div className='mb-[10px]'>
                <label className='text-default-text  w-full'>
                  <span className='font-[600]'>BIRTHDAY</span>
                </label>
                {customer && customer?.birthDate && (
                  <div className='text-default-text'>
                    {moment(customer.birthDate).format('MMM DD, YYYY')}
                  </div>
                )}
              </div>
              <div className='mb-[10px]'>
                <label className='text-default-text  w-full'>
                  <span className='font-[600]'>GENDER</span>
                </label>
                <div className='text-default-text'>{customer?.gender}</div>
              </div>
            </div>
          )}

          {activeEditBox && (
            <Formik
              initialValues={initialValues}
              enableReinitialize
              onSubmit={submitHandler}
              validationSchema={validationSchema}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleReset,
                setFieldValue,
                touched,
                errors,
              }) => {
                return (
                  <Form>
                    <div className='mb-[24px] mt-[24px]'>
                      <div className='first:mt-0 mt-[20px] flex flex-wrap items-center gap-[8px] max-w-xs'>
                        <label className='text-default-text w-full'>
                          First Name <span className='text-red-600'>*</span>
                        </label>
                        <div className='grow'>
                          <input
                            type='text'
                            id='First Name'
                            name='firstName'
                            placeholder='Enter Your First Name'
                            value={values.firstName}
                            className='form-input'
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                        {touched.firstName && errors.firstName && (
                          <p className='text-red-500 text-xs mt-1'>
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div className='first:mt-0 mt-[20px] flex flex-wrap items-center gap-[8px] max-w-xs'>
                        <label className='text-default-text w-full'>
                          Last Name <span className='text-red-600'>*</span>
                        </label>
                        <div className='grow'>
                          <input
                            type='text'
                            id='Last Name'
                            name='lastName'
                            placeholder='Enter Your Last Name'
                            value={values.lastName}
                            className='form-input'
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                        {touched.lastName && errors.lastName && (
                          <p className='text-red-500 text-xs mt-1'>
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                      <div className='first:mt-0 mt-[20px] flex flex-wrap items-center gap-[8px] max-w-xs'>
                        <label className='text-default-text w-full'>
                          Email Address <span className='text-red-600'>*</span>
                        </label>
                        <div className='grow'>
                          <input
                            type='email'
                            id='email-address'
                            name='email-address'
                            placeholder='Enter Email Address'
                            value={customer?.email}
                            style={{ backgroundColor: '#eee' }}
                            className='form-input bg-slate-400'
                            disabled
                          />
                        </div>
                      </div>
                      <div className='first:mt-0 mt-[20px] flex flex-wrap items-center gap-[8px] max-w-xs'>
                        <label className='block text-default-text w-full'>
                          Current Password{' '}
                          <span className='text-red-600'>*</span>
                        </label>
                        <div className='block text-small-text'>
                          To protect your account, your password is needed.
                        </div>
                        <div className='relative grow'>
                          <input
                            id='password'
                            className='form-input'
                            placeholder='Password'
                            type={showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <button
                            className='block w-7 h-7 text-center absolute top-2 right-2'
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <span className='material-symbols-outlined  text-gray-400 focus:outline-none hover:text-indigo-500 transition-colors'>
                              visibility
                            </span>
                          </button>
                          <div className='absolute top-2 right-10'>
                            <button
                              type='button'
                              onMouseOver={() => setShowInfo(true)}
                              onMouseLeave={() => setShowInfo(false)}
                              className=''
                              aria-haspopup='true'
                            >
                              <span className='material-icons-outlined ml-2 text-gray-400 focus:outline-none hover:text-indigo-500 transition-colors'>
                                info
                              </span>
                            </button>
                            <div
                              style={{
                                display: showInfo ? '' : 'none',
                              }}
                              className='z-10 absolute top-full left-32 transform -translate-x-1/2'
                            >
                              <div className='bg-slate-500 p-[10px] overflow-hidden mt-[10px]'>
                                <div className='text-default-text text-gray-200 font-light whitespace-nowrap w-full text-left px-[16px] py-[16px]'>
                                  <span className='w-full pt-1 pb-1 block font-semibold'>
                                    {
                                      __pagesText.accountPage
                                        .youtPasswordMustHave
                                    }
                                  </span>
                                  <span className='w-full pt-[4px] pb-[4px] block'>
                                    {__pagesText.accountPage.eightMore}
                                  </span>
                                  {/* <span className='w-full pt-[4px] pb-[4px] block'>
                                    {__pagesText.accountPage.upperOrLowerCase}
                                  </span>
                                  <span className='w-full pt-[4px] pb-[4px] block'>
                                    {__pagesText.accountPage.atLeastOneNumber}
                                  </span> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
                        <div className='grow'>
                          <div className='flex flex-wrap mx-[-10px]'>
                            <div className='lg:w-1/4 mb-[10px] lg:mb-[0px] w-full'>
                              <label className='text-default-text w-full'>
                                Gender
                              </label>
                              <select
                                className='form-input mt-[8px]'
                                value={values.gender}
                                id='gender'
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                {__pagesText.accountPage.genderOptions.map(
                                  (option) => (
                                    <option value={option}>{option}</option>
                                  ),
                                )}
                              </select>
                            </div>
                            <div className='md:w-1/3 lg:w-1/4 w-full px-[10px]'>
                              <label className='text-default-text w-full'>
                                Birthday
                              </label>
                              <select
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='form-input mt-[8px]'
                                id='birthMonth'
                                value={values.birthMonth}
                              >
                                {__pagesText.accountPage.monthOption.map(
                                  (monthSelect) => (
                                    <option value={monthSelect}>
                                      {monthSelect}
                                    </option>
                                  ),
                                )}
                              </select>
                              {errors.birthMonth && (
                                <p className='text-red-500 text-xs mt-1'>
                                  {errors.birthMonth}
                                </p>
                              )}
                            </div>

                            <div className='md:w-1/3 lg:w-1/4 w-full px-[10px]'>
                              <label className='text-default-text w-full'>
                                &nbsp;
                              </label>
                              <select
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='form-input mt-[8px]'
                                id='birthDay'
                                value={values.birthDay}
                              >
                                {__pagesText.accountPage.dayOption.map(
                                  (day) => (
                                    <option value={day}>{day}</option>
                                  ),
                                )}
                              </select>
                              {errors.birthDay && (
                                <p className='text-red-500 text-xs mt-1'>
                                  {errors.birthDay}
                                </p>
                              )}
                            </div>

                            <div className='md:w-1/3 lg:w-1/4 w-full px-[10px]'>
                              <label className='text-default-text w-full'>
                                &nbsp;
                              </label>
                              <select
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id='birthYear'
                                className='form-input mt-[8px]'
                                value={values.birthYear}
                              >
                                {__pagesText.accountPage.yearOption.map(
                                  (day) => (
                                    <option value={day}>{day}</option>
                                  ),
                                )}
                              </select>
                              {errors.birthYear && (
                                <p className='text-red-500 text-xs mt-1'>
                                  {errors.birthYear}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='mt-[20px]'>
                        <button
                          type='submit'
                          className={`btn btn-${
                            storeCode === BACARDI ? 'secondary' : 'primary'
                          } mr-[10px]`}
                        >
                          Save
                        </button>
                        <button
                          type='button'
                          className={`btn btn-${
                            storeCode === BACARDI ? 'secondary' : 'primary'
                          }`}
                          onClick={(e) => {
                            setActiveEditBox(false);
                            handleReset(e);
                          }}
                        >
                          {__pagesText.accountPage.cancelBtn}
                        </button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          )}

          {activePasswordChange && (
            <Formik
              initialValues={initPasswordValue}
              enableReinitialize
              onSubmit={updatePassword}
              validationSchema={passwordValidationSchema}
            >
              {({
                values,
                handleChange,
                handleBlur,
                touched,
                errors,
                handleReset,
              }) => (
                <Form>
                  <div className='mb-[40px]'>
                    <div className='first:mt-0 mt-[20px] flex flex-wrap items-center gap-[8px] max-w-xs'>
                      <label className='text-default-text w-full'>
                        Password <span className='text-red-600'>*</span>
                      </label>
                      <div className=' relative grow'>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id='Full Name'
                          name='password'
                          placeholder=''
                          className='form-input'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />
                        {values.password.length > 1 && (
                          <button
                            className='block w-7 h-7 text-center absolute top-2 right-2'
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <span className='material-symbols-outlined  text-gray-400 focus:outline-none hover:text-indigo-500 transition-colors'>
                              visibility
                            </span>
                          </button>
                        )}
                      </div>
                      {touched.password && errors.password && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors.password}
                        </p>
                      )}
                    </div>
                    <div className='first:mt-0 mt-[20px] flex flex-wrap items-center gap-[8px] max-w-xs'>
                      <label className='text-default-text w-full'>
                        New Password <span className='text-red-600'>*</span>
                      </label>
                      <div className='grow'>
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          id='newPassword'
                          name='newPassword'
                          placeholder=''
                          className='form-input'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.newPassword}
                        />
                        {values.newPassword.length > 1 && (
                          <button
                            className='block w-7 h-7 text-center absolute top-2 right-2'
                            type='button'
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            <span className='material-symbols-outlined text-gray-400 focus:outline-none hover:text-indigo-500 transition-colors'>
                              visibility
                            </span>
                          </button>
                        )}
                      </div>
                      {touched.newPassword && errors.newPassword && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors.newPassword}
                        </p>
                      )}
                    </div>
                    <div className='first:mt-0 mt-[20px] flex flex-wrap items-center gap-[8px] max-w-xs'>
                      <label className='text-default-text w-full'>
                        Confirm New Password
                        <span className='text-red-600'>*</span>
                      </label>
                      <div className='grow'>
                        <input
                          type={showConfirmNewPassword ? 'text' : 'password'}
                          id='confirmNewPassword'
                          name='confirmNewPassword'
                          placeholder=''
                          className='form-input'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.confirmNewPassword}
                        />
                        {values.confirmNewPassword.length > 1 && (
                          <button
                            className='block w-7 h-7 text-center absolute top-2 right-2'
                            type='button'
                            onClick={() =>
                              setShowConfirmNewPassword(!showConfirmNewPassword)
                            }
                          >
                            <span className='material-symbols-outlined  text-gray-400 focus:outline-none hover:text-indigo-500 transition-colors'>
                              visibility
                            </span>
                          </button>
                        )}
                      </div>
                      {touched.confirmNewPassword &&
                        errors.confirmNewPassword && (
                          <p className='text-red-500 text-xs mt-1'>
                            {errors.confirmNewPassword}
                          </p>
                        )}
                    </div>
                    <div className='mt-[20px]'>
                      <button
                        type='submit'
                        className={`btn btn-${
                          storeCode === BACARDI ? 'secondary' : 'primary'
                        } mr-[10px]`}
                      >
                        Save
                      </button>
                      <button
                        type='button'
                        className={`btn btn-${
                          storeCode === BACARDI ? 'secondary' : 'primary'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleReset(e);
                          setActivePasswordChange(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          )}
          <div className='mb-[40px] flex flex-wrap gap-y-2'>
            <button
              type='button'
              disabled={storeCode === _Store_CODES.USAAPUNCHOUT}
              onClick={(e) => {
                e.preventDefault();
                setActiveEditBox(true);
                setActivePasswordChange(false);
              }}
              className={`btn btn-${
                storeCode === BACARDI ? 'secondary' : 'primary'
              } mr-[10px]`}
            >
              {__pagesText.accountPage.profileEdit}
            </button>
            {storeCode !== BOSTONBEAR && (
              <button
                type='button'
                disabled={storeCode === _Store_CODES.USAAPUNCHOUT}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveEditBox(false);
                  setActivePasswordChange(true);
                }}
                className={`btn btn-${
                  storeCode === BACARDI ? 'secondary' : 'primary'
                }`}
              >
                Change Password
              </button>
            )}
          </div>

          <hr className='mb-[40px]' />

          <div className='bg-[#ffffff] w-full'>
            <div className='text-title-text mb-[20px]'>Shipping Address</div>
            <div className=''>
              {shipAddress.map((ele: any) => {
                return (
                  <div className='flex flex-wrap text-default-text ml-[-15px] mr-[-15px] gap-y-2 mb-[20px] last:mb-[0px]'>
                    <div className='w-6/12 lg:w-2/12 md:w-3/12 px-[15px]'>
                      {ele.firstname} {ele.lastName}
                    </div>
                    <div className='w-6/12 lg:w-6/12 md:w-6/12 px-[15px]'>
                      <>{ele.address1}, </>
                      {ele.suite && ele.suite.trim() != '' && (
                        <> {ele.suite}, </>
                      )}
                      {[
                        ele.city,
                        ele.state,
                        ele.countryName,
                        ele.postalCode,
                      ].join(', ')}{' '}
                    </div>
                    <div className='w-full lg:w-4/12 md:w-3/12 px-[15px] flex flex-wrap gap-2 items-center'>
                      <button
                        type='button'
                        className={`btn btn-sm btn-${
                          storeCode === BACARDI ? 'secondary' : 'primary'
                        }`}
                        disabled={storeCode === _Store_CODES.USAAPUNCHOUT}
                        onClick={() => {
                          router.push({
                            pathname: paths.myAccount.edit_shipping_address,
                            query: {
                              Customer: ele.id,
                            },
                          });
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type='button'
                        disabled={storeCode === _Store_CODES.USAAPUNCHOUT}
                        className={`btn btn-sm btn-${
                          storeCode === BACARDI ? 'secondary' : 'primary'
                        }`}
                        onClick={() => {
                          deleteAddress(ele.id, ele.rowVersion);
                        }}
                      >
                        Delete
                      </button>
                      {ele.isDefault ? (
                        <div className='text-default-text flex items-center'>
                          <span className='text-primary flex items-center gap-1'>
                            <span className='material-icons-outlined text-[16px] '>
                              star
                            </span>{' '}
                            PRIMARY
                          </span>
                        </div>
                      ) : (
                        <button
                          type='button'
                          className={`btn btn-sm btn-${
                            storeCode === BACARDI ? 'secondary' : 'primary'
                          }`}
                          disabled={storeCode === _Store_CODES.USAAPUNCHOUT}
                          onClick={() => {
                            updatePrimaryStatus(ele);
                          }}
                        >
                          Make Primary
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
              <div className='my-[30px]'>
                <button
                  onClick={() => {
                    router.push({
                      pathname: paths.myAccount.edit_shipping_address,
                    });
                  }}
                  disabled={storeCode === _Store_CODES.USAAPUNCHOUT}
                  type='button'
                  className={`btn btn-${
                    storeCode === BACARDI ? 'secondary' : 'primary'
                  }`}
                >
                  ADD SHIPPING ADDRESS
                </button>
              </div>
            </div>
          </div>

          <hr className='mb-[40px]' />

          <div className='bg-[#ffffff] w-full'>
            <div className='text-title-text mb-[20px]'>Billing Address</div>
            <div className=''>
              {billingAddress.map((ele: any) => {
                return (
                  <div className='flex flex-wrap text-default-text ml-[-15px] mr-[-15px] gap-y-2 mb-[20px] last:mb-[0px]'>
                    <div className='w-6/12 lg:w-2/12 md:w-3/12 px-[15px]'>
                      {ele.firstname} {ele.lastName}
                    </div>
                    <div className='w-6/12 lg:w-6/12 md:w-6/12 px-[15px]'>
                      <>{ele.address1}, </>
                      {ele.suite && ele.suite.trim() != '' && (
                        <> {ele.suite}, </>
                      )}
                      {[
                        ele.city,
                        ele.state,
                        ele.countryName,
                        ele.postalCode,
                      ].join(', ')}{' '}
                    </div>
                    <div className='w-full lg:w-4/12 md:w-3/12 px-[15px] flex flex-wrap gap-2 items-center'>
                      <button
                        className={`btn btn-sm btn-${
                          storeCode === BACARDI ? 'secondary' : 'primary'
                        }`}
                        disabled={storeCode === _Store_CODES.USAAPUNCHOUT}
                        type='button'
                        onClick={() => {
                          router.push({
                            pathname: paths.myAccount.edit_billing_address,
                            query: {
                              Customer: ele.id,
                            },
                          });
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className={`btn btn-sm btn-${
                          storeCode === BACARDI ? 'secondary' : 'primary'
                        }`}
                        disabled={storeCode === _Store_CODES.USAAPUNCHOUT}
                        type='button'
                        onClick={() => {
                          deleteAddress(ele.id, ele.rowVersion);
                        }}
                      >
                        Delete
                      </button>
                      {ele.isDefault ? (
                        <div className='text-default-text flex items-center'>
                          <span className='text-primary flex items-center gap-1'>
                            <span className='material-icons-outlined text-[16px] '>
                              star
                            </span>{' '}
                            PRIMARY
                          </span>
                        </div>
                      ) : (
                        <button
                          type='button'
                          className={`btn btn-sm btn-${
                            storeCode === BACARDI ? 'secondary' : 'primary'
                          }`}
                          disabled={storeCode === _Store_CODES.USAAPUNCHOUT}
                          onClick={() => {
                            updatePrimaryStatus(ele);
                          }}
                        >
                          Make Primary
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              <div className='my-[30px]'>
                <button
                  onClick={() => {
                    router.push({
                      pathname: paths.myAccount.edit_billing_address,
                    });
                  }}
                  disabled={storeCode === _Store_CODES.USAAPUNCHOUT}
                  type='button'
                  className={`btn btn-${
                    storeCode === BACARDI ? 'secondary' : 'primary'
                  }`}
                >
                  ADD BILLING ADDRESS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </section> */}
    </>
  );
};

export default MyAccountSetting_Type6;
