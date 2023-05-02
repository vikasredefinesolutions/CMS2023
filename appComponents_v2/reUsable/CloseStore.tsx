import { __pagesText } from '@constants/pages.text';
import React from 'react';

const CloseStore: React.FC = () => {
  return (
    <div className=''>
      <section className='container mx-auto text-center'>
        <div className='pt-[60px] pb-[30px] flex flex-col justify-center items-center '>
          <div className='text-center mb-[40px]'></div>
          <div className='mb-[30px] mt-[15px]'>
            <div className='text-2xl-text mb-[20px] font-bold border-rose-600'>
              {__pagesText.closedStore.closedStoreMessage}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CloseStore;
