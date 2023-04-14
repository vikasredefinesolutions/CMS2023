import React from 'react';

interface _props {
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  type?: 'email' | 'text' | 'number';
  id: string;
  name: string;
  placeholder: string;
  required: boolean;
}

const RcInput: React.FC<_props> = ({
  onChange,
  value,
  id,
  name,
  type = 'text',
  placeholder,
  required = false,
}) => {
  return (
    <div className='w-full '>
      <div className=''>
        <input
          id={id}
          name={name}
          type={type}
          placeholder={`${placeholder} ${required ? '*' : ''}`}
          value={value}
          onChange={onChange}
          className='text-medium-text border border-[#ababab] rounded pt-[12px] pb-[12px] pl-[12px] pr-[12px] w-full'
        />
      </div>
    </div>
  );
};

export default RcInput;
