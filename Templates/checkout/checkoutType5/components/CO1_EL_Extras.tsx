import { ErrorMessage } from 'formik';
import React from 'react';
import * as Yup from 'yup';

interface _SelectProps {
  label: string;
  supressedLabel: string;
  name: string;
  value: string | undefined;
  options:
    | {
        value: string;
        label: string;
      }[];

  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<any, Element>) => void;
  required?: boolean;
}

type _SelectNames = 'source' | 'sourceMedium' | 'salesRep';

interface _Select {
  label: string;
  name: _SelectNames;
  type: 'select';
  required: boolean;
  supressedLabel: string;
  noOptionFound: string;
}

export const _CO1_EL_Fields: Array<_Select> = [
  {
    label: 'Source',
    supressedLabel: '',
    name: 'source',
    type: 'select',
    required: false,
    noOptionFound: 'No Source Found',
  },
  {
    label: 'Source Medium',
    name: 'sourceMedium',
    type: 'select',
    supressedLabel: '',
    required: false,
    noOptionFound: 'No Source Medium Found',
  },
  {
    label: 'Select Sales Rep',
    name: 'salesRep',
    type: 'select',
    required: true,
    supressedLabel: 'Sales Rep*',
    noOptionFound: 'No Sales Rep Found',
  },
];

export interface _CO1_EL_InitialValues {
  source: string | undefined;
  sourceMedium: string | undefined;
  salesRep: string | undefined;
}

export const CO1_EL_InitialValues: _CO1_EL_InitialValues = {
  source: undefined,
  sourceMedium: undefined,
  salesRep: undefined,
};

export const CO1_El_Select: React.FC<_SelectProps> = ({
  label,
  name,
  options,
  onChange,
  required = false,
  value,
  supressedLabel,
  onBlur,
}) => {
  return (
    <div className='relative z-0 w-full mb-[20px] border border-gray-border rounded mb-[20px] last:mb-[0px]'>
      <select
        value={value}
        name={name}
        id={name}
        onChange={onChange}
        onBlur={onBlur}
        className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
      >
        {/* {options.length === 0 ? (
          <option value={'Others'}>{noOptionText}</option>
        ) : null} */}
        <option value=''></option>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
      <label
        htmlFor={name}
        className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
      >
        {supressedLabel.length > 0 ? (
          <sup className='flex w-full mt-[10px]'>
            {supressedLabel}
            {required && <span className='text-rose-500'>*</span>}
          </sup>
        ) : (
          <>
            {label}
            {required && <span className='text-rose-500'>*</span>}
          </>
        )}
      </label>
      <ErrorMessage
        name={name}
        className='text-red-500 text-xs mt-1'
        component={'p'}
      />
    </div>
  );
};

export const CO1_EL_ValidationSchema = Yup.object().shape({
  salesRep: Yup.string().required(),
});
