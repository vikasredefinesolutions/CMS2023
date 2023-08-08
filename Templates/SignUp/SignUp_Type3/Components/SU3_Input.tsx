import { fetchDetailsByZipCode } from '@services/general.service';
import { ErrorMessage, Field, FormikValues, useFormikContext } from 'formik';
import { useState } from 'react';
import { _SU3_Field } from '../SU3.extras';

const SU3_Input = ({
  name,
  required,
  placeholder,
  label,
  type,
  fetchStates,
  options = [],
}: _SU3_Field & { fetchStates: (id: number) => void }) => {
  const { setFieldValue, values }: FormikValues = useFormikContext();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isPasswordHintVisible, setIsPasswordHintVisible] =
    useState<boolean>(false);

  const autoFillStateCountry = async (zipCode: string) => {
    const res = await fetchDetailsByZipCode(zipCode);
    if (res.stateName && res.countryId) {
      setFieldValue('state', res.stateName);
      setFieldValue('city', res.cityName);
      setFieldValue('country', res.countryId);
    }
  };

  return (
    <>
      {type === 'dropdown' ? (
        <div className='w-full lg:w-1/2 px-3'>
          <label htmlFor='state' className='mb-[4px] text-normal-text'>
            {label}
          </label>
          <div className='mt-1'>
            <Field
              as='select'
              name={name}
              className='form-input !w-[calc(100%-40px)]'
              onChange={(e: any) => {
                if (name === 'country') {
                  fetchStates(e.target.value);
                  setFieldValue(name, e.target.value);
                } else {
                  setFieldValue(name, e.target.value);
                }
              }}
            >
              {options.map((option) => (
                <option value={name === 'country' ? option.id : option.value}>
                  {option.name}
                </option>
              ))}
            </Field>
          </div>
          <ErrorMessage
            className='text-rose-500'
            component={'span'}
            name={name}
          />
        </div>
      ) : type === 'password' ? (
        <div className='w-full lg:w-1/2 px-3'>
          <label htmlFor='password' className='mb-[4px] text-normal-text'>
            Password
            <span className='text-rose-500'>*</span>
          </label>
          <div className='relative mt-1'>
            <Field
              className='form-input !w-[calc(100%-40px)]'
              placeholder={placeholder}
              type={isPasswordVisible ? 'text' : 'password'}
              name={name}
            />
            <button
              className={`block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-[40px] text-gray-400 focus:outline-none hover:text-indigo-500 transition-colors ${
                isPasswordVisible && 'text-indigo-500'
              }`}
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              type='button'
            >
              <span className='material-symbols-outlined text-base'>
                visibility
              </span>
            </button>
            <div className='absolute top-2 right-[70px]'>
              <button
                onMouseEnter={() => setIsPasswordHintVisible(true)}
                onMouseLeave={() => setIsPasswordHintVisible(false)}
                type='button'
              >
                <span className='material-icons-outlined ml-2 text-base'>
                  info
                </span>
              </button>
              {isPasswordHintVisible && (
                <div className='z-10 absolute top-full left-0 transform -translate-x-1/2'>
                  <div className='bg-slate-500 p-2 overflow-hidden mt-2'>
                    <div className='text-sm text-gray-200 font-light whitespace-nowrap w-full text-left px-4 py-4'>
                      <span className='w-full pt-1 pb-1 block font-semibold'>
                        Your password must have :
                      </span>
                      <span className='w-full pt-1 pb-1 block'>
                        6 Or more character
                      </span>
                      <span className='w-full pt-1 pb-1 block'>
                        Upper and lowercase letters
                      </span>
                      <span className='w-full pt-1 pb-1 block'>
                        At list one number
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <ErrorMessage
            className='text-rose-500'
            component={'span'}
            name={name}
          />
        </div>
      ) : (
        <div className='w-full lg:w-1/2 px-3' key={name}>
          <label htmlFor={name} className='mb-[4px] text-normal-text'>
            {label} {required && <span className='text-rose-500'>*</span>}
          </label>
          <div className='mt-1'>
            <Field
              id={name}
              name={name}
              placeholder={placeholder}
              type={type}
              className='form-input !w-[calc(100%-40px)]'
              onBlur={
                name === 'zipCode'
                  ? () => autoFillStateCountry(values.zipCode)
                  : null
              }
            />
          </div>
          <ErrorMessage
            className='text-rose-500'
            component={'span'}
            name={name}
          />
        </div>
      )}
    </>
  );
};
export default SU3_Input;
