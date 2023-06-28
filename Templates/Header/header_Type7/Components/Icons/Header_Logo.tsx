import NxtImage from '@appComponents/reUsable/Image';
import { paths } from '@constants/paths.constant';
import { useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface _props {
  logo: {
    mobile: string;
    desktop: string;
  };
}

const CompanyLogo: React.FC<_props> = ({ logo }) => {
  // const storeLayout = useTypedSelector_v2((state) => state.store.layout);
  const storeName = useTypedSelector_v2((state) => state.store?.storeName);
  const router = useRouter();

  return (
    <div
      className='flex flex-wrap items-center w-full lg:w-1/4 relative mb-[10px] lg:mb-0'
      style={{
        flex: router.asPath === paths.CHECKOUT ? ' 1 1 75%' : '',
        justifyContent: router.asPath === paths.CHECKOUT ? 'center' : '',
      }}
    >
      <Link href={paths.HOME}>
        <a
          title={storeName || ''}
          className='max-w-[180px] lg:max-w-[220px] w-full m-auto lg:m-0 inline-block'
        >
          <div className='brand-logo w-full text-center lg:text-left'>
            <NxtImage
              title={storeName || ''}
              className='max-h-full inline-block'
              src={logo?.mobile}
              useNextImage={false}
              alt={storeName ? storeName : ''}
            />
          </div>
        </a>
      </Link>
    </div>
  );
};

export default CompanyLogo;
