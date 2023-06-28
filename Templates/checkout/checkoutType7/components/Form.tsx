import { _shippingMethod } from '@controllers/checkoutController';
import { _Country, _State } from '@definations/app.type';
import { GetCartTotals, useTypedSelector_v2 } from '@hooks_v2/index';
import { GetShippingmethod } from '@services/address.service';
import { FetchCountriesList, FetchStatesList } from '@services/general.service';
import { getLocationWithZipCode } from '@services/user.service';
import { FormikErrors, FormikTouched } from 'formik';
import React, { useEffect, useState } from 'react';
import { _CO2_AddressFields } from '..';

interface _Props {
  addressformik: any;
  values: _CO2_AddressFields;
  touched: FormikTouched<_CO2_AddressFields>;
  errors: FormikErrors<_CO2_AddressFields>;
  changeShipping?: (city: string, state: string, country: string) => void;
  setShippingMethod: (args: _shippingMethod[]) => void;
  setSelectedShipping: (args: _shippingMethod) => void;
}

const AddressFormPk: React.FC<_Props> = ({
  addressformik,
  touched,
  errors,
  values,
  changeShipping,
  setShippingMethod,
  setSelectedShipping,
}) => {
  const [countries, setCountries] = useState<_Country[] | []>([]);
  const [countryName, setCountryName] = useState<string>('');
  const [stateList, setStateList] = useState<_State[] | []>([]);
  const [countryId, setCountryId] = useState<number>(0);

  const { id: customerId } = useTypedSelector_v2((state) => state.user);
  const { id: storeId, shippingChargeType } = useTypedSelector_v2(
    (state) => state.store,
  );
  const { totalPrice } = GetCartTotals();

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
        GetShippingmethod({
          shippingMethodModel: {
            city: res.cityName,
            state: res.stateName,
            country: res.countryName,
            zipCode: addressformik.values.postalCode,
            customerID: customerId,
            storeId: storeId,
            ordertotalwithoutshipppingcharge: totalPrice,
            shippingType: shippingChargeType,
          },
        }).then((shippingmethods) => {
          if (shippingmethods) {
            setShippingMethod(shippingmethods);
            setSelectedShipping(shippingmethods[0]);
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
                  <img className='ml-[5px] ' src='/yes.png' />
                )}

                {!!touched.firstname && errors?.firstname && (
                  <img className='ml-[5px]' src='/no.png' />
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
                  <img className='ml-[5px] ' src='/yes.png' />
                )}

                {!!touched.lastName && errors?.lastName && (
                  <img className='ml-[5px]' src='/no.png' />
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
                    <img className='ml-[5px] ' src='/yes.png' />
                  )}

                {!!touched.address1 && values.address1 === '' && (
                  <img className='ml-[5px]' src='/no.png' />
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
                name='address2'
                placeholder=' '
                value={values.address2}
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
                    <img className='ml-[5px] ' src='/yes.png' />
                  )}

                {!!touched.postalCode && values.postalCode === '' && (
                  <img className='ml-[5px]' src='/no.png' />
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
                  <img className='ml-[5px] ' src='/yes.png' />
                )}

                {!!touched.city && errors?.city && (
                  <img className='ml-[5px]' src='/no.png' />
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
                    <img className='ml-[5px] ' src='/yes.png' />
                  )}

                {!!touched.state && values.state === '' && (
                  <img className='ml-[5px]' src='/no.png' />
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
                    <img className='ml-[5px] ' src='/yes.png' />
                  )}

                {!!touched.countryName && values.countryName === '' && (
                  <img className='ml-[5px]' src='/no.png' />
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
                  <img className='ml-[5px] ' src='/yes.png' />
                )}

                {!!touched.phone && errors?.phone && (
                  <img className='ml-[5px]' src='/no.png' />
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
