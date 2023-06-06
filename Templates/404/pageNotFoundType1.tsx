import { paths } from '@constants/paths.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import Link from 'next/link';
import React from 'react';

const PageNotFoundType1: React.FC = () => {
  const storeCode = useTypedSelector_v2((state) => state.store.code);
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
          {storeCode === 'CG' && (
            <>
              <img src='/assets/images/404/cg-404.png' />
            </>
          )}
          {storeCode === 'GG' && (
            <>
              <img src='/assets/images/404/gg-404.png' />
            </>
          )}
          {storeCode === 'PKHG' && (
            <>
              <img src='/assets/images/404/pkh-404.png' />
            </>
          )}
          {storeCode === 'DI' && (
            <>
              <img src='/assets/images/404/di-404.png' />
            </>
          )}

          <div className='mb-[30px] mt-[15px]'>
            {/* <div className='text-2xl-text mb-[20px] font-bold'>
              PAGE NOT FOUND
            </div> */}
            <div className='mt-[30px]'>
              <Link href={paths.HOME}>
                <a className='btn btn-md btn-primary'>BACK TO HOME PAGE</a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageNotFoundType1;
