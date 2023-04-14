/* eslint-disable no-unused-vars */
import { GetCountriesList, GetStatesList } from '@services/general.service';
import React, { useEffect, useState } from 'react';
import { _Country, _State } from '../signUp';
import SU_Select from './SU_Select';

interface _props {
  countryValue: string;
  countryName: string;
  stateName: string;
  stateValue: string;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean | undefined,
  ) => void;
}

const SU_StateNcountries: React.FC<_props> = ({
  countryName,
  countryValue,
  stateName,
  stateValue,
  setFieldValue,
}) => {
  const [stateContries, setStateNcountries] = useState<{
    state: _State[] | null;
    country: _Country[] | null;
  }>({
    state: null,
    country: null,
  });

  const getStatesList = (id: number) => {
    GetStatesList(id).then((state) => {
      if (!state) return;

      setStateNcountries((country) => ({
        ...country,
        state: state,
      }));
      setFieldValue(stateName, state.length ? state[0]?.id : '');
    });
  };

  useEffect(() => {
    GetCountriesList().then((countries) => {
      if (!countries) return;

      setStateNcountries({ state: null, country: countries });
      getStatesList(countries[0].id);
      setFieldValue(countryName, countries[0].id);
    });
  }, []);

  return (
    <>
      {stateContries.country !== null && (
        <SU_Select
          label={'Country'}
          placeHolder={'Select Country'}
          name={countryName}
          value={countryValue}
          options={stateContries.country}
          onChange={(event) => {
            setFieldValue(countryName, event.target.value);
            getStatesList(+event?.target.value);
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
          onChange={(event) => {
            setFieldValue(stateName, +event.target.value);
          }}
        />
      )}
    </>
  );
};

export default SU_StateNcountries;
