import { __pagesText } from '@constants/pages.text';
import React from 'react';
import CustomRequestForm from './Components/CustomRequestForm';

const CustomRequest_Type3: React.FC = () => {
  return (
    <>
      <section className='pt-[30px] pb-[30px]'>
        <div className='container mx-auto'>
          <div className='text-title-text text-center'>
            {__pagesText.PKGH_special_request_form.formTitle}
          </div>
        </div>
      </section>
      <section className=''>
        <div className='container mx-auto mb-[30px]'>
          <div className='bg-light-gray p-[15px] lg:p-[30px] max-w-5xl mx-auto'>
            <CustomRequestForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomRequest_Type3;
