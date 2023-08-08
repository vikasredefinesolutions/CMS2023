/* eslint-disable no-unused-vars */
import { _Country, _State } from '@definations/app.type';
import { FetchCountriesList, FetchStatesList } from '@services/general.service';
import SU_Select from '@templates/CustomRequestForm/CustomRequest_Type3/Components/SC_Select';
import React, { useEffect, useState } from 'react';

interface _props {
  countryValue: string;
  countryName: string;
  stateName: string;
  stateValue: string;
  countryLabel: string;
  stateLabel: string;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean | undefined,
  ) => void;
}

const CR5_StateNCountries: React.FC<_props> = ({
  countryName,
  countryValue,
  stateName,
  stateValue,
  setFieldValue,
  countryLabel,
  stateLabel,
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
      {stateContries.state !== null && (
        <SU_Select
          label={stateLabel}
          placeHolder={'Select State'}
          name={stateName}
          value={stateValue}
          options={stateContries.state}
          onChange={(event: any) => {
            setFieldValue(stateName, +event.target.value);
          }}
        />
      )}
      {stateContries.country !== null && (
        <SU_Select
          label={countryLabel}
          placeHolder={'Select Country'}
          name={countryName}
          value={countryValue}
          options={stateContries.country}
          onChange={(event: any) => {
            setFieldValue(countryName, event.target.value);
            callStatesAPI(+event?.target.value);
          }}
        />
      )}
    </>
  );
};

export default CR5_StateNCountries;
