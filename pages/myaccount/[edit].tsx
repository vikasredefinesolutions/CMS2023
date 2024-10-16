import { UserAddressType } from '@constants/enum';
import {
  HEALTHYPOINTS,
  SIMPLI_SAFE_CODE,
  UCA,
  phonePattern1,
  phonePattern2,
  phonePattern3,
  phonePattern4,
} from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import { __ValidationText } from '@constants/validation.text';
import { addressMessages } from '@constants/validationMessages';
import { CustomerAddress } from '@definations/APIs/user.res';
import { _Country, _Industry, _State } from '@definations/app.type';
import getLocation from '@helpers/getLocation';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import {
  CreateUserAddress,
  UpdateUserAddress,
} from '@services/address.service';
import { FetchCountriesList, FetchStatesList } from '@services/general.service';
import { getLocationWithZipCode } from '@services/user.service';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import Custom404 from 'pages/404';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

export const _initialValues = {
  firstName: '',
  lastName: '',
  phone: '',
  address1: '',
  aptSuite: '',
  postalCode: '',
  city: '',
  state: 'Alabama',
  countryName: 'United States',
  isDefault: false,
};

const Index = () => {
  const [country, setCountry] = useState<Array<_Country>>([]);
  const [editData, setEditData] = useState<CustomerAddress | null>(null);
  const [state, setState] = useState<Array<_State>>([]);
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const [initialValues, setInitialValues] = useState(_initialValues);
  const [shipAddress, setShipAddress] = useState<any>([]);
  const [billingAddress, setBilingAddress] = useState<any>([]);
  const router = useRouter();
  const { edit } = router.query;
  const { getStoreCustomer, setShowLoader, showModal } = useActions_v2();
  const customer = useTypedSelector_v2((state) => {
    return state.user.customer;
  });
  const customerAddressId: any = router.query.Customer;
  const intTrans: number = parseInt(customerAddressId);
  const [states, setStates] = useState<_Industry[]>([]);
  const [countries, setCountries] = useState<_Industry[]>([]);
  const [countryChange, setCoutryChange] = useState<number>(0);
  const storeCode = useTypedSelector_v2((state) => state.store.code);

  useEffect(() => {
    if (customer) {
      const addressData = customer?.customerAddress.filter((res) => {
        return res.id === intTrans;
      });
      if (addressData) {
        setEditData(addressData[0]);
      }
      if (editData && country.length > 0) {
        loadState(editData.countryName || '').then(() => {
          setInitialValues({
            firstName: editData.firstname,
            lastName: editData.lastName,
            phone: editData.phone,
            address1: editData.address1,
            aptSuite: editData.suite,
            postalCode: editData.postalCode,
            city: editData.city,
            state: editData.state,
            countryName: editData.countryName,
            isDefault: editData.isDefault,
          });
        });
      }
    }
  }, [customer, country]);

  useEffect(() => {
    FetchCountriesList().then((res) => {
      if (res) {
        setCountry(res);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .trim()
      .required(addressMessages.firstName.required)
      .min(
        addressMessages.firstName.minlength,
        addressMessages.firstName.minValidation,
      ),
    lastName: Yup.string()
      .trim()
      .required(addressMessages.lastName.required)
      .min(
        addressMessages.lastName.minlength,
        addressMessages.lastName.minValidation,
      ),
    address1: Yup.string().trim().required(addressMessages.address1.required),
    city: Yup.string().trim().required(addressMessages.city.required),
    state: Yup.string().required(addressMessages.state.required),
    postalCode: Yup.string()
      .trim()
      .required(addressMessages.postalCode.required)
      .max(
        __ValidationText.signUp.storeCustomerAddress.postalCode.maxLength,
        'Postal code must be less than 9',
      ),
    phone: Yup.string()
      .required(__ValidationText.signUp.storeCustomerAddress.phone.required)
      .trim()
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
    countryName: Yup.string().required(addressMessages.countryName.required),
  });

  const loadState = async (countryName: string) => {
    const id = country.find(
      (res) => res.name.toLowerCase() === countryName.toLowerCase(),
    );
    if (id) {
      const state = await FetchStatesList(id.id);
      if (state) {
        setState(state);
      }
      return state;
    }
    return null;
  };

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

  const submitHandler = async (values: any) => {
    const data = await getLocation();

    if (
      (edit === paths.myAccount.editShippingAddress &&
        shipAddress.length < 1) ||
      (edit === paths.myAccount.editBillingAddress && billingAddress.length < 1)
    ) {
      values.isDefault = true;
    }

    const obj = {
      storeCustomerAddressModel: {
        id: editData ? editData.id : 0,
        rowVersion: editData ? editData.rowVersion : '',
        location: `${data.city}, ${data.region}, ${data.country}, ${data.postal_code}`,
        ipAddress: data.ip_address,
        macAddress: '00-00-00-00-00-00',
        customerId: customerId || 0,
        firstname: values.firstName,
        lastName: values.lastName,
        email: customer ? customer.email : '',
        address1: values.address1,
        address2: values.address2 || ' ',
        suite: values.aptSuite || ' ',
        city: values.city,
        state: values.state,
        postalCode: values.postalCode,
        phone: values.phone,
        fax: values.fax ? values.fax : '',
        countryName: values.countryName,
        countryCode: '91',
        addressType:
          edit === paths.myAccount.editShippingAddress
            ? UserAddressType.SHIPPINGADDRESS
            : UserAddressType.BILLINGADDRESS,
        isDefault: values.isDefault,
        recStatus: 'A',
        companyName: values.companyName || ' ',
      },
    };

    setShowLoader(true);
    if (editData) {
      await UpdateUserAddress(obj)
        .then(() => {
          showModal({
            message: 'Address updated successfully',
            title: 'Success',
          });
          setEditData(null);
        })
        .catch(() => {
          showModal({
            message: 'Something went wrong',
            title: 'Failed',
          });
        });
    } else {
      await CreateUserAddress(obj)
        .then((res) => {
          showModal({
            message: 'Address saved successfully',
            title: 'Success',
          });
          setInitialValues(_initialValues);
        })
        .catch(() => {
          showModal({
            message: 'Something went wrong',
            title: 'Failed',
          });
        });
    }
    await getStoreCustomer(customerId || 0);
    setShowLoader(false);
    router.push(paths.myAccount.account_settings);
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
        setFieldValue('city', res.cityName);
        setFieldValue('countryName', res.countryName);
        FetchStatesList(res.countryId).then((response) => {
          setStates(response ? response : []);

          setFieldValue('state', res.stateName);
        });
      }
    });
  };

  useEffect(() => {
    FetchStatesList(countryChange).then((res) => res && setStates(res));
  }, [countryChange]);

  const callOptionAPIs = () => {
    FetchCountriesList().then((countriesExist) => {
      if (countriesExist) {
        setCountries(countriesExist);
        FetchStatesList(countriesExist[0].id).then(
          (res) => res && setStates(res),
        );
      }
    });
  };
  useEffect(() => {
    callOptionAPIs();
  }, []);

  return (
    <>
      {edit === paths.myAccount.editShippingAddress ||
      edit === paths.myAccount.editBillingAddress ? (
        <>
          <div className='container mx-auto'>
            <div className='bg-white pt-6 pb-6'>
              <div className='w-full mx-auto max-w-5xl p-5'>
                <Formik
                  onSubmit={submitHandler}
                  validationSchema={validationSchema}
                  initialValues={initialValues}
                  enableReinitialize
                >
                  {({
                    errors,
                    touched,
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    submitForm,
                    isSubmitting,
                    setFieldValue,
                  }) => (
                    <>
                      <form onSubmit={handleSubmit}>
                        <div className='flex flex-wrap mx-[-15px]'>
                          <div className='w-full md:w-2/4 px-[15px]'>
                            <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
                              <label
                                className='text-default-text font-[600] w-full md:w-full md:text-left'
                                htmlFor='firstName'
                              >
                                First Name{' '}
                                <span className='text-red-600'>*</span>
                              </label>
                              <div className='grow'>
                                <input
                                  id='firstName'
                                  name='firstName'
                                  placeholder='Enter Your First Name'
                                  className={`form-input ${
                                    touched.firstName &&
                                    errors.firstName &&
                                    (storeCode === UCA ||
                                      storeCode === HEALTHYPOINTS)
                                      ? 'has-error'
                                      : ''
                                  }`}
                                  value={values.firstName}
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  onBlur={handleBlur}
                                />
                              </div>
                            </div>
                            <div className='text-red-500 text-s mt-1'>
                              {touched.firstName && errors.firstName}
                            </div>
                          </div>

                          <div className='w-full md:w-2/4 px-[15px]'>
                            <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
                              <label
                                className='text-default-text font-[600] w-full md:w-full md:text-left'
                                htmlFor='lastName'
                              >
                                Last Name{' '}
                                <span className='text-red-600'>*</span>
                              </label>
                              <div className='grow'>
                                <input
                                  id='lastName'
                                  name='lastName'
                                  placeholder='Enter Your Last Name'
                                  className={`form-input ${
                                    touched.lastName &&
                                    errors.lastName &&
                                    (storeCode === UCA ||
                                      storeCode === HEALTHYPOINTS)
                                      ? 'has-error'
                                      : ''
                                  }`}
                                  value={values.lastName}
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  onBlur={handleBlur}
                                />
                              </div>
                            </div>
                            <div className='text-red-500 text-s mt-1'>
                              {touched.lastName && errors.lastName}
                            </div>
                          </div>

                          <div className='w-full md:w-4/4 px-[15px]'>
                            <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
                              <label
                                className='text-default-text font-[600] w-full md:w-full md:text-left'
                                htmlFor='phone'
                              >
                                Phone Number{' '}
                                <span className='text-red-600'>*</span>
                              </label>
                              <div className='grow'>
                                <input
                                  id='phone'
                                  name='phone'
                                  placeholder='1234567890'
                                  className={`form-input bg-slate-400 ${
                                    touched.phone &&
                                    errors.phone &&
                                    (storeCode === UCA ||
                                      storeCode === HEALTHYPOINTS)
                                      ? 'has-error'
                                      : ''
                                  }`}
                                  value={values.phone}
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  onBlur={handleBlur}
                                />
                              </div>
                              <div className='w-full md:w-full md:text-left grow'>
                                <p>*For delivery questions only</p>
                              </div>
                            </div>
                            <div className='text-red-500 text-s mt-1'>
                              {touched.phone && errors.phone}
                            </div>
                          </div>

                          <div className='w-full md:w-4/4 px-[15px]'>
                            <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
                              <label
                                className='text-default-text font-[600] w-full md:w-full md:text-left'
                                htmlFor='address1'
                              >
                                Street Address{' '}
                                <span className='text-red-600'>*</span>
                              </label>
                              <div className='grow'>
                                <input
                                  id='address1'
                                  name='address1'
                                  placeholder='132, Street'
                                  className={`form-input ${
                                    touched.address1 &&
                                    errors.address1 &&
                                    (storeCode === UCA ||
                                      storeCode === HEALTHYPOINTS)
                                      ? 'has-error'
                                      : ''
                                  }`}
                                  value={values.address1}
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  onBlur={handleBlur}
                                />
                              </div>
                              <div className='w-full md:w-full md:text-left grow'>
                                <p>*We cannot ship to PO boxes or APO/FPO</p>
                              </div>
                            </div>
                            <div className='text-red-500 text-s mt-1'>
                              {touched.address1 && errors.address1}
                            </div>
                          </div>

                          {storeCode == SIMPLI_SAFE_CODE ||
                          storeCode == HEALTHYPOINTS ||
                          storeCode == UCA ? (
                            <></>
                          ) : (
                            <div className='w-full md:w-2/4 px-[15px]'>
                              <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
                                <label className='text-default-text font-[600] w-full md:w-full md:text-left'>
                                  Apt, Suite
                                </label>
                                <div className='grow'>
                                  <input
                                    id='aptSuite'
                                    name='aptSuite'
                                    placeholder='12'
                                    className='form-input'
                                    value={values.aptSuite}
                                    onChange={(e) => {
                                      handleChange(e);
                                    }}
                                    onBlur={handleBlur}
                                  />
                                </div>
                              </div>
                              <div className='text-red-500 text-s mt-1'>
                                {touched.aptSuite && errors.aptSuite}
                              </div>
                            </div>
                          )}

                          <div className='w-full md:w-2/4 px-[15px]'>
                            <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
                              <label
                                className='text-default-text font-[600] w-full md:w-full md:text-left'
                                htmlFor='postalCode'
                              >
                                ZIP Code <span className='text-red-600'>*</span>
                              </label>
                              <div className='grow'>
                                <input
                                  id='postalCode'
                                  name='postalCode'
                                  placeholder='01234'
                                  className={`form-input bg-slate-400 ${
                                    touched.postalCode &&
                                    errors.postalCode &&
                                    (storeCode === UCA ||
                                      storeCode === HEALTHYPOINTS)
                                      ? 'has-error'
                                      : ''
                                  }`}
                                  value={values.postalCode}
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  onBlur={(e) => {
                                    customHandleBlur(
                                      e,
                                      handleBlur,
                                      setFieldValue,
                                    );
                                  }}
                                />
                              </div>
                            </div>
                            <div className='text-red-500 text-s mt-1'>
                              {touched.postalCode && errors.postalCode}
                            </div>
                          </div>

                          <div className='w-full md:w-2/4 px-[15px]'>
                            <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
                              <label
                                className='text-default-text font-[600] w-full md:w-full md:text-left'
                                htmlFor='city'
                              >
                                City <span className='text-red-600'>*</span>
                              </label>
                              <div className='grow'>
                                <input
                                  id='city'
                                  name='city'
                                  placeholder='City'
                                  value={values.city}
                                  className={`form-input ${
                                    touched.city &&
                                    errors.city &&
                                    (storeCode === UCA ||
                                      storeCode === HEALTHYPOINTS)
                                      ? 'has-error'
                                      : ''
                                  }`}
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  onBlur={handleBlur}
                                />
                              </div>
                            </div>
                            <div className='text-red-500 text-s mt-1'>
                              {touched.city && errors.city}
                            </div>
                          </div>

                          <div className='w-full md:w-2/4 px-[15px]'>
                            <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
                              <label
                                className='text-default-text font-[600] w-full md:w-full md:text-left'
                                htmlFor='state'
                              >
                                State <span className='text-red-600'>*</span>
                              </label>
                              <div className='grow'>
                                {/* <select
                                id='state'
                                name='state'
                                className='form-input'
                                value={values.state}
                                onChange={(e) => {
                                  if (
                                    e.target.value.toLowerCase() ===
                                    'select state'
                                  ) {
                                    return setFieldValue('state', '');
                                  }
                                  handleChange(e);
                                }}
                                onBlur={handleBlur}
                              >
                                <option value=''>Select State</option>
                                {state.map((res, index) => (
                                  <option key={index}>{res?.name}</option>
                                ))}
                              </select> */}
                                <select
                                  className={`form-input ${
                                    touched.state &&
                                    errors.state &&
                                    (storeCode === UCA ||
                                      storeCode === HEALTHYPOINTS)
                                      ? 'has-error'
                                      : ''
                                  }`}
                                  onBlur={handleBlur}
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  name='state'
                                  id='state'
                                  value={values.state}
                                >
                                  <>
                                    {countries.length === 0 ? (
                                      <option>No State found</option>
                                    ) : (
                                      ''
                                    )}
                                    {states?.map((opt) => (
                                      <option
                                        id={opt.id.toString()}
                                        key={opt.id}
                                      >
                                        {opt.name}
                                      </option>
                                    ))}
                                  </>
                                </select>
                              </div>
                            </div>
                            <div className='text-red-500 text-s mt-1'>
                              {touched.state && errors.state}
                            </div>
                          </div>

                          <div className='w-full md:w-2/4 px-[15px]'>
                            <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
                              <label
                                className='text-default-text font-[600] w-full md:w-full md:text-left'
                                htmlFor='countryName'
                              >
                                Country <span className='text-red-600'>*</span>
                              </label>
                              <div className='grow'>
                                {/* <select
                                id='country'
                                name='countryName'
                                className='form-input'
                                value={values.countryName}
                                onChange={(e) => {
                                  if (
                                    e.target.value.toLowerCase() ===
                                    'select country'
                                  ) {
                                    return setFieldValue('countryName', '');
                                  }
                                  handleChange(e);
                                  loadState(e.target.value);
                                }}
                                onBlur={handleBlur}
                              >
                                <option>Select Country</option>
                                {country.map((res, index) => (
                                  <option key={index}>{res?.name}</option>
                                ))}
                              </select> */}
                                <select
                                  className={`form-input ${
                                    touched.countryName &&
                                    errors.countryName &&
                                    (storeCode === UCA ||
                                      storeCode === HEALTHYPOINTS)
                                      ? 'has-error'
                                      : ''
                                  }`}
                                  onBlur={handleBlur}
                                  onChange={(e) => {
                                    handleChange(e);
                                    setCoutryChange(
                                      +e.target[e?.target.selectedIndex].id,
                                    );
                                  }}
                                  name='countryName'
                                  value={values.countryName}
                                >
                                  <>
                                    {countries.length === 0 ? (
                                      <option>No State found</option>
                                    ) : (
                                      ''
                                    )}
                                    {countries?.map((opt) => (
                                      <option
                                        id={opt.id.toString()}
                                        key={opt.id}
                                      >
                                        {opt.name}
                                      </option>
                                    ))}
                                  </>
                                </select>
                              </div>
                            </div>
                            <div className='text-red-500 text-s mt-1'>
                              {touched.countryName && errors.countryName}
                            </div>
                          </div>
                        </div>
                      </form>

                      <div className='w-full text-center'>
                        <div className='flex flex-wrap items-center gap-2 pt-[40px]'>
                          <div className='grow'>
                            <button
                              type='submit'
                              disabled={isSubmitting}
                              onClick={submitForm}
                              className='btn btn-primary mr-1'
                            >
                              Save
                            </button>
                            <button
                              className='btn btn-secondary uppercase'
                              onClick={() =>
                                router.push(paths.myAccount.account_settings)
                              }
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Custom404 />
      )}
    </>
  );
};

export default Index;
