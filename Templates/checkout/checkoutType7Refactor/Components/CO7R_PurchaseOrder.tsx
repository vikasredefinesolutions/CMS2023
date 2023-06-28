import NxtImage from '@appComponents/reUsable/Image';
import { FormikErrors, FormikTouched } from 'formik';
import React from 'react';

interface _Props {
  values: { poNumber: string };
  handleChange(e: React.ChangeEvent<any>): void;
  handleBlur(e: React.FocusEvent<any, Element>): void;
  touched: FormikTouched<{ poNumber: string }>;
  errors: FormikErrors<{ poNumber: string }>;
}

const CO7R_PurchaseOrder: React.FC<_Props> = ({
  handleBlur,
  handleChange,
  values,
  touched,
  errors,
}) => {
  const isValid = touched.poNumber && errors.poNumber === undefined;
  const isNotValid = touched.poNumber && errors.poNumber;

  return (
    <div id='PurchaseOrderDetails'>
      <div className='ml-[-15px] mr-[-15px]'>
        <div className='mb-[15px] w-full pl-[15px] pr-[15px]'>
          <label className='mb-[4px] text-normal-text'>
            PLEASE ENTER YOUR PO NUMBER.WE WILL CONTACT YOU TO CONFIRM DETAILS
            OF YOUR PAYMENT AFTER THE ORDER HAS BEEN RECEIVED.:*
          </label>
          <div className='flex flex-wrap justify-between items-center'>
            <input
              className='form-input !w-[calc(100%-40px)]'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.poNumber}
              name={'poNumber'}
            />
            {isValid && (
              <NxtImage
                isStatic
                alt={''}
                className='ml-[5px]'
                src={'/yes.png'}
              />
            )}
            {isNotValid && (
              <NxtImage
                isStatic
                alt={''}
                className='ml-[5px]'
                src={'/no.png'}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CO7R_PurchaseOrder;
