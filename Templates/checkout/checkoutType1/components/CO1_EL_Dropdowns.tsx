import { useActions_v2 } from '@hooks_v2/index';
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
  CO1_EL_InitialValues,
  CO1_El_Select,
  _CO1_EL_Fields,
  _CO1_EL_InitialValues,
} from './CO1_EL_Extras';

interface _Props {}

export const CO1_EL_ValidationSchema = Yup.object().shape({});

const CO1_EL_Dropdowns: React.FC<_Props> = () => {
  const [employeesList, setEmployeesList] = useState<_ValueLabelPair[]>([]);
  const [sourcesList, setSourcesList] = useState<_ValueLabelPair[]>([]);
  const [sourceMediumList, setSourceMedium] = useState<_ValueLabelPair[]>([]);

  const { update_checkoutEmployeeLogin } = useActions_v2();

  const submitHandler = (inputs: _CO1_EL_InitialValues) => {
    if (inputs.salesRep) {
      update_checkoutEmployeeLogin({
        type: 'SALES_REP',
        value: employeesList.find((item) => item.value === inputs.salesRep)!,
      });
    }

    if (inputs.source) {
      update_checkoutEmployeeLogin({
        type: 'SOURCE',
        value: sourcesList.find((item) => item.value === inputs.source)!,
      });
    }

    if (inputs.sourceMedium) {
      update_checkoutEmployeeLogin({
        type: 'SOURCE_MEDIUM',
        value: sourceMediumList.find(
          (item) => item.value === inputs.sourceMedium,
        )!,
      });
    }
  };

  const fetchDropdownsOptions = async () => {
    await Promise.allSettled([FetchEmpSourceList(), FetchEmployeesList()])
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
        initialValues={CO1_EL_InitialValues}
        onSubmit={submitHandler}
        validationSchema={CO1_EL_ValidationSchema}
      >
        {({ values, handleChange, submitForm, handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <div className='checkoutpage'>
                {_CO1_EL_Fields.map((field) => {
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
                      <CO1_El_Select
                        key={field.name}
                        name={field.name}
                        value={values[field.name]}
                        supressedLabel={field.supressedLabel}
                        label={field.label}
                        onChange={(event) => {
                          if (field.name === 'source') {
                            update_checkoutEmployeeLogin({
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

export default CO1_EL_Dropdowns;
