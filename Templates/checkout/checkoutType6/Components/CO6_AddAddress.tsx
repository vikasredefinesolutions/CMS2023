import { _Country, _State } from '@definations/app.type';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { FetchCountriesList, FetchStatesList } from '@services/general.service';
import { getLocationWithZipCode } from '@services/user.service';
import {
  CO6_AddressFields,
  _CO6_AddressFields,
} from '@templates/checkout/checkoutType6/CO6_Extras';
import {
  CO6_Input,
  CO6_Select,
} from '@templates/checkout/checkoutType6/Components/CO6_Inputs';
import { FormikErrors, FormikTouched } from 'formik';
import React, { useEffect, useState } from 'react';

interface _Props {
  addressType: 'SHIP' | 'BILL';
  values: _CO6_AddressFields;
  handleChange(e: React.ChangeEvent<any>): void;
  handleBlur(e: React.FocusEvent<any, Element>): void;
  touched: FormikTouched<_CO6_AddressFields>;
  errors: FormikErrors<_CO6_AddressFields>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<_CO6_AddressFields>>;
  setFieldTouched: (
    field: string,
    touched?: boolean | undefined,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<_CO6_AddressFields>>;
  setValues: (
    values: React.SetStateAction<_CO6_AddressFields>,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<_CO6_AddressFields>>;
  setFieldError: (field: string, value: string | undefined) => void;
}

const CO6_AddAddress: React.FC<_Props> = ({
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
  const { setShowLoader, update_CheckoutAddress } = useActions_v2();
  const [countries, setCountries] = useState<_Country[]>([]);
  const [states, setStates] = useState<_State[]>([]);
  const sbStore = useTypedSelector_v2((state) => state.sbStore.store);
  const [shipToSchool, setShipToSchool] = useState<boolean>(false);
  const title = addressType === 'BILL' ? 'Billing' : 'Shipping';
  const { address } = useTypedSelector_v2((state) => state.checkout);

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
    if (shipToSchool) return;

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

  const showShipToSchoolCheckbox = () => {
    if (addressType !== 'SHIP') return false;

    if (sbStore.payBusinessMethodDeliveryOptions === 'both') {
      return true;
    }

    return false;
  };

  const copyStudentAddressForShipping = () => {
    setValues({
      firstname: sbStore.shipFirstName || '',
      lastName: sbStore.shipLastName || '',
      address1: sbStore.shipAddress1 || '',
      address2: sbStore.shipAddress2 || '',
      city: sbStore.shipCity || '',
      state: sbStore.shipState || '',
      postalCode: sbStore.shipZipcode || '',
      phone: sbStore.shipPhone || '',
      countryName: sbStore.shipCountryName || '',
      companyName: sbStore.shipCompany || '',
      countryCode: sbStore?.shipCountry?.toString() || '',
    });
  };

  const handleShipToSchool = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShipToSchool(event.target.checked);

    if (event.target.checked) {
      copyStudentAddressForShipping();
      update_CheckoutAddress({ type: 'SHIP_TO_SCHOOL', value: true });
      return;
    }

    if (!event.target.checked) {
      setValues({
        ...CO6_AddressFields,
      });
      update_CheckoutAddress({ type: 'SHIP_TO_SCHOOL', value: false });
    }
  };

  const fetchCountriesNstates = async () => {
    await FetchCountriesList().then((response) => {
      if (!response) return;
      const alreadyStateNCountryIsSelected = values.state.length > 0;

      if (alreadyStateNCountryIsSelected) {
        setCountries(response);
        callStatesAPI(+values.countryCode || response[0].id, false);
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

  const setInitialAddress = () => {
    copyStudentAddressForShipping();
  };

  useEffect(() => {
    fetchCountriesNstates();

    if (addressType === 'SHIP') {
      if (sbStore.payBusinessMethodDeliveryOptions === 'one_address') {
        setInitialAddress();
        setShipToSchool(true);
        update_CheckoutAddress({ type: 'SHIP_TO_SCHOOL', value: true });
      }

      if (address.shipToSchool) {
        setShipToSchool(true);
      }
    }
  }, []);

  return (
    <>
      <div className='pt-[10px] border-b border-[#ececec]'>
        <div className='pb-[10px] text-title-text'>{title} Address</div>
      </div>
      {showShipToSchoolCheckbox() && (
        <div className='mt-[10px] mb-[20px]'>
          <input
            type='checkbox'
            onChange={handleShipToSchool}
            checked={shipToSchool}
            id='shipToSchoolCheck'
            name=''
          />
          <label className='ml-[5px]' htmlFor='shipToSchoolCheck'>
            Ship to school
          </label>
        </div>
      )}
      <div className='text-default-text text-[#84694d] mt-[10px] mb-[20px]'>
        All Fields marked * are required fields.
      </div>
      <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
        <CO6_Input
          label='FIRST NAME'
          additionalClass={'md:w-6/12'}
          type={'text'}
          name={'firstname'}
          required={true}
          value={values.firstname}
          onChange={handleChange}
          onBlur={handleBlur}
          readonly={shipToSchool}
          touched={!!touched.firstname}
          autoComplete='given-name'
          error={errors?.firstname ? errors.firstname : null}
        />
        <CO6_Input
          label='LAST NAME'
          additionalClass={'md:w-6/12'}
          type={'text'}
          name={'lastName'}
          required={true}
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          readonly={shipToSchool}
          autoComplete='family-name'
          touched={!!touched.lastName}
          error={errors?.lastName ? errors.lastName : null}
        />
      </div>
      <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
        <CO6_Input
          label='STREET ADDRESS'
          additionalClass={''}
          type={'text'}
          name={'address1'}
          required={true}
          value={values.address1}
          onChange={handleChange}
          onBlur={handleBlur}
          readonly={shipToSchool}
          autoComplete='address-line3'
          touched={!!touched.address1}
          error={errors?.address1 ? errors.address1 : null}
        />
      </div>
      <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
        <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
          <label className='mb-[4px] text-normal-text'>APT, SUITE</label>{' '}
          <input
            name={'address2'}
            value={values.address2}
            onChange={handleChange}
            onBlur={handleBlur}
            readOnly={shipToSchool}
            autoComplete='address-line4'
            className='form-input !w-[calc(100%-40px)]'
          />
        </div>
        <CO6_Input
          label='ZIP CODE'
          additionalClass={'md:w-6/12'}
          type={'text'}
          name={'postalCode'}
          required={true}
          value={values.postalCode}
          readonly={shipToSchool}
          onChange={handleChange}
          autoComplete='postal-code'
          onBlur={postalCodeHandler}
          touched={!!touched.postalCode}
          error={errors?.postalCode ? errors.postalCode : null}
        />
      </div>
      <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
        <CO6_Input
          label='CITY'
          additionalClass={'md:w-6/12'}
          type={'text'}
          name={'city'}
          autoComplete='address-level2'
          required={true}
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
          readonly={shipToSchool}
          touched={!!touched.city}
          error={errors?.city ? errors.city : null}
        />
        <CO6_Select
          label='STATE / PROVINCE'
          additionalClass={'md:w-6/12'}
          name={'state'}
          required={true}
          initialOption={'Select State'}
          value={values.state}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={shipToSchool}
          autoComplete='address-level1'
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
        <CO6_Select
          label='COUNTRY'
          additionalClass={'md:w-6/12'}
          name={'countryName'}
          autoComplete='country-name'
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
          disabled={shipToSchool}
          valid={
            !!touched.countryCode &&
            values.countryCode !== '' &&
            errors?.countryCode === undefined
          }
          inValid={!!touched.countryCode && values.countryCode === ''}
          options={countries}
        />
        <CO6_Input
          label='PHONE NUMBER'
          additionalClass={'md:w-6/12'}
          type={'text'}
          name={'phone'}
          required={true}
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete='tel'
          readonly={shipToSchool}
          touched={!!touched.phone}
          error={errors?.phone ? errors.phone : null}
        />
      </div>
    </>
  );
};

export default CO6_AddAddress;
