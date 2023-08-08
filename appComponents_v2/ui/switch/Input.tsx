import EyeButton from '@appComponents/Buttons/EyeButton';
import InfoButton from '@appComponents/Buttons/InfoButton';
import {
  HEALTHYPOINTS,
  SIMPLI_SAFE_CODE,
  UCA,
  _Store_CODES,
} from '@constants/global.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { ErrorMessage } from 'formik';
import React, { useRef, useState } from 'react';
import { _InputProps } from './switch.d';

const Input: React.FC<
  _InputProps & {
    validateForm?: any;
    setTouched?: any;
  }
> = ({
  id,
  name,
  type,
  label,
  value,
  onChange,
  required,
  placeHolder,
  onBlur,
  error,
  validateForm = (value?: string) => value,
  setTouched = (value?: string) => value,
  showErroMsg,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isTab = useRef(false);
  const { id: storeId, code: storeCode } = useTypedSelector_v2(
    (state) => state.store,
  );

  const customBlurFunction = async (e: any) => {
    onBlur && onBlur(e);
    const validate = await validateForm();
    if (validate?.userName && !isTab.current) {
      setTouched({ userName: true });
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

      <div
        className={`${type === 'password' ? 'relative' : ''} ${
          storeCode == SIMPLI_SAFE_CODE ? 'mb-[20px]' : 'mb-[10px]'
        }`}
      >
        <input
          type={showPassword ? 'text' : type}
          id={id}
          name={name}
          placeholder={placeHolder}
          value={value}
          onKeyDown={(e) =>
            e.code == 'Tab' &&
            (storeCode === _Store_CODES.USAACLAIMS ||
              storeCode === _Store_CODES.USAAHEALTHYPOINTS) &&
            id === 'email-address-login'
              ? (isTab.current = true)
              : (isTab.current = false)
          }
          onChange={onChange}
          className={`form-input ${
            error &&
            error[name] &&
            (storeCode === UCA || storeCode === HEALTHYPOINTS)
              ? 'has-error'
              : ''
          }`}
          onBlur={id === 'email-address-login' ? customBlurFunction : onBlur}
        />
        {showErroMsg ? (
          <span className='mb-1 text-rose-500'>{showErroMsg}</span>
        ) : (
          <ErrorMessage name={name} className='text-rose-500' component={'p'} />
        )}

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
    </>
  );
};

export default Input;
