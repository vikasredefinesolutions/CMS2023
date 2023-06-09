import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import {
  FetchEmpSourceList,
  FetchEmpSourceMediumList,
  FetchEmployeesList,
  _ValueLabelPair,
} from '@services/checkout.service';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import {
  CO2_EL_InitialValues,
  CO2_El_Select,
  _CO2_EL_Fields,
  _CO2_EL_InitialValues,
} from './CO2_EL_Extras';

interface _Props {}

export const CO2_EL_ValidationSchema = Yup.object().shape({});

const CO2_EL_Dropdowns: React.FC<_Props> = () => {
  const [employeesList, setEmployeesList] = useState<_ValueLabelPair[]>([]);
  const [sourcesList, setSourcesList] = useState<_ValueLabelPair[]>([]);
  const [sourceMediumList, setSourceMedium] = useState<_ValueLabelPair[]>([]);
  const { id: storeId } = useTypedSelector_v2((state) => state.store);

  const { update_CheckoutEmployeeLogin } = useActions_v2();

  const submitHandler = (inputs: _CO2_EL_InitialValues) => {
    if (inputs.salesRep) {
      update_CheckoutEmployeeLogin({
        type: 'SALES_REP',
        value: employeesList.find((item) => item.value === inputs.salesRep)!,
      });
    }

    if (inputs.source) {
      update_CheckoutEmployeeLogin({
        type: 'SOURCE',
        value: sourcesList.find((item) => item.value === inputs.source)!,
      });
    }

    if (inputs.sourceMedium) {
      update_CheckoutEmployeeLogin({
        type: 'SOURCE_MEDIUM',
        value: sourceMediumList.find(
          (item) => item.value === inputs.sourceMedium,
        )!,
      });
    }
  };

  const fetchDropdownsOptions = async () => {
    await Promise.allSettled([
      FetchEmpSourceList(storeId),
      FetchEmployeesList(),
    ])
      .then((values) => {
        const tempEmpSourceList =
          values[0].status === 'fulfilled' ? values[0].value : [];
        const tempEmployeesList =
          values[1].status === 'fulfilled' ? values[1].value : [];

        if (tempEmpSourceList.length > 0) {
          setSourcesList(tempEmpSourceList);

          FetchEmpSourceMediumList(tempEmpSourceList[0].value).then(
            (response) => {
              setSourceMedium(response);
            },
          );
        }

        if (tempEmployeesList) {
          setEmployeesList(tempEmployeesList);
        }
      })
      .catch()
      .finally();
  };

  useEffect(() => {
    fetchDropdownsOptions();
  }, []);

  return (
    <div className='mb-[20px] '>
      <Formik
        initialValues={CO2_EL_InitialValues}
        onSubmit={submitHandler}
        validationSchema={CO2_EL_ValidationSchema}
      >
        {({ values, handleChange, submitForm, handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <div className='checkoutpage'>
                {_CO2_EL_Fields.map((field) => {
                  if (field.type === 'select') {
                    let options: { value: string; label: string }[] = [];

                    switch (field.name) {
                      case 'salesRep':
                        options = employeesList;
                        break;
                      case 'source':
                        options = sourcesList;
                        break;
                      case 'sourceMedium':
                        options = sourceMediumList;
                        break;

                      default:
                        options = [];
                        break;
                    }
                    return (
                      <CO2_El_Select
                        key={field.name}
                        name={field.name}
                        value={values[field.name]}
                        supressedLabel={field.supressedLabel}
                        label={field.label}
                        onChange={(event) => {
                          if (event.target.value === 'none') return;
                          if (field.name === 'source') {
                            update_CheckoutEmployeeLogin({
                              type: 'SOURCE_MEDIUM',
                              value: {
                                value: '',
                                label: '',
                              },
                            });
                            FetchEmpSourceMediumList(event.target.value).then(
                              (response) => {
                                setSourceMedium(response);
                              },
                            );
                          }
                          handleChange(event);
                        }}
                        options={options}
                        onBlur={() => {
                          submitForm();
                        }}
                      />
                    );
                  }
                })}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CO2_EL_Dropdowns;
