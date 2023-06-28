import { __pagesText } from '@constants/pages.text';
import SU1_StateNcountries from '@templates/SignUp/SignUp_Type1/Components/SU1_StateNcountries';
import { FormikValues, useFormikContext } from 'formik';
import { signupFourFormFields } from '../SU4_Extras';
import SU4_Input from './SU4_Input';

const AddressSection = () => {
  const { values, setFieldValue }: FormikValues = useFormikContext();
  return (
    <div className='w-full mx-auto'>
      <div className='text-xl md:text-2xl lg:text-sub-title font-sub-title text-color-sub-title pb-2 mb-4 border-b border-b-gray-300'>
        {__pagesText.accountPage.yourAddress}
      </div>
      <div className='flex flex-wrap -mx-3 gap-y-6 mb-8'>
        {signupFourFormFields.address.map((field) =>
          field.name === 'stateNCountry' ? (
            <SU1_StateNcountries
              countryName={'storeCustomerAddress[0].countryName'}
              countryValue={values.storeCustomerAddress[0].countryName}
              stateName={'storeCustomerAddress[0].state'}
              stateValue={values.storeCustomerAddress[0].state}
              setFieldValue={setFieldValue}
            />
          ) : (
            <SU4_Input
              key={field.name}
              name={field.name}
              placeholder={field.placeholder}
              type={field.type}
              label={field.label}
              required={field.required}
              options={[]}
            />
          ),
        )}
        <div className='w-full lg:w-full px-3 text-center'>
          <button type='submit' className='btn btn-primary'>
            {__pagesText.accountPage.signUp}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressSection;
