import React from 'react';
import CustomRequestForm_Type2 from './Components/CustomeRequestForm';

const CustomRequest_Type2: React.FC = () => {
  return (
    <>
      <section className=''>
        <div className='container mx-auto'>
          <div className='w-full bg-white'>
            <div className='max-w-4xl mx-auto'>
              <div className='text-2xl-text text-left pt-[40px]'>
                Boston Beer Custom Item Request
              </div>
              <div className='text-md-text text-left pt-[10px]'>
                This will provide a quote based on the information below.
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='container mx-auto '>
        <div className='bg-white pt-[50px] pb-[50px]'>
          <div className='block lg:flex lg:space-x-10 px-[10px]'>
            <div className='w-full max-w-4xl mx-auto'>
              <div className='gird grid-cols-1 lg:flex lg:items-center'>
                <div className='w-full mx-auto'>
                  <CustomRequestForm_Type2 />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomRequest_Type2;
