import { __pagesText } from '@constants/pages.text';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { UpdateUserData, UpdateUserPassword } from '@services/user.service';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

const initValue = {
  firstName: '',
  lastName: '',
  companyName: '',
  gender: '',
  birthDate: '',
};

type SettingForm = typeof initValue;
const MyAccountSetting_Type2 = () => {
  const { showModal } = useActions_v2();
  const customer = useTypedSelector_v2((state) => state.user.customer);
  const [activeEditBox, setActiveEditBox] = useState(false);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [genderId, setGenderId] = useState(customer?.gender);
  const [showPassword, setShowPassword] = useState(false);
  const [editPassword, setEditPassword] = useState('');
  const [showPasswordUpdate, setShowPasswordUpdate] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [initialValues, setInitialValues] = useState<SettingForm>(initValue);

  useEffect(() => {
    if (editPassword && activeEditBox) {
      setShowPasswordUpdate(true);
    } else {
      setShowPasswordUpdate(false);
    }
  }, [editPassword, activeEditBox]);

  useEffect(() => {
    setGenderId(customer?.gender);
    customer?.birthDate && setYear(customer.birthDate.split('-')[0]);
    customer?.birthDate && setDay(customer.birthDate.split('-')[2].slice(0, 2));
    customer?.birthDate && setMonth(customer.birthDate.split('-')[1]);
  }, [customer?.gender, customer?.birthDate]);

  const updatePassword = async () => {
    try {
      const res = await UpdateUserPassword({
        email: customer?.email || '',
        password: editPassword,
        customerId: customer?.id || 0,
      });
      if (res) {
        setNewPassword('');
        setEditPassword('');
        setShowPasswordUpdate(false);
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

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    companyName: Yup.string().required(),
  });
  useEffect(() => {
    if (customer) {
      setInitialValues({
        firstName: customer.firstname,
        lastName: customer.lastName,
        companyName: customer.companyName,
        gender: customer.gender,
        birthDate: customer.birthDate,
      });
    }
  }, [customer]);

  const submitHandler = async (value: SettingForm) => {
    try {
      const res = await UpdateUserData({
        ...value,
        password: newPassword,
        customerId: customer?.id || 0,
        gender: genderId ? genderId : 'Male',
        birthDate: `${day}/${month}/${year}`,
      });
      console.log(res);

      if (res) {
        showModal({
          message: 'Updated User Details Successfully',
          title: 'Updated',
        });
        setActiveEditBox(false);
      } else {
        showModal({
          message: 'Please Enter Current Password',
          title: 'Failed',
        });
      }
    } catch (error) {
      showModal({ message: 'Password Update Failed', title: 'Failed' });
    }
  };

  return (
    <>
      <section className='"pt-[40px]"'>
        <div className='container mx-auto'>
          <div className='text-2xl-text text-center'>MY ACCOUNT</div>
        </div>
      </section>
      <section className='container mx-auto mt-[50px] mb-[50px]'>
        <div className='w-4/4 lg:w-4/5'>
          <div className='gird grid-cols-1 lg:flex lg:items-center'>
            <div className='w-full mx-auto max-w-4xl'>
              <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={submitHandler}
                validationSchema={validationSchema}
              >
                {({ values, handleChange, handleBlur }) => (
                  <Form>
                    <div className='mb-[24px] mt-[24px]'>
                      <div className='mt-[20px] flex flex-wrap items-center gap-[8px] max-w-3xl'>
                        <label className='text-default-text font-[600] w-full md:w-1/3 md:text-right'>
                          {__pagesText.accountPage.firstName}{' '}
                          <span className='text-red-600'>*</span>
                        </label>
                        <div className='grow'>
                          <input
                            type='text'
                            id='Full Name'
                            name='firstName'
                            placeholder='Enter Your Full Name'
                            value={values.firstName}
                            className='form-input'
                            disabled={!activeEditBox}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                      <div className='mt-[20px] flex flex-wrap items-center gap-[8px] max-w-3xl'>
                        <label className='text-default-text font-[600] w-full md:w-1/3 md:text-right'>
                          {__pagesText.accountPage.lastName}{' '}
                          <span className='text-red-600'>*</span>
                        </label>
                        <div className='grow'>
                          <input
                            type='text'
                            id='Last Name'
                            name='lastName'
                            placeholder='Enter Your Last Name'
                            value={values.lastName}
                            className='form-input'
                            disabled={!activeEditBox}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                      <hr className='mt-[20px]'></hr>
                      <div className='mt-[20px] flex flex-wrap items-center gap-[8px] max-w-3xl'>
                        <label className='text-default-text font-[600] w-full md:w-1/3 md:text-right'>
                          {__pagesText.accountPage.emailAddress}{' '}
                          <span className='text-red-600'>*</span>
                        </label>
                        <div className='grow'>
                          <input
                            type='email'
                            id='email-address'
                            name='email-address'
                            placeholder='Enter Email Address'
                            value={customer?.email}
                            className='form-input bg-slate-400'
                            disabled
                          />
                        </div>
                      </div>
                      <div className='mt-[20px] flex flex-wrap items-center gap-[8px] max-w-3xl'>
                        <label className='text-default-text font-[600] w-full md:w-1/3 md:text-right'>
                          {__pagesText.accountPage.gender}{' '}
                        </label>
                        <div className='grow'>
                          <select
                            className='form-input'
                            value={genderId}
                            disabled={!activeEditBox}
                            onChange={(e) => setGenderId(e.target.value)}
                          >
                            {__pagesText.accountPage.genderOptions.map(
                              (option) => (
                                <option value={option}>{option}</option>
                              ),
                            )}
                          </select>
                        </div>
                      </div>
                      <div className='mt-[20px] flex flex-wrap items-center gap-[8px] max-w-3xl'>
                        <label className='text-default-text font-[600] w-full md:w-1/3 md:text-right'>
                          {__pagesText.accountPage.birthDay}{' '}
                        </label>
                        <div className='grow'>
                          <div className='flex flex-wrap mx-[-10px]'>
                            <div className='w-1/3 px-[10px]'>
                              <select
                                onChange={(e) => setMonth(e.target.value)}
                                className='form-input'
                                disabled={!activeEditBox}
                                value={
                                  __pagesText.accountPage.monthOption[
                                    parseInt(month)
                                  ]
                                }
                              >
                                {__pagesText.accountPage.monthOption.map(
                                  (monthSelect) => (
                                    <option value={monthSelect}>
                                      {monthSelect}
                                    </option>
                                  ),
                                )}
                              </select>
                            </div>
                            <div className='w-1/3 px-[10px]'>
                              <select
                                onChange={(e) => setDay(e.target.value)}
                                className='form-input'
                                disabled={!activeEditBox}
                                value={day}
                              >
                                {__pagesText.accountPage.dayOption.map(
                                  (day) => (
                                    <option value={day}>{day}</option>
                                  ),
                                )}
                              </select>
                            </div>
                            <div className='w-1/3 px-[10px]'>
                              <select
                                onChange={(e) => setYear(e.target.value)}
                                className='form-input'
                                disabled={!activeEditBox}
                                value={year}
                              >
                                {__pagesText.accountPage.yearOption.map(
                                  (year) => (
                                    <option value={year}>{year}</option>
                                  ),
                                )}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className='mt-[20px]'></hr>
                      <div className='mt-[20px] flex flex-wrap items-center gap-[8px] max-w-3xl'>
                        <label className='text-default-text font-[600] w-full md:w-1/3 md:text-right'>
                          {__pagesText.accountPage.companyName}{' '}
                          <span className='text-red-600'>*</span>
                        </label>
                        <div className='grow'>
                          <input
                            type='text'
                            id='companyu-name'
                            name='companyName'
                            placeholder='Enter Company Name'
                            // value="johnthomas@ecommerce.com"
                            value={values.companyName}
                            className='form-input'
                            disabled={!activeEditBox}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                      <hr className='mt-[20px]'></hr>
                      <div className=''>
                        <div className='mt-[20px] flex flex-wrap items-center gap-[8px] max-w-3xl'>
                          <label className='block text-default-text font-[600] w-full md:w-1/3 md:text-right'>
                            {__pagesText.accountPage.currentPassword}{' '}
                            <span className='text-red-600'>*</span>
                          </label>
                          <div className='relative grow'>
                            <input
                              id='password'
                              className='form-input'
                              placeholder='Password'
                              type={showPassword ? 'text' : 'password'}
                              value={newPassword}
                              onChange={(e) => {
                                setNewPassword(e.target.value);
                              }}
                              disabled={!activeEditBox}
                            />
                            <button
                              onClick={() => setShowPassword(!showPassword)}
                              type='button'
                              className='block w-7 h-7 text-center absolute top-2 right-2'
                            >
                              <span className='material-symbols-outlined text-title-text text-gray-400 focus:outline-none hover:text-indigo-500 transition-colors'>
                                visibility
                              </span>
                            </button>

                            <div className='absolute top-2 right-10'>
                              <button
                                onMouseOver={() => setShowInfo(true)}
                                onMouseLeave={() => setShowInfo(false)}
                                className=''
                                aria-haspopup='true'
                              >
                                <span className='material-icons-outlined ml-2 text-title-text text-gray-400 focus:outline-none hover:text-indigo-500 transition-colors'>
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
                                    <span className='w-full pt-[4px] pb-[4px] block'>
                                      {__pagesText.accountPage.upperOrLowerCase}
                                    </span>
                                    <span className='w-full pt-[4px] pb-[4px] block'>
                                      {__pagesText.accountPage.atLeastOneNumber}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* {showPasswordUpdate && (
                            <div className='m:col-span-1'>
                              <button
                                type='button'
                                onClick={updatePassword}
                                className='m-r-10 btn btn-primary '
                              >
                                {__pagesText.accountPage.passwordUpdate}
                              </button>
                            </div>
                          )} */}
                        </div>
                        <div className='mt-[20px] flex flex-wrap items-center gap-[8px] max-w-3xl'>
                          <label className='block text-default-text font-[600] w-full md:w-1/3 md:text-right'>
                            New Password <span className='text-red-600'>*</span>
                          </label>
                          <div className='relative grow'>
                            <input
                              id='password'
                              className='form-input'
                              placeholder='Password'
                              type={showPassword ? 'text' : 'password'}
                              onChange={(e) => {
                                setEditPassword(e.target.value);
                              }}
                              disabled={!activeEditBox}
                            />
                            <button
                              onClick={() => setShowPassword(!showPassword)}
                              className='block w-7 h-7 text-center absolute top-2 right-2'
                              type='button'
                            >
                              <span className='material-symbols-outlined text-title-text text-gray-400 focus:outline-none hover:text-indigo-500 transition-colors'>
                                visibility
                              </span>
                            </button>

                            <div className='absolute top-2 right-10'>
                              <button
                                onMouseOver={() => setShowInfo(true)}
                                onMouseLeave={() => setShowInfo(false)}
                                className=''
                                aria-haspopup='true'
                              >
                                <span className='material-icons-outlined ml-2 text-title-text text-gray-400 focus:outline-none hover:text-indigo-500 transition-colors'>
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
                                    <span className='w-full pt-[4px] pb-[4px] block'>
                                      {__pagesText.accountPage.upperOrLowerCase}
                                    </span>
                                    <span className='w-full pt-[4px] pb-[4px] block'>
                                      {__pagesText.accountPage.atLeastOneNumber}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {showPasswordUpdate && (
                            <div className='m:col-span-1'>
                              <button
                                type='button'
                                onClick={updatePassword}
                                className='m-r-10 btn btn-primary '
                              >
                                {__pagesText.accountPage.passwordUpdate}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className='flex flex-wrap items-center gap-2 max-w-3xl pt-[40px]'>
                        <div className='w-full md:w-1/3'></div>
                        <div className='grow'>
                          {!activeEditBox ? (
                            <button
                              type='button'
                              onClick={(e) => {
                                e.preventDefault();
                                setActiveEditBox(true);
                              }}
                              className='btn btn-secondary btn-md'
                            >
                              {__pagesText.accountPage.profileEdit}
                            </button>
                          ) : (
                            <>
                              <button
                                type='submit'
                                className='mr-2 btn btn-primary'
                              >
                                {__pagesText.accountPage.saveBtn}
                              </button>
                              <button
                                type='button'
                                onClick={() => setActiveEditBox(false)}
                                className='ml-2 btn btn-secondary'
                              >
                                {__pagesText.accountPage.cancelBtn}
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyAccountSetting_Type2;
