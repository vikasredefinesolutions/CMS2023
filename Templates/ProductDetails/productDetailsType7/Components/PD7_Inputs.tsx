import Price from '@appComponents/Price';

interface _InputProps {
  label: string;
  type: 'text';
  name: string;
  required: boolean;
  length?: number;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  error: string | null;
  touched: boolean;
  readonly?: boolean;
  cost: number;
  costType: 'PER_CHARACTER' | 'PER_WORD';
}

export const PD7_CustomInput: React.FC<_InputProps> = ({
  cost,
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
  costType,
}) => {
  const right = required && touched && error === null;
  const wrong = required && touched && error;
  const costText =
    costType === 'PER_CHARACTER'
      ? 'extra charge per character'
      : ' extra charge';

  return (
    <div className='w-full flex flex-wrap pt-[10px] pb-[10px]'>
      <div className='w-full lg:w-auto leading-[40px]'>
        <span className='text-red'>{`${required ? '*' : ''}`}</span>
        {label}
      </div>
      <div className='w-full lg:w-auto mx-0 lg:mx-[10px]'>
        <input
          name={name}
          type={type}
          value={value}
          autoComplete='off'
          readOnly={readonly}
          onBlur={onBlur}
          onKeyDown={(event) =>
            ['.'].includes(event.key) && event.preventDefault()
          }
          maxLength={length}
          onChange={onChange}
          className='form-input !px-[10px] !inline-block !w-60'
        />
      </div>
      <div className='w-full lg:w-auto leading-[40px]'>
        <Price value={cost} /> {costText}
      </div>
    </div>
  );
};
