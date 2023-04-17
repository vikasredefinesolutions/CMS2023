import noImg from '@images/no.png';
import yesImg from '@images/yes.png';
import { ErrorMessage } from 'formik';

import NxtImage from '@appComponents/reUsable/Image';
import React from 'react';

interface _props {
  name: string;
  value: string | undefined;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
  type?: 'text' | 'number' | 'email';
  required?: boolean;
  touched: boolean;
  error: string | null;
  onBlur: (e: React.FocusEvent<any, Element>) => void;
}

const SU1_Input: React.FC<_props> = ({
  name,
  type = 'text',
  value,
  label,
  onChange: handleChange,
  placeHolder,
  required = false,
  touched,
  error,
  onBlur,
}) => {
  const right = required && touched && error === null;
  const wrong = required && touched && error;

  return (
    <div className='w-full lg:w-1/2 px-[15px]'>
      <label htmlFor={name} className='block text-default-text'>
        {label} {required && <span className='text-rose-500'>*</span>}
      </label>
      <div className='mt-2 relative'>
        <div className='mr-8'>
          <input
            type={type}
            id={name}
            name={name}
            placeholder={placeHolder}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            className='form-input mr-8'
          />
          <div className='absolute w-6 h-6 right-0 top-2'>
            {right && (
              <NxtImage
                src={yesImg}
                alt=''
                className={''}
                height={1}
                isStatic={true}
                width={1}
              />
            )}
            {wrong && (
              <NxtImage
                src={noImg}
                alt=''
                className={''}
                height={1}
                isStatic
                width={1}
              />
            )}
          </div>
          <ErrorMessage
            className='text-rose-500'
            component={'span'}
            name={name}
          />
        </div>
      </div>
    </div>
  );
};

export default SU1_Input;
