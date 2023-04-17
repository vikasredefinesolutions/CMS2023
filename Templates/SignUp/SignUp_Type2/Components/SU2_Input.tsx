import React from 'react';

interface _props {
  name: string;
  value: string | undefined;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
  type?: 'text' | 'number' | 'email';
  required?: boolean;
  onBlur: (e: React.FocusEvent<any, Element>) => void;
}

const SU2_Input: React.FC<_props> = ({
  name,
  type = 'text',
  value,
  label,
  onChange: handleChange,
  placeHolder,
  required = false,
  onBlur: handleBlur,
}) => {
  return (
    <div className='w-full lg:w-full px-3'>
      <label htmlFor={name} className='mb-[4px] text-normal-text'>
        {label} {required && <span className='text-rose-500'>*</span>}
      </label>
      <div className=''>
        <input
          id={name}
          name={name}
          placeholder={placeHolder}
          value={value}
          type={type}
          onChange={handleChange}
          onBlur={handleBlur}
          className='form-input !w-[calc(100%-40px)]'
        />
      </div>
    </div>
  );
};

export default SU2_Input;
