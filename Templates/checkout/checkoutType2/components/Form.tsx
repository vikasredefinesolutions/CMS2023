import NxtImage from '@appComponents/reUsable/Image';
import { AddressType } from '@controllers/checkoutController/CheckoutAddressForm';
import { _Country, _State } from '@definations/app.type';
import { FetchCountriesList, FetchStatesList } from '@services/general.service';
import { getLocationWithZipCode } from '@services/user.service';
import { FormikErrors, FormikTouched } from 'formik';
import React, { useEffect, useState } from 'react';

interface _Props {
  addressformik: any;
  values: AddressType;
  touched: FormikTouched<AddressType>;
  errors: FormikErrors<AddressType>;
}

const AddressFormPk: React.FC<_Props> = ({
  addressformik,
  touched,
  errors,
  values,
}) => {
  const [countries, setCountries] = useState<_Country[] | []>([]);
  const [stateList, setStateList] = useState<_State[] | []>([]);
  const [countryId, setCountryId] = useState<number>(0);

  const getStateCountry = async (zipCode: string) => {
    const res = await getLocationWithZipCode(zipCode);

    return res;
  };

  const customHandleBlur = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    addressformik.handleBlur(e);

    if (e.target.value.trim().length === 0) return;
    getStateCountry(e.target.value).then((res) => {
      if (res?.countryId) {
        addressformik.setFieldValue('city', res.cityName);
        addressformik.setFieldValue('countryName', res.countryName);
        FetchStatesList(res.countryId).then((response) => {
          if (response) {
            setStateList(response);

            addressformik.setFieldValue('state', res.stateName);
          }
        });
      }
    });
  };
  useEffect(() => {
    FetchCountriesList().then((res) => {
      if (res) {
        setCountries(res);
        setCountryId(res[0].id);
      }
    });
  }, []);

  useEffect(() => {
    FetchStatesList(countryId).then((res) => {
      if (res) {
        setStateList(res);
      }
    });
  }, [countryId]);

  return (
    <>
      <form>
        <div id='ShippingAddress'>
          <div className='text-default-text text-[#84694d] mt-[10px] mb-[20px]'>
            All Fields marked * are required fields.
          </div>
          <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
            <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
              <label className='mb-[4px] text-normal-text'>First Name*</label>
              <div className='flex flex-wrap justify-between items-center'>
                <input
                  onBlur={addressformik.handleBlur}
                  onChange={addressformik.handleChange}
                  name='firstname'
                  placeholder=' '
                  value={values.firstname}
                  className='form-input !w-[calc(100%-40px)]'
                />
                {!!touched.firstname && errors?.firstname === undefined && (
                  <NxtImage
                    alt=''
                    isStatic={true}
                    className='ml-[5px] '
                    src='/yes.png'
                  />
                )}

                {!!touched.firstname && errors?.firstname && (
                  <NxtImage
                    alt=''
                    isStatic={true}
                    className='ml-[5px]'
                    src='/no.png'
                  />
                )}
              </div>
            </div>
            <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
              <label className='mb-[4px] text-normal-text'>Last Name*</label>
              <div className='flex flex-wrap justify-between items-center'>
                <input
                  onBlur={addressformik.handleBlur}
                  onChange={addressformik.handleChange}
                  name='lastName'
                  placeholder=' '
                  value={values.lastName}
                  className='form-input !w-[calc(100%-40px)]'
                />
                {!!touched.lastName && errors?.lastName === undefined && (
                  <NxtImage
                    alt=''
                    isStatic={true}
                    className='ml-[5px] '
                    src='/yes.png'
                  />
                )}

                {!!touched.lastName && errors?.lastName && (
                  <NxtImage
                    alt=''
                    isStatic={true}
                    className='ml-[5px]'
                    src='/no.png'
                  />
                )}
              </div>
            </div>
          </div>
          <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
            <div className='mb-[15px] w-full pl-[15px] pr-[15px]'>
              <label className='mb-[4px] text-normal-text'>
                Street Address*
              </label>
              <div className='flex flex-wrap justify-between items-center'>
                <input
                  onBlur={addressformik.handleBlur}
                  onChange={addressformik.handleChange}
                  name='address1'
                  placeholder=' '
                  value={values.address1}
                  className='form-input !w-[calc(100%-40px)]'
                />
                {!!touched.address1 &&
                  values.address1 !== '' &&
                  errors?.address1 === undefined && (
                    <NxtImage
                      alt=''
                      isStatic={true}
                      className='ml-[5px] '
                      src='/yes.png'
                    />
                  )}

                {!!touched.address1 && values.address1 === '' && (
                  <NxtImage
                    alt=''
                    isStatic={true}
                    className='ml-[5px]'
                    src='/no.png'
                  />
                )}
              </div>
            </div>
          </div>
          <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
            <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
              <label className='mb-[4px] text-normal-text'>Apt, Suite</label>
              <input
                onBlur={addressformik.handleBlur}
                onChange={addressformik.handleChange}
                name='suite'
                placeholder=' '
                value={values.suite}
                className='form-input !w-[calc(100%-40px)]'
              />
            </div>
            <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
              <label className='mb-[4px] text-normal-text'>Zip Code*</label>
              <div className='flex flex-wrap justify-between items-center'>
                <input
                  onChange={addressformik.handleChange}
                  name='postalCode'
                  placeholder=' '
                  onBlur={customHandleBlur}
                  value={values.postalCode}
                  className='form-input  !w-[calc(100%-40px)]'
                />
                {!!touched.postalCode &&
                  values.postalCode !== '' &&
                  errors?.postalCode === undefined && (
                    <NxtImage
                      alt=''
                      isStatic={true}
                      className='ml-[5px] '
                      src='/yes.png'
                    />
                  )}

                {!!touched.postalCode && values.postalCode === '' && (
                  <NxtImage
                    alt=''
                    isStatic={true}
                    className='ml-[5px]'
                    src='/no.png'
                  />
                )}
              </div>
            </div>
          </div>
          <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
            <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
              <label className='mb-[4px] text-normal-text'>City*</label>
              <div className='flex flex-wrap justify-between items-center'>
                <input
                  onBlur={addressformik.handleBlur}
                  onChange={addressformik.handleChange}
                  name='city'
                  placeholder=' '
                  value={values.city}
                  className='form-input  !w-[calc(100%-40px)]'
                />
                {!!touched.city && errors?.city === undefined && (
                  <NxtImage
                    alt=''
                    isStatic={true}
                    className='ml-[5px] '
                    src='/yes.png'
                  />
                )}

                {!!touched.city && errors?.city && (
                  <NxtImage
                    alt=''
                    isStatic={true}
                    className='ml-[5px]'
                    src='/no.png'
                  />
                )}
              </div>
            </div>
            <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
              <label className='mb-[4px] text-normal-text'>
                State / Province*
              </label>
              <div className='flex flex-wrap justify-between items-center'>
                <select
                  className='form-input !w-[calc(100%-40px)]'
                  placeholder='Select Country'
                  name='state'
                  onChange={addressformik.handleChange}
                  value={values.state}
                >
                  <option value={''}>Select State</option>

                  {stateList.map((item) => {
                    if (values.state == item.name) {
                      return (
                        <option value={item.name} selected>
                          {item.name}
                        </option>
                      );
                    }
                    return <option value={item.name}>{item.name}</option>;
                  })}
                </select>
                {!!touched.state &&
                  values.state !== '' &&
                  errors?.state === undefined && (
                    <NxtImage
                      alt=''
                      isStatic={true}
                      className='ml-[5px] '
                      src='/yes.png'
                    />
                  )}

                {!!touched.state && values.state === '' && (
                  <NxtImage
                    alt=''
                    isStatic={true}
                    className='ml-[5px]'
                    src='/no.png'
                  />
                )}
              </div>
            </div>
          </div>
          <div className='flex flex-wrap ml-[-15px] mr-[-15px] mb-[30px]'>
            <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
              <label className='mb-[4px] text-normal-text'>Country*</label>
              <div className='flex flex-wrap justify-between items-center'>
                <select
                  className='form-input !w-[calc(100%-40px)]'
                  placeholder='Select Country'
                  name='countryName'
                  onBlur={addressformik.handleBlur}
                  onChange={(e) => {
                    let id = countries.find(
                      (item) => item.name === e.target.value,
                    );
                    if (id) {
                      setCountryId(id.id);
                      addressformik.setFieldValue(
                        'countryName',
                        e.target.value,
                      );
                      addressformik.setFieldValue('state', '');
                      addressformik.setTouched({ state: true });
                    } else {
                      addressformik.setFieldValue('countryName', '');
                      addressformik.setTouched({ state: true });

                      addressformik.setFieldValue('state', '');
                    }
                  }}
                  value={values.countryName}
                >
                  <option value={''}>Select Country</option>
                  {countries.map((item) => {
                    if (values.countryName == item.name) {
                      return (
                        <option value={item.name} selected>
                          {item.name}
                        </option>
                      );
                    }
                    return <option value={item.name}>{item.name}</option>;
                  })}
                </select>
                {!!touched.countryName &&
                  values.countryName !== '' &&
                  errors?.countryName === undefined && (
                    <NxtImage
                      alt=''
                      isStatic={true}
                      className='ml-[5px] '
                      src='/yes.png'
                    />
                  )}

                {!!touched.countryName && values.countryName === '' && (
                  <NxtImage
                    alt=''
                    isStatic={true}
                    className='ml-[5px]'
                    src='/no.png'
                  />
                )}
              </div>
            </div>
            <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
              <label className='mb-[4px] text-normal-text'>Phone Number*</label>
              <div className='flex flex-wrap justify-between items-center'>
                <input
                  onBlur={addressformik.handleBlur}
                  onChange={addressformik.handleChange}
                  name='phone'
                  placeholder=' '
                  value={values.phone}
                  className='form-input  !w-[calc(100%-40px)]'
                />
                {!!touched.phone && errors?.phone === undefined && (
                  <NxtImage
                    alt=''
                    isStatic={true}
                    className='ml-[5px] '
                    src='/yes.png'
                  />
                )}

                {!!touched.phone && errors?.phone && (
                  <NxtImage
                    alt=''
                    isStatic={true}
                    className='ml-[5px]'
                    src='/no.png'
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddressFormPk;
