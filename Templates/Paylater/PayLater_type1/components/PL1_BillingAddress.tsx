import { _Country, _State } from '@definations/app.type';
import { FetchCountriesList, FetchStatesList } from '@services/general.service';
import { getLocationWithZipCode } from '@services/user.service';
import { Form, Formik } from 'formik';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  PL1_addEditInputFields,
  _PL1_AddEditInputFieldsName,
} from './PL1.extras';
import {
  PL1_AddEditAddressInput,
  PL1_AddEditAddressSelect,
} from './PL1_Inputs';

interface _Billing {
  billingEqualsShipping: boolean;
  billingEmail: string;
  billingFirstName: string;
  billingLastName: string;
  billingCompany: string;
  billingAddress1: string;
  billingAddress2: string;
  billingSuite: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  billingCountry: string;
  billingPhone: string;
}

interface _Props {
  billing: _Billing;
  setBillingAddress: Dispatch<SetStateAction<_Billing>>;
}

const PL1_BillingAddress: React.FC<_Props> = ({
  billing,
  setBillingAddress,
}) => {
  const [countries, setCountries] = useState<_Country[]>([]);
  const [states, setStates] = useState<_State[]>([]);

  const handleSubmit = (
    inputs: Record<_PL1_AddEditInputFieldsName, string>,
  ) => {
    setBillingAddress((prev) => ({
      ...prev,
      billingFirstName: inputs.firstName,
      billingLastName: inputs.lastName,
      billingCompany: inputs.companyName,
      billingAddress1: inputs.address1,
      billingAddress2: inputs.address2,
      billingCity: inputs.city,
      billingState: inputs.state,
      billingZip: inputs.zipcode,
      billingCountry: inputs.country,
      billingPhone: inputs.phoneNumber,
    }));
  };

  const callOptionAPIs = () => {
    FetchCountriesList().then((countriesExist) => {
      if (countriesExist) {
        setCountries(countriesExist);
        FetchStatesList(countriesExist[0].id).then(
          (res) => res && setStates(res),
        );
      }
    });
  };

  const getStateCountryCityWithZipCode = async (zipCode: string) => {
    return await getLocationWithZipCode(zipCode);
  };

  useEffect(() => {
    callOptionAPIs();
  }, []);

  return (
    <Formik
      initialValues={{
        firstName: billing.billingFirstName,
        lastName: billing.billingLastName,
        companyName: billing.billingCompany,
        address1: billing.billingAddress1,
        address2: billing.billingAddress2,
        city: billing.billingCity,
        state: billing.billingState,
        zipcode: billing.billingZip,
        country: billing.billingCountry,
        phoneNumber: billing.billingPhone,
      }}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, handleBlur, handleChange, setFieldValue }) => {
        return (
          <Form>
            <div className='pt-[15px]'>
              <div className='flex flex-wrap -mx-3'>
                {PL1_addEditInputFields.map((input) => {
                  if (input.type === 'select') {
                    let options: {
                      name: string;
                      id: string | number;
                    }[] = [];

                    switch (input.name) {
                      case 'country':
                        options = countries;
                        break;
                      case 'state':
                        options = states;
                        break;
                      default:
                        options = [];
                        break;
                    }
                    return (
                      <PL1_AddEditAddressSelect
                        key={input.name}
                        name={input.name}
                        label={input.label}
                        required={input.required}
                        value={values[input.name]}
                        fullWidth={input.fullWidth}
                        onBlur={(e) => {
                          handleBlur(e);
                        }}
                        onChange={(ev) => {
                          if (input.name === 'country') {
                            FetchStatesList(+ev.target.value).then(
                              (res) => res && setStates(res),
                            );
                          }

                          handleChange(ev);
                        }}
                        options={options}
                        setFieldValue={setFieldValue}
                        noOptionText={input.noOptionFound}
                      />
                    );
                  }
                  return (
                    <PL1_AddEditAddressInput
                      key={input.name}
                      type={input.type}
                      name={input.name}
                      label={input.label}
                      required={input.required}
                      value={values[input.name]}
                      fullWidth={input.fullWidth}
                      onBlur={(event) => {
                        handleBlur(event);
                        if (input.name === 'zipcode') {
                          getStateCountryCityWithZipCode(
                            event.target.value,
                          ).then((res) => {
                            if (res?.countryId) {
                              setFieldValue('state', res?.stateName);
                              setFieldValue('countryName', res?.countryName);
                              setFieldValue('city', res?.cityName);
                            }
                          });
                        }
                      }}
                      onChange={handleChange}
                    />
                  );
                })}
                {/* <div className='w-full lg:w-1/2 pl-[12px] pr-[12px]'>
                  <div className='relative z-0 w-full mb-[20px]'>
                    Used for delivery questions only
                  </div>
                </div> */}
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PL1_BillingAddress;
