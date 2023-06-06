import NxtImage from '@appComponents/reUsable/Image';
import React from 'react';

const SomethingWentWrong: React.FC = () => {
  return (
    <div style={{ flexGrow: 1 }}>
      <div className=''>
        <section className='container mx-auto text-center'>
          <div className='pt-[60px] pb-[30px] flex flex-col justify-center items-center'>
            <div className='text-center mb-[40px] w-full h-full'>
              <NxtImage
                className=''
                src='/assets/images/404.png'
                alt=''
                isStatic
              />
            </div>

            <div className='mb-[30px] mt-[15px]'>
              <div className='text-2xl-text mb-[20px] font-bold'>
                SOMETHING WENT WRONG
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SomethingWentWrong;
