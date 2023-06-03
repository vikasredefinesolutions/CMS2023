import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
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
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

const initValue = {
  firstName: '',
  lastName: '',
  companyName: '',
  gender: '',
  birthDate: '',
  password: '',
};

type SettingForm = typeof initValue;
const MyAccountSetting_Type2 = () => {
  const { setShowLoader, showModal, updateCustomer, getStoreCustomer } =
    useActions_v2();
  const customer = useTypedSelector_v2((state) => state.user.customer);
  const [activeEditBox, setActiveEditBox] = useState(false);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [showInfo2, setShowInfo2] = useState(false);
  const [genderId, setGenderId] = useState(customer?.gender);
  const [showPassword, setShowPassword] = useState(false);
  const [editPassword, setEditPassword] = useState('');
  const [showPasswordUpdate, setShowPasswordUpdate] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [initialValues, setInitialValues] = useState<SettingForm>(initValue);
  const [shipAddress, setShipAddress] = useState<any>([]);
  const [billingAddress, setBilingAddress] = useState<any>([]);
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const router = useRouter();

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

  useEffect(() => {
    let shippingAddressArr = customer?.customerAddress.filter(
      (res) => res.addressType === 'S',
    );
    setShipAddress(shippingAddressArr ? shippingAddressArr : []);
    let billingAddressArr = customer?.customerAddress.filter(
      (res) => res.addressType === 'B',
    );
    setBilingAddress(billingAddressArr ? billingAddressArr : []);
  }, [customer]);

  const passDecryptFunction = async (pass: string) => {
    const response = await getDecryptPassword({
      password: pass ? pass : '',
    });
    return response;
  };

  const updatePassword = async (setFieldValue: any) => {
    try {
      const res = await UpdateUserPassword({
        email: customer?.email || '',
        password: editPassword,
        customerId: customer?.id || 0,
      });
      if (res) {
        setNewPassword('');
        setEditPassword('');
        passDecryptFunction(res?.password).then((res) => {
          setInitialValues({ ...initialValues, password: res ? res : '' });
        });
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
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    companyName: Yup.string().required(),
  });
  useEffect(() => {
    if (customer) {
      passDecryptFunction(customer.password).then((res) => {
        setInitialValues({
          firstName: customer.firstname,
          lastName: customer.lastName,
          companyName: customer.companyName,
          gender: customer.gender,
          birthDate: customer.birthDate,
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
      const res = await UpdateUserData({
        ...value,
        password: newPassword,
        customerId: customer?.id || 0,
        gender: genderId ? genderId : 'Male',
        birthDate: `${day}/${month}/${year}`,
      });

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
      {/* <section className='"pt-[40px]"'>
        <div className='container mx-auto'>
          <div className='text-2xl-text text-center'>MY ACCOUNT</div>
        </div>
      </section> */}
      {/* <section className='container mx-auto mt-[50px] mb-[50px]'> */}
      <div className='w-4/4 lg:w-4/5'>
        <div className='gird grid-cols-1 lg:flex lg:items-center flex-wrap'>
          <div className='w-full mx-auto max-w-4xl'>
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
              }) => (
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
                          style={
                            !activeEditBox ? { backgroundColor: '#eee' } : {}
                          }
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
                          style={
                            !activeEditBox ? { backgroundColor: '#eee' } : {}
                          }
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
                          style={{ backgroundColor: '#eee' }}
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
                          style={
                            !activeEditBox ? { backgroundColor: '#eee' } : {}
                          }
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
                              style={
                                !activeEditBox
                                  ? { backgroundColor: '#eee' }
                                  : {}
                              }
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
                              style={
                                !activeEditBox
                                  ? { backgroundColor: '#eee' }
                                  : {}
                              }
                              value={day}
                            >
                              {__pagesText.accountPage.dayOption.map((day) => (
                                <option value={day}>{day}</option>
                              ))}
                            </select>
                          </div>
                          <div className='w-1/3 px-[10px]'>
                            <select
                              onChange={(e) => setYear(e.target.value)}
                              className='form-input'
                              disabled={!activeEditBox}
                              style={
                                !activeEditBox
                                  ? { backgroundColor: '#eee' }
                                  : {}
                              }
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
                          style={
                            !activeEditBox ? { backgroundColor: '#eee' } : {}
                          }
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
                            value={values.password}
                            style={{ backgroundColor: '#eee' }}
                            disabled={true}
                            onChange={(e) => {
                              setNewPassword(e.target.value);
                            }}
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            type='button'
                            className='block w-7 h-7 text-center absolute top-2 right-2'
                          >
                            <span className='material-symbols-outlined text-gray-400 focus:outline-none hover:text-indigo-500 transition-colors'>
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
                            id=''
                            className='form-input'
                            placeholder='Password'
                            type={showPassword ? 'text' : 'password'}
                            style={
                              !activeEditBox ? { backgroundColor: '#eee' } : {}
                            }
                            value={editPassword}
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
                            <span className='material-symbols-outlined text-gray-400 focus:outline-none hover:text-indigo-500 transition-colors'>
                              visibility
                            </span>
                          </button>

                          <div className='absolute top-2 right-10'>
                            <button
                              onMouseOver={() => setShowInfo2(true)}
                              onMouseLeave={() => setShowInfo2(false)}
                              className=''
                              aria-haspopup='true'
                            >
                              <span className='material-icons-outlined ml-2 text-gray-400 focus:outline-none hover:text-indigo-500 transition-colors'>
                                info
                              </span>
                            </button>
                            <div
                              style={{
                                display: showInfo2 ? '' : 'none',
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
                              onClick={() => {
                                updatePassword(setFieldValue);
                              }}
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
                              onClick={(e) => {
                                setActiveEditBox(false);
                                handleReset(e);
                                setGenderId(customer?.gender);
                                customer?.birthDate &&
                                  setYear(customer.birthDate.split('-')[0]);
                                customer?.birthDate &&
                                  setDay(
                                    customer.birthDate
                                      .split('-')[2]
                                      .slice(0, 2),
                                  );
                                customer?.birthDate &&
                                  setMonth(customer.birthDate.split('-')[1]);
                              }}
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
          <div className='bg-[#ffffff] w-full'>
            <div className='text-title-text mb-[20px]'>Shipping Address</div>
            <div className=''>
              <table className='table table-auto w-full text-default-text'>
                <tbody>
                  {shipAddress.map((ele: any) => {
                    return (
                      <tr>
                        <td className='text-left p-[10px]'>{ele.firstname}</td>
                        <td className='text-left p-[10px]'>
                          {[
                            ele.address1,
                            ele.address2,
                            ele.city,
                            ele.countryName,
                            ele.postalCode,
                          ].join(', ')}{' '}
                        </td>
                        <td className='text-left p-[10px] w-[300px]'>
                          <button
                            className='btn btn-sm btn-secondary text-default-text mr-[5px]'
                            type='button'
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
                            className='btn btn-sm btn-secondary text-default-text mr-[5px]'
                            type='button'
                            onClick={() => {
                              deleteAddress(ele.id, ele.rowVersion);
                            }}
                          >
                            Delete
                          </button>
                          {ele.isDefault ? (
                            'Primary Address'
                          ) : (
                            <button
                              className='btn btn-sm btn-secondary text-default-text'
                              type='button'
                              onClick={() => {
                                updatePrimaryStatus(ele);
                              }}
                            >
                              Make Primary
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className='my-[30px]'>
                <button
                  onClick={() => {
                    router.push({
                      pathname: paths.myAccount.edit_shipping_address,
                    });
                  }}
                  type='button'
                  className='btn btn-secondary'
                >
                  ADD SHIPPING ADDRESS
                </button>
              </div>
            </div>
          </div>

          <div className='bg-[#ffffff] w-full'>
            <div className='text-title-text mb-[20px]'>Billing Address</div>
            <div className=''>
              <table className='table table-auto w-full text-default-text'>
                <tbody>
                  {billingAddress.map((ele: any) => {
                    return (
                      <tr>
                        <td className='text-left p-[10px]'>{ele.firstname}</td>
                        <td className='text-left p-[10px]'>
                          {[
                            ele.address1,
                            ele.address2,
                            ele.city,
                            ele.countryName,
                            ele.postalCode,
                          ].join(', ')}{' '}
                        </td>
                        <td className='text-left p-[10px] w-[300px]'>
                          <button
                            className='btn btn-sm btn-secondary text-default-text mr-[5px]'
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
                            className='btn btn-sm btn-secondary text-default-text mr-[5px]'
                            type='button'
                          >
                            Delete
                          </button>
                          {ele.isDefault ? (
                            'Primary Address'
                          ) : (
                            <button
                              className='btn btn-sm btn-secondary text-default-text mr-[5px]'
                              type='button'
                              onClick={() => {
                                updatePrimaryStatus(ele);
                              }}
                            >
                              Make Primary
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className='my-[30px]'>
                <button
                  onClick={() => {
                    router.push({
                      pathname: paths.myAccount.edit_billing_address,
                    });
                  }}
                  type='button'
                  className='btn btn-secondary'
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

export default MyAccountSetting_Type2;
