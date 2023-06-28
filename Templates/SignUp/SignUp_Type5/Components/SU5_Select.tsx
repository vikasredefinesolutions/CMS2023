import { ErrorMessage } from 'formik';
import React from 'react';

interface _Props {
  label: string;
  placeHolder: string;
  name: string;
  value: string | number;
  options: {
    name: string;
    id: number | string;
  }[];
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  noOptionText: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
}

const SU5_Select: React.FC<_Props> = ({
  label,
  name,
  options,
  onChange,
  required = false,
  value,
  noOptionText = 'Others',
  setFieldValue,
}) => {
  return (
    <div className='w-full lg:w-1/2 px-3'>
      <label htmlFor={name} className='mb-[4px] text-normal-text'>
        {label} {required && <span className='text-rose-500'>*</span>}
      </label>
      <div className=''>
        <select
          className='form-input !w-[calc(100%-40px)]'
          value={value}
          name={name}
          id={name}
          onChange={onChange}
        >
          {options.length === 0 ? (
            <option value={'Others'}>{noOptionText}</option>
          ) : null}
          {options.map((option, index) => {
            if (index === 0 && value === '') {
              setFieldValue(name, option.id);
            }

            return (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            );
          })}
        </select>
      </div>
      <ErrorMessage className='text-rose-500' name={name} />
    </div>
  );
};

export default SU5_Select;
