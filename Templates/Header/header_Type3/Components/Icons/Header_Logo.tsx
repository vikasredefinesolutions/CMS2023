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
  const router = useRouter();
  const storeName = useTypedSelector_v2((state) => state.store?.storeName);
  const view = useTypedSelector_v2((state) => state.store.view);

  return (
    <>
      <Link href={paths.HOME}>
        <a title={storeName || ''} className='logo inline-block'>
          <NxtImage
            title={storeName || ''}
            className='md:max-w-[260px]'
            src={logo?.mobile}
            useNextImage={false}
            alt={storeName ? storeName : ''}
          />
        </a>
      </Link>
    </>
  );
};

export default CompanyLogo;
