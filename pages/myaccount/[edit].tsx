import { UserAddressType } from '@constants/enum';
import { paths } from '@constants/paths.constant';
import { addressMessages } from '@constants/validationMessages';
import { CustomerAddress } from '@definations/APIs/user.res';
import { _Country, _State } from '@definations/app.type';
import getLocation from '@helpers/getLocation';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import {
  CreateUserAddress,
  UpdateUserAddress,
} from '@services/address.service';
import { FetchCountriesList, FetchStatesList } from '@services/general.service';
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
  state: '',
  countryName: '',
  isDefault: false,
};

const Index = () => {
  const [country, setCountry] = useState<Array<_Country>>([]);
  const [editData, setEditData] = useState<CustomerAddress | null>(null);
  const [state, setState] = useState<Array<_State>>([]);
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const [initialValues, setInitialValues] = useState(_initialValues);
  const router = useRouter();
  const { edit } = router.query;
  const { getStoreCustomer, setShowLoader, showModal } = useActions_v2();
  const customer = useTypedSelector_v2((state) => {
    return state.user.customer;
  });
  const customerAddressId: any = router.query.Customer;
  const intTrans: number = parseInt(customerAddressId);

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
    firstName: Yup.string().required(addressMessages.firstName.required),
    lastName: Yup.string(),
    address1: Yup.string().required(addressMessages.address1.required),
    city: Yup.string().required(addressMessages.city.required),
    state: Yup.string().required(addressMessages.state.required),
    postalCode: Yup.string().required(addressMessages.postalCode.required),
    phone: Yup.string().required(addressMessages.phone.required),
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

  const submitHandler = async (values: any) => {
    const data = await getLocation();
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

      await getStoreCustomer(customerId || 0);
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
    setShowLoader(false);
    router.push('/myaccount/Address');
  };

  return (
    <>
      {edit === paths.myAccount.editShippingAddress ||
      edit === paths.myAccount.editBillingAddress ? (
        <>
          <div className='w-4/4 lg:w-4/5'>
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
              }) => (
                <>
                  <form onSubmit={handleSubmit}>
                    <div className='flex flex-wrap mx-[-15px]'>
                      <div className='w-full md:w-2/4 px-[15px]'>
                        <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
                          <label className='text-default-text font-[600] w-full md:w-full md:text-left'>
                            First Name <span className='text-red-600'>*</span>
                          </label>
                          <div className='grow'>
                            <input
                              id='firstName'
                              name='firstName'
                              placeholder='Enter Your First Name'
                              className='form-input'
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
                          <label className='text-default-text font-[600] w-full md:w-full md:text-left'>
                            Last Name
                          </label>
                          <div className='grow'>
                            <input
                              id='lastName'
                              name='lastName'
                              placeholder='Enter Your Last Name'
                              className='form-input'
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
                          <label className='text-default-text font-[600] w-full md:w-full md:text-left'>
                            Phone Number <span className='text-red-600'>*</span>
                          </label>
                          <div className='grow'>
                            <input
                              id='phone'
                              name='phone'
                              placeholder='1234567890'
                              className='form-input bg-slate-400'
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
                          <label className='text-default-text font-[600] w-full md:w-full md:text-left'>
                            Street Address{' '}
                            <span className='text-red-600'>*</span>
                          </label>
                          <div className='grow'>
                            <input
                              id='address1'
                              name='address1'
                              placeholder='132, Street'
                              className='form-input'
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

                      <div className='w-full md:w-2/4 px-[15px]'>
                        <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
                          <label className='text-default-text font-[600] w-full md:w-full md:text-left'>
                            ZIP Code <span className='text-red-600'>*</span>
                          </label>
                          <div className='grow'>
                            <input
                              id='postalCode'
                              name='postalCode'
                              placeholder='01234'
                              className='form-input bg-slate-400'
                              value={values.postalCode}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>
                        <div className='text-red-500 text-s mt-1'>
                          {touched.postalCode && errors.postalCode}
                        </div>
                      </div>

                      <div className='w-full md:w-1/3 px-[15px]'>
                        <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
                          <label className='text-default-text font-[600] w-full md:w-full md:text-left'>
                            City <span className='text-red-600'>*</span>
                          </label>
                          <div className='grow'>
                            <input
                              id='city'
                              name='city'
                              placeholder='City'
                              value={values.city}
                              className='form-input'
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

                      <div className='w-full md:w-1/3 px-[15px]'>
                        <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
                          <label className='text-default-text font-[600] w-full md:w-full md:text-left'>
                            State <span className='text-red-600'>*</span>
                          </label>
                          <div className='grow'>
                            <select
                              id='state'
                              name='state'
                              className='form-input'
                              value={values.state}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              onBlur={handleBlur}
                            >
                              <option>Select State</option>
                              {state.map((res, index) => (
                                <option key={index}>{res?.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className='text-red-500 text-s mt-1'>
                          {touched.state && errors.state}
                        </div>
                      </div>

                      <div className='w-full md:w-1/3 px-[15px]'>
                        <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
                          <label className='text-default-text font-[600] w-full md:w-full md:text-left'>
                            Country <span className='text-red-600'>*</span>
                          </label>
                          <div className='grow'>
                            <select
                              id='country'
                              name='countryName'
                              className='form-input'
                              value={values.countryName}
                              onChange={(e) => {
                                handleChange(e);
                                loadState(e.target.value);
                              }}
                              onBlur={handleBlur}
                            >
                              <option>Select Country</option>
                              {country.map((res, index) => (
                                <option key={index}>{res?.name}</option>
                              ))}
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
                          className='btn btn-primary'
                        >
                          Save
                        </button>
                        <button
                          className='btn btn-secondary uppercase'
                          onClick={() => router.push(paths.myAccount.address)}
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
        </>
      ) : (
        <Custom404 />
      )}
    </>
  );
};

export default Index;
