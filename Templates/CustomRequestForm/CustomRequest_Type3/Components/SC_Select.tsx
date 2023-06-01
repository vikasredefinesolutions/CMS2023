import NxtImage from '@appComponents/reUsable/Image';
import noImg from '@images/no.png';
import yesImg from '@images/yes.png';
import React, { useEffect, useState } from 'react';
interface _props {
  label: string;
  placeHolder: string;
  name: string;
  value: string | number;
  options: {
    name: string;
    id: number | string;
  }[];
  touched?: boolean;
  error?: string | null;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

const SU_Select: React.FC<_props> = ({
  label,
  name,
  options,
  onChange,
  value,
  required = false,
  touched,
  error,
}) => {
  const [correct, setCorrect] = useState<boolean | undefined>(false);
  const [inCorrect, setInCorrect] = useState<
    string | boolean | null | undefined
  >(false);

  useEffect(() => {
    setCorrect(required && touched && error === null);
    setInCorrect(required && touched && error);
  }, [required, touched, error]);
  return (
    <div className='w-full lg:w-1/2 px-[15px]'>
      <label htmlFor={name} className='block text-default-text font-mediut'>
        {label} {required && <span className='text-red-600'>*</span>}
      </label>
      <div className='mt-2 relative'>
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
        <div className='mr-8'>
          <select
            className='form-input'
            id={name}
            onChange={(e) => onChange(e)}
            value={value}
          >
            <>
              {options.length === 0 ? <option>No State found</option> : ''}
              {options?.map((opt) => (
                <option
                  key={opt.id}
                  value={
                    name == 'stateName' || name == 'countryName'
                      ? opt.id
                      : opt.name
                  }
                >
                  {opt.name}
                </option>
              ))}
            </>
          </select>
        </div>
      </div>
      {/* <ErrorMessage name={name} className='text-rose-500' component={'span'} /> */}
    </div>
  );
};

export default SU_Select;
