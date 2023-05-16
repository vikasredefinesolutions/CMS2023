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
      className='sm:flex sm:items-center sm:w-[50%] md:w-[25%] relative '
      style={{
        flex: router.asPath === paths.CHECKOUT ? ' 1 1 75%' : '',
        justifyContent: router.asPath === paths.CHECKOUT ? 'center' : '',
      }}
    >
      <Link href={paths.HOME}>
        <a
          title={storeName || ''}
          className='max-w-[350px] w-full inline-block'
        >
          <div className='brand-logo w-full'>
            <NxtImage
              title={storeName || ''}
              className='brand-logo w-full'
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
