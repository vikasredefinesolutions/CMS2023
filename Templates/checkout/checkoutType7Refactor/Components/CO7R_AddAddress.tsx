import { _Country, _State } from '@definations/app.type';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { FetchCountriesList, FetchStatesList } from '@services/general.service';
import { getLocationWithZipCode } from '@services/user.service';

import {
  HEALTHYPOINTS,
  SIMPLI_SAFE_CODE,
  UCA,
} from '@constants/global.constant';
import { FormikErrors, FormikTouched } from 'formik';
import React, { useEffect, useState } from 'react';
import { _CO7R_AddressFields } from '../CO7R_Extras';
import { CO7R_Input, CO7R_Select } from './CO7R_Inputs';

interface _Props {
  addressType: 'SHIP' | 'BILL';
  values: _CO7R_AddressFields;
  handleChange(e: React.ChangeEvent<any>): void;
  handleBlur(e: React.FocusEvent<any, Element>): void;
  touched: FormikTouched<_CO7R_AddressFields>;
  errors: FormikErrors<_CO7R_AddressFields>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<_CO7R_AddressFields>>;
  setFieldTouched: (
    field: string,
    touched?: boolean | undefined,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<_CO7R_AddressFields>>;
  setValues: (
    values: React.SetStateAction<_CO7R_AddressFields>,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<_CO7R_AddressFields>>;
  setFieldError: (field: string, value: string | undefined) => void;
}

const CO7_AddAddress: React.FC<_Props> = ({
  values,
  errors,
  touched,
  addressType,
  setValues,
  handleBlur,
  handleChange,
  setFieldValue,
  setFieldTouched,
}) => {
  const { setShowLoader } = useActions_v2();
  const [countries, setCountries] = useState<_Country[]>([]);
  const [states, setStates] = useState<_State[]>([]);
  const title = addressType === 'BILL' ? 'Billing' : 'Shipping';
  const { id: storeId, code: storeCode } = useTypedSelector_v2(
    (state) => state.store,
  );

  const callStatesAPI = async (id: number, setDefault: boolean) => {
    await FetchStatesList(id).then((response) => {
      if (!response) return;

      setStates(response);

      if (setDefault) {
        setFieldValue('state', response[0].name);
      }
    });
  };

  const postalCodeHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    const zipCode = e.target.value;
    handleBlur(e);
    if (zipCode.trim().length === 0) return;

    //
    setShowLoader(true);
    getLocationWithZipCode(zipCode)
      .then((res) => {
        if (!res) return;

        // City
        if (res.cityName) {
          setFieldValue('city', res.cityName);
          setTimeout(() => {
            setFieldTouched('city', true);
          }, 500);
        }

        // Country
        if (res.countryId && res.countryName) {
          setFieldValue('countryName', res.countryName);
          setFieldValue('countryCode', res.countryId);
          setFieldTouched('countryCode', true);
        }

        // State
        if (res.stateName) {
          setFieldValue('state', res.stateName);
          setFieldTouched('state', true);
        }
        if (res.countryName !== values.countryName) {
          callStatesAPI(res.countryId, false);
        }
      })
      .finally(() => setShowLoader(false));
  };

  const fetchCountriesNstates = async () => {
    await FetchCountriesList().then((response) => {
      if (!response) return;
      const alreadyStateNCountryIsSelected = values.state.length > 0;
      if (alreadyStateNCountryIsSelected) {
        setCountries(response);
        const country = response.find(
          (country) => country.name === values.countryName,
        );

        setFieldValue('countryName', country?.name || response[0].name);
        setFieldValue('countryCode', country?.id || response[0].id);
        setFieldValue('state', values.state);

        callStatesAPI(country?.id || response[0].id, false);

        return;
      }

      // Country
      setCountries(response);
      setFieldValue('countryName', response[0].name);
      setFieldValue('countryCode', response[0].id);

      // State
      callStatesAPI(response[0].id, true);
    });
  };

  useEffect(() => {
    fetchCountriesNstates();
  }, []);

  return (
    <>
      <div className='pt-[10px] border-b border-[#ececec]'>
        <div className='pb-[10px] text-title-text'>{title} Address</div>
      </div>
      <div className='text-default-text text-[#84694d] mt-[10px] mb-[20px]'>
        All Fields marked * are required fields.
      </div>
      <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
        <CO7R_Input
          label='FIRST NAME'
          additionalClass={'md:w-6/12'}
          type={'text'}
          name={'firstname'}
          required={true}
          value={values.firstname}
          onChange={handleChange}
          autoComplete='given-name'
          onBlur={handleBlur}
          touched={!!touched.firstname}
          error={errors?.firstname ? errors.firstname : null}
        />
        <CO7R_Input
          label='LAST NAME'
          additionalClass={'md:w-6/12'}
          type={'text'}
          name={'lastName'}
          autoComplete='family-name'
          required={true}
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={!!touched.lastName}
          error={errors?.lastName ? errors.lastName : null}
        />
      </div>
      <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
        <CO7R_Input
          label='STREET ADDRESS'
          additionalClass={''}
          type={'text'}
          name={'address1'}
          required={true}
          value={values.address1}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete='address-line3'
          touched={!!touched.address1}
          error={errors?.address1 ? errors.address1 : null}
        />
      </div>
      <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
        {storeCode == SIMPLI_SAFE_CODE ||
        storeCode == UCA ||
        storeCode == HEALTHYPOINTS ? (
          ''
        ) : (
          <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
            <label className='mb-[4px] text-normal-text'>APT, SUITE</label>{' '}
            <input
              name={'address2'}
              autoComplete='address-line4'
              value={values.address2}
              onChange={handleChange}
              onBlur={handleBlur}
              className='form-input !w-[calc(100%-40px)]'
            />
          </div>
        )}
        <CO7R_Input
          label='ZIP CODE'
          additionalClass={'md:w-6/12'}
          type={'text'}
          name={'postalCode'}
          required={true}
          value={values.postalCode}
          autoComplete='postal-code'
          onChange={handleChange}
          onBlur={postalCodeHandler}
          touched={!!touched.postalCode}
          error={errors?.postalCode ? errors.postalCode : null}
        />
      </div>
      <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
        <CO7R_Input
          label='CITY'
          additionalClass={'md:w-6/12'}
          type={'text'}
          name={'city'}
          autoComplete='address-level2'
          required={true}
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={!!touched.city}
          error={errors?.city ? errors.city : null}
        />
        <CO7R_Select
          label='STATE / PROVINCE'
          additionalClass={'md:w-6/12'}
          name={'state'}
          required={true}
          initialOption={'Select State'}
          autoComplete='address-level1'
          value={values.state}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={false}
          valid={
            !!touched.state &&
            values.state !== '' &&
            errors?.state === undefined
          }
          inValid={!!touched.state && values.state === ''}
          options={states}
        />
      </div>
      <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
        <CO7R_Select
          label='COUNTRY'
          additionalClass={'md:w-6/12'}
          autoComplete='country-name'
          name={'countryName'}
          initialOption={'Select Country'}
          required={true}
          value={values.countryName}
          onChange={(e) => {
            let country = countries.find(
              (item) => item.name === e.target.value,
            );
            if (country) {
              setFieldValue('countryName', country.name);
              setFieldValue('countryCode', country.id);

              if (country.name !== values.countryName) {
                callStatesAPI(country.id, true);
                setFieldValue('state', '');
                setFieldTouched('state', true);
              }
            } else {
              setStates([]);
              setFieldValue('countryName', '');
              setFieldValue('countryCode', '');
              setFieldValue('state', '');
              setFieldTouched('state', true);
            }
          }}
          onBlur={handleBlur}
          disabled={false}
          valid={
            !!touched.countryCode &&
            values.countryCode !== '' &&
            errors?.countryCode === undefined
          }
          inValid={!!touched.countryCode && values.countryCode === ''}
          options={countries}
        />
        <CO7R_Input
          label='PHONE NUMBER'
          additionalClass={'md:w-6/12'}
          type={'text'}
          name={'phone'}
          required={true}
          autoComplete='tel'
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={!!touched.phone}
          error={errors?.phone ? errors.phone : null}
        />
      </div>
    </>
  );
};

export default CO7_AddAddress;
