import { _SbStoreCustomFields } from '@services/sb.service';
import { CO6_Input } from '@templates/checkout/checkoutType6/Components/CO6_Inputs';
import { FormikErrors, FormikTouched } from 'formik';
import React from 'react';

interface _Props {
  customFields: _SbStoreCustomFields[] | null;
  values: Record<string, string>;
  handleChange(e: React.ChangeEvent<any>): void;
  handleBlur(e: React.FocusEvent<any, Element>): void;
  touched: FormikTouched<Record<string, string>>;
  errors: FormikErrors<Record<string, string>>;
  readOnly: boolean;
}

const CO6_CustomFields: React.FC<_Props> = ({
  customFields,
  values,
  touched,
  readOnly,
  errors,
  handleBlur,
  handleChange,
}) => {
  if (customFields === null) {
    return null;
  }

  return (
    <div className='bg-light-gray w-full mb-[30px] opacity-100'>
      <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
        <div className='pt-[10px] border-b border-[#ececec]'>
          <div className='pb-[10px] text-title-text'>
            Additional Information
          </div>
        </div>
        <div className='text-default-text text-[#84694d] mt-[10px] mb-[20px]'>
          All Fields marked * are required fields.
        </div>
        <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
          {customFields.map((fields) => {
            return (
              <CO6_Input
                label={fields.name}
                additionalClass={'md:w-6/12'}
                type={'text'}
                name={fields.name}
                readonly={readOnly}
                required={fields.isRequired}
                value={values[`${fields.name}`]}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={!!touched[`${fields.name}`]}
                error={errors?.[`${fields.name}`] || null}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CO6_CustomFields;
