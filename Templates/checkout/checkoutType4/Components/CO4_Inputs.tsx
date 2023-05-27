import React, { useState } from 'react';

interface _InputProps {
  name: string;
  type: 'text' | 'number';
  value: string;
  label: string;
  required: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
}

interface _SelectProps {
  name: string;
  value: string;
  label: string;
  required: boolean;
  options: {
    name: string;
    id: number | string;
  }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLSelectElement, Element>) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
}

interface _CreditCardInputProps extends _InputProps {
  name: string | 'securityCode' | 'ccNumber';
  error: boolean;
  max: 16 | 3;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
}

export const CO4_CreditCardInput: React.FC<_CreditCardInputProps> = ({
  name,
  type,
  label,
  required,
  onBlur,
  value,
  setFieldValue,
  onChange,
  error,
  max,
}) => {
  const [showPopup, setShowPopup] = useState<'ccvInfo' | null>(null);

  const isNumberKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    let keyAllowed = false;
    console.log('event', event.nativeEvent);

    if ((event.nativeEvent as any).inputType === 'deleteContentBackward') {
      keyAllowed = true;
    }

    switch ((event.nativeEvent as any).data) {
      case 'Backspace':
        keyAllowed = true;
        break;
      case 'Enter':
        keyAllowed = true;
        break;
      case '0':
        keyAllowed = true;
        break;
      case '1':
        keyAllowed = true;
        break;
      case '2':
        keyAllowed = true;
        break;
      case '3':
        keyAllowed = true;
        break;
      case '4':
        keyAllowed = true;
        break;
      case '5':
        keyAllowed = true;
        break;
      case '6':
        keyAllowed = true;
        break;
      case '7':
        keyAllowed = true;
        break;
      case '8':
        keyAllowed = true;
        break;
      case '9':
        keyAllowed = true;
        break;
      default:
        break;
    }
    if (keyAllowed) {
      onChange(event);
    }
    return keyAllowed;
  };

  return (
    <div className='relative z-0 w-full mb-[20px] border border-gray-border rounded'>
      <input
        name={name}
        type={type}
        // value={value}
        onBlur={onBlur}
        onChange={(event) => isNumberKey(event)}
        maxLength={max}
        className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
      />
      <label
        htmlFor={name}
        className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
      >
        {label} {required ? '*' : ''}
      </label>
      {name === 'ccNumber' && (
        <div className='absolute top-[14px] right-[8px] flex items-center'>
          {[
            'images/card-visa.webp',
            'images/card-master.webp',
            'images/card-american-express.webp',
            'images/card-discover.webp',
          ].map((src) => {
            return (
              <div className='opacity-40 ml-[4px] w-[32px]'>
                <img src={src} alt='' />
              </div>
            );
          })}
        </div>
      )}

      {name === 'securityCode' && (
        <div className='absolute top-[12px] right-[8px]'>
          <div
            className='relative'
            onMouseEnter={() => setShowPopup('ccvInfo')}
            onMouseLeave={() => setShowPopup(null)}
          >
            <span className='material-icons-outlined text-base'>help</span>
            {showPopup === 'ccvInfo' && (
              <div className='z-10 absolute bottom-full left-1/2 transform -translate-x-1/2'>
                <div className='bg-slate-800 p-2 rounded overflow-hidden mb-2'>
                  <div className='text-xs text-gray-200 font-light whitespace-nowrap'>
                    The last three digits
                    <br />
                    displayed on the
                    <br />
                    back of your card
                    <br />
                    or first four
                    <br />
                    digits on the front
                    <br />
                    of your AMEX.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const CO4_AddEditAddressInput: React.FC<
  _InputProps & {
    fullWidth: boolean;
  }
> = ({ name, fullWidth, type, label, required, onBlur, onChange, value }) => {
  return (
    <div
      className={`w-full ${fullWidth ? '' : 'lg:w-1/2'} pl-[12px] pr-[12px]`}
    >
      <div className='relative z-0 w-full mb-[20px] border border-gray-border rounded'>
        <input
          name={name}
          type={type}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
        />
        <label
          htmlFor={name}
          className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
        >
          {label} {required ? '*' : ''}
        </label>
      </div>
    </div>
  );
};

export const CO4_CreditCardSelect: React.FC<
  _SelectProps & { error: boolean }
> = ({
  name,
  label,
  options,
  value,
  required,
  onBlur,
  onChange,
  setFieldValue,
}) => {
  return (
    <div className='relative z-0 w-full mb-[20px] border border-gray-border rounded'>
      <select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
      >
        {options.map((option, index) => {
          if (index === 0 && value === '') {
            setFieldValue(name, option.id);
          }

          return (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          );
        })}
      </select>
      <label
        htmlFor='Month'
        className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
      >
        {label} {required ? '*' : ''}
      </label>
    </div>
  );
};

export const CO4_AddEditAddressSelect: React.FC<
  _SelectProps & {
    fullWidth: boolean;
    noOptionText: string;
  }
> = ({
  name,
  label,
  value,
  options,
  required,
  fullWidth,
  noOptionText = 'Others',
  onBlur,
  onChange,
  setFieldValue,
}) => {
  return (
    <div
      className={`w-full ${fullWidth ? '' : 'lg:w-1/2'} pl-[12px] pr-[12px]`}
    >
      <div className='relative z-0 w-full mb-[20px] border border-gray-border rounded'>
        <select
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
        >
          {options.length === 0 ? (
            <option value={'Others'}>{noOptionText}</option>
          ) : null}
          {options.map((option, index) => {
            if (index === 0 && value === '') {
              setFieldValue(name, option.id);
            }

            return (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            );
          })}
        </select>
        <label
          htmlFor={name}
          className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
        >
          {label} {required ? '*' : ''}
        </label>
      </div>
    </div>
  );
};
