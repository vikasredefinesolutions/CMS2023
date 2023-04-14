import React from 'react';

interface _props {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<any, Element>) => void;
  placeholder: string;
  type?: 'text' | 'number' | 'email';
}

const SD_Input: React.FC<_props> = ({
  name,
  type = 'text',
  value,
  onChange: handleChange,
  placeholder,
  onBlur,
}) => {
  return (
    <div className='pl-[30px] pr-[30px]'>
      <div className='mb-[16px]'>
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          className='form-input'
        />
      </div>
    </div>
  );
};

export default SD_Input;
