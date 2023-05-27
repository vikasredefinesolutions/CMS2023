import { AddressAPIRequest } from '@definations/APIs/address.req';
import { _Country, _State } from '@definations/app.type';
import { CreateUserAddress } from '@services/address.service';
import { FetchCountriesList, FetchStatesList } from '@services/general.service';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  CO4_addEditInputFields,
  _CO4_AddEditInputFieldsName,
} from '../CO4_Extras';
import {
  CO4_AddEditAddressInput,
  CO4_AddEditAddressSelect,
} from './CO4_Inputs';

interface _Props {
  addressType: 'BILL' | 'SHIP';
}

const CO4_AddFirstAddress: React.FC<_Props> = ({ addressType }) => {
  const [initialValues, setInitialValues] = useState<
    Record<_CO4_AddEditInputFieldsName, string>
  >({
    firstName: '',
    lastName: '',
    companyName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phoneNumber: '',
  });
  const [countries, setCountries] = useState<_Country[]>([]);
  const [states, setStates] = useState<_State[]>([]);

  const handleSubmit = (
    inputs: Record<_CO4_AddEditInputFieldsName, string>,
  ) => {
    let payload: AddressAPIRequest = {
      storeCustomerAddressModel: {
        id: 0,
        rowVersion: '',
        location: '',
        ipAddress: '',
        macAddress: '',
        customerId: 0,
        firstname: inputs.firstName,
        lastName: inputs.lastName,
        email: '',
        address1: inputs.address1,
        address2: inputs.address2,
        suite: '',
        city: inputs.city,
        state: inputs.state,
        postalCode: inputs.zipcode,
        phone: inputs.phoneNumber,
        fax: '',
        countryName: inputs.country,
        countryCode: inputs.country,
        companyName: inputs.companyName,
        addressType: addressType === 'SHIP' ? 'S' : 'B',
        isDefault: false,
        recStatus: 'A',
      },
    };

    CreateUserAddress(payload)
      .then(() => {
        //
      })
      .catch(() => {});
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

  useEffect(() => {
    callOptionAPIs();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, handleBlur, handleChange, setFieldValue }) => {
        return (
          <Form>
            <div className='p-[25px]'>
              <div className='flex flex-wrap -mx-3 gap-y-6'>
                {CO4_addEditInputFields.map((input) => {
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
                      <CO4_AddEditAddressSelect
                        key={input.name}
                        name={input.name}
                        label={input.label}
                        required={input.required}
                        value={values[input.name]}
                        fullWidth={input.fullWidth}
                        onBlur={handleBlur}
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
                    <CO4_AddEditAddressInput
                      key={input.name}
                      type={input.type}
                      name={input.name}
                      label={input.label}
                      required={input.required}
                      value={values[input.name]}
                      fullWidth={input.fullWidth}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  );
                })}
                <div className='w-full lg:w-1/2 pl-[12px] pr-[12px]'>
                  <div className='relative z-0 w-full mb-[20px]'>
                    Used for delivery questions only
                  </div>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CO4_AddFirstAddress;
