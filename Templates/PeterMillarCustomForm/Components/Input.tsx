import { ErrorMessage } from 'formik';

interface _Props {
  label: string;
  isRequired: boolean;
  id?: string;
  name: string;
  autoComplete?: string;
  placeholder?: string;
  value: string | string[];
  onChange: (e: any) => void;
  onBlur?: (e: any) => void;
  className?: string;
  innerClass?: string;
  inputChildern?: React.ReactNode;
  intrestOptions?: { label: string; value: string }[];
  type?: string;
  selectOptions?: {
    id: number;
    label: string;
    value: string;
  }[];
}
const Input: React.FC<_Props> = ({
  label,
  isRequired,
  id = '',
  autoComplete = '',
  name,
  placeholder = '',
  value,
  onChange,
  className,
  innerClass = '',
  inputChildern,
  intrestOptions = [],
  type = 'text',
  selectOptions = [],
  onBlur = (e: any) => e,
}) => {
  const renderInput = () => {
    switch (type) {
      case 'options':
        return (
          <div className='col-span-1'>
            <label htmlFor='' className='mb-[4px] text-normal-text'>
              {label} {isRequired && <span className='text-rose-500'>*</span>}
            </label>
            <div className='mt-[4px]'>
              {intrestOptions.map((option) => (
                <div className='flex items-center gap-1 mb-[6px]'>
                  <input
                    type='checkbox'
                    value={option.value}
                    checked={value.includes(option.value)}
                    onChange={(e) => onChange(e)}
                    id={option.value}
                    name={name}
                  />
                  <label className='text-normal-text' htmlFor={option.value}>
                    {option.label}
                  </label>
                </div>
              ))}
              <ErrorMessage
                component='p'
                name={name}
                className='text-rose-500'
              />
            </div>
          </div>
        );
      case 'textarea':
        return (
          <div className='col-span-1 md:col-span-2'>
            <label htmlFor='' className='mb-[4px] text-normal-text'>
              {label} {isRequired && <span className='text-rose-500'>*</span>}
            </label>
            <div className='mt-[4px]'>
              <textarea
                id={id}
                name={name}
                autoComplete={autoComplete}
                rows={3}
                value={value}
                className='form-input'
                onChange={onChange}
              ></textarea>
            </div>
            <ErrorMessage component='p' name={name} className='text-rose-500' />
          </div>
        );
      case 'select':
        return (
          <div className={className ? className : 'col-span-1'}>
            <label htmlFor='' className='mb-[4px] text-normal-text'>
              {label} {isRequired && <span className='text-rose-500'>*</span>}
            </label>
            <div className={`mt-[4px] ${innerClass}`}>
              <select
                name={name}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                className='form-input'
              >
                <option value={''}>{placeholder}</option>
                {selectOptions.map((option) => {
                  if (option.value === value) {
                    return (
                      <option key={option.id} value={option.value} selected>
                        {option.label}
                      </option>
                    );
                  }
                  return (
                    <option key={option.id} value={option.value}>
                      {option.label}
                    </option>
                  );
                })}
              </select>
            </div>
            <ErrorMessage component='p' name={name} className='text-rose-500' />
          </div>
        );
      default:
        return (
          <div className={className ? className : 'col-span-1'}>
            <label htmlFor='' className='mb-[4px] text-normal-text'>
              {label} {isRequired && <span className='text-rose-500'>*</span>}
            </label>
            <div className={`mt-[4px] ${innerClass}`}>
              <input
                id={id}
                name={name}
                autoComplete={autoComplete}
                placeholder={placeholder}
                value={value}
                className='form-input'
                onChange={(e) => onChange(e)}
                onBlur={onBlur}
                type={type}
              />
              {inputChildern}
            </div>
            <ErrorMessage component='p' name={name} className='text-rose-500' />
          </div>
        );
    }
  };
  return <>{renderInput()}</>;
};

export default Input;
