import { ErrorMessage } from 'formik';
import React from 'react';

interface _props {
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
}

const SU1_Select: React.FC<_props> = ({
  label,
  name,
  options,
  onChange,
  required = false,
  value,
}) => {
  return (
    <div className='w-full lg:w-1/2 px-[15px]'>
      <label htmlFor={name} className='block text-default-text'>
        {label} {required && <span className='text-rose-500'>*</span>}
      </label>
      <div className='mt-2 relative'>
        <div className='mr-8'>
          <select
            className='form-input'
            id={name}
            onChange={onChange}
            value={value}
          >
            <>
              {options.length === 0 ? (
                <option selected>No State found</option>
              ) : (
                ''
              )}
              {options?.map((opt) => (
                <option
                  key={opt.id}
                  value={
                    label == 'State' || label == 'Country' ? opt.id : opt.name
                  }
                >
                  {opt.name}
                </option>
              ))}
            </>
          </select>
        </div>
      </div>
      <ErrorMessage name={name} className='text-rose-500' component={'span'} />
    </div>
  );
};

export default SU1_Select;
