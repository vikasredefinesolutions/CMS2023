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
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean | undefined,
  ) => void;
}

const SU1_StateNcountries: React.FC<_props> = ({
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

  const callStatesAPI = (id: number) => {
    FetchStatesList(id).then((state) => {
      if (!state) return;

      setStateNcountries((country) => ({
        ...country,
        state: state,
      }));
      setFieldValue(stateName, state.length ? state[0]?.id : '');
    });
  };

  useEffect(() => {
    FetchCountriesList().then((countries) => {
      if (!countries) return;

      setStateNcountries({ state: null, country: countries });
      callStatesAPI(countries[0].id);
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
            FetchStatesList(+event?.target.value);
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

export default SU1_StateNcountries;
