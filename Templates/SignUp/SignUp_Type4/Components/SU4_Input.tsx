import { __pagesText } from '@constants/pages.text';
import { fetchDetailsByZipCode } from '@services/general.service';
import { ErrorMessage, Field, FormikValues, useFormikContext } from 'formik';
import { useState } from 'react';
import { _SU3_Field } from '../../SignUp_Type3/SU3.extras';

const SU4_Input = ({
  name,
  required,
  placeholder,
  label,
  type,
  options = [],
}: _SU3_Field & { fetchStates?: (id: number) => void }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isPasswordHintVisible, setIsPasswordHintVisible] =
    useState<boolean>(false);
  const {
    values,
    setFieldValue,
    setFieldTouched,
    setFieldError,
  }: FormikValues = useFormikContext();

  const autoFillStateCountry = async (zipCode: string, type: number) => {
    const res = await fetchDetailsByZipCode(zipCode);

    if (res.stateId && res.countryId && res.cityName) {
      setFieldValue(`storeCustomerAddress[${type}].city`, res.cityName);
      setFieldError(`storeCustomerAddress[${type}].city`, '');
      setFieldValue(`storeCustomerAddress[${type}].state`, res.stateId);
      setFieldValue(`storeCustomerAddress[${type}].countryName`, res.countryId);
    }
  };

  return (
    <>
      {type === 'password' ? (
        <div className='w-full lg:w-1/2 px-3'>
          <label htmlFor={name} className='mb-[4px] text-normal-text'>
            {label}
            {required && <span className='text-rose-500'>*</span>}
          </label>
          <div className='relative mt-1'>
            <Field
              id={name}
              className='form-input !w-[calc(100%-40px)]'
              name={name}
              placeholder={placeholder}
              type={isPasswordVisible ? 'text' : 'password'}
            />
            <button
              type='button'
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              className='block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-[40px] text-gray-400 focus:outline-none hover:text-indigo-500 transition-colors'
            >
              <span className='material-symbols-outlined text-base'>
                {__pagesText.accountPage.visibility}
              </span>
            </button>
            <div className='absolute top-2 right-[70px]'>
              <button
                type='button'
                onMouseEnter={() => setIsPasswordHintVisible(true)}
                onMouseLeave={() => setIsPasswordHintVisible(false)}
              >
                <span className='material-icons-outlined ml-2 text-base'>
                  {__pagesText.accountPage.info}
                </span>
              </button>
              {isPasswordHintVisible && (
                <div className='z-10 absolute top-full left-0 transform -translate-x-1/2'>
                  <div className='bg-slate-500 p-2 overflow-hidden mt-2'>
                    <div className='text-sm text-gray-200 font-light whitespace-nowrap w-full text-left px-4 py-4'>
                      <span className='w-full pt-1 pb-1 block font-semibold'>
                        {__pagesText.accountPage.youtPasswordMustHave}
                      </span>
                      <span className='w-full pt-1 pb-1 block'>
                        {__pagesText.accountPage.eightMore}
                      </span>
                      {/* <span className='w-full pt-1 pb-1 block'>
                        {__pagesText.accountPage.upperOrLowerCase}
                      </span>
                      <span className='w-full pt-1 pb-1 block'>
                        {__pagesText.accountPage.atLeastOneNumber}
                      </span> */}
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
      ) : type === 'dropdown' ? (
        <div className='w-full lg:w-1/2 px-3'>
          <label htmlFor={name} className='mb-[4px] text-normal-text'>
            {label} {required && <span className='text-rose-500'>*</span>}
          </label>
          <div className='mt-1'>
            <Field
              id={name}
              as='select'
              name={name}
              className='form-input !w-[calc(100%-40px)]'
            >
              {options.map((option) => (
                <option value={option.value}>{option.name}</option>
              ))}
            </Field>
          </div>
          <ErrorMessage
            className='text-rose-500'
            component={'span'}
            name={name}
          />
        </div>
      ) : type === 'color' ? (
        <div className='w-full lg:w-1/2 px-3'>
          <label htmlFor='' className='mb-[4px] text-normal-text'>
            {label}
          </label>
          <div className='mt-1 flex items-center gap-2'>
            <span>{__pagesText.accountPage.primaryColor}</span>
            <div
              className={`rounded-full`}
              style={{
                backgroundColor: values.primaryColor
                  ? values.primaryColor
                  : 'rgba(71,85,105,1)',
              }}
            >
              <Field
                type='color'
                className='w-9 h-9 rounded-full opacity-0'
                name={name}
                id={name}
              />
            </div>
            <ErrorMessage
              className='text-rose-500'
              component={'span'}
              name={name}
            />
          </div>
        </div>
      ) : (
        <div className='w-full lg:w-1/2 px-3'>
          <label htmlFor={name} className='mb-[4px] text-normal-text'>
            {label} {required && <span className='text-rose-500'>*</span>}
          </label>
          <div className='mt-1'>
            <Field
              id={name}
              name={name}
              autoComplete=''
              placeholder={placeholder}
              className='form-input !w-[calc(100%-40px)]'
              onBlur={
                name === 'storeCustomerAddress[1].postalCode'
                  ? () =>
                      autoFillStateCountry(
                        values.storeCustomerAddress[1].postalCode,
                        1,
                      )
                  : name === 'storeCustomerAddress[0].postalCode'
                  ? () =>
                      autoFillStateCountry(
                        values.storeCustomerAddress[0].postalCode,
                        0,
                      )
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

export default SU4_Input;
