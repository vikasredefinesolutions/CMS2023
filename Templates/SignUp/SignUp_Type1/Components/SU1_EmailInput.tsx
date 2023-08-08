import noImg from '@images/no.png';
import yesImg from '@images/yes.png';
import { ErrorMessage } from 'formik';

import NxtImage from '@appComponents/reUsable/Image';
import { HEALTHYPOINTS } from '@constants/global.constant';
import { __SuccessErrorText } from '@constants/successError.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { CheckIfEmailIsAlreadyRegistered } from '@services/user.service';
import React from 'react';

interface _props {
  name: string;
  value: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
  required?: boolean;
  touched: boolean;
  error: string | null;
  onBlur: (e: React.FocusEvent<any, Element>) => void;
  setError: (field: string, message: string | undefined) => void;
  className?: string;
}

const SU1_EmailInput: React.FC<_props> = ({
  name,
  value,
  label,
  onChange,
  placeHolder,
  required = false,
  touched,
  error,
  onBlur,
  setError,
  className,
}) => {
  const right = required && touched && error === null;
  const wrong = required && touched && error;
  const { code: storeCode } = useTypedSelector_v2((state) => state.store);

  const storeId = useTypedSelector_v2((state) => state.store.id);

  const blurHandler = (e: React.FocusEvent<any, Element>) => {
    onBlur(e);

    if (!error) {
      CheckIfEmailIsAlreadyRegistered({
        storeId: storeId,
        email: value,
      }).then((res) => {
        if (res === null || res === true) {
          setError(name, __SuccessErrorText.alreadyRegistered);
        }
      });
    }
  };

  return (
    <div className={`w-full lg:w-1/2 px-[15px] ${className}`}>
      <label htmlFor={name} className='block text-default-text'>
        {label} {required && <span className='text-rose-500'>*</span>}
      </label>
      <div className='mt-2 relative'>
        <div className='mr-8'>
          <input
            type={'email'}
            id={name}
            name={name}
            placeholder={placeHolder}
            value={value}
            onChange={onChange}
            onBlur={blurHandler}
            className={`form-input mr-8 ${
              wrong && storeCode === HEALTHYPOINTS ? 'has-error' : ''
            }`}
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

export default SU1_EmailInput;
