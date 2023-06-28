import EyeButton from '@appComponents/Buttons/EyeButton';
import InfoButton from '@appComponents/Buttons/InfoButton';
import { EMAIL_REGEX } from '@constants/global.constant';
import { ErrorMessage } from 'formik';
import React, { useState } from 'react';
import { _InputProps } from './switch.d';

const Input: React.FC<_InputProps> = ({
  id,
  name,
  type,
  label,
  value,
  onChange,
  required,
  placeHolder,
  onBlur,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const customBlurFunction = () => {
    onBlur;
    const emailCheck = typeof value === 'string' && value.match(EMAIL_REGEX);

    if (!emailCheck) {
      document.getElementById('email-address-login')?.focus();
    }
  };

  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className='block text-base font-medium text-gray-700'
        >
          {label}{' '}
          <span className='text-rose-500'>{`${required ? `*` : ''}`}</span>
        </label>
      )}

      <div className={`${type === 'password' ? 'relative' : ''} mb-[10px]`}>
        <input
          type={showPassword ? 'text' : type}
          id={id}
          name={name}
          placeholder={placeHolder}
          value={value}
          onChange={onChange}
          className='form-input'
          onBlur={id === 'email-address-login' ? customBlurFunction : onBlur}
        />

        {type === 'password' && (
          <>
            <InfoButton />
            <EyeButton
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </>
        )}
      </div>

      <ErrorMessage name={name} className='text-rose-500' component={'p'} />
    </>
  );
};

export default Input;
