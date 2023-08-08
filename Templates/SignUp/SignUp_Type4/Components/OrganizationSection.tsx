import { __pagesText } from '@constants/pages.text';
import SU1_StateNcountries from '@templates/SignUp/SignUp_Type1/Components/SU1_StateNcountries';
import { ErrorMessage, Field, FormikValues, useFormikContext } from 'formik';
import { signupFourFormFields } from '../SU4_Extras';
import SU4_Input from './SU4_Input';

const OrganizationSection = () => {
  const { values, setFieldValue }: FormikValues = useFormikContext();
  return (
    <div className='w-full mx-auto'>
      <div className='text-xl md:text-2xl lg:text-sub-title font-sub-title text-color-sub-title pb-2 mb-4 border-b border-b-gray-300'>
        {__pagesText.accountPage.organizationText}
      </div>
      <div className='flex flex-wrap -mx-3 gap-y-6 mb-8'>
        {signupFourFormFields.organization.map((field) =>
          field.name === 'numberOfPlayers' ? (
            <div className='w-full lg:w-1/2 px-3'>
              <label className='mb-[4px] text-normal-text' htmlFor='memberFrom'>
                {__pagesText.accountPage.numberOfPlayersText}
              </label>
              <div className='mt-1 flex items-center gap-2'>
                <div>
                  <Field
                    name='memberFrom'
                    id='memberFrom'
                    className='form-input !w-[calc(100%-40px)]'
                  />
                  <div>
                    <ErrorMessage
                      className='text-rose-500'
                      component={'span'}
                      name='memberFrom'
                    />
                  </div>
                </div>

                <span>-</span>
                <div>
                  <Field
                    name='memberTo'
                    id='memberTo'
                    className='form-input !w-[calc(100%-40px)]'
                  />
                  <div>
                    <ErrorMessage
                      className='text-rose-500'
                      component={'span'}
                      name='memberTo'
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : field.name === 'stateNCountry' ? (
            <SU1_StateNcountries
              countryName={'storeCustomerAddress[1].countryName'}
              countryValue={values.storeCustomerAddress[1].countryName}
              stateName={'storeCustomerAddress[1].state'}
              stateValue={values.storeCustomerAddress[1].state}
              setFieldValue={setFieldValue}
              labelClass='mb-[4px] text-normal-text'
              order='2'
            />
          ) : (
            <SU4_Input
              key={field.name}
              name={field.name}
              placeholder={field.placeholder}
              type={field.type}
              label={field.label}
              required={field.required}
              options={field?.options || []}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default OrganizationSection;
