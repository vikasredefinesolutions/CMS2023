import noImg from '@images/no.png';
import yesImg from '@images/yes.png';

import NxtImage from '@appComponents/reUsable/Image';
import React, { useEffect, useState } from 'react';

interface _props {
  name: string;
  value: string | undefined;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
  type?: 'text' | 'number' | 'email' | 'date';
  required?: boolean;
  touched?: boolean;
  error?: string | null;
  onBlur?: (e: React.FocusEvent<any, Element>) => void;
}

const CustomInput: React.FC<_props> = ({
  name,
  type = 'text',
  value,
  label,
  onChange: handleChange,
  placeHolder,
  required = false,
  touched,
  error,
  onBlur = (value: any) => value,
}) => {
  const [correct, setCorrect] = useState<boolean | undefined>(false);
  const [inCorrect, setInCorrect] = useState<
    string | boolean | null | undefined
  >(false);

  useEffect(() => {
    setCorrect(required && !error);
    setInCorrect(required && touched && error);
  }, [required, touched, error]);

  return (
    <>
      <label htmlFor={name} className='block text-default-text font-mediut'>
        {label} {required && <span className='text-rose-600'>*</span>}
      </label>
      <div className='mt-2 relative'>
        <div className='mr-8'>
          {type === 'date' ? (
            <input
              type='date'
              id={name}
              name={name}
              placeholder={placeHolder}
              value={value}
              onChange={handleChange}
              onBlur={onBlur}
              className='form-input mr-8'
              min={new Date().toISOString().split('T')[0]}
            />
          ) : (
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
          )}
          <div className='absolute w-6 h-6 right-0 top-2'>
            {correct && (
              <NxtImage
                src={yesImg}
                alt=''
                className={''}
                height={1}
                isStatic={true}
                width={1}
              />
            )}
            {inCorrect && (
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

          {/* No need to show error msg in PKHG Special request form as per live */}
          {/* <ErrorMessage
            className='text-rose-500'
            component={'span'}
            name={name}
          /> */}
        </div>
      </div>
    </>
  );
};

export default CustomInput;
