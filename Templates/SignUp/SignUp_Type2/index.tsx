import { _Industry } from '@definations/app.type';
import {
  FetchCountriesList,
  FetchIndustriesList,
  FetchStatesList,
} from '@services/general.service';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import SU2_Input from './Components/SU2_Input';
import SU2_Select from './Components/SU2_Select';
import {
  _SU2_Fields,
  _SU2_InitialValues,
  _Signup2Schema,
  su2_initialValues,
} from './SU2.extras';

const SignUp_type2: React.FC = () => {
  const [industries, setIndustries] = useState<_Industry[]>([]);
  const [countries, setCountries] = useState<_Industry[]>([]);
  const [states, setStates] = useState<_Industry[]>([]);

  const handleFormikSubmit = (values: _SU2_InitialValues) => {};

  const callOptionAPIs = () => {
    FetchIndustriesList().then((res) => res && setIndustries(res));

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
    <section className='container mx-auto mt-8 mb-8'>
      <div className=''>
        <div className='w-full mx-auto max-w-7xl'>
          <Formik
            initialValues={su2_initialValues}
            onSubmit={handleFormikSubmit}
            validationSchema={_Signup2Schema}
          >
            {({ values, handleChange, handleBlur, setFieldValue }) => {
              return (
                <Form>
                  <div className='flex flex-wrap -mx-3 gap-y-6'>
                    {_SU2_Fields.map((field) => {
                      if (field.type === 'select') {
                        let options: { name: string; id: string | number }[] =
                          [];

                        switch (field.name) {
                          case 'industryType':
                            options = industries;
                            break;
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
                          <SU2_Select
                            key={field.name}
                            name={field.name}
                            value={values[field.name]}
                            label={field.label}
                            onChange={(ev) => {
                              if (field.name === 'country') {
                                FetchStatesList(+ev.target.value).then(
                                  (res) => res && setStates(res),
                                );
                              }
                              handleChange(ev);
                            }}
                            placeHolder={field.placeHolder}
                            options={options}
                            setFieldValue={setFieldValue}
                            noOptionText={field.noOptionFound}
                          />
                        );
                      }
                      return (
                        <SU2_Input
                          key={field.name}
                          name={field.name}
                          value={values[field.name]}
                          label={field.label}
                          type={field.type}
                          onChange={handleChange}
                          placeHolder={field.placeHolder}
                          onBlur={handleBlur}
                        />
                      );
                    })}
                    <div className='w-full lg:w-full px-3'>
                      <button type='submit' className='btn btn-primary'>
                        Submit
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default SignUp_type2;
