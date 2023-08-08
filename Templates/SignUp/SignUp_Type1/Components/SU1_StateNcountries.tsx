/* eslint-disable no-unused-vars */
import { _Country, _State } from '@definations/app.type';
import { FetchCountriesList, FetchStatesList } from '@services/general.service';
import React, { useEffect, useState } from 'react';
import SU_Select from './SU1_Select';

interface _props {
  countryValue: string;
  countryName: string;
  stateName: string;
  stateValue: string;
  labelClass?: string;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean | undefined,
  ) => void;
  order?: string;
}

const SU1_StateNcountries: React.FC<_props> = ({
  countryName,
  countryValue,
  stateName,
  stateValue,
  setFieldValue,
  labelClass,
  // order = ['country', 'state'],
  order = '1',
}) => {
  const [stateContries, setStateNcountries] = useState<{
    state: _State[] | null;
    country: _Country[] | null;
  }>({
    state: null,
    country: null,
  });

  const callStatesAPI = async (id: number) => {
    const state = await FetchStatesList(id);
    setStateNcountries((country) => ({
      ...country,
      state: state,
    }));
    // setFieldValue(stateName, state?.length ? state[0]?.id : '');
  };

  useEffect(() => {
    FetchCountriesList().then((countries) => {
      if (!countries) return;

      setStateNcountries({ state: null, country: countries });
      const defaultCountry = countries.find(
        (el) => el.countryCode === 'US',
      )?.id;
      callStatesAPI(defaultCountry ? defaultCountry : 1);
      setFieldValue(countryName, defaultCountry);
    });
  }, []);

  useEffect(() => {
    callStatesAPI(+countryValue);
    setFieldValue(stateName, +stateValue);
  }, [countryValue]);

  return (
    <>
      {order === '1' ? (
        <>
          {stateContries.country !== null && (
            <SU_Select
              label={'Country'}
              placeHolder={'Select Country'}
              name={countryName}
              value={countryValue}
              options={stateContries.country}
              labelClass={labelClass || ''}
              onChange={(event) => {
                setFieldValue(countryName, event.target.value);
                callStatesAPI(+event?.target.value);
              }}
            />
          )}
          {stateContries.state !== null && (
            <SU_Select
              label={'State'}
              placeHolder={'Select State'}
              name={stateName}
              value={stateValue}
              options={stateContries.state}
              labelClass={labelClass || ''}
              onChange={(event) => {
                // console.log(event.target.value, 'event triggers here');
                setFieldValue(stateName, +event.target.value);
              }}
            />
          )}
        </>
      ) : (
        <>
          {stateContries.state !== null && (
            <SU_Select
              label={'State'}
              placeHolder={'Select State'}
              name={stateName}
              value={stateValue}
              options={stateContries.state}
              labelClass={labelClass || ''}
              onChange={(event) => {
                // console.log(event.target.value, 'event triggers here');
                setFieldValue(stateName, +event.target.value);
              }}
            />
          )}
          {stateContries.country !== null && (
            <SU_Select
              label={'Country'}
              placeHolder={'Select Country'}
              name={countryName}
              value={countryValue}
              options={stateContries.country}
              labelClass={labelClass || ''}
              onChange={(event) => {
                setFieldValue(countryName, event.target.value);
                callStatesAPI(+event?.target.value);
              }}
            />
          )}
        </>
      )}
    </>
  );
};

export default SU1_StateNcountries;
