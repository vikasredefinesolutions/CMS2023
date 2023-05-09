import { paths } from '@constants/paths.constant';
import Link from 'next/link';
import React from 'react';

const PageNotFoundType1: React.FC = () => {
  return (
    <div className=''>
      <section className='container mx-auto text-center'>
        <div className='pt-[60px] pb-[30px] flex flex-col justify-center items-center'>
          {/* <div className='text-center mb-[40px] w-full h-full'>
            <NxtImage
              className=''
              src='/assets/images/404.png'
              alt=''
              isStatic
            />
          </div> */}
          <div className='mb-[30px] mt-[15px]'>
            <div className='text-2xl-text mb-[20px] font-bold'>
              PAGE NOT FOUND
            </div>
            <div className='mt-[30px]'>
              <Link href={paths.HOME} className='btn btn-md btn-secondary'>
                BACK TO HOME PAGE
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageNotFoundType1;
