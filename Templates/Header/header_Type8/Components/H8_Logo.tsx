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

const H8_CompanyLogo: React.FC<_props> = ({ logo }) => {
  const storeName = useTypedSelector_v2((state) => state.store?.storeName);
  const router = useRouter();

  return (
    <div
      className='max-w-[180px] sm:max-w-[220px]'
      style={{
        flex: router.asPath === paths.CHECKOUT ? ' 1 1 75%' : '',
        justifyContent: router.asPath === paths.CHECKOUT ? 'center' : '',
      }}
    >
      <Link href={paths.HOME}>
        <a
          title={storeName || ''}
          className='inline-block'
        >
          <NxtImage
              title={storeName || ''}
              className='max-h-full'
              src={logo?.mobile}
              useNextImage={false}
              alt={storeName ? storeName : ''}
            />
        </a>
      </Link>
    </div>
  );
};

export default H8_CompanyLogo;
