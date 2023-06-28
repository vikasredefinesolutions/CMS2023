import NxtImage from '@appComponents/reUsable/Image';
import { isNumberKey } from '@helpers/common.helper';
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
  readonly = false,
  creditCard = false,
}) => {
  const right = required && touched && error === null;
  const wrong = required && touched && error;

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
          onKeyDown={(event) =>
            ['.'].includes(event.key) && event.preventDefault()
          }
          maxLength={length}
          onChange={onChange}
          className='form-input !w-[calc(100%-40px)]'
          autoComplete={creditCard ? 'off' : ''}
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
}> = ({ name, value, onBlur, onChange, valid, inValid }) => {
  return (
    <>
      <div className='flex flex-wrap justify-between items-center'>
        <input
          name={name}
          value={value}
          onBlur={onBlur}
          maxLength={2}
          onChange={(event) => {
            if (isNumberKey(event)) {
              onChange(event);
            }
          }}
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
