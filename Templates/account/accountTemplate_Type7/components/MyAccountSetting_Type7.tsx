import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { __ValidationText } from '@constants/validation.text';
import getLocation from '@helpers/getLocation';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import {
  deleteCustomerAddress,
  udpateIsDefaultAddress,
} from '@services/address.service';
import { UpdateUserData } from '@services/user.service';
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
const MyAccountSetting_Type7 = () => {
  const { setShowLoader, showModal, getStoreCustomer } = useActions_v2();
  const customer = useTypedSelector_v2((state) => state.user.customer);
  const [activeEditBox, setActiveEditBox] = useState<boolean>(false);
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');

  const [initialValues, setInitialValues] = useState<SettingForm>(initValue);
  const [shipAddress, setShipAddress] = useState<any>([]);
  const [billingAddress, setBilingAddress] = useState<any>([]);
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const router = useRouter();

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

  useEffect(() => {
    if (shipAddress.length === 1) {
      !shipAddress[0].isDefault && updatePrimaryStatus(shipAddress[0]);
    }

    if (billingAddress.length === 1) {
      !billingAddress[0].isDefault && updatePrimaryStatus(billingAddress[0]);
    }
  }, [shipAddress, billingAddress]);

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
  });
  useEffect(() => {
    if (customer) {
      setInitialValues({
        firstName: customer.firstname,
        lastName: customer.lastName,
        companyName: '',
        gender: customer.gender,
        birthDate: customer.birthDate,
        password: '',
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
        password: '',
        customerId: customer?.id || 0,
        gender: '',
        birthDate: new Date(),
      });

      if (res) {
        showModal({
          message: 'Updated User Details Successfully',
          title: 'Updated',
        });
        setActiveEditBox(false);
      } else {
        showModal({
          message: 'Something went wrong please try again',
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
      <div className='w-4/4 lg:w-4/5 px-0px md: px-[20px]'>
        <div className='gird grid-cols-1 lg:flex lg:items-center flex-wrap'>
          <div className='w-full max-w-4xl'>
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
              }) => (
                <div className='w-full max-w-xs'>
                  <Form>
                    <div className='mb-[40px] '>
                      <div className='flex flex-wrap items-center gap-[8px] mt-[10px]'>
                        <label className='text-default-text font-[600] w-full'>
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
                        {touched.firstName && errors.firstName && (
                          <p className='text-red-500 text-xs mt-1'>
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div className='flex flex-wrap items-center gap-[8px] mt-[10px]'>
                        <label className='text-default-text font-[600] w-full'>
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
                        {touched.lastName && errors.lastName && (
                          <p className='text-red-500 text-xs mt-1'>
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                      <div className='flex flex-wrap items-center gap-[8px] mt-[10px]'>
                        <label className='text-default-text font-[600] w-full'>
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

                      <div className='flex flex-wrap items-center gap-2 max-w-3xl pt-[40px]'>
                        <div className='grow'>
                          {!activeEditBox ? (
                            <button
                              type='button'
                              onClick={(e) => {
                                e.preventDefault();
                                setActiveEditBox(true);
                              }}
                              className='btn btn-primary btn-md'
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
                                }}
                                className='ml-2 btn btn-primary'
                              >
                                {__pagesText.accountPage.cancelBtn}
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
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
                        <td className='text-left p-[10px]'>
                          {ele.firstname} {ele.lastName}
                        </td>
                        <td className='text-left p-[10px]'>
                          <>{ele.address1}, </>
                          {ele.suite && ele.suite.trim() != '' && (
                            <> {ele.suite}, </>
                          )}
                          {[
                            ele.state,
                            ele.city,
                            ele.countryName,
                            ele.postalCode,
                          ].join(', ')}{' '}
                        </td>
                        <td className='text-left p-[10px] w-[300px]'>
                          <button
                            className='btn btn-sm btn-primary text-default-text mr-[5px] mt-[5px] mb-[5px]'
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
                          {shipAddress.length > 1 ? (
                            <button
                              className='btn btn-sm btn-primary text-default-text mr-[5px] mt-[5px] mb-[5px]'
                              type='button'
                              onClick={() => {
                                deleteAddress(ele.id, ele.rowVersion);
                              }}
                            >
                              Delete
                            </button>
                          ) : null}

                          {ele.isDefault ? (
                            'Primary Address'
                          ) : (
                            <button
                              className='btn btn-sm btn-primary text-default-text mt-[5px] mb-[5px]'
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
                  className='btn btn-primary'
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
                        <td className='text-left p-[10px]'>
                          {ele.firstname} {ele.lastName}
                        </td>
                        <td className='text-left p-[10px]'>
                          <>{ele.address1}, </>
                          {ele.suite && ele.suite.trim() != '' && (
                            <> {ele.suite}, </>
                          )}
                          {[
                            ele.state,
                            ele.city,
                            ele.countryName,
                            ele.postalCode,
                          ].join(', ')}{' '}
                        </td>
                        <td className='text-left p-[10px] w-[300px]'>
                          <button
                            className='btn btn-sm btn-primary text-default-text mr-[5px] mt-[5px] mb-[5px]'
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
                          {billingAddress.length > 1 ? (
                            <button
                              className='btn btn-sm btn-primary text-default-text mr-[5px] mt-[5px] mb-[5px]'
                              type='button'
                              onClick={() => {
                                deleteAddress(ele.id, ele.rowVersion);
                              }}
                            >
                              Delete
                            </button>
                          ) : null}

                          {ele.isDefault ? (
                            'Primary Address'
                          ) : (
                            <button
                              className='btn btn-sm btn-primary text-default-text mr-[5px] mt-[5px] mb-[5px]'
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
                  className='btn btn-primary'
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

export default MyAccountSetting_Type7;
