import { isNumberKey, isStringyNumberKey } from '@helpers/common.helper';
import { ErrorMessage } from 'formik';
import React from 'react';

interface _Props {
  label: string;
  placeHolder: string;
  name: string;
  value: string | number;
  options:
    | {
        value: string;
        label: string;
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

export const OTF_Select: React.FC<_Props> = ({
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
    <div className='flex flex-wrap mb-4'>
      <div className='w-full '>
        <label
          htmlFor={name}
          className='block text-base font-medium text-gray-700'
        >
          {label} {required && <span className='text-rose-500'>*</span>}
        </label>
      </div>
      <div className='w-full '>
        <div className='mt-1'>
          <select
            value={value}
            name={name}
            id={name}
            onChange={onChange}
            className='form-input'
          >
            {options.length === 0 ? (
              <option value={'Others'}>{noOptionText}</option>
            ) : null}
            {options.map((option, index) => {
              if (index === 0 && value === '') {
                setFieldValue(name, option.value);
              }

              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
        </div>
        <ErrorMessage
          name={name}
          className='text-red-500 text-xs mt-1'
          component={'p'}
        />
      </div>
    </div>
  );
};

interface _props {
  name: string | 'qty';
  value: string | undefined;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
  type: 'text' | 'number';
  required: boolean;
  onBlur: (e: React.FocusEvent<any, Element>) => void;
}

export const OTF_Input: React.FC<_props> = ({
  name,
  type = 'text',
  value,
  label,
  onChange,
  placeHolder,
  required = false,
  onBlur: handleBlur,
}) => {
  const changeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string | undefined,
  ): void => {
    if (type === 'number') {
      if (name === 'qty' && isStringyNumberKey(event)) {
        // For specific 'Qty' as stringedNumber
        if (
          event.target.value[event.target.value.length - 1] === ',' &&
          value
        ) {
          if (value === '') {
            return;
          }

          if (value[value?.length - 1] === ',') {
            return;
          }
        }
        onChange(event);
        return;
      }
      if (isNumberKey(event)) {
        // For all numbers
        onChange(event);
      }
      return;
    }

    // For all strings
    onChange(event);
  };
  return (
    <div className='flex flex-wrap mb-4'>
      <div className='w-full '>
        <label
          htmlFor={name}
          className='block text-base font-medium text-gray-700'
        >
          {label} {required && <span className='text-rose-500'>*</span>}
        </label>
      </div>
      <div className='w-full'>
        <div className='mt-1'>
          <input
            id={name}
            onKeyDown={(event) => {
              if (name !== 'price')
                ['.'].includes(event.key) && event.preventDefault();
            }}
            name={name}
            type={'text'}
            value={value}
            placeholder={placeHolder}
            onBlur={handleBlur}
            onChange={(event) => changeHandler(event, value)}
            className='form-input'
          />
        </div>

        <ErrorMessage
          name={name}
          className='text-red-500 text-xs mt-1'
          component={'p'}
        />
      </div>
    </div>
  );
};
