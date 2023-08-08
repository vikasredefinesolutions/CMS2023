import { FormikValues, useFormikContext } from 'formik';
import { CSR5_FormField, titleNames } from '../CustomRequestType_5_Extras';
import CR5_StateNCountries from './CR5_StateNCountries';
import Custom_Request_Type5_Input from './Custom_Request_Type5_Input';

interface Props {
  title: string;
  type: string;
  fields: CSR5_FormField[];
}

const CSR5_FormSection = ({ title, type, fields }: Props) => {
  const { setFieldValue, values }: FormikValues = useFormikContext();
  return (
    <>
      <div className='text-xl md:text-2xl lg:text-sub-title font-sub-title text-color-sub-title pb-[8px] mb-[16px]'>
        {titleNames[`${type}`]}
      </div>
      <div className='flex flex-wrap -mx-[12px] gap-y-[24px] mb-[32px]'>
        {fields.map((field: CSR5_FormField) =>
          field.name === 'stateNCountries' ? (
            <CR5_StateNCountries
              countryLabel='COUNTRY'
              stateLabel='STATE / PROVINCE:'
              countryName={'shipCountryId'}
              countryValue={values.shipCountryId}
              stateName={'shipStateId'}
              stateValue={values.shipStateId}
              setFieldValue={setFieldValue}
            />
          ) : (
            <Custom_Request_Type5_Input
              name={field.name}
              required={field.required}
              label={field.label}
              type={field.type}
              options={field.options}
              dependency={field.dependency}
            />
          ),
        )}
      </div>
    </>
  );
};

export default CSR5_FormSection;
