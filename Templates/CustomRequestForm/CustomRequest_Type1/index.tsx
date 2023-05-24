import React from 'react';
import CustomRequestForm from './Components/CustomRequestForm';

const CustomRequest_Type1: React.FC = () => {
  return (
    <>
      <section className='pt-[30px] pb-[30px]'>
        <div className='container mx-auto'>
          <div className='text-2xl-text text-center'>SPECIAL REQUEST FORM</div>
        </div>
      </section>
      <section className=''>
        <div className='container mx-auto mb-[30px] '>
          <div className='mx-auto max-w-5xl'>
            <div className='bg-light-gray p-[15px] lg:p-[30px]'>
              <CustomRequestForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomRequest_Type1;
