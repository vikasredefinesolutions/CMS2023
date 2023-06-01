import { _Country, _State } from '@definations/app.type';
import { FetchCountriesList, FetchStatesList } from '@services/general.service';
import React, { useEffect, useState } from 'react';

interface _Props {
  addressformik: any;
}

const AddressFormPk: React.FC<_Props> = ({ addressformik }) => {
  const [countries, setCountries] = useState<_Country[] | []>([]);
  const [stateList, setStateList] = useState<_State[] | []>([]);
  const [countryId, setCountryId] = useState<number>(0);
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
                  value={addressformik.values.firstname}
                  className='form-input !w-[calc(100%-40px)]'
                />
                {addressformik.errors.firstname ? (
                  <img className='ml-[5px] ' src='/no.png' />
                ) : (
                  <img className='ml-[5px]' src='/yes.png' />
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
                  value={addressformik.values.lastName}
                  className='form-input !w-[calc(100%-40px)]'
                />
                {addressformik.errors.lastName ? (
                  <img className='ml-[5px] ' src='/no.png' />
                ) : (
                  <img className='ml-[5px]' src='/yes.png' />
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
                  value={addressformik.values.address1}
                  className='form-input !w-[calc(100%-40px)]'
                />
                {addressformik.errors.address1 ? (
                  <img className='ml-[5px] ' src='/no.png' />
                ) : (
                  <img className='ml-[5px]' src='/yes.png' />
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
                value={addressformik.values.address2}
                className='form-input'
              />
            </div>
            <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
              <label className='mb-[4px] text-normal-text'>Zip Code*</label>
              <div className='flex flex-wrap justify-between items-center'>
                <input
                  onBlur={addressformik.handleBlur}
                  onChange={addressformik.handleChange}
                  name='postalCode'
                  placeholder=' '
                  value={addressformik.values.postalCode}
                  className='form-input  !w-[calc(100%-40px)]'
                />
                {addressformik.errors.postalCode ? (
                  <img className='ml-[5px] ' src='/no.png' />
                ) : (
                  <img className='ml-[5px]' src='/yes.png' />
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
                  value={addressformik.values.city}
                  className='form-input  !w-[calc(100%-40px)]'
                />
                {addressformik.errors.city ? (
                  <img className='ml-[5px] ' src='/no.png' />
                ) : (
                  <img className='ml-[5px]' src='/yes.png' />
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
                  value={addressformik.values.state}
                >
                  <option value={''}>Select State</option>

                  {stateList.map((item) => {
                    if (addressformik.values.state == item.name) {
                      return (
                        <option value={item.name} selected>
                          {item.name}
                        </option>
                      );
                    }
                    return <option value={item.name}>{item.name}</option>;
                  })}
                </select>
                {addressformik.errors.state ? (
                  <img className='ml-[5px] ' src='/no.png' />
                ) : (
                  <img className='ml-[5px]' src='/yes.png' />
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
                  name='CountryName'
                  onChange={(e) => {
                    let id = countries.filter(
                      (item) => item.name === e.target.value,
                    );
                    setCountryId(id[0].id);
                    addressformik.setFieldValue('CountryName', e.target.value);
                    addressformik.setFieldValue('state', '');
                  }}
                  value={addressformik.values.countryName}
                >
                  <option value={''}>Select Country</option>
                  {countries.map((item) => {
                    if (addressformik.values.CountryName == item.name) {
                      return (
                        <option value={item.name} selected>
                          {item.name}
                        </option>
                      );
                    }
                    return <option value={item.name}>{item.name}</option>;
                  })}
                </select>
                {addressformik.errors.CountryName ? (
                  <img className='ml-[5px] ' src='/no.png' />
                ) : (
                  <img className='ml-[5px]' src='/yes.png' />
                )}
              </div>
            </div>
            <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
              <label className='mb-[4px] text-normal-text'>Phone Number*</label>
              <div className='flex flex-wrap justify-between items-center'>
                <input
                  onBlur={addressformik.handleBlur}
                  onChange={addressformik.handleChange}
                  name='Phone'
                  placeholder=' '
                  value={addressformik.values.Phone}
                  className='form-input  !w-[calc(100%-40px)]'
                />
                {addressformik.errors.Phone ? (
                  <img className='ml-[5px] ' src='/no.png' />
                ) : (
                  <img className='ml-[5px]' src='/yes.png' />
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
