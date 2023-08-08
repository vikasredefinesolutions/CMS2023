import NxtImage from '@appComponents/reUsable/Image';
import { storeBuilderTypeId } from '@configs/page.config';
import { paths } from '@constants/paths.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { useRouter } from 'next/router';
import React from 'react';

const PageNotFoundType1: React.FC = () => {
  const { code: storeCode, storeTypeId } = useTypedSelector_v2(
    (state) => state.store,
  );

  const { isLeftNavigation } = useTypedSelector_v2(
    (state) => state.sbStore.store,
  );
  const router = useRouter();

  const handleRedirect = () => {
    if (storeTypeId === storeBuilderTypeId && !isLeftNavigation) {
      router.push(paths.SB_PRODUCT_LISTING);
      return;
    }

    router.push(paths.HOME);
  };

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
              <NxtImage
                alt=''
                useNextImage={false}
                isStatic={true}
                className=''
                src='/assets/images/404/cg-404.png'
              />
            </>
          )}
          {storeCode === 'GG' && (
            <>
              <NxtImage
                alt=''
                className=''
                useNextImage={false}
                isStatic={true}
                src='/assets/images/404/gg-404.png'
              />
            </>
          )}
          {storeCode === 'PKHG' && (
            <>
              <NxtImage
                alt=''
                isStatic={true}
                useNextImage={false}
                className=''
                src='/assets/images/404/pkh-404.png'
              />
            </>
          )}
          {storeCode === 'DI' && (
            <>
              <NxtImage
                alt=''
                isStatic={true}
                useNextImage={false}
                className=''
                src='/assets/images/404/di-404.png'
              />
            </>
          )}

          <div className='mb-[30px] mt-[15px]'>
            {/* <div className='text-2xl-text mb-[20px] font-bold'>
              PAGE NOT FOUND
            </div> */}
            <div className='mt-[30px]'>
              <button onClick={() => handleRedirect()}>
                <a className='btn btn-md btn-primary'>BACK TO HOME PAGE</a>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageNotFoundType1;
