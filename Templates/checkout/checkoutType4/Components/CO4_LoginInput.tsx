import React from 'react';

interface _Props {
  type: 'password' | 'email';
  onChange: () => {};
  placeHolder: string;
  label: string;
  name: string;
}

const CO4_LoginInput: React.FC<_Props> = ({
  type,
  onChange,
  name,
  label,
  placeHolder,
}) => {
  return (
    <div className='relative z-0 w-full mb-[20px] border border-gray-border rounded'>
      <input
        type={type}
        name={name}
        placeholder={placeHolder}
        required
        className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
      />
      <label
        htmlFor={name}
        className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
      >
        {label}*
      </label>
    </div>
  );
};

export default CO4_LoginInput;
