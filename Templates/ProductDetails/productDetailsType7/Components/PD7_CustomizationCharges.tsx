import { _SbProductCustomField } from '@services/sb.service';
import { FormikErrors, FormikTouched } from 'formik';
import React from 'react';
import { PD7_CustomInput } from './PD7_Inputs';

interface _Props {
  fields: _SbProductCustomField[] | null;
  values: Record<string, string>;
  handleChange(e: React.ChangeEvent<any>): void;
  handleBlur(e: React.FocusEvent<any, Element>): void;
  touched: FormikTouched<Record<string, string>>;
  errors: FormikErrors<Record<string, string>>;
}

const PD7_CustomizationFields: React.FC<_Props> = ({
  values,
  errors,
  fields,
  touched,
  handleBlur,
  handleChange,
}) => {
  if (!fields) {
    return null;
  }

  return (
    <div className='pt-[15px] text-default-text'>
      <div className='flex flex-wrap items-center  pl-[10px]'>
        {fields.map((field) => {
          const amountToShow = field.customizationCharges;

          return (
            <PD7_CustomInput
              label={field.name}
              type={'text'}
              name={field.name}
              required={field.isRequired}
              value={values[field.name]}
              onChange={handleChange}
              onBlur={handleBlur}
              error={null}
              touched={false}
              cost={amountToShow}
              costType={
                field.isChargePerCharacter ? 'PER_CHARACTER' : 'PER_WORD'
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default PD7_CustomizationFields;
