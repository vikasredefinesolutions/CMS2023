import NxtImage from '@appComponents/reUsable/Image';
import { HEALTHYPOINTS, UCA } from '@constants/global.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { KeyboardEvent } from 'react';
interface _InputProps {
  additionalClass: string;
  label: string;
  type: 'text' | 'number';
  name: string;
  required: boolean;
  length?: number;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  error: string | null;
  touched: boolean;
  readonly?: boolean;
  creditCard?: boolean;
  autoComplete: string;
  children?: React.ReactNode;
}
export const CO7R_Input: React.FC<_InputProps> = ({
  children,
  additionalClass,
  type,
  name,
  onChange,
  value,
  onBlur,
  label,
  length = 200,
  required,
  touched,
  error,
  autoComplete,
  readonly = false,
  creditCard = false,
}) => {
  const right = required && touched && error === null;
  const wrong = required && touched && error;
  const { code: storeCode } = useTypedSelector_v2((state) => state.store);
  const phoneNumberCheck = (event: KeyboardEvent<HTMLInputElement>) => {
    if (name === 'phone') {
      console.log('backspace ==>', event.key);
      if (
        ![
          'Tab',
          'Backspace',
          '0',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
        ].includes(event.key)
      )
        return event.preventDefault();
    }
    return ['.'].includes(event.key) && event.preventDefault();
  };
  return (
    <div className={`mb-[15px] w-full pl-[15px] pr-[15px] ${additionalClass}`}>
      <label htmlFor={name} className='mb-[4px] text-normal-text'>{`${label} ${
        required ? '*' : ''
      }`}</label>
      <div
        className={`flex flex-wrap  justify-between items-center ${
          creditCard ? 'relative' : ''
        }`}
      >
        <input
          name={name}
          type={type}
          value={value}
          readOnly={readonly}
          onBlur={onBlur}
          onKeyDown={phoneNumberCheck}
          maxLength={length}
          onChange={onChange}
          className={`form-input !w-[calc(100%-40px)] ${
            wrong && (storeCode === UCA || storeCode === HEALTHYPOINTS)
              ? 'has-error'
              : ''
          }`}
          autoComplete={autoComplete}
          onContextMenu={(e) => {
            if (creditCard) {
              e.preventDefault();
              return;
            }
          }}
        />
        {children}
        {right && (
          <NxtImage className='ml-[5px]' src={'/yes.png'} alt={''} isStatic />
        )}
        {wrong && (
          <NxtImage className='ml-[5px] ' src={'/no.png'} alt={''} isStatic />
        )}
      </div>
    </div>
  );
};

interface _SelectProps {
  additionalClass: string;
  label: string;
  name: string;
  required: boolean;
  value: string | number;
  options: {
    name: string;
    id: number | string;
  }[];
  initialOption: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLSelectElement, Element>) => void;
  // setFieldValue: (
  //   field: string,
  //   value: any,
  //   shouldValidate?: boolean | undefined,
  // ) => void;
  valid: boolean;
  inValid: boolean;
  disabled: boolean;
  autoComplete: string;
}

export const CO7R_Select: React.FC<_SelectProps> = ({
  name,
  label,
  options,
  value,
  required,
  onBlur,
  onChange,
  valid,
  inValid,
  disabled,
  initialOption,
  autoComplete,
  additionalClass,
}) => {
  return (
    <div className={`mb-[15px] w-full pl-[15px] pr-[15px] ${additionalClass}`}>
      <label htmlFor={name} className='mb-[4px] text-normal-text'>{`${label} ${
        required ? '*' : ''
      }`}</label>
      <div className='flex flex-wrap justify-between items-center'>
        <select
          name={name}
          value={value}
          disabled={disabled}
          onChange={onChange}
          autoComplete={autoComplete}
          onBlur={onBlur}
          className='form-input !w-[calc(100%-40px)]'
        >
          <option value={''}>{initialOption}</option>
          {options.map((option) => {
            if (option.name === value) {
              return (
                <option key={option.id} value={option.name} selected>
                  {option.name}
                </option>
              );
            }
            return (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            );
          })}
        </select>{' '}
        {valid && (
          <NxtImage className='ml-[5px]' src={'/yes.png'} alt={''} isStatic />
        )}
        {inValid && (
          <NxtImage className='ml-[5px] ' src={'/no.png'} alt={''} isStatic />
        )}
      </div>
    </div>
  );
};

export const CO7R_CreditCardInput: React.FC<{
  name: string;
  value: string;
  valid: boolean;
  inValid: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  autoComplete: string;
}> = ({ name, value, onBlur, onChange, valid, inValid, autoComplete }) => {
  const numberCheck = (event: KeyboardEvent<HTMLInputElement>) => {
    if (
      ![
        'Tab',
        'Backspace',
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
      ].includes(event.key)
    ) {
      return event.preventDefault();
    }
  };

  return (
    <>
      <div className='flex flex-wrap justify-between items-center'>
        <input
          name={name}
          value={value}
          onBlur={onBlur}
          maxLength={2}
          onKeyDown={numberCheck}
          onChange={onChange}
          autoComplete={autoComplete}
          className='form-input !w-[calc(100%-40px)]'
        />
        {valid && (
          <NxtImage className='ml-[5px]' src={'/yes.png'} alt={''} isStatic />
        )}
        {inValid && (
          <NxtImage className='ml-[5px] ' src={'/no.png'} alt={''} isStatic />
        )}
      </div>
    </>
  );
};
